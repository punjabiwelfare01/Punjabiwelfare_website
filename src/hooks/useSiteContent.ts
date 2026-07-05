import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { defaultContent } from "@/content/defaults";
import type { SiteContent } from "@/content/types";

// Merges API content over the bundled defaults so the site always renders,
// even before the API responds (or if it is down). A collection or settings
// block from the API only wins when it actually has content.
function mergeContent(remote?: Partial<SiteContent>): SiteContent {
  if (!remote) return defaultContent;
  const collections = { ...defaultContent.collections };
  for (const key of Object.keys(collections) as (keyof SiteContent["collections"])[]) {
    const items = remote.collections?.[key];
    if (Array.isArray(items) && items.length > 0) {
      collections[key] = items as never;
    }
  }
  const settings = { ...defaultContent.settings };
  for (const key of Object.keys(settings) as (keyof SiteContent["settings"])[]) {
    const value = remote.settings?.[key];
    if (value && Object.keys(value).length > 0) {
      settings[key] = { ...settings[key], ...value } as never;
    }
  }
  return { collections, settings };
}

export function useSiteContent(): SiteContent {
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: () => api.get<SiteContent>("/content"),
    staleTime: 60 * 1000,
    retry: 1,
  });
  return mergeContent(data);
}

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ListOrdered, Settings2, MessageSquare } from "lucide-react";
import { api } from "@/lib/api";
import { collections, settingsSections } from "@/admin/config";
import type { SiteContent } from "@/content/types";

const AdminHome = () => {
  const { data } = useQuery({
    queryKey: ["site-content"],
    queryFn: () => api.get<SiteContent>("/content"),
  });

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-1">Website Content Manager</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Everything on the public website is editable from here. Changes go live immediately after saving.
      </p>

      <h2 className="text-sm font-bold tracking-wider text-muted-foreground uppercase mb-3 flex items-center gap-2">
        <ListOrdered className="w-4 h-4" /> Sections
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {collections.map((c) => {
          const count = data?.collections?.[c.key as keyof SiteContent["collections"]]?.length;
          return (
            <Link
              key={c.key}
              to={`/admin/collections/${c.key}`}
              className="bg-background border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all"
            >
              <p className="font-display font-semibold text-foreground">{c.label}</p>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
              {typeof count === "number" && (
                <p className="text-xs text-primary font-bold mt-2">{count} item{count === 1 ? "" : "s"}</p>
              )}
            </Link>
          );
        })}
      </div>

      <h2 className="text-sm font-bold tracking-wider text-muted-foreground uppercase mb-3 flex items-center gap-2">
        <Settings2 className="w-4 h-4" /> Texts & Settings
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {settingsSections.map((s) => (
          <Link
            key={s.key}
            to={`/admin/settings/${s.key}`}
            className="bg-background border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all"
          >
            <p className="font-display font-semibold text-foreground">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.description}</p>
          </Link>
        ))}
      </div>

      <Link
        to="/admin/feedback"
        className="inline-flex items-center gap-2 bg-background border border-border rounded-xl px-5 py-4 hover:border-primary/40 hover:shadow-md transition-all"
      >
        <MessageSquare className="w-4 h-4 text-primary" />
        <span className="font-display font-semibold text-foreground">Feedback Inbox</span>
        <span className="text-xs text-muted-foreground">— messages submitted through the website form</span>
      </Link>
    </div>
  );
};

export default AdminHome;

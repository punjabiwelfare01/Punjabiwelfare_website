import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api, ApiError, clearToken } from "@/lib/api";
import type { FeedbackEntry } from "@/content/types";

const FeedbackInbox = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: entries = [], isLoading, error } = useQuery({
    queryKey: ["feedback"],
    queryFn: () => api.authGet<FeedbackEntry[]>("/feedback"),
    retry: false,
  });

  if (error instanceof ApiError && error.status === 401) {
    clearToken();
    navigate("/admin/login");
  }

  const remove = async (id: number) => {
    try {
      await api.authDelete(`/feedback/${id}`);
      toast.success("Deleted");
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-1">Feedback Inbox</h1>
      <p className="text-sm text-muted-foreground mb-8">Messages submitted through the website's feedback form.</p>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : entries.length === 0 ? (
        <p className="text-muted-foreground">No feedback yet.</p>
      ) : (
        <div className="space-y-3">
          {entries.map((f) => (
            <div key={f.id} className="bg-background border border-border rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-foreground">
                    {f.name || "Anonymous"}
                    {f.category && <span className="ml-2 text-xs font-normal text-primary bg-primary/10 rounded px-2 py-0.5">{f.category}</span>}
                  </p>
                  {f.rating ? (
                    <span className="inline-flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < (f.rating || 0) ? "text-primary fill-primary" : "text-border"}`} />
                      ))}
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground">{f.created_at}</span>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => remove(f.id)} aria-label="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 whitespace-pre-wrap">{f.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackInbox;

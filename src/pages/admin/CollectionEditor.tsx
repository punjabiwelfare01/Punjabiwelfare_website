import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { api, ApiError, clearToken } from "@/lib/api";
import { collections } from "@/admin/config";
import FieldInput from "@/components/admin/FieldInput";
import { getIcon } from "@/lib/icons";

type Item = { id: number } & Record<string, string>;

const CollectionEditor = () => {
  const { section = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = collections.find((c) => c.key === section);

  const [editing, setEditing] = useState<Partial<Item> | null>(null);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [saving, setSaving] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["collection", section],
    queryFn: () => api.get<Item[]>(`/collections/${section}`),
    enabled: !!config,
  });

  useEffect(() => {
    setEditing(null);
  }, [section]);

  if (!config) return <p className="text-muted-foreground">Unknown section.</p>;

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ["collection", section] });
    queryClient.invalidateQueries({ queryKey: ["site-content"] });
  };

  const handleError = (err: unknown) => {
    if (err instanceof ApiError && err.status === 401) {
      clearToken();
      navigate("/admin/login");
      return;
    }
    toast.error(err instanceof Error ? err.message : "Something went wrong");
  };

  const saveItem = async () => {
    if (!editing) return;
    for (const field of config.fields) {
      if (field.required && !String(editing[field.key] || "").trim()) {
        toast.error(`${field.label} is required`);
        return;
      }
    }
    setSaving(true);
    try {
      if (editing.id) {
        await api.authPut(`/collections/${section}/${editing.id}`, editing);
        toast.success("Saved");
      } else {
        await api.authPost(`/collections/${section}`, editing);
        toast.success(`New ${config.itemNoun} added`);
      }
      setEditing(null);
      refresh();
    } catch (err) {
      handleError(err);
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async () => {
    if (!deleting) return;
    try {
      await api.authDelete(`/collections/${section}/${deleting.id}`);
      toast.success("Deleted");
      setDeleting(null);
      refresh();
    } catch (err) {
      handleError(err);
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const ids = items.map((i) => i.id);
    const target = index + dir;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    try {
      await api.authPut(`/collections/${section}/reorder`, { ids });
      refresh();
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">{config.label}</h1>
          <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
        </div>
        <Button onClick={() => setEditing({})}>
          <Plus className="w-4 h-4 mr-1" /> Add {config.itemNoun}
        </Button>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">No items yet. Add the first {config.itemNoun}.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => {
            const Icon = item.icon ? getIcon(item.icon) : null;
            return (
              <div key={item.id} className="bg-background border border-border rounded-xl p-4 flex items-center gap-4">
                {config.imageField && (
                  <img
                    src={item[config.imageField]}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover border border-border shrink-0"
                  />
                )}
                {Icon && (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground truncate">{item[config.titleField]}</p>
                  {item.role && <p className="text-xs text-muted-foreground truncate">{item.role}</p>}
                  {item.description && <p className="text-xs text-muted-foreground truncate">{item.description}</p>}
                  {item.value && <p className="text-xs text-muted-foreground">Value: {item.value}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down">
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setEditing(item)} aria-label="Edit">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setDeleting(item)} aria-label="Delete">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.id ? `Edit ${config.itemNoun}` : `Add ${config.itemNoun}`}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {config.fields.map((field) => (
              <FieldInput
                key={field.key}
                field={field}
                value={String(editing?.[field.key] ?? "")}
                onChange={(value) => setEditing((prev) => ({ ...prev, [field.key]: value }))}
              />
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={saveItem} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this {config.itemNoun}?</AlertDialogTitle>
            <AlertDialogDescription>
              "{deleting?.[config.titleField]}" will be removed from the website. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={deleteItem}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CollectionEditor;

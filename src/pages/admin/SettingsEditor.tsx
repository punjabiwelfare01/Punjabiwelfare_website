import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api, ApiError, clearToken } from "@/lib/api";
import { settingsSections } from "@/admin/config";
import FieldInput from "@/components/admin/FieldInput";

const SettingsEditor = () => {
  const { key = "" } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const config = settingsSections.find((s) => s.key === key);

  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["settings", key],
    queryFn: () => api.get<Record<string, string>>(`/settings/${key}`),
    enabled: !!config,
  });

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  if (!config) return <p className="text-muted-foreground">Unknown settings section.</p>;

  const save = async () => {
    setSaving(true);
    try {
      await api.authPut(`/settings/${key}`, form);
      toast.success("Saved");
      queryClient.invalidateQueries({ queryKey: ["settings", key] });
      queryClient.invalidateQueries({ queryKey: ["site-content"] });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        clearToken();
        navigate("/admin/login");
        return;
      }
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-foreground">{config.label}</h1>
        <p className="text-sm text-muted-foreground mt-1">{config.description}</p>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : (
        <div className="bg-background border border-border rounded-xl p-6 space-y-5">
          {config.fields.map((field) => (
            <FieldInput
              key={field.key}
              field={field}
              value={String(form[field.key] ?? "")}
              onChange={(value) => setForm((prev) => ({ ...prev, [field.key]: value }))}
            />
          ))}
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save Changes"}</Button>
        </div>
      )}
    </div>
  );
};

export default SettingsEditor;

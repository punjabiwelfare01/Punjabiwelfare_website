import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/lib/api";

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirm) {
      toast.error("New passwords do not match");
      return;
    }
    setSaving(true);
    try {
      await api.authPost("/auth/change-password", { currentPassword, newPassword });
      toast.success("Password updated");
      setCurrentPassword(""); setNewPassword(""); setConfirm("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground mb-1">Change Password</h1>
      <p className="text-sm text-muted-foreground mb-8">Use a strong password of at least 8 characters.</p>

      <form onSubmit={handleSubmit} className="bg-background border border-border rounded-xl p-6 space-y-5 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="current">Current Password</Label>
          <Input id="current" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required autoComplete="current-password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new">New Password</Label>
          <Input id="new" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} autoComplete="new-password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm">Confirm New Password</Label>
          <Input id="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={8} autoComplete="new-password" />
        </div>
        <Button type="submit" disabled={saving}>{saving ? "Updating…" : "Update Password"}</Button>
      </form>
    </div>
  );
};

export default AccountSettings;

import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, ListOrdered, Settings2, MessageSquare, KeyRound, LogOut, ExternalLink, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api, getToken, clearToken } from "@/lib/api";
import { collections, settingsSections } from "@/admin/config";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
    isActive ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-muted"
  }`;

const AdminLayout = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    api.authGet<{ email: string }>("/auth/me")
      .then((me) => setEmail(me.email))
      .catch(() => {
        clearToken();
        navigate("/admin/login", { replace: true });
      });
  }, [navigate]);

  const logout = () => {
    clearToken();
    navigate("/admin/login", { replace: true });
  };

  const nav = (
    <nav className="space-y-6 p-4">
      <div>
        <NavLink to="/admin" end className={linkClass} onClick={() => setMenuOpen(false)}>
          <LayoutDashboard className="w-4 h-4" /> Overview
        </NavLink>
      </div>

      <div>
        <p className="px-3 text-xs font-bold tracking-wider text-muted-foreground uppercase mb-2 flex items-center gap-1">
          <ListOrdered className="w-3 h-3" /> Sections
        </p>
        <div className="space-y-1">
          {collections.map((c) => (
            <NavLink key={c.key} to={`/admin/collections/${c.key}`} className={linkClass} onClick={() => setMenuOpen(false)}>
              {c.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div>
        <p className="px-3 text-xs font-bold tracking-wider text-muted-foreground uppercase mb-2 flex items-center gap-1">
          <Settings2 className="w-3 h-3" /> Texts & Settings
        </p>
        <div className="space-y-1">
          {settingsSections.map((s) => (
            <NavLink key={s.key} to={`/admin/settings/${s.key}`} className={linkClass} onClick={() => setMenuOpen(false)}>
              {s.label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="space-y-1 border-t border-border pt-4">
        <NavLink to="/admin/feedback" className={linkClass} onClick={() => setMenuOpen(false)}>
          <MessageSquare className="w-4 h-4" /> Feedback Inbox
        </NavLink>
        <NavLink to="/admin/account" className={linkClass} onClick={() => setMenuOpen(false)}>
          <KeyRound className="w-4 h-4" /> Change Password
        </NavLink>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-section-alt">
      <header className="bg-background border-b border-border sticky top-0 z-40">
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-display font-bold text-foreground">PWT Admin</span>
            {email && <span className="hidden sm:inline text-xs text-muted-foreground">({email})</span>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1" /> View Site
              </a>
            </Button>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`${menuOpen ? "block" : "hidden"} lg:block w-64 shrink-0 bg-background border-r border-border min-h-[calc(100vh-3.5rem)] overflow-y-auto`}>
          {nav}
        </aside>
        <main className="flex-1 p-4 md:p-8 max-w-4xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

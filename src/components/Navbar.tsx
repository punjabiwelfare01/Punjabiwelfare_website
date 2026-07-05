import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/#about-us" },
  { label: "OUR WORK", href: "/#our-work" },
  { label: "RECOGNITION", href: "/certificates" },
  { label: "SUPPORTERS", href: "/#testimonials" },
  { label: "CONTACT", href: "/#contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { settings } = useSiteContent();
  const general = settings.general;

  return (
    <nav className="bg-background sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <img src={general.logo} alt={general.siteName} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <span className="font-display font-bold text-lg leading-tight block text-foreground">{general.navTitle}</span>
            <span className="text-xs text-primary font-semibold">{general.navSubtitle}</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <Button asChild>
            <a href="#donate">Donate Now</a>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block py-3 text-sm font-semibold text-foreground hover:text-primary transition-colors border-b border-border"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button className="w-full mt-3" asChild>
            <a href="#donate">Donate Now</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

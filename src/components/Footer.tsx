import { MapPin, Clock, Phone, Mail, MessageCircle, Instagram, Youtube } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { settings } = useSiteContent();
  const footer = settings.footer;
  const general = settings.general;
  const waLink = `https://wa.me/${general.whatsapp.replace(/\D/g, "")}`;

  return (
    <footer className="bg-footer-bg text-footer-fg py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-2">{footer.heading}</h2>
          <p className="text-footer-fg/70">{footer.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-primary-foreground mb-2">Our Address</h3>
            <p className="text-sm text-footer-fg/70">{footer.addressLine1}</p>
            <p className="text-sm text-footer-fg/70">{footer.addressLine2}</p>
          </div>
          <div className="text-center">
            <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-primary-foreground mb-2">Working Hours</h3>
            <p className="text-sm text-footer-fg/70">{footer.hours}</p>
          </div>
          <div className="text-center">
            <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-primary-foreground mb-2">Contact</h3>
            <p className="text-sm text-footer-fg/70">{general.phone}</p>
            <p className="text-sm text-footer-fg/70">{general.email}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 mb-10">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="WhatsApp">
            <MessageCircle className="w-5 h-5" />
          </a>
          <a href={general.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href={general.youtube} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
          <a href={`tel:${general.whatsapp}`} className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="Call Us">
            <Phone className="w-5 h-5" />
          </a>
          <a href={`mailto:${general.email}`} className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="border-t border-footer-fg/10 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={general.logo} alt={general.siteName} className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display font-bold text-primary-foreground">{general.siteName}</span>
          </div>
          <p className="text-xs text-footer-fg/50">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

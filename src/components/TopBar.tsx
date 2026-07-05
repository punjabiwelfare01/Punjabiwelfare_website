import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";

const TopBar = () => {
  const { settings } = useSiteContent();
  const general = settings.general;
  const waLink = `https://wa.me/${general.whatsapp.replace(/\D/g, "")}`;

  return (
    <div className="bg-foreground text-primary-foreground py-2">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <span className="font-display font-semibold text-xs tracking-wider">{general.topBarText}</span>
        <div className="flex items-center gap-3">
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform duration-200 hover:scale-110">
            <MessageCircle className="w-7 h-7" />
          </a>
          <a href={general.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform duration-200 hover:scale-110">
            <Instagram className="w-7 h-7" />
          </a>
          <a href={general.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform duration-200 hover:scale-110">
            <Youtube className="w-7 h-7" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

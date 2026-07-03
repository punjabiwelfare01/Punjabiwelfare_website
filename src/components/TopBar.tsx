import { Instagram, Youtube, MessageCircle } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-foreground text-primary-foreground py-2">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <span className="font-display font-semibold text-xs tracking-wider">PUNJABI WELFARE TRUST NGO</span>
        <div className="flex items-center gap-3">
          <a href="https://wa.me/917834992799" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform duration-200 hover:scale-110">
            <MessageCircle className="w-7 h-7" />
          </a>
          <a href="https://www.instagram.com/punjabiwelfaretrust99?igsh=MXQ0bG52ZzZ1dDl6ZA==" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform duration-200 hover:scale-110">
            <Instagram className="w-7 h-7" />
          </a>
          <a href="https://youtube.com/@punjabiwelfaretrust99" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-transform duration-200 hover:scale-110">
            <Youtube className="w-7 h-7" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

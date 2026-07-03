import { MapPin, Clock, Phone, Mail, MessageCircle, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-footer-fg py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-primary-foreground mb-2">Visit Us</h2>
          <p className="text-footer-fg/70">Come visit our office and see our work first-hand. We'd love to meet you!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <MapPin className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-primary-foreground mb-2">Our Address</h3>
            <p className="text-sm text-footer-fg/70">Sadar Bazar, Delhi Cantt,</p>
            <p className="text-sm text-footer-fg/70">New Delhi, India</p>
          </div>
          <div className="text-center">
            <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-primary-foreground mb-2">Working Hours</h3>
            <p className="text-sm text-footer-fg/70">Mon – Sun: 9:00 AM – 6:00 PM</p>
           
          </div>
          <div className="text-center">
            <Phone className="w-6 h-6 text-primary mx-auto mb-3" />
            <h3 className="font-display font-semibold text-primary-foreground mb-2">Contact</h3>
            <p className="text-sm text-footer-fg/70">+91 78349 92799</p>
            <p className="text-sm text-footer-fg/70">punjabiwelfaretrust@gmail.com</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 mb-10">
          <a href="https://wa.me/917834992799" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="WhatsApp">
            <MessageCircle className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/punjabiwelfaretrust99?igsh=MXQ0bG52ZzZ1dDl6ZA==" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://youtube.com/@punjabiwelfaretrust99" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="YouTube">
            <Youtube className="w-5 h-5" />
          </a>
          <a href="tel:+917834992799" className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="Call Us">
            <Phone className="w-5 h-5" />
          </a>
          <a href="mailto:punjabiwelfaretrust@gmail.com" className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <div className="border-t border-footer-fg/10 pt-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img src={logo} alt="Punjabi Welfare Trust" className="w-8 h-8 rounded-full object-cover" />
            <span className="font-display font-bold text-primary-foreground">Punjabi Welfare Trust NGO</span>
          </div>
          <p className="text-xs text-footer-fg/50">© 2025 Punjabi Welfare Trust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

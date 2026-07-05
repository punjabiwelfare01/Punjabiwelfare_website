import {
  MapPin, Users, HandHeart, School, Stethoscope, Share2, CalendarDays, HandCoins,
  Heart, BookOpen, Utensils, Shirt, Home, Sun, Droplets, TreePine, GraduationCap,
  Baby, Ambulance, Gift, Globe, Sparkles, type LucideIcon,
} from "lucide-react";

// Icons an admin can pick for stats and volunteer activities.
export const iconMap: Record<string, LucideIcon> = {
  MapPin, Users, HandHeart, School, Stethoscope, Share2, CalendarDays, HandCoins,
  Heart, BookOpen, Utensils, Shirt, Home, Sun, Droplets, TreePine, GraduationCap,
  Baby, Ambulance, Gift, Globe, Sparkles,
};

export const iconNames = Object.keys(iconMap);

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}

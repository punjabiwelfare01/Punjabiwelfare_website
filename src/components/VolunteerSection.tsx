import { motion } from "framer-motion";
import { Stethoscope, Share2, CalendarDays, HandCoins } from "lucide-react";
import { Button } from "@/components/ui/button";
import volunteerImg from "@/assets/volunteer.jpeg";

const volunteerFormUrl = "https://forms.gle/mJFNbHfyfyvYcEex5";

const activities = [
  { icon: Stethoscope, label: "Medical Camp Assistance" },
  { icon: Share2, label: "Social Media Advocacy" },
  { icon: CalendarDays, label: "Event Management" },
  { icon: HandCoins, label: "Fundraising Support" },
];

const VolunteerSection = () => {
  return (
    <section id="about-us" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative group">
            <img src={volunteerImg} alt="Volunteers working together" className="rounded-lg w-full object-cover aspect-[4/5] transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border">
              <p className="font-display italic text-foreground text-lg">"Seva is the essence of life."</p>
              <p className="text-xs text-primary font-bold tracking-wider mt-1 uppercase">JOIN THE MOVEMENT</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-primary font-bold text-sm tracking-wider uppercase mb-2">JOIN OUR FAMILY</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Become a Volunteer</h2>
            <p className="text-muted-foreground mb-4">Join a community of dedicated individuals working towards a better society. Your time is the most valuable gift you can give.</p>
            <p className="text-muted-foreground mb-8">We believe that lasting change happens when ordinary people come together to do extraordinary things.</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {activities.map((a) => (
                <motion.div key={a.label} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 p-3 rounded-lg bg-section-alt cursor-default transition-shadow hover:shadow-md">
                  <a.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{a.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button asChild>
                <a href={volunteerFormUrl} target="_blank" rel="noopener noreferrer">Apply Now</a>
              </Button>
              <Button variant="outline" asChild><a href="#our-work">Learn More</a></Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;

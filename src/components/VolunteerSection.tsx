import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getIcon } from "@/lib/icons";

const VolunteerSection = () => {
  const { collections, settings } = useSiteContent();
  const section = settings.volunteerSection;
  const activities = collections.activities;

  return (
    <section id="about-us" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative group">
            <img src={section.image} alt="Volunteers working together" className="rounded-lg w-full object-cover aspect-[4/5] transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-4 border border-border">
              <p className="font-display italic text-foreground text-lg">{section.quote}</p>
              <p className="text-xs text-primary font-bold tracking-wider mt-1 uppercase">{section.quoteSub}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-primary font-bold text-sm tracking-wider uppercase mb-2">{section.tagline}</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">{section.heading}</h2>
            <p className="text-muted-foreground mb-4">{section.paragraph1}</p>
            <p className="text-muted-foreground mb-8">{section.paragraph2}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {activities.map((a) => {
                const Icon = getIcon(a.icon);
                return (
                  <motion.div key={a.id ?? a.label} whileHover={{ scale: 1.05 }} className="flex items-center gap-3 p-3 rounded-lg bg-section-alt cursor-default transition-shadow hover:shadow-md">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{a.label}</span>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button asChild>
                <a href={section.formUrl} target="_blank" rel="noopener noreferrer">Apply Now</a>
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

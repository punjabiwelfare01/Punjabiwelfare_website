import { motion } from "framer-motion";
import volSwejal from "@/assets/volSwejal.jpeg";
import vol22 from "@/assets/volunteer-22.jpeg";
import vol23 from "@/assets/volunteer-23.jpeg";

const volunteers = [
   { name: "Madhur Sharma", role: "WEBSITE DEVELOPER", photo: vol23 },
   { name: "Swejal Gupta", role: "WEBSITE DEVELOPER", photo: volSwejal },
  { name: "Prem Singh", role: "WEBSITE DEVELOPER", photo: vol22 },
 
];

const VolunteerTeamSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Our Volunteers</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Meet the dedicated young volunteers who are driving change on the ground every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {volunteers.map((v, i) => (
            <motion.div
              key={v.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-section-alt rounded-lg p-6 border border-border hover:border-primary/30 transition-all hover:shadow-lg cursor-default"
            >
              <div className="w-42 h-42 rounded-full overflow-hidden mx-auto mb-4 border-2 border-primary/20">
                <img src={v.photo} alt={v.name} className="w-full h-full object-cover object-[center_20%]" loading="lazy" />
              </div>
              <h3 className="font-display font-semibold text-foreground">{v.name}</h3>
              <p className="text-xs text-primary font-bold tracking-wider mt-1">{v.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VolunteerTeamSection;

import { motion } from "framer-motion";
import advisory1 from "@/assets/advisory-1.jpeg";
import advisory2 from "@/assets/advisory-2.jpeg";
import advisory3 from "@/assets/advisory-3.jpeg";
import advisory4 from "@/assets/advisory-4.jpeg";
import advisory5 from "@/assets/advisory-5.jpeg";
import advisory6 from "@/assets/advisory-6.jpeg";
import advisory7 from "@/assets/advisory-7.jpeg";
import advisory8 from "@/assets/advisory-8.jpeg";
import advisory9 from "@/assets/advisory-9.jpeg";
import advisory10 from "@/assets/advisory-10.jpeg";



const committeeMembers = [
  {name: "DEV RAJ AHUJA", role: "ADVISOR ", photo: advisory1 },
  {name: "PARAMJEET BINDRA", role: "ADVISOR ", photo: advisory2 },
  {name: "MADAN MOHAN MANGAL", role: "ADVISOR ", photo: advisory3 },
  {name: "NANAK SINGH", role: "ADVISOR ", photo: advisory4 },
  {name: "ARUN PANDEY", role: "ADVISOR ", photo: advisory5 },
  {name: "TARUN KUMAR BHAGRA ", role: "ADVISOR ", photo: advisory6 },
  {name: "SARTEJPAL SINGH ", role: "ADVISOR ", photo: advisory7 },
  {name: "RAJEEV KASHYAP", role: "ADVISOR ", photo: advisory8 },
  {name: "GURDEEP SINGH GILL", role: "ADVISOR ", photo: advisory9 },
  {name: "NAVINDER SINGH ", role: "ADVISOR ", photo: advisory10 }
  
];

const AdvisoryCommittee = () => {
  return (
    <section id="advisory-committee" className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Our Advisory Committee</h2>
          <div className="w-16 h-6 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            We are deeply grateful to the individuals who stand with us. Their generosity fuels our mission to serve humanity.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {committeeMembers.map((member, i) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-background rounded-2xl p-5 md:p-6 border border-border hover:border-primary/30 transition-all hover:shadow-lg cursor-default"
            >
              <div className="mx-auto mb-4 w-full max-w-[180px] rounded-2xl border-2 border-primary/20 bg-section-alt/80 p-3 shadow-sm">
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-b from-background to-muted/40">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>
              <h3 className="font-display font-semibold text-foreground">{member.name}</h3>
              <p className="text-xs text-primary font-bold tracking-wider mt-1">ADVISOR</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvisoryCommittee;

import { motion } from "framer-motion";
import supporter11 from "@/assets/supporter-11.jpeg";
import supporter12 from "@/assets/supporter-12.jpeg";
import supporter13 from "@/assets/supporter-13.jpeg";
import supporter14 from "@/assets/supporter-14.jpeg";
import supporter15 from "@/assets/supporter-15.jpeg";
import supporter16 from "@/assets/supporter-16.jpeg";
import supporter17 from "@/assets/supporter-17.jpeg";
import supporter18 from "@/assets/supporter-18.jpeg";
import supporter19 from "@/assets/supporter-19.jpeg";
import supporter20 from "@/assets/supporter-20.jpeg";
import dilsad from "@/assets/dilsad.jpeg";


const supporters = [
  { name: "UMINDER SINGH", role: "PRESIDENT", photo: supporter16 },
   { name: "BHARAT BHUSHAN SAHNI", role: "VICE-PRESIDENT", photo: supporter18 },
  { name: "H.S GROVER", role: "CHAIRMAN", photo: supporter14 },
  { name: "BHAGWANT SINGH", role: "VICE CHAIRMAN", photo: supporter17 },
  { name: "ATUL AGGARWAL", role: "GENERAL SECRETARY", photo: supporter19 },
  { name: "MANISH SHARMA ", role: "SECRETARY-1", photo: supporter11 },
  { name: "AMIT KUMAR", role: "SECRETARY-2", photo: supporter20 },
  { name: "MANOO KAPOOR", role: "CASHIER", photo: supporter12 },
  { name: "MUNEET SHARMA", role: "MEDIA PRABHARI", photo: supporter13 },
 { name: "RAMESH DUTT BHAT", role: "TREASURER", photo: supporter15 },
 { name: "DILSAD", role: "TECH MEMBER", photo: dilsad },
  
];

const SupportersSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Our Dedicated Supporters</h2>
          <div className="w-16 h-6 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            We are deeply grateful to the individuals who stand with us. Their generosity fuels our mission to serve humanity.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {supporters.map((s, i) => (
            <motion.div
              key={s.name}
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
                    src={s.photo}
                    alt={s.name}
                    className="w-full h-full object-contain object-center"
                    loading="lazy"
                  />
                </div>
              </div>
              <h3 className="font-display font-semibold text-foreground">{s.name}</h3>
              <p className="text-xs text-primary font-bold tracking-wider mt-1">{s.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportersSection;

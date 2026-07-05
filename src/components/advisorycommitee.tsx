import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";

const AdvisoryCommittee = () => {
  const { collections, settings } = useSiteContent();
  const committeeMembers = collections.committee;
  const section = settings.committeeSection;

  return (
    <section id="advisory-committee" className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{section.heading}</h2>
          <div className="w-16 h-6 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            {section.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {committeeMembers.map((member, i) => (
            <motion.div
              key={member.id ?? member.name}
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
              <p className="text-xs text-primary font-bold tracking-wider mt-1">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvisoryCommittee;

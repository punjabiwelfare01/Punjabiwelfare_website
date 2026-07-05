import { motion } from "framer-motion";
import { useSiteContent } from "@/hooks/useSiteContent";
import { getIcon } from "@/lib/icons";

const ImpactStats = () => {
  const { collections, settings } = useSiteContent();
  const stats = collections.stats;
  const impact = settings.impact;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => {
            const Icon = getIcon(stat.icon);
            return (
              <motion.div
                key={stat.id ?? stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="border-t border-border pt-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {impact.heading}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {impact.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;

import { motion } from "framer-motion";

const MapSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Find Us on the Map</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">Visit our office in Sadar Bazar, Delhi Cantt. We are always happy to welcome visitors and volunteers.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-xl overflow-hidden shadow-lg border border-border">
          <iframe
            title="Punjabi Welfare Trust Location - Sadar Bazar"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.0892547!2d77.1345!3d28.5963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d6f5c5e5e5f%3A0x1a2b3c4d5e6f7890!2sSadar%20Bazar%2C%20Delhi%20Cantt%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;

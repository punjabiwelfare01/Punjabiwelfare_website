import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const CTASection = () => {
  const { settings } = useSiteContent();
  const donate = settings.donate;

  return (
    <section id="donate" className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">{donate.heading}</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            {donate.description}
          </p>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="mb-8">
            <div className="inline-block bg-primary-foreground rounded-2xl p-3 shadow-lg">
              <img src={donate.qrImage} alt="Scan QR code to donate" className="w-52 h-52 mx-auto object-cover rounded-lg" />
            </div>
            <p className="text-primary-foreground/70 text-sm mt-3">{donate.qrCaption}</p>
            <p className="text-primary-foreground/60 text-xs mt-1">UPI ID: {donate.upiId}</p>
          </motion.div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="font-bold">Donate Now</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

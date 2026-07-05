import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Award, ArrowRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { Certificate } from "@/content/types";

export const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => {
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
      >
        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="relative group bg-section-alt p-4 cursor-zoom-in"
          aria-label={`View ${cert.title} full size`}
        >
          <div className="aspect-[3/4] overflow-hidden rounded-lg border border-border bg-background shadow-sm">
            <img
              src={cert.image}
              alt={cert.title}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <ZoomIn className="w-5 h-5 text-primary-foreground" />
            </div>
          </div>
        </button>
        <div className="p-6 flex flex-col flex-1 text-left">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 text-primary shrink-0" />
            {cert.date && <span className="text-xs font-bold tracking-wider text-primary uppercase">{cert.date}</span>}
          </div>
          <h3 className="font-display font-bold text-lg text-foreground mb-1">{cert.title}</h3>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{cert.issuer}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
        </div>
      </motion.article>

      <Dialog open={zoomed} onOpenChange={setZoomed}>
        <DialogContent className="max-w-3xl p-2 sm:p-4">
          <DialogTitle className="sr-only">{cert.title}</DialogTitle>
          <img src={cert.image} alt={cert.title} className="w-full max-h-[85vh] object-contain rounded-lg" />
        </DialogContent>
      </Dialog>
    </>
  );
};

const CertificatesSection = () => {
  const { collections, settings } = useSiteContent();
  const certificates = collections.certificates;
  const section = settings.certificatesSection;
  const featured = certificates.slice(0, 2);

  if (featured.length === 0) return null;

  return (
    <section id="recognition" className="py-20 bg-section-alt">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{section.heading}</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">{section.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featured.map((cert, i) => (
            <CertificateCard key={cert.id ?? cert.title} cert={cert} index={i} />
          ))}
        </div>

        {certificates.length > 2 && (
          <div className="text-center mt-10">
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link to="/certificates">
                View All {certificates.length} Certificates <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;

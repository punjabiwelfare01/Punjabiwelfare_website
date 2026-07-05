import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CertificateCard } from "@/components/CertificatesSection";
import { useSiteContent } from "@/hooks/useSiteContent";

const Certificates = () => {
  const { collections, settings } = useSiteContent();
  const certificates = collections.certificates;
  const section = settings.certificatesSection;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />

      <section className="py-16 bg-section-alt">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              {section.archiveHeading}
            </h1>
            <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full" />
            <p className="text-muted-foreground max-w-3xl mx-auto">{section.archiveDescription}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, i) => (
              <CertificateCard key={cert.id ?? cert.title} cert={cert} index={i % 3} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" asChild className="gap-2">
              <Link to="/"><ArrowLeft className="w-4 h-4" /> Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Certificates;

import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import CertificatesSection from "@/components/CertificatesSection";
import ImpactStats from "@/components/ImpactStats";
import VolunteerSection from "@/components/VolunteerSection";
import BlogSection from "@/components/BlogSection";
import Advisorycommitee from "@/components/advisorycommitee";
import SupportersSection from "@/components/SupportersSection";
import VolunteerTeamSection from "@/components/VolunteerTeamSection";
import VideosSection from "@/components/VideosSection";
import FeedbackSection from "@/components/FeedbackSection";
import CTASection from "@/components/CTASection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />
      <HeroSlider />
      <CertificatesSection />
      <ImpactStats />
      <VolunteerSection />
      <BlogSection />
      <SupportersSection />
      <Advisorycommitee />
      <VolunteerTeamSection />
      <VideosSection />
      <FeedbackSection />
      <CTASection />
      <MapSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

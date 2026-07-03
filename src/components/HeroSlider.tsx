import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import work1 from "@/assets/work-1.jpeg";
import work2 from "@/assets/work-2.jpeg";
import work3 from "@/assets/work-3.jpeg";


const slides = [
  {
    image: work1,
    badge: "FREE EDUCATION INITIATIVE",
    title: "Educating the Future",
    description: "Providing free communication education and library services to aspiring students.",
  },
  {
    image: work2,
    badge: "WINTER CLOTHING DRIVE",
    title: "Warmth for Every Family",
    description: "Distributing winter clothing to underprivileged families across Delhi and Punjab.",
  },
  {
    image: work3,
    badge: "ECO FRIENDLY DIWALI",
    title: "Green Diwali Campaign",
    description: "Spreading awareness for a pollution-free, eco-friendly Diwali celebration.",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img src={slides[current].image} alt={slides[current].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-hero-overlay/60" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-primary text-primary-foreground text-xs font-bold tracking-wider px-4 py-2 rounded mb-6">
              {slides[current].badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4 italic">
              {slides[current].title}
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg">
              {slides[current].description}
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild><a href="#donate">Donate Now</a></Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2 mt-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-primary" : "w-6 bg-primary-foreground/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;

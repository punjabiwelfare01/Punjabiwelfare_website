import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import work1 from "@/assets/work-1.jpeg";
import work2 from "@/assets/work-2.jpeg";
import work3 from "@/assets/work-3.jpeg";
import work4 from "@/assets/work-4.jpeg";
import work5 from "@/assets/work-5.jpeg";
import work6 from "@/assets/work-6.jpeg";
import work7 from "@/assets/work-7.jpeg";
import work8 from "@/assets/work-8.jpeg";
import work9 from "@/assets/work-9.jpeg";


const posts = [
  {
    title: "Free Communication Education",
    description: "Providing free communication education to underprivileged children, empowering them with language and life skills for a brighter future.",
    image: work1,
  },
  {
    title: "Winter Clothing Distribution Drive",
    description: "Distributing warm clothes, blankets, and winter essentials to families in need during the harsh winter months across Delhi.",
    image: work2,
  },
  {
    title: "Eco Friendly Diwali Awareness Rally",
    description: "Organizing rallies and campaigns to promote eco-friendly Diwali celebrations, encouraging people to burst ego not crackers.",
    image: work3,
  },
  {
    title: "Candle Light Tribute & Peace March",
    description: "Holding candlelight vigils and peace marches to honor the sacrifices of our heroes and promote harmony in the community.",
    image: work4,
  },
  {
    title: "Annual Winter Relief",
    description: "Our annual winter relief program provides blankets, warm clothing, and food to homeless and underprivileged families across the region.",
    image: work5,
  },
  {
    title: "Langar Seva: Providing Nutritious Meals to Vulnerable Communities",
    description: "Serving hot, nutritious meals to hundreds of people every week through our community kitchen and langar seva program.",
    image: work6,
  },
  {
    title: "Covid-19 Relief Efforts",
    description: "Reaching out to the most vulnerable during the Covid-19 pandemic with essential supplies and support.",
    image: work7,
  },
  {
    title: "Library with books, stationery, and tutoring at no cost.",
    description: "Students can access educational resources and support without any cost and useful for all with providing teacher guidance.",
    image: work8,
  },
  
    
];

const BlogSection = () => {
  const [showAll, setShowAll] = useState(false);
  const visiblePosts = showAll ? posts : posts.slice(0, 4);

  return (
    <section id="our-work" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Our Work & Stories</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Read about our latest initiatives and the impact we're making across communities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {visiblePosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 cursor-default"
            >
              <div className="overflow-hidden">
                <img src={post.image} alt={post.title} loading="lazy" className="w-full aspect-video object-cover transition-transform duration-500 hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        {posts.length > 4 && (
          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => setShowAll(!showAll)} className="gap-2">
              {showAll ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read More <ChevronDown className="w-4 h-4" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/hooks/useSiteContent";

const BlogSection = () => {
  const { collections, settings } = useSiteContent();
  const posts = collections.posts;
  const section = settings.ourWork;
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
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{section.heading}</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {section.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {visiblePosts.map((post, i) => (
            <motion.article
              key={post.id ?? post.title}
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

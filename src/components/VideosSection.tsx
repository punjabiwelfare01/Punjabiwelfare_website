import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import ytThumbnail from "@/assets/yt thumbnail.jpeg";
import ytThumbnail2 from "@/assets/yt thumbnail2.jpeg";
import ytThumbnail3 from "@/assets/yt thumbnail3.jpeg";

const channelUrl = "https://www.youtube.com/@punjabiwelfaretrust99";

const videos = [
  {
    title: "Punjabi Welfare Trust - Our Mission",
    description: "Watch how our trust is making a difference in the lives of underprivileged communities.",
    thumbnail: ytThumbnail3,
    url: channelUrl,
  },
  {
    title: "Community Service Highlights",
    description: "Highlights from our feeding, education and healthcare drives across Delhi and Punjab.",
    thumbnail:ytThumbnail2,
    url: channelUrl,
  },
  {
    title: "Join the Movement",
    description: "See how volunteers and donors are coming together to build a better tomorrow.",
    thumbnail: ytThumbnail,
    url: channelUrl,
  },
];

const VideosSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Watch Us in Action</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-4 rounded-full" />
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">Watch our volunteers on the ground and see the real-world difference your contributions make.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <motion.a
              key={v.title}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group bg-section-alt rounded-lg overflow-hidden border border-border hover:border-primary/40 transition-all text-left hover:shadow-lg"
            >
              <div className="relative overflow-hidden">
                <img src={v.thumbnail} alt={v.title} loading="lazy" className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/40 transition-all">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <Button className="mt-8" variant="outline" asChild>
          <a href={channelUrl} target="_blank" rel="noopener noreferrer">Subscribe on YouTube</a>
        </Button>
      </div>
    </section>
  );
};

export default VideosSection;

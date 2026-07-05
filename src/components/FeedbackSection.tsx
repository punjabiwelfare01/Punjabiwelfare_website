import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useSiteContent } from "@/hooks/useSiteContent";

const FeedbackSection = () => {
  const { settings } = useSiteContent();
  const section = settings.feedbackSection;
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) { toast.error("Please enter your feedback"); return; }
    setSubmitting(true);
    try {
      await api.post("/feedback", { name, rating, category, message });
      toast.success("Thank you for your feedback!");
      setMessage(""); setCategory(""); setRating(0); setName("");
    } catch {
      // API unavailable — fall back to the old mailto behaviour so feedback is never lost
      const body = `Name: ${encodeURIComponent(name)}%0ARating: ${rating}/5%0ACategory: ${encodeURIComponent(category)}%0AMessage: ${encodeURIComponent(message)}`;
      window.open(`mailto:${settings.general.email}?subject=Website Feedback&body=${body}`, "_self");
      toast.success("Thank you for your feedback!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-section-alt">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{section.heading}</h2>
          <p className="text-muted-foreground mb-8">{section.description}</p>
        </motion.div>

        <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="max-w-lg mx-auto space-y-5">
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground mb-2">Rate your experience</p>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="p-1 transition-transform duration-200 hover:scale-125">
                  <Star className={`w-8 h-8 transition-colors duration-200 ${star <= (hoverRating || rating) ? "text-primary fill-primary" : "text-border"}`} />
                </button>
              ))}
            </div>
          </div>

          <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Feedback</SelectItem>
              <SelectItem value="website">Website Improvement</SelectItem>
              <SelectItem value="cause">Cause Suggestion</SelectItem>
              <SelectItem value="volunteer">Volunteer Experience</SelectItem>
            </SelectContent>
          </Select>

          <Textarea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default FeedbackSection;

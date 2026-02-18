import { useState } from "react";
import { z } from "zod";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const feedbackSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  rating: z.number().min(1, "Please select a rating").max(5),
  suggestion: z.string().trim().min(1, "Please enter your feedback").max(2000, "Feedback must be under 2000 characters"),
});

type FeedbackData = z.infer<typeof feedbackSchema>;

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FeedbackData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = feedbackSchema.safeParse({ name, email, rating, suggestion });

    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof FeedbackData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    // Store in localStorage
    const existing = JSON.parse(localStorage.getItem("cyber-feedback") || "[]");
    existing.push({ ...result.data, timestamp: new Date().toISOString() });
    localStorage.setItem("cyber-feedback", JSON.stringify(existing));

    setSubmitted(true);
    toast({ title: "Thank you!", description: "Your feedback has been submitted." });
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 sm:px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </div>
        <h1 className="mb-2 font-mono text-2xl font-bold text-foreground">Feedback Submitted!</h1>
        <p className="mb-6 text-muted-foreground">Thank you for helping us improve the training platform.</p>
        <Button variant="outline" onClick={() => { setSubmitted(false); setName(""); setEmail(""); setRating(0); setSuggestion(""); }}>
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 font-mono text-3xl font-bold text-foreground">Your Feedback</h1>
      <p className="mb-8 text-muted-foreground">Help us improve the training experience with your suggestions.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Name</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={100}
            className="bg-secondary border-border"
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            maxLength={255}
            className="bg-secondary border-border"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>

        {/* Rating */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">Rate Your Experience</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="rounded p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-warning text-warning"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && <p className="mt-1 text-xs text-destructive">{errors.rating}</p>}
        </div>

        {/* Suggestion */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Suggestions & Feedback</label>
          <Textarea
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="What did you like? What can we improve?"
            rows={5}
            maxLength={2000}
            className="bg-secondary border-border resize-none"
          />
          <div className="mt-1 flex justify-between">
            {errors.suggestion && <p className="text-xs text-destructive">{errors.suggestion}</p>}
            <p className="ml-auto text-xs text-muted-foreground">{suggestion.length}/2000</p>
          </div>
        </div>

        <Button type="submit" className="w-full gap-2 gradient-cyber text-primary-foreground border-0 hover:glow-primary">
          <Send className="h-4 w-4" /> Submit Feedback
        </Button>
      </form>
    </div>
  );
}

import { useState } from "react";
import { phishingEmails } from "@/data/phishing-emails";
import { useProgress } from "@/hooks/useProgress";
import { Mail, AlertTriangle, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PhishingPage() {
  const { progress, savePhishingResult } = useProgress();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);

  const email = phishingEmails[currentIdx];
  const alreadyAnswered = progress.phishingResults[email.id] !== undefined;
  const isCorrect = userChoice === email.isPhishing;

  const handleAnswer = (isPhishing: boolean) => {
    setUserChoice(isPhishing);
    setAnswered(true);
    savePhishingResult(email.id, isPhishing === email.isPhishing);
  };

  const handleNext = () => {
    if (currentIdx < phishingEmails.length - 1) {
      setCurrentIdx((i) => i + 1);
      setAnswered(false);
      setUserChoice(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 font-mono text-3xl font-bold text-foreground">Phishing Email Simulator</h1>
      <p className="mb-8 text-muted-foreground">
        Analyze each email and decide if it's legitimate or a phishing attempt. ({currentIdx + 1}/{phishingEmails.length})
      </p>

      {/* Email card */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border bg-secondary/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">From</p>
              <p className="font-mono text-sm text-foreground">{email.from}</p>
            </div>
          </div>
          <p className="mt-2 font-semibold text-foreground">{email.subject}</p>
        </div>
        <div className="px-6 py-6">
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">{email.body}</pre>
        </div>
      </div>

      {/* Answer buttons */}
      {!answered ? (
        <div className="mt-6 flex gap-4">
          <Button
            onClick={() => handleAnswer(true)}
            className="flex-1 gap-2 border-destructive/50 bg-destructive/10 text-destructive hover:bg-destructive/20"
            variant="outline"
          >
            <AlertTriangle className="h-4 w-4" />
            This is Phishing
          </Button>
          <Button
            onClick={() => handleAnswer(false)}
            className="flex-1 gap-2 border-accent/50 bg-accent/10 text-accent hover:bg-accent/20"
            variant="outline"
          >
            <CheckCircle2 className="h-4 w-4" />
            This is Legitimate
          </Button>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div className={`flex items-start gap-3 rounded-xl border p-5 ${
            isCorrect
              ? "border-accent/50 bg-accent/10"
              : "border-destructive/50 bg-destructive/10"
          }`}>
            {isCorrect ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            )}
            <div>
              <p className={`font-mono font-semibold ${isCorrect ? "text-accent" : "text-destructive"}`}>
                {isCorrect ? "Correct!" : "Incorrect"}
              </p>
              <p className="mt-1 text-sm text-foreground">{email.explanation}</p>
            </div>
          </div>

          {email.isPhishing && email.clues.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-3 font-mono text-sm font-semibold text-foreground">Red Flags to Look For:</p>
              <ul className="space-y-2">
                {email.clues.map((clue, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-warning" />
                    {clue}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentIdx < phishingEmails.length - 1 && (
            <Button onClick={handleNext} className="w-full gap-2 gradient-cyber text-primary-foreground border-0">
              Next Email <ArrowRight className="h-4 w-4" />
            </Button>
          )}

          {currentIdx === phishingEmails.length - 1 && (
            <div className="rounded-xl border border-primary/30 bg-primary/10 p-5 text-center">
              <p className="font-mono font-semibold text-primary">Simulation Complete!</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You identified {Object.values(progress.phishingResults).filter(Boolean).length} out of {phishingEmails.length} emails correctly.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

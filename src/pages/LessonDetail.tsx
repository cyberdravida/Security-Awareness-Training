import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useCallback } from "react";
import { lessons } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

function shuffleWithMapping(options: string[], correctIndex: number) {
  const indexed = options.map((opt, i) => ({ opt, isCorrect: i === correctIndex }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  return {
    options: indexed.map((o) => o.opt),
    correctIndex: indexed.findIndex((o) => o.isCorrect),
  };
}

export default function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { progress, completeLesson, saveQuizScore } = useProgress();
  const lesson = lessons.find((l) => l.id === id);

  const [contentStep, setContentStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);

  const shuffledQuiz = useMemo(() => {
    if (!lesson) return [];
    return lesson.quiz.map((q) => {
      const shuffled = shuffleWithMapping(q.options, q.correctIndex);
      return { ...q, options: shuffled.options, correctIndex: shuffled.correctIndex };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, shuffleKey]);

  if (!lesson) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="font-mono text-xl text-foreground">Lesson not found</h2>
          <Link to="/lessons" className="mt-4 text-primary hover:underline">Back to lessons</Link>
        </div>
      </div>
    );
  }

  const isCompleted = progress.completedLessons.includes(lesson.id);
  const isLastContent = contentStep === lesson.content.length - 1;

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const score = shuffledQuiz.reduce((acc, q) => (quizAnswers[q.id] === q.correctIndex ? acc + 1 : acc), 0);
    saveQuizScore(lesson.id, score);
    completeLesson(lesson.id);
  };

  const score = shuffledQuiz.reduce((acc, q) => (quizAnswers[q.id] === q.correctIndex ? acc + 1 : acc), 0);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Link to="/lessons" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Lessons
      </Link>

      <div className="mb-2 flex items-center gap-2">
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{lesson.difficulty}</span>
        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
      </div>
      <h1 className="mb-8 font-mono text-3xl font-bold text-foreground">{lesson.title}</h1>

      {!showQuiz ? (
        <div>
          {/* Progress dots */}
          <div className="mb-6 flex items-center gap-2">
            {lesson.content.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i <= contentStep ? "gradient-cyber" : "bg-secondary"
                }`}
              />
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-8">
            <div className="flex items-start gap-4">
              <div className="mt-1 rounded-lg bg-primary/10 p-2 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <p className="text-foreground leading-relaxed">{lesson.content[contentStep]}</p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setContentStep((s) => s - 1)}
              disabled={contentStep === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>

            {isLastContent ? (
              <Button
                onClick={() => setShowQuiz(true)}
                className="gap-2 gradient-cyber text-primary-foreground hover:glow-primary border-0"
              >
                Take Quiz <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setContentStep((s) => s + 1)}
                className="gap-2"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mb-6 font-mono text-xl font-bold text-foreground">Quiz — {lesson.title}</h2>
          <div className="space-y-6">
            {shuffledQuiz.map((q, qi) => {
              const selected = quizAnswers[q.id];
              const isCorrect = selected === q.correctIndex;

              return (
                <div key={q.id} className="rounded-xl border border-border bg-card p-6">
                  <p className="mb-4 font-medium text-foreground">
                    {qi + 1}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, oi) => {
                      let optClass = "border-border bg-secondary hover:bg-muted";
                      if (quizSubmitted) {
                        if (oi === q.correctIndex) optClass = "border-accent/50 bg-accent/10 text-accent";
                        else if (oi === selected && !isCorrect) optClass = "border-destructive/50 bg-destructive/10 text-destructive";
                      } else if (selected === oi) {
                        optClass = "border-primary/50 bg-primary/10 text-primary";
                      }

                      return (
                        <button
                          key={oi}
                          onClick={() => !quizSubmitted && setQuizAnswers((a) => ({ ...a, [q.id]: oi }))}
                          className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${optClass}`}
                          disabled={quizSubmitted}
                        >
                          <span className="font-mono mr-2">{String.fromCharCode(65 + oi)}.</span> {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <div className={`mt-3 flex items-start gap-2 rounded-lg p-3 text-sm ${
                      isCorrect ? "bg-accent/10 text-accent" : "bg-destructive/10 text-destructive"
                    }`}>
                      {isCorrect ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0" />}
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            {!quizSubmitted ? (
              <>
                <Button variant="outline" onClick={() => setShowQuiz(false)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lesson
                </Button>
                <Button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < shuffledQuiz.length}
                  className="gradient-cyber text-primary-foreground border-0 hover:glow-primary"
                >
                  Submit Quiz
                </Button>
              </>
            ) : (
              <div className="w-full">
                <div className="mb-4 rounded-xl border border-border bg-card p-6 text-center">
                  <p className="font-mono text-2xl font-bold text-foreground">
                    {score}/{shuffledQuiz.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {score === shuffledQuiz.length ? "Perfect score! 🎉" : "Review the explanations above and try again."}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); setShuffleKey((k) => k + 1); }}>
                    Retake Quiz
                  </Button>
                  <Button onClick={() => navigate("/lessons")} className="gradient-cyber text-primary-foreground border-0">
                    Continue
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

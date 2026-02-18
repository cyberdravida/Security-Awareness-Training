import { Link } from "react-router-dom";
import { lessons } from "@/data/lessons";
import { useProgress } from "@/hooks/useProgress";
import { BookOpen, Shield, Fish, Target, Zap } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Lock: <Shield className="h-6 w-6" />,
  Fish: <Fish className="h-6 w-6" />,
  Bug: <Target className="h-6 w-6" />,
  Link: <Zap className="h-6 w-6" />,
  Shield: <Shield className="h-6 w-6" />,
};

export default function LessonsPage() {
  const { progress } = useProgress();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 font-mono text-3xl font-bold text-foreground">Training Modules</h1>
      <p className="mb-8 text-muted-foreground">Complete each lesson and pass the quiz to unlock the next module.</p>

      <div className="space-y-4">
        {lessons.map((lesson, idx) => {
          const completed = progress.completedLessons.includes(lesson.id);
          const locked = idx > 0 && !progress.completedLessons.includes(lessons[idx - 1].id);
          const quizScore = progress.quizScores[lesson.id];

          return (
            <Link
              key={lesson.id}
              to={locked ? "#" : `/lessons/${lesson.id}`}
              className={`group flex items-center gap-5 rounded-xl border bg-card p-6 transition-all ${
                locked
                  ? "cursor-not-allowed border-border opacity-50"
                  : "border-border hover:border-primary/50 hover:glow-primary"
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {iconMap[lesson.icon] || <BookOpen className="h-6 w-6" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">Module {idx + 1}</span>
                  {completed && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">✓ Complete</span>
                  )}
                  {locked && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">🔒 Locked</span>
                  )}
                </div>
                <h3 className="font-mono text-lg font-semibold text-foreground">{lesson.title}</h3>
                <p className="text-sm text-muted-foreground">{lesson.description}</p>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{lesson.duration}</span>
                  <span>{lesson.difficulty}</span>
                  <span>{lesson.quiz.length} quiz questions</span>
                  {quizScore !== undefined && <span className="text-primary">Best score: {quizScore}/{lesson.quiz.length}</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

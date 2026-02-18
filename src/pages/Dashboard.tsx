import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { lessons } from "@/data/lessons";
import { Shield, BookOpen, Fish, AlertTriangle, FolderOpen, Trophy, Star, Target, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const iconMap: Record<string, React.ReactNode> = {
  Lock: <Shield className="h-5 w-5" />,
  Fish: <Fish className="h-5 w-5" />,
  Bug: <Target className="h-5 w-5" />,
  Link: <Zap className="h-5 w-5" />,
  Shield: <Shield className="h-5 w-5" />,
};

export default function Dashboard() {
  const { progress, completionPercent, totalLessons } = useProgress();

  const allLessonsComplete = progress.completedLessons.length === totalLessons;
  const allQuizzesPassed = Object.keys(progress.quizScores).length === totalLessons;
  const certified = allLessonsComplete && allQuizzesPassed;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Shield className="h-3 w-3" />
              Security Awareness Training
            </div>
            <h1 className="mb-4 font-mono text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Build Your <span className="text-gradient-cyber">Cyber Defense</span> Skills
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              Interactive lessons, real-world simulations, and hands-on quizzes to protect yourself and your organization from cyber threats.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/lessons"
                className="inline-flex items-center gap-2 rounded-lg gradient-cyber px-6 py-3 font-medium text-primary-foreground transition-shadow hover:glow-primary"
              >
                <BookOpen className="h-4 w-4" />
                Start Learning
              </Link>
              <Link
                to="/phishing"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 font-medium text-secondary-foreground transition-colors hover:bg-muted"
              >
                <Fish className="h-4 w-4" />
                Phishing Simulation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Progress */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={<BookOpen className="h-5 w-5 text-primary" />} label="Lessons Completed" value={`${progress.completedLessons.length}/${totalLessons}`} />
          <StatCard icon={<Star className="h-5 w-5 text-warning" />} label="Points Earned" value={`${progress.points}`} />
          <StatCard icon={<Target className="h-5 w-5 text-accent" />} label="Quizzes Passed" value={`${Object.keys(progress.quizScores).length}/${totalLessons}`} />
          <StatCard icon={<Trophy className="h-5 w-5 text-accent" />} label="Status" value={certified ? "Certified ✓" : "In Progress"} />
        </div>

        {/* Progress bar */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-mono text-sm font-semibold text-foreground">Overall Progress</h2>
            <span className="font-mono text-sm text-primary">{completionPercent}%</span>
          </div>
          <Progress value={completionPercent} className="h-3" />
          {certified && (
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-accent">
              <Trophy className="h-4 w-4" />
              Congratulations! You've earned your Security Awareness Certificate!
            </div>
          )}
        </div>
      </section>

      {/* Lessons preview */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="mb-6 font-mono text-xl font-bold text-foreground">Training Modules</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, idx) => {
            const completed = progress.completedLessons.includes(lesson.id);
            const locked = idx > 0 && !progress.completedLessons.includes(lessons[idx - 1].id);
            return (
              <Link
                key={lesson.id}
                to={locked ? "#" : `/lessons/${lesson.id}`}
                className={`group rounded-xl border bg-card p-5 transition-all ${
                  locked
                    ? "cursor-not-allowed border-border opacity-50"
                    : "border-border hover:border-primary/50 hover:glow-primary"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {iconMap[lesson.icon] || <BookOpen className="h-5 w-5" />}
                  </div>
                  {completed && (
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                      Completed
                    </span>
                  )}
                  {locked && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      Locked
                    </span>
                  )}
                </div>
                <h3 className="mb-1 font-mono text-sm font-semibold text-foreground">{lesson.title}</h3>
                <p className="text-xs text-muted-foreground">{lesson.description}</p>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{lesson.duration}</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5">{lesson.difficulty}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <QuickLink to="/phishing" icon={<Fish className="h-6 w-6" />} title="Phishing Simulator" desc="Test your ability to spot fake emails" />
          <QuickLink to="/incidents" icon={<AlertTriangle className="h-6 w-6" />} title="Incident Reporting" desc="Practice responding to security incidents" />
          <QuickLink to="/resources" icon={<FolderOpen className="h-6 w-6" />} title="Resource Library" desc="Download guides and cheat sheets" />
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-2">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-mono text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function QuickLink({ to, icon, title, desc }: { to: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link
      to={to}
      className="group flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/50 hover:glow-primary"
    >
      <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
      <div>
        <h3 className="font-mono text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </Link>
  );
}

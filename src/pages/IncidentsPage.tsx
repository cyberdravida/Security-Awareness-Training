import { useState } from "react";
import { incidentScenarios } from "@/data/incidents";
import { useProgress } from "@/hooks/useProgress";
import { AlertTriangle, Database, Mail, CheckCircle2, XCircle } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Mail: <Mail className="h-6 w-6" />,
  Database: <Database className="h-6 w-6" />,
  AlertTriangle: <AlertTriangle className="h-6 w-6" />,
};

export default function IncidentsPage() {
  const { progress, saveIncidentResult } = useProgress();
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const scenario = incidentScenarios.find((s) => s.id === selectedScenario);

  const handleSubmit = (scenarioId: string, stepId: string) => {
    setSelectedStep(stepId);
    setSubmitted(true);
    saveIncidentResult(scenarioId, stepId);
  };

  const handleReset = () => {
    setSelectedScenario(null);
    setSelectedStep(null);
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="mb-2 font-mono text-3xl font-bold text-foreground">Incident Reporting Simulation</h1>
      <p className="mb-8 text-muted-foreground">Practice responding to real-world security incidents. Select a scenario and choose the best course of action.</p>

      {!selectedScenario ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {incidentScenarios.map((s) => {
            const done = progress.incidentResults[s.id] !== undefined;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedScenario(s.id)}
                className="group rounded-xl border border-border bg-card p-6 text-left transition-all hover:border-primary/50 hover:glow-primary"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    {iconMap[s.icon]}
                  </div>
                  {done && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">Done</span>}
                </div>
                <h3 className="font-mono text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{s.description}</p>
              </button>
            );
          })}
        </div>
      ) : scenario ? (
        <div>
          <button onClick={handleReset} className="mb-6 text-sm text-muted-foreground hover:text-foreground">
            ← Back to scenarios
          </button>
          <div className="rounded-xl border border-border bg-card p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-lg bg-primary/10 p-2 text-primary">{iconMap[scenario.icon]}</div>
              <h2 className="font-mono text-xl font-bold text-foreground">{scenario.title}</h2>
            </div>
            <p className="text-foreground">{scenario.description}</p>
          </div>

          <h3 className="mb-4 font-mono text-sm font-semibold text-muted-foreground">What would you do?</h3>
          <div className="space-y-3">
            {scenario.steps.map((step) => {
              let cls = "border-border bg-secondary hover:bg-muted";
              if (submitted) {
                if (step.isCorrect) cls = "border-accent/50 bg-accent/10";
                else if (step.id === selectedStep && !step.isCorrect) cls = "border-destructive/50 bg-destructive/10";
              } else if (step.id === selectedStep) {
                cls = "border-primary/50 bg-primary/10";
              }

              return (
                <div key={step.id}>
                  <button
                    onClick={() => !submitted && handleSubmit(scenario.id, step.id)}
                    className={`w-full rounded-xl border px-5 py-4 text-left text-sm transition-colors ${cls}`}
                    disabled={submitted}
                  >
                    <div className="flex items-start gap-3">
                      {submitted && step.isCorrect && <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />}
                      {submitted && step.id === selectedStep && !step.isCorrect && <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}
                      <span className="text-foreground">{step.text}</span>
                    </div>
                  </button>
                  {submitted && (step.id === selectedStep || step.isCorrect) && (
                    <p className={`mt-1 ml-7 text-xs ${step.isCorrect ? "text-accent" : "text-destructive"}`}>
                      {step.feedback}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {submitted && (
            <button
              onClick={handleReset}
              className="mt-6 rounded-lg gradient-cyber px-6 py-3 font-medium text-primary-foreground transition-shadow hover:glow-primary"
            >
              Try Another Scenario
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

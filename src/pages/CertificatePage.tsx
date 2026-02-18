import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { lessons } from "@/data/lessons";
import { Link } from "react-router-dom";
import { Award, Lock, Terminal, Cpu, Binary, Fingerprint, Download } from "lucide-react";
import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export default function CertificatePage() {
  const { progress, totalLessons } = useProgress();
  const [userName, setUserName] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("certificate");
    if (!element) return;
    setIsGenerating(true);
    try {
      // Force a fixed size for consistent rendering
      const origWidth = element.style.width;
      const origHeight = element.style.height;
      element.style.width = "1120px";
      element.style.height = "792px";

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#111827",
        width: 1120,
        height: 792,
      });

      // Restore original styles
      element.style.width = origWidth;
      element.style.height = origHeight;

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      // A4 landscape: 297 x 210 mm
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`CyberDravida-Learn-Certificate-${userName.trim().replace(/\s+/g, "-")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const allLessonsComplete = progress.completedLessons.length === totalLessons;
  const allQuizzesPassed = Object.keys(progress.quizScores).length === totalLessons;
  const certified = allLessonsComplete && allQuizzesPassed;

  if (!certified) {
    const remaining = lessons.filter((l) => !progress.completedLessons.includes(l.id));
    const quizRemaining = lessons.filter((l) => progress.quizScores[l.id] === undefined);

    return (
      <div className="mx-auto max-w-xl px-4 py-24 sm:px-6 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Lock className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="mb-2 font-mono text-2xl font-bold text-foreground">Certificate Locked</h1>
        <p className="mb-6 text-muted-foreground">Complete all lessons and quizzes to earn your Security Awareness Certificate.</p>

        {remaining.length > 0 && (
          <div className="mb-4 rounded-xl border border-border bg-card p-4 text-left">
            <p className="mb-2 text-sm font-medium text-foreground">Remaining Lessons:</p>
            <ul className="space-y-1">
              {remaining.map((l) => (
                <li key={l.id} className="text-sm text-muted-foreground">• {l.title}</li>
              ))}
            </ul>
          </div>
        )}
        {quizRemaining.length > 0 && (
          <div className="mb-6 rounded-xl border border-border bg-card p-4 text-left">
            <p className="mb-2 text-sm font-medium text-foreground">Quizzes Not Taken:</p>
            <ul className="space-y-1">
              {quizRemaining.map((l) => (
                <li key={l.id} className="text-sm text-muted-foreground">• {l.title}</li>
              ))}
            </ul>
          </div>
        )}

        <Link to="/lessons" className="inline-flex items-center gap-2 rounded-lg gradient-cyber px-6 py-3 font-medium text-primary-foreground hover:glow-primary">
          Continue Training
        </Link>
      </div>
    );
  }

  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const certId = `CST-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <h1 className="font-mono text-2xl font-bold text-foreground">Your Certificate</h1>
          <p className="text-sm text-muted-foreground">Enter your name below to generate your credential</p>
        </div>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Enter your full name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-64"
          />
          <button
            onClick={handleDownloadPDF}
            disabled={!userName.trim() || isGenerating}
            className="rounded-lg gradient-cyber px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:glow-primary disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isGenerating ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Certificate */}
      <div
        id="certificate"
        className="relative overflow-hidden rounded-2xl border border-border"
        style={{ backgroundColor: "hsl(220 20% 7%)" }}
      >
        {/* Background grid pattern */}
        <div className="absolute inset-0 cyber-grid opacity-30" />

        {/* Top accent bar */}
        <div className="h-1.5 w-full gradient-cyber" />

        {/* Corner brackets */}
        <div className="absolute left-5 top-6 h-10 w-10 border-l-2 border-t-2 rounded-tl-sm" style={{ borderColor: "hsl(205 100% 55% / 0.3)" }} />
        <div className="absolute right-5 top-6 h-10 w-10 border-r-2 border-t-2 rounded-tr-sm" style={{ borderColor: "hsl(205 100% 55% / 0.3)" }} />
        <div className="absolute bottom-5 left-5 h-10 w-10 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: "hsl(205 100% 55% / 0.3)" }} />
        <div className="absolute bottom-5 right-5 h-10 w-10 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: "hsl(205 100% 55% / 0.3)" }} />

        {/* Content */}
        <div className="relative flex h-full flex-col items-center justify-center px-10 py-10 sm:px-16 sm:py-12">

          {/* Header row with logo + org */}
          <div className="flex items-center gap-3 mb-2">
            <img src={logo} alt="CyberDravida logo" className="h-10 w-10 rounded-lg object-contain" />
            <div className="text-left">
              <p className="font-mono text-sm font-bold tracking-wider text-foreground">
                CYBERDRAVIDA
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Security Division
              </p>
            </div>
          </div>

          {/* Decorative line with terminal icons */}
          <div className="my-5 flex w-full max-w-md items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <Terminal className="h-3.5 w-3.5 text-primary" style={{ opacity: 0.4 }} />
            <Cpu className="h-3.5 w-3.5 text-primary" style={{ opacity: 0.4 }} />
            <Binary className="h-3.5 w-3.5 text-primary" style={{ opacity: 0.4 }} />
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Title */}
          <h2 className="mb-1 font-mono text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Certificate of Completion
          </h2>
          <h3 className="mb-6 font-mono text-2xl sm:text-3xl font-bold text-foreground">
            Security Awareness Training
          </h3>

          {/* Name section */}
          <p className="mb-1 text-xs uppercase tracking-widest text-muted-foreground">
            Awarded to
          </p>
          <p className="mb-1 font-mono text-3xl sm:text-4xl font-bold text-primary">
            {userName.trim() || "Your Name"}
          </p>
          <div className="mx-auto mt-1 mb-6 h-px w-56" style={{ background: "linear-gradient(to right, transparent, hsl(205 100% 55% / 0.4), transparent)" }} />

          {/* Description */}
          <p className="max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
            Has successfully completed all <span className="font-semibold text-foreground">{totalLessons} training modules</span> and
            passed all security assessments in cybersecurity awareness — including password security, phishing defense,
            malware awareness, link safety, and secure online practices.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex items-center gap-6 sm:gap-10">
            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1.5">
                <Award className="h-4 w-4 text-accent" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</span>
              </div>
              <p className="font-mono text-xl font-bold text-foreground">{progress.points}</p>
              <p className="text-[10px] text-muted-foreground">points</p>
            </div>

            <div className="h-12 w-px bg-border" />

            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1.5">
                <Fingerprint className="h-4 w-4 text-primary" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Issued</span>
              </div>
              <p className="font-mono text-sm font-semibold text-foreground">{date}</p>
            </div>

            <div className="h-12 w-px bg-border" />

            <div className="text-center">
              <div className="mb-1 flex items-center justify-center gap-1.5">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Cert ID</span>
              </div>
              <p className="font-mono text-xs font-semibold text-foreground">{certId}</p>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="mt-8 flex w-full max-w-md items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "hsl(215 15% 55% / 0.5)" }}>
              VERIFIED • ENCRYPTED • AUTHENTICATED
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
        </div>

        {/* Bottom accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 gradient-cyber" style={{ opacity: 0.6 }} />
      </div>
    </div>
  );
}

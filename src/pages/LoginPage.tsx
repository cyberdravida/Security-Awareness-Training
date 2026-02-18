import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { UserRound, AlertTriangle } from "lucide-react";
import logo from "@/assets/logo.png";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    navigate("/", { replace: true });
    return null;
  }

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        setError("Google sign-in failed. Please try again.");
      }
    } catch {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.signInAnonymously();
      if (error) {
        setError(error.message);
      }
    } catch {
      setError("Guest login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo & title */}
        <div className="mb-10 text-center">
          <img src={logo} alt="CyberDravida" className="mx-auto mb-4 h-20 w-20 object-contain" />
          <h1 className="font-mono text-2xl font-bold text-foreground">
            CyberDravida-<span className="text-primary">Learn</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Security Awareness Training Platform
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="mb-6 text-center font-mono text-lg font-semibold text-foreground">
            Sign in to continue
          </h2>

          {error && (
            <div className="mb-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Google login */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mb-4 w-full gap-3 bg-foreground text-background hover:bg-foreground/90"
            size="lg"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {loading ? "Signing in..." : "Continue with Google"}
          </Button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Guest login */}
          <Button
            onClick={handleGuestLogin}
            disabled={loading}
            variant="outline"
            className="w-full gap-3"
            size="lg"
          >
            <UserRound className="h-5 w-5" />
            {loading ? "Signing in..." : "Continue as Guest"}
          </Button>

          {/* Guest warning */}
          <div className="mt-5 flex items-start gap-2 rounded-lg bg-muted p-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Guest sessions are temporary.</span>{" "}
              All progress will be erased when you log out. Complete your certificate before logging out, or sign in with Google to save your progress.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

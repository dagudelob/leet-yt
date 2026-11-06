import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import {
  X,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Briefcase,
  Target,
  User,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const AuthOnboardingModal: React.FC = () => {
  const {
    user,
    isAuthenticated,
    hasCompletedOnboarding,
    isAuthModalOpen,
    authModalReason,
    closeAuthModal,
    signInWithGoogle,
    simulateLocalSignIn,
    saveOnboarding,
  } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [ageRange, setAgeRange] = useState(user?.ageRange || "25-34");
  const [occupation, setOccupation] = useState(user?.occupation || "Frontend / Fullstack Developer");
  const [primaryGoal, setPrimaryGoal] = useState(user?.primaryGoal || "Crack Tech & FAANG Interviews");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  // Determine view: if not authenticated -> Google Sign-in screen.
  // If authenticated but onboarding not completed -> Fast Onboarding Form (<45s).
  const isStepOnboarding = isAuthenticated && !hasCompletedOnboarding;

  const handleOnboardingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await saveOnboarding({
      fullName: fullName.trim() || "Developer",
      ageRange,
      occupation,
      primaryGoal,
    });
    setIsSubmitting(false);
  };

  const AGE_RANGES = ["< 20", "20 - 24", "25 - 34", "35 - 44", "45+"];

  const OCCUPATIONS = [
    "CS / Engineering Student",
    "Frontend / Fullstack Developer",
    "Backend / Systems Engineer",
    "Career Switcher / Bootcamp",
    "Self-Taught Programmer",
    "Engineering Manager / Other",
  ];

  const GOALS = [
    { id: "Crack Tech & FAANG Interviews", label: "Crack Tech & FAANG Interviews", desc: "Master patterns to pass technical coding screens" },
    { id: "Master DSA Fundamentals", label: "Master DSA Fundamentals", desc: "Build rock-solid intuition for data structures" },
    { id: "Competitive Programming", label: "Competitive Programming", desc: "Solve Hard problems fast with optimal Big-O" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-violet-500/40 bg-card text-card-foreground shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 rounded-full border border-border bg-secondary/80 p-2 text-muted-foreground hover:text-foreground transition-colors"
          title="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {!isStepOnboarding ? (
          /* STEP 1: GOOGLE SIGN-IN */
          <div className="space-y-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25">
              <Lock className="h-7 w-7" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300 mb-2">
                <Sparkles className="h-3.5 w-3.5" /> 100% Free Forever • No Credit Card
              </div>
              <h2 className="text-2xl font-extrabold text-foreground tracking-tight">
                Unlock Complete DSA Curriculum
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-sm mx-auto leading-relaxed">
                {authModalReason || "Sign in with Google to access all 7 levels, save your progress across devices, and use the Mermaid strategy flowchart."}
              </p>
            </div>

            {/* Perks list */}
            <div className="rounded-2xl border border-border/80 bg-secondary/30 p-4 text-left space-y-2.5 text-xs text-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Instant access to all 46 interactive lessons &amp; code templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Interactive Mermaid Decision Flowchart for LeetCode problems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Cloud progress tracking across desktop and mobile</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <div className="space-y-3">
              <button
                onClick={signInWithGoogle}
                className="w-full flex items-center justify-center gap-3 rounded-2xl border border-border/90 bg-white hover:bg-slate-50 text-slate-900 font-bold px-5 py-3.5 text-sm shadow-md transition-all hover:scale-[1.01]"
              >
                {/* Google "G" icon */}
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                Continue with Google
              </button>

              {!isSupabaseConfigured && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-2.5 text-[11px] text-amber-300 text-left">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <ShieldCheck className="h-3.5 w-3.5" /> Demo mode active
                  </div>
                  Clicking Continue with Google will simulate authentication locally until Supabase keys are added to <code>.env</code>.
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              <span>Takes less than 15 seconds to start</span>
            </div>
          </div>
        ) : (
          /* STEP 2: 45-SECOND ONBOARDING */
          <form onSubmit={handleOnboardingSubmit} className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold px-2 py-0.5 border border-emerald-500/30">
                  Step 2 of 2
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Quick profile (&lt; 45 sec)
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                Personalize Your Learning Experience
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Tell us a bit about yourself so we can calibrate problem recommendations and track your roadmap.
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-violet-400" /> Your Name or Nickname
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Alex Smith"
                className="w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-violet-500 focus:outline-none"
              />
            </div>

            {/* Age Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">Age Range</label>
              <div className="flex items-center gap-1.5 flex-wrap">
                {AGE_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setAgeRange(range)}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
                      ageRange === range
                        ? "border-violet-500 bg-violet-500/20 text-violet-200"
                        : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Occupation */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-cyan-400" /> Current Role or Status
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {OCCUPATIONS.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccupation(occ)}
                    className={`rounded-xl border p-2 text-left text-xs font-medium transition-all ${
                      occupation === occ
                        ? "border-cyan-500 bg-cyan-500/20 text-cyan-200 font-semibold"
                        : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Goal */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-amber-400" /> Primary Learning Goal
              </label>
              <div className="space-y-1.5">
                {GOALS.map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setPrimaryGoal(goal.id)}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                      primaryGoal === goal.id
                        ? "border-amber-400 bg-amber-500/20 text-foreground"
                        : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="text-xs font-bold text-foreground">{goal.label}</div>
                    <div className="text-[11px] text-muted-foreground">{goal.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold py-3 text-sm shadow-lg shadow-violet-600/25 transition-all"
            >
              <span>{isSubmitting ? "Saving..." : "Start Learning (All 7 Levels Unlocked)"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

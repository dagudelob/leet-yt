import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Sparkles,
  PlayCircle,
  Layers,
  GitBranch,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Star,
  Quote,
} from "lucide-react";

export const LandingSections: React.FC = () => {
  const { isAuthenticated, openAuthModal } = useAuth();

  // Mini-sandbox state for the live preview widget
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(4);
  const sampleArray = [2, 4, 7, 11, 15];
  const targetSum = 18;
  const currentSum = sampleArray[leftIdx] + sampleArray[rightIdx];
  const isMatch = currentSum === targetSum;

  const moveLeft = () => {
    if (leftIdx < rightIdx - 1) setLeftIdx((l) => l + 1);
  };
  const moveRight = () => {
    if (rightIdx > leftIdx + 1) setRightIdx((r) => r - 1);
  };
  const resetSandbox = () => {
    setLeftIdx(0);
    setRightIdx(4);
  };

  const TESTIMONIALS = [
    {
      name: "Camila R.",
      role: "Software Engineer at Mercado Libre",
      quote: "Instead of memorizing 200 random LeetCode solutions, the 7-level progression helped me spot patterns in under 30 seconds during my live coding interview.",
      stars: 5,
    },
    {
      name: "Mateo G.",
      role: "CS Junior, Career Switcher",
      quote: "The interactive state steppers make algorithms finally click. Seeing pointers move step-by-step is 10x better than reading dense academic textbooks.",
      stars: 5,
    },
    {
      name: "Julian D.",
      role: "Backend Developer preparing for FAANG",
      quote: "The Decision Flowchart at the end is pure gold. It gives you a crystal-clear decision tree to identify whether a problem is Sliding Window, DSU, or Monotonic Stack.",
      stars: 5,
    },
  ];

  const FAQS = [
    {
      q: "Is Leet-YT really 100% free?",
      a: "Yes. All 46 lessons, interactive state steppers, YouTube videos, and decision flowchart are completely free. We only require a quick Google Sign-in to save your learning progress in the cloud.",
    },
    {
      q: "Why learn the 7 levels before the Decision Flowchart?",
      a: "A flowchart is only useful if you understand the nodes it points to. By completing the 7 progressive levels first, you master each foundational data structure right before using the flowchart to classify complex problems.",
    },
    {
      q: "Which programming languages are supported?",
      a: "Every topic includes fully commented, copy-ready templates in both Python 3 (primary for videos) and TypeScript / JavaScript.",
    },
    {
      q: "How do the YouTube Shorts & Deep-Dive Videos work?",
      a: "Each of the 46 topics is paired with a fast-paced 45-second YouTube Short introducing the visual mental model, plus a comprehensive 10-15 minute deep-dive with code walkthrough and LeetCode problem breakdowns.",
    },
  ];

  return (
    <div className="space-y-20 pt-8 pb-16">
      {/* 1. INTERACTIVE LIVE SANDBOX PREVIEW */}
      <section className="rounded-3xl border border-violet-500/30 bg-gradient-to-b from-violet-950/20 via-card to-card p-6 sm:p-10 shadow-xl space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
            <Sparkles className="h-3 w-3" /> Try the Brilliant-Style Method Live
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Experience Active Learning: Two Pointers in Action
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Find two numbers that add up to <strong>Target = {targetSum}</strong> in a sorted array. Adjust the pointers yourself to eliminate O(N²) loops:
          </p>
        </div>

        {/* Live Interactive Widget */}
        <div className="max-w-xl mx-auto rounded-2xl border border-border bg-secondary/30 p-6 space-y-6">
          <div className="flex items-center justify-between text-xs font-mono font-semibold">
            <span className="text-muted-foreground">Sorted Array:</span>
            <span className={isMatch ? "text-emerald-400 font-bold" : "text-amber-300"}>
              Current Sum: {sampleArray[leftIdx]} + {sampleArray[rightIdx]} = {currentSum}{" "}
              {isMatch ? "🎉 MATCH!" : currentSum > targetSum ? "(Too large! Move R left)" : "(Too small! Move L right)"}
            </span>
          </div>

          {/* Array Cells */}
          <div className="flex items-center justify-center gap-3">
            {sampleArray.map((val, idx) => {
              const isLeft = idx === leftIdx;
              const isRight = idx === rightIdx;
              const isActive = isLeft || isRight;

              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-14 sm:w-16 h-14 rounded-2xl border flex items-center justify-center font-mono text-base font-bold transition-all ${
                      isMatch && isActive
                        ? "border-emerald-400 bg-emerald-500/25 text-emerald-200 ring-2 ring-emerald-400 scale-105"
                        : isActive
                        ? "border-violet-400 bg-violet-500/25 text-white ring-2 ring-violet-400 scale-105"
                        : "border-border bg-secondary/50 text-muted-foreground"
                    }`}
                  >
                    {val}
                  </div>
                  <div className="h-6 font-mono text-xs font-bold">
                    {isLeft && <span className="text-cyan-400">↑ L</span>}
                    {isRight && <span className="text-fuchsia-400">↑ R</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-border/70">
            <button
              onClick={moveLeft}
              disabled={isMatch || leftIdx >= rightIdx - 1}
              className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 px-4 py-2 text-xs font-bold text-cyan-300 disabled:opacity-30 transition-all"
            >
              Move Left Pointer (L++)
            </button>
            <button
              onClick={moveRight}
              disabled={isMatch || rightIdx <= leftIdx + 1}
              className="rounded-xl border border-fuchsia-500/40 bg-fuchsia-500/10 hover:bg-fuchsia-500/20 px-4 py-2 text-xs font-bold text-fuchsia-300 disabled:opacity-30 transition-all"
            >
              Move Right Pointer (R--)
            </button>
            <button
              onClick={resetSandbox}
              className="rounded-xl border border-border bg-secondary px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-all"
            >
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* 2. THREE PILLARS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            How Leet-YT Transforms Your DSA Intuition
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Three interconnected tools designed to replace rote memorization with deep structural intuition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-violet-500/30 bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-300">
              <PlayCircle className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              Dual YouTube Video Engine
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every topic features a 45-second YouTube Short introducing the visual mental model, followed by a complete deep-dive episode with complexity proofs and LeetCode problem breakdowns.
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-500/30 bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              Brilliant-Style Interactive Steppers
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              No wall of dry text. Step forward and backward through pointer mutations, call stacks, and array transitions before testing your understanding with quick concept checks.
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-500/30 bg-card p-6 space-y-3">
            <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
              <GitBranch className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">
              Post-Curriculum Decision Flowchart
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Placed strategically after the 7 levels: an interactive Mermaid decision tree that takes you from input constraints and problem signals directly to the winning algorithm.
            </p>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Trusted by Developers &amp; Interview Candidates
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Here is what engineers say after switching from passive reading to interactive visual models:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-border bg-secondary/20 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-foreground italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-border/60">
                <div className="text-xs font-bold text-foreground">{t.name}</div>
                <div className="text-[11px] text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FAQ */}
      <section className="space-y-8 max-w-3xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Everything you need to know about the curriculum, access, and methodology.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border bg-secondary/25 p-5 space-y-2"
            >
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-violet-400 shrink-0" />
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground pl-6 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="rounded-3xl border border-violet-500/40 bg-gradient-to-r from-violet-950/40 via-card to-indigo-950/40 p-8 sm:p-12 text-center space-y-5 shadow-2xl">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5" /> Start Free in Less Than 45 Seconds
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight max-w-2xl mx-auto leading-tight">
          Ready to Crack Technical Coding Interviews with Confidence?
        </h2>

        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Level 1 is open right now with zero friction. Create your free account to unlock the full 7 levels, Mermaid flowchart, and progress tracking across all 46 topics.
        </p>

        <div className="pt-2">
          {!isAuthenticated ? (
            <button
              onClick={() => openAuthModal("Unlock all 7 levels and cloud progress tracking")}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold px-8 py-3.5 text-sm shadow-xl shadow-violet-500/30 transition-all hover:scale-105"
            >
              <span>Create Free Account with Google</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/40 bg-emerald-500/15 px-6 py-3 text-xs font-bold text-emerald-300">
              <CheckCircle2 className="h-4 w-4" /> You have full unlocked access to all 7 levels!
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

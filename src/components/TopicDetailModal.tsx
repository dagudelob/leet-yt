import React, { useState, useEffect } from "react";
import { DSATopic, YouTubeVideoEntry } from "@/types/dsa";
import { ALL_DSA_TOPICS } from "@/data";
import { getTopicInteractiveBundle } from "@/data/brilliant-interactive";
import { extractYouTubeId } from "@/data/youtube-links";
import {
  X,
  PlayCircle,
  Code2,
  Trophy,
  Sparkles,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  Clock,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  Youtube,
  FileText,
  Layers,
  HelpCircle,
  Smartphone,
  MonitorPlay,
} from "lucide-react";

interface TopicDetailModalProps {
  topic: DSATopic | null;
  onClose: () => void;
  onSelectTopic: (topic: DSATopic) => void;
  isCompleted: boolean;
  onToggleComplete: (topicId: string) => void;
  solvedProblems: Set<number>;
  onToggleProblem: (problemNumber: number) => void;
  youtubeEntry?: YouTubeVideoEntry;
}

type ModalTab = "lesson" | "code" | "practice";

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onSelectTopic,
  isCompleted,
  onToggleComplete,
  solvedProblems,
  onToggleProblem,
  youtubeEntry,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>("lesson");
  const [codeLang, setCodeLang] = useState<"python" | "typescript">("python");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [videoFormat, setVideoFormat] = useState<"long" | "short">("long");

  // Brilliant.org Interactive State Stepper & Micro-Challenge states
  const [visualStepIndex, setVisualStepIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  useEffect(() => {
    setVisualStepIndex(0);
    setSelectedQuizOption(null);
    setVideoFormat("long");
  }, [topic?.id]);

  if (!topic) return null;

  const epNumStr = String(topic.order).padStart(2, "0");
  const longVideoId = extractYouTubeId(youtubeEntry?.youtubeUrl ?? "");
  const shortVideoId = extractYouTubeId(youtubeEntry?.shortYoutubeUrl ?? "");
  const activeVideoId = videoFormat === "long" ? longVideoId : shortVideoId;

  const { visualSteps, microChallenge } = getTopicInteractiveBundle(topic);
  const currentVisualStep =
    visualSteps[Math.min(visualStepIndex, visualSteps.length - 1)] ??
    visualSteps[0];

  const prevTopic = ALL_DSA_TOPICS.find((t) => t.order === topic.order - 1);
  const nextTopic = ALL_DSA_TOPICS.find((t) => t.order === topic.order + 1);

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl border border-violet-500/40 bg-card text-card-foreground shadow-2xl overflow-hidden">
        {/* TOP MODAL HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border bg-secondary/40 px-6 sm:px-8 py-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="rounded-lg bg-violet-600 px-2.5 py-0.5 font-mono text-xs font-extrabold text-white">
                Episode #{epNumStr}
              </span>
              <span className="rounded-lg border border-border bg-background/60 px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                Level {topic.level} • {topic.difficulty}
              </span>
              <span className="font-mono text-xs text-violet-300">
                {topic.englishTerm}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
              {topic.title}
            </h2>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
            <button
              onClick={() => onToggleComplete(topic.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-all ${
                isCompleted
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                  : "border-border bg-secondary hover:border-emerald-500/50 text-foreground"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Mastered
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4 text-muted-foreground" /> Mark Mastered
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-border bg-secondary/80 p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Close (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* CLEAN 3-TAB NAVIGATION FOR LEARNERS (NO CLUTTER) */}
        <div className="flex items-center gap-2 border-b border-border bg-secondary/20 px-6 sm:px-8 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("lesson")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "lesson"
                ? "border-violet-500 text-violet-300"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <PlayCircle className="h-4 w-4 text-rose-400" />
            1. Visual Lesson &amp; Video Walkthrough
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "code"
                ? "border-violet-500 text-violet-300"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code2 className="h-4 w-4 text-cyan-400" />
            2. Concept Check &amp; Code Blueprint
          </button>

          <button
            onClick={() => setActiveTab("practice")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "practice"
                ? "border-violet-500 text-violet-300"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Trophy className="h-4 w-4 text-amber-400" />
            3. Practice Problems ({topic.leetcodeProblems.length})
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* TAB 1: VISUAL LESSON & VIDEO */}
          {activeTab === "lesson" && (
            <div className="space-y-8">
              {/* Summary & Analogy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-border bg-secondary/20 p-6 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> Core Concept
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 space-y-2.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5" /> Visual Intuition
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {topic.analogy}
                  </p>
                </div>
              </div>

              {/* BRILLIANT.ORG INTERACTIVE STATE STEPPER */}
              {currentVisualStep && (
                <div className="rounded-3xl border border-violet-500/35 bg-gradient-to-b from-violet-950/25 via-card to-card p-6 sm:p-8 space-y-6 shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-300">
                        <Layers className="h-4 w-4" />
                      </span>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-violet-300">
                          Step-by-Step State Stepper
                        </div>
                        <h3 className="text-base font-bold text-foreground">
                          {currentVisualStep.stepTitle}
                        </h3>
                      </div>
                    </div>

                    {currentVisualStep.badge && (
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
                        {currentVisualStep.badge}
                      </span>
                    )}
                  </div>

                  {/* Visual Cells */}
                  <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap py-4">
                    {(currentVisualStep.cells || currentVisualStep.items || []).map((cell, idx) => {
                      const isActive = currentVisualStep.activeIndices.includes(idx);
                      const isSecondary = currentVisualStep.secondaryIndices?.includes(idx);
                      const pointerLabels = Object.entries(currentVisualStep.pointers ?? {})
                        .filter(([, pIdx]) => pIdx === idx)
                        .map(([label]) => label);

                      return (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          <div
                            className={`min-w-[68px] sm:min-w-[84px] rounded-2xl border px-3.5 py-3.5 text-center font-mono text-xs sm:text-sm font-bold transition-all duration-300 ${
                              isActive
                                ? "border-violet-400 bg-violet-500/25 text-white ring-2 ring-violet-400/40 scale-105 shadow-lg shadow-violet-500/15"
                                : isSecondary
                                ? "border-border/50 bg-secondary/20 text-muted-foreground opacity-50"
                                : "border-border bg-secondary/50 text-foreground"
                            }`}
                          >
                            {cell}
                          </div>
                          <div className="h-5 flex items-center justify-center gap-1">
                            {pointerLabels.map((lbl) => (
                              <span
                                key={lbl}
                                className="rounded-md bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.5 font-mono text-[10px] font-bold text-amber-300"
                              >
                                ↑ {lbl}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Stepper Controls */}
                  <div className="rounded-2xl border border-border/70 bg-secondary/30 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs sm:text-sm text-foreground leading-relaxed max-w-2xl">
                      {currentVisualStep.caption || currentVisualStep.explanation}
                    </p>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => setVisualStepIndex((i) => Math.max(0, i - 1))}
                        disabled={visualStepIndex === 0}
                        className="rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground disabled:opacity-35 hover:bg-secondary transition-colors"
                      >
                        Prev
                      </button>
                      <span className="font-mono text-xs text-muted-foreground px-1">
                        {visualStepIndex + 1} / {visualSteps.length}
                      </span>
                      <button
                        onClick={() =>
                          setVisualStepIndex((i) => Math.min(visualSteps.length - 1, i + 1))
                        }
                        disabled={visualStepIndex === visualSteps.length - 1}
                        className="rounded-xl bg-violet-600 hover:bg-violet-500 px-3.5 py-1.5 text-xs font-bold text-white disabled:opacity-35 transition-colors"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* VIDEO EMBED SECTION (LONG FORM & SHORT FORM TOGGLE) */}
              <div className="rounded-3xl border border-border bg-secondary/30 overflow-hidden">
                <div className="p-4 border-b border-border/70 flex flex-wrap items-center justify-between gap-3 bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-rose-500" />
                    <span className="text-xs font-bold text-foreground">
                      Episode #{epNumStr} Video Lessons
                    </span>
                  </div>

                  {/* Toggle Long Form vs Short Form */}
                  <div className="flex items-center gap-1 rounded-xl bg-background/80 p-1 border border-border">
                    <button
                      onClick={() => setVideoFormat("long")}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                        videoFormat === "long"
                          ? "bg-rose-600 text-white shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <MonitorPlay className="h-3 w-3" /> Full Deep-Dive (16:9)
                    </button>
                    <button
                      onClick={() => setVideoFormat("short")}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                        videoFormat === "short"
                          ? "bg-rose-600 text-white shadow"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Smartphone className="h-3 w-3" /> 45s Intro Short (9:16)
                    </button>
                  </div>
                </div>

                {activeVideoId ? (
                  <div className={`w-full bg-black flex items-center justify-center ${videoFormat === "short" ? "py-6" : ""}`}>
                    <div className={videoFormat === "short" ? "w-[300px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl" : "aspect-video w-full"}>
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${activeVideoId}`}
                        title={topic.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center space-y-3 bg-gradient-to-b from-rose-950/20 via-card to-card">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
                      <PlayCircle className="h-6 w-6" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground">
                      {videoFormat === "long" ? "Full Deep-Dive Video" : "YouTube Short Summary"} in Production
                    </h4>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto">
                      This video is currently being recorded and scheduled for publication. You can already study the concept check, state stepper, and code templates above!
                    </p>
                  </div>
                )}
              </div>

              {/* Complexity & Constraints */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <Clock className="h-3.5 w-3.5" /> Time Complexity
                  </div>
                  <div className="mt-1.5 font-mono text-xs sm:text-sm font-bold text-foreground">
                    {topic.timeComplexity.average}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    Worst case: {topic.timeComplexity.worst}
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <HardDrive className="h-3.5 w-3.5" /> Space Complexity
                  </div>
                  <div className="mt-1.5 font-mono text-xs sm:text-sm font-bold text-foreground">
                    {topic.spaceComplexity}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    {topic.timeComplexity.note}
                  </div>
                </div>

                <div className="rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-violet-300">
                    <Sparkles className="h-3.5 w-3.5" /> Constraint Signal (N)
                  </div>
                  <div className="mt-1.5 font-mono text-xs font-bold text-foreground leading-relaxed">
                    {topic.constraintHint}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONCEPT CHECK & CODE TEMPLATES */}
          {activeTab === "code" && (
            <div className="space-y-8">
              {/* Concept Check Question */}
              <div className="rounded-3xl border border-amber-500/35 bg-gradient-to-b from-amber-950/20 via-card to-card p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                      Predict-Before-Reveal Check
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      {microChallenge.question}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {microChallenge.options.map((option, idx) => {
                    const isChosen = selectedQuizOption === idx;
                    const isCorrect = idx === microChallenge.correctIndex;
                    const showResult = selectedQuizOption !== null;

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedQuizOption(idx)}
                        className={`rounded-2xl border p-3.5 text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${
                          !showResult
                            ? "border-border bg-secondary/40 hover:border-amber-400/60 hover:bg-secondary/70 text-foreground"
                            : isCorrect
                            ? "border-emerald-500 bg-emerald-500/15 text-emerald-200 font-semibold"
                            : isChosen
                            ? "border-rose-500 bg-rose-500/15 text-rose-200"
                            : "border-border/50 bg-secondary/20 text-muted-foreground opacity-60"
                        }`}
                      >
                        <span>{option}</span>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedQuizOption !== null && (
                  <div
                    className={`rounded-2xl border p-4 text-xs sm:text-sm leading-relaxed ${
                      selectedQuizOption === microChallenge.correctIndex
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-200"
                        : "border-amber-500/40 bg-amber-500/10 text-amber-200"
                    }`}
                  >
                    <strong>
                      {selectedQuizOption === microChallenge.correctIndex ? "Spot on! " : "Not quite — "}
                    </strong>
                    {microChallenge.explanation}
                  </div>
                )}
              </div>

              {/* Code Language Switcher */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCodeLang("python")}
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        codeLang === "python"
                          ? "bg-violet-600 text-white shadow"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Python 3 (Primary Video Template)
                    </button>
                    <button
                      onClick={() => setCodeLang("typescript")}
                      className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                        codeLang === "typescript"
                          ? "bg-cyan-600 text-white shadow"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      TypeScript / JavaScript
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      copyText(
                        "code-template",
                        codeLang === "python" ? topic.pythonTemplate : topic.typescriptTemplate
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary/80"
                  >
                    {copiedKey === "code-template" ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" /> Code Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy Template
                      </>
                    )}
                  </button>
                </div>

                <pre className="rounded-3xl border border-border bg-slate-950 p-5 sm:p-6 font-mono text-xs sm:text-sm text-slate-100 overflow-x-auto leading-relaxed">
                  <code>{codeLang === "python" ? topic.pythonTemplate : topic.typescriptTemplate}</code>
                </pre>
              </div>

              {/* Step-by-Step & Traps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-border bg-secondary/25 p-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Step-by-Step Implementation Recipe
                  </h4>
                  <ol className="space-y-2 text-xs sm:text-sm text-foreground list-decimal list-inside leading-relaxed">
                    {topic.notebookLM.stepByStepWalkthrough.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Interview Traps &amp; Common Bugs
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-foreground leading-relaxed">
                    {topic.notebookLM.interviewTraps.map((trap, i) => (
                      <li key={i}>• {trap}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEETCODE PROBLEMS */}
          {activeTab === "practice" && (
            <div className="space-y-5">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Apply the <strong className="text-foreground">{topic.shortTitle}</strong> pattern on these {topic.leetcodeProblems.length} canonical LeetCode challenges:
              </p>

              <div className="space-y-4">
                {topic.leetcodeProblems.map((prob) => {
                  const isSolved = solvedProblems.has(prob.number);
                  const diffBadge =
                    prob.difficulty === "Easy"
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      : prob.difficulty === "Medium"
                      ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                      : "bg-rose-500/15 text-rose-300 border-rose-500/30";

                  return (
                    <div
                      key={prob.number}
                      className={`rounded-2xl border p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSolved
                          ? "border-emerald-500/40 bg-emerald-950/15"
                          : "border-border bg-secondary/25"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <button
                          onClick={() => onToggleProblem(prob.number)}
                          className="mt-0.5 text-muted-foreground hover:text-emerald-400"
                        >
                          {isSolved ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>
                        <div>
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span className="font-mono text-xs font-bold text-violet-300">
                              LeetCode #{prob.number}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-foreground">
                              {prob.title}
                            </span>
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${diffBadge}`}
                            >
                              {prob.difficulty}
                            </span>
                          </div>
                          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            <strong className="text-foreground">Pattern Hint:</strong> {prob.patternHint}
                          </p>
                        </div>
                      </div>

                      <a
                        href={`https://leetcode.com/problems/${prob.slug}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-primary-foreground hover:opacity-90 shrink-0 self-start sm:self-center"
                      >
                        Solve on LeetCode <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="border-t border-border bg-secondary/40 px-6 sm:px-8 py-4 flex items-center justify-between gap-2 text-xs">
          {prevTopic ? (
            <button
              onClick={() => onSelectTopic(prevTopic)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background/70 hover:bg-background px-3.5 py-2 font-semibold text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> #{String(prevTopic.order).padStart(2, "0")} {prevTopic.shortTitle}
            </button>
          ) : (
            <div />
          )}

          <span className="text-muted-foreground hidden sm:inline">
            Episode {topic.order} of {ALL_DSA_TOPICS.length}
          </span>

          {nextTopic ? (
            <button
              onClick={() => onSelectTopic(nextTopic)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background/70 hover:bg-background px-3.5 py-2 font-semibold text-foreground transition-colors"
            >
              #{String(nextTopic.order).padStart(2, "0")} {nextTopic.shortTitle} <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

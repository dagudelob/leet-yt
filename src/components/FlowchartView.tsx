import React, { useState } from "react";
import {
  DSATopic,
  YouTubeVideoEntry,
  TopicKind,
} from "@/types/dsa";
import {
  FLOWCHART_DECISION_NODES,
  VISUAL_FLOWCHART_BRANCHES,
  CONSTRAINT_CHEATSHEET,
} from "@/data/flowchart-decision-tree";
import { TOPICS_BY_ID } from "@/data";
import {
  Compass,
  RotateCcw,
  ChevronRight,
  Cpu,
  PlayCircle,
  CheckCircle2,
  Database,
  Code2,
  Sparkles,
  FileText,
  HelpCircle,
  ArrowDown,
  Filter,
} from "lucide-react";

interface FlowchartViewProps {
  topics: DSATopic[];
  onSelectTopic: (topic: DSATopic) => void;
  completedTopics: Set<string>;
  youtubeLinks: Record<string, YouTubeVideoEntry>;
  searchQuery: string;
}

export const FlowchartView: React.FC<FlowchartViewProps> = ({
  onSelectTopic,
  completedTopics,
  youtubeLinks,
  searchQuery,
}) => {
  // Step-by-step interactive wizard state
  const [wizardPath, setWizardPath] = useState<
    Array<{ questionId: string; chosenLabel?: string }>
  >([{ questionId: "q-root" }]);
  const [selectedConstraintMaxN, setSelectedConstraintMaxN] = useState<
    number | null
  >(null);
  const [kindFilter, setKindFilter] = useState<"all" | TopicKind>("all");
  const [showWizard, setShowWizard] = useState<boolean>(true);

  const currentWizardStep = wizardPath[wizardPath.length - 1];
  const currentQuestionNode =
    FLOWCHART_DECISION_NODES[currentWizardStep.questionId];

  const activeConstraintRow = CONSTRAINT_CHEATSHEET.find(
    (row) => row.maxN === selectedConstraintMaxN
  );
  const highlightedByConstraint = new Set(
    activeConstraintRow?.recommendedTopicIds ?? []
  );

  const handleWizardChoice = (
    optionLabel: string,
    targetNodeId: string,
    isTopic: boolean
  ) => {
    if (isTopic) {
      const targetTopic = TOPICS_BY_ID[targetNodeId];
      if (targetTopic) {
        onSelectTopic(targetTopic);
      }
      return;
    }
    setWizardPath((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = {
        ...updated[updated.length - 1],
        chosenLabel: optionLabel,
      };
      updated.push({ questionId: targetNodeId });
      return updated;
    });
  };

  const resetWizard = () => {
    setWizardPath([{ questionId: "q-root" }]);
  };

  const matchesFilters = (topic: DSATopic): boolean => {
    if (kindFilter !== "all" && topic.kind !== kindFilter) {
      if (!(kindFilter === "data-structure" && topic.kind === "hybrid")) {
        if (!(kindFilter === "algorithm" && topic.kind === "hybrid")) {
          return false;
        }
      }
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      topic.title.toLowerCase().includes(q) ||
      topic.shortTitle.toLowerCase().includes(q) ||
      topic.englishTerm.toLowerCase().includes(q) ||
      topic.summary.toLowerCase().includes(q) ||
      topic.timeComplexity.average.toLowerCase().includes(q) ||
      topic.leetcodeProblems.some((p) => p.title.toLowerCase().includes(q))
    );
  };

  const renderTopicLeafNode = (topicId: string) => {
    const topic = TOPICS_BY_ID[topicId];
    if (!topic) return null;

    const isVisible = matchesFilters(topic);
    const isConstraintHighlighted =
      selectedConstraintMaxN !== null && highlightedByConstraint.has(topic.id);
    const isDimmed =
      !isVisible ||
      (selectedConstraintMaxN !== null && !isConstraintHighlighted);

    const isDone = completedTopics.has(topic.id);
    const yt = youtubeLinks[topic.id];
    const hasVideo = Boolean(yt?.youtubeUrl);

    const kindBadge =
      topic.kind === "data-structure" ? (
        <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] font-medium text-cyan-300 border border-cyan-500/30">
          <Database className="h-2.5 w-2.5" /> Structure
        </span>
      ) : topic.kind === "hybrid" ? (
        <span className="inline-flex items-center gap-1 rounded-md bg-fuchsia-500/15 px-2 py-0.5 text-[10px] font-medium text-fuchsia-300 border border-fuchsia-500/30">
          <Sparkles className="h-2.5 w-2.5" /> DS + Pattern
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-md bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium text-violet-300 border border-violet-500/30">
          <Code2 className="h-2.5 w-2.5" /> Pattern
        </span>
      );

    return (
      <button
        key={topic.id}
        onClick={() => onSelectTopic(topic)}
        className={`group relative w-full text-left rounded-2xl border p-4 transition-all duration-200 ${
          isConstraintHighlighted
            ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10 scale-[1.01]"
            : isDone
            ? "border-emerald-500/50 bg-emerald-950/20 hover:border-emerald-400"
            : "border-border/80 bg-card/95 hover:border-violet-400 hover:bg-accent/40 hover:shadow-md hover:shadow-violet-500/10"
        } ${isDimmed ? "opacity-25 scale-95" : "opacity-100"}`}
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
              #{String(topic.order).padStart(2, "0")}
            </span>
            {kindBadge}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {hasVideo ? (
              <span
                title="YouTube video available"
                className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 border border-rose-500/40 px-2 py-0.5 text-[10px] font-semibold text-rose-300"
              >
                <PlayCircle className="h-3 w-3 text-rose-400" /> Video
              </span>
            ) : (
              <span
                title="Interactive Lesson & Script Ready"
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground group-hover:text-foreground"
              >
                <FileText className="h-2.5 w-2.5" /> Lesson
              </span>
            )}
            {isDone && (
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            )}
          </div>
        </div>

        <h4 className="text-sm font-bold text-foreground group-hover:text-violet-300 transition-colors leading-snug">
          {topic.shortTitle}
        </h4>
        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {topic.summary}
        </p>

        <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between gap-2 text-[11px]">
          <span className="font-mono text-emerald-400 font-medium truncate">
            {topic.timeComplexity.average.split("|")[0].trim()}
          </span>
          <span className="text-muted-foreground group-hover:text-violet-300 inline-flex items-center gap-0.5 font-semibold shrink-0">
            Explore <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-8">
      {/* TOP BAR: Interactive Decision Navigator + Constraint Cheatsheet */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left 7 cols: Step-by-step Decision Tree Navigator */}
        <div className="xl:col-span-7 rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-950/25 via-card to-card p-6 sm:p-8 shadow-lg">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20 border border-violet-500/40 text-violet-300">
                <Compass className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  Interactive Decision Navigator
                  <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-violet-300">
                    Step-by-Step
                  </span>
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Answer one focused question at a time to narrow down the exact pattern for your problem
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {wizardPath.length > 1 && (
                <button
                  onClick={resetWizard}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/70 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </button>
              )}
              <button
                onClick={() => setShowWizard((v) => !v)}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                {showWizard ? "Collapse" : "Expand"}
              </button>
            </div>
          </div>

          {showWizard && currentQuestionNode && (
            <div className="space-y-4">
              {/* Breadcrumb trail */}
              {wizardPath.length > 1 && (
                <div className="flex items-center gap-1.5 flex-wrap text-xs bg-secondary/40 rounded-xl px-3.5 py-2 border border-border/60">
                  <span className="text-muted-foreground font-medium">Path:</span>
                  {wizardPath.slice(0, -1).map((step, idx) => (
                    <React.Fragment key={step.questionId}>
                      <button
                        onClick={() =>
                          setWizardPath((prev) => prev.slice(0, idx + 1))
                        }
                        className="text-violet-300 hover:underline font-medium"
                      >
                        {step.chosenLabel}
                      </button>
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    </React.Fragment>
                  ))}
                  <span className="text-foreground font-semibold">
                    Current Question
                  </span>
                </div>
              )}

              {/* Current Question Banner */}
              <div className="rounded-2xl border border-violet-500/40 bg-violet-500/10 px-5 py-4 flex items-center gap-3.5">
                <div className="flex h-8 w-8 shrink-0 rotate-45 items-center justify-center rounded-lg bg-violet-500 text-white shadow">
                  <HelpCircle className="h-4 w-4 -rotate-45" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-violet-300">
                    Decision Node ({currentQuestionNode.category})
                  </div>
                  <div className="text-sm sm:text-base font-bold text-foreground mt-0.5">
                    {currentQuestionNode.label}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestionNode.options.map((opt, idx) => {
                  const targetTopic = opt.isTopic
                    ? TOPICS_BY_ID[opt.targetNodeId]
                    : null;
                  return (
                    <button
                      key={idx}
                      onClick={() =>
                        handleWizardChoice(
                          opt.label,
                          opt.targetNodeId,
                          opt.isTopic
                        )
                      }
                      className={`group flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                        opt.isTopic
                          ? "border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-400 hover:bg-emerald-500/15"
                          : "border-border bg-secondary/40 hover:border-violet-400 hover:bg-secondary/80"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-foreground group-hover:text-violet-200 leading-relaxed">
                            {opt.label}
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        {opt.conditionHint && (
                          <p className="mt-1.5 text-[11px] text-muted-foreground leading-relaxed">
                            {opt.conditionHint}
                          </p>
                        )}
                      </div>
                      {targetTopic && (
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
                          <Sparkles className="h-3 w-3" /> Open #
                          {String(targetTopic.order).padStart(2, "0")}{" "}
                          {targetTopic.shortTitle}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right 5 cols: Runtime-to-Algorithm Cheatsheet (Constraint N Filter) */}
        <div className="xl:col-span-5 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-card to-card p-6 sm:p-8 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    Constraint N -&gt; Complexity Filter
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Select your problem&apos;s maximum N to highlight compatible patterns on the canvas
                  </p>
                </div>
              </div>
              {selectedConstraintMaxN !== null && (
                <button
                  onClick={() => setSelectedConstraintMaxN(null)}
                  className="text-xs text-amber-300 hover:underline font-medium shrink-0"
                >
                  Clear filter
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CONSTRAINT_CHEATSHEET.map((row) => {
                const isSelected = selectedConstraintMaxN === row.maxN;
                return (
                  <button
                    key={row.maxN}
                    onClick={() =>
                      setSelectedConstraintMaxN(isSelected ? null : row.maxN)
                    }
                    className={`rounded-xl border p-2.5 text-left transition-all ${
                      isSelected
                        ? "border-amber-400 bg-amber-500/20 ring-1 ring-amber-400"
                        : "border-border/80 bg-secondary/40 hover:border-amber-500/50"
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-amber-300">
                      {row.constraint}
                    </div>
                    <div className="font-mono text-[10px] text-foreground font-semibold mt-1">
                      -&gt; {row.targetComplexity}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {activeConstraintRow ? (
            <div className="mt-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-xs">
              <div className="font-bold text-amber-200 mb-1">
                With {activeConstraintRow.constraint} you need{" "}
                <span className="font-mono underline">
                  {activeConstraintRow.targetComplexity}
                </span>
                :
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {activeConstraintRow.explanation} ({highlightedByConstraint.size}{" "}
                matching nodes highlighted below).
              </p>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-border/60 bg-secondary/30 p-4 text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Interview Tip:</strong> Before picking a branch on the
              Flowchart, check the <code className="text-foreground">Constraints</code> at the bottom of the
              problem. If you see <code className="text-amber-300">N &lt;= 10^5</code>, immediately eliminate
              every <code className="text-rose-300">O(N^2)</code> approach.
            </div>
          )}
        </div>
      </div>

      {/* FILTER BAR FOR VISUAL FLOWCHART */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/70 px-5 py-3.5">
        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-4 w-4 text-violet-400" />
          <span className="font-semibold text-foreground">
            Complete Decision Flowchart Canvas (46 Nodes across 8 Architectural Branches):
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setKindFilter("all")}
            className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
              kindFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            All Nodes (46)
          </button>
          <button
            onClick={() => setKindFilter("data-structure")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
              kindFilter === "data-structure"
                ? "bg-cyan-600 text-white"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Database className="h-3.5 w-3.5" /> Data Structures
          </button>
          <button
            onClick={() => setKindFilter("algorithm")}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
              kindFilter === "algorithm"
                ? "bg-violet-600 text-white"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code2 className="h-3.5 w-3.5" /> Algorithms &amp; Patterns
          </button>
        </div>
      </div>

      {/* VISUAL FLOWCHART CANVAS: 8 ARCHITECTURAL DECISION PILLARS */}
      <div className="rounded-3xl border border-border bg-flowchart-grid p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {VISUAL_FLOWCHART_BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className={`rounded-3xl border ${branch.borderColor} bg-gradient-to-b ${branch.bgGlow} bg-card/90 backdrop-blur-sm p-6 sm:p-7 flex flex-col justify-between shadow-md`}
            >
              <div>
                {/* Branch Header */}
                <div className="flex items-start justify-between gap-2 pb-4 border-b border-border/70">
                  <div>
                    <h3 className={`text-lg font-extrabold ${branch.accentColor}`}>
                      {branch.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {branch.subtitle}
                    </p>
                  </div>
                </div>

                {/* Decision Steps inside Branch */}
                <div className="mt-5 space-y-6">
                  {branch.steps.map((step, sIdx) => (
                    <div key={sIdx} className="space-y-3">
                      {/* Diamond Question Banner */}
                      <div className="relative flex items-center gap-3 rounded-2xl border border-border bg-secondary/70 px-4 py-2.5 text-xs font-semibold text-foreground shadow-sm">
                        <span className="flex h-5 w-5 shrink-0 rotate-45 items-center justify-center rounded-[4px] bg-violet-500/30 border border-violet-400/50 text-[10px] font-bold text-violet-200">
                          <span className="-rotate-45">?</span>
                        </span>
                        <span>{step.question}</span>
                      </div>

                      {/* Split Branches (YES / NO or Category splits) */}
                      <div
                        className={`grid gap-4 pl-2 ${
                          step.noTopics && step.noTopics.length > 0
                            ? "grid-cols-1 sm:grid-cols-2"
                            : "grid-cols-1"
                        }`}
                      >
                        {/* Left / YES Branch */}
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 pl-1">
                            <ArrowDown className="h-3.5 w-3.5" />
                            <span>{step.yesLabel}</span>
                          </div>
                          <div className="space-y-2.5">
                            {step.yesTopics.map((tId) => renderTopicLeafNode(tId))}
                          </div>
                        </div>

                        {/* Right / NO or Alternative Branch */}
                        {step.noTopics && step.noTopics.length > 0 && (
                          <div className="space-y-2.5">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 pl-1">
                              <ArrowDown className="h-3.5 w-3.5" />
                              <span>{step.noLabel}</span>
                            </div>
                            <div className="space-y-2.5">
                              {step.noTopics.map((tId) => renderTopicLeafNode(tId))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

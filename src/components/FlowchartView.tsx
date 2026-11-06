import React, { useState } from "react";
import { DSATopic, YouTubeVideoEntry } from "@/types/dsa";
import {
  MERMAID_BRANCHES,
  FULL_MERMAID_DIAGRAM_SOURCE,
  MermaidDecisionNode,
} from "@/data/mermaid-flowchart";
import { CONSTRAINT_CHEATSHEET } from "@/data/flowchart-decision-tree";
import { TOPICS_BY_ID } from "@/data";
import {
  GitBranch,
  Copy,
  Check,
  Code2,
  Cpu,
  ChevronRight,
  Sparkles,
  ArrowDown,
  Layers,
  HelpCircle,
  PlayCircle,
  CheckCircle2,
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
  const [selectedBranchId, setSelectedBranchId] = useState<string>("all");
  const [selectedConstraintMaxN, setSelectedConstraintMaxN] = useState<number | null>(null);
  const [showMermaidSource, setShowMermaidSource] = useState(false);
  const [copiedMermaid, setCopiedMermaid] = useState(false);

  const activeConstraintRow = CONSTRAINT_CHEATSHEET.find(
    (row) => row.maxN === selectedConstraintMaxN
  );
  const highlightedByConstraint = new Set(
    activeConstraintRow?.recommendedTopicIds ?? []
  );

  const handleCopyMermaid = () => {
    navigator.clipboard.writeText(FULL_MERMAID_DIAGRAM_SOURCE);
    setCopiedMermaid(true);
    setTimeout(() => setCopiedMermaid(null), 2000);
  };

  const visibleBranches =
    selectedBranchId === "all"
      ? MERMAID_BRANCHES
      : MERMAID_BRANCHES.filter((b) => b.id === selectedBranchId);

  const renderLeafTopicCard = (topicId?: string, label?: string) => {
    if (!topicId) return null;
    const topic = TOPICS_BY_ID[topicId];
    if (!topic) return null;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        topic.title.toLowerCase().includes(q) ||
        topic.shortTitle.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.englishTerm.toLowerCase().includes(q);
      if (!matches) return null;
    }

    const isHighlighted =
      selectedConstraintMaxN !== null && highlightedByConstraint.has(topic.id);
    const isDone = completedTopics.has(topic.id);
    const hasVideo = Boolean(youtubeLinks[topic.id]?.youtubeUrl);

    return (
      <button
        onClick={() => onSelectTopic(topic)}
        className={`w-full text-left rounded-2xl border p-3.5 transition-all flex flex-col justify-between ${
          isHighlighted
            ? "border-amber-400 bg-amber-500/15 ring-2 ring-amber-400/40 shadow-lg scale-[1.01]"
            : isDone
            ? "border-emerald-500/50 bg-emerald-950/20 hover:border-emerald-400"
            : "border-border bg-card/90 hover:border-violet-400 hover:bg-secondary/40 shadow-sm"
        }`}
      >
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
              #{String(topic.order).padStart(2, "0")}
            </span>
            <span className="rounded-md border border-violet-500/30 bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
              Level {topic.level}
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {hasVideo && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 px-1.5 py-0.5 text-[9px] font-semibold text-rose-300">
                <PlayCircle className="h-2.5 w-2.5" /> Video
              </span>
            )}
            {isDone && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />}
          </div>
        </div>

        <h4 className="text-xs sm:text-sm font-bold text-foreground leading-snug">
          {topic.shortTitle}
        </h4>
        <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
          {topic.summary}
        </p>

        <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center justify-between text-[10px]">
          <span className="font-mono text-emerald-400 font-semibold truncate">
            {topic.timeComplexity.average.split("|")[0].trim()}
          </span>
          <span className="inline-flex items-center gap-0.5 text-violet-300 font-semibold group-hover:translate-x-0.5 transition-transform">
            Open Lesson <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-950/35 via-card to-cyan-950/25 p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1 text-xs font-bold text-violet-300 mb-2">
              <GitBranch className="h-4 w-4" /> Strategic Interview Companion
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
              Mermaid-Style Decision Flowchart
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
              Use this flowchart <strong>after learning the 7 progressive levels</strong>. It acts as your diagnostic algorithm in technical interviews: start at the input signals and follow the diamond decision nodes directly to the winning pattern.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowMermaidSource((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-violet-500/10 hover:bg-violet-500/20 px-4 py-2.5 text-xs font-bold text-violet-200 transition-all"
            >
              <Code2 className="h-4 w-4" />
              {showMermaidSource ? "Hide Mermaid Source" : "View / Copy Raw Mermaid"}
            </button>
          </div>
        </div>

        {/* Constraint N Calculator Row */}
        <div className="mt-6 pt-4 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-amber-400 shrink-0" />
            <span className="font-bold text-foreground">Highlight by Problem Constraint N:</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {CONSTRAINT_CHEATSHEET.map((row) => {
              const isSelected = selectedConstraintMaxN === row.maxN;
              return (
                <button
                  key={row.maxN}
                  onClick={() =>
                    setSelectedConstraintMaxN(isSelected ? null : row.maxN)
                  }
                  className={`rounded-lg border px-2.5 py-1 text-[11px] font-mono font-bold transition-all ${
                    isSelected
                      ? "border-amber-400 bg-amber-500/20 text-amber-200 ring-1 ring-amber-400"
                      : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {row.constraint}
                </button>
              );
            })}
            {selectedConstraintMaxN !== null && (
              <button
                onClick={() => setSelectedConstraintMaxN(null)}
                className="text-[11px] text-amber-300 hover:underline font-semibold ml-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mermaid Raw Code Drawer */}
      {showMermaidSource && (
        <div className="rounded-3xl border border-violet-500/40 bg-card p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Raw Mermaid Diagram Syntax (`flowchart TD`)
              </h3>
              <p className="text-xs text-muted-foreground">
                Standard GitHub-flavored Mermaid code. You can paste this directly into GitHub issues, Notion, Obsidian, or Mermaid Live Editor.
              </p>
            </div>
            <button
              onClick={handleCopyMermaid}
              className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-3.5 py-2 text-xs font-bold text-white transition-all"
            >
              {copiedMermaid ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy Mermaid Code
                </>
              )}
            </button>
          </div>
          <pre className="max-h-72 overflow-auto rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 border border-border">
            {FULL_MERMAID_DIAGRAM_SOURCE}
          </pre>
        </div>
      )}

      {/* Branch Tabs Filter */}
      <div className="flex items-center gap-1.5 rounded-2xl border border-border bg-card/70 p-1.5 overflow-x-auto">
        <button
          onClick={() => setSelectedBranchId("all")}
          className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
            selectedBranchId === "all"
              ? "bg-primary text-primary-foreground shadow"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Branches
        </button>
        {MERMAID_BRANCHES.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBranchId(b.id)}
            className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
              selectedBranchId === b.id
                ? "bg-primary text-primary-foreground shadow"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {b.title}
          </button>
        ))}
      </div>

      {/* MERMAID TREE VISUALIZATION GRID */}
      <div className="space-y-8">
        {visibleBranches.map((branch) => (
          <div
            key={branch.id}
            className={`rounded-3xl border ${branch.borderColor} bg-card/85 p-6 sm:p-8 space-y-6 shadow-md`}
          >
            {/* Branch Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className={`text-base sm:text-lg font-extrabold ${branch.color}`}>
                {branch.title}
              </h3>
              <span className="text-xs text-muted-foreground font-mono">
                {branch.nodes.length} Decision Diamonds
              </span>
            </div>

            {/* Tree Nodes inside this Branch */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {branch.nodes.map((node) => (
                <div
                  key={node.id}
                  className="rounded-2xl border border-border/80 bg-secondary/20 p-5 space-y-4 flex flex-col justify-between"
                >
                  {/* Diamond Decision Header */}
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0 rotate-45 rounded-lg bg-violet-500/25 border border-violet-400/50 flex items-center justify-center text-violet-300">
                      <HelpCircle className="h-4 w-4 -rotate-45" />
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-foreground">
                      {node.question}
                    </div>
                  </div>

                  {/* Flowchart Outcomes (Yes -> / No ->) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* YES Condition */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400">
                        <ArrowDown className="h-3 w-3" />
                        <span>{node.yesCondition}</span>
                      </div>
                      {node.yesTopicId && renderLeafTopicCard(node.yesTopicId)}
                    </div>

                    {/* NO Condition */}
                    {node.noCondition && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400">
                          <ArrowDown className="h-3 w-3" />
                          <span>{node.noCondition}</span>
                        </div>
                        {node.noTopicId && renderLeafTopicCard(node.noTopicId)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

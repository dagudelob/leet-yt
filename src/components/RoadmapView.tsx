import React from "react";
import { DSATopic, YouTubeVideoEntry } from "@/types/dsa";
import { LEVEL_METADATA, TOPICS_BY_ID } from "@/data";
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Database,
  Code2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface RoadmapViewProps {
  topics: DSATopic[];
  onSelectTopic: (topic: DSATopic) => void;
  completedTopics: Set<string>;
  onToggleComplete: (topicId: string, e?: React.MouseEvent) => void;
  youtubeLinks: Record<string, YouTubeVideoEntry>;
  searchQuery: string;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  topics,
  onSelectTopic,
  completedTopics,
  onToggleComplete,
  youtubeLinks,
  searchQuery,
}) => {
  const filterTopic = (t: DSATopic): boolean => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.shortTitle.toLowerCase().includes(q) ||
      t.englishTerm.toLowerCase().includes(q) ||
      t.summary.toLowerCase().includes(q) ||
      t.leetcodeProblems.some((p) => p.title.toLowerCase().includes(q))
    );
  };

  return (
    <div className="space-y-10">
      {/* Intro Banner */}
      <div className="rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-950/35 via-card to-cyan-950/25 p-6 sm:p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold text-foreground">
              7-Level Progressive Learning Path (Episodes #01 to #46)
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
              Instead of memorizing all data structures in isolation and all algorithms later, this curriculum introduces{" "}
              <strong className="text-foreground">each data structure right before the algorithmic patterns that rely on it</strong>.
              Designed for bite-sized interactive mastery and sequential YouTube video production.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="rounded-2xl border border-border bg-secondary/50 px-5 py-3 text-center">
              <div className="text-2xl font-black font-mono text-emerald-400">
                {Math.round((completedTopics.size / topics.length) * 100)}%
              </div>
              <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
                Mastered ({completedTopics.size}/{topics.length})
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7 Progressive Levels */}
      {LEVEL_METADATA.map((lvl) => {
        const levelTopics = topics
          .filter((t) => t.level === lvl.level)
          .filter(filterTopic);

        if (levelTopics.length === 0) return null;

        const allLevelTopics = topics.filter((t) => t.level === lvl.level);
        const completedInLevel = allLevelTopics.filter((t) =>
          completedTopics.has(t.id)
        ).length;
        const pct = Math.round(
          (completedInLevel / allLevelTopics.length) * 100
        );

        return (
          <section
            key={lvl.level}
            className={`rounded-3xl border ${lvl.borderClass} bg-card/85 p-6 sm:p-8 shadow-lg`}
          >
            {/* Level Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-border">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`rounded-full border px-3 py-0.5 text-xs font-bold ${lvl.badgeClass}`}
                  >
                    Level {lvl.level} of 7
                  </span>
                  <h3 className={`text-lg sm:text-xl font-extrabold ${lvl.colorClass}`}>
                    {lvl.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {lvl.goalDescription}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="w-36 bg-secondary rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  {completedInLevel}/{allLevelTopics.length} completed
                </span>
              </div>
            </div>

            {/* Topic Cards Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {levelTopics.map((topic) => {
                const isDone = completedTopics.has(topic.id);
                const yt = youtubeLinks[topic.id];
                const hasVideo = Boolean(yt?.youtubeUrl);

                return (
                  <div
                    key={topic.id}
                    onClick={() => onSelectTopic(topic)}
                    className={`group cursor-pointer rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                      isDone
                        ? "border-emerald-500/45 bg-emerald-950/15 hover:border-emerald-400"
                        : "border-border bg-secondary/25 hover:border-violet-400 hover:bg-secondary/50 hover:shadow-md"
                    }`}
                  >
                    <div>
                      {/* Card Top Row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-violet-500/20 border border-violet-500/30 px-2.5 py-0.5 font-mono text-xs font-extrabold text-violet-300">
                            Ep #{String(topic.order).padStart(2, "0")}
                          </span>
                          {topic.kind === "data-structure" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                              <Database className="h-3 w-3" /> Structure
                            </span>
                          ) : topic.kind === "hybrid" ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-fuchsia-500/15 px-2 py-0.5 text-[10px] font-semibold text-fuchsia-300">
                              <Sparkles className="h-3 w-3" /> Hybrid
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                              <Code2 className="h-3 w-3" /> Pattern
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => onToggleComplete(topic.id, e)}
                          title={
                            isDone
                              ? "Mark as incomplete"
                              : "Mark as mastered"
                          }
                          className="text-muted-foreground hover:text-emerald-400 transition-colors"
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </button>
                      </div>

                      {/* Title & Summary */}
                      <h4 className="text-base font-bold text-foreground group-hover:text-violet-300 transition-colors leading-snug">
                        {topic.title}
                      </h4>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {topic.summary}
                      </p>

                      {/* Prerequisites */}
                      {topic.prerequisites.length > 0 && (
                        <div className="mt-3 flex items-center gap-1.5 flex-wrap text-[10px] text-muted-foreground">
                          <span>Prerequisites:</span>
                          {topic.prerequisites.map((preId) => {
                            const pre = TOPICS_BY_ID[preId];
                            return (
                              <span
                                key={preId}
                                className="rounded-md bg-secondary px-2 py-0.5 font-medium text-foreground"
                              >
                                #{String(pre?.order ?? 0).padStart(2, "0")}{" "}
                                {pre?.shortTitle ?? preId}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        {hasVideo ? (
                          <span className="inline-flex items-center gap-1 text-rose-400 font-semibold text-[11px]">
                            <PlayCircle className="h-3.5 w-3.5" /> Video Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-300 font-medium text-[11px]">
                            <FileText className="h-3.5 w-3.5" /> Interactive Lesson Ready
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-violet-300 group-hover:translate-x-0.5 transition-transform">
                        Start Lesson <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

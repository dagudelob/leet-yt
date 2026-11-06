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
  ExternalLink,
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
    <div className="space-y-8">
      {/* Intro Banner */}
      <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-r from-violet-950/35 via-card to-cyan-950/25 p-5 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-extrabold text-foreground">
              Ruta Pedagógica Progresiva en 7 Niveles (Episodios #01 al #46)
            </h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-3xl leading-relaxed">
              En lugar de memorizar todas las estructuras primero y todos los algoritmos después, esta secuencia introduce{" "}
              <strong className="text-foreground">cada estructura de datos justo antes de los patrones algorítmicos que la utilizan</strong>.
              Ideal tanto para estudiar desde cero como para publicar los videos en orden en tu canal de YouTube.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-center">
              <div className="text-xl font-black font-mono text-emerald-400">
                {Math.round((completedTopics.size / topics.length) * 100)}%
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Progreso Total ({completedTopics.size}/{topics.length})
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
            className={`rounded-2xl border ${lvl.borderClass} bg-card/80 p-5 sm:p-6 shadow-lg`}
          >
            {/* Level Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${lvl.badgeClass}`}
                  >
                    Fase {lvl.level} de 7
                  </span>
                  <h3 className={`text-lg font-extrabold ${lvl.colorClass}`}>
                    {lvl.title}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {lvl.goalDescription}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="w-36 bg-secondary rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="font-mono text-xs font-semibold text-muted-foreground">
                  {completedInLevel}/{allLevelTopics.length} completados
                </span>
              </div>
            </div>

            {/* Topic Cards Grid */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {levelTopics.map((topic) => {
                const isDone = completedTopics.has(topic.id);
                const yt = youtubeLinks[topic.id];
                const hasVideo = Boolean(yt?.youtubeUrl);

                return (
                  <div
                    key={topic.id}
                    onClick={() => onSelectTopic(topic)}
                    className={`group cursor-pointer rounded-xl border p-4 transition-all flex flex-col justify-between ${
                      isDone
                        ? "border-emerald-500/45 bg-emerald-950/15 hover:border-emerald-400"
                        : "border-border bg-secondary/25 hover:border-violet-400 hover:bg-secondary/50 hover:shadow-md"
                    }`}
                  >
                    <div>
                      {/* Card Top Row */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-violet-500/20 border border-violet-500/30 px-2 py-0.5 font-mono text-xs font-extrabold text-violet-300">
                            Video #{String(topic.order).padStart(2, "0")}
                          </span>
                          {topic.kind === "data-structure" ? (
                            <span className="inline-flex items-center gap-1 rounded bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                              <Database className="h-3 w-3" /> Estructura
                            </span>
                          ) : topic.kind === "hybrid" ? (
                            <span className="inline-flex items-center gap-1 rounded bg-fuchsia-500/15 px-2 py-0.5 text-[10px] font-semibold text-fuchsia-300">
                              <Sparkles className="h-3 w-3" /> Híbrido
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                              <Code2 className="h-3 w-3" /> Algoritmo
                            </span>
                          )}
                        </div>

                        <button
                          onClick={(e) => onToggleComplete(topic.id, e)}
                          title={
                            isDone
                              ? "Marcar como pendiente"
                              : "Marcar como dominado"
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
                      <h4 className="text-sm font-bold text-foreground group-hover:text-violet-300 transition-colors">
                        {topic.title}
                      </h4>
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {topic.summary}
                      </p>

                      {/* Prerequisites */}
                      {topic.prerequisites.length > 0 && (
                        <div className="mt-2.5 flex items-center gap-1 flex-wrap text-[10px] text-muted-foreground">
                          <span>Prerrequisito:</span>
                          {topic.prerequisites.map((preId) => {
                            const pre = TOPICS_BY_ID[preId];
                            return (
                              <span
                                key={preId}
                                className="rounded bg-secondary px-1.5 py-0.5 font-medium text-foreground"
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
                    <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        {hasVideo ? (
                          <span className="inline-flex items-center gap-1 text-rose-400 font-semibold text-[11px]">
                            <PlayCircle className="h-3.5 w-3.5" /> Video Publicado
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-300 font-medium text-[11px]">
                            <FileText className="h-3.5 w-3.5" /> Guion NotebookLM Listo
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-violet-300 group-hover:translate-x-0.5 transition-transform">
                        Estudiar <ArrowRight className="h-3 w-3" />
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

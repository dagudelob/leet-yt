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
        <span className="inline-flex items-center gap-1 rounded bg-cyan-500/15 px-1.5 py-0.5 text-[10px] font-medium text-cyan-300 border border-cyan-500/30">
          <Database className="h-2.5 w-2.5" /> Estructura
        </span>
      ) : topic.kind === "hybrid" ? (
        <span className="inline-flex items-center gap-1 rounded bg-fuchsia-500/15 px-1.5 py-0.5 text-[10px] font-medium text-fuchsia-300 border border-fuchsia-500/30">
          <Sparkles className="h-2.5 w-2.5" /> DS + Patrón
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 rounded bg-violet-500/15 px-1.5 py-0.5 text-[10px] font-medium text-violet-300 border border-violet-500/30">
          <Code2 className="h-2.5 w-2.5" /> Algoritmo
        </span>
      );

    return (
      <button
        key={topic.id}
        onClick={() => onSelectTopic(topic)}
        className={`group relative w-full text-left rounded-xl border p-3 transition-all duration-200 ${
          isConstraintHighlighted
            ? "border-amber-400 bg-amber-500/10 ring-2 ring-amber-400/40 shadow-lg shadow-amber-500/10 scale-[1.02]"
            : isDone
            ? "border-emerald-500/50 bg-emerald-950/20 hover:border-emerald-400"
            : "border-violet-500/35 bg-card/90 hover:border-violet-400 hover:bg-accent/40 hover:shadow-md hover:shadow-violet-500/10"
        } ${isDimmed ? "opacity-25 scale-95" : "opacity-100"}`}
      >
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
              #{String(topic.order).padStart(2, "0")}
            </span>
            {kindBadge}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {hasVideo ? (
              <span
                title="Video de YouTube disponible"
                className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 border border-rose-500/40 px-1.5 py-0.5 text-[10px] font-semibold text-rose-300"
              >
                <PlayCircle className="h-3 w-3 text-rose-400" /> YT
              </span>
            ) : (
              <span
                title="Guion NotebookLM listo"
                className="inline-flex items-center gap-0.5 rounded-full bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground group-hover:text-foreground"
              >
                <FileText className="h-2.5 w-2.5" /> Guion
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
        <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
          {topic.summary}
        </p>

        <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center justify-between gap-2 text-[10px]">
          <span className="font-mono text-emerald-400 font-medium truncate">
            ⏱ {topic.timeComplexity.average.split("|")[0].trim()}
          </span>
          <span className="text-muted-foreground group-hover:text-violet-300 inline-flex items-center gap-0.5 font-medium shrink-0">
            Abrir nodo <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* TOP BAR: Interactive Decision Wizard + Constraint Cheatsheet */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left 7 cols: Step-by-step Decision Tree Assistant */}
        <div className="xl:col-span-7 rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/30 via-card to-card p-5 shadow-lg">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/40 text-violet-300">
                <Compass className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                  Asistente de Decisión Interactivo: ¿Qué Algoritmo Uso?
                  <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                    Estilo AlgoMonster
                  </span>
                </h2>
                <p className="text-xs text-muted-foreground">
                  Responde las preguntas sobre tu problema de LeetCode para navegar hasta el patrón exacto
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {wizardPath.length > 1 && (
                <button
                  onClick={resetWizard}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary/70 px-2.5 py-1 text-xs font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  <RotateCcw className="h-3 w-3" /> Reiniciar
                </button>
              )}
              <button
                onClick={() => setShowWizard((v) => !v)}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                {showWizard ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          {showWizard && currentQuestionNode && (
            <div className="space-y-3">
              {/* Breadcrumb trail */}
              {wizardPath.length > 1 && (
                <div className="flex items-center gap-1.5 flex-wrap text-xs bg-secondary/40 rounded-lg px-3 py-1.5 border border-border/60">
                  <span className="text-muted-foreground font-medium">Ruta:</span>
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
                    Pregunta actual
                  </span>
                </div>
              )}

              {/* Current Diamond Question */}
              <div className="rounded-xl border border-violet-500/40 bg-violet-500/10 px-4 py-3 flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 rotate-45 items-center justify-center rounded bg-violet-500 text-white shadow">
                  <HelpCircle className="h-4 w-4 -rotate-45" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-violet-300">
                    Nodo de Decisión ({currentQuestionNode.category})
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    {currentQuestionNode.label}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                      className={`group flex flex-col justify-between rounded-xl border p-3 text-left transition-all ${
                        opt.isTopic
                          ? "border-emerald-500/40 bg-emerald-500/10 hover:border-emerald-400 hover:bg-emerald-500/15"
                          : "border-border bg-secondary/40 hover:border-violet-400 hover:bg-secondary/80"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-foreground group-hover:text-violet-200">
                            {opt.label}
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        {opt.conditionHint && (
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            {opt.conditionHint}
                          </p>
                        )}
                      </div>
                      {targetTopic && (
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
                          <Sparkles className="h-3 w-3" /> Ir a #
                          {String(targetTopic.order).padStart(2, "0")}{" "}
                          {targetTopic.shortTitle} (Ver Video + Guion)
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
        <div className="xl:col-span-5 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-card to-card p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground">
                    Calculadora N → Algoritmo (Constraints)
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Haz clic en el tamaño de entrada N para iluminar los algoritmos compatibles en el Flowchart
                  </p>
                </div>
              </div>
              {selectedConstraintMaxN !== null && (
                <button
                  onClick={() => setSelectedConstraintMaxN(null)}
                  className="text-xs text-amber-300 hover:underline font-medium shrink-0"
                >
                  Limpiar filtro N
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {CONSTRAINT_CHEATSHEET.map((row) => {
                const isSelected = selectedConstraintMaxN === row.maxN;
                return (
                  <button
                    key={row.maxN}
                    onClick={() =>
                      setSelectedConstraintMaxN(isSelected ? null : row.maxN)
                    }
                    className={`rounded-lg border p-2 text-left transition-all ${
                      isSelected
                        ? "border-amber-400 bg-amber-500/20 ring-1 ring-amber-400"
                        : "border-border/80 bg-secondary/40 hover:border-amber-500/50"
                    }`}
                  >
                    <div className="font-mono text-xs font-bold text-amber-300">
                      {row.constraint}
                    </div>
                    <div className="font-mono text-[10px] text-foreground font-semibold mt-0.5">
                      → {row.targetComplexity}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {activeConstraintRow ? (
            <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs">
              <div className="font-bold text-amber-200 mb-1">
                Con {activeConstraintRow.constraint} necesitas{" "}
                <span className="font-mono underline">
                  {activeConstraintRow.targetComplexity}
                </span>
                :
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                {activeConstraintRow.explanation} ({highlightedByConstraint.size}{" "}
                nodos iluminados abajo).
              </p>
            </div>
          ) : (
            <div className="mt-3 rounded-xl border border-border/60 bg-secondary/30 p-3 text-[11px] text-muted-foreground">
              💡 <strong>Tip de Entrevista:</strong> Antes de elegir rama en el
              Flowchart, mira siempre <code className="text-foreground">Constraints</code> al final del
              problema en LeetCode. Si ves <code className="text-amber-300">10⁵</code>, descarta todo lo
              que sea <code className="text-rose-300">O(N²)</code>.
            </div>
          )}
        </div>
      </div>

      {/* FILTER BAR FOR VISUAL FLOWCHART */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/70 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-3.5 w-3.5 text-violet-400" />
          <span className="font-semibold text-foreground">
            Lienzo Completo del Flowchart (46 Nodos en 8 Ramas de Decisión):
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setKindFilter("all")}
            className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              kindFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Todos (46)
          </button>
          <button
            onClick={() => setKindFilter("data-structure")}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              kindFilter === "data-structure"
                ? "bg-cyan-600 text-white"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Database className="h-3 w-3" /> Estructuras de Datos
          </button>
          <button
            onClick={() => setKindFilter("algorithm")}
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
              kindFilter === "algorithm"
                ? "bg-violet-600 text-white"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code2 className="h-3 w-3" /> Algoritmos y Patrones
          </button>
        </div>
      </div>

      {/* VISUAL FLOWCHART CANVAS: 8 ARCHITECTURAL DECISION PILLARS */}
      <div className="rounded-3xl border border-border bg-flowchart-grid p-4 sm:p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {VISUAL_FLOWCHART_BRANCHES.map((branch) => (
            <div
              key={branch.id}
              className={`rounded-2xl border ${branch.borderColor} bg-gradient-to-b ${branch.bgGlow} bg-card/85 backdrop-blur-sm p-4 sm:p-5 flex flex-col justify-between shadow-md`}
            >
              <div>
                {/* Branch Header */}
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-border/70">
                  <div>
                    <h3 className={`text-base font-extrabold ${branch.accentColor}`}>
                      {branch.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {branch.subtitle}
                    </p>
                  </div>
                </div>

                {/* Decision Steps inside Branch */}
                <div className="mt-4 space-y-5">
                  {branch.steps.map((step, sIdx) => (
                    <div key={sIdx} className="space-y-2.5">
                      {/* Diamond Question Banner */}
                      <div className="relative flex items-center gap-2.5 rounded-xl border border-border bg-secondary/70 px-3.5 py-2 text-xs font-semibold text-foreground shadow-sm">
                        <span className="flex h-5 w-5 shrink-0 rotate-45 items-center justify-center rounded-[4px] bg-violet-500/30 border border-violet-400/50 text-[10px] font-bold text-violet-200">
                          <span className="-rotate-45">?</span>
                        </span>
                        <span>{step.question}</span>
                      </div>

                      {/* Split Branches (YES / NO or Category splits) */}
                      <div
                        className={`grid gap-3 pl-2 ${
                          step.noTopics && step.noTopics.length > 0
                            ? "grid-cols-1 sm:grid-cols-2"
                            : "grid-cols-1"
                        }`}
                      >
                        {/* Left / YES Branch */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 pl-1">
                            <ArrowDown className="h-3 w-3" />
                            <span>{step.yesLabel}</span>
                          </div>
                          <div className="space-y-2">
                            {step.yesTopics.map((tId) => renderTopicLeafNode(tId))}
                          </div>
                        </div>

                        {/* Right / NO or Alternative Branch */}
                        {step.noTopics && step.noTopics.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 pl-1">
                              <ArrowDown className="h-3 w-3" />
                              <span>{step.noLabel}</span>
                            </div>
                            <div className="space-y-2">
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

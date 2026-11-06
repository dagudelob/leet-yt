import React, { useState } from "react";
import { DSATopic, YouTubeVideoEntry, VideoStatus } from "@/types/dsa";
import {
  ALL_DSA_TOPICS,
  TOPICS_BY_ID,
  buildNotebookLMMarkdown,
} from "@/data";
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
  Download,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  Clock,
  HardDrive,
  ChevronLeft,
  ChevronRight,
  Youtube,
  FileText,
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
  onUpdateYouTubeLink: (
    topicId: string,
    url: string,
    status: VideoStatus
  ) => void;
}

type ModalTab = "overview" | "code" | "leetcode" | "notebooklm";

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  topic,
  onClose,
  onSelectTopic,
  isCompleted,
  onToggleComplete,
  solvedProblems,
  onToggleProblem,
  youtubeEntry,
  onUpdateYouTubeLink,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>("overview");
  const [codeLang, setCodeLang] = useState<"python" | "typescript">("python");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!topic) return null;

  const epNumStr = String(topic.order).padStart(2, "0");
  const videoId = extractYouTubeId(youtubeEntry?.youtubeUrl ?? "");
  const fullMarkdown = buildNotebookLMMarkdown(topic);

  const prevTopic = ALL_DSA_TOPICS.find((t) => t.order === topic.order - 1);
  const nextTopic = ALL_DSA_TOPICS.find((t) => t.order === topic.order + 1);

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([fullMarkdown], {
      type: "text/markdown;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${epNumStr}-${topic.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl border border-violet-500/40 bg-card text-card-foreground shadow-2xl overflow-hidden">
        {/* TOP MODAL HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border bg-secondary/50 px-5 py-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-md bg-violet-600 px-2 py-0.5 font-mono text-xs font-extrabold text-white">
                Episodio #{epNumStr}
              </span>
              <span className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                Nivel {topic.level} • {topic.difficulty}
              </span>
              <span className="font-mono text-xs text-violet-300">
                {topic.englishTerm}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-foreground">
              {topic.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={() => onToggleComplete(topic.id)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                isCompleted
                  ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                  : "border-border bg-secondary hover:border-emerald-500/50 text-foreground"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Dominado
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4 text-muted-foreground" /> Marcar
                  Dominado
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-border bg-secondary/80 p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Cerrar (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* NAVIGATION TABS INSIDE MODAL */}
        <div className="flex items-center gap-1 border-b border-border bg-secondary/25 px-5 pt-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "overview"
                ? "border-violet-500 text-violet-300"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <PlayCircle className="h-4 w-4 text-rose-400" />
            1. Video YouTube &amp; Señales del Flowchart
          </button>

          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "code"
                ? "border-violet-500 text-violet-300"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Code2 className="h-4 w-4 text-cyan-400" />
            2. Plantilla de Código (Python / TS)
          </button>

          <button
            onClick={() => setActiveTab("leetcode")}
            className={`flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "leetcode"
                ? "border-violet-500 text-violet-300"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Trophy className="h-4 w-4 text-amber-400" />
            3. Problemas LeetCode ({topic.leetcodeProblems.length})
          </button>

          <button
            onClick={() => setActiveTab("notebooklm")}
            className={`flex items-center gap-1.5 border-b-2 px-3.5 py-2.5 text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === "notebooklm"
                ? "border-violet-500 text-violet-300"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="h-4 w-4 text-fuchsia-400" />
            4. Guion NotebookLM (Paquete Híbrido)
          </button>
        </div>

        {/* MODAL BODY CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: VIDEO + FLOWCHART SIGNALS */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* YouTube Video Player or Link Input */}
              <div className="rounded-2xl border border-border bg-secondary/30 overflow-hidden">
                {videoId ? (
                  <div>
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={topic.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-3 flex flex-wrap items-center justify-between gap-2 bg-secondary/60 text-xs">
                      <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <Youtube className="h-4 w-4 text-rose-500" /> Episodio #
                        {epNumStr} activo en YouTube
                      </span>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={youtubeEntry?.youtubeUrl ?? ""}
                          onChange={(e) =>
                            onUpdateYouTubeLink(
                              topic.id,
                              e.target.value,
                              e.target.value.trim() ? "published" : "planned"
                            )
                          }
                          placeholder="Cambiar URL de YouTube..."
                          className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-mono w-64"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center space-y-4 bg-gradient-to-b from-rose-950/20 via-card to-card">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
                      <Youtube className="h-6 w-6" />
                    </div>
                    <div className="max-w-xl mx-auto">
                      <h3 className="text-base font-bold text-foreground">
                        Video #{epNumStr}: {topic.shortTitle} (Listo para
                        producir con NotebookLM)
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        El guion híbrido y documento fuente para Google
                        NotebookLM ya están generados. Cuando subas el video a
                        YouTube, pega el enlace aquí abajo para incrustar el
                        reproductor inmediatamente:
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-lg mx-auto">
                      <input
                        type="text"
                        value={youtubeEntry?.youtubeUrl ?? ""}
                        onChange={(e) =>
                          onUpdateYouTubeLink(
                            topic.id,
                            e.target.value,
                            e.target.value.trim() ? "published" : "planned"
                          )
                        }
                        placeholder="Pega aquí tu link: https://www.youtube.com/watch?v=..."
                        className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-mono text-foreground focus:border-rose-500 focus:outline-none"
                      />
                      <button
                        onClick={() => setActiveTab("notebooklm")}
                        className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2 text-xs font-bold text-white transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5" /> Ver Guion
                        NotebookLM
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Summary & Real World Analogy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-secondary/25 p-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-violet-300 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" /> ¿Qué es y cómo
                    funciona?
                  </div>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5" /> Analogía del Mundo
                    Real (Intuición)
                  </div>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                    {topic.analogy}
                  </p>
                </div>
              </div>

              {/* Complexity & Constraint Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <Clock className="h-3.5 w-3.5" /> Complejidad Temporal
                  </div>
                  <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-foreground">
                    {topic.timeComplexity.average}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    Peor caso: {topic.timeComplexity.worst}
                  </div>
                </div>

                <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                    <HardDrive className="h-3.5 w-3.5" /> Complejidad Espacial
                  </div>
                  <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-foreground">
                    {topic.spaceComplexity}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    {topic.timeComplexity.note}
                  </div>
                </div>

                <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-3.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-violet-300">
                    <Sparkles className="h-3.5 w-3.5" /> Pista en Constraints
                    (N)
                  </div>
                  <div className="mt-1 font-mono text-xs font-bold text-foreground">
                    {topic.constraintHint}
                  </div>
                </div>
              </div>

              {/* When to Use vs When NOT to Use */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-emerald-500/30 bg-card p-4 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    ✅ Señales en el problema (Cuándo USARLO)
                  </h4>
                  <ul className="space-y-2 text-xs text-foreground">
                    {topic.whenToUse.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-rose-500/30 bg-card p-4 space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="h-3.5 w-3.5" /> Cuándo NO usarlo /
                    Falsos Positivos
                  </h4>
                  <ul className="space-y-2 text-xs text-foreground">
                    {topic.whenNotToUse.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CODE TEMPLATES (PYTHON & TYPESCRIPT) */}
          {activeTab === "code" && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCodeLang("python")}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                      codeLang === "python"
                        ? "bg-violet-600 text-white shadow"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🐍 Python 3 (Principal en Videos)
                  </button>
                  <button
                    onClick={() => setCodeLang("typescript")}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                      codeLang === "typescript"
                        ? "bg-cyan-600 text-white shadow"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    📘 TypeScript / JavaScript
                  </button>
                </div>

                <button
                  onClick={() =>
                    copyText(
                      "code-template",
                      codeLang === "python"
                        ? topic.pythonTemplate
                        : topic.typescriptTemplate
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/80"
                >
                  {copiedKey === "code-template" ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" /> ¡Código
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> Copiar Plantilla
                    </>
                  )}
                </button>
              </div>

              <pre className="rounded-2xl border border-border bg-slate-950 p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-100 overflow-x-auto leading-relaxed">
                <code>
                  {codeLang === "python"
                    ? topic.pythonTemplate
                    : topic.typescriptTemplate}
                </code>
              </pre>

              {/* Step by step & Traps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-secondary/25 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    🛠️ Receta de Implementación Paso a Paso
                  </h4>
                  <ol className="space-y-1.5 text-xs text-foreground list-decimal list-inside">
                    {topic.notebookLM.stepByStepWalkthrough.map((step, i) => (
                      <li key={i} className="leading-relaxed">
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    🚨 Trampas de Entrevista y Bugs Frecuentes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-foreground">
                    {topic.notebookLM.interviewTraps.map((trap, i) => (
                      <li key={i} className="leading-relaxed">
                        • {trap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEETCODE PROBLEMS */}
          {activeTab === "leetcode" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Practica estos {topic.leetcodeProblems.length} problemas
                seleccionados específicamente para afianzar la plantilla de{" "}
                <strong className="text-foreground">{topic.shortTitle}</strong>:
              </p>

              <div className="space-y-3">
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
                      className={`rounded-xl border p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        isSolved
                          ? "border-emerald-500/40 bg-emerald-950/15"
                          : "border-border bg-secondary/25"
                      }`}
                    >
                      <div className="flex items-start gap-3">
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
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold text-violet-300">
                              LeetCode #{prob.number}
                            </span>
                            <span className="text-sm font-bold text-foreground">
                              {prob.title}
                            </span>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${diffBadge}`}
                            >
                              {prob.difficulty}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            💡 <strong>Cómo aplicar el patrón:</strong>{" "}
                            {prob.patternHint}
                          </p>
                        </div>
                      </div>

                      <a
                        href={`https://leetcode.com/problems/${prob.slug}/`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 shrink-0 self-start sm:self-center"
                      >
                        Resolver en LeetCode{" "}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: NOTEBOOKLM HYBRID SCRIPT PACKAGE */}
          {activeTab === "notebooklm" && (
            <div className="space-y-6">
              {/* Top Action Bar */}
              <div className="rounded-xl border border-fuchsia-500/35 bg-fuchsia-950/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-fuchsia-200 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-fuchsia-400" /> Paquete
                    Híbrido para Google NotebookLM (Archivo:{" "}
                    <code className="font-mono">
                      scripts/{epNumStr}-{topic.id}.md
                    </code>
                    )
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Incluye: 1) Prompt de Dirección para Customize, 2) Documento
                    Fuente estructurado, y 3) Guion narrado por bloques con
                    visuales.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyText("full-md", fullMarkdown)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 px-3.5 py-2 text-xs font-bold text-white shadow"
                  >
                    {copiedKey === "full-md" ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> ¡Markdown Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copiar Documento .md
                      </>
                    )}
                  </button>
                  <button
                    onClick={downloadMarkdown}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary hover:bg-secondary/80 px-3 py-2 text-xs font-semibold text-foreground"
                  >
                    <Download className="h-3.5 w-3.5" /> Descargar .md
                  </button>
                </div>
              </div>

              {/* 1. Custom Direction Prompt for NotebookLM */}
              <div className="rounded-xl border border-violet-500/35 bg-secondary/30 p-4 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300">
                    🎯 Paso 1: Prompt de Dirección para pegar en
                    &quot;Customize&quot; de NotebookLM
                  </h4>
                  <button
                    onClick={() =>
                      copyText(
                        "dir-prompt",
                        topic.notebookLM.customDirectionPrompt
                      )
                    }
                    className="inline-flex items-center gap-1 rounded-lg border border-violet-500/30 bg-violet-500/15 px-2.5 py-1 text-[11px] font-semibold text-violet-200 hover:bg-violet-500/25"
                  >
                    {copiedKey === "dir-prompt" ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copiar Prompt
                      </>
                    )}
                  </button>
                </div>
                <p className="rounded-lg bg-background/80 p-3 text-xs font-mono text-foreground leading-relaxed border border-border">
                  {topic.notebookLM.customDirectionPrompt}
                </p>
              </div>

              {/* 2. Narrative Teleprompter Blocks with Visual Cues */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  🎙️ Paso 2: Escaleta y Guion Narrado por Bloques + Visuales en
                  Pantalla
                </h4>
                <div className="space-y-3">
                  {topic.notebookLM.narrativeBlocks.map((block, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-border bg-secondary/25 p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-foreground">
                          {block.sectionTitle}
                        </span>
                        <span className="rounded bg-violet-500/20 px-2 py-0.5 font-mono text-[11px] font-semibold text-violet-300">
                          ⏱ {block.timestamp}
                        </span>
                      </div>
                      <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/25 px-3 py-1.5 text-xs text-cyan-200">
                        🎬 <strong>Visual / Slide sugerido:</strong>{" "}
                        {block.visualCue}
                      </div>
                      <p className="text-xs sm:text-sm text-foreground italic leading-relaxed pl-3 border-l-2 border-violet-500">
                        &ldquo;{block.narration}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Raw Markdown Preview */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  📄 Vista Previa del Documento Fuente Completo (Markdown para
                  NotebookLM)
                </h4>
                <pre className="max-h-72 overflow-y-auto rounded-xl border border-border bg-slate-950 p-4 font-mono text-[11px] text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {fullMarkdown}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* MODAL FOOTER: PREV / NEXT EPISODE NAVIGATION */}
        <div className="border-t border-border bg-secondary/40 px-5 py-3 flex items-center justify-between gap-2 text-xs">
          {prevTopic ? (
            <button
              onClick={() => onSelectTopic(prevTopic)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 hover:bg-background px-3 py-1.5 font-semibold text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" /> #{String(prevTopic.order).padStart(2, "0")}{" "}
              {prevTopic.shortTitle}
            </button>
          ) : (
            <div />
          )}

          <span className="text-muted-foreground hidden sm:inline">
            Episodio {topic.order} de {ALL_DSA_TOPICS.length}
          </span>

          {nextTopic ? (
            <button
              onClick={() => onSelectTopic(nextTopic)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/70 hover:bg-background px-3 py-1.5 font-semibold text-foreground transition-colors"
            >
              #{String(nextTopic.order).padStart(2, "0")} {nextTopic.shortTitle}{" "}
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

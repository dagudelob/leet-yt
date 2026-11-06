import React, { useState } from "react";
import { DSATopic, YouTubeVideoEntry, VideoStatus } from "@/types/dsa";
import { buildNotebookLMMarkdown } from "@/data";
import {
  generateYouTubeConfigSource,
  extractYouTubeId,
} from "@/data/youtube-links";
import {
  Youtube,
  Copy,
  Check,
  Download,
  Sparkles,
  ExternalLink,
  FileText,
  Code2,
  Play,
} from "lucide-react";

interface CreatorStudioViewProps {
  topics: DSATopic[];
  youtubeLinks: Record<string, YouTubeVideoEntry>;
  onUpdateYouTubeLink: (
    topicId: string,
    url: string,
    status: VideoStatus
  ) => void;
  onSelectTopic: (topic: DSATopic) => void;
  searchQuery: string;
}

export const CreatorStudioView: React.FC<CreatorStudioViewProps> = ({
  topics,
  youtubeLinks,
  onUpdateYouTubeLink,
  onSelectTopic,
  searchQuery,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | VideoStatus>("all");
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadMarkdown = (topic: DSATopic) => {
    const md = buildNotebookLMMarkdown(topic);
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const ep = String(topic.order).padStart(2, "0");
    a.href = url;
    a.download = `${ep}-${topic.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredTopics = topics.filter((t) => {
    const entry = youtubeLinks[t.id];
    const st = entry?.status ?? "planned";
    if (statusFilter !== "all" && st !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.shortTitle.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q)
    );
  });

  const publishedCount = Object.values(youtubeLinks).filter(
    (e) => Boolean(e.youtubeUrl) || e.status === "published"
  ).length;
  const inProdCount = Object.values(youtubeLinks).filter(
    (e) => e.status === "in_production"
  ).length;

  const exportedTsCode = generateYouTubeConfigSource(youtubeLinks);

  return (
    <div className="space-y-6">
      {/* Studio Header Card */}
      <div className="rounded-2xl border border-rose-500/35 bg-gradient-to-r from-rose-950/35 via-card to-violet-950/30 p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 border border-rose-500/40 px-3 py-1 text-xs font-bold text-rose-300 mb-2">
              <Youtube className="h-4 w-4 text-rose-400" /> Estudio de Producción
              YouTube + Google NotebookLM
            </div>
            <h2 className="text-xl font-extrabold text-foreground">
              Gestor de los 46 Episodios y Guiones Híbridos para NotebookLM
            </h2>
            <p className="text-xs text-muted-foreground mt-1 max-w-3xl leading-relaxed">
              Flujo de trabajo recomendado: <strong>1)</strong> Descarga o copia
              el <em>Documento Fuente (.md)</em> del episodio y súbelo a{" "}
              <a
                href="https://notebooklm.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-violet-300 underline hover:text-violet-200"
              >
                Google NotebookLM
              </a>
              . <strong>2)</strong> Copia el <em>Prompt de Dirección</em> y
              pégalo en <em>Customize</em> del Audio/Video Overview.{" "}
              <strong>3)</strong> Al subir tu video a YouTube, pega aquí el link
              para activarlo en el Flowchart.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowExportModal((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-600/25 transition-all"
            >
              <Code2 className="h-4 w-4" />
              {showExportModal
                ? "Ocultar Código Exportado"
                : "Exportar youtube-links.ts"}
            </button>
          </div>
        </div>

        {/* Quick Stats & Filter Bar */}
        <div className="mt-5 pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              Todos ({topics.length})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === "published"
                  ? "bg-emerald-600 text-white"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              Publicados ({publishedCount})
            </button>
            <button
              onClick={() => setStatusFilter("in_production")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === "in_production"
                  ? "bg-amber-600 text-white"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              En Producción ({inProdCount})
            </button>
            <button
              onClick={() => setStatusFilter("planned")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === "planned"
                  ? "bg-violet-600 text-white"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              Guion Listo / Planeado (
              {topics.length - publishedCount - inProdCount})
            </button>
          </div>

          <div className="text-xs text-muted-foreground">
            📁 Todos los 46 archivos Markdown también están generados en la
            carpeta <code className="text-foreground font-mono">/scripts/</code>{" "}
            del repositorio.
          </div>
        </div>
      </div>

      {/* Export Config Drawer */}
      {showExportModal && (
        <div className="rounded-2xl border border-violet-500/40 bg-card p-5 shadow-xl space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Código actualizado para{" "}
                <code className="text-violet-300 font-mono">
                  src/data/youtube-links.ts
                </code>
              </h3>
              <p className="text-xs text-muted-foreground">
                Tus cambios se guardan automáticamente en tu navegador
                (localStorage). Copia este bloque y reemplaza{" "}
                <code>src/data/youtube-links.ts</code> para dejarlos fijos en
                GitHub y Lovable.
              </p>
            </div>
            <button
              onClick={() => handleCopy("export-ts", exportedTsCode)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white"
            >
              {copiedId === "export-ts" ? (
                <>
                  <Check className="h-3.5 w-3.5" /> ¡Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copiar archivo .ts
                </>
              )}
            </button>
          </div>
          <pre className="max-h-64 overflow-auto rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200 border border-border">
            {exportedTsCode}
          </pre>
        </div>
      )}

      {/* Episode Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3 px-4"># Ep</th>
                <th className="py-3 px-4">Tema / Nodo del Flowchart</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 min-w-[260px]">
                  Link de YouTube (Pegar URL o ID)
                </th>
                <th className="py-3 px-4">Kit para Google NotebookLM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {filteredTopics.map((topic) => {
                const entry = youtubeLinks[topic.id] ?? {
                  topicId: topic.id,
                  episodeNumber: topic.order,
                  youtubeUrl: "",
                  status: "planned",
                  durationEstimate: "10:00",
                };
                const videoId = extractYouTubeId(entry.youtubeUrl);
                const fullMarkdown = buildNotebookLMMarkdown(topic);
                const epStr = String(topic.order).padStart(2, "0");

                return (
                  <tr
                    key={topic.id}
                    className="hover:bg-secondary/30 transition-colors"
                  >
                    {/* Episode Number */}
                    <td className="py-3 px-4 font-mono font-bold text-violet-300 whitespace-nowrap">
                      #{epStr}
                    </td>

                    {/* Topic Info */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onSelectTopic(topic)}
                        className="font-bold text-foreground hover:text-violet-300 text-left transition-colors flex items-center gap-1.5"
                      >
                        {topic.shortTitle}
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </button>
                      <div className="text-[11px] text-muted-foreground">
                        Nivel {topic.level} • {topic.englishTerm}
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <select
                        value={entry.status}
                        onChange={(e) =>
                          onUpdateYouTubeLink(
                            topic.id,
                            entry.youtubeUrl,
                            e.target.value as VideoStatus
                          )
                        }
                        className={`rounded-lg border px-2.5 py-1 text-xs font-semibold focus:outline-none ${
                          entry.status === "published"
                            ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                            : entry.status === "in_production"
                            ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                            : "border-border bg-secondary text-muted-foreground"
                        }`}
                      >
                        <option value="planned">📋 Planeado</option>
                        <option value="in_production">🎬 En Producción</option>
                        <option value="published">✅ Publicado</option>
                      </select>
                    </td>

                    {/* YouTube URL Input */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={entry.youtubeUrl}
                          onChange={(e) => {
                            const val = e.target.value;
                            const nextStatus: VideoStatus = val.trim()
                              ? "published"
                              : entry.status;
                            onUpdateYouTubeLink(topic.id, val, nextStatus);
                          }}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full rounded-lg border border-border bg-background/70 px-2.5 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:border-rose-500 focus:outline-none"
                        />
                        {videoId && (
                          <button
                            onClick={() => onSelectTopic(topic)}
                            title="Probar video embebido"
                            className="shrink-0 rounded-lg bg-rose-500/20 border border-rose-500/40 p-1.5 text-rose-300 hover:bg-rose-500/30"
                          >
                            <Play className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* NotebookLM Action Buttons */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            handleCopy(
                              `prompt-${topic.id}`,
                              topic.notebookLM.customDirectionPrompt
                            )
                          }
                          className="inline-flex items-center gap-1 rounded-lg border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 px-2.5 py-1 text-[11px] font-semibold text-violet-300 transition-colors"
                          title="Copiar Prompt de Dirección para pegar en Customize de NotebookLM"
                        >
                          {copiedId === `prompt-${topic.id}` ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />{" "}
                              Prompt Copiado
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-3 w-3" /> Copiar Prompt
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            handleCopy(`md-${topic.id}`, fullMarkdown)
                          }
                          className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary/70 hover:bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground transition-colors"
                          title="Copiar Documento Fuente Markdown completo para NotebookLM"
                        >
                          {copiedId === `md-${topic.id}` ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />{" "}
                              Guion Copiado
                            </>
                          ) : (
                            <>
                              <FileText className="h-3 w-3" /> Copiar Guion .md
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDownloadMarkdown(topic)}
                          className="inline-flex items-center justify-center rounded-lg border border-border bg-secondary/70 hover:bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                          title={`Descargar ${epStr}-${topic.id}.md`}
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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
    <div className="space-y-8">
      {/* Studio Header Card */}
      <div className="rounded-3xl border border-rose-500/35 bg-gradient-to-r from-rose-950/35 via-card to-violet-950/30 p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 border border-rose-500/40 px-3.5 py-1 text-xs font-bold text-rose-300 mb-3">
              <Youtube className="h-4 w-4 text-rose-400" /> YouTube + Google NotebookLM Production Studio
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
              46 Episode Manager &amp; Hybrid Scripts for Google NotebookLM
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-3xl leading-relaxed">
              Recommended workflow: <strong>1)</strong> Download or copy the{" "}
              <em>Source Document (.md)</em> for any episode and upload it to{" "}
              <a
                href="https://notebooklm.google.com/"
                target="_blank"
                rel="noreferrer"
                className="text-violet-300 underline hover:text-violet-200"
              >
                Google NotebookLM
              </a>
              . <strong>2)</strong> Copy the <em>Direction Prompt</em> and paste
              it into the <em>Customize</em> field of the Audio/Video Overview.{" "}
              <strong>3)</strong> Once your video is uploaded to YouTube, paste
              the URL below to activate the embedded player across the Flowchart.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setShowExportModal((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-600/25 transition-all"
            >
              <Code2 className="h-4 w-4" />
              {showExportModal
                ? "Hide Exported Code"
                : "Export youtube-links.ts"}
            </button>
          </div>
        </div>

        {/* Quick Stats & Filter Bar */}
        <div className="mt-6 pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setStatusFilter("all")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({topics.length})
            </button>
            <button
              onClick={() => setStatusFilter("published")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === "published"
                  ? "bg-emerald-600 text-white"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              Published ({publishedCount})
            </button>
            <button
              onClick={() => setStatusFilter("in_production")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === "in_production"
                  ? "bg-amber-600 text-white"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              In Production ({inProdCount})
            </button>
            <button
              onClick={() => setStatusFilter("planned")}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                statusFilter === "planned"
                  ? "bg-violet-600 text-white"
                  : "bg-secondary/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              Script Ready / Planned (
              {topics.length - publishedCount - inProdCount})
            </button>
          </div>

          <div className="text-xs text-muted-foreground">
            All 46 Markdown script files are also pre-generated in the{" "}
            <code className="text-foreground font-mono">/scripts/</code>{" "}
            directory of the repository.
          </div>
        </div>
      </div>

      {/* Export Config Drawer */}
      {showExportModal && (
        <div className="rounded-3xl border border-violet-500/40 bg-card p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Updated Source for{" "}
                <code className="text-violet-300 font-mono">
                  src/data/youtube-links.ts
                </code>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your edits are saved automatically in your browser
                (localStorage). Copy this block and replace{" "}
                <code>src/data/youtube-links.ts</code> to commit them permanently
                to GitHub and Lovable.
              </p>
            </div>
            <button
              onClick={() => handleCopy("export-ts", exportedTsCode)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white"
            >
              {copiedId === "export-ts" ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy .ts File
                </>
              )}
            </button>
          </div>
          <pre className="max-h-64 overflow-auto rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 border border-border">
            {exportedTsCode}
          </pre>
        </div>
      )}

      {/* Episode Table */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-3.5 px-5"># Ep</th>
                <th className="py-3.5 px-5">Flowchart Topic / Node</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5 min-w-[260px]">
                  YouTube Link (Paste URL or Video ID)
                </th>
                <th className="py-3.5 px-5">Google NotebookLM Kit</th>
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
                    <td className="py-3.5 px-5 font-mono font-bold text-violet-300 whitespace-nowrap">
                      #{epStr}
                    </td>

                    {/* Topic Info */}
                    <td className="py-3.5 px-5">
                      <button
                        onClick={() => onSelectTopic(topic)}
                        className="font-bold text-foreground hover:text-violet-300 text-left transition-colors flex items-center gap-1.5"
                      >
                        {topic.shortTitle}
                        <ExternalLink className="h-3 w-3 text-muted-foreground" />
                      </button>
                      <div className="text-[11px] text-muted-foreground mt-0.5">
                        Level {topic.level} • {topic.englishTerm}
                      </div>
                    </td>

                    {/* Status Select */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <select
                        value={entry.status}
                        onChange={(e) =>
                          onUpdateYouTubeLink(
                            topic.id,
                            entry.youtubeUrl,
                            e.target.value as VideoStatus
                          )
                        }
                        className={`rounded-xl border px-3 py-1.5 text-xs font-semibold focus:outline-none ${
                          entry.status === "published"
                            ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                            : entry.status === "in_production"
                            ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                            : "border-border bg-secondary text-muted-foreground"
                        }`}
                      >
                        <option value="planned">Planned</option>
                        <option value="in_production">In Production</option>
                        <option value="published">Published</option>
                      </select>
                    </td>

                    {/* YouTube URL Input */}
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
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
                          className="w-full rounded-xl border border-border bg-background/70 px-3 py-1.5 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:border-rose-500 focus:outline-none"
                        />
                        {videoId && (
                          <button
                            onClick={() => onSelectTopic(topic)}
                            title="Preview embedded video"
                            className="shrink-0 rounded-xl bg-rose-500/20 border border-rose-500/40 p-2 text-rose-300 hover:bg-rose-500/30"
                          >
                            <Play className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* NotebookLM Action Buttons */}
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleCopy(
                              `prompt-${topic.id}`,
                              topic.notebookLM.customDirectionPrompt
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 px-3 py-1.5 text-[11px] font-semibold text-violet-300 transition-colors"
                          title="Copy Direction Prompt for NotebookLM Customize field"
                        >
                          {copiedId === `prompt-${topic.id}` ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />{" "}
                              Prompt Copied
                            </>
                          ) : (
                            <>
                              <Sparkles className="h-3 w-3" /> Copy Prompt
                            </>
                          )}
                        </button>

                        <button
                          onClick={() =>
                            handleCopy(`md-${topic.id}`, fullMarkdown)
                          }
                          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-secondary/70 hover:bg-secondary px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors"
                          title="Copy Full Markdown Source Document for NotebookLM"
                        >
                          {copiedId === `md-${topic.id}` ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />{" "}
                              Script Copied
                            </>
                          ) : (
                            <>
                              <FileText className="h-3 w-3" /> Copy .md Script
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDownloadMarkdown(topic)}
                          className="inline-flex items-center justify-center rounded-xl border border-border bg-secondary/70 hover:bg-secondary p-2 text-muted-foreground hover:text-foreground transition-colors"
                          title={`Download ${epStr}-${topic.id}.md`}
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

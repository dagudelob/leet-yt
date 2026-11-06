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
  Smartphone,
  MonitorPlay,
  CheckCircle2,
  Clock,
  ListTodo,
} from "lucide-react";

interface CreatorStudioViewProps {
  topics: DSATopic[];
  youtubeLinks: Record<string, YouTubeVideoEntry>;
  onUpdateYouTubeLink: (
    topicId: string,
    longUrl: string,
    longStatus: VideoStatus,
    shortUrl?: string,
    shortStatus?: VideoStatus
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
  const [filterMode, setFilterMode] = useState<
    "all" | "missing_long" | "missing_short" | "completed_both"
  >("all");
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

  const longPublishedCount = Object.values(youtubeLinks).filter(
    (e) => Boolean(e.youtubeUrl) || e.status === "published"
  ).length;

  const shortPublishedCount = Object.values(youtubeLinks).filter(
    (e) => Boolean(e.shortYoutubeUrl) || e.shortStatus === "published"
  ).length;

  const filteredTopics = topics.filter((t) => {
    const entry = youtubeLinks[t.id];
    const hasLong = Boolean(entry?.youtubeUrl) || entry?.status === "published";
    const hasShort = Boolean(entry?.shortYoutubeUrl) || entry?.shortStatus === "published";

    if (filterMode === "missing_long" && hasLong) return false;
    if (filterMode === "missing_short" && hasShort) return false;
    if (filterMode === "completed_both" && (!hasLong || !hasShort)) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.shortTitle.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q)
    );
  });

  const exportedTsCode = generateYouTubeConfigSource(youtubeLinks);

  return (
    <div className="space-y-8">
      {/* Studio Header Card */}
      <div className="rounded-3xl border border-rose-500/35 bg-gradient-to-r from-rose-950/35 via-card to-violet-950/30 p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 border border-rose-500/40 px-3.5 py-1 text-xs font-bold text-rose-300 mb-3">
              <ListTodo className="h-4 w-4 text-rose-400" />
              <span>Video Production Dashboard • 92 Total Assets (46 Long + 46 Shorts)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
              Creator Studio &amp; Script Checklist
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
              Track your recording progress across both formats for all 46 topics: <strong>Format A (In-Depth Long-Form Video with CTA to webapp)</strong> and <strong>Format B (45-second YouTube Short with Dual CTA to webapp &amp; channel)</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowExportModal((v) => !v)}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-600/25 transition-all"
            >
              <Code2 className="h-4 w-4" />
              {showExportModal ? "Hide Config" : "Export youtube-links.ts"}
            </button>
          </div>
        </div>

        {/* 92 Video Progress Indicators */}
        <div className="mt-6 pt-5 border-t border-border/70 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border/80 bg-secondary/40 p-4">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-foreground">
                <MonitorPlay className="h-3.5 w-3.5 text-rose-400" /> Deep-Dive Videos (16:9)
              </span>
              <span className="font-mono text-emerald-400 font-bold">{longPublishedCount}/46</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className="bg-rose-500 h-full transition-all duration-300"
                style={{ width: `${Math.round((longPublishedCount / 46) * 100)}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-secondary/40 p-4">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-foreground">
                <Smartphone className="h-3.5 w-3.5 text-fuchsia-400" /> YouTube Shorts (9:16)
              </span>
              <span className="font-mono text-emerald-400 font-bold">{shortPublishedCount}/46</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className="bg-fuchsia-500 h-full transition-all duration-300"
                style={{ width: `${Math.round((shortPublishedCount / 46) * 100)}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-border/80 bg-secondary/40 p-4">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Total Assets Published
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                {longPublishedCount + shortPublishedCount}/92
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${Math.round(((longPublishedCount + shortPublishedCount) / 92) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterMode("all")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filterMode === "all"
                ? "bg-primary text-primary-foreground shadow"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            All 46 Topics
          </button>
          <button
            onClick={() => setFilterMode("missing_long")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filterMode === "missing_long"
                ? "bg-rose-600 text-white shadow"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Needs Deep-Dive Video ({46 - longPublishedCount})
          </button>
          <button
            onClick={() => setFilterMode("missing_short")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filterMode === "missing_short"
                ? "bg-fuchsia-600 text-white shadow"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Needs YouTube Short ({46 - shortPublishedCount})
          </button>
          <button
            onClick={() => setFilterMode("completed_both")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              filterMode === "completed_both"
                ? "bg-emerald-600 text-white shadow"
                : "bg-secondary/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Completed Both
          </button>
        </div>
      </div>

      {/* Export Config Drawer */}
      {showExportModal && (
        <div className="rounded-3xl border border-violet-500/40 bg-card p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Updated TypeScript Code for <code className="text-violet-300 font-mono">src/data/youtube-links.ts</code>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Copy this block and paste it into <code>src/data/youtube-links.ts</code> to permanently commit your URLs into Git and Lovable.
              </p>
            </div>
            <button
              onClick={() => handleCopy("export-ts", exportedTsCode)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-bold text-white transition-all"
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

      {/* 46 Episodes Production Table */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-secondary/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <th className="py-4 px-5"># Ep</th>
                <th className="py-4 px-5">Topic &amp; Level</th>
                <th className="py-4 px-5 min-w-[280px]">Format A: Full Deep-Dive (16:9)</th>
                <th className="py-4 px-5 min-w-[280px]">Format B: YouTube Short (9:16)</th>
                <th className="py-4 px-5">Scripts &amp; Download</th>
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
                  shortYoutubeUrl: "",
                  shortStatus: "planned",
                };
                const longVideoId = extractYouTubeId(entry.youtubeUrl);
                const shortVideoId = extractYouTubeId(entry.shortYoutubeUrl);
                const fullMarkdown = buildNotebookLMMarkdown(topic);
                const epStr = String(topic.order).padStart(2, "0");

                return (
                  <tr key={topic.id} className="hover:bg-secondary/30 transition-colors">
                    {/* Ep Number */}
                    <td className="py-4 px-5 font-mono font-bold text-violet-300 whitespace-nowrap">
                      #{epStr}
                    </td>

                    {/* Topic Name */}
                    <td className="py-4 px-5">
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

                    {/* Format A: Deep-Dive */}
                    <td className="py-4 px-5 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <select
                          value={entry.status}
                          onChange={(e) =>
                            onUpdateYouTubeLink(
                              topic.id,
                              entry.youtubeUrl,
                              e.target.value as VideoStatus,
                              entry.shortYoutubeUrl,
                              entry.shortStatus
                            )
                          }
                          className={`rounded-lg border px-2 py-1 text-[11px] font-bold focus:outline-none ${
                            entry.status === "published"
                              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                              : entry.status === "in_production"
                              ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                              : "border-border bg-secondary text-muted-foreground"
                          }`}
                        >
                          <option value="planned">📋 Planned</option>
                          <option value="in_production">🎬 In Production</option>
                          <option value="published">✅ Published</option>
                        </select>

                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={entry.youtubeUrl}
                            onChange={(e) => {
                              const val = e.target.value;
                              onUpdateYouTubeLink(
                                topic.id,
                                val,
                                val.trim() ? "published" : entry.status,
                                entry.shortYoutubeUrl,
                                entry.shortStatus
                              );
                            }}
                            placeholder="Long video URL / ID..."
                            className="w-full rounded-lg border border-border bg-background/80 px-2.5 py-1 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:border-rose-500 focus:outline-none"
                          />
                        </div>

                        {longVideoId && (
                          <button
                            onClick={() => onSelectTopic(topic)}
                            title="Preview video"
                            className="p-1 text-rose-400 hover:text-rose-300"
                          >
                            <Play className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Format B: YouTube Short */}
                    <td className="py-4 px-5 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <select
                          value={entry.shortStatus || "planned"}
                          onChange={(e) =>
                            onUpdateYouTubeLink(
                              topic.id,
                              entry.youtubeUrl,
                              entry.status,
                              entry.shortYoutubeUrl,
                              e.target.value as VideoStatus
                            )
                          }
                          className={`rounded-lg border px-2 py-1 text-[11px] font-bold focus:outline-none ${
                            entry.shortStatus === "published"
                              ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                              : entry.shortStatus === "in_production"
                              ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                              : "border-border bg-secondary text-muted-foreground"
                          }`}
                        >
                          <option value="planned">📋 Planned</option>
                          <option value="in_production">🎬 In Production</option>
                          <option value="published">✅ Published</option>
                        </select>

                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={entry.shortYoutubeUrl || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              onUpdateYouTubeLink(
                                topic.id,
                                entry.youtubeUrl,
                                entry.status,
                                val,
                                val.trim() ? "published" : entry.shortStatus || "planned"
                              );
                            }}
                            placeholder="Short URL / ID..."
                            className="w-full rounded-lg border border-border bg-background/80 px-2.5 py-1 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:border-fuchsia-500 focus:outline-none"
                          />
                        </div>

                        {shortVideoId && (
                          <button
                            onClick={() => onSelectTopic(topic)}
                            title="Preview Short"
                            className="p-1 text-fuchsia-400 hover:text-fuchsia-300"
                          >
                            <Smartphone className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Scripts & Download */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(`md-${topic.id}`, fullMarkdown)}
                          className="inline-flex items-center gap-1 rounded-xl border border-border bg-secondary/80 hover:bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground transition-all"
                          title="Copy full markdown source (Long script + Short script)"
                        >
                          {copiedId === `md-${topic.id}` ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" /> Copied
                            </>
                          ) : (
                            <>
                              <FileText className="h-3 w-3" /> Copy Script
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDownloadMarkdown(topic)}
                          className="inline-flex items-center justify-center rounded-xl border border-border bg-secondary/80 hover:bg-secondary p-1.5 text-muted-foreground hover:text-foreground transition-all"
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

import React, { useState, useEffect } from "react";
import { Navbar, ActiveMainView } from "@/components/Navbar";
import { FlowchartView } from "@/components/FlowchartView";
import { RoadmapView } from "@/components/RoadmapView";
import { CreatorStudioView } from "@/components/CreatorStudioView";
import { TopicDetailModal } from "@/components/TopicDetailModal";
import { ALL_DSA_TOPICS } from "@/data";
import { DEFAULT_YOUTUBE_LINKS } from "@/data/youtube-links";
import { DSATopic, YouTubeVideoEntry, VideoStatus } from "@/types/dsa";
import { Github, Youtube, BookOpen, Sparkles } from "lucide-react";

const STORAGE_KEYS = {
  COMPLETED_TOPICS: "leet-yt-completed-topics-v1",
  SOLVED_PROBLEMS: "leet-yt-solved-problems-v1",
  YOUTUBE_LINKS: "leet-yt-youtube-links-v1",
  THEME: "leet-yt-theme-v1",
};

const Index: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveMainView>("flowchart");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<DSATopic | null>(null);

  // Dark / Light mode
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem(STORAGE_KEYS.THEME, "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem(STORAGE_KEYS.THEME, "light");
    }
  }, [isDark]);

  // Completed topics
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Solved LeetCode problems
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.SOLVED_PROBLEMS);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  // YouTube Links (merged with defaults)
  const [youtubeLinks, setYoutubeLinks] = useState<
    Record<string, YouTubeVideoEntry>
  >(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.YOUTUBE_LINKS);
      if (raw) {
        const parsed = JSON.parse(raw);
        return { ...DEFAULT_YOUTUBE_LINKS, ...parsed };
      }
    } catch {
      // ignore
    }
    return DEFAULT_YOUTUBE_LINKS;
  });

  // Close modal on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedTopic(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleToggleComplete = (topicId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCompletedTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      localStorage.setItem(
        STORAGE_KEYS.COMPLETED_TOPICS,
        JSON.stringify(Array.from(next))
      );
      return next;
    });
  };

  const handleToggleProblem = (problemNumber: number) => {
    setSolvedProblems((prev) => {
      const next = new Set(prev);
      if (next.has(problemNumber)) next.delete(problemNumber);
      else next.add(problemNumber);
      localStorage.setItem(
        STORAGE_KEYS.SOLVED_PROBLEMS,
        JSON.stringify(Array.from(next))
      );
      return next;
    });
  };

  const handleUpdateYouTubeLink = (
    topicId: string,
    url: string,
    status: VideoStatus
  ) => {
    setYoutubeLinks((prev) => {
      const existing = prev[topicId] ?? {
        topicId,
        episodeNumber:
          ALL_DSA_TOPICS.find((t) => t.id === topicId)?.order ?? 0,
        youtubeUrl: "",
        status: "planned",
        durationEstimate: "10:00",
      };
      const updated = {
        ...prev,
        [topicId]: {
          ...existing,
          youtubeUrl: url,
          status,
        },
      };
      localStorage.setItem(STORAGE_KEYS.YOUTUBE_LINKS, JSON.stringify(updated));
      return updated;
    });
  };

  const publishedVideosCount = Object.values(youtubeLinks).filter(
    (entry) => Boolean(entry.youtubeUrl) || entry.status === "published"
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        completedCount={completedTopics.size}
        publishedVideosCount={publishedVideosCount}
        totalCount={ALL_DSA_TOPICS.length}
        isDark={isDark}
        toggleTheme={() => setIsDark((d) => !d)}
      />

      <main className="flex-1 container mx-auto px-4 py-6">
        {activeView === "flowchart" && (
          <FlowchartView
            topics={ALL_DSA_TOPICS}
            onSelectTopic={setSelectedTopic}
            completedTopics={completedTopics}
            youtubeLinks={youtubeLinks}
            searchQuery={searchQuery}
          />
        )}

        {activeView === "roadmap" && (
          <RoadmapView
            topics={ALL_DSA_TOPICS}
            onSelectTopic={setSelectedTopic}
            completedTopics={completedTopics}
            onToggleComplete={handleToggleComplete}
            youtubeLinks={youtubeLinks}
            searchQuery={searchQuery}
          />
        )}

        {activeView === "studio" && (
          <CreatorStudioView
            topics={ALL_DSA_TOPICS}
            youtubeLinks={youtubeLinks}
            onUpdateYouTubeLink={handleUpdateYouTubeLink}
            onSelectTopic={setSelectedTopic}
            searchQuery={searchQuery}
          />
        )}
      </main>

      {/* Topic Detail Modal */}
      <TopicDetailModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
        onSelectTopic={setSelectedTopic}
        isCompleted={
          selectedTopic ? completedTopics.has(selectedTopic.id) : false
        }
        onToggleComplete={handleToggleComplete}
        solvedProblems={solvedProblems}
        onToggleProblem={handleToggleProblem}
        youtubeEntry={
          selectedTopic ? youtubeLinks[selectedTopic.id] : undefined
        }
        onUpdateYouTubeLink={handleUpdateYouTubeLink}
      />

      {/* Footer */}
      <footer className="border-t border-border/80 bg-card/50 py-6 mt-12">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-400" />
            <span>
              <strong className="text-foreground">Leet-YT</strong> — Flowchart
              Interactivo de Algoritmos y Estructuras de Datos (46 Episodios +
              Guiones NotebookLM)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveView("studio")}
              className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <Youtube className="h-3.5 w-3.5 text-rose-400" /> Gestor de Videos
            </button>
            <button
              onClick={() => setActiveView("roadmap")}
              className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5 text-cyan-400" /> 7 Niveles
            </button>
            <a
              href="https://github.com/dagudelob/leet-yt"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground inline-flex items-center gap-1 transition-colors"
            >
              <Github className="h-3.5 w-3.5" /> GitHub (MIT)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

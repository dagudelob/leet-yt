import React from "react";
import { useAuth } from "@/context/AuthContext";
import { LEVEL_METADATA } from "@/data";
import {
  ArrayPointersIcon,
  HashPartitionIcon,
  LinkedListStackIcon,
  TreeHeapIcon,
  GraphDagIcon,
  DpGridIcon,
  SegmentTreeIcon,
} from "./DataStructureIcons";
import {
  Sparkles,
  ArrowRight,
  Lock,
  Unlock,
  PlayCircle,
  Layers,
  Code2,
} from "lucide-react";

interface LandingHeroLevelsProps {
  onSelectLevel: (level: number) => void;
  completedTopicsCount: number;
}

export const LandingHeroLevels: React.FC<LandingHeroLevelsProps> = ({
  onSelectLevel,
  completedTopicsCount,
}) => {
  const { isAuthenticated, hasCompletedOnboarding, openAuthModal } = useAuth();

  const LEVEL_ICONS: Record<number, React.ReactNode> = {
    1: <ArrayPointersIcon className="h-14 w-20" />,
    2: <HashPartitionIcon className="h-14 w-20" />,
    3: <LinkedListStackIcon className="h-14 w-20" />,
    4: <TreeHeapIcon className="h-14 w-20" />,
    5: <GraphDagIcon className="h-14 w-20" />,
    6: <DpGridIcon className="h-14 w-20" />,
    7: <SegmentTreeIcon className="h-14 w-20" />,
  };

  const LEVEL_EPISODES: Record<number, { range: string; count: number }> = {
    1: { range: "Ep #01 - #07", count: 7 },
    2: { range: "Ep #08 - #14", count: 7 },
    3: { range: "Ep #15 - #20", count: 6 },
    4: { range: "Ep #21 - #28", count: 8 },
    5: { range: "Ep #29 - #33", count: 5 },
    6: { range: "Ep #34 - #37", count: 4 },
    7: { range: "Ep #38 - #46", count: 9 },
  };

  const handleCardClick = (levelNumber: number) => {
    // Level 1 is always unlocked
    if (levelNumber === 1) {
      onSelectLevel(1);
      return;
    }

    // Level 2+ requires login and completed onboarding
    if (!isAuthenticated || !hasCompletedOnboarding) {
      openAuthModal(`Sign in with Google to unlock Level ${levelNumber} and all 46 interactive lessons`);
      return;
    }

    onSelectLevel(levelNumber);
  };

  return (
    <section className="relative pt-6 pb-12 space-y-10">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs font-bold text-violet-300 shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>The Visual, Zero-Clutter Path to LeetCode Mastery</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
          Master Data Structures &amp; Algorithms in{" "}
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
            7 Progressive Levels
          </span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Inspired by <strong>Brilliant.org</strong>: learn each data structure right before the algorithmic patterns that use it. Step through interactive state visualizers, watch deep-dive YouTube lessons, and use our strategic decision flowchart.
        </p>

        {/* CTA Banner */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => handleCardClick(1)}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold px-6 py-3 text-sm shadow-xl shadow-violet-500/25 transition-all hover:scale-[1.02]"
          >
            <PlayCircle className="h-4 w-4" />
            <span>Start Free Preview (Level 1)</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {!isAuthenticated && (
            <button
              onClick={() => openAuthModal()}
              className="inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-secondary/60 hover:bg-secondary px-6 py-3 text-sm font-bold text-foreground transition-all"
            >
              <span>Unlock All 7 Levels Free</span>
            </button>
          )}
        </div>
      </div>

      {/* 7 Levels Interactive Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 px-1">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
              <Layers className="h-4 w-4 text-violet-400" />
              Curriculum Map: 7 Levels • 46 Topics • 92 Video Lessons
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Click any level to jump straight to its lessons and interactive widgets
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="text-emerald-400 font-bold">{completedTopicsCount}/46</span> mastered
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEVEL_METADATA.map((lvl) => {
            const epInfo = LEVEL_EPISODES[lvl.level] ?? { range: "", count: 0 };
            const isLevel1 = lvl.level === 1;
            const isUnlocked = isLevel1 || (isAuthenticated && hasCompletedOnboarding);

            return (
              <button
                key={lvl.level}
                onClick={() => handleCardClick(lvl.level)}
                className={`group relative text-left rounded-3xl border p-5 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  lvl.borderClass
                } bg-card/90 hover:bg-card hover:shadow-xl hover:-translate-y-1 ${
                  lvl.level === 7 ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {/* Background glow highlight */}
                <div
                  className={`absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-15 blur-2xl pointer-events-none transition-opacity group-hover:opacity-30 ${
                    lvl.colorClass.replace("text-", "bg-")
                  }`}
                />

                <div>
                  {/* Top Bar: Level Badge & Access Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${lvl.badgeClass}`}
                    >
                      Level {lvl.level}
                    </span>

                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                        <Unlock className="h-3 w-3" />
                        {isLevel1 ? "Free Preview" : "Unlocked"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground group-hover:text-amber-300 transition-colors">
                        <Lock className="h-3 w-3" /> Free Login
                      </span>
                    )}
                  </div>

                  {/* SVG Illustration of the Data Structure */}
                  <div className="my-2 flex items-center justify-center p-2 rounded-2xl bg-secondary/40 border border-border/50 group-hover:border-border transition-colors">
                    {LEVEL_ICONS[lvl.level]}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className={`text-base font-extrabold ${lvl.colorClass} mt-3 leading-snug`}>
                    {lvl.title.replace(/^Level \d+: /, "")}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {lvl.subtitle}
                  </p>
                </div>

                {/* Footer Meta */}
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-muted-foreground font-semibold">
                    {epInfo.count} Topics ({epInfo.range})
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-violet-300 group-hover:translate-x-1 transition-transform text-[11px]">
                    Explore <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

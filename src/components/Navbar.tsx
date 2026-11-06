import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
  GitBranch,
  Layers,
  Youtube,
  Search,
  CheckCircle2,
  Sun,
  Moon,
  Sparkles,
  X,
  User,
  LogOut,
  LogIn,
} from "lucide-react";

export type ActiveMainView = "roadmap" | "flowchart" | "studio";

interface NavbarProps {
  activeView: ActiveMainView;
  setActiveView: (view: ActiveMainView) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  completedCount: number;
  publishedVideosCount: number;
  totalCount: number;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
  completedCount,
  publishedVideosCount,
  totalCount,
  isDark,
  toggleTheme,
}) => {
  const { user, isAuthenticated, openAuthModal, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 py-3.5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Brand & Title */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => setActiveView("roadmap")}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <GitBranch className="h-5 w-5" />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow">
                ▶
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
                  Leet-YT
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-300">
                  <Sparkles className="h-3 w-3" /> 7 Levels • 46 Topics
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Brilliant-Style Interactive DSA Curriculum &amp; Videos
              </p>
            </div>
          </div>

          {/* Mobile Theme & Auth */}
          <div className="flex items-center gap-2 lg:hidden">
            {isAuthenticated ? (
              <button
                onClick={signOut}
                className="rounded-xl border border-border bg-secondary/60 p-2 text-muted-foreground hover:text-foreground"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={() => openAuthModal()}
                className="rounded-xl bg-violet-600 text-white p-2 text-xs font-bold"
                title="Sign in with Google"
              >
                <LogIn className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="rounded-xl border border-border bg-secondary/60 p-2 text-muted-foreground hover:text-foreground"
              title="Toggle theme"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs in Pedagogical Order */}
        <nav className="flex items-center gap-1.5 rounded-2xl border border-border/80 bg-secondary/50 p-1.5 overflow-x-auto">
          <button
            onClick={() => setActiveView("roadmap")}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeView === "roadmap"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            1. 7-Level Path
          </button>
          <button
            onClick={() => setActiveView("flowchart")}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeView === "flowchart"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <GitBranch className="h-3.5 w-3.5" />
            2. Strategy Flowchart (Mermaid)
          </button>
          <button
            onClick={() => setActiveView("studio")}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
              activeView === "studio"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            }`}
          >
            <Youtube className="h-3.5 w-3.5 text-rose-300" />
            3. Video Todo-List (92 Scripts)
          </button>
        </nav>

        {/* Search, Stats & Auth Section */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-56">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic, Big-O..."
              className="w-full rounded-xl border border-border bg-secondary/40 pl-8 pr-7 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          <div className="hidden xl:flex items-center gap-2 rounded-xl border border-border bg-secondary/40 px-2.5 py-1.5 text-xs">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-mono font-semibold text-foreground">
              {completedCount}/{totalCount}
            </span>
          </div>

          {/* User Sign In / Profile Button */}
          {isAuthenticated ? (
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-3 py-1.5 text-xs font-semibold text-foreground">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-[10px] font-extrabold text-white">
                  {user?.fullName?.charAt(0) || "U"}
                </span>
                <span className="max-w-[100px] truncate">{user?.fullName || "Learner"}</span>
              </div>
              <button
                onClick={signOut}
                className="rounded-xl border border-border bg-secondary/60 p-2 text-muted-foreground hover:text-foreground transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal()}
              className="hidden lg:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold px-3.5 py-2 shadow-sm transition-all"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign in with Google</span>
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="hidden lg:flex items-center justify-center rounded-xl border border-border bg-secondary/60 p-2 text-muted-foreground hover:text-foreground transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

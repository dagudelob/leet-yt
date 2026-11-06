import { YouTubeVideoEntry } from "@/types/dsa";

/**
 * CENTRAL YOUTUBE LINKS & SHORTS REGISTRY (LEET-YT)
 * ------------------------------------------------
 * Tracks both video formats for all 46 DSA topics (92 total assets):
 * 1. `youtubeUrl` + `status`: Full-length deep-dive masterclass (16:9).
 * 2. `shortYoutubeUrl` + `shortStatus`: 45-second high-retention summary with dual CTA (9:16).
 */
export const DEFAULT_YOUTUBE_LINKS: Record<string, YouTubeVideoEntry> = {
  "basic-dsa": { topicId: "basic-dsa", episodeNumber: 1, youtubeUrl: "", status: "in_production", durationEstimate: "08:30", shortYoutubeUrl: "", shortStatus: "in_production" },
  "brute-force": { topicId: "brute-force", episodeNumber: 2, youtubeUrl: "", status: "in_production", durationEstimate: "07:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "simulation": { topicId: "simulation", episodeNumber: 3, youtubeUrl: "", status: "planned", durationEstimate: "08:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "arrays": { topicId: "arrays", episodeNumber: 4, youtubeUrl: "", status: "in_production", durationEstimate: "09:00", shortYoutubeUrl: "", shortStatus: "in_production" },
  "strings": { topicId: "strings", episodeNumber: 5, youtubeUrl: "", status: "planned", durationEstimate: "08:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "two-pointers": { topicId: "two-pointers", episodeNumber: 6, youtubeUrl: "", status: "in_production", durationEstimate: "10:00", shortYoutubeUrl: "", shortStatus: "in_production" },
  "sliding-window": { topicId: "sliding-window", episodeNumber: 7, youtubeUrl: "", status: "in_production", durationEstimate: "11:00", shortYoutubeUrl: "", shortStatus: "in_production" },
  "prefix-sum": { topicId: "prefix-sum", episodeNumber: 8, youtubeUrl: "", status: "planned", durationEstimate: "09:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "hash-table": { topicId: "hash-table", episodeNumber: 9, youtubeUrl: "", status: "planned", durationEstimate: "10:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "counting": { topicId: "counting", episodeNumber: 10, youtubeUrl: "", status: "planned", durationEstimate: "08:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "sorting-intervals": { topicId: "sorting-intervals", episodeNumber: 11, youtubeUrl: "", status: "planned", durationEstimate: "09:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "partitioning": { topicId: "partitioning", episodeNumber: 12, youtubeUrl: "", status: "planned", durationEstimate: "10:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "binary-search": { topicId: "binary-search", episodeNumber: 13, youtubeUrl: "", status: "planned", durationEstimate: "12:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "matrices-grids": { topicId: "matrices-grids", episodeNumber: 14, youtubeUrl: "", status: "planned", durationEstimate: "09:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "linked-list": { topicId: "linked-list", episodeNumber: 15, youtubeUrl: "", status: "planned", durationEstimate: "09:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "linkedlist-manipulation": { topicId: "linkedlist-manipulation", episodeNumber: 16, youtubeUrl: "", status: "planned", durationEstimate: "11:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "stacks": { topicId: "stacks", episodeNumber: 17, youtubeUrl: "", status: "planned", durationEstimate: "08:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "queues-deques": { topicId: "queues-deques", episodeNumber: 18, youtubeUrl: "", status: "planned", durationEstimate: "08:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "monotonic-stack": { topicId: "monotonic-stack", episodeNumber: 19, youtubeUrl: "", status: "planned", durationEstimate: "11:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "system-ds-design": { topicId: "system-ds-design", episodeNumber: 20, youtubeUrl: "", status: "planned", durationEstimate: "12:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "divide-and-conquer": { topicId: "divide-and-conquer", episodeNumber: 21, youtubeUrl: "", status: "planned", durationEstimate: "09:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "trees": { topicId: "trees", episodeNumber: 22, youtubeUrl: "", status: "planned", durationEstimate: "10:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "bst": { topicId: "bst", episodeNumber: 23, youtubeUrl: "", status: "planned", durationEstimate: "09:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "dfs": { topicId: "dfs", episodeNumber: 24, youtubeUrl: "", status: "planned", durationEstimate: "10:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "bfs": { topicId: "bfs", episodeNumber: 25, youtubeUrl: "", status: "planned", durationEstimate: "11:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "backtracking": { topicId: "backtracking", episodeNumber: 26, youtubeUrl: "", status: "planned", durationEstimate: "12:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "heaps": { topicId: "heaps", episodeNumber: 27, youtubeUrl: "", status: "planned", durationEstimate: "09:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "heap-sorting": { topicId: "heap-sorting", episodeNumber: 28, youtubeUrl: "", status: "planned", durationEstimate: "11:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "graphs": { topicId: "graphs", episodeNumber: 29, youtubeUrl: "", status: "planned", durationEstimate: "10:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "topological-sort-dag": { topicId: "topological-sort-dag", episodeNumber: 30, youtubeUrl: "", status: "planned", durationEstimate: "11:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "dijkstra": { topicId: "dijkstra", episodeNumber: 31, youtubeUrl: "", status: "planned", durationEstimate: "11:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "disjoint-set-union": { topicId: "disjoint-set-union", episodeNumber: 32, youtubeUrl: "", status: "planned", durationEstimate: "11:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "tries": { topicId: "tries", episodeNumber: 33, youtubeUrl: "", status: "planned", durationEstimate: "10:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "greedy": { topicId: "greedy", episodeNumber: 34, youtubeUrl: "", status: "planned", durationEstimate: "10:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "memoization": { topicId: "memoization", episodeNumber: 35, youtubeUrl: "", status: "planned", durationEstimate: "11:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "dynamic-programming": { topicId: "dynamic-programming", episodeNumber: 36, youtubeUrl: "", status: "planned", durationEstimate: "14:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "bitmask-dp": { topicId: "bitmask-dp", episodeNumber: 37, youtubeUrl: "", status: "planned", durationEstimate: "12:00", shortYoutubeUrl: "", shortStatus: "planned" },
  "ordered-set": { topicId: "ordered-set", episodeNumber: 38, youtubeUrl: "", status: "planned", durationEstimate: "09:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "fenwick-tree": { topicId: "fenwick-tree", episodeNumber: 39, youtubeUrl: "", status: "planned", durationEstimate: "10:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "segment-tree": { topicId: "segment-tree", episodeNumber: 40, youtubeUrl: "", status: "planned", durationEstimate: "12:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "rolling-hash": { topicId: "rolling-hash", episodeNumber: 41, youtubeUrl: "", status: "planned", durationEstimate: "10:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "string-matching": { topicId: "string-matching", episodeNumber: 42, youtubeUrl: "", status: "planned", durationEstimate: "11:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "bit-manipulation": { topicId: "bit-manipulation", episodeNumber: 43, youtubeUrl: "", status: "planned", durationEstimate: "09:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "math": { topicId: "math", episodeNumber: 44, youtubeUrl: "", status: "planned", durationEstimate: "09:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "number-theory": { topicId: "number-theory", episodeNumber: 45, youtubeUrl: "", status: "planned", durationEstimate: "10:30", shortYoutubeUrl: "", shortStatus: "planned" },
  "specialized-advanced": { topicId: "specialized-advanced", episodeNumber: 46, youtubeUrl: "", status: "planned", durationEstimate: "13:00", shortYoutubeUrl: "", shortStatus: "planned" },
};

export function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
  ];
  for (const regex of patterns) {
    const match = trimmed.match(regex);
    if (match && match[1]) return match[1];
  }
  return null;
}

export function generateYouTubeConfigSource(links: Record<string, YouTubeVideoEntry>): string {
  const entries = Object.entries(links)
    .sort((a, b) => a[1].episodeNumber - b[1].episodeNumber)
    .map(
      ([key, val]) =>
        `  "${key}": { topicId: "${val.topicId}", episodeNumber: ${val.episodeNumber}, youtubeUrl: "${val.youtubeUrl || ""}", status: "${val.status || "planned"}", durationEstimate: "${val.durationEstimate || "10:00"}", shortYoutubeUrl: "${val.shortYoutubeUrl || ""}", shortStatus: "${val.shortStatus || "planned"}" },`
    )
    .join("\n");

  return `import { YouTubeVideoEntry } from "@/types/dsa";

export const DEFAULT_YOUTUBE_LINKS: Record<string, YouTubeVideoEntry> = {
${entries}
};
`;
}

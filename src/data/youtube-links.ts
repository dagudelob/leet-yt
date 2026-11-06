import { YouTubeVideoEntry } from "@/types/dsa";

/**
 * ARCHIVO CENTRAL DE LINKS DE YOUTUBE (LEET-YT)
 * ---------------------------------------------
 * A medida que vayas subiendo cada video a tu canal de YouTube:
 * 1. Pega el link en `youtubeUrl` (ej. "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
 * 2. Cambia `status` a "published" (o "in_production")
 * También puedes editar estos links visualmente desde la pestaña "Gestor YouTube" en la web
 * y exportar este archivo actualizado con un clic.
 */
export const DEFAULT_YOUTUBE_LINKS: Record<string, YouTubeVideoEntry> = {
  "basic-dsa": { topicId: "basic-dsa", episodeNumber: 1, youtubeUrl: "", status: "in_production", durationEstimate: "08:30" },
  "brute-force": { topicId: "brute-force", episodeNumber: 2, youtubeUrl: "", status: "in_production", durationEstimate: "07:00" },
  "simulation": { topicId: "simulation", episodeNumber: 3, youtubeUrl: "", status: "planned", durationEstimate: "08:00" },
  "arrays": { topicId: "arrays", episodeNumber: 4, youtubeUrl: "", status: "in_production", durationEstimate: "09:00" },
  "strings": { topicId: "strings", episodeNumber: 5, youtubeUrl: "", status: "planned", durationEstimate: "08:30" },
  "two-pointers": { topicId: "two-pointers", episodeNumber: 6, youtubeUrl: "", status: "in_production", durationEstimate: "10:00" },
  "sliding-window": { topicId: "sliding-window", episodeNumber: 7, youtubeUrl: "", status: "in_production", durationEstimate: "11:00" },
  "prefix-sum": { topicId: "prefix-sum", episodeNumber: 8, youtubeUrl: "", status: "planned", durationEstimate: "09:30" },
  "hash-table": { topicId: "hash-table", episodeNumber: 9, youtubeUrl: "", status: "planned", durationEstimate: "10:00" },
  "counting": { topicId: "counting", episodeNumber: 10, youtubeUrl: "", status: "planned", durationEstimate: "08:30" },
  "sorting-intervals": { topicId: "sorting-intervals", episodeNumber: 11, youtubeUrl: "", status: "planned", durationEstimate: "09:30" },
  "partitioning": { topicId: "partitioning", episodeNumber: 12, youtubeUrl: "", status: "planned", durationEstimate: "10:30" },
  "binary-search": { topicId: "binary-search", episodeNumber: 13, youtubeUrl: "", status: "planned", durationEstimate: "12:00" },
  "matrices-grids": { topicId: "matrices-grids", episodeNumber: 14, youtubeUrl: "", status: "planned", durationEstimate: "09:00" },
  "linked-list": { topicId: "linked-list", episodeNumber: 15, youtubeUrl: "", status: "planned", durationEstimate: "09:00" },
  "linkedlist-manipulation": { topicId: "linkedlist-manipulation", episodeNumber: 16, youtubeUrl: "", status: "planned", durationEstimate: "11:00" },
  "stacks": { topicId: "stacks", episodeNumber: 17, youtubeUrl: "", status: "planned", durationEstimate: "08:30" },
  "queues-deques": { topicId: "queues-deques", episodeNumber: 18, youtubeUrl: "", status: "planned", durationEstimate: "08:30" },
  "monotonic-stack": { topicId: "monotonic-stack", episodeNumber: 19, youtubeUrl: "", status: "planned", durationEstimate: "11:30" },
  "system-ds-design": { topicId: "system-ds-design", episodeNumber: 20, youtubeUrl: "", status: "planned", durationEstimate: "12:00" },
  "divide-and-conquer": { topicId: "divide-and-conquer", episodeNumber: 21, youtubeUrl: "", status: "planned", durationEstimate: "09:30" },
  "trees": { topicId: "trees", episodeNumber: 22, youtubeUrl: "", status: "planned", durationEstimate: "10:30" },
  "bst": { topicId: "bst", episodeNumber: 23, youtubeUrl: "", status: "planned", durationEstimate: "09:30" },
  "dfs": { topicId: "dfs", episodeNumber: 24, youtubeUrl: "", status: "planned", durationEstimate: "10:30" },
  "bfs": { topicId: "bfs", episodeNumber: 25, youtubeUrl: "", status: "planned", durationEstimate: "11:00" },
  "backtracking": { topicId: "backtracking", episodeNumber: 26, youtubeUrl: "", status: "planned", durationEstimate: "12:00" },
  "heaps": { topicId: "heaps", episodeNumber: 27, youtubeUrl: "", status: "planned", durationEstimate: "09:30" },
  "heap-sorting": { topicId: "heap-sorting", episodeNumber: 28, youtubeUrl: "", status: "planned", durationEstimate: "11:30" },
  "graphs": { topicId: "graphs", episodeNumber: 29, youtubeUrl: "", status: "planned", durationEstimate: "10:00" },
  "topological-sort-dag": { topicId: "topological-sort-dag", episodeNumber: 30, youtubeUrl: "", status: "planned", durationEstimate: "11:30" },
  "dijkstra": { topicId: "dijkstra", episodeNumber: 31, youtubeUrl: "", status: "planned", durationEstimate: "11:30" },
  "disjoint-set-union": { topicId: "disjoint-set-union", episodeNumber: 32, youtubeUrl: "", status: "planned", durationEstimate: "11:00" },
  "tries": { topicId: "tries", episodeNumber: 33, youtubeUrl: "", status: "planned", durationEstimate: "10:30" },
  "greedy": { topicId: "greedy", episodeNumber: 34, youtubeUrl: "", status: "planned", durationEstimate: "10:00" },
  "memoization": { topicId: "memoization", episodeNumber: 35, youtubeUrl: "", status: "planned", durationEstimate: "11:30" },
  "dynamic-programming": { topicId: "dynamic-programming", episodeNumber: 36, youtubeUrl: "", status: "planned", durationEstimate: "14:00" },
  "bitmask-dp": { topicId: "bitmask-dp", episodeNumber: 37, youtubeUrl: "", status: "planned", durationEstimate: "12:00" },
  "ordered-set": { topicId: "ordered-set", episodeNumber: 38, youtubeUrl: "", status: "planned", durationEstimate: "09:30" },
  "fenwick-tree": { topicId: "fenwick-tree", episodeNumber: 39, youtubeUrl: "", status: "planned", durationEstimate: "10:30" },
  "segment-tree": { topicId: "segment-tree", episodeNumber: 40, youtubeUrl: "", status: "planned", durationEstimate: "12:30" },
  "rolling-hash": { topicId: "rolling-hash", episodeNumber: 41, youtubeUrl: "", status: "planned", durationEstimate: "10:30" },
  "string-matching": { topicId: "string-matching", episodeNumber: 42, youtubeUrl: "", status: "planned", durationEstimate: "11:30" },
  "bit-manipulation": { topicId: "bit-manipulation", episodeNumber: 43, youtubeUrl: "", status: "planned", durationEstimate: "09:30" },
  "math": { topicId: "math", episodeNumber: 44, youtubeUrl: "", status: "planned", durationEstimate: "09:30" },
  "number-theory": { topicId: "number-theory", episodeNumber: 45, youtubeUrl: "", status: "planned", durationEstimate: "10:30" },
  "specialized-advanced": { topicId: "specialized-advanced", episodeNumber: 46, youtubeUrl: "", status: "planned", durationEstimate: "13:00" },
};

export function extractYouTubeId(url: string): string | null {
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
        `  "${key}": { topicId: "${val.topicId}", episodeNumber: ${val.episodeNumber}, youtubeUrl: "${val.youtubeUrl}", status: "${val.status}", durationEstimate: "${val.durationEstimate}" },`
    )
    .join("\n");

  return `import { YouTubeVideoEntry } from "@/types/dsa";

export const DEFAULT_YOUTUBE_LINKS: Record<string, YouTubeVideoEntry> = {
${entries}
};
`;
}

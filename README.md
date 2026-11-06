# Leet-YT — Interactive DSA Decision Flowchart, Visual Lessons & YouTube/NotebookLM Curriculum

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](./LICENSE)
[![Stack: Lovable Ready](https://img.shields.io/badge/Stack-Vite%20%2B%20React%20%2B%20TS%20%2B%20Tailwind-8b5cf6)](https://lovable.dev)
[![Episodes: 46](https://img.shields.io/badge/Episodes-46%20Topics%20%2B%20NotebookLM%20Scripts-f43f5e)](./scripts/README.md)

**Leet-YT** is an interactive Data Structures & Algorithms (DSA) decision platform and 46-episode video production curriculum inspired by the [AlgoMonster Flowchart](https://algo.monster/flowchart) and [Brilliant.org](https://brilliant.org)'s visual, interactive-first learning philosophy.

Every node in the decision flowchart is paired with:
1. **Interactive Visual State Stepper** (step-by-step pointer and state visualization).
2. **Predict-Before-Reveal Micro-Challenge** (interactive concept check before inspecting the code).
3. **YouTube Video Player Integration** (centralized in [`src/data/youtube-links.ts`](./src/data/youtube-links.ts) and editable live in the app).
4. **Copy-Ready Code Templates** in **Python 3** (primary for videos) and **TypeScript / JavaScript**.
5. **Complete Google NotebookLM Production Packages** in [`/scripts/`](./scripts/README.md) (`01-basic-dsa.md` through `46-specialized-advanced.md`).

---

## Key Features

### 1. Interactive Decision Flowchart (AlgoMonster + Brilliant Style)
- **Step-by-Step Decision Navigator**: Answer one focused question at a time about your problem's input structure and constraints to land on the exact algorithmic pattern.
- **Constraint $N \to$ Big-O Filter**: Click the problem's upper bound ($N \le 11$, $N \le 20$, $N \le 5000$, $N \le 10^5$, $N \ge 10^9$) to immediately highlight compatible algorithms on the canvas and eliminate Time Limit Exceeded (TLE) approaches.
- **8 Architectural Decision Branches**: Covering all 46 foundational data structures and algorithmic patterns.

### 2. 7-Level Progressive Learning Path (Episodes `#01` to `#46`)
Instead of memorizing all data structures in isolation and all algorithms later, the curriculum introduces **each data structure right before the algorithmic patterns that depend on it**:

| Level | Focus Area | Episodes | Topics Covered |
| :---: | :--- | :---: | :--- |
| **Level 1** | Foundations, Complexity & Linear Sequences | `#01 – #07` | Big-O & Constraints, Brute Force, Simulation, Arrays, Strings, Two Pointers, Sliding Window |
| **Level 2** | Preprocessing, Hashing, Sorting & Binary Search | `#08 – #14` | Prefix Sums, Hash Tables, Counting & Bucket Sort, Sorting + Interval Scan, Partitioning (QuickSelect / Dutch Flag), Binary Search, 2D Matrices & Grids |
| **Level 3** | Linked Pointers, Stacks, Queues & O(1) Design | `#15 – #20` | Linked Lists, Fast & Slow Pointers + Reversal, Stacks, Queues & Deques, Monotonic Stack/Deque, Design + Supporting Data Structures (LRU Cache) |
| **Level 4** | Recursion, Trees, Heaps & Backtracking | `#21 – #28` | Divide & Conquer, Binary Trees, BST, DFS, BFS, Backtracking, Heaps, Top-K / Two Heaps / K-Way Merge |
| **Level 5** | Graphs, DAGs, Shortest Paths, DSU & Tries | `#29 – #33` | Graphs & Adjacency Lists, Topological Sort & DAG DP, Dijkstra, Disjoint Set Union (Union-Find), Tries (Prefix Trees) |
| **Level 6** | Optimization, Greedy & Dynamic Programming | `#34 – #37` | Greedy, Memoization (Top-Down DP), Dynamic Programming (Bottom-Up 1D/2D/Knapsack/LCS/LIS), Bitmask DP |
| **Level 7** | Dynamic Ranges, Advanced Strings, Math & Elite | `#38 – #46` | Ordered Set, Fenwick Tree (BIT), Segment Tree, Rolling Hash (Rabin-Karp), String Matching (KMP), Bit Manipulation, Math & Geometry, Number Theory, Specialized Advanced Patterns (Sweep Line, Boyer-Moore, Tarjan, Euler) |

### 3. YouTube & Google NotebookLM Studio
- All 46 episodes have pre-generated hybrid Markdown packages in [`/scripts/`](./scripts/README.md) and accessible inside the web app's **YouTube & Script Studio** tab.
- Each package includes:
  1. **Direction Prompt** to paste into Google NotebookLM's *Customize* field for Audio/Video Overviews.
  2. **Executive Summary, Real-World Analogy & Flowchart Signals** (Source Document).
  3. **Python 3 & TypeScript Templates** + **Interview Traps**.
  4. **Timestamped Narrative Script & On-Screen Visual Cues**.
  5. **3 Curated LeetCode Problems** with direct links and pattern hints.

---

## Tech Stack (100% Lovable Compatible)

- **Framework**: [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables (Dark/Light Mode)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: React Router v6

---

## Local Development & Lovable Deployment

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Build for production
npm run build
```

### Deploying on Lovable
This repository uses the exact directory structure and configuration (`vite.config.ts`, `tailwind.config.ts`, `components.json`, `@/` path alias) expected by **Lovable**:
1. Connect your GitHub repository `dagudelob/leet-yt` to Lovable.
2. Lovable will automatically detect Vite + React + TypeScript + Tailwind and build the application with zero configuration changes.

---

## License

Released under the [MIT License](./LICENSE).

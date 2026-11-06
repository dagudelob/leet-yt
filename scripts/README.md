# Google NotebookLM & YouTube Hybrid Script Packages (`leet-yt`)

This folder contains all **46 complete production packages** organized across **7 progressive levels** (teaching each foundational data structure right before the algorithmic patterns that build upon it).

## How to Produce Each Video with Google NotebookLM

1. Open [Google NotebookLM](https://notebooklm.google.com/) and create a new notebook for the episode (e.g., `Episode #07 - Sliding Window`).
2. Upload the corresponding Markdown file from this folder (e.g., [`07-sliding-window.md`](./07-sliding-window.md)) as a **Source**.
3. Open the **Audio Overview** or **Video Overview** panel, click **Customize**, and paste the prompt block from **Section 1 (Google NotebookLM Direction Prompt)** at the top of the file.
4. Use **Section 5 (Python & TypeScript Templates)** and **Section 6 (Timestamped Narrative Script & Visual Cues)** for your slides and on-screen code walkthrough.
5. Once your video is published on YouTube, paste the URL into [`src/data/youtube-links.ts`](../src/data/youtube-links.ts) (or directly inside the **YouTube & Script Studio** tab of the web app).

---

## Master Index of All 46 Episodes

| Episode | Level | Script & Source Document (.md) | Kind | Average Time Complexity |
| :---: | :---: | :--- | :---: | :--- |
| **#01** | Level 1 | [Basic DSA & Big-O Complexity](./01-basic-dsa.md) | `Pattern` | `O(1) < O(log N) < O(N) < O(N log N)` |
| **#02** | Level 1 | [Brute Force & Exhaustive Search](./02-brute-force.md) | `Pattern` | `O(N^2) or O(N^3) for pairs/triplets` |
| **#03** | Level 1 | [Simulation (Step-by-Step State Execution)](./03-simulation.md) | `Pattern` | `O(Steps * Cost per step)` |
| **#04** | Level 1 | [Arrays (Static & Dynamic Arrays)](./04-arrays.md) | `Structure` | `Index Access: O(1) | Append at end: O(1) amortized` |
| **#05** | Level 1 | [Strings & Character Manipulation](./05-strings.md) | `Structure` | `Index read `s[i]`: O(1) | Slice / Copy / Compare: O(N)` |
| **#06** | Level 1 | [Two Pointers (Converging & Same-Direction)](./06-two-pointers.md) | `Pattern` | `O(N) (or O(N log N) if sorting first)` |
| **#07** | Level 1 | [Sliding Window (Fixed & Dynamic)](./07-sliding-window.md) | `Pattern` | `O(N)` |
| **#08** | Level 2 | [Prefix Sums (1D, 2D & Subarray Sum = K)](./08-prefix-sum.md) | `Pattern` | `Build: O(N) | Range Query `[L, R]`: O(1)` |
| **#09** | Level 2 | [Hash Tables (Hash Map & Hash Set)](./09-hash-table.md) | `Hybrid` | `Insert / Lookup / Delete: O(1)` |
| **#10** | Level 2 | [Counting & Bucket Sort](./10-counting.md) | `Pattern` | `O(N + K) where K is the bucket range` |
| **#11** | Level 2 | [Sorting + Interval Scan (Merge Intervals)](./11-sorting-intervals.md) | `Pattern` | `O(N log N) dominated by the initial sort` |
| **#12** | Level 2 | [Partitioning (QuickSelect & Dutch National Flag)](./12-partitioning.md) | `Pattern` | `O(N) (QuickSelect geometric series: N + N/2 + N/4 + ... = 2N)` |
| **#13** | Level 2 | [Binary Search (Sorted Arrays & Monotonic Search Space)](./13-binary-search.md) | `Pattern` | `O(log N) on arrays | O(N log(Max - Min)) on Answer Space` |
| **#14** | Level 2 | [Matrices & 2D Grids](./14-matrices-grids.md) | `Structure` | `Full traversal: O(R * C) | Cell access: O(1)` |
| **#15** | Level 3 | [Linked Lists (Singly & Doubly Linked)](./15-linked-list.md) | `Structure` | `Insert/Delete given node pointer: O(1) | Search by index/value: O(N)` |
| **#16** | Level 3 | [Linked List Manipulation (Fast & Slow Pointers & Reversal)](./16-linkedlist-manipulation.md) | `Pattern` | `O(N)` |
| **#17** | Level 3 | [Stacks (LIFO & Nested Expression Evaluation)](./17-stacks.md) | `Hybrid` | `Push: O(1) | Pop: O(1) | Peek (`stack[-1]`): O(1)` |
| **#18** | Level 3 | [Queues & Deques (FIFO & Double-Ended Queues)](./18-queues-deques.md) | `Structure` | `append / appendleft / pop / popleft: O(1)` |
| **#19** | Level 3 | [Monotonic Stack & Monotonic Deque](./19-monotonic-stack.md) | `Pattern` | `O(N)` |
| **#20** | Level 3 | [Design + Supporting Data Structures (LRU Cache, O(1) Set)](./20-system-ds-design.md) | `Hybrid` | `O(1) across all custom methods` |
| **#21** | Level 4 | [Divide and Conquer](./21-divide-and-conquer.md) | `Pattern` | `O(N log N) when splitting in half and merging in O(N)` |
| **#22** | Level 4 | [Binary Trees & Traversals (Pre / In / Post-Order)](./22-trees.md) | `Structure` | `Full traversal: O(N) visiting each node once` |
| **#23** | Level 4 | [Binary Search Trees (BST)](./23-bst.md) | `Structure` | `Search / Insert / Delete: O(log N) on balanced BST` |
| **#24** | Level 4 | [DFS - Depth-First Search (Trees, Grids & Graphs)](./24-dfs.md) | `Pattern` | `O(V + E) on graphs | O(R * C) on 2D grids` |
| **#25** | Level 4 | [BFS - Breadth-First Search (Level Order & Shortest Path)](./25-bfs.md) | `Pattern` | `O(V + E) on graphs | O(R * C) on 2D grids` |
| **#26** | Level 4 | [Backtracking (Exhaustive Search with Pruning)](./26-backtracking.md) | `Pattern` | `Subsets: O(N * 2^N) | Permutations: O(N * N!)` |
| **#27** | Level 4 | [Heaps / Priority Queues (Min-Heap & Max-Heap)](./27-heaps.md) | `Structure` | `Peek (`heap[0]`): O(1) | Push / Pop: O(log N) | `heapify(list)`: O(N)` |
| **#28** | Level 4 | [Heap Patterns (Top-K, K-Way Merge, Two Heaps & Heap Sort)](./28-heap-sorting.md) | `Pattern` | `Top-K: O(N log K) | Two Heaps insert: O(log N), median: O(1) | Heap Sort: O(N log N)` |
| **#29** | Level 5 | [Graphs (Adjacency List, Matrix & Bipartite Coloring)](./29-graphs.md) | `Structure` | `Build Adjacency List: O(V + E) | Iterate neighbors of u: O(degree(u))` |
| **#30** | Level 5 | [Topological Sort & DAG Dynamic Programming](./30-topological-sort-dag.md) | `Pattern` | `O(V + E)` |
| **#31** | Level 5 | [Dijkstra's Algorithm & Weighted Shortest Paths](./31-dijkstra.md) | `Pattern` | `O((V + E) log V) using a Min-Heap` |
| **#32** | Level 5 | [Disjoint Set Union (DSU / Union-Find & Kruskal MST)](./32-disjoint-set-union.md) | `Hybrid` | `O(α(N)) ≈ O(1) per `find` or `union` call` |
| **#33** | Level 5 | [Tries / Prefix Trees](./33-tries.md) | `Hybrid` | `Insert / Search / StartsWith: O(L) where L is word length` |
| **#34** | Level 6 | [Greedy Algorithms](./34-greedy.md) | `Pattern` | `O(N) single scan | O(N log N) when sorting first` |
| **#35** | Level 6 | [Memoization (Top-Down Dynamic Programming)](./35-memoization.md) | `Pattern` | `O(Number of Unique States * Work per State Transition)` |
| **#36** | Level 6 | [Dynamic Programming (Bottom-Up Tabulation & Classic Patterns)](./36-dynamic-programming.md) | `Pattern` | `1D: O(N) or O(N * K) | 2D / Knapsack / LCS: O(N * M)` |
| **#37** | Level 6 | [Bitmask DP (Subset States & Traveling Salesperson)](./37-bitmask-dp.md) | `Pattern` | `O(N * 2^N) or O(N^2 * 2^N)` |
| **#38** | Level 7 | [Ordered Set & Balanced BSTs (Dynamic Sorted Collections)](./38-ordered-set.md) | `Hybrid` | `add / remove / bisect_left / index `s[k]`: O(log N)` |
| **#39** | Level 7 | [Fenwick Tree / Binary Indexed Tree (BIT)](./39-fenwick-tree.md) | `Hybrid` | `Update: O(log N) | Prefix/Range Query: O(log N)` |
| **#40** | Level 7 | [Segment Tree & Lazy Propagation](./40-segment-tree.md) | `Hybrid` | `Build: O(N) | Update: O(log N) | Range Query `[L, R]`: O(log N)` |
| **#41** | Level 7 | [Rolling Hash & Rabin-Karp Algorithm](./41-rolling-hash.md) | `Pattern` | `Precompute or slide window: O(N) | Query hash of substring `s[L..R]`: O(1)` |
| **#42** | Level 7 | [String Matching (KMP Algorithm & LPS Prefix Function)](./42-string-matching.md) | `Pattern` | `Build LPS: O(M) | Search text: O(N) -> Total: O(N + M)` |
| **#43** | Level 7 | [Bit Manipulation & XOR Tricks](./43-bit-manipulation.md) | `Pattern` | `O(1) per bit operation | O(N) across an array scan` |
| **#44** | Level 7 | [Math, Combinatorics & Computational Geometry](./44-math.md) | `Pattern` | `Gauss formulas: O(1) | Binary Exponentiation: O(log N)` |
| **#45** | Level 7 | [Number Theory (Euclidean GCD, Sieve of Eratosthenes & Modular Arithmetic)](./45-number-theory.md) | `Pattern` | `Euclidean GCD: O(log(min(a,b))) | Sieve of Eratosthenes: O(N log log N) ~ O(N)` |
| **#46** | Level 7 | [Specialized Advanced Patterns (Sweep Line, Boyer-Moore, Tarjan & Euler)](./46-specialized-advanced.md) | `Pattern` | `Boyer-Moore: O(N) time, O(1) space | Sweep Line: O(N log N) | Tarjan / Hierholzer: O(V + E)` |

import { DSATopic } from "@/types/dsa";

export const TOPICS_LEVEL_5_6: DSATopic[] = [
  // ============================================================================
  // LEVEL 5: GRAPHS, DAGS, SHORTEST PATHS, CONNECTIVITY & TRIES (29 - 33)
  // ============================================================================
  {
    id: "graphs",
    order: 29,
    title: "Graphs (Adjacency List, Matrix & Bipartite Coloring)",
    shortTitle: "Graphs",
    englishTerm: "Graph Representations (Adjacency List & Matrix)",
    kind: "data-structure",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["trees", "hash-table", "dfs", "bfs"],
    summary:
      "The universal data structure modeling networks of cities, flights, dependencies, and social connections via Vertices (`V`) and Edges (`E`). In 95% of interviews, your first step is converting an edge list `edges = [[u, v], ...]` into an **Adjacency List** (`adj[u] = [v1, v2, ...]`).",
    analogy:
      "Your phone's contact list (Adjacency List): under each person's name, you store only the friends they directly call—rather than carrying an 8-billion-by-8-billion spreadsheet of every person on Earth (Adjacency Matrix).",
    whenToUse: [
      "The input gives connection pairs `edges = [[u, v], ...]` (roads, flights, prerequisites, friendships).",
      "**Adjacency List (`defaultdict(list)`)**: Default choice for sparse graphs where `E` is much smaller than `V^2`.",
      "**Adjacency Matrix (`grid[u][v]`)**: Only when the graph is small and dense (`V <= 500`, such as Floyd-Warshall) or requires O(1) edge existence checks.",
    ],
    whenNotToUse: [
      "Never allocate a `V x V` Adjacency Matrix when `V = 10^5`: `10^5 x 10^5` is `10^10` cells (~40 GB of RAM) and immediately triggers `Memory Limit Exceeded`.",
    ],
    timeComplexity: {
      average: "Build Adjacency List: O(V + E) | Iterate neighbors of u: O(degree(u))",
      worst: "O(V + E)",
      note: "Always check whether edges are Directed (`u -> v` one way) or Undirected (`u <-> v` both ways).",
    },
    spaceComplexity: "O(V + E) for Adjacency List vs O(V^2) for Adjacency Matrix",
    constraintHint: "V, E <= 10^5 -> Adjacency List is mandatory",
    pythonTemplate: `from collections import defaultdict

def build_adjacency_list(
    n: int, edges: list[list[int]], directed: bool = False
) -> dict[int, list[int]]:
    """
    Step 0 of every Graph problem in LeetCode:
    Convert an edge list [[u, v], ...] into an Adjacency List.
    Time: O(V + E) | Space: O(V + E)
    """
    adj: dict[int, list[int]] = defaultdict(list)
    for u, v in edges:
        adj[u].append(v)
        if not directed:
            adj[v].append(u)
    return adj


def is_bipartite_coloring(n: int, edges: list[list[int]]) -> bool:
    """
    Classic Graph Pattern: 2-Coloring (Bipartite Graph Check).
    color[u] = 0 (uncolored), 1 (Blue), -1 (Red)
    """
    adj = build_adjacency_list(n, edges, directed=False)
    color = [0] * n

    def dfs(u: int, c: int) -> bool:
        color[u] = c
        for v in adj[u]:
            if color[v] == c:
                return False  # Conflict: two adjacent nodes share the same color
            if color[v] == 0 and not dfs(v, -c):
                return False
        return True

    for i in range(n):
        if color[i] == 0 and not dfs(i, 1):
            return False
    return True`,
    typescriptTemplate: `export function buildAdjacencyList(
  n: number,
  edges: number[][],
  directed = false
): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    if (!directed) {
      adj[v].push(u);
    }
  }
  return adj;
}`,
    leetcodeProblems: [
      {
        number: 785,
        title: "Is Graph Bipartite?",
        slug: "is-graph-bipartite",
        difficulty: "Medium",
        patternHint: "Color nodes alternating `1` and `-1` via BFS or DFS; if a neighbor already has your color, an odd cycle exists.",
      },
      {
        number: 841,
        title: "Keys and Rooms",
        slug: "keys-and-rooms",
        difficulty: "Medium",
        patternHint: "The input is already an Adjacency List; check if DFS/BFS from room 0 visits all N rooms.",
      },
      {
        number: 997,
        title: "Find the Town Judge",
        slug: "find-the-town-judge",
        difficulty: "Easy",
        patternHint: "Track `in_degree` and `out_degree`: the judge has `in_degree == N - 1` and `out_degree == 0`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Teach the 'Graph Translation Dictionary': how problems disguised as university courses, keys and rooms, alliances, or flights are all Graphs. Cover the 3 core properties (Directed vs Undirected, Weighted vs Unweighted, In-Degree vs Out-Degree) and the 2-Coloring Bipartite check.",
      keyTakeaways: [
        "LeetCode rarely gives you `GraphNode` objects: it gives an integer `n` and `edges = [[u, v], ...]`. Your first 5 lines always build the Adjacency List.",
        "In an undirected graph, always add BOTH `adj[u].append(v)` AND `adj[v].append(u)`.",
        "A graph is Bipartite (splittable into 2 teams with zero internal conflicts) if and only if it has no odd-length cycles.",
      ],
      stepByStepWalkthrough: [
        "Identify what the vertices `V` and edges `E` represent in the problem story.",
        "Ask: is the relationship one-way (Directed) or mutual (Undirected)? Does each edge have a cost (Weighted)?",
        "Build `adj` and wrap your traversal in `for i in range(n): if i not in visited:` in case the graph is disconnected.",
      ],
      interviewTraps: [
        "Starting DFS/BFS only from node `0` assuming the graph is a single connected component, missing isolated components.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Every Tree Is a Graph, Carry No Rules",
          visualCue: "A binary tree connecting its leaves and forming cycles until it transforms into a general graph network.",
          narration:
            "A Tree is simply a well-behaved graph with no cycles. The moment we allow any node to connect to any other node, we enter the world of Graphs—the structure modeling everything from Google Maps to package dependencies.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Adjacency Lists, In-Degree / Out-Degree, and 2-Coloring",
          visualCue: "Converting `edges = [[0,1], [1,2]]` into an `adj` list and coloring nodes red and blue.",
          narration:
            "Your automatic reflex upon seeing an edge list should be building an Adjacency List in five lines. From there, counting incoming arrows or 2-coloring a bipartite network becomes effortless.",
        },
      ],
    },
  },
  {
    id: "topological-sort-dag",
    order: 30,
    title: "Topological Sort & DAG Dynamic Programming",
    shortTitle: "Topological Sort & DAG",
    englishTerm: "Topological Sort (Kahn's Algorithm) & DAG Dynamic Programming",
    kind: "algorithm",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["graphs", "bfs", "dfs"],
    summary:
      "Linearly ordering the vertices of a **Directed Acyclic Graph (DAG)** so that for every directed edge `u -> v` (`u` is a prerequisite of `v`), `u` comes before `v`. Using **Kahn's Algorithm (BFS with `in_degree`)**, it also detects directed cycles and enables Dynamic Programming over DAGs.",
    analogy:
      "Planning your university degree curriculum: you cannot take 'Calculus II' before passing 'Calculus I'. You start by enrolling in all courses with **0 prerequisites** (`in_degree == 0`). Each time you finish a course, you cross it off as a requirement for downstream courses, unlocking new courses whose prerequisite count drops to 0.",
    whenToUse: [
      "The problem involves **prerequisites, task dependencies, build order**, recipes, or precedence rules (`Course Schedule I & II`, `Alien Dictionary`).",
      "You need to **detect a cycle in a directed graph** (if Kahn's algorithm finishes with `len(order) < N`, a cycle blocked the remaining nodes!).",
      "**DP on a DAG**: Computing the minimum time to finish parallel tasks or the longest path in an acyclic network (`Parallel Courses III`).",
    ],
    whenNotToUse: [
      "Topological ordering does not exist on undirected graphs or directed graphs containing a cycle (`A -> B -> A`).",
    ],
    timeComplexity: {
      average: "O(V + E)",
      worst: "O(V + E)",
      note: "Each node enters Kahn's queue at most once when its `in_degree` hits 0, and each edge is decremented once.",
    },
    spaceComplexity: "O(V + E) for `adj`, `in_degree`, and the `deque`",
    constraintHint: "Prerequisites, task ordering, directed cycle detection, or DAG paths with V, E <= 10^5",
    pythonTemplate: `from collections import deque

def topological_sort_kahn(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    """
    Kahn's Algorithm (BFS with In-Degrees).
    Returns a valid topological ordering, or [] if a directed cycle exists.
    Time: O(V + E) | Space: O(V + E)
    """
    adj: list[list[int]] = [[] for _ in range(num_courses)]
    in_degree = [0] * num_courses

    for course, prereq in prerequisites:
        adj[prereq].append(course)  # prereq -> course
        in_degree[course] += 1

    # 1. Enqueue all nodes with 0 pending prerequisites (in_degree == 0)
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    order: list[int] = []

    while queue:
        u = queue.popleft()
        order.append(u)
        # 2. Completing 'u' satisfies 1 prerequisite for each dependent 'v'
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    # If all courses were processed, no cycle exists; otherwise a cycle blocked the rest
    return order if len(order) == num_courses else []`,
    typescriptTemplate: `export function topologicalSortKahn(
  numCourses: number,
  prerequisites: number[][]
): number[] {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array<number>(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order: number[] = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }

  return order.length === numCourses ? order : [];
}`,
    leetcodeProblems: [
      {
        number: 207,
        title: "Course Schedule",
        slug: "course-schedule",
        difficulty: "Medium",
        patternHint: "Run Kahn's algorithm and return `len(order) == numCourses`.",
      },
      {
        number: 210,
        title: "Course Schedule II",
        slug: "course-schedule-ii",
        difficulty: "Medium",
        patternHint: "Return the `order` list produced by Kahn's queue (or `[]` if a cycle exists).",
      },
      {
        number: 2050,
        title: "Parallel Courses III",
        slug: "parallel-courses-iii",
        difficulty: "Hard",
        patternHint: "DP on a DAG during Kahn's BFS: `finish_time[v] = max(finish_time[v], finish_time[u] + time[v])`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Cover both Topological Sort (Kahn's Algorithm) and DAG Dynamic Programming: explain what a DAG (Directed Acyclic Graph) is, how Kahn's `in_degree` countdown resolves dependencies and catches cycles simultaneously, and why processing nodes in topological order lets you compute longest paths or critical project timelines in O(V + E).",
      keyTakeaways: [
        "DAG stands for Directed Acyclic Graph: directed arrows with zero cycles.",
        "Kahn's Algorithm tracks incoming arrows (`in_degree`): a node is ready to execute the exact moment its `in_degree` drops to 0.",
        "If Kahn's queue empties while `len(order) < V`, the remaining nodes are trapped in or downstream of a cycle.",
        "Processing nodes in Topological Order guarantees every predecessor `u` is finalized before `v` (enabling DP on DAGs).",
      ],
      stepByStepWalkthrough: [
        "Build the adjacency list `prereq -> course` and increment `in_degree[course] += 1`.",
        "Push all nodes with `in_degree[i] == 0` into a queue.",
        "Pop `u`, append to `order`, and decrement `in_degree[v] -= 1` for each neighbor `v`. If `in_degree[v] == 0`, enqueue `v`.",
        "Verify `len(order) == N`.",
      ],
      interviewTraps: [
        "Reversing the edge direction in `[course, prereq]` without matching `in_degree`, or forgetting to check `len(order) == num_courses` when a cycle `0 -> 1 -> 0` exists.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "What Is a DAG? The University Prerequisite Mental Model",
          visualCue: "Course dependency graph spotlighting nodes with `in_degree = 0`.",
          narration:
            "Whenever a problem mentions prerequisites, build order, or task dependencies, you are looking at a DAG—a Directed Acyclic Graph. And its signature algorithm is Kahn's Topological Sort.",
        },
        {
          timestamp: "01:45 - 05:00",
          sectionTitle: "Kahn's Algorithm: Ordering, Cycle Detection, and DP on DAGs",
          visualCue: "`in_degree` counters dropping to zero and propagating maximum completion times forward.",
          narration:
            "Kahn's algorithm accomplishes three goals at once: it produces a valid execution order, detects impossible cycles if nodes are left behind, and sets up the exact transition order for Dynamic Programming on DAGs.",
        },
      ],
    },
  },
  {
    id: "dijkstra",
    order: 31,
    title: "Dijkstra's Algorithm & Weighted Shortest Paths",
    shortTitle: "Dijkstra",
    englishTerm: "Dijkstra's Algorithm & Weighted Shortest Paths",
    kind: "algorithm",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["graphs", "bfs", "heaps"],
    summary:
      "Finding the **minimum-cost path** from a source to all other vertices in a graph with **non-negative edge weights** (`w >= 0`). It is literally BFS with the standard FIFO queue replaced by a **Min-Heap (Priority Queue)** ordered by cumulative distance.",
    analogy:
      "If BFS is a water wave expanding at equal speed through identical pipes, Dijkstra is water flowing through pipes of different lengths: water reaches whichever intersection has the smallest total pipe distance first. A Min-Heap tells us which intersection the water reaches next.",
    whenToUse: [
      "The problem asks for the **shortest, cheapest, fastest, or minimum-effort path** in a graph or grid where edges have positive costs (`w >= 0`).",
      "**0-1 BFS (Deque optimization)**: When edge weights are strictly `0` or `1`, push weight-`0` edges to the front (`appendleft`) and weight-`1` edges to the back (`append`) in O(V + E).",
      "**Bellman-Ford**: When **negative weights** exist or the path is constrained to at most `K` stops (`Cheapest Flights Within K Stops`).",
    ],
    whenNotToUse: [
      "NEVER use Dijkstra if the graph has NEGATIVE edge weights! Dijkstra assumes that once the minimum distance node is popped from the heap, adding future non-negative edges can never make a path cheaper.",
    ],
    timeComplexity: {
      average: "O((V + E) log V) using a Min-Heap",
      worst: "O(E log V)",
      note: "Including `if d > dist[u]: continue` upon popping from the heap lazily skips outdated heap entries in O(1).",
    },
    spaceComplexity: "O(V + E) for `adj`, `dist`, and the Min-Heap",
    constraintHint: "Cheapest/fastest path with non-negative weights w >= 0 and V, E <= 10^5",
    pythonTemplate: `import heapq

def dijkstra_shortest_path(
    n: int, adj: list[list[tuple[int, int]]], start: int
) -> list[float]:
    """
    Canonical Dijkstra Template with a Min-Heap.
    adj[u] holds pairs (neighbor_v, weight_w) with w >= 0.
    Time: O((V + E) log V) | Space: O(V)
    """
    dist = [float("inf")] * n
    dist[start] = 0
    # Min-Heap stores tuples: (cumulative_distance, node)
    pq: list[tuple[float, int]] = [(0, start)]

    while pq:
        d, u = heapq.heappop(pq)

        # CRITICAL GUARD: Skip stale heap entries worse than our best known distance
        if d > dist[u]:
            continue

        # Edge Relaxation
        for v, weight in adj[u]:
            new_dist = d + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))

    return dist`,
    typescriptTemplate: `export function networkDelayDijkstra(
  times: number[][],
  n: number,
  k: number
): number {
  const adj: Array<Array<[number, number]>> = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) {
    adj[u].push([v, w]);
  }

  const dist = new Array<number>(n + 1).fill(Infinity);
  dist[k] = 0;

  const pq: Array<[number, number]> = [[0, k]];

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift()!;
    if (d > dist[u]) continue;

    for (const [v, w] of adj[u]) {
      if (d + w < dist[v]) {
        dist[v] = d + w;
        pq.push([dist[v], v]);
      }
    }
  }

  let maxWait = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxWait = Math.max(maxWait, dist[i]);
  }
  return maxWait;
}`,
    leetcodeProblems: [
      {
        number: 743,
        title: "Network Delay Time",
        slug: "network-delay-time",
        difficulty: "Medium",
        patternHint: "Direct Dijkstra from source `k`; answer is `max(dist[1..n])` (or `-1` if any node is `inf`).",
      },
      {
        number: 1631,
        title: "Path With Minimum Effort",
        slug: "path-with-minimum-effort",
        difficulty: "Medium",
        patternHint: "Minimax Dijkstra on a 2D grid where path cost is the maximum step height difference: `new_effort = max(d, abs(h1 - h2))`.",
      },
      {
        number: 787,
        title: "Cheapest Flights Within K Stops",
        slug: "cheapest-flights-within-k-stops",
        difficulty: "Medium",
        patternHint: "K-stop constrained shortest path (Bellman-Ford in K+1 rounds or Dijkstra tracking minimum stops).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Show that Dijkstra is NOT a complex algorithm to memorize: it is literally BFS where `deque` is replaced by `heapq` and `visited` is replaced by a `dist` array initialized to infinity. Highlight the lazy deletion check `if d > dist[u]: continue` and how replacing `+` with `max()` solves minimax bottleneck problems like 'Path With Minimum Effort'.",
      keyTakeaways: [
        "Always put cumulative distance FIRST in the heap tuple `(dist, node)` so `heapq` orders by smallest distance.",
        "Updating `if d + w < dist[v]: dist[v] = d + w` is called Edge Relaxation.",
        "The guard `if d > dist[u]: continue` skips outdated heap entries in O(1) without needing a custom `decrease_key` heap.",
      ],
      stepByStepWalkthrough: [
        "Initialize `dist = [inf] * n`, set `dist[start] = 0`, and push `(0, start)` into the Min-Heap.",
        "Pop `(d, u)`. If `d > dist[u]`, `continue`.",
        "If `u == target` (when searching for a single destination), return `d` immediately.",
        "For each neighbor `(v, w)`, if `d + w < dist[v]`, update `dist[v]` and push `(dist[v], v)`.",
      ],
      interviewTraps: [
        "Pushing `(node, distance)` instead of `(distance, node)` into Python's `heapq`—which sorts by node ID instead of path cost!",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "From BFS to Dijkstra: When Roads Have Different Tolls",
          visualCue: "A graph where a 3-edge path of weight 1 beats a direct 1-edge path of weight 10.",
          narration:
            "In BFS we assumed every edge costs 1. In the real world, a direct flight might cost $500 while two connecting flights cost $150 total. Swapping the FIFO Queue for a Min-Heap gives us Dijkstra's Algorithm.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Edge Relaxation, Lazy Deletion (`d > dist[u]`), and Minimax Dijkstra",
          visualCue: "Animation of the `dist[]` table updating and the Min-Heap skipping stale entries.",
          narration:
            "Beyond summing road lengths, Dijkstra also solves minimax bottleneck paths—like finding the route with the smallest maximum cliff jump—simply by replacing `d + w` with `max(d, w)`.",
        },
      ],
    },
  },
  {
    id: "disjoint-set-union",
    order: 32,
    title: "Disjoint Set Union (DSU / Union-Find & Kruskal MST)",
    shortTitle: "Disjoint Set (Union-Find)",
    englishTerm: "Disjoint Set Union (DSU / Union-Find) & Minimum Spanning Tree",
    kind: "hybrid",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["graphs", "trees"],
    summary:
      "An ultra-fast data structure for tracking dynamic connected components via two near-constant time $O(\alpha(N)) \approx O(1)$ operations: **`find(x)`** (who is the root representative of `x`'s group?) and **`union(x, y)`** (merge the groups of `x` and `y`).",
    analogy:
      "Startups merging into larger corporations: initially everyone is their own CEO (`parent[i] = i`). When two companies merge (`union`), the CEO of the smaller company reports to the CEO of the larger company (**Union by Size**). And whenever an employee asks who the ultimate CEO is (`find`), they update their direct manager pointer straight to the top CEO (**Path Compression**).",
    whenToUse: [
      "Edges arrive dynamically and you need to check if two nodes are already connected, count remaining components, or find the first edge that creates a cycle (`Redundant Connection`, `Accounts Merge`).",
      "**Kruskal's Minimum Spanning Tree (MST)**: Sort all edges from cheapest to most expensive and greedily connect them via `union(u, v)` if they are not already in the same component (`Min Cost to Connect All Points`).",
    ],
    whenNotToUse: [
      "When edges are dynamically **REMOVED** (disconnected): DSU is built for merging sets, not splitting them (unless you process queries offline in reverse time).",
    ],
    timeComplexity: {
      average: "O(α(N)) ≈ O(1) per `find` or `union` call",
      worst: "O(α(N)) where α is the Inverse Ackermann function (<= 4 for any practical N)",
      note: "Combining Path Compression + Union by Size achieves near-constant O(1) performance.",
    },
    spaceComplexity: "O(N) for the `parent` and `size` arrays",
    constraintHint: "Dynamic connectivity, merging accounts/groups, undirected cycle detection, or Kruskal MST",
    pythonTemplate: `class UnionFind:
    """
    Production Disjoint Set Union (DSU) Template in 15 lines.
    Includes Path Compression and Union by Size.
    Time per operation: O(alpha(N)) ≈ O(1) | Space: O(N)
    """
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.size = [1] * n
        self.components = n

    def find(self, x: int) -> int:
        # Path Compression: point directly to the root representative
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a: int, b: int) -> bool:
        root_a, root_b = self.find(a), self.find(b)
        if root_a == root_b:
            return False  # Already in the same set! (Redundant edge / Cycle)

        # Union by Size: attach smaller tree under larger tree
        if self.size[root_a] < self.size[root_b]:
            root_a, root_b = root_b, root_a
        self.parent[root_b] = root_a
        self.size[root_a] += self.size[root_b]
        self.components -= 1
        return True`,
    typescriptTemplate: `export class UnionFind {
  parent: number[];
  size: number[];
  components: number;

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array<number>(n).fill(1);
    this.components = n;
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(a: number, b: number): boolean {
    let rootA = this.find(a);
    let rootB = this.find(b);
    if (rootA === rootB) return false;

    if (this.size[rootA] < this.size[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }
    this.parent[rootB] = rootA;
    this.size[rootA] += this.size[rootB];
    this.components--;
    return true;
  }
}`,
    leetcodeProblems: [
      {
        number: 684,
        title: "Redundant Connection",
        slug: "redundant-connection",
        difficulty: "Medium",
        patternHint: "The first edge `[u, v]` where `uf.union(u, v)` returns `False` is the exact edge that completes the cycle.",
      },
      {
        number: 721,
        title: "Accounts Merge",
        slug: "accounts-merge",
        difficulty: "Medium",
        patternHint: "Union all accounts that share at least one common email address.",
      },
      {
        number: 1584,
        title: "Min Cost to Connect All Points",
        slug: "min-cost-to-connect-all-points",
        difficulty: "Medium",
        patternHint: "Kruskal's MST: sort all pairs by Manhattan distance and add the `N - 1` edges where `union(u, v)` returns `True`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Show why Disjoint Set Union (Union-Find) has the highest 'power-to-lines-of-code' ratio in computer science. Visually explain Path Compression and Union by Size, and show how `union(u, v)` returning `False` immediately detects undirected cycles and powers Kruskal's Minimum Spanning Tree.",
      keyTakeaways: [
        "Initially every node is its own parent (`parent[i] = i`) and there are `N` disjoint components.",
        "`Path Compression` (`self.parent[x] = self.find(self.parent[x])`) flattens trees to height 1.",
        "Every successful `union(u, v)` decreases the total number of connected components by 1 (`self.components -= 1`).",
      ],
      stepByStepWalkthrough: [
        "Instantiate `uf = UnionFind(n)`.",
        "For each edge `(u, v)`, call `uf.union(u, v)`.",
        "To check if `x` and `y` are in the same component, compare `uf.find(x) == uf.find(y)` (never compare `uf.parent[x] == uf.parent[y]` directly).",
      ],
      interviewTraps: [
        "Comparing `uf.parent[x] == uf.parent[y]` instead of `uf.find(x) == uf.find(y)`—`parent[x]` might still point to an intermediate leader if `find(x)` has not been called since the last merge.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Merging Components in O(1): What Is Union-Find?",
          visualCue: "Nodes grouping under a leader and flattening their pointers directly to the root via Path Compression.",
          narration:
            "Imagine a hundred thousand cities where roads are built one by one, and you are asked after every road whether city A can reach city B. Running DFS every time is way too slow. Union-Find answers that question in practically O(1) time.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Cycle Detection and Kruskal's Minimum Spanning Tree (MST)",
          visualCue: "Edges sorted by weight merging via Union-Find and skipping edges whose endpoints already share a root.",
          narration:
            "If you try to union two nodes that already report to the same root CEO, you just found a cycle. Sort all edges from cheapest to most expensive and skip cycles, and you have Kruskal's Minimum Spanning Tree algorithm.",
        },
      ],
    },
  },
  {
    id: "tries",
    order: 33,
    title: "Tries / Prefix Trees",
    shortTitle: "Tries (Prefix Tree)",
    englishTerm: "Tries / Prefix Trees & Bitwise Tries",
    kind: "hybrid",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["trees", "hash-table", "strings"],
    summary:
      "A tree specialized for string (or bit) dictionaries where each edge represents a character and words share common prefix paths. Searches for a word or checks if any word starts with prefix `P` in $O(|P|)$ time—independent of how many thousands of words are in the dictionary.",
    analogy:
      "Your phone's search autocomplete: when you type `A -> L -> G`, it does not scan 500,000 dictionary words one by one—it walks 3 steps down the `A`, `L`, and `G` branches of a tree, and everything hanging below that node is a word starting with `ALG` (`Algorithm`, `Algebra`).",
    whenToUse: [
      "Autocomplete, **prefix matching** (`startsWith`), spell checkers, or wildcard word search (`.`).",
      "Searching for many dictionary words simultaneously on a 2D letter board (`Word Search II`: a Trie prunes dead-end board paths immediately).",
      "**Bitwise Trie (0/1 Binary Trie)**: Finding the pair of numbers in an array that maximizes `a XOR b` (`Maximum XOR of Two Numbers in an Array`).",
    ],
    whenNotToUse: [
      "If you only need exact full-word lookups without prefix queries (a standard `Hash Set` of strings is simpler and faster for exact matches).",
    ],
    timeComplexity: {
      average: "Insert / Search / StartsWith: O(L) where L is word length",
      worst: "O(L)",
      note: "Lookup time depends ONLY on the length L of the query word, not the number of words N in the dictionary.",
    },
    spaceComplexity: "O(Total characters inserted) sharing common prefixes",
    constraintHint: "Prefix queries startsWith, multi-word board search, or Maximum XOR",
    pythonTemplate: `class TrieNode:
    def __init__(self):
        self.children: dict[str, TrieNode] = {}
        self.is_end: bool = False


class Trie:
    """
    Clean Standard Trie (Prefix Tree) Implementation.
    Time per operation: O(L) where L = len(word).
    """
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find_node(prefix) is not None

    def _find_node(self, prefix: str) -> TrieNode | None:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return None
            curr = curr.children[ch]
        return curr`,
    typescriptTemplate: `class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        curr.children.set(ch, new TrieNode());
      }
      curr = curr.children.get(ch)!;
    }
    curr.isEnd = true;
  }

  search(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  private findNode(prefix: string): TrieNode | null {
    let curr = this.root;
    for (const ch of prefix) {
      const next = curr.children.get(ch);
      if (!next) return null;
      curr = next;
    }
    return curr;
  }
}`,
    leetcodeProblems: [
      {
        number: 208,
        title: "Implement Trie (Prefix Tree)",
        slug: "implement-trie-prefix-tree",
        difficulty: "Medium",
        patternHint: "Core TrieNode with `children = {}` and boolean `is_end` flag.",
      },
      {
        number: 211,
        title: "Design Add and Search Words Data Structure",
        slug: "design-add-and-search-words-data-structure",
        difficulty: "Medium",
        patternHint: "When the current character is `'.'`, branch recursively across all `curr.children.values()`.",
      },
      {
        number: 212,
        title: "Word Search II",
        slug: "word-search-ii",
        difficulty: "Hard",
        patternHint: "Insert all target words into a Trie and walk the 2D board and the Trie simultaneously.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how a Trie merges shared prefixes across thousands of words into a single tree and why the `is_end` boolean flag is essential to distinguish the prefix `'app'` from the complete word `'apple'`. Walk through 'Word Search II' to show how guiding board DFS with a Trie prunes millions of dead branches.",
      keyTakeaways: [
        "The only difference between `search(word)` and `startsWith(prefix)` is checking `node.is_end == True` at the final character.",
        "In grid + dictionary problems (`Word Search II`), inserting the dictionary into a Trie lets a single board DFS match all words at once.",
        "A Bitwise Trie inserts 32-bit integers from most-significant bit to least-significant bit to greedily pick opposite bits for Maximum XOR.",
      ],
      stepByStepWalkthrough: [
        "Define `TrieNode` with a `children` map and `is_end = False`.",
        "To insert, walk character by character creating missing nodes and set `curr.is_end = True` at the end.",
        "Write a helper `_find_node(prefix)` shared by both `search` and `startsWith`.",
      ],
      interviewTraps: [
        "Forgetting `is_end`: after inserting `'apple'`, `search('app')` would falsely return `True` if you do not mark word endings.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "How Autocomplete Runs in O(Word Length)",
          visualCue: "Words 'CAT', 'CAR', 'CARD' sharing the C -> A branch in a tree.",
          narration:
            "If you have a million words and want to find all words starting with 'PRO', a Hash Set cannot help because it only hashes complete strings. A Trie organizes words character by character so every shared prefix walks the exact same path.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "The Trie + Backtracking Combo in Word Search II",
          visualCue: "A 2D letter board immediately pruning paths whose 2-letter prefix does not exist in the Trie.",
          narration:
            "When you pair a Trie with 2D grid DFS, the moment a board path forms 'XZ' and no 'XZ' branch exists in your Trie, you prune the entire search branch on the spot.",
        },
      ],
    },
  },

  // ============================================================================
  // LEVEL 6: OPTIMIZATION, GREEDY & DYNAMIC PROGRAMMING (34 - 37)
  // ============================================================================
  {
    id: "greedy",
    order: 34,
    title: "Greedy Algorithms",
    shortTitle: "Greedy",
    englishTerm: "Greedy Algorithms",
    kind: "algorithm",
    level: 6,
    difficulty: "Intermediate",
    branchCategory: "dp-greedy",
    prerequisites: ["sorting-intervals", "heaps"],
    summary:
      "Making the locally optimal choice at each step without looking back or exploring alternative branches—when the problem satisfies the greedy choice property, this leads directly to the global optimum in O(N) or O(N log N) time.",
    analogy:
      "Fitting the maximum number of meetings into your day: the provably optimal greedy rule is always picking the meeting that **finishes earliest**, freeing up your room as soon as possible for future meetings.",
    whenToUse: [
      "Reachability and jump problems (`Jump Game I & II`: tracking `max_reach = max(max_reach, i + nums[i])`).",
      "**Interval Scheduling**: Selecting the maximum number of non-overlapping intervals by sorting by **END time (`x[1]`)**.",
      "Greedy pairing after sorting (`Boats to Save People`, `Gas Station`, `Candy`, `Partition Labels`).",
    ],
    whenNotToUse: [
      "When a greedy early choice blocks a much better future combination (e.g., `0/1 Knapsack` or `Coin Change` with coins `[1, 3, 4]` for target `6`, where greedy picks `4+1+1` (3 coins) instead of `3+3` (2 coins)). When greedy fails a counterexample, use **Dynamic Programming**.",
    ],
    timeComplexity: {
      average: "O(N) single scan | O(N log N) when sorting first",
      worst: "O(N log N)",
      note: "Always test your greedy hypothesis against a small 3-element counterexample before coding.",
    },
    spaceComplexity: "O(1) auxiliary space",
    constraintHint: "Optimization with N <= 10^5 where the greedy exchange property holds",
    pythonTemplate: `def can_jump_greedy(nums: list[int]) -> bool:
    """
    Greedy Maximum Reach Pattern (Jump Game).
    Instead of O(N^2) DP over all jumps, track the furthest index reachable so far.
    Time: O(N) | Space: O(1)
    """
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False  # Index 'i' is unreachable!
        max_reach = max(max_reach, i + jump)
    return True


def max_non_overlapping_intervals(intervals: list[list[int]]) -> int:
    """
    Greedy Interval Scheduling: Sort by END time (x[1]), never start time!
    """
    intervals.sort(key=lambda x: x[1])
    count = 0
    last_end = float("-inf")
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count`,
    typescriptTemplate: `export function canJumpGreedy(nums: number[]): boolean {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
    leetcodeProblems: [
      {
        number: 55,
        title: "Jump Game",
        slug: "jump-game",
        difficulty: "Medium",
        patternHint: "Track the furthest reachable index `max_reach = max(max_reach, i + nums[i])`.",
      },
      {
        number: 134,
        title: "Gas Station",
        slug: "gas-station",
        difficulty: "Medium",
        patternHint: "If `sum(gas) >= sum(cost)`, a unique start exists; whenever `tank < 0` at `i`, reset start to `i + 1`.",
      },
      {
        number: 763,
        title: "Partition Labels",
        slug: "partition-labels",
        difficulty: "Medium",
        patternHint: "Precompute the last index of each character and extend the current partition end to `max(end, last_pos[ch])`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Contrast Greedy with Dynamic Programming: in DP we distrust single choices and cache all subproblems; in Greedy we prove a local rule works and never look back. Show how to test in 30 seconds whether a problem is Greedy or DP by trying to construct a small counterexample.",
      keyTakeaways: [
        "For maximum non-overlapping intervals, sorting by END time (`x[1]`) is provably optimal; sorting by start time fails when an early meeting lasts all day.",
        "In `Jump Game` and `Gas Station`, tracking a running frontier eliminates entire ranges in a single O(N) pass.",
      ],
      stepByStepWalkthrough: [
        "Formulate the candidate greedy rule (e.g., earliest finish time, furthest reach, largest ratio).",
        "Try to break it with a 3-element counterexample. If no counterexample exists, code it in O(N) or O(N log N).",
      ],
      interviewTraps: [
        "Applying Greedy to `Coin Change` with arbitrary denominations or `House Robber`, where picking the largest immediate value blocks two neighbors that sum to more.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Greedy vs DP: When Can You Trust a Local Choice?",
          visualCue: "A climber picking the steepest immediate step vs a map showing all paths.",
          narration:
            "A Greedy algorithm makes the best decision right now and never looks in the rearview mirror. When the greedy exchange property holds, it turns problems that look like Dynamic Programming into a simple O(N) scan with O(1) memory.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Jump Game, Gas Station, and Sorting by End Time",
          visualCue: "Animation of `max_reach` advancing like a wave across the cells of Jump Game.",
          narration:
            "In Jump Game, we do not care which exact sequence of jumps we took—we only care about the furthest index reachable so far.",
        },
      ],
    },
  },
  {
    id: "memoization",
    order: 35,
    title: "Memoization (Top-Down Dynamic Programming)",
    shortTitle: "Memoization (Top-Down DP)",
    englishTerm: "Memoization / Top-Down Dynamic Programming",
    kind: "algorithm",
    level: 6,
    difficulty: "Intermediate",
    branchCategory: "dp-greedy",
    prerequisites: ["divide-and-conquer", "trees", "hash-table", "backtracking"],
    summary:
      "The most natural gateway into Dynamic Programming: write the recursive decision tree first (just like DFS/Backtracking) and attach a **cache (`memo` dict or `@cache`)** so every unique subproblem state is computed **only once** and returned in O(1) thereafter.",
    analogy:
      "If someone asks you `347 x 89`, you work it out on paper in 30 seconds and write the answer on a sticky note. If they ask `347 x 89` again five minutes later, you do not multiply again—you read the sticky note in half a second.",
    whenToUse: [
      "The problem asks for the **maximum, minimum, or total number of ways** to do something, and drawing the recursion tree reveals **identical states reached via different paths** (Overlapping Subproblems).",
      "When not all states in the state space are reachable, or when topological iteration order is tricky to write bottom-up.",
      "As Step 1 of any DP problem in an interview before (optionally) converting to a bottom-up table.",
    ],
    whenNotToUse: [
      "If recursion depth exceeds stack limits or you need O(1) rolling-row space optimization (convert your Memoization recurrence into Bottom-Up DP).",
    ],
    timeComplexity: {
      average: "O(Number of Unique States * Work per State Transition)",
      worst: "Polynomial (collapses O(2^N) into O(N) or O(N^2))",
      note: "Universal formula for Memoization time complexity: `(Total unique combinations of function arguments) * (Work inside 1 call excluding recursive calls)`.",
    },
    spaceComplexity: "O(Unique States) in `memo` + O(Recursion Depth) on Call Stack",
    constraintHint: "Recursive choices with overlapping subproblems (N <= 10^3 for 2D, N <= 10^5 for 1D)",
    pythonTemplate: `from functools import cache

def house_robber_memo(nums: list[int]) -> int:
    """
    Universal Memoization (Top-Down DP) Template.
    At house 'i' we have 2 choices:
      1) Skip house 'i' -> dfs(i + 1)
      2) Rob house 'i'  -> nums[i] + dfs(i + 2)
    Without @cache: O(2^N) | With @cache: O(N) time and O(N) space.
    """
    n = len(nums)

    @cache
    def dfs(i: int) -> int:
        if i >= n:
            return 0
        skip = dfs(i + 1)
        take = nums[i] + dfs(i + 2)
        return max(skip, take)

    return dfs(0)`,
    typescriptTemplate: `export function houseRobberMemo(nums: number[]): number {
  const memo = new Map<number, number>();

  function dfs(i: number): number {
    if (i >= nums.length) return 0;
    if (memo.has(i)) return memo.get(i)!;

    const ans = Math.max(dfs(i + 1), nums[i] + dfs(i + 2));
    memo.set(i, ans);
    return ans;
  }

  return dfs(0);
}`,
    leetcodeProblems: [
      {
        number: 70,
        title: "Climbing Stairs",
        slug: "climbing-stairs",
        difficulty: "Easy",
        patternHint: "`dfs(i) = dfs(i + 1) + dfs(i + 2)` with `memo` prunes the Fibonacci tree from O(2^N) down to O(N).",
      },
      {
        number: 198,
        title: "House Robber",
        slug: "house-robber",
        difficulty: "Medium",
        patternHint: "Binary choice at each index: `max(dfs(i + 1), nums[i] + dfs(i + 2))`.",
      },
      {
        number: 494,
        title: "Target Sum",
        slug: "target-sum",
        difficulty: "Medium",
        patternHint: "2-parameter state `dfs(i, current_sum)` cached by tuple `(i, current_sum)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Remove all fear of Dynamic Programming: explain that Memoization is simply a standard recursive `dfs` function with a sticky-note cache (`memo` or `@cache` in Python). Visually show how the exponential tree of `Climbing Stairs` or `House Robber` collapses into a linear O(N) chain.",
      keyTakeaways: [
        "Core equation: `Backtracking (recursive brute force) + State Cache = Memoization (Top-Down DP)`.",
        "The 'State' consists strictly of the parameters that change across recursive calls (e.g., `i`, or `(i, remaining_capacity)`).",
        "In Python 3.9+, `@functools.cache` turns any pure recursive function into Top-Down DP in a single line.",
      ],
      stepByStepWalkthrough: [
        "Identify the choices at each step (e.g., take or skip element `i`) and the minimal variables that define the State.",
        "Write the recursive `dfs(state)` function with its base cases.",
        "Add a `memo` dictionary (or `@cache`): if `state in memo`, return `memo[state]` immediately.",
      ],
      interviewTraps: [
        "Passing mutable lists or redundant accumulators as arguments to `dfs(...)`, either causing `unhashable type` errors or blowing up the number of states.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "Demystifying DP: It Is Just Recursion with a Notepad",
          visualCue: "Fibonacci tree where duplicate subtrees light up green and return in O(1) from a lookup table.",
          narration:
            "If you already understand tree recursion and Backtracking, you already know 90% of Dynamic Programming. The only flaw of pure recursion is amnesia: it solves the exact same subproblem thousands of times. Memoization hands it a notepad.",
        },
        {
          timestamp: "02:00 - 04:45",
          sectionTitle: "Defining the State and Computing Big-O in 5 Seconds",
          visualCue: "On-screen formula: Time Complexity = (# of Unique States) x (Work per Transition).",
          narration:
            "To find the time complexity of any Memoization function, count how many possible values your function parameters can take and multiply by the work inside a single call.",
        },
      ],
    },
  },
  {
    id: "dynamic-programming",
    order: 36,
    title: "Dynamic Programming (Bottom-Up Tabulation & Classic Patterns)",
    shortTitle: "Dynamic Programming",
    englishTerm: "Bottom-Up Dynamic Programming (1D, 2D, Knapsack, LCS, LIS)",
    kind: "algorithm",
    level: 6,
    difficulty: "Advanced",
    branchCategory: "dp-greedy",
    prerequisites: ["memoization", "arrays", "matrices-grids"],
    summary:
      "Building the optimal solution from the ground up (Bottom-Up) by iteratively filling a `dp` table from base cases up to `N`—eliminating recursion overhead and enabling **space optimization** (shrinking an `O(N)` table to 2 variables `O(1)`, or an `O(N x M)` grid to a single row `O(M)`).",
    analogy:
      "Climbing a staircase where each step is built from the two steps directly beneath it. Because step #10 only depends on step #9 and step #8, you only ever need to remember the last two steps in memory.",
    whenToUse: [
      "**1D Linear DP**: `House Robber`, `Coin Change`, `Decode Ways`, `Longest Increasing Subsequence (LIS)`.",
      "**Knapsack DP (0/1 & Unbounded)**: `Partition Equal Subset Sum`, `Coin Change I & II`.",
      "**2D Grid or Two-String DP**: `Unique Paths`, `Minimum Path Sum`, `Longest Common Subsequence (LCS)`, `Edit Distance`.",
      "**Interval DP**: `Burst Balloons`, `Longest Palindromic Subsequence`.",
    ],
    whenNotToUse: [
      "When the problem requires returning ALL actual combinations/configurations and the output size itself is exponential (use Backtracking).",
    ],
    timeComplexity: {
      average: "1D: O(N) or O(N * K) | 2D / Knapsack / LCS: O(N * M)",
      worst: "Polynomial matching the dimensions of the `dp` table",
      note: "Whenever `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, space can be reduced to O(1).",
    },
    spaceComplexity: "O(N) or O(N * M), optimizable to O(1) or O(M) with a Rolling Array",
    constraintHint: "'Min/Max/Number of ways' with overlapping subproblems and N <= 10^3 - 10^5",
    pythonTemplate: `def coin_change_bottom_up(coins: list[int], amount: int) -> int:
    """
    Pattern 1: Unbounded Knapsack (Coin Change) in 1D DP.
    dp[a] = minimum coins required to make exact amount 'a'.
    Time: O(amount * len(coins)) | Space: O(amount)
    """
    INF = amount + 1
    dp = [INF] * (amount + 1)
    dp[0] = 0  # Base case: 0 coins needed to make amount 0

    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])

    return dp[amount] if dp[amount] != INF else -1


def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    Pattern 2: 2D DP on Two Strings (LCS).
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
    typescriptTemplate: `export function coinChangeBottomUp(coins: number[], amount: number): number {
  const INF = amount + 1;
  const dp = new Array<number>(amount + 1).fill(INF);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) {
        dp[a] = Math.min(dp[a], 1 + dp[a - c]);
      }
    }
  }
  return dp[amount] === INF ? -1 : dp[amount];
}`,
    leetcodeProblems: [
      {
        number: 322,
        title: "Coin Change",
        slug: "coin-change",
        difficulty: "Medium",
        patternHint: "`dp[a] = min(dp[a], 1 + dp[a - coin])` starting from `dp[0] = 0`.",
      },
      {
        number: 1143,
        title: "Longest Common Subsequence",
        slug: "longest-common-subsequence",
        difficulty: "Medium",
        patternHint: "`(M+1) x (N+1)` table: if chars match take `1 + diagonal`; otherwise `max(top, left)`.",
      },
      {
        number: 300,
        title: "Longest Increasing Subsequence",
        slug: "longest-increasing-subsequence",
        difficulty: "Medium",
        patternHint: "Classic O(N^2) DP `dp[i] = max(1 + dp[j])` or O(N log N) Patience Sorting with Binary Search.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Structure this episode as the field guide to the 4 classic Bottom-Up DP families: 1) 1D Linear DP (`House Robber`), 2) Knapsack DP (`Coin Change`, `Partition Equal Subset Sum`), 3) Two-String Alignment (`Longest Common Subsequence`, `Edit Distance`), and 4) LIS (`Longest Increasing Subsequence`). Teach the 4-step framework: State Definition, Base Case, Recurrence Relation, and Iteration Order.",
      keyTakeaways: [
        "Before writing a single loop, write a comment stating the exact plain-English meaning of `dp[i]` or `dp[i][j]`.",
        "In 0/1 Knapsack (each item used at most once), optimizing to a 1D array requires iterating capacities **BACKWARD** (`for w in range(target, num - 1, -1)`) so an item is not reused multiple times.",
        "In two-string DP (`LCS`, `Edit Distance`), padding an extra row 0 and column 0 for the empty string eliminates boundary checks.",
      ],
      stepByStepWalkthrough: [
        "1. Define the exact meaning of `dp[i]`.",
        "2. Initialize the table with the identity value (`0` for max/count, `inf` for min) and set base cases (`dp[0]`).",
        "3. Write the recurrence transition from already-computed smaller states.",
        "4. (Bonus) If row `i` only reads row `i - 1`, compress space to two rows `prev` and `curr`.",
      ],
      interviewTraps: [
        "In 1D 0/1 Knapsack, iterating capacity left-to-right instead of right-to-left—which accidentally turns 0/1 Knapsack into Unbounded Knapsack (reusing the same item multiple times).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "From Top-Down to Bottom-Up: Building from the Foundation",
          visualCue: "Transforming recursive Memoization arrows into a table filling cleanly from left to right.",
          narration:
            "We already saw how Memoization solves DP top-down. Now we take the pro step: filling the table directly from base cases upward, removing recursion overhead and unlocking O(1) rolling-space optimization.",
        },
        {
          timestamp: "02:00 - 05:30",
          sectionTitle: "The 4 Classic Families: 1D Linear, Knapsack, LCS, and LIS",
          visualCue: "Four quadrants illustrating the dependency arrows of each DP family.",
          narration:
            "Ninety percent of interview DP problems belong to one of four families: 1D sequences, Knapsack subset sums like Coin Change, two-string alignment like LCS, or Longest Increasing Subsequence.",
        },
      ],
    },
  },
  {
    id: "bitmask-dp",
    order: 37,
    title: "Bitmask DP (Subset States & Traveling Salesperson)",
    shortTitle: "Bitmask DP",
    englishTerm: "Bitmask Dynamic Programming (TSP & Subset States)",
    kind: "algorithm",
    level: 6,
    difficulty: "Expert",
    branchCategory: "dp-greedy",
    prerequisites: ["dynamic-programming", "memoization", "backtracking"],
    summary:
      "Encoding a subset of visited or used elements as the `0` and `1` bits of a single integer (`mask` from `0` to `2^N - 1`). Allows caching states of the form *'which elements have I already used?'*, collapsing factorial $O(N!)$ permutation searches (like the Traveling Salesperson Problem - TSP) down to $O(N^2 \cdot 2^N)$.",
    analogy:
      "A wall panel of 15 light switches: instead of carrying a written list of which rooms have their lights on, you snapshot the 15 switches as a single binary number (`010110...`). That single integer instantly tells you which rooms have been visited and which remain.",
    whenToUse: [
      "The problem constraint is a dead giveaway: **`N <= 15` or `N <= 20`** (too large for $O(N!)$ which caps at $N \le 11$, but ideal for $2^{20} \approx 10^6$).",
      "Assigning tasks to workers, matching pairs, or finding the optimal tour visiting all nodes (`Traveling Salesperson Problem - TSP`, `Shortest Path Visiting All Nodes`).",
    ],
    whenNotToUse: [
      "When $N > 22$: $2^{25}$ exceeds 33 million states and will blow past time and memory limits.",
    ],
    timeComplexity: {
      average: "O(N * 2^N) or O(N^2 * 2^N)",
      worst: "O(N^2 * 2^N)",
      note: "For N = 15, `15! = 1.3 x 10^12` (TLE), whereas `15^2 * 2^15 = 7.3 x 10^6` (runs in ~50ms).",
    },
    spaceComplexity: "O(N * 2^N) for the `(u, mask)` state table",
    constraintHint: "Unmistakable signal: 12 <= N <= 20 and state depends on the subset of items used",
    pythonTemplate: `from functools import cache

def tsp_bitmask_dp(dist: list[list[int]]) -> int:
    """
    Canonical Bitmask DP Template (Traveling Salesperson Problem / TSP).
    mask: N-bit integer where bit 'i' is 1 if city 'i' has been visited.
    all_visited = (1 << n) - 1   (e.g., for n=4, binary 1111 = 15)
    Time: O(N^2 * 2^N) | Space: O(N * 2^N)
    """
    n = len(dist)
    all_visited = (1 << n) - 1

    @cache
    def dfs(u: int, mask: int) -> int:
        # Base case: all N bits are set to 1
        if mask == all_visited:
            return dist[u][0]  # Return to origin (or 0 if open path)

        best = float("inf")
        for v in range(n):
            # Check if bit 'v' is 0 (city 'v' not visited yet)
            if not (mask & (1 << v)):
                # Turn on bit 'v' using bitwise OR: mask | (1 << v)
                best = min(best, dist[u][v] + dfs(v, mask | (1 << v)))
        return best

    # Start at city 0 with bit 0 turned on (mask = 1)
    return dfs(0, 1)`,
    typescriptTemplate: `export function tspBitmaskDP(dist: number[][]): number {
  const n = dist.length;
  const allVisited = (1 << n) - 1;
  const memo: number[][] = Array.from({ length: n }, () =>
    new Array<number>(1 << n).fill(-1)
  );

  function dfs(u: number, mask: number): number {
    if (mask === allVisited) return dist[u][0];
    if (memo[u][mask] !== -1) return memo[u][mask];

    let best = Infinity;
    for (let v = 0; v < n; v++) {
      if ((mask & (1 << v)) === 0) {
        best = Math.min(best, dist[u][v] + dfs(v, mask | (1 << v)));
      }
    }
    memo[u][mask] = best;
    return best;
  }

  return dfs(0, 1);
}`,
    leetcodeProblems: [
      {
        number: 847,
        title: "Shortest Path Visiting All Nodes",
        slug: "shortest-path-visiting-all-nodes",
        difficulty: "Hard",
        patternHint: "BFS/DP where state is `(current_node, visited_mask)` until `mask == (1 << n) - 1`.",
      },
      {
        number: 1879,
        title: "Minimum XOR Sum of Two Arrays",
        slug: "minimum-xor-sum-of-two-arrays",
        difficulty: "Hard",
        patternHint: "With `N <= 14`, `dfs(mask)` pairs `nums1[bit_count(mask)]` with any unused element `v` in `mask` of `nums2`.",
      },
      {
        number: 698,
        title: "Partition to K Equal Sum Subsets",
        slug: "partition-to-k-equal-sum-subsets",
        difficulty: "Medium",
        patternHint: "With `N <= 16`, memoize `mask` of elements already placed into buckets.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Teach the ultimate radar signal for Hard interview problems: 'Whenever you see `12 <= N <= 20`, think Bitmask DP immediately'. Explain the 3 bitwise operations needed (`(mask >> i) & 1` to test if item `i` is used, `mask | (1 << i)` to mark item `i` used, and `(1 << n) - 1` for all items used) and why collapsing `N!` into `2^N` turns a 15-minute timeout into a 50ms pass.",
      keyTakeaways: [
        "You cannot pass a mutable `list` or `set` as a `@cache` key, but an integer `mask` fits in a single CPU register and hashes in O(1).",
        "Why it saves exponential time: visiting `0 -> 1 -> 2 -> 3` and `0 -> 2 -> 1 -> 3` both land in the EXACT same state `(current = 3, visited = {0,1,2,3})`. Factorial search computes them separately; Bitmask DP merges them.",
      ],
      stepByStepWalkthrough: [
        "Confirm in Constraints that $N \le 20$.",
        "Define `all_visited = (1 << n) - 1`.",
        "Loop over candidates `v` whose bit is 0 (`if not (mask & (1 << v)):`) and recurse with `mask | (1 << v)`.",
      ],
      interviewTraps: [
        "In JS/C++, forgetting parentheses around `(mask & (1 << v)) === 0`, since `===` has higher operator precedence than `&`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "The Dead-Giveaway Constraint: Why N <= 16?",
          visualCue: "Dramatic comparison between `16! = 20.9 trillion` vs `2^16 = 65,536` states.",
          narration:
            "Whenever you open a Hard problem and see N <= 16 or N <= 20, smile: the problem author just handed you a neon sign pointing to Bitmask DP. At N = 16, factorial permutations explode past 20 trillion, while subsets are just 65,536.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "The 3 Bitmask Operations and the Traveling Salesperson Problem",
          visualCue: "A 5-bit binary number flipping bits from 0 to 1 via `mask | (1 << v)`.",
          narration:
            "Instead of passing a boolean visited array into our recursion, we pack that entire array into the bits of a single integer. That makes `(current_city, mask)` instant to memoize.",
        },
      ],
    },
  },
];

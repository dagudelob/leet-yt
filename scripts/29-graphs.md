# Episode #29: Graphs (Adjacency List, Matrix & Bipartite Coloring)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 5 — Data Structure (`Intermediate`)  
> **Flowchart Node Term:** `Graph Representations (Adjacency List & Matrix)`  
> **Recommended Prerequisites:** Binary Trees -> Hash Table -> DFS -> BFS

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Teach the 'Graph Translation Dictionary': how problems disguised as university courses, keys and rooms, alliances, or flights are all Graphs. Cover the 3 core properties (Directed vs Undirected, Weighted vs Unweighted, In-Degree vs Out-Degree) and the 2-Coloring Bipartite check.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Graphs", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (V, E <= 10^5 -> Adjacency List is mandatory) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Graphs?
The universal data structure modeling networks of cities, flights, dependencies, and social connections via Vertices (`V`) and Edges (`E`). In 95% of interviews, your first step is converting an edge list `edges = [[u, v], ...]` into an **Adjacency List** (`adj[u] = [v1, v2, ...]`).

### Real-World Analogy
> **Visual Intuition:** Your phone's contact list (Adjacency List): under each person's name, you store only the friends they directly call—rather than carrying an 8-billion-by-8-billion spreadsheet of every person on Earth (Adjacency Matrix).

### Key Takeaways to Remember
1. **Key Takeaway #1:** LeetCode rarely gives you `GraphNode` objects: it gives an integer `n` and `edges = [[u, v], ...]`. Your first 5 lines always build the Adjacency List.
2. **Key Takeaway #2:** In an undirected graph, always add BOTH `adj[u].append(v)` AND `adj[v].append(u)`.
3. **Key Takeaway #3:** A graph is Bipartite (splittable into 2 teams with zero internal conflicts) if and only if it has no odd-length cycles.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Graphs)
- [x] The input gives connection pairs `edges = [[u, v], ...]` (roads, flights, prerequisites, friendships).
- [x] **Adjacency List (`defaultdict(list)`)**: Default choice for sparse graphs where `E` is much smaller than `V^2`.
- [x] **Adjacency Matrix (`grid[u][v]`)**: Only when the graph is small and dense (`V <= 500`, such as Floyd-Warshall) or requires O(1) edge existence checks.

### When NOT to Use It (False Positives)
- [!] Never allocate a `V x V` Adjacency Matrix when `V = 10^5`: `10^5 x 10^5` is `10^10` cells (~40 GB of RAM) and immediately triggers `Memory Limit Exceeded`.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `V, E <= 10^5 -> Adjacency List is mandatory`
- **Average Time Complexity:** `Build Adjacency List: O(V + E) | Iterate neighbors of u: O(degree(u))`
- **Worst-Case Time Complexity:** `O(V + E)`
- **Space Complexity:** `O(V + E) for Adjacency List vs O(V^2) for Adjacency Matrix`
- **Engineering Note:** Always check whether edges are Directed (`u -> v` one way) or Undirected (`u <-> v` both ways).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Identify what the vertices `V` and edges `E` represent in the problem story.
2. Ask: is the relationship one-way (Directed) or mutual (Undirected)? Does each edge have a cost (Weighted)?
3. Build `adj` and wrap your traversal in `for i in range(n): if i not in visited:` in case the graph is disconnected.

### Common Bugs & Edge Cases
- **Interview Trap:** Starting DFS/BFS only from node `0` assuming the graph is a single connected component, missing isolated components.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
from collections import defaultdict

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
    return True
```

### TypeScript / JavaScript Template
```typescript
export function buildAdjacencyList(
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
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:45] Every Tree Is a Graph, Carry No Rules
- **On-Screen Visual / Slide Cue:** A binary tree connecting its leaves and forming cycles until it transforms into a general graph network.
- **Narration / Teleprompter Script:**
  > "A Tree is simply a well-behaved graph with no cycles. The moment we allow any node to connect to any other node, we enter the world of Graphs—the structure modeling everything from Google Maps to package dependencies."

### [01:45 - 04:30] Adjacency Lists, In-Degree / Out-Degree, and 2-Coloring
- **On-Screen Visual / Slide Cue:** Converting `edges = [[0,1], [1,2]]` into an `adj` list and coloring nodes red and blue.
- **Narration / Teleprompter Script:**
  > "Your automatic reflex upon seeing an edge list should be building an Adjacency List in five lines. From there, counting incoming arrows or 2-coloring a bipartite network becomes effortless."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #30, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: V, E <= 10^5 -> Adjacency List is mandatory`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Graphs interview problems with nested loops! When constraints reach V, E <= 10^5 -> Adjacency List is mandatory, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Graphs as Your phone's contact list (Adjacency List): under each person's name, you store only the friends they directly call—rather than carrying an 8-billion-by-8-billion spreadsheet of every person on Earth (Adjacency Matrix).. First, identify what the vertices `v` and edges `e` represent in the problem story. Then, ask: is the relationship one-way (directed) or mutual (undirected)? does each edge have a cost (weighted)?. This collapses your time complexity from an unviable brute-force right down to Build Adjacency List: O(V + E) | Iterate neighbors of u: O(degree(u))! Watch out for the trap though: starting dfs/bfs only from node `0` assuming the graph is a single connected component, missing isolated components."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#785. Is Graph Bipartite?** | `Medium` | [https://leetcode.com/problems/is-graph-bipartite/](https://leetcode.com/problems/is-graph-bipartite/) | Color nodes alternating `1` and `-1` via BFS or DFS; if a neighbor already has your color, an odd cycle exists. |
| **#841. Keys and Rooms** | `Medium` | [https://leetcode.com/problems/keys-and-rooms/](https://leetcode.com/problems/keys-and-rooms/) | The input is already an Adjacency List; check if DFS/BFS from room 0 visits all N rooms. |
| **#997. Find the Town Judge** | `Easy` | [https://leetcode.com/problems/find-the-town-judge/](https://leetcode.com/problems/find-the-town-judge/) | Track `in_degree` and `out_degree`: the judge has `in_degree == N - 1` and `out_degree == 0`. |

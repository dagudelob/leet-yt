# Episode #31: Dijkstra's Algorithm & Weighted Shortest Paths
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 5 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Dijkstra's Algorithm & Weighted Shortest Paths`  
> **Recommended Prerequisites:** Graphs -> BFS -> Heaps (Priority Queue)

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Show that Dijkstra is NOT a complex algorithm to memorize: it is literally BFS where `deque` is replaced by `heapq` and `visited` is replaced by a `dist` array initialized to infinity. Highlight the lazy deletion check `if d > dist[u]: continue` and how replacing `+` with `max()` solves minimax bottleneck problems like 'Path With Minimum Effort'.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Dijkstra", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Cheapest/fastest path with non-negative weights w >= 0 and V, E <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Dijkstra?
Finding the **minimum-cost path** from a source to all other vertices in a graph with **non-negative edge weights** (`w >= 0`). It is literally BFS with the standard FIFO queue replaced by a **Min-Heap (Priority Queue)** ordered by cumulative distance.

### Real-World Analogy
> **Visual Intuition:** If BFS is a water wave expanding at equal speed through identical pipes, Dijkstra is water flowing through pipes of different lengths: water reaches whichever intersection has the smallest total pipe distance first. A Min-Heap tells us which intersection the water reaches next.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Always put cumulative distance FIRST in the heap tuple `(dist, node)` so `heapq` orders by smallest distance.
2. **Key Takeaway #2:** Updating `if d + w < dist[v]: dist[v] = d + w` is called Edge Relaxation.
3. **Key Takeaway #3:** The guard `if d > dist[u]: continue` skips outdated heap entries in O(1) without needing a custom `decrease_key` heap.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Dijkstra)
- [x] The problem asks for the **shortest, cheapest, fastest, or minimum-effort path** in a graph or grid where edges have positive costs (`w >= 0`).
- [x] **0-1 BFS (Deque optimization)**: When edge weights are strictly `0` or `1`, push weight-`0` edges to the front (`appendleft`) and weight-`1` edges to the back (`append`) in O(V + E).
- [x] **Bellman-Ford**: When **negative weights** exist or the path is constrained to at most `K` stops (`Cheapest Flights Within K Stops`).

### When NOT to Use It (False Positives)
- [!] NEVER use Dijkstra if the graph has NEGATIVE edge weights! Dijkstra assumes that once the minimum distance node is popped from the heap, adding future non-negative edges can never make a path cheaper.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Cheapest/fastest path with non-negative weights w >= 0 and V, E <= 10^5`
- **Average Time Complexity:** `O((V + E) log V) using a Min-Heap`
- **Worst-Case Time Complexity:** `O(E log V)`
- **Space Complexity:** `O(V + E) for `adj`, `dist`, and the Min-Heap`
- **Engineering Note:** Including `if d > dist[u]: continue` upon popping from the heap lazily skips outdated heap entries in O(1).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Initialize `dist = [inf] * n`, set `dist[start] = 0`, and push `(0, start)` into the Min-Heap.
2. Pop `(d, u)`. If `d > dist[u]`, `continue`.
3. If `u == target` (when searching for a single destination), return `d` immediately.
4. For each neighbor `(v, w)`, if `d + w < dist[v]`, update `dist[v]` and push `(dist[v], v)`.

### Common Bugs & Edge Cases
- **Interview Trap:** Pushing `(node, distance)` instead of `(distance, node)` into Python's `heapq`—which sorts by node ID instead of path cost!

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
import heapq

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

    return dist
```

### TypeScript / JavaScript Template
```typescript
export function networkDelayDijkstra(
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
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:45] From BFS to Dijkstra: When Roads Have Different Tolls
- **On-Screen Visual / Slide Cue:** A graph where a 3-edge path of weight 1 beats a direct 1-edge path of weight 10.
- **Narration / Teleprompter Script:**
  > "In BFS we assumed every edge costs 1. In the real world, a direct flight might cost $500 while two connecting flights cost $150 total. Swapping the FIFO Queue for a Min-Heap gives us Dijkstra's Algorithm."

### [01:45 - 04:45] Edge Relaxation, Lazy Deletion (`d > dist[u]`), and Minimax Dijkstra
- **On-Screen Visual / Slide Cue:** Animation of the `dist[]` table updating and the Min-Heap skipping stale entries.
- **Narration / Teleprompter Script:**
  > "Beyond summing road lengths, Dijkstra also solves minimax bottleneck paths—like finding the route with the smallest maximum cliff jump—simply by replacing `d + w` with `max(d, w)`."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #32, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Cheapest/fastest path with non-negative weights w >= 0 and V, E <= 10^5`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Dijkstra interview problems with nested loops! When constraints reach Cheapest/fastest path with non-negative weights w >= 0 and V, E <= 10^5, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Dijkstra as If BFS is a water wave expanding at equal speed through identical pipes, Dijkstra is water flowing through pipes of different lengths: water reaches whichever intersection has the smallest total pipe distance first. A Min-Heap tells us which intersection the water reaches next.. First, initialize `dist = [inf] * n`, set `dist[start] = 0`, and push `(0, start)` into the min-heap. Then, pop `(d, u)`. if `d > dist[u]`, `continue`. This collapses your time complexity from an unviable brute-force right down to O((V + E) log V) using a Min-Heap! Watch out for the trap though: pushing `(node, distance)` instead of `(distance, node)` into python's `heapq`—which sorts by node id instead of path cost!."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#743. Network Delay Time** | `Medium` | [https://leetcode.com/problems/network-delay-time/](https://leetcode.com/problems/network-delay-time/) | Direct Dijkstra from source `k`; answer is `max(dist[1..n])` (or `-1` if any node is `inf`). |
| **#1631. Path With Minimum Effort** | `Medium` | [https://leetcode.com/problems/path-with-minimum-effort/](https://leetcode.com/problems/path-with-minimum-effort/) | Minimax Dijkstra on a 2D grid where path cost is the maximum step height difference: `new_effort = max(d, abs(h1 - h2))`. |
| **#787. Cheapest Flights Within K Stops** | `Medium` | [https://leetcode.com/problems/cheapest-flights-within-k-stops/](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | K-stop constrained shortest path (Bellman-Ford in K+1 rounds or Dijkstra tracking minimum stops). |

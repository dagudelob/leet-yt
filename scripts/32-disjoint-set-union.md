# Episode #32: Disjoint Set Union (DSU / Union-Find & Kruskal MST)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 5 — Data Structure + Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Disjoint Set Union (DSU / Union-Find) & Minimum Spanning Tree`  
> **Recommended Prerequisites:** Graphs -> Binary Trees

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Show why Disjoint Set Union (Union-Find) has the highest 'power-to-lines-of-code' ratio in computer science. Visually explain Path Compression and Union by Size, and show how `union(u, v)` returning `False` immediately detects undirected cycles and powers Kruskal's Minimum Spanning Tree.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Disjoint Set (Union-Find)", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Dynamic connectivity, merging accounts/groups, undirected cycle detection, or Kruskal MST) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Disjoint Set (Union-Find)?
An ultra-fast data structure for tracking dynamic connected components via two near-constant time $O(\alpha(N)) \approx O(1)$ operations: **`find(x)`** (who is the root representative of `x`'s group?) and **`union(x, y)`** (merge the groups of `x` and `y`).

### Real-World Analogy
> **Visual Intuition:** Startups merging into larger corporations: initially everyone is their own CEO (`parent[i] = i`). When two companies merge (`union`), the CEO of the smaller company reports to the CEO of the larger company (**Union by Size**). And whenever an employee asks who the ultimate CEO is (`find`), they update their direct manager pointer straight to the top CEO (**Path Compression**).

### Key Takeaways to Remember
1. **Key Takeaway #1:** Initially every node is its own parent (`parent[i] = i`) and there are `N` disjoint components.
2. **Key Takeaway #2:** `Path Compression` (`self.parent[x] = self.find(self.parent[x])`) flattens trees to height 1.
3. **Key Takeaway #3:** Every successful `union(u, v)` decreases the total number of connected components by 1 (`self.components -= 1`).

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Disjoint Set (Union-Find))
- [x] Edges arrive dynamically and you need to check if two nodes are already connected, count remaining components, or find the first edge that creates a cycle (`Redundant Connection`, `Accounts Merge`).
- [x] **Kruskal's Minimum Spanning Tree (MST)**: Sort all edges from cheapest to most expensive and greedily connect them via `union(u, v)` if they are not already in the same component (`Min Cost to Connect All Points`).

### When NOT to Use It (False Positives)
- [!] When edges are dynamically **REMOVED** (disconnected): DSU is built for merging sets, not splitting them (unless you process queries offline in reverse time).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Dynamic connectivity, merging accounts/groups, undirected cycle detection, or Kruskal MST`
- **Average Time Complexity:** `O(α(N)) ≈ O(1) per `find` or `union` call`
- **Worst-Case Time Complexity:** `O(α(N)) where α is the Inverse Ackermann function (<= 4 for any practical N)`
- **Space Complexity:** `O(N) for the `parent` and `size` arrays`
- **Engineering Note:** Combining Path Compression + Union by Size achieves near-constant O(1) performance.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Instantiate `uf = UnionFind(n)`.
2. For each edge `(u, v)`, call `uf.union(u, v)`.
3. To check if `x` and `y` are in the same component, compare `uf.find(x) == uf.find(y)` (never compare `uf.parent[x] == uf.parent[y]` directly).

### Common Bugs & Edge Cases
- **Interview Trap:** Comparing `uf.parent[x] == uf.parent[y]` instead of `uf.find(x) == uf.find(y)`—`parent[x]` might still point to an intermediate leader if `find(x)` has not been called since the last merge.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
class UnionFind:
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
        return True
```

### TypeScript / JavaScript Template
```typescript
export class UnionFind {
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
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:45] Merging Components in O(1): What Is Union-Find?
- **On-Screen Visual / Slide Cue:** Nodes grouping under a leader and flattening their pointers directly to the root via Path Compression.
- **Narration / Teleprompter Script:**
  > "Imagine a hundred thousand cities where roads are built one by one, and you are asked after every road whether city A can reach city B. Running DFS every time is way too slow. Union-Find answers that question in practically O(1) time."

### [01:45 - 04:30] Cycle Detection and Kruskal's Minimum Spanning Tree (MST)
- **On-Screen Visual / Slide Cue:** Edges sorted by weight merging via Union-Find and skipping edges whose endpoints already share a root.
- **Narration / Teleprompter Script:**
  > "If you try to union two nodes that already report to the same root CEO, you just found a cycle. Sort all edges from cheapest to most expensive and skip cycles, and you have Kruskal's Minimum Spanning Tree algorithm."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #33, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Dynamic connectivity, merging accounts/groups, undirected cycle detection, or Kruskal MST`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Disjoint Set (Union-Find) interview problems with nested loops! When constraints reach Dynamic connectivity, merging accounts/groups, undirected cycle detection, or Kruskal MST, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Disjoint Set (Union-Find) as Startups merging into larger corporations: initially everyone is their own CEO (`parent[i] = i`). When two companies merge (`union`), the CEO of the smaller company reports to the CEO of the larger company (**Union by Size**). And whenever an employee asks who the ultimate CEO is (`find`), they update their direct manager pointer straight to the top CEO (**Path Compression**).. First, instantiate `uf = unionfind(n)`. Then, for each edge `(u, v)`, call `uf.union(u, v)`. This collapses your time complexity from an unviable brute-force right down to O(α(N)) ≈ O(1) per `find` or `union` call! Watch out for the trap though: comparing `uf.parent[x] == uf.parent[y]` instead of `uf.find(x) == uf.find(y)`—`parent[x]` might still point to an intermediate leader if `find(x)` has not been called since the last merge."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#684. Redundant Connection** | `Medium` | [https://leetcode.com/problems/redundant-connection/](https://leetcode.com/problems/redundant-connection/) | The first edge `[u, v]` where `uf.union(u, v)` returns `False` is the exact edge that completes the cycle. |
| **#721. Accounts Merge** | `Medium` | [https://leetcode.com/problems/accounts-merge/](https://leetcode.com/problems/accounts-merge/) | Union all accounts that share at least one common email address. |
| **#1584. Min Cost to Connect All Points** | `Medium` | [https://leetcode.com/problems/min-cost-to-connect-all-points/](https://leetcode.com/problems/min-cost-to-connect-all-points/) | Kruskal's MST: sort all pairs by Manhattan distance and add the `N - 1` edges where `union(u, v)` returns `True`. |

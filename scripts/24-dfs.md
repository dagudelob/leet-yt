# Episode #24: DFS - Depth-First Search (Trees, Grids & Graphs)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 4 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Depth-First Search (Trees, Grids & Graphs)`  
> **Recommended Prerequisites:** Binary Trees -> Matrices / 2D Grids -> Stacks (LIFO)

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain how DFS works on Trees (where no `visited` set is needed because trees have no cycles) vs Graphs and 2D Grids (where marking `visited` IMMEDIATELY upon entering `dfs(u)` is mandatory to avoid infinite loops). Use 'Number of Islands' (Flood Fill) as the visual anchor.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("DFS", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Islands, connected components, or tree/graph paths with V, E <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is DFS?
Exploring a branch as deep as possible before backtracking to try the next branch. It is the go-to algorithm for counting connected components (islands), checking reachability, detecting cycles, and traversing trees.

### Real-World Analogy
> **Visual Intuition:** Exploring a maze with a ball of yarn: you walk down the first available corridor until you hit a dead end, then rewind your yarn back to the last intersection with an unexplored door and try that path next.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Trees have no cycles, but on Graphs and 2D Grids you MUST mark a node `visited` as soon as you enter `dfs(u)`.
2. **Key Takeaway #2:** DFS is concise to write because it uses the language's own call stack.
3. **Key Takeaway #3:** To measure the size of a connected component, return `1 + sum(dfs(neighbor))`.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE DFS)
- [x] Exploring all nodes of a tree, 2D grid, or graph to count connected components (`Number of Islands`, `Max Area of Island`).
- [x] Checking path reachability from `A` to `B`, cloning a graph, or detecting cycles.
- [x] Computing subtree properties or root-to-leaf paths (`Path Sum`).

### When NOT to Use It (False Positives)
- [!] When you need the **SHORTEST PATH** in an unweighted graph or grid: DFS might snake through a 1,000-step detour before finding a 2-step path; for unweighted shortest path, always use **BFS**.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Islands, connected components, or tree/graph paths with V, E <= 10^5`
- **Average Time Complexity:** `O(V + E) on graphs | O(R * C) on 2D grids`
- **Worst-Case Time Complexity:** `O(V + E)`
- **Space Complexity:** `O(V) for the `visited` set and recursion stack`
- **Engineering Note:** Marking nodes `visited` ensures each vertex and edge is processed a constant number of times.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Check base cases first (out of bounds, obstacle, or already visited).
2. Immediately mark the current cell/node as visited (`visited.add(u)` or `grid[r][c] = '0'`).
3. Loop over all neighbors and recursively call `dfs(neighbor)`.

### Common Bugs & Edge Cases
- **Interview Trap:** Forgetting to mark nodes as visited on a cyclic graph, triggering `Maximum Call Stack Size Exceeded`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def num_islands_dfs(grid: list[list[str]]) -> int:
    """
    Classic 2D Grid DFS Template (Flood Fill / Island Sinking).
    Time: O(R * C) | Space: O(R * C) call stack
    """
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])

    def dfs(r: int, c: int) -> None:
        # Base case: out of bounds or water ('0')
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == "0":
            return
        # Mark visited in-place by sinking land '1' into water '0'
        grid[r][c] = "0"
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            dfs(r + dr, c + dc)

    islands = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                islands += 1
                dfs(r, c)
    return islands
```

### TypeScript / JavaScript Template
```typescript
export function numIslandsDFS(grid: string[][]): number {
  if (grid.length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") {
      return;
    }
    grid[r][c] = "0"; // Mark visited
    dfs(r - 1, c);
    dfs(r + 1, c);
    dfs(r, c - 1);
    dfs(r, c + 1);
  }

  let islands = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        dfs(r, c);
      }
    }
  }
  return islands;
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:45] Theseus in the Labyrinth: How Depth-First Search Thinks
- **On-Screen Visual / Slide Cue:** A beam of light diving all the way to the bottom of a branch before backtracking.
- **Narration / Teleprompter Script:**
  > "Depth-First Search has a bold personality: it picks one direction and plunges all the way to the bottom before ever backing up to try another fork."

### [01:45 - 04:30] 2D Grid Flood Fill: Sinking Islands in O(R * C)
- **On-Screen Visual / Slide Cue:** Grid of 1s and 0s where touching a 1 spreads a wave that zeroes out the entire connected island.
- **Narration / Teleprompter Script:**
  > "In Number of Islands, every time we encounter a land cell, we increment our island count by one and launch DFS like a paint bucket to mark that entire connected island as visited."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #25, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Islands, connected components, or tree/graph paths with V, E <= 10^5`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving DFS interview problems with nested loops! When constraints reach Islands, connected components, or tree/graph paths with V, E <= 10^5, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of DFS as Exploring a maze with a ball of yarn: you walk down the first available corridor until you hit a dead end, then rewind your yarn back to the last intersection with an unexplored door and try that path next.. First, check base cases first (out of bounds, obstacle, or already visited). Then, immediately mark the current cell/node as visited (`visited.add(u)` or `grid[r][c] = '0'`). This collapses your time complexity from an unviable brute-force right down to O(V + E) on graphs | O(R * C) on 2D grids! Watch out for the trap though: forgetting to mark nodes as visited on a cyclic graph, triggering `maximum call stack size exceeded`."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#200. Number of Islands** | `Medium` | [https://leetcode.com/problems/number-of-islands/](https://leetcode.com/problems/number-of-islands/) | Scan the grid; upon seeing `'1'`, increment `islands` and run DFS to sink all connected land. |
| **#695. Max Area of Island** | `Medium` | [https://leetcode.com/problems/max-area-of-island/](https://leetcode.com/problems/max-area-of-island/) | Have `dfs(r, c)` return `1 + sum(dfs of 4 neighbors)`. |
| **#133. Clone Graph** | `Medium` | [https://leetcode.com/problems/clone-graph/](https://leetcode.com/problems/clone-graph/) | Maintain a hash map `{original_node: cloned_node}` that acts as both `visited` and clone registry. |

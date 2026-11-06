# Episode #14: Matrices & 2D Grids
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 2 — Data Structure (`Beginner`)  
> **Flowchart Node Term:** `2D Matrices & Grids`  
> **Recommended Prerequisites:** Arrays -> Simulation

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Present 2D Matrices as the bridge between simple 1D arrays and Graph/DP algorithms. Teach the 3 essential recipes: 1) Flattening 2D <-> 1D with `idx = r * cols + c`, 2) Rotating 90° via Transpose + Row Reverse, and 3) 4-directional neighbor traversal with strict boundary checks `0 <= nr < rows`.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Matrices / 2D Grids", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (R, C <= 1000 (total cells R * C <= 10^6)) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Matrices / 2D Grids?
Two-dimensional arrays `grid[r][c]` of `R` rows by `C` columns that model images, game boards, spreadsheets, and implicit graphs where each cell connects to its 4 or 8 neighbors.

### Real-World Analogy
> **Visual Intuition:** A chessboard or spreadsheet: every cell has a unique `(row, col)` address, and every cell acts like a room with 4 doors (`up, down, left, right`) connecting it to adjacent rooms.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Any 2D coordinate `(r, c)` maps to a unique 1D index `id = r * C + c`, and converts back via `r = id // C`, `c = id % C`.
2. **Key Takeaway #2:** Rotating 90° clockwise never requires complex 4-corner index math: just Transpose (`r, c <-> c, r`) and Reverse each row.
3. **Key Takeaway #3:** Every 2D grid is an implicit Graph where cells are vertices and `(-1,0), (1,0), (0,-1), (0,1)` are edges.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Matrices / 2D Grids)
- [x] In-place geometric transformations on tables or images (rotate 90 degrees, transpose, zero out rows/columns).
- [x] Island counting, shortest paths in mazes, flood fill, or 2D dynamic programming grids.

### When NOT to Use It (False Positives)
- [!] If the grid dimensions are huge (e.g., `10^6 x 10^6`) but almost all cells are empty (sparse matrix): do not allocate the 2D matrix; store only active coordinates `(r, c)` in a `Hash Set`.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `R, C <= 1000 (total cells R * C <= 10^6)`
- **Average Time Complexity:** `Full traversal: O(R * C) | Cell access: O(1)`
- **Worst-Case Time Complexity:** `O(R * C)`
- **Space Complexity:** `O(1) if mutated in-place, or O(R * C) with a visited matrix`
- **Engineering Note:** An R x C grid is an implicit graph with V = R * C vertices and up to 4 * R * C edges.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Always extract `rows = len(grid)` and `cols = len(grid[0])` at the top of the function.
2. When transposing in-place, start `c` at `r + 1` so you do not swap elements twice back to their original spots.
3. Always check `0 <= nr < rows and 0 <= nc < cols` before indexing `grid[nr][nc]`.

### Common Bugs & Edge Cases
- **Interview Trap:** In Python, negative indices like `grid[-1][0]` do NOT raise `IndexError`—they silently wrap around to the last row of the matrix! Always write `0 <= nr < rows`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def rotate_matrix_90_clockwise(matrix: list[list[int]]) -> None:
    """
    1. Classic In-Place 90-Degree Clockwise Matrix Rotation:
       Step A: Transpose across main diagonal (swap matrix[r][c] with matrix[c][r])
       Step B: Reverse each row
    """
    n = len(matrix)
    for r in range(n):
        for c in range(r + 1, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
    for row in matrix:
        row.reverse()


def get_valid_4_neighbors(r: int, c: int, rows: int, cols: int) -> list[tuple[int, int]]:
    """
    2. Clean 4-directional orthogonal neighbor generator within grid bounds.
    """
    neighbors = []
    for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            neighbors.append((nr, nc))
    return neighbors
```

### TypeScript / JavaScript Template
```typescript
export function rotateMatrix90Clockwise(matrix: number[][]): void {
  const n = matrix.length;
  // 1. Transpose across the main diagonal
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }
  // 2. Reverse each row
  for (let r = 0; r < n; r++) {
    matrix[r].reverse();
  }
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:45] From 1D to 2D: Coordinates, Diagonals, and Flattening
- **On-Screen Visual / Slide Cue:** Grid highlighting rows, columns, main diagonal (`r - c == const`), and anti-diagonal (`r + c == const`).
- **Narration / Teleprompter Script:**
  > "A 2D matrix is an array of arrays with neat geometric invariants: along any main diagonal `r - c` is constant, and along any anti-diagonal `r + c` is constant."

### [01:45 - 04:30] Python's Negative Index Trap and the Bridge to Graphs
- **On-Screen Visual / Slide Cue:** Cursor stepping above row 0 to `r = -1` and accidentally reading the bottom row in Python.
- **Narration / Teleprompter Script:**
  > "Watch out in Python: if your row index steps above zero to `-1`, Python will not throw an error—it silently reads the bottom row of your grid and corrupts your traversal. Checking `0 <= nr < rows` is mandatory."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #15, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: R, C <= 1000 (total cells R * C <= 10^6)`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Matrices / 2D Grids interview problems with nested loops! When constraints reach R, C <= 1000 (total cells R * C <= 10^6), your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Matrices / 2D Grids as A chessboard or spreadsheet: every cell has a unique `(row, col)` address, and every cell acts like a room with 4 doors (`up, down, left, right`) connecting it to adjacent rooms.. First, always extract `rows = len(grid)` and `cols = len(grid[0])` at the top of the function. Then, when transposing in-place, start `c` at `r + 1` so you do not swap elements twice back to their original spots. This collapses your time complexity from an unviable brute-force right down to Full traversal: O(R * C) | Cell access: O(1)! Watch out for the trap though: in python, negative indices like `grid[-1][0]` do not raise `indexerror`—they silently wrap around to the last row of the matrix! always write `0 <= nr < rows`."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#48. Rotate Image** | `Medium` | [https://leetcode.com/problems/rotate-image/](https://leetcode.com/problems/rotate-image/) | Rotate 90° clockwise = Transpose matrix + Reverse each row in-place. |
| **#73. Set Matrix Zeroes** | `Medium` | [https://leetcode.com/problems/set-matrix-zeroes/](https://leetcode.com/problems/set-matrix-zeroes/) | Use the first row and first column as in-place markers to achieve O(1) extra space. |
| **#74. Search a 2D Matrix** | `Medium` | [https://leetcode.com/problems/search-a-2d-matrix/](https://leetcode.com/problems/search-a-2d-matrix/) | Map a 1D binary search index `idx` to 2D coordinates via `r = idx // cols` and `c = idx % cols`. |

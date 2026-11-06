# Episode #36: Dynamic Programming (Bottom-Up Tabulation & Classic Patterns)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 6 — Algorithmic Pattern (`Advanced`)  
> **Flowchart Node Term:** `Bottom-Up Dynamic Programming (1D, 2D, Knapsack, LCS, LIS)`  
> **Recommended Prerequisites:** Memoization (Top-Down DP) -> Arrays -> Matrices / 2D Grids

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Structure this episode as the field guide to the 4 classic Bottom-Up DP families: 1) 1D Linear DP (`House Robber`), 2) Knapsack DP (`Coin Change`, `Partition Equal Subset Sum`), 3) Two-String Alignment (`Longest Common Subsequence`, `Edit Distance`), and 4) LIS (`Longest Increasing Subsequence`). Teach the 4-step framework: State Definition, Base Case, Recurrence Relation, and Iteration Order.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Dynamic Programming", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint ('Min/Max/Number of ways' with overlapping subproblems and N <= 10^3 - 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Dynamic Programming?
Building the optimal solution from the ground up (Bottom-Up) by iteratively filling a `dp` table from base cases up to `N`—eliminating recursion overhead and enabling **space optimization** (shrinking an `O(N)` table to 2 variables `O(1)`, or an `O(N x M)` grid to a single row `O(M)`).

### Real-World Analogy
> **Visual Intuition:** Climbing a staircase where each step is built from the two steps directly beneath it. Because step #10 only depends on step #9 and step #8, you only ever need to remember the last two steps in memory.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Before writing a single loop, write a comment stating the exact plain-English meaning of `dp[i]` or `dp[i][j]`.
2. **Key Takeaway #2:** In 0/1 Knapsack (each item used at most once), optimizing to a 1D array requires iterating capacities **BACKWARD** (`for w in range(target, num - 1, -1)`) so an item is not reused multiple times.
3. **Key Takeaway #3:** In two-string DP (`LCS`, `Edit Distance`), padding an extra row 0 and column 0 for the empty string eliminates boundary checks.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Dynamic Programming)
- [x] **1D Linear DP**: `House Robber`, `Coin Change`, `Decode Ways`, `Longest Increasing Subsequence (LIS)`.
- [x] **Knapsack DP (0/1 & Unbounded)**: `Partition Equal Subset Sum`, `Coin Change I & II`.
- [x] **2D Grid or Two-String DP**: `Unique Paths`, `Minimum Path Sum`, `Longest Common Subsequence (LCS)`, `Edit Distance`.
- [x] **Interval DP**: `Burst Balloons`, `Longest Palindromic Subsequence`.

### When NOT to Use It (False Positives)
- [!] When the problem requires returning ALL actual combinations/configurations and the output size itself is exponential (use Backtracking).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `'Min/Max/Number of ways' with overlapping subproblems and N <= 10^3 - 10^5`
- **Average Time Complexity:** `1D: O(N) or O(N * K) | 2D / Knapsack / LCS: O(N * M)`
- **Worst-Case Time Complexity:** `Polynomial matching the dimensions of the `dp` table`
- **Space Complexity:** `O(N) or O(N * M), optimizable to O(1) or O(M) with a Rolling Array`
- **Engineering Note:** Whenever `dp[i]` only depends on `dp[i-1]` and `dp[i-2]`, space can be reduced to O(1).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. 1. Define the exact meaning of `dp[i]`.
2. 2. Initialize the table with the identity value (`0` for max/count, `inf` for min) and set base cases (`dp[0]`).
3. 3. Write the recurrence transition from already-computed smaller states.
4. 4. (Bonus) If row `i` only reads row `i - 1`, compress space to two rows `prev` and `curr`.

### Common Bugs & Edge Cases
- **Interview Trap:** In 1D 0/1 Knapsack, iterating capacity left-to-right instead of right-to-left—which accidentally turns 0/1 Knapsack into Unbounded Knapsack (reusing the same item multiple times).

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def coin_change_bottom_up(coins: list[int], amount: int) -> int:
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
    return dp[m][n]
```

### TypeScript / JavaScript Template
```typescript
export function coinChangeBottomUp(coins: number[], amount: number): number {
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
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 02:00] From Top-Down to Bottom-Up: Building from the Foundation
- **On-Screen Visual / Slide Cue:** Transforming recursive Memoization arrows into a table filling cleanly from left to right.
- **Narration / Teleprompter Script:**
  > "We already saw how Memoization solves DP top-down. Now we take the pro step: filling the table directly from base cases upward, removing recursion overhead and unlocking O(1) rolling-space optimization."

### [02:00 - 05:30] The 4 Classic Families: 1D Linear, Knapsack, LCS, and LIS
- **On-Screen Visual / Slide Cue:** Four quadrants illustrating the dependency arrows of each DP family.
- **Narration / Teleprompter Script:**
  > "Ninety percent of interview DP problems belong to one of four families: 1D sequences, Knapsack subset sums like Coin Change, two-string alignment like LCS, or Longest Increasing Subsequence."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #37, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: 'Min/Max/Number of ways' with overlapping subproblems and N <= 10^3 - 10^5`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Dynamic Programming interview problems with nested loops! When constraints reach 'Min/Max/Number of ways' with overlapping subproblems and N <= 10^3 - 10^5, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Dynamic Programming as Climbing a staircase where each step is built from the two steps directly beneath it. Because step #10 only depends on step #9 and step #8, you only ever need to remember the last two steps in memory.. First, 1. define the exact meaning of `dp[i]`. Then, 2. initialize the table with the identity value (`0` for max/count, `inf` for min) and set base cases (`dp[0]`). This collapses your time complexity from an unviable brute-force right down to 1D: O(N) or O(N * K) | 2D / Knapsack / LCS: O(N * M)! Watch out for the trap though: in 1d 0/1 knapsack, iterating capacity left-to-right instead of right-to-left—which accidentally turns 0/1 knapsack into unbounded knapsack (reusing the same item multiple times)."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#322. Coin Change** | `Medium` | [https://leetcode.com/problems/coin-change/](https://leetcode.com/problems/coin-change/) | `dp[a] = min(dp[a], 1 + dp[a - coin])` starting from `dp[0] = 0`. |
| **#1143. Longest Common Subsequence** | `Medium` | [https://leetcode.com/problems/longest-common-subsequence/](https://leetcode.com/problems/longest-common-subsequence/) | `(M+1) x (N+1)` table: if chars match take `1 + diagonal`; otherwise `max(top, left)`. |
| **#300. Longest Increasing Subsequence** | `Medium` | [https://leetcode.com/problems/longest-increasing-subsequence/](https://leetcode.com/problems/longest-increasing-subsequence/) | Classic O(N^2) DP `dp[i] = max(1 + dp[j])` or O(N log N) Patience Sorting with Binary Search. |

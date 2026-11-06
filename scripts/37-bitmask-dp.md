# Episode #37: Bitmask DP (Subset States & Traveling Salesperson)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 6 — Algorithmic Pattern (`Expert`)  
> **Flowchart Node Term:** `Bitmask Dynamic Programming (TSP & Subset States)`  
> **Recommended Prerequisites:** Dynamic Programming -> Memoization (Top-Down DP) -> Backtracking

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Teach the ultimate radar signal for Hard interview problems: 'Whenever you see `12 <= N <= 20`, think Bitmask DP immediately'. Explain the 3 bitwise operations needed (`(mask >> i) & 1` to test if item `i` is used, `mask | (1 << i)` to mark item `i` used, and `(1 << n) - 1` for all items used) and why collapsing `N!` into `2^N` turns a 15-minute timeout into a 50ms pass.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Bitmask DP", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Unmistakable signal: 12 <= N <= 20 and state depends on the subset of items used) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Bitmask DP?
Encoding a subset of visited or used elements as the `0` and `1` bits of a single integer (`mask` from `0` to `2^N - 1`). Allows caching states of the form *'which elements have I already used?'*, collapsing factorial $O(N!)$ permutation searches (like the Traveling Salesperson Problem - TSP) down to $O(N^2 \cdot 2^N)$.

### Real-World Analogy
> **Visual Intuition:** A wall panel of 15 light switches: instead of carrying a written list of which rooms have their lights on, you snapshot the 15 switches as a single binary number (`010110...`). That single integer instantly tells you which rooms have been visited and which remain.

### Key Takeaways to Remember
1. **Key Takeaway #1:** You cannot pass a mutable `list` or `set` as a `@cache` key, but an integer `mask` fits in a single CPU register and hashes in O(1).
2. **Key Takeaway #2:** Why it saves exponential time: visiting `0 -> 1 -> 2 -> 3` and `0 -> 2 -> 1 -> 3` both land in the EXACT same state `(current = 3, visited = {0,1,2,3})`. Factorial search computes them separately; Bitmask DP merges them.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Bitmask DP)
- [x] The problem constraint is a dead giveaway: **`N <= 15` or `N <= 20`** (too large for $O(N!)$ which caps at $N \le 11$, but ideal for $2^{20} \approx 10^6$).
- [x] Assigning tasks to workers, matching pairs, or finding the optimal tour visiting all nodes (`Traveling Salesperson Problem - TSP`, `Shortest Path Visiting All Nodes`).

### When NOT to Use It (False Positives)
- [!] When $N > 22$: $2^{25}$ exceeds 33 million states and will blow past time and memory limits.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Unmistakable signal: 12 <= N <= 20 and state depends on the subset of items used`
- **Average Time Complexity:** `O(N * 2^N) or O(N^2 * 2^N)`
- **Worst-Case Time Complexity:** `O(N^2 * 2^N)`
- **Space Complexity:** `O(N * 2^N) for the `(u, mask)` state table`
- **Engineering Note:** For N = 15, `15! = 1.3 x 10^12` (TLE), whereas `15^2 * 2^15 = 7.3 x 10^6` (runs in ~50ms).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Confirm in Constraints that $N \le 20$.
2. Define `all_visited = (1 << n) - 1`.
3. Loop over candidates `v` whose bit is 0 (`if not (mask & (1 << v)):`) and recurse with `mask | (1 << v)`.

### Common Bugs & Edge Cases
- **Interview Trap:** In JS/C++, forgetting parentheses around `(mask & (1 << v)) === 0`, since `===` has higher operator precedence than `&`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
from functools import cache

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
    return dfs(0, 1)
```

### TypeScript / JavaScript Template
```typescript
export function tspBitmaskDP(dist: number[][]): number {
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
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] The Dead-Giveaway Constraint: Why N <= 16?
- **On-Screen Visual / Slide Cue:** Dramatic comparison between `16! = 20.9 trillion` vs `2^16 = 65,536` states.
- **Narration / Script:**
  > "Whenever you open a Hard problem and see N <= 16 or N <= 20, smile: the problem author just handed you a neon sign pointing to Bitmask DP. At N = 16, factorial permutations explode past 20 trillion, while subsets are just 65,536."

### [01:45 - 04:45] The 3 Bitmask Operations and the Traveling Salesperson Problem
- **On-Screen Visual / Slide Cue:** A 5-bit binary number flipping bits from 0 to 1 via `mask | (1 << v)`.
- **Narration / Script:**
  > "Instead of passing a boolean visited array into our recursion, we pack that entire array into the bits of a single integer. That makes `(current_city, mask)` instant to memoize."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#847. Shortest Path Visiting All Nodes** | `Hard` | [https://leetcode.com/problems/shortest-path-visiting-all-nodes/](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) | BFS/DP where state is `(current_node, visited_mask)` until `mask == (1 << n) - 1`. |
| **#1879. Minimum XOR Sum of Two Arrays** | `Hard` | [https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/](https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/) | With `N <= 14`, `dfs(mask)` pairs `nums1[bit_count(mask)]` with any unused element `v` in `mask` of `nums2`. |
| **#698. Partition to K Equal Sum Subsets** | `Medium` | [https://leetcode.com/problems/partition-to-k-equal-sum-subsets/](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) | With `N <= 16`, memoize `mask` of elements already placed into buckets. |

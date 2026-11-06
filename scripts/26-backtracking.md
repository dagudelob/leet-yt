# Episode #26: Backtracking (Exhaustive Search with Pruning)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 4 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Backtracking (Subsets, Permutations & Pruning)`  
> **Recommended Prerequisites:** DFS -> Binary Trees

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Teach the 3-beat mantra of Backtracking ('Choose, Explore, Unchoose') and show how the exact same template solves Subsets (`backtrack(i + 1)`), Combination Sum with repetition (`backtrack(i)`), and Permutations (using a `used[i]` array) by changing a single line. Warn about the classic `res.append(path)` reference bug.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Backtracking", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint ('Return all possible...' with N <= 20) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Backtracking?
A DFS over an implicit decision tree that builds candidate solutions step-by-step following the 3-beat rhythm: **1) Choose (`append`) -> 2) Explore (`backtrack`) -> 3) Unchoose (`pop`)**, pruning invalid branches early.

### Real-World Analogy
> **Visual Intuition:** Solving a Sudoku puzzle in pencil: you write a 5 in a cell (Choose), try filling subsequent cells (Explore), and if you hit a contradiction where no number fits, you erase that 5 (Unchoose / Backtrack) and try a 6.

### Key Takeaways to Remember
1. **Key Takeaway #1:** The Backtracking rhythm: `path.append(x)` -> `backtrack(...)` -> `path.pop()`.
2. **Key Takeaway #2:** In Combinations/Subsets order does NOT matter (pass `start_idx` forward); in Permutations order DOES matter (scan from `0` with a `used` mask).
3. **Key Takeaway #3:** Pruning cuts off an entire subtree early as soon as `current_sum > target` or a queen placement conflicts.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Backtracking)
- [x] The problem asks to **GENERATE ALL** valid combinations, subsets (`Subsets`), permutations (`Permutations`), palindrome partitions, or board placements (`N-Queens`, `Sudoku Solver`).
- [x] Input constraints are tiny (**`N <= 15` or `N <= 20`**), signaling exponential $O(2^N)$ or factorial $O(N!)$ complexity.

### When NOT to Use It (False Positives)
- [!] If the problem only asks to **COUNT how many ways** or **find the max/min cost** with `N >= 100`: do not enumerate every path one by one with Backtracking—use **Dynamic Programming**.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `'Return all possible...' with N <= 20`
- **Average Time Complexity:** `Subsets: O(N * 2^N) | Permutations: O(N * N!)`
- **Worst-Case Time Complexity:** `Exponential or Factorial (drastically reduced in practice via Pruning)`
- **Space Complexity:** `O(N) recursion stack depth and active `path` list`
- **Engineering Note:** When recording a valid path into `res`, always append a SHALLOW COPY (`path[:]`), never the mutable list reference itself.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Maintain a single shared `path` list mutated in-place as you descend and ascend the decision tree.
2. At base cases, append a snapshot copy `res.append(path[:])`.
3. In the candidate loop, prune invalid choices, `append`, recurse, and `pop`.

### Common Bugs & Edge Cases
- **Interview Trap:** Writing `res.append(path)` instead of `res.append(path[:])` (or `[...path]` in JS): since `path` is emptied by `pop()` as the recursion unwinds, `res` ends up filled with empty lists `[[], [], []]`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def subsets_backtracking(nums: list[int]) -> list[list[int]]:
    """
    Universal Backtracking Template: Choose -> Explore -> Unchoose.
    Generates all 2^N subsets of 'nums'.
    """
    res: list[list[int]] = []
    path: list[int] = []

    def backtrack(start_idx: int) -> None:
        # 1. Record a COPY of the current valid configuration
        res.append(path[:])

        # 2. Try every remaining candidate from start_idx onward
        for i in range(start_idx, len(nums)):
            path.append(nums[i])      # A) CHOOSE
            backtrack(i + 1)          # B) EXPLORE
            path.pop()                # C) UNCHOOSE (Backtrack)

    backtrack(0)
    return res
```

### TypeScript / JavaScript Template
```typescript
export function subsetsBacktracking(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];

  function backtrack(startIdx: number): void {
    res.push([...path]); // Copy current state

    for (let i = startIdx; i < nums.length; i++) {
      path.push(nums[i]);     // 1. Choose
      backtrack(i + 1);       // 2. Explore
      path.pop();             // 3. Unchoose
    }
  }

  backtrack(0);
  return res;
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] Choose, Explore, Unchoose: The Rhythm of Backtracking
- **On-Screen Visual / Slide Cue:** Decision tree where a shared `path` list appends an item going down and pops it going back up.
- **Narration / Script:**
  > "Whenever a problem asks you to return ALL possible combinations or permutations, you are exploring a decision tree. Backtracking walks that entire tree using a single shared list thanks to its three-step rhythm: choose, explore, and unchoose."

### [01:45 - 04:45] Subsets vs Combination Sum vs Permutations and the `path[:]` Bug
- **On-Screen Visual / Slide Cue:** Three nearly identical code blocks highlighting the single line that changes between them.
- **Narration / Script:**
  > "You do not need twenty separate templates. Once you understand the difference between advancing `start_idx` for combinations and tracking a `used` array for permutations, you own the entire family."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#78. Subsets** | `Medium` | [https://leetcode.com/problems/subsets/](https://leetcode.com/problems/subsets/) | At every node record `path[:]` and branch over candidates `i >= start_idx`. |
| **#46. Permutations** | `Medium` | [https://leetcode.com/problems/permutations/](https://leetcode.com/problems/permutations/) | Order matters: iterate over all elements using a `used` boolean array so indices are not reused in the same permutation. |
| **#39. Combination Sum** | `Medium` | [https://leetcode.com/problems/combination-sum/](https://leetcode.com/problems/combination-sum/) | Because candidates can be reused unlimited times, recurse with `backtrack(i, rem - nums[i])` without incrementing `i`. |

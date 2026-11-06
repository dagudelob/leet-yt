# Episode #35: Memoization (Top-Down Dynamic Programming)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 6 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Memoization / Top-Down Dynamic Programming`  
> **Recommended Prerequisites:** Divide & Conquer -> Binary Trees -> Hash Table -> Backtracking

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Remove all fear of Dynamic Programming: explain that Memoization is simply a standard recursive `dfs` function with a sticky-note cache (`memo` or `@cache` in Python). Visually show how the exponential tree of `Climbing Stairs` or `House Robber` collapses into a linear O(N) chain.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Memoization (Top-Down DP)", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Recursive choices with overlapping subproblems (N <= 10^3 for 2D, N <= 10^5 for 1D)) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Memoization (Top-Down DP)?
The most natural gateway into Dynamic Programming: write the recursive decision tree first (just like DFS/Backtracking) and attach a **cache (`memo` dict or `@cache`)** so every unique subproblem state is computed **only once** and returned in O(1) thereafter.

### Real-World Analogy
> **Visual Intuition:** If someone asks you `347 x 89`, you work it out on paper in 30 seconds and write the answer on a sticky note. If they ask `347 x 89` again five minutes later, you do not multiply again—you read the sticky note in half a second.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Core equation: `Backtracking (recursive brute force) + State Cache = Memoization (Top-Down DP)`.
2. **Key Takeaway #2:** The 'State' consists strictly of the parameters that change across recursive calls (e.g., `i`, or `(i, remaining_capacity)`).
3. **Key Takeaway #3:** In Python 3.9+, `@functools.cache` turns any pure recursive function into Top-Down DP in a single line.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Memoization (Top-Down DP))
- [x] The problem asks for the **maximum, minimum, or total number of ways** to do something, and drawing the recursion tree reveals **identical states reached via different paths** (Overlapping Subproblems).
- [x] When not all states in the state space are reachable, or when topological iteration order is tricky to write bottom-up.
- [x] As Step 1 of any DP problem in an interview before (optionally) converting to a bottom-up table.

### When NOT to Use It (False Positives)
- [!] If recursion depth exceeds stack limits or you need O(1) rolling-row space optimization (convert your Memoization recurrence into Bottom-Up DP).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Recursive choices with overlapping subproblems (N <= 10^3 for 2D, N <= 10^5 for 1D)`
- **Average Time Complexity:** `O(Number of Unique States * Work per State Transition)`
- **Worst-Case Time Complexity:** `Polynomial (collapses O(2^N) into O(N) or O(N^2))`
- **Space Complexity:** `O(Unique States) in `memo` + O(Recursion Depth) on Call Stack`
- **Engineering Note:** Universal formula for Memoization time complexity: `(Total unique combinations of function arguments) * (Work inside 1 call excluding recursive calls)`.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Identify the choices at each step (e.g., take or skip element `i`) and the minimal variables that define the State.
2. Write the recursive `dfs(state)` function with its base cases.
3. Add a `memo` dictionary (or `@cache`): if `state in memo`, return `memo[state]` immediately.

### Common Bugs & Edge Cases
- **Interview Trap:** Passing mutable lists or redundant accumulators as arguments to `dfs(...)`, either causing `unhashable type` errors or blowing up the number of states.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
from functools import cache

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

    return dfs(0)
```

### TypeScript / JavaScript Template
```typescript
export function houseRobberMemo(nums: number[]): number {
  const memo = new Map<number, number>();

  function dfs(i: number): number {
    if (i >= nums.length) return 0;
    if (memo.has(i)) return memo.get(i)!;

    const ans = Math.max(dfs(i + 1), nums[i] + dfs(i + 2));
    memo.set(i, ans);
    return ans;
  }

  return dfs(0);
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 02:00] Demystifying DP: It Is Just Recursion with a Notepad
- **On-Screen Visual / Slide Cue:** Fibonacci tree where duplicate subtrees light up green and return in O(1) from a lookup table.
- **Narration / Script:**
  > "If you already understand tree recursion and Backtracking, you already know 90% of Dynamic Programming. The only flaw of pure recursion is amnesia: it solves the exact same subproblem thousands of times. Memoization hands it a notepad."

### [02:00 - 04:45] Defining the State and Computing Big-O in 5 Seconds
- **On-Screen Visual / Slide Cue:** On-screen formula: Time Complexity = (# of Unique States) x (Work per Transition).
- **Narration / Script:**
  > "To find the time complexity of any Memoization function, count how many possible values your function parameters can take and multiply by the work inside a single call."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#70. Climbing Stairs** | `Easy` | [https://leetcode.com/problems/climbing-stairs/](https://leetcode.com/problems/climbing-stairs/) | `dfs(i) = dfs(i + 1) + dfs(i + 2)` with `memo` prunes the Fibonacci tree from O(2^N) down to O(N). |
| **#198. House Robber** | `Medium` | [https://leetcode.com/problems/house-robber/](https://leetcode.com/problems/house-robber/) | Binary choice at each index: `max(dfs(i + 1), nums[i] + dfs(i + 2))`. |
| **#494. Target Sum** | `Medium` | [https://leetcode.com/problems/target-sum/](https://leetcode.com/problems/target-sum/) | 2-parameter state `dfs(i, current_sum)` cached by tuple `(i, current_sum)`. |

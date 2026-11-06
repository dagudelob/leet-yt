# Episode #01: Basic DSA & Big-O Complexity
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 1 — Algorithmic Pattern (`Beginner`)  
> **Flowchart Node Term:** `Basic DSA & Time/Space Complexity`  
> **Recommended Prerequisites:** None (Series Starting Point)

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Frame this as Episode #01 of the 'Leet-YT' series in English. Explain with energy how the Algorithm Decision Flowchart works and reveal the 'Constraint Secret': how looking at the maximum input size N lets you eliminate 80% of wrong algorithms before writing any code.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Basic DSA & Big-O", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (N <= 20 -> O(2^N) | N <= 10^3 -> O(N^2) | N <= 10^5 -> O(N log N) or O(N) | N >= 10^9 -> O(log N) or O(1)) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Basic DSA & Big-O?
The master compass before writing a single line of code: how to read the input constraints (N) of any LeetCode problem to deduce in 5 seconds which time complexity (Big-O) and algorithm family you need.

### Real-World Analogy
> **Visual Intuition:** Imagine delivering packages across a city. If there are 10 packages (N <= 10), you can try every possible route order (O(N!)). If there are 100,000 packages (N <= 10^5), comparing every pair of addresses (O(N^2)) would take months: you need a single linear pass (O(N)) or a sorted route (O(N log N)). Problem constraints are your CPU time budget.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Never memorize thousands of isolated solutions; learn to decode problem signals and constraints.
2. **Key Takeaway #2:** The 10^8 operations-per-second rule bridges the input size N to the maximum allowed Big-O complexity.
3. **Key Takeaway #3:** Space complexity always includes the recursion Call Stack depth.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Basic DSA & Big-O)
- [x] Always as Step 0 before solving any coding interview or competitive programming problem.
- [x] Whenever you check the maximum value of N in the Constraints section (e.g., N <= 10^5 means O(N^2) will trigger Time Limit Exceeded - TLE).
- [x] When deciding whether to trade O(N) extra memory in exchange for reducing time from O(N^2) down to O(N).

### When NOT to Use It (False Positives)
- [!] Do not over-engineer a complex O(N) solution if N <= 50 and a clean O(N^2) or O(N^3) solution runs in 2 milliseconds.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `N <= 20 -> O(2^N) | N <= 10^3 -> O(N^2) | N <= 10^5 -> O(N log N) or O(N) | N >= 10^9 -> O(log N) or O(1)`
- **Average Time Complexity:** `O(1) < O(log N) < O(N) < O(N log N)`
- **Worst-Case Time Complexity:** `O(N^2) < O(2^N) < O(N!)`
- **Space Complexity:** `O(1) auxiliary up to O(N) depending on data structures or recursion call stack`
- **Engineering Note:** Rule of thumb: a modern judge CPU executes ~10^8 simple operations per second.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Read the problem statement and identify the primary input structure (Array, String, Tree, Graph).
2. Jump immediately to the 'Constraints' section and inspect the upper bound of N.
3. Map N to the complexity ceiling table to lock in your target Big-O.
4. Follow the Leet-YT Decision Flowchart to pick the exact pattern.

### Common Bugs & Edge Cases
- **Interview Trap:** Ignoring hidden O(N) costs inside loops—such as array slicing `arr[i:j]` or string concatenation—which silently turn an O(N) loop into O(N^2).
- **Interview Trap:** Forgetting that recursion of depth N consumes O(N) auxiliary Call Stack memory.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def analyze_constraints(n: int) -> str:
    """
    Constraint-to-Complexity translator for coding interviews.
    Rule of thumb: ~10^8 simple operations per second.
    """
    if n <= 11:
        return "O(N!) - Permutations / Exhaustive Backtracking"
    elif n <= 20:
        return "O(2^N) or O(N * 2^N) - Subsets / Bitmask DP"
    elif n <= 500:
        return "O(N^3) - Floyd-Warshall / Interval DP"
    elif n <= 5_000:
        return "O(N^2) - Nested loops / 2D Dynamic Programming"
    elif n <= 200_000:
        return "O(N log N) or O(N) - Sorting, Heap, Two Pointers, Sliding Window, Hash"
    else:
        return "O(log N) or O(1) - Binary Search or Closed-Form Math"
```

### TypeScript / JavaScript Template
```typescript
export function analyzeConstraints(n: number): string {
  // Rule of thumb: ~10^8 simple operations per second
  if (n <= 11) return "O(N!) - Permutations / Backtracking";
  if (n <= 20) return "O(2^N) - Subsets / Bitmask DP";
  if (n <= 500) return "O(N^3) - Cubic DP / Floyd-Warshall";
  if (n <= 5000) return "O(N^2) - Nested loops / 2D DP";
  if (n <= 200000) return "O(N log N) or O(N) - Sorting, Heap, Two Pointers, Hash";
  return "O(log N) or O(1) - Binary Search or Direct Math Formula";
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:15] Hook: Why We Freeze in Coding Interviews
- **On-Screen Visual / Slide Cue:** Show the full Leet-YT Decision Flowchart lighting up from root to leaf nodes.
- **Narration / Script:**
  > "Have you ever opened a coding interview problem, stared at a blank editor, and wondered where to even begin? The number one mistake is guessing code before reading the clues the problem gives you for free."

### [01:15 - 03:30] The Golden Rule: Decoding Constraints (N)
- **On-Screen Visual / Slide Cue:** Animated table comparing N <= 20, N <= 10^3, N <= 10^5, and N <= 10^9 against execution times.
- **Narration / Script:**
  > "Online judges execute roughly one hundred million operations per second. That means if N is one hundred thousand, a nested O(N^2) loop performs ten billion operations and hits Time Limit Exceeded. Just seeing N <= 10^5 tells you immediately that you need O(N) or O(N log N)."

### [03:30 - 06:00] How to Navigate the 46-Node Flowchart
- **On-Screen Visual / Slide Cue:** Visual walkthrough across the 7 progressive levels of the platform.
- **Narration / Script:**
  > "Across this series, we will master all 46 core building blocks—from Arrays and Two Pointers to Dynamic Programming and Segment Trees. Every episode unlocks a new node on the flowchart."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#1480. Running Sum of 1d Array** | `Easy` | [https://leetcode.com/problems/running-sum-of-1d-array/](https://leetcode.com/problems/running-sum-of-1d-array/) | Compare recomputing from index 0 in O(N^2) vs accumulating in a single O(N) pass. |
| **#412. Fizz Buzz** | `Easy` | [https://leetcode.com/problems/fizz-buzz/](https://leetcode.com/problems/fizz-buzz/) | Single linear O(N) scan and output memory analysis. |
| **#1342. Number of Steps to Reduce a Number to Zero** | `Easy` | [https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/](https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/) | Dividing by 2 repeatedly introduces logarithmic time complexity O(log N). |

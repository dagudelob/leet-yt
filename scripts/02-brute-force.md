# Episode #02: Brute Force & Exhaustive Search
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 1 — Algorithmic Pattern (`Beginner`)  
> **Flowchart Node Term:** `Brute Force & Exhaustive Search`  
> **Recommended Prerequisites:** Basic DSA & Big-O

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain why Brute Force is NOT a failure in a coding interview, but the essential first stepping stone. Show how stating the brute force clearly in 30 seconds reveals the bottleneck that leads to Hash Maps or Two Pointers.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Brute Force", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (N <= 200 for triple loops | N <= 2000 for double loops) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Brute Force?
Systematically enumerating every candidate configuration and checking which ones satisfy the problem condition. It is the mandatory starting point in every interview before optimizing.

### Real-World Analogy
> **Visual Intuition:** Opening a 3-digit combination lock by testing 000, 001, 002 all the way to 999 one by one. It is not fancy, but it guarantees 100% that you will find the answer and clarifies the exact rules of the lock.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Stating the brute-force baseline first shows structured thinking and confirms you understood the problem.
2. **Key Takeaway #2:** Every optimization (Hash Map, Sliding Window, DP) comes from asking: 'What repeated work is my brute force doing?'

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Brute Force)
- [x] When N is very small (e.g., N <= 100 for O(N^2) or N <= 10 for O(N!)).
- [x] During the first 2 minutes of an interview to establish a working baseline and pinpoint redundant work to optimize.
- [x] To generate small stress-tests and verify your optimized algorithm produces the exact same output.

### When NOT to Use It (False Positives)
- [!] When N >= 10^4 and your brute force checks all pairs O(N^2) or all subsets O(2^N).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `N <= 200 for triple loops | N <= 2000 for double loops`
- **Average Time Complexity:** `O(N^2) or O(N^3) for pairs/triplets`
- **Worst-Case Time Complexity:** `O(2^N) or O(N!) for combinatorial search`
- **Space Complexity:** `O(1) when iterating with indices`
- **Engineering Note:** Directly proportional to the total number of candidate states.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Define what a single 'candidate solution' looks like (a pair of indices, a subarray, a subset).
2. Write nested loops that enumerate all unique candidates without duplicates (`j = i + 1`).
3. Validate each candidate and update the best answer.
4. Identify the innermost loop to optimize with a data structure.

### Common Bugs & Edge Cases
- **Interview Trap:** Starting `j` at `0` instead of `i + 1`, which uses the same element twice or counts duplicate pairs.
- **Interview Trap:** Sitting in silence trying to invent a clever O(N) trick without first securing the O(N^2) baseline.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def two_sum_brute_force(nums: list[int], target: int) -> list[int]:
    """
    Enumerates every unique pair (i, j) with i < j.
    Time: O(N^2) | Space: O(1)
    """
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```

### TypeScript / JavaScript Template
```typescript
export function twoSumBruteForce(nums: number[], target: number): number[] {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:00] The Myth That Brute Force Is Bad
- **On-Screen Visual / Slide Cue:** Side-by-side comparison: a silent stuck candidate vs one who states the O(N^2) baseline in 30 seconds.
- **Narration / Teleprompter Script:**
  > "Many candidates think mentioning Brute Force in an interview loses points. In reality, it is your compass: you cannot optimize a bottleneck until you can see the bottleneck."

### [01:00 - 03:30] Anatomy of Pair and Triplet Enumeration
- **On-Screen Visual / Slide Cue:** Animation of indices i and j scanning an upper-triangular grid.
- **Narration / Teleprompter Script:**
  > "When we scan pairs with i from 0 and j from i+1, we inspect N*(N-1)/2 combinations. Seeing that inner loop search for a complement makes it obvious why Hash Maps and Two Pointers exist."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #03, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: N <= 200 for triple loops | N <= 2000 for double loops`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Brute Force interview problems with nested loops! When constraints reach N <= 200 for triple loops | N <= 2000 for double loops, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Brute Force as Opening a 3-digit combination lock by testing 000, 001, 002 all the way to 999 one by one. It is not fancy, but it guarantees 100% that you will find the answer and clarifies the exact rules of the lock.. First, define what a single 'candidate solution' looks like (a pair of indices, a subarray, a subset). Then, write nested loops that enumerate all unique candidates without duplicates (`j = i + 1`). This collapses your time complexity from an unviable brute-force right down to O(N^2) or O(N^3) for pairs/triplets! Watch out for the trap though: starting `j` at `0` instead of `i + 1`, which uses the same element twice or counts duplicate pairs."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#1. Two Sum** | `Easy` | [https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/) | Start with the O(N^2) nested loop and notice that the inner lookup for `target - nums[i]` can be accelerated. |
| **#1534. Count Good Triplets** | `Easy` | [https://leetcode.com/problems/count-good-triplets/](https://leetcode.com/problems/count-good-triplets/) | With N <= 100, the O(N^3) triple loop is the direct expected solution. |
| **#2367. Number of Arithmetic Triplets** | `Easy` | [https://leetcode.com/problems/number-of-arithmetic-triplets/](https://leetcode.com/problems/number-of-arithmetic-triplets/) | Compare O(N^3) brute force against O(N) set lookup. |

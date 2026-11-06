# Episode #34: Greedy Algorithms
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 6 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Greedy Algorithms`  
> **Recommended Prerequisites:** Sorting + Intervals -> Heaps (Priority Queue)

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Contrast Greedy with Dynamic Programming: in DP we distrust single choices and cache all subproblems; in Greedy we prove a local rule works and never look back. Show how to test in 30 seconds whether a problem is Greedy or DP by trying to construct a small counterexample.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Greedy", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Optimization with N <= 10^5 where the greedy exchange property holds) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Greedy?
Making the locally optimal choice at each step without looking back or exploring alternative branches—when the problem satisfies the greedy choice property, this leads directly to the global optimum in O(N) or O(N log N) time.

### Real-World Analogy
> **Visual Intuition:** Fitting the maximum number of meetings into your day: the provably optimal greedy rule is always picking the meeting that **finishes earliest**, freeing up your room as soon as possible for future meetings.

### Key Takeaways to Remember
1. **Key Takeaway #1:** For maximum non-overlapping intervals, sorting by END time (`x[1]`) is provably optimal; sorting by start time fails when an early meeting lasts all day.
2. **Key Takeaway #2:** In `Jump Game` and `Gas Station`, tracking a running frontier eliminates entire ranges in a single O(N) pass.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Greedy)
- [x] Reachability and jump problems (`Jump Game I & II`: tracking `max_reach = max(max_reach, i + nums[i])`).
- [x] **Interval Scheduling**: Selecting the maximum number of non-overlapping intervals by sorting by **END time (`x[1]`)**.
- [x] Greedy pairing after sorting (`Boats to Save People`, `Gas Station`, `Candy`, `Partition Labels`).

### When NOT to Use It (False Positives)
- [!] When a greedy early choice blocks a much better future combination (e.g., `0/1 Knapsack` or `Coin Change` with coins `[1, 3, 4]` for target `6`, where greedy picks `4+1+1` (3 coins) instead of `3+3` (2 coins)). When greedy fails a counterexample, use **Dynamic Programming**.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Optimization with N <= 10^5 where the greedy exchange property holds`
- **Average Time Complexity:** `O(N) single scan | O(N log N) when sorting first`
- **Worst-Case Time Complexity:** `O(N log N)`
- **Space Complexity:** `O(1) auxiliary space`
- **Engineering Note:** Always test your greedy hypothesis against a small 3-element counterexample before coding.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Formulate the candidate greedy rule (e.g., earliest finish time, furthest reach, largest ratio).
2. Try to break it with a 3-element counterexample. If no counterexample exists, code it in O(N) or O(N log N).

### Common Bugs & Edge Cases
- **Interview Trap:** Applying Greedy to `Coin Change` with arbitrary denominations or `House Robber`, where picking the largest immediate value blocks two neighbors that sum to more.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def can_jump_greedy(nums: list[int]) -> bool:
    """
    Greedy Maximum Reach Pattern (Jump Game).
    Instead of O(N^2) DP over all jumps, track the furthest index reachable so far.
    Time: O(N) | Space: O(1)
    """
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False  # Index 'i' is unreachable!
        max_reach = max(max_reach, i + jump)
    return True


def max_non_overlapping_intervals(intervals: list[list[int]]) -> int:
    """
    Greedy Interval Scheduling: Sort by END time (x[1]), never start time!
    """
    intervals.sort(key=lambda x: x[1])
    count = 0
    last_end = float("-inf")
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count
```

### TypeScript / JavaScript Template
```typescript
export function canJumpGreedy(nums: number[]): boolean {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] Greedy vs DP: When Can You Trust a Local Choice?
- **On-Screen Visual / Slide Cue:** A climber picking the steepest immediate step vs a map showing all paths.
- **Narration / Script:**
  > "A Greedy algorithm makes the best decision right now and never looks in the rearview mirror. When the greedy exchange property holds, it turns problems that look like Dynamic Programming into a simple O(N) scan with O(1) memory."

### [01:45 - 04:30] Jump Game, Gas Station, and Sorting by End Time
- **On-Screen Visual / Slide Cue:** Animation of `max_reach` advancing like a wave across the cells of Jump Game.
- **Narration / Script:**
  > "In Jump Game, we do not care which exact sequence of jumps we took—we only care about the furthest index reachable so far."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#55. Jump Game** | `Medium` | [https://leetcode.com/problems/jump-game/](https://leetcode.com/problems/jump-game/) | Track the furthest reachable index `max_reach = max(max_reach, i + nums[i])`. |
| **#134. Gas Station** | `Medium` | [https://leetcode.com/problems/gas-station/](https://leetcode.com/problems/gas-station/) | If `sum(gas) >= sum(cost)`, a unique start exists; whenever `tank < 0` at `i`, reset start to `i + 1`. |
| **#763. Partition Labels** | `Medium` | [https://leetcode.com/problems/partition-labels/](https://leetcode.com/problems/partition-labels/) | Precompute the last index of each character and extend the current partition end to `max(end, last_pos[ch])`. |

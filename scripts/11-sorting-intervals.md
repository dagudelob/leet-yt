# Episode #11: Sorting + Interval Scan (Merge Intervals)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 2 — Algorithmic Pattern (`Beginner`)  
> **Flowchart Node Term:** `Sorting & Merge Intervals`  
> **Recommended Prerequisites:** Arrays -> Basic DSA & Big-O

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Visually walk through the 3 relative positions of two intervals sorted by start time: 1) Disjoint (`curr.start > prev.end`), 2) Partial overlap, and 3) Complete containment (`[1, 10]` and `[2, 5]`), explaining why `max(prev.end, curr.end)` is mandatory.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Sorting + Intervals", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (List of [start, end] pairs with N <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Sorting + Intervals?
Sorting segments `[start, end]` by start time so that any overlapping intervals become adjacent, allowing us to merge overlaps, insert intervals, or detect free gaps in a single linear sweep.

### Real-World Analogy
> **Visual Intuition:** Organizing your daily meeting calendar: if sticky notes with meeting times are scattered across your desk, spotting conflicts is hard. Once you line them up chronologically from 8:00 AM to 6:00 PM, you only need to compare each meeting against the one immediately before it.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Sorting by `start` guarantees that overlapping intervals sit next to each other.
2. **Key Takeaway #2:** Once sorted by start, the universal overlap check is simply `curr.start <= prev.end`.
3. **Key Takeaway #3:** Always update the merged end as `max(prev.end, curr.end)` because the earlier interval might completely contain the later one.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Sorting + Intervals)
- [x] The input is a list of intervals `[start, end]`, meeting times, reservations, or 1D line segments.
- [x] You need to merge overlapping intervals (`Merge Intervals`), insert a new interval, or find free time gaps.

### When NOT to Use It (False Positives)
- [!] If asked for the MAXIMUM number of non-overlapping intervals (`Non-overlapping Intervals` / Interval Scheduling), sort by **END time (`x[1]`)** rather than start time.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `List of [start, end] pairs with N <= 10^5`
- **Average Time Complexity:** `O(N log N) dominated by the initial sort`
- **Worst-Case Time Complexity:** `O(N log N)`
- **Space Complexity:** `O(N) to store the merged output list`
- **Engineering Note:** The linear merge sweep after sorting takes only O(N).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Sort intervals in ascending order by their start coordinate `x[0]`.
2. Initialize `merged = [intervals[0]]`.
3. For each subsequent interval, compare `start` against `merged[-1][1]`.
4. If `start <= merged[-1][1]`, update `merged[-1][1] = max(merged[-1][1], end)`; otherwise append `[start, end]`.

### Common Bugs & Edge Cases
- **Interview Trap:** Writing `merged[-1][1] = end` instead of `max(merged[-1][1], end)`, which breaks when `[1, 10]` is followed by `[2, 3]`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """
    Canonical Merge Intervals Pattern:
    1. Sort by start time: key=lambda x: x[0]
    2. Overlap condition: curr_start <= prev_end
    Time: O(N log N) | Space: O(N)
    """
    if not intervals:
        return []

    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        prev_end = merged[-1][1]
        if start <= prev_end:
            # Overlap: extend the end using max() in case one interval wraps the other
            merged[-1][1] = max(prev_end, end)
        else:
            merged.append([start, end])

    return merged
```

### TypeScript / JavaScript Template
```typescript
export function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [[...intervals[0]]];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:30] Taming Interval Chaos with a Single Sort
- **On-Screen Visual / Slide Cue:** Scattered horizontal bars aligning left-to-right after sorting by start time.
- **Narration / Teleprompter Script:**
  > "Comparing every interval against every other interval takes O(N^2). But the moment we sort them by start time, any overlap can only happen with the immediately preceding merged interval."

### [01:30 - 04:00] The `start <= prev_end` Check and the Containment Trap
- **On-Screen Visual / Slide Cue:** Interval [1, 10] swallowing interval [2, 5] while keeping the right endpoint at 10.
- **Narration / Teleprompter Script:**
  > "The most common bug in interval interviews is overwriting the end blindly. What if the first interval runs from 1 to 10 and the second runs from 2 to 5? Always take the maximum of both endpoints."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #12, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: List of [start, end] pairs with N <= 10^5`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Sorting + Intervals interview problems with nested loops! When constraints reach List of [start, end] pairs with N <= 10^5, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Sorting + Intervals as Organizing your daily meeting calendar: if sticky notes with meeting times are scattered across your desk, spotting conflicts is hard. Once you line them up chronologically from 8:00 AM to 6:00 PM, you only need to compare each meeting against the one immediately before it.. First, sort intervals in ascending order by their start coordinate `x[0]`. Then, initialize `merged = [intervals[0]]`. This collapses your time complexity from an unviable brute-force right down to O(N log N) dominated by the initial sort! Watch out for the trap though: writing `merged[-1][1] = end` instead of `max(merged[-1][1], end)`, which breaks when `[1, 10]` is followed by `[2, 3]`."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#56. Merge Intervals** | `Medium` | [https://leetcode.com/problems/merge-intervals/](https://leetcode.com/problems/merge-intervals/) | Sort by `start` and merge whenever `curr.start <= merged[-1].end` using `max(prev_end, curr_end)`. |
| **#57. Insert Interval** | `Medium` | [https://leetcode.com/problems/insert-interval/](https://leetcode.com/problems/insert-interval/) | Split into 3 phases: intervals ending before `new`, intervals overlapping `new`, and intervals starting after `new`. |
| **#435. Non-overlapping Intervals** | `Medium` | [https://leetcode.com/problems/non-overlapping-intervals/](https://leetcode.com/problems/non-overlapping-intervals/) | Sort by `end` time (or on collision keep the interval that finishes earliest). |

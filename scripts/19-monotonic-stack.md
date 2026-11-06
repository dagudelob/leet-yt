# Episode #19: Monotonic Stack & Monotonic Deque
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 3 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Monotonic Stack & Monotonic Deque`  
> **Recommended Prerequisites:** Stacks (LIFO) -> Queues & Deques

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Demystify the Monotonic Stack—a topic that intimidates many candidates yet boils down to a 10-line template. Emphasize the golden rule: 'Always push INDICES onto the stack, not just values', and show how popping reveals both the right and left boundaries of a bar in `Largest Rectangle in Histogram`.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Monotonic Stack", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Next Greater/Smaller Element, Histograms, or Sliding Window Maximum with N <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Monotonic Stack?
Maintaining a stack or deque whose elements are kept strictly sorted (increasing or decreasing). Whenever a new element breaks the monotonic order, we pop smaller/larger elements from the top—resolving the 'Next Greater or Smaller Element' for every index in O(N) total time.

### Real-World Analogy
> **Visual Intuition:** A line of buildings facing the ocean: when a tall new skyscraper is built in front, it blocks the view of all shorter buildings behind it. Those shorter buildings can never be the 'tallest visible building' for anyone further back, so we can pop and retire them immediately.

### Key Takeaways to Remember
1. **Key Takeaway #1:** To find the **Next Greater** element, maintain a **Monotonic Decreasing** stack: the first larger element triggers pops.
2. **Key Takeaway #2:** To find the **Next Smaller** element, maintain a **Monotonic Increasing** stack.
3. **Key Takeaway #3:** Always store INDICES in the stack so you can compute widths (`i - prev_idx`) and look up values (`nums[i]`).

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Monotonic Stack)
- [x] Finding the **Next Greater Element**, **Next Smaller Element**, or **Previous Greater/Smaller Element** for every index `i` (`Daily Temperatures`, `Next Greater Element`).
- [x] Finding the largest rectangle in a histogram (`Largest Rectangle in Histogram`) or trapped rainwater (`Trapping Rain Water`).
- [x] **Monotonic Deque**: Finding the maximum or minimum inside a sliding window of length `K` in O(N) time (`Sliding Window Maximum`).

### When NOT to Use It (False Positives)
- [!] If you only need the global running maximum or minimum from index 0 to `i` (a single variable `max_so_far` suffices).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Next Greater/Smaller Element, Histograms, or Sliding Window Maximum with N <= 10^5`
- **Average Time Complexity:** `O(N)`
- **Worst-Case Time Complexity:** `O(N)`
- **Space Complexity:** `O(N) for the stack of indices`
- **Engineering Note:** Each index is pushed onto the stack once and popped at most once (at most 2N operations total).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Initialize `stack = []` to hold indices waiting for their next greater/smaller match.
2. For each index `i`, run `while stack and nums[i] > nums[stack[-1]]:` to pop and resolve waiting indices.
3. Push the current index `stack.append(i)`.

### Common Bugs & Edge Cases
- **Interview Trap:** Pushing raw values `nums[i]` instead of indices `i`, making it impossible to calculate distances or histogram widths.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def daily_temperatures(temps: list[int]) -> list[int]:
    """
    Universal Monotonic Decreasing Stack Template (always store INDICES, not raw values).
    Finds for each day how many days until the next warmer temperature.
    Time: O(N) | Space: O(N)
    """
    n = len(temps)
    ans = [0] * n
    stack: list[int] = []  # Stack of indices with strictly decreasing temperatures

    for i, curr_temp in enumerate(temps):
        # While today's temperature is WARMER than the day at the top of the stack,
        # today 'i' is the Next Greater Element for stack[-1]!
        while stack and curr_temp > temps[stack[-1]]:
            prev_idx = stack.pop()
            ans[prev_idx] = i - prev_idx
        stack.append(i)

    return ans
```

### TypeScript / JavaScript Template
```typescript
export function dailyTemperatures(temps: number[]): number[] {
  const n = temps.length;
  const ans = new Array<number>(n).fill(0);
  const stack: number[] = []; // Stores indices

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
      const prevIdx = stack.pop()!;
      ans[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return ans;
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:45] The Skyscraper Intuition: What Is a Monotonic Stack?
- **On-Screen Visual / Slide Cue:** Bars of varying heights; when a tall bar arrives, shorter waiting bars pop and record their distance.
- **Narration / Teleprompter Script:**
  > "If you want to know for every day of the year how soon a warmer day will arrive, checking every future day takes O(N^2). With a Monotonic Stack, cooler days wait in line until a warm day arrives and resolves all of them in a single O(N) sweep."

### [01:45 - 04:45] Histograms and Sliding Window Maximum (Monotonic Deque)
- **On-Screen Visual / Slide Cue:** Animation of `Largest Rectangle in Histogram` and `Sliding Window Maximum` with a decreasing Deque.
- **Narration / Teleprompter Script:**
  > "The magic of an increasing stack is that when a bar is popped because a shorter bar arrived, the incoming bar is its right boundary and the new stack top below it is its left boundary."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #20, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Next Greater/Smaller Element, Histograms, or Sliding Window Maximum with N <= 10^5`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Monotonic Stack interview problems with nested loops! When constraints reach Next Greater/Smaller Element, Histograms, or Sliding Window Maximum with N <= 10^5, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Monotonic Stack as A line of buildings facing the ocean: when a tall new skyscraper is built in front, it blocks the view of all shorter buildings behind it. Those shorter buildings can never be the 'tallest visible building' for anyone further back, so we can pop and retire them immediately.. First, initialize `stack = []` to hold indices waiting for their next greater/smaller match. Then, for each index `i`, run `while stack and nums[i] > nums[stack[-1]]:` to pop and resolve waiting indices. This collapses your time complexity from an unviable brute-force right down to O(N)! Watch out for the trap though: pushing raw values `nums[i]` instead of indices `i`, making it impossible to calculate distances or histogram widths."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#739. Daily Temperatures** | `Medium` | [https://leetcode.com/problems/daily-temperatures/](https://leetcode.com/problems/daily-temperatures/) | Monotonic decreasing stack of indices: pop whenever `temps[i] > temps[stack[-1]]`. |
| **#84. Largest Rectangle in Histogram** | `Hard` | [https://leetcode.com/problems/largest-rectangle-in-histogram/](https://leetcode.com/problems/largest-rectangle-in-histogram/) | Monotonic increasing stack: when a shorter bar arrives, popped bars know both their left and right smaller boundaries. |
| **#239. Sliding Window Maximum** | `Hard` | [https://leetcode.com/problems/sliding-window-maximum/](https://leetcode.com/problems/sliding-window-maximum/) | Monotonic decreasing Deque: pop smaller elements from the back and evict out-of-window indices `< i - k + 1` from the front. |

# Episode #07: Sliding Window (Fixed & Dynamic)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 1 — Algorithmic Pattern (`Beginner`)  
> **Flowchart Node Term:** `Sliding Window (Fixed & Dynamic)`  
> **Recommended Prerequisites:** Arrays -> Strings -> Two Pointers

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Teach the 'Universal 3-Step Sliding Window Template' (1. Expand with `right`, 2. Shrink with `while` from `left`, 3. Update answer). Explain the difference between finding the LONGEST valid window (update outside the `while`) vs the SHORTEST valid window (update inside the `while`), and why a `while` inside a `for` is still O(N) amortized.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Sliding Window", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Optimal contiguous subarray/substring with N <= 10^5 (and non-negative values for sum windows)) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Sliding Window?
Maintaining a contiguous subsegment `[left..right]` that glides across an array or string like a caterpillar: expanding on the right (`right++`) and shrinking from the left (`left++`) whenever the window constraint is violated, achieving O(N) time.

### Real-World Analogy
> **Visual Intuition:** A caterpillar crawling along a branch: it stretches its head forward (`right`) to include new leaves while the window is valid, and whenever it exceeds its limit, it pulls its tail forward (`left`) until the rule is restored—without ever recounting the leaves in the middle.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Trigger keywords: 'contiguous subarray' or 'substring' + 'longest / shortest / maximum sum'.
2. **Key Takeaway #2:** Amortized O(N) complexity: each element enters the window once via `right` and leaves at most once via `left`.
3. **Key Takeaway #3:** For longest window: shrink while INVALID, then record length. For shortest window: record length and shrink while VALID.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Sliding Window)
- [x] The problem asks for the longest, shortest, or optimal CONTIGUOUS subarray or substring satisfying a condition.
- [x] Fixed-size window `K`: 'Find the maximum sum or average of any contiguous subarray of length K'.
- [x] Dynamic-size window: 'Longest substring without repeating characters' or 'Smallest subarray with sum >= S'.

### When NOT to Use It (False Positives)
- [!] WARNING: If the array contains NEGATIVE numbers and the condition depends on subarray sum, adding elements to the right can decrease the sum, breaking monotonicity! For negative numbers, use `Prefix Sum + Hash Map`.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Optimal contiguous subarray/substring with N <= 10^5 (and non-negative values for sum windows)`
- **Average Time Complexity:** `O(N)`
- **Worst-Case Time Complexity:** `O(N)`
- **Space Complexity:** `O(1) or O(K) for the window frequency counter`
- **Engineering Note:** Even though there is a `while` loop inside a `for` loop, `left` and `right` each move forward at most N times (at most 2N total operations).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Initialize `left = 0`, the window state (running sum or frequency map), and the best answer.
2. Iterate `right` from `0` to `N-1`, adding `nums[right]` into the window state.
3. Use a `while` loop to advance `left` and remove `nums[left]` whenever the window needs adjustment.
4. Compute the window size using `right - left + 1`.

### Common Bugs & Edge Cases
- **Interview Trap:** Using sum-based Sliding Window when the array contains negative numbers (e.g., LeetCode 560 Subarray Sum Equals K). With negatives, use Prefix Sum + Hash Map.
- **Interview Trap:** Off-by-one error on window length: the number of elements from `left` to `right` inclusive is `right - left + 1`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def sliding_window_dynamic(s: str) -> int:
    """
    Universal 3-Step Dynamic Sliding Window Template
    (e.g., Longest Substring Without Repeating Characters).
    Time: O(N) | Space: O(alphabet)
    """
    window_counts: dict[str, int] = {}
    left = 0
    max_len = 0

    for right, ch in enumerate(s):
        # 1. EXPAND window by including s[right]
        window_counts[ch] = window_counts.get(ch, 0) + 1

        # 2. SHRINK from 'left' while window violates the invariant
        while window_counts[ch] > 1:
            left_ch = s[left]
            window_counts[left_ch] -= 1
            left += 1

        # 3. UPDATE best answer on valid window [left..right]
        max_len = max(max_len, right - left + 1)

    return max_len
```

### TypeScript / JavaScript Template
```typescript
export function slidingWindowDynamic(s: string): number {
  const counts = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    counts.set(ch, (counts.get(ch) ?? 0) + 1);

    // Shrink while window invariant is broken
    while ((counts.get(ch) ?? 0) > 1) {
      const leftCh = s[left];
      counts.set(leftCh, (counts.get(leftCh) ?? 1) - 1);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:30] The Caterpillar Mental Model: Stop Recomputing Sums
- **On-Screen Visual / Slide Cue:** Glowing frame sliding across an array: adding the right element and subtracting the left element.
- **Narration / Teleprompter Script:**
  > "If you just summed five elements and slide your window one step right, why re-add the four elements in the middle? Just add the new element entering on the right and subtract the old one leaving on the left. That is Sliding Window."

### [01:30 - 04:30] The 10-Line Universal Dynamic Window Template
- **On-Screen Visual / Slide Cue:** Code highlighted in 3 blocks: Expand, Shrink, and Update.
- **Narration / Teleprompter Script:**
  > "Ninety-five percent of dynamic sliding window problems fall to the exact same ten-line template: a `for` loop advancing `right`, and an inner `while` loop advancing `left` whenever our rule is broken."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #08, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Optimal contiguous subarray/substring with N <= 10^5 (and non-negative values for sum windows)`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Sliding Window interview problems with nested loops! When constraints reach Optimal contiguous subarray/substring with N <= 10^5 (and non-negative values for sum windows), your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Sliding Window as A caterpillar crawling along a branch: it stretches its head forward (`right`) to include new leaves while the window is valid, and whenever it exceeds its limit, it pulls its tail forward (`left`) until the rule is restored—without ever recounting the leaves in the middle.. First, initialize `left = 0`, the window state (running sum or frequency map), and the best answer. Then, iterate `right` from `0` to `n-1`, adding `nums[right]` into the window state. This collapses your time complexity from an unviable brute-force right down to O(N)! Watch out for the trap though: using sum-based sliding window when the array contains negative numbers (e.g., leetcode 560 subarray sum equals k). with negatives, use prefix sum + hash map."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#3. Longest Substring Without Repeating Characters** | `Medium` | [https://leetcode.com/problems/longest-substring-without-repeating-characters/](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Expand `right` and shrink `left` whenever the newly added character's count exceeds 1. |
| **#209. Minimum Size Subarray Sum** | `Medium` | [https://leetcode.com/problems/minimum-size-subarray-sum/](https://leetcode.com/problems/minimum-size-subarray-sum/) | For a MINIMUM window, update the answer INSIDE the `while` loop while the sum is valid and shrink `left`. |
| **#424. Longest Repeating Character Replacement** | `Medium` | [https://leetcode.com/problems/longest-repeating-character-replacement/](https://leetcode.com/problems/longest-repeating-character-replacement/) | Window `[left..right]` is valid as long as `(right - left + 1) - max_freq <= k`. |

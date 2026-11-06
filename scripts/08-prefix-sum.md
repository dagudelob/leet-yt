# Episode #08: Prefix Sums (1D, 2D & Subarray Sum = K)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 2 — Algorithmic Pattern (`Beginner`)  
> **Flowchart Node Term:** `Prefix Sums`  
> **Recommended Prerequisites:** Arrays

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
First explain the odometer intuition for 1D Prefix Sums with the leading-zero sentinel trick (`N + 1` length). Then dedicate the core of the episode to the interview favorite: 'Prefix Sum + Hash Map' (LeetCode 560), showing why it succeeds with negative numbers where Sliding Window fails.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Prefix Sums", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Q <= 10^5 range sum queries or Subarray Sum = K with negative numbers) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Prefix Sums?
Precomputing cumulative sums from the start of an array in O(N) so that any range sum query `[L, R]` can be answered in instant O(1) time via simple subtraction: `prefix[R + 1] - prefix[L]`.

### Real-World Analogy
> **Visual Intuition:** A car's odometer on a highway trip: if the odometer read 10,200 km at Town A and 10,350 km at Town B, you know instantly that the distance between A and B is `10,350 - 10,200 = 150 km` without re-measuring every kilometer in between.

### Key Takeaways to Remember
1. **Key Takeaway #1:** With a leading zero sentinel (`pref = [0] * (n + 1)`), the sum of `nums[L..R]` is always `pref[R + 1] - pref[L]` with zero edge cases.
2. **Key Takeaway #2:** Any subarray sum `nums[i..j]` is the difference between two prefix sums: `pref[j + 1] - pref[i]`.
3. **Key Takeaway #3:** Combining Prefix Sum with a Hash Map turns 'find a subarray summing to K' into `Two Sum` on prefix sums.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Prefix Sums)
- [x] Answering multiple range sum or range XOR queries `[L, R]` on a static array in O(1) per query.
- [x] Counting or finding subarrays that sum to `K` when **negative numbers ARE present** (combining `Prefix Sum + Hash Map`).
- [x] Computing the sum of any 2D rectangular submatrix in O(1) using 2D inclusion-exclusion.

### When NOT to Use It (False Positives)
- [!] If the array values are frequently mutated between range queries (`update(i, val)` + `rangeSum(L, R)`): updating a Prefix Sum takes O(N). Use a Fenwick Tree or Segment Tree instead.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Q <= 10^5 range sum queries or Subarray Sum = K with negative numbers`
- **Average Time Complexity:** `Build: O(N) | Range Query `[L, R]`: O(1)`
- **Worst-Case Time Complexity:** `O(N) total`
- **Space Complexity:** `O(N) for the prefix array or hash map`
- **Engineering Note:** Padding with a leading zero (`prefix = [0] * (n + 1)`) eliminates all `if L == 0` boundary checks.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Allocate `pref` of length `N + 1` initialized to 0.
2. For any range `[L, R]`, return `pref[R + 1] - pref[L]` in O(1).
3. When counting subarrays with sum `K`, maintain a frequency map `{prefix_sum: count}` initialized with `{0: 1}`.

### Common Bugs & Edge Cases
- **Interview Trap:** Forgetting to initialize `seen_prefixes = {0: 1}` in `Subarray Sum Equals K`, which misses every valid subarray that starts at index 0.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
class RangeSumQuery:
    """
    1D Prefix Sum padded with a leading 0 at index 0.
    pref[i] stores the sum of the first i elements: nums[0..i-1].
    """
    def __init__(self, nums: list[int]):
        self.pref = [0] * (len(nums) + 1)
        for i, x in enumerate(nums):
            self.pref[i + 1] = self.pref[i] + x

    def query(self, left: int, right: int) -> int:
        # Sum of nums[left..right] inclusive in O(1)
        return self.pref[right + 1] - self.pref[left]


def subarray_sum_equals_k(nums: list[int], k: int) -> int:
    """
    Star Pattern: Prefix Sum + Hash Map (works with NEGATIVE numbers!).
    If curr_sum - prev_sum == k, then prev_sum == curr_sum - k.
    """
    seen_prefixes = {0: 1}  # Base prefix of sum 0 occurs once
    curr_sum = 0
    count = 0
    for x in nums:
        curr_sum += x
        count += seen_prefixes.get(curr_sum - k, 0)
        seen_prefixes[curr_sum] = seen_prefixes.get(curr_sum, 0) + 1
    return count
```

### TypeScript / JavaScript Template
```typescript
export function subarraySumEqualsK(nums: number[], k: number): number {
  const seenPrefixes = new Map<number, number>([[0, 1]]);
  let currSum = 0;
  let count = 0;

  for (const x of nums) {
    currSum += x;
    count += seenPrefixes.get(currSum - k) ?? 0;
    seenPrefixes.set(currSum, (seenPrefixes.get(currSum) ?? 0) + 1);
  }
  return count;
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:45] The Odometer Analogy and the Leading Zero Sentinel
- **On-Screen Visual / Slide Cue:** Original array on top and `N+1` prefix array below highlighting subtraction of two cells.
- **Narration / Teleprompter Script:**
  > "If someone asks you ten thousand times for the sum between index L and R, looping from L to R every time is way too slow. With Prefix Sums, we do one O(N) pass up front and answer every future query with a single O(1) subtraction."

### [01:45 - 04:45] Prefix Sum + Hash Map: Conquering Negative Numbers
- **On-Screen Visual / Slide Cue:** Line graph rising and falling with negative numbers, highlighting two points separated vertically by K.
- **Narration / Teleprompter Script:**
  > "When negative numbers appear, Sliding Window loses its monotonic compass. By storing every running prefix sum in a Hash Map, asking if a subarray sums to K becomes asking: have I already seen a prefix sum equal to `current_sum - K`?"

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #09, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Q <= 10^5 range sum queries or Subarray Sum = K with negative numbers`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Prefix Sums interview problems with nested loops! When constraints reach Q <= 10^5 range sum queries or Subarray Sum = K with negative numbers, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Prefix Sums as A car's odometer on a highway trip: if the odometer read 10,200 km at Town A and 10,350 km at Town B, you know instantly that the distance between A and B is `10,350 - 10,200 = 150 km` without re-measuring every kilometer in between.. First, allocate `pref` of length `n + 1` initialized to 0. Then, for any range `[l, r]`, return `pref[r + 1] - pref[l]` in o(1). This collapses your time complexity from an unviable brute-force right down to Build: O(N) | Range Query `[L, R]`: O(1)! Watch out for the trap though: forgetting to initialize `seen_prefixes = {0: 1}` in `subarray sum equals k`, which misses every valid subarray that starts at index 0."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#303. Range Sum Query - Immutable** | `Easy` | [https://leetcode.com/problems/range-sum-query-immutable/](https://leetcode.com/problems/range-sum-query-immutable/) | Build a `pref` array of size `N + 1` with `pref[0] = 0`. |
| **#560. Subarray Sum Equals K** | `Medium` | [https://leetcode.com/problems/subarray-sum-equals-k/](https://leetcode.com/problems/subarray-sum-equals-k/) | Store how many times each `curr_sum` has appeared in a Hash Map and look up `curr_sum - k`. |
| **#304. Range Sum Query 2D - Immutable** | `Medium` | [https://leetcode.com/problems/range-sum-query-2d-immutable/](https://leetcode.com/problems/range-sum-query-2d-immutable/) | 2D inclusion-exclusion: `pref[r2][c2] - top - left + top_left_corner`. |

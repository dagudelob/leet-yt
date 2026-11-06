# Episode #10: Counting & Bucket Sort
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 2 — Algorithmic Pattern (`Beginner`)  
> **Flowchart Node Term:** `Counting Sort & Bucket Sort`  
> **Recommended Prerequisites:** Arrays -> Hash Table

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain how we can sort in O(N) time without violating computer science laws (by avoiding pairwise comparisons and indexing directly into buckets). Highlight the 'Bucket Sort by Frequency' pattern for Top K Frequent Elements.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Counting / Buckets", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Bounded value range K <= 10^5 or sorting by frequency (max frequency <= N)) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Counting / Buckets?
Breaking the O(N log N) comparison-sort barrier: when values or frequencies fall within a bounded range `[0..K]`, we can group them into buckets and sort in linear O(N + K) time.

### Real-World Analogy
> **Visual Intuition:** Sorting 500 coins of denominations 1, 5, 10, and 25 cents. Instead of comparing coins two by two (QuickSort/MergeSort), you place 4 labeled boxes on the table, drop each coin into its box in one pass, and collect the boxes in order.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Every comparison-based sort (`<`, `>`) requires at least O(N log N), but Counting/Bucket Sort indexes directly without comparing.
2. **Key Takeaway #2:** Even if input numbers are huge (`-10^9` to `10^9`), their FREQUENCIES are bounded between `1` and `N`, enabling O(N) Bucket Sort by frequency.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Counting / Buckets)
- [x] The range of possible values `K` is small or proportional to `N` (e.g., ages `0..120`, colors `0, 1, 2`, scores `0..100`).
- [x] Sorting elements by their **FREQUENCY of occurrence**: since no element in an array of length `N` can appear more than `N` times, you can allocate `N + 1` buckets indexed by frequency (`Top K Frequent Elements` in O(N)).

### When NOT to Use It (False Positives)
- [!] When values span an huge arbitrary range (e.g., integers up to `10^9`), since allocating `10^9` buckets would exhaust memory.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Bounded value range K <= 10^5 or sorting by frequency (max frequency <= N)`
- **Average Time Complexity:** `O(N + K) where K is the bucket range`
- **Worst-Case Time Complexity:** `O(N + K)`
- **Space Complexity:** `O(N + K) for the bucket array`
- **Engineering Note:** Beats O(N log N) whenever K = O(N).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Identify the bounded quantity (either the element value itself or its frequency count).
2. Allocate a `buckets` list indexed by that bounded value.
3. Scan the buckets in ascending or descending order to collect the sorted output in O(N).

### Common Bugs & Edge Cases
- **Interview Trap:** Initializing buckets in Python with `buckets = [[]] * (n + 1)`—which creates `n + 1` references to the SAME list object. Always use `[[] for _ in range(n + 1)]`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def top_k_frequent_buckets(nums: list[int], k: int) -> list[int]:
    """
    Bucket Sort by Frequency (LeetCode 347) in pure O(N) time without a Heap.
    Since no number can appear more than N times, we create N + 1 buckets.
    """
    freq_map: dict[int, int] = {}
    for x in nums:
        freq_map[x] = freq_map.get(x, 0) + 1

    # buckets[f] stores all numbers that appeared exactly 'f' times
    buckets: list[list[int]] = [[] for _ in range(len(nums) + 1)]
    for num, freq in freq_map.items():
        buckets[freq].append(num)

    result: list[int] = []
    for freq in range(len(nums), 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result
```

### TypeScript / JavaScript Template
```typescript
export function topKFrequentBuckets(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const x of nums) {
    freqMap.set(x, (freqMap.get(x) ?? 0) + 1);
  }

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of freqMap.entries()) {
    buckets[freq].push(num);
  }

  const res: number[] = [];
  for (let f = nums.length; f >= 1; f--) {
    for (const num of buckets[f]) {
      res.push(num);
      if (res.length === k) return res;
    }
  }
  return res;
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:30] Breaking the O(N log N) Speed Limit
- **On-Screen Visual / Slide Cue:** Comparison decision tree O(N log N) vs direct drop into numbered buckets O(N).
- **Narration / Teleprompter Script:**
  > "In CS 101 we learn that sorting takes N log N. But that lower bound only applies when sorting via pairwise comparisons. When your keys or frequencies fall in a bounded range, you can use the numbers themselves as array indices."

### [01:30 - 04:00] Bucket Sort by Frequency (Top-K in Pure O(N))
- **On-Screen Visual / Slide Cue:** Bucket array from 0 to N where each index holds numbers appearing that many times.
- **Narration / Teleprompter Script:**
  > "Even when input integers are arbitrarily large, how many times can any number appear in an array of length N? At most N times. That lets us sort by frequency in 100% linear time."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #11, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Bounded value range K <= 10^5 or sorting by frequency (max frequency <= N)`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Counting / Buckets interview problems with nested loops! When constraints reach Bounded value range K <= 10^5 or sorting by frequency (max frequency <= N), your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Counting / Buckets as Sorting 500 coins of denominations 1, 5, 10, and 25 cents. Instead of comparing coins two by two (QuickSort/MergeSort), you place 4 labeled boxes on the table, drop each coin into its box in one pass, and collect the boxes in order.. First, identify the bounded quantity (either the element value itself or its frequency count). Then, allocate a `buckets` list indexed by that bounded value. This collapses your time complexity from an unviable brute-force right down to O(N + K) where K is the bucket range! Watch out for the trap though: initializing buckets in python with `buckets = [[]] * (n + 1)`—which creates `n + 1` references to the same list object. always use `[[] for _ in range(n + 1)]`."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#347. Top K Frequent Elements** | `Medium` | [https://leetcode.com/problems/top-k-frequent-elements/](https://leetcode.com/problems/top-k-frequent-elements/) | Use `buckets[frequency]` of size `N + 1` to achieve O(N) time instead of O(N log K) with a Heap. |
| **#451. Sort Characters By Frequency** | `Medium` | [https://leetcode.com/problems/sort-characters-by-frequency/](https://leetcode.com/problems/sort-characters-by-frequency/) | Count frequencies and rebuild the string by scanning buckets from `N` down to `1`. |
| **#274. H-Index** | `Medium` | [https://leetcode.com/problems/h-index/](https://leetcode.com/problems/h-index/) | Cap citations larger than `N` into bucket `N` and accumulate from right to left in O(N). |

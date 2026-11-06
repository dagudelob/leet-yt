# Episode #28: Heap Patterns (Top-K, K-Way Merge, Two Heaps & Heap Sort)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 4 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Heap Sort, Top-K, K-Way Merge & Two Heaps`  
> **Recommended Prerequisites:** Heaps (Priority Queue) -> Sorting + Intervals

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain the counter-intuitive Top-K rule: why keeping the K LARGEST elements requires a MIN-Heap of size K (the bouncer at a K-seat VIP lounge only needs to know who the weakest member currently inside is to see if a newcomer beats them), while keeping the K SMALLEST requires a MAX-Heap. Then explain the Two Heaps pattern for live median tracking.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Heap Patterns & Top-K", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint ('Top K', 'K closest', 'Merge K sorted', or 'Median from Data Stream') to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Heap Patterns & Top-K?
The 4 high-yield algorithmic patterns powered by Heaps: 1) **Top-K Elements** (using a Min-Heap of size `K` to keep the `K` largest elements in O(N log K)), 2) **K-Way Merge** (merging `K` sorted streams), 3) **Two Heaps** (Max-Heap + Min-Heap to track the running median), and 4) **Heap Sort**.

### Real-World Analogy
> **Visual Intuition:** To find the 3 fastest runners in a 100,000-person marathon (Top-3), you only need a VIP podium with 3 chairs (a Min-Heap of size 3). Whenever a new runner finishes faster than the slowest person currently sitting on the 3-chair podium, that slowest person gives up their seat. At the end, the 3 chairs hold the top 3 champions.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Inverted Top-K rule: Want the K largest? Use a Min-Heap of size K. Want the K smallest? Use a Max-Heap of size K.
2. **Key Takeaway #2:** In Two Heaps (`Find Median from Data Stream`), the top of the left Max-Heap and the top of the right Min-Heap bracket the exact median in O(1).
3. **Key Takeaway #3:** K-Way Merge keeps 1 head item from each of the K sorted lists inside a Min-Heap to extract the global minimum in O(log K).

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Heap Patterns & Top-K)
- [x] **Top-K Pattern**: 'Find the K largest / smallest / closest / most frequent elements' in O(N log K) time and O(K) memory.
- [x] **K-Way Merge Pattern**: Merging `K` sorted linked lists or arrays, or finding the K-th smallest element in a sorted matrix.
- [x] **Two Heaps Pattern**: Maintaining the **Running Median** of a live stream (a `Max-Heap` for the lower half and a `Min-Heap` for the upper half).

### When NOT to Use It (False Positives)
- [!] Do not mix up which heap to use for Top-K: to keep the **K LARGEST** elements, use a **MIN-HEAP** of size K (so `heappop()` evicts the smallest of the K+1 candidates).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `'Top K', 'K closest', 'Merge K sorted', or 'Median from Data Stream'`
- **Average Time Complexity:** `Top-K: O(N log K) | Two Heaps insert: O(log N), median: O(1) | Heap Sort: O(N log N)`
- **Worst-Case Time Complexity:** `O(N log K) or O(N log N)`
- **Space Complexity:** `O(K) for Top-K and K-Way Merge | O(1) for in-place Heap Sort`
- **Engineering Note:** When K << N, O(N log K) uses far less memory and time than sorting all N items.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. For Top-K: maintain a heap capped at size `K`; whenever `len(heap) > K`, call `heappop`.
2. For Two Heaps: push each new number through `small` into `large`, then rebalance so `len(small)` equals `len(large)` or `len(large) + 1`.

### Common Bugs & Edge Cases
- **Interview Trap:** Pushing all `N` elements into the heap instead of capping its size at `K`, losing the O(K) space and O(N log K) time advantage.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
import heapq

def find_k_largest_with_min_heap(nums: list[int], k: int) -> list[int]:
    """
    Pattern 1: Top-K Largest using a MIN-HEAP of size K.
    Time: O(N log K) | Space: O(K)
    """
    min_heap: list[int] = []
    for x in nums:
        heapq.heappush(min_heap, x)
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Evict the smallest among the K+1 items
    return min_heap


class MedianFinderTwoHeaps:
    """
    Pattern 2: Two Heaps for Streaming Median.
    small: Max-Heap (negated values) storing the smaller half of numbers.
    large: Min-Heap storing the larger half of numbers.
    """
    def __init__(self):
        self.small: list[int] = []  # Max-Heap (negated)
        self.large: list[int] = []  # Min-Heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0
```

### TypeScript / JavaScript Template
```typescript
import { MinHeap } from "./heaps";

export function findKLargest(nums: number[], k: number): number {
  const minHeap = new MinHeap();
  for (const x of nums) {
    minHeap.push(x);
    if (minHeap.size > k) {
      minHeap.pop(); // Evict smallest to retain K largest
    }
  }
  return minHeap.peek()!;
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 02:00] The VIP Podium Paradox: Why Top-K Largest Uses a Min-Heap
- **On-Screen Visual / Slide Cue:** A 3-seat podium where the lowest of the 3 champions sits by the door ready to be replaced.
- **Narration / Script:**
  > "Here is a classic interview riddle: if you want to keep the K largest numbers out of a million items, do you use a Max-Heap or a Min-Heap? You use a Min-Heap of size K—because the member you need to evict whenever someone better arrives is the smallest member of your VIP club."

### [02:00 - 05:00] Two Heaps: Computing the Live Median in O(1)
- **On-Screen Visual / Slide Cue:** Two triangles facing tip-to-tip (Max-Heap below, Min-Heap above) framing the median right in the center.
- **Narration / Script:**
  > "How do you maintain the median when thousands of numbers stream in every second? Split the numbers into two balanced halves: a Max-Heap for the smaller half and a Min-Heap for the larger half. Their two peaks give you the median instantly."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#973. K Closest Points to Origin** | `Medium` | [https://leetcode.com/problems/k-closest-points-to-origin/](https://leetcode.com/problems/k-closest-points-to-origin/) | To keep the K SMALLEST distances, maintain a Max-Heap of size K (`(-dist_sq, x, y)`). |
| **#295. Find Median from Data Stream** | `Hard` | [https://leetcode.com/problems/find-median-from-data-stream/](https://leetcode.com/problems/find-median-from-data-stream/) | Two Heaps: a Max-Heap for the lower half and a Min-Heap for the upper half kept balanced in size. |
| **#373. Find K Pairs with Smallest Sums** | `Medium` | [https://leetcode.com/problems/find-k-pairs-with-smallest-sums/](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) | K-Way Merge using a Min-Heap seeded with `(nums1[i] + nums2[0], i, 0)`. |

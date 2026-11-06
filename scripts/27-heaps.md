# Episode #27: Heaps / Priority Queues (Min-Heap & Max-Heap)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 4 — Data Structure (`Intermediate`)  
> **Flowchart Node Term:** `Binary Heaps & Priority Queues`  
> **Recommended Prerequisites:** Arrays -> Binary Trees

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain how a Binary Heap packs a complete binary tree inside a flat Array without pointers (`left = 2*i + 1`, `right = 2*i + 2`, `parent = (i - 1) // 2`). Explain why bottom-up `heapify` runs in O(N) time and how to simulate a Max-Heap in Python's `heapq` by negating numbers (`-x`).

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Heaps (Priority Queue)", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Repeated extraction of min/max from a changing set with N <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Heaps (Priority Queue)?
A complete binary tree packed compactly inside a flat Array (zero pointers) where every parent is `<=` its children (`Min-Heap`) or `>=` its children (`Max-Heap`). Provides O(1) peek at the extreme element and O(log N) insertion and extraction.

### Real-World Analogy
> **Visual Intuition:** A hospital emergency room triage (Priority Queue): patients are not treated in arrival order like at a bank—the patient with the highest urgency always goes next (`pop` in O(log N)), even if they walked in a minute ago (`push` in O(log N)).

### Key Takeaways to Remember
1. **Key Takeaway #1:** A Heap is NOT fully sorted: it only guarantees that every parent dominates its children so the global extreme sits at `heap[0]`.
2. **Key Takeaway #2:** In Python, `heapq` is a Min-Heap; store `-val` or `(-priority, item)` to turn it into a Max-Heap.
3. **Key Takeaway #3:** `heapq.heapify(arr)` sifts down from the bottom up in linear O(N) time.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Heaps (Priority Queue))
- [x] You need to repeatedly query and extract the **MINIMUM** or **MAXIMUM** element from a dynamic collection that keeps receiving new items.
- [x] Scheduling tasks by earliest deadline or highest priority.
- [x] Internal engine of Dijkstra's shortest path, Prim's MST, and Huffman coding.

### When NOT to Use It (False Positives)
- [!] If the dataset is static and you only need the minimum once (just call `min(nums)` in O(N)).
- [!] If you need to search for an arbitrary middle value: a Heap only exposes its root `heap[0]` in O(1), not arbitrary elements.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Repeated extraction of min/max from a changing set with N <= 10^5`
- **Average Time Complexity:** `Peek (`heap[0]`): O(1) | Push / Pop: O(log N) | `heapify(list)`: O(N)`
- **Worst-Case Time Complexity:** `Push / Pop: O(log N)`
- **Space Complexity:** `O(N) stored in a contiguous array`
- **Engineering Note:** Converting an existing array into a Heap via `heapq.heapify(nums)` takes linear O(N) time, NOT O(N log N)!

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Decide whether you need repeated minimum extraction (Min-Heap) or maximum extraction (Max-Heap via `-x`).
2. Convert an initial list in O(N) using `heapq.heapify(nums)`.
3. Use `heappop` and `heappush` to maintain the heap invariant in O(log N) per step.

### Common Bugs & Edge Cases
- **Interview Trap:** Calling `nums.sort()` inside a loop every time a new element is inserted (O(N^2 log N)) instead of pushing to a Heap (O(N log N)).

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
import heapq

def heap_fundamentals_demo(nums: list[int]) -> tuple[int, int]:
    """
    Python's 'heapq' implements a MIN-HEAP on a standard list.
    MAX-HEAP TRICK: Negate values (-x) when pushing and popping!
    """
    # 1. Min-Heap: build heap in-place in O(N) linear time
    min_heap = nums[:]
    heapq.heapify(min_heap)
    heapq.heappush(min_heap, 5)          # O(log N)
    smallest = heapq.heappop(min_heap)   # O(log N)

    # 2. Max-Heap: negate numbers by multiplying by -1
    max_heap = [-x for x in nums]
    heapq.heapify(max_heap)
    heapq.heappush(max_heap, -5)
    largest = -heapq.heappop(max_heap)

    return smallest, largest
```

### TypeScript / JavaScript Template
```typescript
export class MinHeap {
  private data: number[] = [];

  get size(): number {
    return this.data.length;
  }

  peek(): number | undefined {
    return this.data[0];
  }

  push(val: number): void {
    this.data.push(val);
    this.siftUp(this.data.length - 1);
  }

  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  private siftUp(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  private siftDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.data[l] < this.data[smallest]) smallest = l;
      if (r < n && this.data[r] < this.data[smallest]) smallest = r;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:45] A Binary Tree Hidden Inside an Array
- **On-Screen Visual / Slide Cue:** Complete binary tree mapping its nodes directly to array indices `0..N-1` via `2i+1` and `2i+2`.
- **Narration / Teleprompter Script:**
  > "What if I told you a Binary Heap is a tree that uses zero node objects and zero pointers? Because it fills level by level from left to right without gaps, the children of index `i` live mathematically at `2i + 1` and `2i + 2`."

### [01:45 - 04:15] Sift-Up, Sift-Down, and Python's Negation Trick
- **On-Screen Visual / Slide Cue:** A new element bubbling up a branch in `log N` swaps and Max-Heap negation `-x`.
- **Narration / Teleprompter Script:**
  > "Keeping an entire array sorted while items arrive and leave is expensive. When you only care about who is currently winning at the top, a Heap rebalances a single branch of height log(N) in an instant."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #28, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Repeated extraction of min/max from a changing set with N <= 10^5`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Heaps (Priority Queue) interview problems with nested loops! When constraints reach Repeated extraction of min/max from a changing set with N <= 10^5, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Heaps (Priority Queue) as A hospital emergency room triage (Priority Queue): patients are not treated in arrival order like at a bank—the patient with the highest urgency always goes next (`pop` in O(log N)), even if they walked in a minute ago (`push` in O(log N)).. First, decide whether you need repeated minimum extraction (min-heap) or maximum extraction (max-heap via `-x`). Then, convert an initial list in o(n) using `heapq.heapify(nums)`. This collapses your time complexity from an unviable brute-force right down to Peek (`heap[0]`): O(1) | Push / Pop: O(log N) | `heapify(list)`: O(N)! Watch out for the trap though: calling `nums.sort()` inside a loop every time a new element is inserted (o(n^2 log n)) instead of pushing to a heap (o(n log n))."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#1046. Last Stone Weight** | `Easy` | [https://leetcode.com/problems/last-stone-weight/](https://leetcode.com/problems/last-stone-weight/) | Use a Max-Heap (negating values in `heapq`) to repeatedly smash the 2 heaviest stones in O(log N). |
| **#703. Kth Largest Element in a Stream** | `Easy` | [https://leetcode.com/problems/kth-largest-element-in-a-stream/](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | Maintain a Min-Heap of fixed size `K`: the root `heap[0]` is always the K-th largest element. |
| **#621. Task Scheduler** | `Medium` | [https://leetcode.com/problems/task-scheduler/](https://leetcode.com/problems/task-scheduler/) | Max-Heap of remaining task counts paired with a cooldown queue `(count, available_time)`. |

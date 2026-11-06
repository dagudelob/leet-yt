# Episode #18: Queues & Deques (FIFO & Double-Ended Queues)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 3 — Data Structure (`Beginner`)  
> **Flowchart Node Term:** `Queues (FIFO) & Double-Ended Queues (Deque)`  
> **Recommended Prerequisites:** Arrays -> Linked Lists

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain the FIFO philosophy and why Python's `collections.deque` (Double-Ended Queue) is the Swiss Army knife that acts as a Stack, a Queue, and a Sliding Window buffer in O(1). Also show how a Circular Queue wraps around a fixed array using `% capacity`.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Queues & Deques", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Arrival-order processing, circular buffers, or BFS) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Queues & Deques?
First-In, First-Out (FIFO) queues and Double-Ended Queues (`collections.deque`) that support O(1) insertions and pops from both the front and the back.

### Real-World Analogy
> **Visual Intuition:** A checkout line at a grocery store (FIFO Queue): the first customer in line is the first customer served. A Deque is a VIP hallway with doors at both ends, letting you add or remove from either side in O(1).

### Key Takeaways to Remember
1. **Key Takeaway #1:** FIFO processes items in order of arrival or distance (making it the engine of BFS shortest paths).
2. **Key Takeaway #2:** `collections.deque` gives `append`, `appendleft`, `pop`, and `popleft` all in O(1).
3. **Key Takeaway #3:** In JavaScript/TypeScript, avoid `Array.shift()` on large queues; use head/tail pointers or a two-array queue.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Queues & Deques)
- [x] Processing events or tasks in strict arrival order (sliding time windows, rate limiters, stream buffers).
- [x] Traversing trees or graphs level by level (the engine behind Breadth-First Search - BFS).
- [x] Maintaining sliding windows where elements enter on the right and expire from the left in O(1).

### When NOT to Use It (False Positives)
- [!] In Python, NEVER use `list.pop(0)` as a queue because shifting costs O(N); always import `from collections import deque` and call `popleft()` in O(1).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Arrival-order processing, circular buffers, or BFS`
- **Average Time Complexity:** `append / appendleft / pop / popleft: O(1)`
- **Worst-Case Time Complexity:** `O(1) at both ends`
- **Space Complexity:** `O(N) for buffered elements`
- **Engineering Note:** `collections.deque` is implemented in C as a doubly linked list of fixed-size blocks.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Import `from collections import deque`.
2. Enqueue new items at the back with `q.append(x)`.
3. Dequeue the oldest item from the front with `q.popleft()`.

### Common Bugs & Edge Cases
- **Interview Trap:** Using `Array.shift()` in JS or `list.pop(0)` in Python on a queue with 100,000 items, causing O(N^2) TLE.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
from collections import deque

class RecentCounter:
    """
    Classic FIFO Queue over a sliding time window [t - 3000, t].
    Time: O(1) amortized per call | Space: O(W)
    """
    def __init__(self):
        self.q = deque()

    def ping(self, t: int) -> int:
        self.q.append(t)
        # Evict expired timestamps from the front in O(1)
        while self.q and self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)
```

### TypeScript / JavaScript Template
```typescript
export class CircularDeque<T> {
  private items: Record<number, T> = {};
  private head = 0;
  private tail = 0;

  pushBack(val: T): void {
    this.items[this.tail++] = val;
  }

  popFront(): T | undefined {
    if (this.head === this.tail) return undefined;
    const val = this.items[this.head];
    delete this.items[this.head++];
    return val;
  }

  get size(): number {
    return this.tail - this.head;
  }
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:30] FIFO vs LIFO: Fairness of Arrival Order
- **On-Screen Visual / Slide Cue:** Tunnel where items enter on the right and exit in the exact same order on the left.
- **Narration / Script:**
  > "While a Stack always serves the newest arrival first, a Queue respects the line: First-In, First-Out. It is the essential structure for real-time event streams and level-by-level graph exploration."

### [01:30 - 04:00] Deques and Circular Queues: O(1) at Both Ends
- **On-Screen Visual / Slide Cue:** Circular ring buffer with `head` and `tail` pointers advancing via `% capacity`.
- **Narration / Script:**
  > "With a Deque or Circular Queue, you get instant insertions and removals at both the front and the back—setting the stage for BFS and Monotonic Queues."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#933. Number of Recent Calls** | `Easy` | [https://leetcode.com/problems/number-of-recent-calls/](https://leetcode.com/problems/number-of-recent-calls/) | Append `t` and evict calls `< t - 3000` from the front using `popleft()`. |
| **#622. Design Circular Queue** | `Medium` | [https://leetcode.com/problems/design-circular-queue/](https://leetcode.com/problems/design-circular-queue/) | Fixed array of size `K` with circular index math `(head + count) % K`. |
| **#225. Implement Stack using Queues** | `Easy` | [https://leetcode.com/problems/implement-stack-using-queues/](https://leetcode.com/problems/implement-stack-using-queues/) | After pushing a new element, rotate the previous `N - 1` elements behind it. |

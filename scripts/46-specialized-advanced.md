# Episode #46: Specialized Advanced Patterns (Sweep Line, Boyer-Moore, Tarjan & Euler)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 7 — Algorithmic Pattern (`Expert`)  
> **Flowchart Node Term:** `Sweep Line, Boyer-Moore Majority Vote, Reservoir Sampling, Tarjan & Hierholzer`  
> **Recommended Prerequisites:** Sorting + Intervals -> Graphs -> DFS

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Close out episode #46 of the 'Leet-YT' series with a grand finale showcasing the 4 specialized patterns that make a Senior/Staff candidate shine: 1) Sweep Line & Difference Arrays (`+1` at `start`, `-1` at `end`), 2) O(1)-space Boyer-Moore Majority Vote, 3) Eulerian Path with Hierholzer (`Reconstruct Itinerary`), and 4) Critical Bridge Detection with Tarjan (`Critical Connections`).

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Specialized Patterns", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Peak event concurrency, O(1)-space Majority Vote, Network Bridges, or Eulerian Path) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Specialized Patterns?
The elite toolkit to complete the Flowchart: 1) **Sweep Line / Difference Array** (turning intervals into `+1` open and `-1` close events), 2) **Boyer-Moore Majority Vote** (finding the majority element in O(N) time and O(1) space), 3) **Reservoir Sampling**, 4) **Hierholzer's Algorithm (Eulerian Path)**, and 5) **Tarjan's Bridge-Finding Algorithm (`tin` & `low`)**.

### Real-World Analogy
> **Visual Intuition:** Picture a security guard at the entrance of a shopping mall (Sweep Line / Event Counter): to know which minute of the day had the highest crowd inside, you do not need to track each shopper individually; you simply add `+1` to your counter every time someone walks in and subtract `-1` every time someone walks out.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Sweep Line breaks intervals `[start, end]` into two independent point events `(start, +1)` and `(end, -1)`.
2. **Key Takeaway #2:** A Difference Array is the inverse of a Prefix Sum: adding `V` to the entire range `[L, R]` is just `diff[L] += V` and `diff[R+1] -= V` in O(1).
3. **Key Takeaway #3:** In Boyer-Moore, if one army holds more than half the soldiers, even if every soldier pairs off 1-to-1 with an enemy and both vanish, the majority army is guaranteed to be the last one standing.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Specialized Patterns)
- [x] **Sweep Line / Difference Array**: How many intervals are active simultaneously at each point, or what is the peak number of rooms needed? (`Meeting Rooms II`, `Car Pooling`, `The Skyline Problem`).
- [x] **Boyer-Moore Majority Vote**: Find the element that appears more than `floor(N/2)` (or `floor(N/3)`) times under a strict **O(1) memory** constraint (`Majority Element I & II`).
- [x] **Hierholzer (Eulerian Path)**: Traverse **EVERY EDGE** of a graph exactly once (`Reconstruct Itinerary`) by appending nodes in post-order after exhausting outgoing edges.
- [x] **Tarjan (`tin` and `low`)**: Find **Critical Connections (Bridges)** whose removal disconnects the graph (`Critical Connections in a Network`).

### When NOT to Use It (False Positives)
- [!] Do not use Boyer-Moore to find the general 'most frequent' element unless it is guaranteed to exceed `N/2` (or unless you run a second verification pass).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Peak event concurrency, O(1)-space Majority Vote, Network Bridges, or Eulerian Path`
- **Average Time Complexity:** `Boyer-Moore: O(N) time, O(1) space | Sweep Line: O(N log N) | Tarjan / Hierholzer: O(V + E)`
- **Worst-Case Time Complexity:** `O(N log N) or O(V + E)`
- **Space Complexity:** `O(1) for Boyer-Moore | O(N) for Sweep Line / Tarjan`
- **Engineering Note:** A Difference Array (`diff[L] += val; diff[R+1] -= val`) applies N range additions in O(1) each and reconstructs the final array with a single O(N) Prefix Sum.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. For interval concurrency (Sweep Line): emit `+delta` at `start` and `-delta` at `end`, sort by coordinate, and accumulate.
2. For offline batch range additions (Difference Array): apply `+V` at `L` and `-V` at `R+1`, then take the prefix sum at the end.
3. For Boyer-Moore: switch `candidate` only when `count == 0`.

### Common Bugs & Edge Cases
- **Interview Trap:** In Sweep Line, failing to define tie-breaking when one interval ends at the exact timestamp `t` another starts: if `[1, 2]` and `[2, 3]` do NOT overlap, `(t, -1)` must sort before `(t, +1)`; if touching endpoints DO count as overlapping, `(t, +1)` comes first.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def boyer_moore_majority_vote(nums: list[int]) -> int:
    """
    1. Boyer-Moore Majority Vote Algorithm.
    Finds the element appearing > N/2 times in O(N) time and O(1) space.
    """
    candidate = 0
    count = 0
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate


def sweep_line_max_overlap(intervals: list[list[int]]) -> int:
    """
    2. Sweep Line (+1 / -1 Event Scanning).
    Finds the maximum number of simultaneously overlapping intervals (Meeting Rooms II).
    """
    events: list[tuple[int, int]] = []
    for start, end in intervals:
        events.append((start, +1))  # Interval opens
        events.append((end, -1))    # Interval closes

    # If one interval ends right when another starts, process the closing (-1) first
    events.sort(key=lambda e: (e[0], e[1]))
    active = max_active = 0
    for _, delta in events:
        active += delta
        max_active = max(max_active, active)
    return max_active
```

### TypeScript / JavaScript Template
```typescript
export function boyerMooreMajorityVote(nums: number[]): number {
  let candidate = 0;
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}

export function sweepLineMaxOverlap(intervals: number[][]): number {
  const events: Array<[number, number]> = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }
  events.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

  let active = 0,
    maxActive = 0;
  for (const [, delta] of events) {
    active += delta;
    maxActive = Math.max(maxActive, active);
  }
  return maxActive;
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 02:00] Sweep Line and Difference Arrays: The Power of +1 and -1 Events
- **On-Screen Visual / Slide Cue:** A vertical line sweeping across intervals from left to right adding +1 on entry and -1 on exit.
- **Narration / Script:**
  > "We have reached the final episode of our 46-topic map. We kick off this capstone with a brilliant insight: an interval from start to end is nothing more than two point events in time, a `+1` when it opens and a `-1` when it closes."

### [02:00 - 05:15] O(1) Boyer-Moore, Eulerian Paths, and Tarjan's Bridges
- **On-Screen Visual / Slide Cue:** Visual summary of Boyer-Moore cancellation, Eulerian edge traversal, and Tarjan's `low[v] > tin[u]` bridge condition.
- **Narration / Script:**
  > "With Boyer-Moore for O(1) majorities, Hierholzer for traversing every edge once, and Tarjan for spotting critical network bridges, you have completed all 46 nodes of the Leet-YT Flowchart."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#169. Majority Element** | `Easy` | [https://leetcode.com/problems/majority-element/](https://leetcode.com/problems/majority-element/) | Boyer-Moore algorithm: cancel distinct elements pairwise while maintaining `candidate` and `count` in O(1) space. |
| **#1094. Car Pooling** | `Medium` | [https://leetcode.com/problems/car-pooling/](https://leetcode.com/problems/car-pooling/) | Sweep Line / Difference Array: add `+passengers` at pickup `from` and subtract `-passengers` at drop-off `to`. |
| **#1192. Critical Connections in a Network** | `Hard` | [https://leetcode.com/problems/critical-connections-in-a-network/](https://leetcode.com/problems/critical-connections-in-a-network/) | Tarjan's algorithm: an edge `(u, v)` is a critical bridge iff `low[v] > discovery_time[u]`. |

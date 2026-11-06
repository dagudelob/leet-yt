# Episode #38: Ordered Set & Balanced BSTs (Dynamic Sorted Collections)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 7 — Data Structure + Algorithmic Pattern (`Advanced`)  
> **Flowchart Node Term:** `Ordered Set / SortedList & Balanced BST Operations`  
> **Recommended Prerequisites:** BST -> Binary Search

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain what gap the Ordered Set fills between a Hash Set (which is O(1) but completely unordered) and a Heap (which only sees the minimum or maximum at the top). Reveal the secret weapon for Python interviews: LeetCode comes with `from sortedcontainers import SortedList` pre-installed.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Ordered Set", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Dynamic Insertion/Deletion + Nearest Neighbor or Order-Statistic Query in O(log N)) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Ordered Set?
A self-balancing dynamic collection (`SortedList` / `SortedSet` from `sortedcontainers` in Python, `std::set` in C++, `TreeSet` in Java) that keeps elements sorted at all times, allowing **insertions, deletions, and nearest-neighbor queries (`>= x` or `<= x`) in O(log N)**.

### Real-World Analogy
> **Visual Intuition:** A magical library where every time you return a new book, the shelves rearrange themselves in `log N` steps, allowing you to instantly ask not only whether a book exists, but 'what is the book with the price immediately above $45?' or 'how many books cost less than $30?'.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Hash Set = O(1) exact lookup without order. Heap = only min/max in O(log N). Ordered Set = insertion, deletion, and nearest-neighbor lookup `>= x` in O(log N).
2. **Key Takeaway #2:** In Python use `from sortedcontainers import SortedList` with `.add(x)`, `.remove(x)`, and `.bisect_left(x)`.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Ordered Set)
- [x] You need to insert and remove numbers dynamically AND query at each step the **successor (`>= x` / `bisect_left`)**, the **predecessor (`<= x` / `bisect_right - 1`)**, or **how many elements smaller than `x`** have appeared so far.
- [x] Maintaining non-overlapping active intervals in a dynamic calendar (`My Calendar I`) or a sorted sliding window (`Contains Duplicate III`, `Sliding Window Median`).

### When NOT to Use It (False Positives)
- [!] If all data is static from the start (you do not need a dynamic Ordered Set; just sort the array once and use Binary Search). If you only need the overall minimum or maximum, use a Heap (lighter weight).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Dynamic Insertion/Deletion + Nearest Neighbor or Order-Statistic Query in O(log N)`
- **Average Time Complexity:** `add / remove / bisect_left / index `s[k]`: O(log N)`
- **Worst-Case Time Complexity:** `O(log N)`
- **Space Complexity:** `O(N)`
- **Engineering Note:** In LeetCode Python, `from sortedcontainers import SortedList` is pre-installed by default.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Identify that the problem requires inserting/deleting elements AND asking order or proximity questions (`>= x`, `<= x`, or the K-th active element).
2. Query the neighbor with `idx = sl.bisect_left(target)` and verify `idx < len(sl)`.
3. Update the collection with `sl.add(x)` and `sl.remove(old)`.

### Common Bugs & Edge Cases
- **Interview Trap:** Using `list.insert(idx, x)` after a `bisect` on a standard Python list thinking it is O(log N): searching is O(log N), but inserting into the middle of a `list` still shifts elements in O(N). Use `SortedList`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
# In LeetCode Python, 'sortedcontainers' is included in the official runtime:
from sortedcontainers import SortedList

def contains_nearby_almost_duplicate(nums: list[int], indexDiff: int, valueDiff: int) -> bool:
    """
    Classic Ordered Set in a Sliding Window Pattern (LeetCode 220).
    Check if within the last 'indexDiff' elements there is any value in [x - valueDiff, x + valueDiff].
    Time: O(N log(indexDiff)) | Space: O(indexDiff)
    """
    window = SortedList()
    for i, x in enumerate(nums):
        # 1. Find the smallest element in the window that is >= x - valueDiff
        pos = window.bisect_left(x - valueDiff)
        if pos < len(window) and window[pos] <= x + valueDiff:
            return True

        # 2. Insert current element and evict the one leaving the indexDiff window
        window.add(x)
        if i >= indexDiff:
            window.remove(nums[i - indexDiff])
    return False
```

### TypeScript / JavaScript Template
```typescript
// In TypeScript/JS we can use Binary Search on a maintained block structure or Coordinate Compression + Fenwick Tree
export function lowerBound(sortedArr: number[], target: number): number {
  let low = 0,
    high = sortedArr.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (sortedArr[mid] >= target) high = mid;
    else low = mid + 1;
  }
  return low;
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] Hash Set vs Heap vs Ordered Set: The Collection Triad
- **On-Screen Visual / Slide Cue:** Comparison table showing why neither a Hash Set nor a Heap can answer 'what is the closest element to X?'.
- **Narration / Script:**
  > "A Hash Set does not know who is larger than whom, and a Heap only knows the champion sitting at the top. When you need your entire collection to stay sorted while data enters and leaves live, the Ordered Set takes center stage."

### [01:45 - 04:15] SortedList in Python and the Nearest-Neighbor Pattern
- **On-Screen Visual / Slide Cue:** Sliding window querying the floor and ceiling of `x` with `bisect_left`.
- **Narration / Script:**
  > "With `bisect_left` on a sorted collection, you find in logarithmic time the element immediately greater than or equal to your target and the one immediately smaller, solving calendar booking and near-duplicate problems in just a few lines."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#729. My Calendar I** | `Medium` | [https://leetcode.com/problems/my-calendar-i/](https://leetcode.com/problems/my-calendar-i/) | Store sorted intervals and use `bisect_left` to check only the immediately preceding and succeeding events. |
| **#220. Contains Duplicate III** | `Hard` | [https://leetcode.com/problems/contains-duplicate-iii/](https://leetcode.com/problems/contains-duplicate-iii/) | Maintain a `SortedList` of the last `k` elements and query `bisect_left(x - t)`. |
| **#315. Count of Smaller Numbers After Self** | `Hard` | [https://leetcode.com/problems/count-of-smaller-numbers-after-self/](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) | Scan right to left: `window.bisect_left(x)` tells you in O(log N) how many smaller elements you have already seen. |

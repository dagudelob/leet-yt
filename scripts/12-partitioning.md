# Episode #12: Partitioning (QuickSelect & Dutch National Flag)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 2 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Partitioning, QuickSelect & 3-Way Partition`  
> **Recommended Prerequisites:** Arrays -> Two Pointers

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain how Partitioning powers both QuickSort and QuickSelect (finding the K-th element in O(N) because we only recurse on one side: `N + N/2 + N/4 = 2N`). Then explain Dijkstra's 3-pointer Dutch National Flag invariant and why `mid` does NOT advance when swapping with `high`.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Partitioning", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (K-th Largest in O(N) average time or 3-way in-place classification in O(1) space) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Partitioning?
Rearranging an array in-place around a pivot in O(N) time to separate elements that are smaller, equal, and larger—without paying the full O(N log N) cost of sorting everything.

### Real-World Analogy
> **Visual Intuition:** Finding the median-height player in a gym class by picking a volunteer pivot: everyone shorter steps left, everyone taller steps right. If 20 people are on the left and you want the 10th shortest overall, you never even need to sort the right half.

### Key Takeaways to Remember
1. **Key Takeaway #1:** QuickSelect finds the K-th largest element in O(N) average time because it discards half the remaining subarray at each step (`N + N/2 + N/4 ... = 2N`).
2. **Key Takeaway #2:** 3-way partitioning (`< pivot`, `== pivot`, `> pivot`) prevents O(N^2) degradation on arrays with many duplicates.
3. **Key Takeaway #3:** When swapping `mid` with `high`, the element arriving from `high` has not been inspected yet, so `mid` must stay put for the next check.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Partitioning)
- [x] Finding the **K-th largest or smallest element** (or median) in **O(N) average time** (`QuickSelect`).
- [x] Grouping an array into **3 distinct categories in-place** in a single pass (`Dutch National Flag` / `Sort Colors` with `low`, `mid`, `high` pointers).
- [x] Segregating zeroes, evens/odds, or positives/negatives in-place in O(1) space.

### When NOT to Use It (False Positives)
- [!] If you need the entire array sorted or need to answer many different K queries on the same static array (sort once in O(N log N) instead).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `K-th Largest in O(N) average time or 3-way in-place classification in O(1) space`
- **Average Time Complexity:** `O(N) (QuickSelect geometric series: N + N/2 + N/4 + ... = 2N)`
- **Worst-Case Time Complexity:** `O(N^2) in QuickSelect if bad pivots are chosen (use random pivot + 3-way partition)`
- **Space Complexity:** `O(1) in-place`
- **Engineering Note:** Dijkstra's Dutch National Flag is strictly O(N) in a single pass.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Maintain boundary pointers (`low`, `mid`, `high`) partitioning the array into 4 regions.
2. Inspect `nums[mid]` while `mid <= high`.
3. In QuickSelect, compare the target index `k` against the pivot boundaries to recurse into only one partition.

### Common Bugs & Edge Cases
- **Interview Trap:** Incrementing `mid` after swapping with `high` in `Sort Colors`, which skips inspecting the unknown element brought in from `high`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def sort_colors_dutch_flag(nums: list[int]) -> None:
    """
    Dijkstra's Dutch National Flag Algorithm (3-Way In-Place Partition).
    Groups 0s (left), 1s (middle), and 2s (right) in a single O(N) pass.
    Invariant:
      nums[0..low-1] == 0
      nums[low..mid-1] == 1
      nums[high+1..n-1] == 2
    """
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1  # NOTE: Do NOT increment mid yet; the swapped value from 'high' is uninspected
```

### TypeScript / JavaScript Template
```typescript
export function sortColorsDutchFlag(nums: number[]): void {
  let low = 0,
    mid = 0,
    high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--; // Do not increment mid until the newly swapped element is inspected
    }
  }
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] Why Partial Sorting Beats Full Sorting: QuickSelect
- **On-Screen Visual / Slide Cue:** QuickSort tree pruning an entire half at every level: N + N/2 + N/4 = 2N.
- **Narration / Script:**
  > "If you only care about who finished in K-th place, why sort the entire stadium? By partitioning around a pivot, you know immediately which side holds index K and discard the other side forever."

### [01:45 - 04:30] Dijkstra's Dutch National Flag (3-Way Partition)
- **On-Screen Visual / Slide Cue:** Three colored zones (0s, 1s, 2s) and the shrinking unknown zone between `mid` and `high`.
- **Narration / Script:**
  > "When you have three categories or heavy duplicates, Dijkstra's three-pointer partition maintains four zones in the array and shrinks the unknown region until `mid` crosses `high`."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#75. Sort Colors** | `Medium` | [https://leetcode.com/problems/sort-colors/](https://leetcode.com/problems/sort-colors/) | Use the 3 pointers (`low`, `mid`, `high`) of Dijkstra's Dutch National Flag algorithm. |
| **#215. Kth Largest Element in an Array** | `Medium` | [https://leetcode.com/problems/kth-largest-element-in-an-array/](https://leetcode.com/problems/kth-largest-element-in-an-array/) | QuickSelect with 3-way partitioning (`< pivot`, `== pivot`, `> pivot`) achieves O(N) average time. |
| **#283. Move Zeroes** | `Easy` | [https://leetcode.com/problems/move-zeroes/](https://leetcode.com/problems/move-zeroes/) | 2-way stable partition: swap non-zero elements forward into the `low` pointer. |

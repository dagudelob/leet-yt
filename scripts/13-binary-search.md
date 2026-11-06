# Episode #13: Binary Search (Sorted Arrays & Monotonic Search Space)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 2 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Binary Search & Monotonic Search Space`  
> **Recommended Prerequisites:** Arrays -> Basic DSA & Big-O

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Reframe how the listener thinks about Binary Search: it is NOT just for finding a number in a sorted array—it is for finding the boundary between `False` and `True` in any monotonic boolean function (the `first_true_idx` template). Walk through 'Koko Eating Bananas' to demonstrate Binary Search on the Answer Space.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Binary Search", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Sorted array or 'Minimize the Maximum / Maximize the Minimum' with monotonic feasibility) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Binary Search?
Repeatedly halving a search space in O(log N) time. Beyond finding a value in a sorted array, Binary Search works on ANY monotonic boolean condition `[False, False, ..., True, True]`—including searching for the optimal answer itself ('Binary Search on Answer').

### Real-World Analogy
> **Visual Intuition:** Finding the lowest floor of a 100-story building from which an egg breaks: you test floor 50 first. If it breaks, floors 51–100 will also break, so you record 50 and search the lower half; if it survives, floors 1–50 are safe and you search the upper half.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Instead of memorizing 5 fragile `while (l < r)` variants that risk infinite loops, always use the `first_true_idx` template: save `ans = mid` and shrink with `high = mid - 1` or `low = mid + 1`.
2. **Key Takeaway #2:** Whenever a problem asks for 'the minimum X to accomplish Y' and succeeding at X implies succeeding at X+1, use Binary Search on Answer.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Binary Search)
- [x] The array is sorted (or rotated sorted) and you need to find a target or the first index `>= target` (`lower_bound`).
- [x] The problem asks for 'the MINIMUM X such that it is possible to achieve Y' or 'the MAXIMUM X such that Y holds' and `is_feasible(X)` is monotonic (`Binary Search on Answer`).
- [x] Constraints are huge (`N >= 10^9` requiring `O(log N)`, or `N <= 10^5` with an `O(N)` feasibility check giving `O(N log(Range))`).

### When NOT to Use It (False Positives)
- [!] When the condition is not monotonic (knowing the outcome at `mid` gives zero guarantee about which half to discard).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Sorted array or 'Minimize the Maximum / Maximize the Minimum' with monotonic feasibility`
- **Average Time Complexity:** `O(log N) on arrays | O(N log(Max - Min)) on Answer Space`
- **Worst-Case Time Complexity:** `O(log N)`
- **Space Complexity:** `O(1) iterative`
- **Engineering Note:** For N = 1,000,000,000 (`10^9`), `log2(N)` is only ~30 iterations.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Identify the search range `[low, high]` (array indices `[0, n-1]` or answer range `[min_possible, max_possible]`).
2. Write the monotonic predicate `is_feasible(mid) -> bool`.
3. If `is_feasible(mid)` is `True`, record `ans = mid` and search left (`high = mid - 1`); otherwise search right (`low = mid + 1`).

### Common Bugs & Edge Cases
- **Interview Trap:** Getting stuck in an infinite loop with `mid = (l + r) // 2` and `l = mid` when `r = l + 1`. Recording `ans = mid` with `low = mid + 1` and `high = mid - 1` strictly shrinks the range on every step.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def binary_search_first_true(low: int, high: int, is_feasible) -> int:
    """
    Master AlgoMonster Template: Find the FIRST value where is_feasible(mid) is True.
    Domain pattern: [False, False, False, True, True, True]
                                           ^-- We want this first True
    """
    first_true_idx = -1
    while low <= high:
        mid = low + (high - low) // 2
        if is_feasible(mid):
            first_true_idx = mid   # Record valid candidate
            high = mid - 1         # Try to find an even smaller valid value on the left
        else:
            low = mid + 1          # Too small; search the right half
    return first_true_idx
```

### TypeScript / JavaScript Template
```typescript
export function binarySearchFirstTrue(
  low: number,
  high: number,
  isFeasible: (mid: number) => boolean
): number {
  let firstTrueIdx = -1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isFeasible(mid)) {
      firstTrueIdx = mid; // Record valid candidate
      high = mid - 1;     // Search left for an earlier True
    } else {
      low = mid + 1;      // Search right
    }
  }
  return firstTrueIdx;
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] The True Essence of Binary Search: The False -> True Boundary
- **On-Screen Visual / Slide Cue:** Row of red switches (False) followed by green switches (True), spotlighting the first green switch.
- **Narration / Script:**
  > "Forget the idea that Binary Search is only for finding a number inside a sorted array. Its real superpower appears whenever you can ask a Yes/No question where all the 'No' answers sit on the left and all the 'Yes' answers sit on the right."

### [01:45 - 05:00] Binary Search on the Answer Space (Koko Eating Bananas)
- **On-Screen Visual / Slide Cue:** Speedometer testing speeds between 1 and Max, verifying in O(N) if Koko finishes within H hours.
- **Narration / Script:**
  > "When a problem asks for the minimum ship capacity or the minimum speed to finish within H hours, we do not binary search the input array—we binary search the range of possible answers directly."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#704. Binary Search** | `Easy` | [https://leetcode.com/problems/binary-search/](https://leetcode.com/problems/binary-search/) | Classic binary search on a sorted array. |
| **#33. Search in Rotated Sorted Array** | `Medium` | [https://leetcode.com/problems/search-in-rotated-sorted-array/](https://leetcode.com/problems/search-in-rotated-sorted-array/) | When splitting at `mid`, at least ONE of the two halves (`[low..mid]` or `[mid..high]`) is guaranteed to be strictly sorted. |
| **#875. Koko Eating Bananas** | `Medium` | [https://leetcode.com/problems/koko-eating-bananas/](https://leetcode.com/problems/koko-eating-bananas/) | Binary Search on Answer: search for the minimum eating speed `k` in `[1, max(piles)]` where `hours_needed(k) <= h`. |

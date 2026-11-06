# Episode #09: Hash Tables (Hash Map & Hash Set)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 2 — Data Structure + Algorithmic Pattern (`Beginner`)  
> **Flowchart Node Term:** `Hash Table / Hash Map & Set`  
> **Recommended Prerequisites:** Arrays -> Strings

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain how a Hash Table works under the hood (hash function -> modulo capacity -> collision handling) and then walk through the 3 high-yield interview patterns: 1) Complement lookup (`Two Sum`), 2) Frequency counter, and 3) Streak-start detection in O(N) (`Longest Consecutive Sequence`).

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Hash Table", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Eliminates inner linear search loops when N <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Hash Table?
The #1 tool for accelerating algorithms: uses a hash function to map any immutable key to a bucket index, providing O(1) average-time insertion, deletion, and lookup.

### Real-World Analogy
> **Visual Intuition:** A coat check room with a mathematical formula: instead of scanning every coat hook from 1 to 10,000 (O(N)), the formula computes your exact hook number directly from your name in one step (O(1)).

### Key Takeaways to Remember
1. **Key Takeaway #1:** Classic interview truth: whenever you have an O(N^2) nested search, ask 'Can a Hash Map make the inner lookup O(1)?'
2. **Key Takeaway #2:** In Python, `dict` keys and `set` elements must be immutable (`int`, `str`, `tuple`), never `list`.
3. **Key Takeaway #3:** In `Longest Consecutive Sequence`, checking `if (x - 1) not in num_set` prevents redundant work and guarantees O(N).

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Hash Table)
- [x] You need O(1) membership checks to see if an element has appeared before (`Hash Set` for duplicates).
- [x] You need key-value associations: frequency counting, remembering the index where a value was seen (`Two Sum`), or grouping items by a shared signature.
- [x] You want to replace an inner O(N) linear search loop with an instant O(1) lookup (trading O(N) space for O(N) time).

### When NOT to Use It (False Positives)
- [!] You need sorted order or nearest-neighbor queries like 'find the smallest element >= X' (Hash Tables are unordered; use Binary Search or an Ordered Set / BST instead).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Eliminates inner linear search loops when N <= 10^5`
- **Average Time Complexity:** `Insert / Lookup / Delete: O(1)`
- **Worst-Case Time Complexity:** `O(N) under adversarial hash collisions`
- **Space Complexity:** `O(N) to store up to N unique keys`
- **Engineering Note:** Modern implementations (`dict` in Python, `Map` in JS) resize automatically to keep load factor low.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Ask: what information from previous elements do I wish I could look up in O(1) while standing at index `i`?
2. Define the `Key` (what you search by) and the `Value` (index, frequency, or grouped list).
3. Scan the input updating and querying the hash table in O(1).

### Common Bugs & Edge Cases
- **Interview Trap:** Trying to use a mutable `list` as a dictionary key in Python (`TypeError: unhashable type: 'list'`). Convert it to `tuple` first.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def two_sum_hash(nums: list[int], target: int) -> list[int]:
    """
    Classic Pattern: Store {value_seen: index} in a single pass.
    Time: O(N) | Space: O(N)
    """
    seen: dict[int, int] = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []


def longest_consecutive(nums: list[int]) -> int:
    """
    Sequence-Start Pattern with Hash Set in O(N).
    """
    num_set = set(nums)
    best = 0
    for x in num_set:
        # Only start counting if 'x' is the very START of a streak
        if (x - 1) not in num_set:
            length = 1
            while (x + length) in num_set:
                length += 1
            best = max(best, length)
    return best
```

### TypeScript / JavaScript Template
```typescript
export function twoSumHash(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }
  return [];
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] How a Hash Table Works Under the Hood
- **On-Screen Visual / Slide Cue:** Animation of a key passing through `hash(key) % buckets` into an array slot.
- **Narration / Script:**
  > "A Hash Table combines the flexibility of searching by any key with the instant O(1) speed of an Array. How? By running your key through a deterministic hash function that maps it to a bucket index."

### [01:45 - 04:30] The 3 Master Patterns: Complement, Frequency, and Sequence Start
- **On-Screen Visual / Slide Cue:** Three visual cards: O(1) Complement, Frequency Map, and Streak Sentinel.
- **Narration / Script:**
  > "In interviews, you will use hash tables for three signature plays: remembering the index of a complement, counting frequencies, and detecting the exact start of consecutive sequences in linear time."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#1. Two Sum** | `Easy` | [https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/) | Check if `target - x` is already in the map before inserting `x`. |
| **#128. Longest Consecutive Sequence** | `Medium` | [https://leetcode.com/problems/longest-consecutive-sequence/](https://leetcode.com/problems/longest-consecutive-sequence/) | Insert all numbers into a `set` and only expand streaks from numbers `x` where `x - 1` is NOT in the set. |
| **#217. Contains Duplicate** | `Easy` | [https://leetcode.com/problems/contains-duplicate/](https://leetcode.com/problems/contains-duplicate/) | Instant O(N) duplicate detection with a `set`. |

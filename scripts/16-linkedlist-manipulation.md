# Episode #16: Linked List Manipulation (Fast & Slow Pointers & Reversal)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 3 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Fast & Slow Pointers & In-Place Reversal`  
> **Recommended Prerequisites:** Linked Lists -> Two Pointers

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Make the listener master the two most-asked linked list choreographies: 1) The 4-step in-place reversal dance (`nxt = curr.next`, `curr.next = prev`, `prev = curr`, `curr = nxt`) and 2) Floyd's Tortoise and Hare algorithm, showing how both combine in 'Reorder List' and 'Palindrome Linked List'.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("LL Manipulation", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Linked list or functional cycle problems requiring O(1) extra memory) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is LL Manipulation?
The two surgical techniques on linked lists: 1) Tortoise and Hare (`slow` moves 1 step, `fast` moves 2 steps) to locate the middle node or detect cycles in O(1) space, and 2) In-place pointer reversal using `prev, curr, nxt`.

### Real-World Analogy
> **Visual Intuition:** Two runners on a track: on a straight track, when the runner moving at 2x speed reaches the finish line, the 1x runner is at the exact midpoint. On a circular track (a cycle), the faster runner is guaranteed to lap and meet the slower runner.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Reversing a list in-place requires only 3 variables (`prev`, `curr`, `nxt`) and 4 cyclical assignments.
2. **Key Takeaway #2:** When `fast` reaches the end of the list, `slow` sits at the exact midpoint.
3. **Key Takeaway #3:** In Floyd's cycle detection, resetting one pointer to `head` after collision and advancing both by 1 step meets at the exact cycle entrance.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE LL Manipulation)
- [x] Finding the middle node of a linked list in a single pass without pre-counting its length.
- [x] Detecting whether a linked list (or functional state sequence) contains a cycle and finding the cycle entry point (Floyd's Cycle Detection).
- [x] Reversing an entire linked list or a subsegment `[left, right]` in-place in O(1) extra space.

### When NOT to Use It (False Positives)
- [!] Never access `fast.next.next` without first checking `while fast and fast.next:` in your loop guard.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Linked list or functional cycle problems requiring O(1) extra memory`
- **Average Time Complexity:** `O(N)`
- **Worst-Case Time Complexity:** `O(N)`
- **Space Complexity:** `O(1) in-place pointers`
- **Engineering Note:** Achieves O(1) auxiliary space compared to O(N) for a Hash Set or recursive call stack.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. For midpoint/cycle: initialize `slow = fast = head` and loop with `while fast and fast.next:`.
2. For reversal: initialize `prev = None`, `curr = head`, save `nxt = curr.next` on each step, and return `prev`.
3. For composite problems (`Reorder List`), sever the two halves with `slow.next = None` before reversing the second half.

### Common Bugs & Edge Cases
- **Interview Trap:** In `Reorder List`, forgetting to cut the link between the first and second halves (`slow.next = None`), causing an infinite cycle when merging.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def reverse_linked_list(head):
    """
    1. In-Place Reversal with 3 pointers: prev, curr, nxt.
    Time: O(N) | Space: O(1)
    """
    prev = None
    curr = head
    while curr:
        nxt = curr.next      # 1. Save next node before breaking the link
        curr.next = prev     # 2. Reverse arrow backward
        prev = curr          # 3. Advance prev
        curr = nxt           # 4. Advance curr
    return prev


def middle_and_cycle_detection(head):
    """
    2. Floyd's Tortoise and Hare (Fast & Slow Pointers).
    """
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True  # Cycle detected!
    return False
```

### TypeScript / JavaScript Template
```typescript
import { ListNode } from "./linked-list";

export function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr !== null) {
    const nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }
  return prev;
}

export function hasCycleFloyd(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 02:00] The 4-Step Choreography: In-Place Linked List Reversal
- **On-Screen Visual / Slide Cue:** Animation of arrows flipping 180 degrees node by node using `prev`, `curr`, and `nxt`.
- **Narration / Script:**
  > "Reversing a linked list is such a foundational interview question that you should be able to write it with your eyes closed. Do not memorize raw text—visualize the four-step cycle where each pointer takes the previous pointer's spot."

### [02:00 - 04:45] Tortoise & Hare (Floyd) and the Reorder List Combo
- **On-Screen Visual / Slide Cue:** Two cursors moving at 1x and 2x speed finding the middle and zipper-merging both halves.
- **Narration / Script:**
  > "How do you find the middle of a list without knowing its length? Use a slow pointer and a fast pointer. Combine that with reversing the second half, and you can solve Medium and Hard linked list problems in O(1) memory."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#206. Reverse Linked List** | `Easy` | [https://leetcode.com/problems/reverse-linked-list/](https://leetcode.com/problems/reverse-linked-list/) | 4-line pointer dance with `prev = None`, `curr = head`, and `nxt = curr.next`. |
| **#141. Linked List Cycle** | `Easy` | [https://leetcode.com/problems/linked-list-cycle/](https://leetcode.com/problems/linked-list-cycle/) | Tortoise (`slow.next`) and Hare (`fast.next.next`) in O(1) space. |
| **#143. Reorder List** | `Medium` | [https://leetcode.com/problems/reorder-list/](https://leetcode.com/problems/reorder-list/) | The ultimate combo: 1) Find middle with Slow/Fast, 2) Reverse second half in-place, 3) Zipper-merge both halves. |

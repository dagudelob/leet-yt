# Episode #15: Linked Lists (Singly & Doubly Linked)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 3 — Data Structure (`Beginner`)  
> **Flowchart Node Term:** `Singly & Doubly Linked Lists`  
> **Recommended Prerequisites:** Arrays

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Contrast an Array (contiguous lockers in RAM) with a Linked List (nodes linked by pointer arrows). Explain why the 'Dummy Sentinel Node' is a developer's best friend for avoiding null-pointer bugs when the head of the list changes.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Linked Lists", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (In-place pointer rewiring in O(1) extra memory) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Linked Lists?
Independent nodes scattered across memory where each node holds a value and a pointer (`next`, plus `prev` in doubly linked lists) to the adjacent node. Enables O(1) insertion and deletion anywhere once you hold a reference to the node.

### Real-World Analogy
> **Visual Intuition:** A treasure hunt of envelopes: the first envelope is not physically glued to the second, but inside it is a note saying 'the next clue is under the blue flowerpot'. To reach clue #5, you must follow clues 1, 2, 3, and 4 in sequence.

### Key Takeaways to Remember
1. **Key Takeaway #1:** In a Linked List there are no automatic indices: losing the reference to `head` loses the entire list.
2. **Key Takeaway #2:** The order of pointer reassignment matters: always save `nxt = curr.next` before overwriting `curr.next`.
3. **Key Takeaway #3:** Placing a `dummy` node before `head` guarantees every real node has a valid predecessor.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Linked Lists)
- [x] You need O(1) insertion or deletion at the head, tail, or middle without shifting contiguous array memory.
- [x] Doubly Linked Lists (`prev` and `next`): when you need to unlink an arbitrary node from the middle of a queue in O(1) given its direct pointer (the backbone of LRU Cache).

### When NOT to Use It (False Positives)
- [!] When you need O(1) random access by index (`get(i)` takes O(N) because you must walk from `head`).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `In-place pointer rewiring in O(1) extra memory`
- **Average Time Complexity:** `Insert/Delete given node pointer: O(1) | Search by index/value: O(N)`
- **Worst-Case Time Complexity:** `O(N)`
- **Space Complexity:** `O(N) nodes and pointers`
- **Engineering Note:** Using a sentinel `dummy = ListNode(0, head)` eliminates special-case edge logic when deleting or replacing the head node.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Sketch 3 boxes and arrows before writing any pointer manipulation code.
2. Create `dummy = ListNode(0, head)` whenever the original head might be deleted or moved.
3. Return `dummy.next` at the end.

### Common Bugs & Edge Cases
- **Interview Trap:** Overwriting `curr.next = new_node` before setting `new_node.next = curr.next`, severing the chain and losing the rest of the list.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None):
        self.val = val
        self.next = next


def delete_value_with_dummy(head: ListNode | None, target: int) -> ListNode | None:
    """
    The Dummy Sentinel Node Trick:
    Eliminates special-case checks when the node to remove is 'head' itself.
    """
    dummy = ListNode(0, head)
    curr = dummy
    while curr.next:
        if curr.next.val == target:
            curr.next = curr.next.next  # Bypass target node in O(1)
        else:
            curr = curr.next
    return dummy.next
```

### TypeScript / JavaScript Template
```typescript
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function deleteValueWithDummy(head: ListNode | null, target: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let curr: ListNode = dummy;
  while (curr.next !== null) {
    if (curr.next.val === target) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }
  return dummy.next;
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 01:30] Arrays vs Linked Lists: Contiguous Lockers vs Treasure Hunt
- **On-Screen Visual / Slide Cue:** Animation of nodes floating in memory connected by glowing pointer arrows.
- **Narration / Teleprompter Script:**
  > "If Arrays are numbered lockers along a wall, a Linked List is a chain of clues where each node only knows where the next node lives. That makes indexing slow, but splicing links in O(1) instant."

### [01:30 - 04:00] The Superpower of the Dummy Sentinel Node
- **On-Screen Visual / Slide Cue:** A gray 'Dummy' node placed ahead of 'head', allowing the first element to be deleted without edge cases.
- **Narration / Teleprompter Script:**
  > "Eighty percent of linked list bugs happen when deleting or moving the very first node. The clean engineering fix is placing a dummy sentinel node at the front and returning `dummy.next`."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #16, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: In-place pointer rewiring in O(1) extra memory`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Linked Lists interview problems with nested loops! When constraints reach In-place pointer rewiring in O(1) extra memory, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Linked Lists as A treasure hunt of envelopes: the first envelope is not physically glued to the second, but inside it is a note saying 'the next clue is under the blue flowerpot'. To reach clue #5, you must follow clues 1, 2, 3, and 4 in sequence.. First, sketch 3 boxes and arrows before writing any pointer manipulation code. Then, create `dummy = listnode(0, head)` whenever the original head might be deleted or moved. This collapses your time complexity from an unviable brute-force right down to Insert/Delete given node pointer: O(1) | Search by index/value: O(N)! Watch out for the trap though: overwriting `curr.next = new_node` before setting `new_node.next = curr.next`, severing the chain and losing the rest of the list."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#21. Merge Two Sorted Lists** | `Easy` | [https://leetcode.com/problems/merge-two-sorted-lists/](https://leetcode.com/problems/merge-two-sorted-lists/) | Create a `dummy` node and stitch the smaller head between `l1` and `l2` at each step. |
| **#203. Remove Linked List Elements** | `Easy` | [https://leetcode.com/problems/remove-linked-list-elements/](https://leetcode.com/problems/remove-linked-list-elements/) | Use `dummy.next = head` so leading target nodes are removed cleanly. |
| **#707. Design Linked List** | `Medium` | [https://leetcode.com/problems/design-linked-list/](https://leetcode.com/problems/design-linked-list/) | Implement with `head_dummy` and `tail_dummy` sentinels to simplify boundary insertions. |

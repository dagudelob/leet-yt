# Episode #20: Design + Supporting Data Structures (LRU Cache, O(1) Set)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 3 — Data Structure + Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Data Structure Design (LRU, LFU, RandomizedSet)`  
> **Recommended Prerequisites:** Hash Table -> Linked Lists -> Arrays -> Stacks (LIFO)

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Frame this episode as 'Hybrid Data Structure Architecture': how pairing two simple structures unlocks O(1) superpowers. Cover the 3 most-asked design questions in interview history: 1) LRU Cache (Hash Map + Doubly Linked List), 2) RandomizedSet (Array + Hash Map with the swap-with-last trick), and 3) Min Stack.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Design + Supporting DS", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Class design problems requiring O(1) per method call) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Design + Supporting DS?
Combining two or more data structures—such as `Hash Map + Doubly Linked List` or `Hash Map + Dynamic Array`—so each structure covers the weakness of the other and EVERY operation runs in O(1) time.

### Real-World Analogy
> **Visual Intuition:** A librarian with a digital index (Hash Map) that points directly to the exact link in a movable chain of books (Doubly Linked List). The index finds any book in O(1), and the doubly linked chain moves that book to the 'most recently read' front in O(1).

### Key Takeaways to Remember
1. **Key Takeaway #1:** No single basic structure does everything in O(1): an Array has O(1) `getRandom` but O(N) delete; a Hash Map has O(1) delete but no random index. Together, they do everything in O(1)!
2. **Key Takeaway #2:** In LRU Cache, two sentinel nodes (`left_lru_dummy` and `right_mru_dummy`) eliminate all null-pointer edge cases.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Design + Supporting DS)
- [x] The prompt starts with `Design a data structure that supports...` requiring O(1) across multiple seemingly conflicting operations.
- [x] **LRU Cache** (`get` and `put` in O(1) evicting the least recently used): `Hash Map + Doubly Linked List`.
- [x] **Insert / Delete / GetRandom in O(1)** (`RandomizedSet`): `Hash Map {val: idx} + Dynamic Array` (swapping the deleted element with the last element before popping).
- [x] **Min Stack** (`push`, `pop`, `getMin` in O(1)): Stack storing pairs `(value, min_so_far)`.

### When NOT to Use It (False Positives)
- [!] When a single built-in data structure already satisfies all required time bounds.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Class design problems requiring O(1) per method call`
- **Average Time Complexity:** `O(1) across all custom methods`
- **Worst-Case Time Complexity:** `O(1)`
- **Space Complexity:** `O(N) or O(Capacity)`
- **Engineering Note:** Each supporting structure handles the operation where the other would be O(N).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. List every required method and its target time complexity.
2. Pick the primary lookup structure (e.g., Hash Map for O(1) key lookup) and the ordering structure (e.g., Doubly Linked List for O(1) recency updates).
3. Keep both structures strictly synchronized on every mutation.

### Common Bugs & Edge Cases
- **Interview Trap:** In `RandomizedSet.remove(val)`, deleting `del val_to_idx[val]` BEFORE setting `val_to_idx[last_val] = idx` breaks when the removed element IS the last element of the array.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
import random

class RandomizedSet:
    """
    Classic Combo: Dynamic Array + Hash Map for O(1) Insert, Remove, and GetRandom.
    Key trick: To delete nums[idx] in O(1), overwrite nums[idx] with nums[-1] and pop()!
    """
    def __init__(self):
        self.nums: list[int] = []
        self.val_to_idx: dict[int, int] = {}

    def insert(self, val: int) -> bool:
        if val in self.val_to_idx:
            return False
        self.val_to_idx[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.val_to_idx:
            return False
        idx = self.val_to_idx[val]
        last_val = self.nums[-1]
        # Move the last element into the deleted slot 'idx'
        self.nums[idx] = last_val
        self.val_to_idx[last_val] = idx
        # Pop from the end in O(1)
        self.nums.pop()
        del self.val_to_idx[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)
```

### TypeScript / JavaScript Template
```typescript
export class MinStack {
  private stack: Array<{ val: number; min: number }> = [];

  push(val: number): void {
    const currentMin =
      this.stack.length === 0 ? val : Math.min(val, this.stack[this.stack.length - 1].min);
    this.stack.push({ val, min: currentMin });
  }

  pop(): void {
    this.stack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1].val;
  }

  getMin(): number {
    return this.stack[this.stack.length - 1].min;
  }
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 02:00] The Art of Pairing Data Structures
- **On-Screen Visual / Slide Cue:** Diagram linking Hash Map keys directly to nodes inside a Doubly Linked List (LRU Cache).
- **Narration / Teleprompter Script:**
  > "In data structure design interviews, you are asked for combinations that seem impossible at first: O(1) key lookup, O(1) recency ordering, and O(1) arbitrary deletion. The secret is making two data structures work as a team."

### [02:00 - 05:00] LRU Cache and the Swap-and-Pop Trick in RandomizedSet
- **On-Screen Visual / Slide Cue:** Animation showing index 2 deleted from an Array in O(1) by copying the last element into slot 2.
- **Narration / Teleprompter Script:**
  > "How do you delete an element from the middle of an Array in O(1) time when order does not matter? Copy the last element over the slot you want to delete, update its index in the Hash Map, and pop the back."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #21, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Class design problems requiring O(1) per method call`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving Design + Supporting DS interview problems with nested loops! When constraints reach Class design problems requiring O(1) per method call, your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of Design + Supporting DS as A librarian with a digital index (Hash Map) that points directly to the exact link in a movable chain of books (Doubly Linked List). The index finds any book in O(1), and the doubly linked chain moves that book to the 'most recently read' front in O(1).. First, list every required method and its target time complexity. Then, pick the primary lookup structure (e.g., hash map for o(1) key lookup) and the ordering structure (e.g., doubly linked list for o(1) recency updates). This collapses your time complexity from an unviable brute-force right down to O(1) across all custom methods! Watch out for the trap though: in `randomizedset.remove(val)`, deleting `del val_to_idx[val]` before setting `val_to_idx[last_val] = idx` breaks when the removed element is the last element of the array."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#146. LRU Cache** | `Medium` | [https://leetcode.com/problems/lru-cache/](https://leetcode.com/problems/lru-cache/) | Hash Map `{key: Node}` + Doubly Linked List with `head` and `tail` dummy sentinels. |
| **#380. Insert Delete GetRandom O(1)** | `Medium` | [https://leetcode.com/problems/insert-delete-getrandom-o1/](https://leetcode.com/problems/insert-delete-getrandom-o1/) | Array + Hash Map: to delete in O(1), swap with `nums[-1]`, update its index in the map, and `pop()`. |
| **#155. Min Stack** | `Medium` | [https://leetcode.com/problems/min-stack/](https://leetcode.com/problems/min-stack/) | Store `(val, min_up_to_this_level)` at each entry of the stack. |

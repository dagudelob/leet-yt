import { DSATopic } from "@/types/dsa";

export const TOPICS_LEVEL_3_4: DSATopic[] = [
  // ============================================================================
  // LEVEL 3: LINKED POINTERS, STACKS, QUEUES & DATA STRUCTURE DESIGN (15 - 20)
  // ============================================================================
  {
    id: "linked-list",
    order: 15,
    title: "Linked Lists (Singly & Doubly Linked)",
    shortTitle: "Linked Lists",
    englishTerm: "Singly & Doubly Linked Lists",
    kind: "data-structure",
    level: 3,
    difficulty: "Beginner",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["arrays"],
    summary:
      "Independent nodes scattered across memory where each node holds a value and a pointer (`next`, plus `prev` in doubly linked lists) to the adjacent node. Enables O(1) insertion and deletion anywhere once you hold a reference to the node.",
    analogy:
      "A treasure hunt of envelopes: the first envelope is not physically glued to the second, but inside it is a note saying 'the next clue is under the blue flowerpot'. To reach clue #5, you must follow clues 1, 2, 3, and 4 in sequence.",
    whenToUse: [
      "You need O(1) insertion or deletion at the head, tail, or middle without shifting contiguous array memory.",
      "Doubly Linked Lists (`prev` and `next`): when you need to unlink an arbitrary node from the middle of a queue in O(1) given its direct pointer (the backbone of LRU Cache).",
    ],
    whenNotToUse: [
      "When you need O(1) random access by index (`get(i)` takes O(N) because you must walk from `head`).",
    ],
    timeComplexity: {
      average: "Insert/Delete given node pointer: O(1) | Search by index/value: O(N)",
      worst: "O(N)",
      note: "Using a sentinel `dummy = ListNode(0, head)` eliminates special-case edge logic when deleting or replacing the head node.",
    },
    spaceComplexity: "O(N) nodes and pointers",
    constraintHint: "In-place pointer rewiring in O(1) extra memory",
    pythonTemplate: `class ListNode:
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
    return dummy.next`,
    typescriptTemplate: `export class ListNode {
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
}`,
    leetcodeProblems: [
      {
        number: 21,
        title: "Merge Two Sorted Lists",
        slug: "merge-two-sorted-lists",
        difficulty: "Easy",
        patternHint: "Create a `dummy` node and stitch the smaller head between `l1` and `l2` at each step.",
      },
      {
        number: 203,
        title: "Remove Linked List Elements",
        slug: "remove-linked-list-elements",
        difficulty: "Easy",
        patternHint: "Use `dummy.next = head` so leading target nodes are removed cleanly.",
      },
      {
        number: 707,
        title: "Design Linked List",
        slug: "design-linked-list",
        difficulty: "Medium",
        patternHint: "Implement with `head_dummy` and `tail_dummy` sentinels to simplify boundary insertions.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Contrast an Array (contiguous lockers in RAM) with a Linked List (nodes linked by pointer arrows). Explain why the 'Dummy Sentinel Node' is a developer's best friend for avoiding null-pointer bugs when the head of the list changes.",
      keyTakeaways: [
        "In a Linked List there are no automatic indices: losing the reference to `head` loses the entire list.",
        "The order of pointer reassignment matters: always save `nxt = curr.next` before overwriting `curr.next`.",
        "Placing a `dummy` node before `head` guarantees every real node has a valid predecessor.",
      ],
      stepByStepWalkthrough: [
        "Sketch 3 boxes and arrows before writing any pointer manipulation code.",
        "Create `dummy = ListNode(0, head)` whenever the original head might be deleted or moved.",
        "Return `dummy.next` at the end.",
      ],
      interviewTraps: [
        "Overwriting `curr.next = new_node` before setting `new_node.next = curr.next`, severing the chain and losing the rest of the list.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Arrays vs Linked Lists: Contiguous Lockers vs Treasure Hunt",
          visualCue: "Animation of nodes floating in memory connected by glowing pointer arrows.",
          narration:
            "If Arrays are numbered lockers along a wall, a Linked List is a chain of clues where each node only knows where the next node lives. That makes indexing slow, but splicing links in O(1) instant.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "The Superpower of the Dummy Sentinel Node",
          visualCue: "A gray 'Dummy' node placed ahead of 'head', allowing the first element to be deleted without edge cases.",
          narration:
            "Eighty percent of linked list bugs happen when deleting or moving the very first node. The clean engineering fix is placing a dummy sentinel node at the front and returning `dummy.next`.",
        },
      ],
    },
  },
  {
    id: "linkedlist-manipulation",
    order: 16,
    title: "Linked List Manipulation (Fast & Slow Pointers & Reversal)",
    shortTitle: "LL Manipulation",
    englishTerm: "Fast & Slow Pointers & In-Place Reversal",
    kind: "algorithm",
    level: 3,
    difficulty: "Intermediate",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["linked-list", "two-pointers"],
    summary:
      "The two surgical techniques on linked lists: 1) Tortoise and Hare (`slow` moves 1 step, `fast` moves 2 steps) to locate the middle node or detect cycles in O(1) space, and 2) In-place pointer reversal using `prev, curr, nxt`.",
    analogy:
      "Two runners on a track: on a straight track, when the runner moving at 2x speed reaches the finish line, the 1x runner is at the exact midpoint. On a circular track (a cycle), the faster runner is guaranteed to lap and meet the slower runner.",
    whenToUse: [
      "Finding the middle node of a linked list in a single pass without pre-counting its length.",
      "Detecting whether a linked list (or functional state sequence) contains a cycle and finding the cycle entry point (Floyd's Cycle Detection).",
      "Reversing an entire linked list or a subsegment `[left, right]` in-place in O(1) extra space.",
    ],
    whenNotToUse: [
      "Never access `fast.next.next` without first checking `while fast and fast.next:` in your loop guard.",
    ],
    timeComplexity: {
      average: "O(N)",
      worst: "O(N)",
      note: "Achieves O(1) auxiliary space compared to O(N) for a Hash Set or recursive call stack.",
    },
    spaceComplexity: "O(1) in-place pointers",
    constraintHint: "Linked list or functional cycle problems requiring O(1) extra memory",
    pythonTemplate: `def reverse_linked_list(head):
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
    return False`,
    typescriptTemplate: `import { ListNode } from "./linked-list";

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
}`,
    leetcodeProblems: [
      {
        number: 206,
        title: "Reverse Linked List",
        slug: "reverse-linked-list",
        difficulty: "Easy",
        patternHint: "4-line pointer dance with `prev = None`, `curr = head`, and `nxt = curr.next`.",
      },
      {
        number: 141,
        title: "Linked List Cycle",
        slug: "linked-list-cycle",
        difficulty: "Easy",
        patternHint: "Tortoise (`slow.next`) and Hare (`fast.next.next`) in O(1) space.",
      },
      {
        number: 143,
        title: "Reorder List",
        slug: "reorder-list",
        difficulty: "Medium",
        patternHint: "The ultimate combo: 1) Find middle with Slow/Fast, 2) Reverse second half in-place, 3) Zipper-merge both halves.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Make the listener master the two most-asked linked list choreographies: 1) The 4-step in-place reversal dance (`nxt = curr.next`, `curr.next = prev`, `prev = curr`, `curr = nxt`) and 2) Floyd's Tortoise and Hare algorithm, showing how both combine in 'Reorder List' and 'Palindrome Linked List'.",
      keyTakeaways: [
        "Reversing a list in-place requires only 3 variables (`prev`, `curr`, `nxt`) and 4 cyclical assignments.",
        "When `fast` reaches the end of the list, `slow` sits at the exact midpoint.",
        "In Floyd's cycle detection, resetting one pointer to `head` after collision and advancing both by 1 step meets at the exact cycle entrance.",
      ],
      stepByStepWalkthrough: [
        "For midpoint/cycle: initialize `slow = fast = head` and loop with `while fast and fast.next:`.",
        "For reversal: initialize `prev = None`, `curr = head`, save `nxt = curr.next` on each step, and return `prev`.",
        "For composite problems (`Reorder List`), sever the two halves with `slow.next = None` before reversing the second half.",
      ],
      interviewTraps: [
        "In `Reorder List`, forgetting to cut the link between the first and second halves (`slow.next = None`), causing an infinite cycle when merging.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "The 4-Step Choreography: In-Place Linked List Reversal",
          visualCue: "Animation of arrows flipping 180 degrees node by node using `prev`, `curr`, and `nxt`.",
          narration:
            "Reversing a linked list is such a foundational interview question that you should be able to write it with your eyes closed. Do not memorize raw text—visualize the four-step cycle where each pointer takes the previous pointer's spot.",
        },
        {
          timestamp: "02:00 - 04:45",
          sectionTitle: "Tortoise & Hare (Floyd) and the Reorder List Combo",
          visualCue: "Two cursors moving at 1x and 2x speed finding the middle and zipper-merging both halves.",
          narration:
            "How do you find the middle of a list without knowing its length? Use a slow pointer and a fast pointer. Combine that with reversing the second half, and you can solve Medium and Hard linked list problems in O(1) memory.",
        },
      ],
    },
  },
  {
    id: "stacks",
    order: 17,
    title: "Stacks (LIFO & Nested Expression Evaluation)",
    shortTitle: "Stacks (LIFO)",
    englishTerm: "Stacks (LIFO)",
    kind: "hybrid",
    level: 3,
    difficulty: "Beginner",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["arrays"],
    summary:
      "Last-In, First-Out (LIFO) structure ideal for tracking recent history, validating nested scopes (parentheses, HTML tags), undoing actions, and simulating recursion iteratively.",
    analogy:
      "A stack of clean plates in a cafeteria: you always place a new plate on the very top (`push`), and the next person takes that exact top plate first (`pop`).",
    whenToUse: [
      "Validating or matching nested opening and closing symbols (`()`, `{}`, `[]`, tags).",
      "Evaluating mathematical expressions (Reverse Polish Notation / RPN, calculators, decoding nested strings like `3[a2[c]]`).",
      "Tracking active path state (Unix file path simplification `/a/b/../c`, browser Back/Undo history).",
    ],
    whenNotToUse: [
      "When items must be processed in strict arrival order (use a FIFO Queue instead).",
    ],
    timeComplexity: {
      average: "Push: O(1) | Pop: O(1) | Peek (`stack[-1]`): O(1)",
      worst: "O(N) to process N tokens",
      note: "In Python, a standard `list` serves as a fast Stack using `append()` and `pop()`.",
    },
    spaceComplexity: "O(N) worst case when all elements are pushed",
    constraintHint: "Nested structures, parentheses, calculators, or path history with N <= 10^5",
    pythonTemplate: `def is_valid_parentheses(s: str) -> bool:
    """
    Classic LIFO Matching Pattern with a Stack.
    Time: O(N) | Space: O(N)
    """
    closing_to_opening = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []

    for ch in s:
        if ch in closing_to_opening:
            # A closing bracket must match the most recent unclosed opening bracket on top
            if not stack or stack[-1] != closing_to_opening[ch]:
                return False
            stack.pop()
        else:
            stack.append(ch)

    # Stack must be completely empty at the end
    return len(stack) == 0`,
    typescriptTemplate: `export function isValidParentheses(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];

  for (const ch of s) {
    if (ch in pairs) {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
    leetcodeProblems: [
      {
        number: 20,
        title: "Valid Parentheses",
        slug: "valid-parentheses",
        difficulty: "Easy",
        patternHint: "Push opening brackets and verify the top of the stack upon seeing a closing bracket.",
      },
      {
        number: 150,
        title: "Evaluate Reverse Polish Notation",
        slug: "evaluate-reverse-polish-notation",
        difficulty: "Medium",
        patternHint: "Push numbers; on an operator, pop the top 2 operands (`b = pop()`, `a = pop()`) and push `a op b`.",
      },
      {
        number: 394,
        title: "Decode String",
        slug: "decode-string",
        difficulty: "Medium",
        patternHint: "On `[`, push `(prev_string, repeat_k)` onto the stack; on `]`, pop and expand.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how a Stack models nested scopes ('the last scope opened must be the first scope closed'). Show why every recursive function uses a Call Stack under the hood and how an explicit stack solves parentheses matching, calculators, and `Decode String`.",
      keyTakeaways: [
        "LIFO (Last-In, First-Out): the most recently opened item is always the first to be resolved.",
        "Always guard with `if not stack:` before reading `stack[-1]` or calling `stack.pop()`.",
        "At the end of the loop, verify `len(stack) == 0` to catch unclosed opening brackets.",
      ],
      stepByStepWalkthrough: [
        "Scan tokens or characters from left to right.",
        "When entering a new nested context (opening bracket, operand), `stack.append(x)`.",
        "When closing or combining the most recent context, `stack.pop()` and merge with the new top.",
      ],
      interviewTraps: [
        "Returning `True` at the end of `Valid Parentheses` without checking `len(stack) == 0` (fails on inputs like `'((('`).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "The Law of Nesting: Last Opened, First Closed",
          visualCue: "Nested Russian dolls and parentheses pushing and popping from a vertical stack.",
          narration:
            "Think about how parentheses work in math or how folders nest on your computer: the last block you opened is strictly the first block you must close. That property is called LIFO, and its data structure is the Stack.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "From Valid Parentheses to Calculators and Decode String",
          visualCue: "Animation of `3[a2[c]]` saving outer context on the stack when entering each bracket.",
          narration:
            "Whenever you have patterns nested inside other patterns, like in Decode String, a stack lets you pause what you were building outside, solve the inner bracket, and resume right where you left off.",
        },
      ],
    },
  },
  {
    id: "queues-deques",
    order: 18,
    title: "Queues & Deques (FIFO & Double-Ended Queues)",
    shortTitle: "Queues & Deques",
    englishTerm: "Queues (FIFO) & Double-Ended Queues (Deque)",
    kind: "data-structure",
    level: 3,
    difficulty: "Beginner",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["arrays", "linked-list"],
    summary:
      "First-In, First-Out (FIFO) queues and Double-Ended Queues (`collections.deque`) that support O(1) insertions and pops from both the front and the back.",
    analogy:
      "A checkout line at a grocery store (FIFO Queue): the first customer in line is the first customer served. A Deque is a VIP hallway with doors at both ends, letting you add or remove from either side in O(1).",
    whenToUse: [
      "Processing events or tasks in strict arrival order (sliding time windows, rate limiters, stream buffers).",
      "Traversing trees or graphs level by level (the engine behind Breadth-First Search - BFS).",
      "Maintaining sliding windows where elements enter on the right and expire from the left in O(1).",
    ],
    whenNotToUse: [
      "In Python, NEVER use `list.pop(0)` as a queue because shifting costs O(N); always import `from collections import deque` and call `popleft()` in O(1).",
    ],
    timeComplexity: {
      average: "append / appendleft / pop / popleft: O(1)",
      worst: "O(1) at both ends",
      note: "`collections.deque` is implemented in C as a doubly linked list of fixed-size blocks.",
    },
    spaceComplexity: "O(N) for buffered elements",
    constraintHint: "Arrival-order processing, circular buffers, or BFS",
    pythonTemplate: `from collections import deque

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
        return len(self.q)`,
    typescriptTemplate: `export class CircularDeque<T> {
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
}`,
    leetcodeProblems: [
      {
        number: 933,
        title: "Number of Recent Calls",
        slug: "number-of-recent-calls",
        difficulty: "Easy",
        patternHint: "Append `t` and evict calls `< t - 3000` from the front using `popleft()`.",
      },
      {
        number: 622,
        title: "Design Circular Queue",
        slug: "design-circular-queue",
        difficulty: "Medium",
        patternHint: "Fixed array of size `K` with circular index math `(head + count) % K`.",
      },
      {
        number: 225,
        title: "Implement Stack using Queues",
        slug: "implement-stack-using-queues",
        difficulty: "Easy",
        patternHint: "After pushing a new element, rotate the previous `N - 1` elements behind it.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain the FIFO philosophy and why Python's `collections.deque` (Double-Ended Queue) is the Swiss Army knife that acts as a Stack, a Queue, and a Sliding Window buffer in O(1). Also show how a Circular Queue wraps around a fixed array using `% capacity`.",
      keyTakeaways: [
        "FIFO processes items in order of arrival or distance (making it the engine of BFS shortest paths).",
        "`collections.deque` gives `append`, `appendleft`, `pop`, and `popleft` all in O(1).",
        "In JavaScript/TypeScript, avoid `Array.shift()` on large queues; use head/tail pointers or a two-array queue.",
      ],
      stepByStepWalkthrough: [
        "Import `from collections import deque`.",
        "Enqueue new items at the back with `q.append(x)`.",
        "Dequeue the oldest item from the front with `q.popleft()`.",
      ],
      interviewTraps: [
        "Using `Array.shift()` in JS or `list.pop(0)` in Python on a queue with 100,000 items, causing O(N^2) TLE.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "FIFO vs LIFO: Fairness of Arrival Order",
          visualCue: "Tunnel where items enter on the right and exit in the exact same order on the left.",
          narration:
            "While a Stack always serves the newest arrival first, a Queue respects the line: First-In, First-Out. It is the essential structure for real-time event streams and level-by-level graph exploration.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "Deques and Circular Queues: O(1) at Both Ends",
          visualCue: "Circular ring buffer with `head` and `tail` pointers advancing via `% capacity`.",
          narration:
            "With a Deque or Circular Queue, you get instant insertions and removals at both the front and the back—setting the stage for BFS and Monotonic Queues.",
        },
      ],
    },
  },
  {
    id: "monotonic-stack",
    order: 19,
    title: "Monotonic Stack & Monotonic Deque",
    shortTitle: "Monotonic Stack",
    englishTerm: "Monotonic Stack & Monotonic Deque",
    kind: "algorithm",
    level: 3,
    difficulty: "Intermediate",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["stacks", "queues-deques"],
    summary:
      "Maintaining a stack or deque whose elements are kept strictly sorted (increasing or decreasing). Whenever a new element breaks the monotonic order, we pop smaller/larger elements from the top—resolving the 'Next Greater or Smaller Element' for every index in O(N) total time.",
    analogy:
      "A line of buildings facing the ocean: when a tall new skyscraper is built in front, it blocks the view of all shorter buildings behind it. Those shorter buildings can never be the 'tallest visible building' for anyone further back, so we can pop and retire them immediately.",
    whenToUse: [
      "Finding the **Next Greater Element**, **Next Smaller Element**, or **Previous Greater/Smaller Element** for every index `i` (`Daily Temperatures`, `Next Greater Element`).",
      "Finding the largest rectangle in a histogram (`Largest Rectangle in Histogram`) or trapped rainwater (`Trapping Rain Water`).",
      "**Monotonic Deque**: Finding the maximum or minimum inside a sliding window of length `K` in O(N) time (`Sliding Window Maximum`).",
    ],
    whenNotToUse: [
      "If you only need the global running maximum or minimum from index 0 to `i` (a single variable `max_so_far` suffices).",
    ],
    timeComplexity: {
      average: "O(N)",
      worst: "O(N)",
      note: "Each index is pushed onto the stack once and popped at most once (at most 2N operations total).",
    },
    spaceComplexity: "O(N) for the stack of indices",
    constraintHint: "Next Greater/Smaller Element, Histograms, or Sliding Window Maximum with N <= 10^5",
    pythonTemplate: `def daily_temperatures(temps: list[int]) -> list[int]:
    """
    Universal Monotonic Decreasing Stack Template (always store INDICES, not raw values).
    Finds for each day how many days until the next warmer temperature.
    Time: O(N) | Space: O(N)
    """
    n = len(temps)
    ans = [0] * n
    stack: list[int] = []  # Stack of indices with strictly decreasing temperatures

    for i, curr_temp in enumerate(temps):
        # While today's temperature is WARMER than the day at the top of the stack,
        # today 'i' is the Next Greater Element for stack[-1]!
        while stack and curr_temp > temps[stack[-1]]:
            prev_idx = stack.pop()
            ans[prev_idx] = i - prev_idx
        stack.append(i)

    return ans`,
    typescriptTemplate: `export function dailyTemperatures(temps: number[]): number[] {
  const n = temps.length;
  const ans = new Array<number>(n).fill(0);
  const stack: number[] = []; // Stores indices

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
      const prevIdx = stack.pop()!;
      ans[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return ans;
}`,
    leetcodeProblems: [
      {
        number: 739,
        title: "Daily Temperatures",
        slug: "daily-temperatures",
        difficulty: "Medium",
        patternHint: "Monotonic decreasing stack of indices: pop whenever `temps[i] > temps[stack[-1]]`.",
      },
      {
        number: 84,
        title: "Largest Rectangle in Histogram",
        slug: "largest-rectangle-in-histogram",
        difficulty: "Hard",
        patternHint: "Monotonic increasing stack: when a shorter bar arrives, popped bars know both their left and right smaller boundaries.",
      },
      {
        number: 239,
        title: "Sliding Window Maximum",
        slug: "sliding-window-maximum",
        difficulty: "Hard",
        patternHint: "Monotonic decreasing Deque: pop smaller elements from the back and evict out-of-window indices `< i - k + 1` from the front.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Demystify the Monotonic Stack—a topic that intimidates many candidates yet boils down to a 10-line template. Emphasize the golden rule: 'Always push INDICES onto the stack, not just values', and show how popping reveals both the right and left boundaries of a bar in `Largest Rectangle in Histogram`.",
      keyTakeaways: [
        "To find the **Next Greater** element, maintain a **Monotonic Decreasing** stack: the first larger element triggers pops.",
        "To find the **Next Smaller** element, maintain a **Monotonic Increasing** stack.",
        "Always store INDICES in the stack so you can compute widths (`i - prev_idx`) and look up values (`nums[i]`).",
      ],
      stepByStepWalkthrough: [
        "Initialize `stack = []` to hold indices waiting for their next greater/smaller match.",
        "For each index `i`, run `while stack and nums[i] > nums[stack[-1]]:` to pop and resolve waiting indices.",
        "Push the current index `stack.append(i)`.",
      ],
      interviewTraps: [
        "Pushing raw values `nums[i]` instead of indices `i`, making it impossible to calculate distances or histogram widths.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "The Skyscraper Intuition: What Is a Monotonic Stack?",
          visualCue: "Bars of varying heights; when a tall bar arrives, shorter waiting bars pop and record their distance.",
          narration:
            "If you want to know for every day of the year how soon a warmer day will arrive, checking every future day takes O(N^2). With a Monotonic Stack, cooler days wait in line until a warm day arrives and resolves all of them in a single O(N) sweep.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Histograms and Sliding Window Maximum (Monotonic Deque)",
          visualCue: "Animation of `Largest Rectangle in Histogram` and `Sliding Window Maximum` with a decreasing Deque.",
          narration:
            "The magic of an increasing stack is that when a bar is popped because a shorter bar arrived, the incoming bar is its right boundary and the new stack top below it is its left boundary.",
        },
      ],
    },
  },
  {
    id: "system-ds-design",
    order: 20,
    title: "Design + Supporting Data Structures (LRU Cache, O(1) Set)",
    shortTitle: "Design + Supporting DS",
    englishTerm: "Data Structure Design (LRU, LFU, RandomizedSet)",
    kind: "hybrid",
    level: 3,
    difficulty: "Intermediate",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["hash-table", "linked-list", "arrays", "stacks"],
    summary:
      "Combining two or more data structures—such as `Hash Map + Doubly Linked List` or `Hash Map + Dynamic Array`—so each structure covers the weakness of the other and EVERY operation runs in O(1) time.",
    analogy:
      "A librarian with a digital index (Hash Map) that points directly to the exact link in a movable chain of books (Doubly Linked List). The index finds any book in O(1), and the doubly linked chain moves that book to the 'most recently read' front in O(1).",
    whenToUse: [
      "The prompt starts with `Design a data structure that supports...` requiring O(1) across multiple seemingly conflicting operations.",
      "**LRU Cache** (`get` and `put` in O(1) evicting the least recently used): `Hash Map + Doubly Linked List`.",
      "**Insert / Delete / GetRandom in O(1)** (`RandomizedSet`): `Hash Map {val: idx} + Dynamic Array` (swapping the deleted element with the last element before popping).",
      "**Min Stack** (`push`, `pop`, `getMin` in O(1)): Stack storing pairs `(value, min_so_far)`.",
    ],
    whenNotToUse: [
      "When a single built-in data structure already satisfies all required time bounds.",
    ],
    timeComplexity: {
      average: "O(1) across all custom methods",
      worst: "O(1)",
      note: "Each supporting structure handles the operation where the other would be O(N).",
    },
    spaceComplexity: "O(N) or O(Capacity)",
    constraintHint: "Class design problems requiring O(1) per method call",
    pythonTemplate: `import random

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
        return random.choice(self.nums)`,
    typescriptTemplate: `export class MinStack {
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
}`,
    leetcodeProblems: [
      {
        number: 146,
        title: "LRU Cache",
        slug: "lru-cache",
        difficulty: "Medium",
        patternHint: "Hash Map `{key: Node}` + Doubly Linked List with `head` and `tail` dummy sentinels.",
      },
      {
        number: 380,
        title: "Insert Delete GetRandom O(1)",
        slug: "insert-delete-getrandom-o1",
        difficulty: "Medium",
        patternHint: "Array + Hash Map: to delete in O(1), swap with `nums[-1]`, update its index in the map, and `pop()`.",
      },
      {
        number: 155,
        title: "Min Stack",
        slug: "min-stack",
        difficulty: "Medium",
        patternHint: "Store `(val, min_up_to_this_level)` at each entry of the stack.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Frame this episode as 'Hybrid Data Structure Architecture': how pairing two simple structures unlocks O(1) superpowers. Cover the 3 most-asked design questions in interview history: 1) LRU Cache (Hash Map + Doubly Linked List), 2) RandomizedSet (Array + Hash Map with the swap-with-last trick), and 3) Min Stack.",
      keyTakeaways: [
        "No single basic structure does everything in O(1): an Array has O(1) `getRandom` but O(N) delete; a Hash Map has O(1) delete but no random index. Together, they do everything in O(1)!",
        "In LRU Cache, two sentinel nodes (`left_lru_dummy` and `right_mru_dummy`) eliminate all null-pointer edge cases.",
      ],
      stepByStepWalkthrough: [
        "List every required method and its target time complexity.",
        "Pick the primary lookup structure (e.g., Hash Map for O(1) key lookup) and the ordering structure (e.g., Doubly Linked List for O(1) recency updates).",
        "Keep both structures strictly synchronized on every mutation.",
      ],
      interviewTraps: [
        "In `RandomizedSet.remove(val)`, deleting `del val_to_idx[val]` BEFORE setting `val_to_idx[last_val] = idx` breaks when the removed element IS the last element of the array.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "The Art of Pairing Data Structures",
          visualCue: "Diagram linking Hash Map keys directly to nodes inside a Doubly Linked List (LRU Cache).",
          narration:
            "In data structure design interviews, you are asked for combinations that seem impossible at first: O(1) key lookup, O(1) recency ordering, and O(1) arbitrary deletion. The secret is making two data structures work as a team.",
        },
        {
          timestamp: "02:00 - 05:00",
          sectionTitle: "LRU Cache and the Swap-and-Pop Trick in RandomizedSet",
          visualCue: "Animation showing index 2 deleted from an Array in O(1) by copying the last element into slot 2.",
          narration:
            "How do you delete an element from the middle of an Array in O(1) time when order does not matter? Copy the last element over the slot you want to delete, update its index in the Hash Map, and pop the back.",
        },
      ],
    },
  },

  // ============================================================================
  // LEVEL 4: RECURSION, TREES, HEAPS & BACKTRACKING (21 - 28)
  // ============================================================================
  {
    id: "divide-and-conquer",
    order: 21,
    title: "Divide and Conquer",
    shortTitle: "Divide & Conquer",
    englishTerm: "Divide and Conquer",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["arrays", "binary-search"],
    summary:
      "Solving a large problem by splitting it into two or more independent subproblems of the same type (Divide), solving them recursively (Conquer), and merging their results into the final answer (Combine).",
    analogy:
      "Counting millions of ballots in a national election: one person would take years, but if you split the country into states, districts, and local polling tables, each table counts 200 ballots in minutes and the totals are summed upward.",
    whenToUse: [
      "The problem splits cleanly into independent halves whose solutions can be merged efficiently (`Merge Sort`, `Count of Smaller Numbers After Self`, `Merge K Sorted Lists`).",
      "Recursive construction of balanced trees or geometric structures (`Convert Sorted Array to BST`, `Construct Quad Tree`).",
    ],
    whenNotToUse: [
      "When subproblems are NOT independent and recompute the exact same state repeatedly (overlapping subproblems): pure Divide & Conquer becomes exponential—use Memoization / Dynamic Programming instead.",
    ],
    timeComplexity: {
      average: "O(N log N) when splitting in half and merging in O(N)",
      worst: "O(N log N)",
      note: "A recursion tree of height `log2(N)` performing `O(N)` total work per level.",
    },
    spaceComplexity: "O(N) auxiliary in Merge Sort + O(log N) recursion stack",
    constraintHint: "Recursive halving with N <= 10^5 achieving O(N log N)",
    pythonTemplate: `def merge_sort(nums: list[int]) -> list[int]:
    """
    Canonical Divide & Conquer Blueprint (Merge Sort).
    1. Base case: len <= 1
    2. Divide: split at mid
    3. Conquer: recursively sort left and right halves
    4. Combine: merge two sorted halves in O(N)
    """
    if len(nums) <= 1:
        return nums

    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])

    # Combine step (two-pointer merge)
    merged: list[int] = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged`,
    typescriptTemplate: `export function mergeSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));

  const merged: number[] = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  while (i < left.length) merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);
  return merged;
}`,
    leetcodeProblems: [
      {
        number: 912,
        title: "Sort an Array",
        slug: "sort-an-array",
        difficulty: "Medium",
        patternHint: "Implement Merge Sort for guaranteed O(N log N) worst-case performance.",
      },
      {
        number: 108,
        title: "Convert Sorted Array to Binary Search Tree",
        slug: "convert-sorted-array-to-binary-search-tree",
        difficulty: "Easy",
        patternHint: "Pick `mid` as the root; recursively build the left subtree from `[:mid]` and right subtree from `[mid+1:]`.",
      },
      {
        number: 23,
        title: "Merge k Sorted Lists",
        slug: "merge-k-sorted-lists",
        difficulty: "Hard",
        patternHint: "Pairwise divide and conquer the K lists in O(N log K) time.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain the 3 phases of Divide & Conquer (Divide, Conquer, Combine) and visualize the Merge Sort recursion tree to show why `log2(N)` levels times `O(N)` work per level equals `O(N log N)`. Contrast independent subproblems (Divide & Conquer) with overlapping subproblems (Dynamic Programming).",
      keyTakeaways: [
        "Every recursive algorithm starts with a Base Case that stops further splitting (`if len <= 1`).",
        "The magic of Merge Sort happens in the Combine step: merging two already-sorted lists takes only O(N) with two pointers.",
        "You can count inversions or cross-pairs during the Merge step in O(N log N).",
      ],
      stepByStepWalkthrough: [
        "Define the base case for inputs of size 0 or 1.",
        "Split the input at `mid` and recursively solve the left and right subproblems.",
        "Combine the two child results in linear time.",
      ],
      interviewTraps: [
        "Missing the base case or failing to shrink one of the halves, causing `RecursionError: maximum recursion depth exceeded`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Divide, Conquer, and Combine: The Recursive Mindset",
          visualCue: "Tree splitting an 8-element array down to singletons and merging them back up in sorted order.",
          narration:
            "Before tackling Binary Trees, we need to build trust in recursion. Divide and Conquer teaches us the recursive leap of faith: split the problem in half, trust the recursive call to solve each half, and focus purely on how to merge the two answers.",
        },
        {
          timestamp: "01:45 - 04:15",
          sectionTitle: "Why Halving Creates log2(N) Levels",
          visualCue: "Horizontal tree levels where every floor sums to exactly N operations.",
          narration:
            "When you cut a problem in half at each step, you can only cut it log-base-2 of N times before reaching size 1. Doing O(N) merge work across log(N) floors gives O(N log N).",
        },
      ],
    },
  },
  {
    id: "trees",
    order: 22,
    title: "Binary Trees & Traversals (Pre / In / Post-Order)",
    shortTitle: "Binary Trees",
    englishTerm: "Binary Trees & Traversals (Pre/In/Post-Order)",
    kind: "data-structure",
    level: 4,
    difficulty: "Beginner",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["divide-and-conquer", "linked-list"],
    summary:
      "Hierarchical acyclic structures where each node holds a value and up to two children (`left` and `right`). Because every subtree is itself a binary tree, 95% of tree problems can be solved with 5-line recursive functions.",
    analogy:
      "A company org chart: the CEO (`root`) asks the VP of Engineering (`left`) and VP of Product (`right`) for their headcount; each VP asks their directors down to individual contributors (`leaves`), and the totals bubble back up to the CEO.",
    whenToUse: [
      "Representing hierarchical data, abstract syntax trees (ASTs), or recursive decision structures.",
      "**Pre-order (`Root -> Left -> Right`)**: Cloning, serializing, or passing top-down context from parent to children.",
      "**In-order (`Left -> Root -> Right`)**: Visiting a Binary Search Tree (BST) in sorted ascending order.",
      "**Post-order (`Left -> Right -> Root`)**: Computing heights, diameters, subtree sums, or Lowest Common Ancestor (LCA) where you need both children's answers before computing the parent's.",
    ],
    whenNotToUse: [
      "If the tree is degenerate (a skewed chain of height `H = N`) and recursion stack limits are tight, use an explicit stack or queue.",
    ],
    timeComplexity: {
      average: "Full traversal: O(N) visiting each node once",
      worst: "O(N)",
      note: "Call stack space is O(H) where H is the tree height (O(log N) balanced, O(N) skewed).",
    },
    spaceComplexity: "O(H) height of the tree on the recursion call stack",
    constraintHint: "Hierarchical TreeNode problems with N <= 10^5",
    pythonTemplate: `class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None):
        self.val = val
        self.left = left
        self.right = right


def max_depth_postorder(root: TreeNode | None) -> int:
    """
    Post-Order Mindset (Bottom-Up):
    1. Base case: an empty tree has height 0.
    2. Ask left child and right child for their heights.
    3. My height is 1 + max(left_height, right_height).
    """
    if not root:
        return 0
    left_height = max_depth_postorder(root.left)
    right_height = max_depth_postorder(root.right)
    return 1 + max(left_height, right_height)`,
    typescriptTemplate: `export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    leetcodeProblems: [
      {
        number: 104,
        title: "Maximum Depth of Binary Tree",
        slug: "maximum-depth-of-binary-tree",
        difficulty: "Easy",
        patternHint: "Base case `None -> 0`, recursive step `1 + max(depth(left), depth(right))`.",
      },
      {
        number: 226,
        title: "Invert Binary Tree",
        slug: "invert-binary-tree",
        difficulty: "Easy",
        patternHint: "Swap `root.left, root.right = invert(root.right), invert(root.left)`.",
      },
      {
        number: 543,
        title: "Diameter of Binary Tree",
        slug: "diameter-of-binary-tree",
        difficulty: "Easy",
        patternHint: "At each node, the longest path curving through it is `left_h + right_h`, while returning `1 + max(left_h, right_h)` upward.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Teach the listener to solve Binary Tree problems by focusing on a SINGLE NODE: 'What information do I pass down to my children (Pre-order), and what information do I need my children to return up to me (Post-order)?'. Walk through 'Diameter of Binary Tree' to show how to update a global answer while returning height upward.",
      keyTakeaways: [
        "Never try to trace the entire tree in your head at once: focus only on the contract between `root`, `root.left`, and `root.right`.",
        "Pre-Order pushes context top-down from parent to child; Post-Order aggregates results bottom-up from children to parent.",
        "Any binary tree with N nodes has exactly `N - 1` edges.",
      ],
      stepByStepWalkthrough: [
        "Define the base case `if not root:` (usually returns `0`, `None`, or `True`).",
        "Decide what value each recursive call must return to its parent.",
        "Combine `left_res` and `right_res` with `root.val`.",
      ],
      interviewTraps: [
        "In `Diameter of Binary Tree` or `Binary Tree Maximum Path Sum`, confusing the path that 'curves through the current node as its peak' (`left + right`, which updates the global max) with the path that 'can continue upward to the parent' (`1 + max(left, right)`).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "The Recursive Nature of Binary Trees",
          visualCue: "Binary tree where each child is framed to show it is a smaller self-similar binary tree.",
          narration:
            "Binary trees look intimidating until you realize a secret: you never have to solve the whole tree. You only write the logic for a single node assuming its left and right children already did their job.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Pre-Order, In-Order, and Post-Order: When to Use Each",
          visualCue: "A cursor tracing the outline of a tree marking 1st visit (Pre), bottom visit (In), and final exit visit (Post).",
          narration:
            "Pre-order, In-order, and Post-order are not three different walks—they are the exact same walk observed at three moments: when arriving at a node, when passing between its children, and right before returning upward.",
        },
      ],
    },
  },
  {
    id: "bst",
    order: 23,
    title: "Binary Search Trees (BST)",
    shortTitle: "BST",
    englishTerm: "Binary Search Trees (BST)",
    kind: "data-structure",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["trees", "binary-search"],
    summary:
      "A binary tree governed by a global ordering invariant: EVERY node in the left subtree is strictly smaller than the root, and EVERY node in the right subtree is strictly larger. Enables O(log N) search, insertion, and deletion when balanced.",
    analogy:
      "A decision hallway where every door has a number: if you are looking for room 42 and stand at door 50, you never even glance down the right corridor because everything to the right is greater than 50—you turn left and eliminate half the building at once.",
    whenToUse: [
      "Searching, inserting, or finding the Lowest Common Ancestor (`LCA`) in O(H) time by exploiting `left < root < right`.",
      "Retrieving elements in sorted order or finding the `K-th Smallest Element` via an **In-Order Traversal (`Left -> Root -> Right`)**.",
    ],
    whenNotToUse: [
      "If sorted elements (`1, 2, 3, 4, 5`) are inserted into an unbalanced BST, it degenerates into a linked list of height `O(N)`.",
    ],
    timeComplexity: {
      average: "Search / Insert / Delete: O(log N) on balanced BST",
      worst: "O(H) where H is tree height (up to O(N) if unbalanced)",
      note: "An In-Order traversal of any valid BST yields a strictly increasing sequence.",
    },
    spaceComplexity: "O(H) recursion stack (or O(1) when navigating iteratively)",
    constraintHint: "Tree with left < node < right invariant or ordered tree queries",
    pythonTemplate: `def is_valid_bst(root, low: float = float("-inf"), high: float = float("inf")) -> bool:
    """
    Validate a BST by propagating the allowed (low, high) range top-down.
    Checking only the immediate parent is NOT enough!
    """
    if not root:
        return True
    if not (low < root.val < high):
        return False
    return (
        is_valid_bst(root.left, low, root.val)
        and is_valid_bst(root.right, root.val, high)
    )


def search_bst_iterative(root, target: int):
    """
    O(H) time and O(1) space search by halving the tree at each step.
    """
    curr = root
    while curr:
        if target == curr.val:
            return curr
        curr = curr.left if target < curr.val else curr.right
    return None`,
    typescriptTemplate: `import { TreeNode } from "./trees";

export function isValidBST(
  root: TreeNode | null,
  low = -Infinity,
  high = Infinity
): boolean {
  if (root === null) return true;
  if (root.val <= low || root.val >= high) return false;
  return (
    isValidBST(root.left, low, root.val) &&
    isValidBST(root.right, root.val, high)
  );
}`,
    leetcodeProblems: [
      {
        number: 98,
        title: "Validate Binary Search Tree",
        slug: "validate-binary-search-tree",
        difficulty: "Medium",
        patternHint: "Pass the open interval `(low, high)` down to children, or verify that In-Order traversal is strictly increasing.",
      },
      {
        number: 230,
        title: "Kth Smallest Element in a BST",
        slug: "kth-smallest-element-in-a-bst",
        difficulty: "Medium",
        patternHint: "Run In-Order traversal (`Left -> Root -> Right`) and stop at the K-th visited node.",
      },
      {
        number: 235,
        title: "Lowest Common Ancestor of a Binary Search Tree",
        slug: "lowest-common-ancestor-of-a-binary-search-tree",
        difficulty: "Medium",
        patternHint: "If both `p` and `q` are smaller than `curr`, go left; if both are larger, go right; the split point is the LCA.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how a BST combines the fast lookup of Binary Search with the dynamic insertion of a Linked List. Highlight the two classic BST interview lessons: 1) The 'Validate BST' trap (why checking only `node.left.val < node.val` fails and you must pass `(low, high)`), and 2) How In-Order traversal flattens any BST into a sorted array.",
      keyTakeaways: [
        "Global BST invariant: the ENTIRE left subtree must be `< root.val`, not just the immediate left child.",
        "In-Order traversal (`Left -> Root -> Right`) visits BST nodes in strictly ascending order.",
        "Searching or finding LCA in a BST is iterative and takes O(1) extra space with a simple `while curr:` loop.",
      ],
      stepByStepWalkthrough: [
        "When searching for a value or LCA, compare with `curr.val` to branch left or right.",
        "When validating a BST, propagate `(low, high)` bounds downward.",
        "When the prompt mentions 'K-th smallest' or 'minimum absolute difference in BST', use In-Order traversal.",
      ],
      interviewTraps: [
        "In `Validate BST`, checking only `root.left.val < root.val < root.right.val`—which fails when a grandchild in the right subtree is smaller than the root.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Binary Search Turned Into a Tree: The BST Invariant",
          visualCue: "A sorted array lifting from its midpoint into a balanced Binary Search Tree.",
          narration:
            "What happens if you turn every decision of Binary Search into a physical node with pointers? You get a Binary Search Tree. At every node, everything smaller lives to the left and everything larger lives to the right.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "The Validate BST Trap and the Power of In-Order",
          visualCue: "A grandchild node violating its grandparent's bound, caught by the `(low, high)` interval.",
          narration:
            "Watch out for the classic interviewer trap: for a tree to be a valid BST, it is not enough for each child to obey its immediate parent—it must respect the range inherited from all of its ancestors.",
        },
      ],
    },
  },
  {
    id: "dfs",
    order: 24,
    title: "DFS - Depth-First Search (Trees, Grids & Graphs)",
    shortTitle: "DFS",
    englishTerm: "Depth-First Search (Trees, Grids & Graphs)",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["trees", "matrices-grids", "stacks"],
    summary:
      "Exploring a branch as deep as possible before backtracking to try the next branch. It is the go-to algorithm for counting connected components (islands), checking reachability, detecting cycles, and traversing trees.",
    analogy:
      "Exploring a maze with a ball of yarn: you walk down the first available corridor until you hit a dead end, then rewind your yarn back to the last intersection with an unexplored door and try that path next.",
    whenToUse: [
      "Exploring all nodes of a tree, 2D grid, or graph to count connected components (`Number of Islands`, `Max Area of Island`).",
      "Checking path reachability from `A` to `B`, cloning a graph, or detecting cycles.",
      "Computing subtree properties or root-to-leaf paths (`Path Sum`).",
    ],
    whenNotToUse: [
      "When you need the **SHORTEST PATH** in an unweighted graph or grid: DFS might snake through a 1,000-step detour before finding a 2-step path; for unweighted shortest path, always use **BFS**.",
    ],
    timeComplexity: {
      average: "O(V + E) on graphs | O(R * C) on 2D grids",
      worst: "O(V + E)",
      note: "Marking nodes `visited` ensures each vertex and edge is processed a constant number of times.",
    },
    spaceComplexity: "O(V) for the `visited` set and recursion stack",
    constraintHint: "Islands, connected components, or tree/graph paths with V, E <= 10^5",
    pythonTemplate: `def num_islands_dfs(grid: list[list[str]]) -> int:
    """
    Classic 2D Grid DFS Template (Flood Fill / Island Sinking).
    Time: O(R * C) | Space: O(R * C) call stack
    """
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])

    def dfs(r: int, c: int) -> None:
        # Base case: out of bounds or water ('0')
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == "0":
            return
        # Mark visited in-place by sinking land '1' into water '0'
        grid[r][c] = "0"
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            dfs(r + dr, c + dc)

    islands = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                islands += 1
                dfs(r, c)
    return islands`,
    typescriptTemplate: `export function numIslandsDFS(grid: string[][]): number {
  if (grid.length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") {
      return;
    }
    grid[r][c] = "0"; // Mark visited
    dfs(r - 1, c);
    dfs(r + 1, c);
    dfs(r, c - 1);
    dfs(r, c + 1);
  }

  let islands = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        dfs(r, c);
      }
    }
  }
  return islands;
}`,
    leetcodeProblems: [
      {
        number: 200,
        title: "Number of Islands",
        slug: "number-of-islands",
        difficulty: "Medium",
        patternHint: "Scan the grid; upon seeing `'1'`, increment `islands` and run DFS to sink all connected land.",
      },
      {
        number: 695,
        title: "Max Area of Island",
        slug: "max-area-of-island",
        difficulty: "Medium",
        patternHint: "Have `dfs(r, c)` return `1 + sum(dfs of 4 neighbors)`.",
      },
      {
        number: 133,
        title: "Clone Graph",
        slug: "clone-graph",
        difficulty: "Medium",
        patternHint: "Maintain a hash map `{original_node: cloned_node}` that acts as both `visited` and clone registry.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how DFS works on Trees (where no `visited` set is needed because trees have no cycles) vs Graphs and 2D Grids (where marking `visited` IMMEDIATELY upon entering `dfs(u)` is mandatory to avoid infinite loops). Use 'Number of Islands' (Flood Fill) as the visual anchor.",
      keyTakeaways: [
        "Trees have no cycles, but on Graphs and 2D Grids you MUST mark a node `visited` as soon as you enter `dfs(u)`.",
        "DFS is concise to write because it uses the language's own call stack.",
        "To measure the size of a connected component, return `1 + sum(dfs(neighbor))`.",
      ],
      stepByStepWalkthrough: [
        "Check base cases first (out of bounds, obstacle, or already visited).",
        "Immediately mark the current cell/node as visited (`visited.add(u)` or `grid[r][c] = '0'`).",
        "Loop over all neighbors and recursively call `dfs(neighbor)`.",
      ],
      interviewTraps: [
        "Forgetting to mark nodes as visited on a cyclic graph, triggering `Maximum Call Stack Size Exceeded`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Theseus in the Labyrinth: How Depth-First Search Thinks",
          visualCue: "A beam of light diving all the way to the bottom of a branch before backtracking.",
          narration:
            "Depth-First Search has a bold personality: it picks one direction and plunges all the way to the bottom before ever backing up to try another fork.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "2D Grid Flood Fill: Sinking Islands in O(R * C)",
          visualCue: "Grid of 1s and 0s where touching a 1 spreads a wave that zeroes out the entire connected island.",
          narration:
            "In Number of Islands, every time we encounter a land cell, we increment our island count by one and launch DFS like a paint bucket to mark that entire connected island as visited.",
        },
      ],
    },
  },
  {
    id: "bfs",
    order: 25,
    title: "BFS - Breadth-First Search (Level Order & Shortest Path)",
    shortTitle: "BFS",
    englishTerm: "Breadth-First Search (Level Order & Shortest Path)",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["queues-deques", "trees", "matrices-grids"],
    summary:
      "Exploring in concentric ripples—first all nodes at distance 1, then distance 2, then distance 3—using a FIFO Queue (`deque`). Guarantees finding the **shortest path** in any unweighted graph or grid.",
    analogy:
      "Dropping a pebble into a calm pond: the circular ripple expands outward at the exact same speed in every direction. The first moment the ripple touches the target shore is mathematically guaranteed to be the shortest path.",
    whenToUse: [
      "Finding the **minimum distance** or **minimum number of steps/moves** from a source to a target in an unweighted graph or 2D grid (`Shortest Path in Binary Matrix`, `Word Ladder`).",
      "Level-by-level tree traversal (`Binary Tree Level Order Traversal`, `Right Side View`).",
      "**Multi-Source BFS**: When a process spreads simultaneously from MULTIPLE starting sources at once (`Rotting Oranges`, `01 Matrix`)—simply enqueue all initial sources into the `deque` at step 0.",
    ],
    whenNotToUse: [
      "When edges have DIFFERENT positive weights (e.g., roads with toll costs 1, 5, 20): standard BFS no longer finds the cheapest path; use **Dijkstra's Algorithm**.",
    ],
    timeComplexity: {
      average: "O(V + E) on graphs | O(R * C) on 2D grids",
      worst: "O(V + E)",
      note: "Marking `visited` at the moment of ENQUEUEING (`append`) prevents pushing duplicate copies of the same node into the queue.",
    },
    spaceComplexity: "O(V) for the `deque` and `visited` set",
    constraintHint: "'Minimum number of steps', 'Level order traversal', or simultaneous multi-source spread",
    pythonTemplate: `from collections import deque

def bfs_shortest_path_grid(grid: list[list[int]], start: tuple[int, int], target: tuple[int, int]) -> int:
    """
    Universal Level-by-Level BFS Template (Unweighted Shortest Path).
    GOLDEN RULE: Mark visited WHEN ENQUEUEING (before append), never wait until popleft()!
    """
    rows, cols = len(grid), len(grid[0])
    queue = deque([start])
    visited = {start}
    steps = 0

    while queue:
        # Process all nodes belonging to the current distance layer
        level_size = len(queue)
        for _ in range(level_size):
            r, c = queue.popleft()
            if (r, c) == target:
                return steps

            for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                nr, nc = r + dr, c + dc
                if (
                    0 <= nr < rows
                    and 0 <= nc < cols
                    and grid[nr][nc] == 0
                    and (nr, nc) not in visited
                ):
                    visited.add((nr, nc))  # Mark visited ON ENQUEUE!
                    queue.append((nr, nc))
        steps += 1

    return -1`,
    typescriptTemplate: `export function bfsLevelOrder(
  adj: number[][],
  start: number,
  target: number
): number {
  const visited = new Set<number>([start]);
  let queue: number[] = [start];
  let steps = 0;

  while (queue.length > 0) {
    const nextQueue: number[] = [];
    for (const u of queue) {
      if (u === target) return steps;
      for (const v of adj[u]) {
        if (!visited.has(v)) {
          visited.add(v); // Mark visited when enqueueing
          nextQueue.push(v);
        }
      }
    }
    queue = nextQueue;
    steps++;
  }
  return -1;
}`,
    leetcodeProblems: [
      {
        number: 102,
        title: "Binary Tree Level Order Traversal",
        slug: "binary-tree-level-order-traversal",
        difficulty: "Medium",
        patternHint: "Use `for _ in range(len(queue)):` to snapshot and group each level cleanly.",
      },
      {
        number: 994,
        title: "Rotting Oranges",
        slug: "rotting-oranges",
        difficulty: "Medium",
        patternHint: "Multi-Source BFS: push ALL initially rotten oranges into the queue at minute 0 before starting the `while` loop.",
      },
      {
        number: 127,
        title: "Word Ladder",
        slug: "word-ladder",
        difficulty: "Hard",
        patternHint: "Model words as nodes connected if they differ by 1 letter; find shortest transformation with BFS.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Highlight the 3 keys to mastering BFS: 1) The `for _ in range(len(queue)):` snapshot trick to track exact distance layers, 2) The golden rule of marking `visited` ON ENQUEUE (not on dequeue, which causes exponential queue duplicates and TLE), and 3) 'Multi-Source BFS' (`Rotting Oranges`) by loading all starting nodes into the queue at t = 0.",
      keyTakeaways: [
        "Whenever a problem asks for the 'minimum number of steps/moves' and every step costs 1, the Flowchart points straight to BFS.",
        "`level_size = len(queue)` snapshots how many nodes belong to the current ripple layer before their children are added.",
        "Always call `visited.add(nei)` right before `queue.append(nei)`.",
      ],
      stepByStepWalkthrough: [
        "Initialize `queue = deque(sources)` and `visited = set(sources)`.",
        "While the queue is non-empty, snapshot `level_size = len(queue)` and iterate `level_size` times.",
        "For each unvisited valid neighbor, add to `visited` and append to `queue`.",
        "Increment `steps += 1` after finishing the layer loop.",
      ],
      interviewTraps: [
        "Waiting until `u = queue.popleft()` to mark `visited.add(u)`: on a grid, multiple neighbors will push the same cell into the queue before it gets popped, blowing up memory and time.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Ripples in a Pond: Why BFS Guarantees the Shortest Path",
          visualCue: "Concentric rings at distance 1, 2, 3 expanding from the origin until touching the target.",
          narration:
            "If you need the shortest path in a maze where every step costs one, DFS is dangerous because it might wander down a thousand-step corridor first. BFS expands like a circular ripple in a pond: checking everything at distance 1, then distance 2.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Multi-Source BFS and the Golden Rule of `visited`",
          visualCue: "Multiple rotten oranges expanding synchronized ripples at minutes 1, 2, and 3.",
          narration:
            "What if a contagion starts from multiple sources at the same time, like in Rotting Oranges? Do not run separate BFS searches—load all starting sources into the initial queue together and let their ripples expand in lockstep.",
        },
      ],
    },
  },
  {
    id: "backtracking",
    order: 26,
    title: "Backtracking (Exhaustive Search with Pruning)",
    shortTitle: "Backtracking",
    englishTerm: "Backtracking (Subsets, Permutations & Pruning)",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["dfs", "trees"],
    summary:
      "A DFS over an implicit decision tree that builds candidate solutions step-by-step following the 3-beat rhythm: **1) Choose (`append`) -> 2) Explore (`backtrack`) -> 3) Unchoose (`pop`)**, pruning invalid branches early.",
    analogy:
      "Solving a Sudoku puzzle in pencil: you write a 5 in a cell (Choose), try filling subsequent cells (Explore), and if you hit a contradiction where no number fits, you erase that 5 (Unchoose / Backtrack) and try a 6.",
    whenToUse: [
      "The problem asks to **GENERATE ALL** valid combinations, subsets (`Subsets`), permutations (`Permutations`), palindrome partitions, or board placements (`N-Queens`, `Sudoku Solver`).",
      "Input constraints are tiny (**`N <= 15` or `N <= 20`**), signaling exponential $O(2^N)$ or factorial $O(N!)$ complexity.",
    ],
    whenNotToUse: [
      "If the problem only asks to **COUNT how many ways** or **find the max/min cost** with `N >= 100`: do not enumerate every path one by one with Backtracking—use **Dynamic Programming**.",
    ],
    timeComplexity: {
      average: "Subsets: O(N * 2^N) | Permutations: O(N * N!)",
      worst: "Exponential or Factorial (drastically reduced in practice via Pruning)",
      note: "When recording a valid path into `res`, always append a SHALLOW COPY (`path[:]`), never the mutable list reference itself.",
    },
    spaceComplexity: "O(N) recursion stack depth and active `path` list",
    constraintHint: "'Return all possible...' with N <= 20",
    pythonTemplate: `def subsets_backtracking(nums: list[int]) -> list[list[int]]:
    """
    Universal Backtracking Template: Choose -> Explore -> Unchoose.
    Generates all 2^N subsets of 'nums'.
    """
    res: list[list[int]] = []
    path: list[int] = []

    def backtrack(start_idx: int) -> None:
        # 1. Record a COPY of the current valid configuration
        res.append(path[:])

        # 2. Try every remaining candidate from start_idx onward
        for i in range(start_idx, len(nums)):
            path.append(nums[i])      # A) CHOOSE
            backtrack(i + 1)          # B) EXPLORE
            path.pop()                # C) UNCHOOSE (Backtrack)

    backtrack(0)
    return res`,
    typescriptTemplate: `export function subsetsBacktracking(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];

  function backtrack(startIdx: number): void {
    res.push([...path]); // Copy current state

    for (let i = startIdx; i < nums.length; i++) {
      path.push(nums[i]);     // 1. Choose
      backtrack(i + 1);       // 2. Explore
      path.pop();             // 3. Unchoose
    }
  }

  backtrack(0);
  return res;
}`,
    leetcodeProblems: [
      {
        number: 78,
        title: "Subsets",
        slug: "subsets",
        difficulty: "Medium",
        patternHint: "At every node record `path[:]` and branch over candidates `i >= start_idx`.",
      },
      {
        number: 46,
        title: "Permutations",
        slug: "permutations",
        difficulty: "Medium",
        patternHint: "Order matters: iterate over all elements using a `used` boolean array so indices are not reused in the same permutation.",
      },
      {
        number: 39,
        title: "Combination Sum",
        slug: "combination-sum",
        difficulty: "Medium",
        patternHint: "Because candidates can be reused unlimited times, recurse with `backtrack(i, rem - nums[i])` without incrementing `i`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Teach the 3-beat mantra of Backtracking ('Choose, Explore, Unchoose') and show how the exact same template solves Subsets (`backtrack(i + 1)`), Combination Sum with repetition (`backtrack(i)`), and Permutations (using a `used[i]` array) by changing a single line. Warn about the classic `res.append(path)` reference bug.",
      keyTakeaways: [
        "The Backtracking rhythm: `path.append(x)` -> `backtrack(...)` -> `path.pop()`.",
        "In Combinations/Subsets order does NOT matter (pass `start_idx` forward); in Permutations order DOES matter (scan from `0` with a `used` mask).",
        "Pruning cuts off an entire subtree early as soon as `current_sum > target` or a queen placement conflicts.",
      ],
      stepByStepWalkthrough: [
        "Maintain a single shared `path` list mutated in-place as you descend and ascend the decision tree.",
        "At base cases, append a snapshot copy `res.append(path[:])`.",
        "In the candidate loop, prune invalid choices, `append`, recurse, and `pop`.",
      ],
      interviewTraps: [
        "Writing `res.append(path)` instead of `res.append(path[:])` (or `[...path]` in JS): since `path` is emptied by `pop()` as the recursion unwinds, `res` ends up filled with empty lists `[[], [], []]`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Choose, Explore, Unchoose: The Rhythm of Backtracking",
          visualCue: "Decision tree where a shared `path` list appends an item going down and pops it going back up.",
          narration:
            "Whenever a problem asks you to return ALL possible combinations or permutations, you are exploring a decision tree. Backtracking walks that entire tree using a single shared list thanks to its three-step rhythm: choose, explore, and unchoose.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Subsets vs Combination Sum vs Permutations and the `path[:]` Bug",
          visualCue: "Three nearly identical code blocks highlighting the single line that changes between them.",
          narration:
            "You do not need twenty separate templates. Once you understand the difference between advancing `start_idx` for combinations and tracking a `used` array for permutations, you own the entire family.",
        },
      ],
    },
  },
  {
    id: "heaps",
    order: 27,
    title: "Heaps / Priority Queues (Min-Heap & Max-Heap)",
    shortTitle: "Heaps (Priority Queue)",
    englishTerm: "Binary Heaps & Priority Queues",
    kind: "data-structure",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["arrays", "trees"],
    summary:
      "A complete binary tree packed compactly inside a flat Array (zero pointers) where every parent is `<=` its children (`Min-Heap`) or `>=` its children (`Max-Heap`). Provides O(1) peek at the extreme element and O(log N) insertion and extraction.",
    analogy:
      "A hospital emergency room triage (Priority Queue): patients are not treated in arrival order like at a bank—the patient with the highest urgency always goes next (`pop` in O(log N)), even if they walked in a minute ago (`push` in O(log N)).",
    whenToUse: [
      "You need to repeatedly query and extract the **MINIMUM** or **MAXIMUM** element from a dynamic collection that keeps receiving new items.",
      "Scheduling tasks by earliest deadline or highest priority.",
      "Internal engine of Dijkstra's shortest path, Prim's MST, and Huffman coding.",
    ],
    whenNotToUse: [
      "If the dataset is static and you only need the minimum once (just call `min(nums)` in O(N)).",
      "If you need to search for an arbitrary middle value: a Heap only exposes its root `heap[0]` in O(1), not arbitrary elements.",
    ],
    timeComplexity: {
      average: "Peek (`heap[0]`): O(1) | Push / Pop: O(log N) | `heapify(list)`: O(N)",
      worst: "Push / Pop: O(log N)",
      note: "Converting an existing array into a Heap via `heapq.heapify(nums)` takes linear O(N) time, NOT O(N log N)!",
    },
    spaceComplexity: "O(N) stored in a contiguous array",
    constraintHint: "Repeated extraction of min/max from a changing set with N <= 10^5",
    pythonTemplate: `import heapq

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

    return smallest, largest`,
    typescriptTemplate: `export class MinHeap {
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
}`,
    leetcodeProblems: [
      {
        number: 1046,
        title: "Last Stone Weight",
        slug: "last-stone-weight",
        difficulty: "Easy",
        patternHint: "Use a Max-Heap (negating values in `heapq`) to repeatedly smash the 2 heaviest stones in O(log N).",
      },
      {
        number: 703,
        title: "Kth Largest Element in a Stream",
        slug: "kth-largest-element-in-a-stream",
        difficulty: "Easy",
        patternHint: "Maintain a Min-Heap of fixed size `K`: the root `heap[0]` is always the K-th largest element.",
      },
      {
        number: 621,
        title: "Task Scheduler",
        slug: "task-scheduler",
        difficulty: "Medium",
        patternHint: "Max-Heap of remaining task counts paired with a cooldown queue `(count, available_time)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how a Binary Heap packs a complete binary tree inside a flat Array without pointers (`left = 2*i + 1`, `right = 2*i + 2`, `parent = (i - 1) // 2`). Explain why bottom-up `heapify` runs in O(N) time and how to simulate a Max-Heap in Python's `heapq` by negating numbers (`-x`).",
      keyTakeaways: [
        "A Heap is NOT fully sorted: it only guarantees that every parent dominates its children so the global extreme sits at `heap[0]`.",
        "In Python, `heapq` is a Min-Heap; store `-val` or `(-priority, item)` to turn it into a Max-Heap.",
        "`heapq.heapify(arr)` sifts down from the bottom up in linear O(N) time.",
      ],
      stepByStepWalkthrough: [
        "Decide whether you need repeated minimum extraction (Min-Heap) or maximum extraction (Max-Heap via `-x`).",
        "Convert an initial list in O(N) using `heapq.heapify(nums)`.",
        "Use `heappop` and `heappush` to maintain the heap invariant in O(log N) per step.",
      ],
      interviewTraps: [
        "Calling `nums.sort()` inside a loop every time a new element is inserted (O(N^2 log N)) instead of pushing to a Heap (O(N log N)).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "A Binary Tree Hidden Inside an Array",
          visualCue: "Complete binary tree mapping its nodes directly to array indices `0..N-1` via `2i+1` and `2i+2`.",
          narration:
            "What if I told you a Binary Heap is a tree that uses zero node objects and zero pointers? Because it fills level by level from left to right without gaps, the children of index `i` live mathematically at `2i + 1` and `2i + 2`.",
        },
        {
          timestamp: "01:45 - 04:15",
          sectionTitle: "Sift-Up, Sift-Down, and Python's Negation Trick",
          visualCue: "A new element bubbling up a branch in `log N` swaps and Max-Heap negation `-x`.",
          narration:
            "Keeping an entire array sorted while items arrive and leave is expensive. When you only care about who is currently winning at the top, a Heap rebalances a single branch of height log(N) in an instant.",
        },
      ],
    },
  },
  {
    id: "heap-sorting",
    order: 28,
    title: "Heap Patterns (Top-K, K-Way Merge, Two Heaps & Heap Sort)",
    shortTitle: "Heap Patterns & Top-K",
    englishTerm: "Heap Sort, Top-K, K-Way Merge & Two Heaps",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["heaps", "sorting-intervals"],
    summary:
      "The 4 high-yield algorithmic patterns powered by Heaps: 1) **Top-K Elements** (using a Min-Heap of size `K` to keep the `K` largest elements in O(N log K)), 2) **K-Way Merge** (merging `K` sorted streams), 3) **Two Heaps** (Max-Heap + Min-Heap to track the running median), and 4) **Heap Sort**.",
    analogy:
      "To find the 3 fastest runners in a 100,000-person marathon (Top-3), you only need a VIP podium with 3 chairs (a Min-Heap of size 3). Whenever a new runner finishes faster than the slowest person currently sitting on the 3-chair podium, that slowest person gives up their seat. At the end, the 3 chairs hold the top 3 champions.",
    whenToUse: [
      "**Top-K Pattern**: 'Find the K largest / smallest / closest / most frequent elements' in O(N log K) time and O(K) memory.",
      "**K-Way Merge Pattern**: Merging `K` sorted linked lists or arrays, or finding the K-th smallest element in a sorted matrix.",
      "**Two Heaps Pattern**: Maintaining the **Running Median** of a live stream (a `Max-Heap` for the lower half and a `Min-Heap` for the upper half).",
    ],
    whenNotToUse: [
      "Do not mix up which heap to use for Top-K: to keep the **K LARGEST** elements, use a **MIN-HEAP** of size K (so `heappop()` evicts the smallest of the K+1 candidates).",
    ],
    timeComplexity: {
      average: "Top-K: O(N log K) | Two Heaps insert: O(log N), median: O(1) | Heap Sort: O(N log N)",
      worst: "O(N log K) or O(N log N)",
      note: "When K << N, O(N log K) uses far less memory and time than sorting all N items.",
    },
    spaceComplexity: "O(K) for Top-K and K-Way Merge | O(1) for in-place Heap Sort",
    constraintHint: "'Top K', 'K closest', 'Merge K sorted', or 'Median from Data Stream'",
    pythonTemplate: `import heapq

def find_k_largest_with_min_heap(nums: list[int], k: int) -> list[int]:
    """
    Pattern 1: Top-K Largest using a MIN-HEAP of size K.
    Time: O(N log K) | Space: O(K)
    """
    min_heap: list[int] = []
    for x in nums:
        heapq.heappush(min_heap, x)
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Evict the smallest among the K+1 items
    return min_heap


class MedianFinderTwoHeaps:
    """
    Pattern 2: Two Heaps for Streaming Median.
    small: Max-Heap (negated values) storing the smaller half of numbers.
    large: Min-Heap storing the larger half of numbers.
    """
    def __init__(self):
        self.small: list[int] = []  # Max-Heap (negated)
        self.large: list[int] = []  # Min-Heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
    typescriptTemplate: `import { MinHeap } from "./heaps";

export function findKLargest(nums: number[], k: number): number {
  const minHeap = new MinHeap();
  for (const x of nums) {
    minHeap.push(x);
    if (minHeap.size > k) {
      minHeap.pop(); // Evict smallest to retain K largest
    }
  }
  return minHeap.peek()!;
}`,
    leetcodeProblems: [
      {
        number: 973,
        title: "K Closest Points to Origin",
        slug: "k-closest-points-to-origin",
        difficulty: "Medium",
        patternHint: "To keep the K SMALLEST distances, maintain a Max-Heap of size K (`(-dist_sq, x, y)`).",
      },
      {
        number: 295,
        title: "Find Median from Data Stream",
        slug: "find-median-from-data-stream",
        difficulty: "Hard",
        patternHint: "Two Heaps: a Max-Heap for the lower half and a Min-Heap for the upper half kept balanced in size.",
      },
      {
        number: 373,
        title: "Find K Pairs with Smallest Sums",
        slug: "find-k-pairs-with-smallest-sums",
        difficulty: "Medium",
        patternHint: "K-Way Merge using a Min-Heap seeded with `(nums1[i] + nums2[0], i, 0)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain the counter-intuitive Top-K rule: why keeping the K LARGEST elements requires a MIN-Heap of size K (the bouncer at a K-seat VIP lounge only needs to know who the weakest member currently inside is to see if a newcomer beats them), while keeping the K SMALLEST requires a MAX-Heap. Then explain the Two Heaps pattern for live median tracking.",
      keyTakeaways: [
        "Inverted Top-K rule: Want the K largest? Use a Min-Heap of size K. Want the K smallest? Use a Max-Heap of size K.",
        "In Two Heaps (`Find Median from Data Stream`), the top of the left Max-Heap and the top of the right Min-Heap bracket the exact median in O(1).",
        "K-Way Merge keeps 1 head item from each of the K sorted lists inside a Min-Heap to extract the global minimum in O(log K).",
      ],
      stepByStepWalkthrough: [
        "For Top-K: maintain a heap capped at size `K`; whenever `len(heap) > K`, call `heappop`.",
        "For Two Heaps: push each new number through `small` into `large`, then rebalance so `len(small)` equals `len(large)` or `len(large) + 1`.",
      ],
      interviewTraps: [
        "Pushing all `N` elements into the heap instead of capping its size at `K`, losing the O(K) space and O(N log K) time advantage.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "The VIP Podium Paradox: Why Top-K Largest Uses a Min-Heap",
          visualCue: "A 3-seat podium where the lowest of the 3 champions sits by the door ready to be replaced.",
          narration:
            "Here is a classic interview riddle: if you want to keep the K largest numbers out of a million items, do you use a Max-Heap or a Min-Heap? You use a Min-Heap of size K—because the member you need to evict whenever someone better arrives is the smallest member of your VIP club.",
        },
        {
          timestamp: "02:00 - 05:00",
          sectionTitle: "Two Heaps: Computing the Live Median in O(1)",
          visualCue: "Two triangles facing tip-to-tip (Max-Heap below, Min-Heap above) framing the median right in the center.",
          narration:
            "How do you maintain the median when thousands of numbers stream in every second? Split the numbers into two balanced halves: a Max-Heap for the smaller half and a Min-Heap for the larger half. Their two peaks give you the median instantly.",
        },
      ],
    },
  },
];

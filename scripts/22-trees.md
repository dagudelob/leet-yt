# Episode #22: Binary Trees & Traversals (Pre / In / Post-Order)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 4 — Data Structure (`Beginner`)  
> **Flowchart Node Term:** `Binary Trees & Traversals (Pre/In/Post-Order)`  
> **Recommended Prerequisites:** Divide & Conquer -> Linked Lists

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Teach the listener to solve Binary Tree problems by focusing on a SINGLE NODE: 'What information do I pass down to my children (Pre-order), and what information do I need my children to return up to me (Post-order)?'. Walk through 'Diameter of Binary Tree' to show how to update a global answer while returning height upward.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Binary Trees", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Hierarchical TreeNode problems with N <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Binary Trees?
Hierarchical acyclic structures where each node holds a value and up to two children (`left` and `right`). Because every subtree is itself a binary tree, 95% of tree problems can be solved with 5-line recursive functions.

### Real-World Analogy
> **Visual Intuition:** A company org chart: the CEO (`root`) asks the VP of Engineering (`left`) and VP of Product (`right`) for their headcount; each VP asks their directors down to individual contributors (`leaves`), and the totals bubble back up to the CEO.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Never try to trace the entire tree in your head at once: focus only on the contract between `root`, `root.left`, and `root.right`.
2. **Key Takeaway #2:** Pre-Order pushes context top-down from parent to child; Post-Order aggregates results bottom-up from children to parent.
3. **Key Takeaway #3:** Any binary tree with N nodes has exactly `N - 1` edges.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Binary Trees)
- [x] Representing hierarchical data, abstract syntax trees (ASTs), or recursive decision structures.
- [x] **Pre-order (`Root -> Left -> Right`)**: Cloning, serializing, or passing top-down context from parent to children.
- [x] **In-order (`Left -> Root -> Right`)**: Visiting a Binary Search Tree (BST) in sorted ascending order.
- [x] **Post-order (`Left -> Right -> Root`)**: Computing heights, diameters, subtree sums, or Lowest Common Ancestor (LCA) where you need both children's answers before computing the parent's.

### When NOT to Use It (False Positives)
- [!] If the tree is degenerate (a skewed chain of height `H = N`) and recursion stack limits are tight, use an explicit stack or queue.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Hierarchical TreeNode problems with N <= 10^5`
- **Average Time Complexity:** `Full traversal: O(N) visiting each node once`
- **Worst-Case Time Complexity:** `O(N)`
- **Space Complexity:** `O(H) height of the tree on the recursion call stack`
- **Engineering Note:** Call stack space is O(H) where H is the tree height (O(log N) balanced, O(N) skewed).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Define the base case `if not root:` (usually returns `0`, `None`, or `True`).
2. Decide what value each recursive call must return to its parent.
3. Combine `left_res` and `right_res` with `root.val`.

### Common Bugs & Edge Cases
- **Interview Trap:** In `Diameter of Binary Tree` or `Binary Tree Maximum Path Sum`, confusing the path that 'curves through the current node as its peak' (`left + right`, which updates the global max) with the path that 'can continue upward to the parent' (`1 + max(left, right)`).

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
class TreeNode:
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
    return 1 + max(left_height, right_height)
```

### TypeScript / JavaScript Template
```typescript
export class TreeNode {
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
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] The Recursive Nature of Binary Trees
- **On-Screen Visual / Slide Cue:** Binary tree where each child is framed to show it is a smaller self-similar binary tree.
- **Narration / Script:**
  > "Binary trees look intimidating until you realize a secret: you never have to solve the whole tree. You only write the logic for a single node assuming its left and right children already did their job."

### [01:45 - 04:30] Pre-Order, In-Order, and Post-Order: When to Use Each
- **On-Screen Visual / Slide Cue:** A cursor tracing the outline of a tree marking 1st visit (Pre), bottom visit (In), and final exit visit (Post).
- **Narration / Script:**
  > "Pre-order, In-order, and Post-order are not three different walks—they are the exact same walk observed at three moments: when arriving at a node, when passing between its children, and right before returning upward."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#104. Maximum Depth of Binary Tree** | `Easy` | [https://leetcode.com/problems/maximum-depth-of-binary-tree/](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Base case `None -> 0`, recursive step `1 + max(depth(left), depth(right))`. |
| **#226. Invert Binary Tree** | `Easy` | [https://leetcode.com/problems/invert-binary-tree/](https://leetcode.com/problems/invert-binary-tree/) | Swap `root.left, root.right = invert(root.right), invert(root.left)`. |
| **#543. Diameter of Binary Tree** | `Easy` | [https://leetcode.com/problems/diameter-of-binary-tree/](https://leetcode.com/problems/diameter-of-binary-tree/) | At each node, the longest path curving through it is `left_h + right_h`, while returning `1 + max(left_h, right_h)` upward. |

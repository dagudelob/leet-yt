# Episode #23: Binary Search Trees (BST)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 4 — Data Structure (`Intermediate`)  
> **Flowchart Node Term:** `Binary Search Trees (BST)`  
> **Recommended Prerequisites:** Binary Trees -> Binary Search

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain how a BST combines the fast lookup of Binary Search with the dynamic insertion of a Linked List. Highlight the two classic BST interview lessons: 1) The 'Validate BST' trap (why checking only `node.left.val < node.val` fails and you must pass `(low, high)`), and 2) How In-Order traversal flattens any BST into a sorted array.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("BST", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Tree with left < node < right invariant or ordered tree queries) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is BST?
A binary tree governed by a global ordering invariant: EVERY node in the left subtree is strictly smaller than the root, and EVERY node in the right subtree is strictly larger. Enables O(log N) search, insertion, and deletion when balanced.

### Real-World Analogy
> **Visual Intuition:** A decision hallway where every door has a number: if you are looking for room 42 and stand at door 50, you never even glance down the right corridor because everything to the right is greater than 50—you turn left and eliminate half the building at once.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Global BST invariant: the ENTIRE left subtree must be `< root.val`, not just the immediate left child.
2. **Key Takeaway #2:** In-Order traversal (`Left -> Root -> Right`) visits BST nodes in strictly ascending order.
3. **Key Takeaway #3:** Searching or finding LCA in a BST is iterative and takes O(1) extra space with a simple `while curr:` loop.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE BST)
- [x] Searching, inserting, or finding the Lowest Common Ancestor (`LCA`) in O(H) time by exploiting `left < root < right`.
- [x] Retrieving elements in sorted order or finding the `K-th Smallest Element` via an **In-Order Traversal (`Left -> Root -> Right`)**.

### When NOT to Use It (False Positives)
- [!] If sorted elements (`1, 2, 3, 4, 5`) are inserted into an unbalanced BST, it degenerates into a linked list of height `O(N)`.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Tree with left < node < right invariant or ordered tree queries`
- **Average Time Complexity:** `Search / Insert / Delete: O(log N) on balanced BST`
- **Worst-Case Time Complexity:** `O(H) where H is tree height (up to O(N) if unbalanced)`
- **Space Complexity:** `O(H) recursion stack (or O(1) when navigating iteratively)`
- **Engineering Note:** An In-Order traversal of any valid BST yields a strictly increasing sequence.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. When searching for a value or LCA, compare with `curr.val` to branch left or right.
2. When validating a BST, propagate `(low, high)` bounds downward.
3. When the prompt mentions 'K-th smallest' or 'minimum absolute difference in BST', use In-Order traversal.

### Common Bugs & Edge Cases
- **Interview Trap:** In `Validate BST`, checking only `root.left.val < root.val < root.right.val`—which fails when a grandchild in the right subtree is smaller than the root.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def is_valid_bst(root, low: float = float("-inf"), high: float = float("inf")) -> bool:
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
    return None
```

### TypeScript / JavaScript Template
```typescript
import { TreeNode } from "./trees";

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
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] Binary Search Turned Into a Tree: The BST Invariant
- **On-Screen Visual / Slide Cue:** A sorted array lifting from its midpoint into a balanced Binary Search Tree.
- **Narration / Script:**
  > "What happens if you turn every decision of Binary Search into a physical node with pointers? You get a Binary Search Tree. At every node, everything smaller lives to the left and everything larger lives to the right."

### [01:45 - 04:30] The Validate BST Trap and the Power of In-Order
- **On-Screen Visual / Slide Cue:** A grandchild node violating its grandparent's bound, caught by the `(low, high)` interval.
- **Narration / Script:**
  > "Watch out for the classic interviewer trap: for a tree to be a valid BST, it is not enough for each child to obey its immediate parent—it must respect the range inherited from all of its ancestors."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#98. Validate Binary Search Tree** | `Medium` | [https://leetcode.com/problems/validate-binary-search-tree/](https://leetcode.com/problems/validate-binary-search-tree/) | Pass the open interval `(low, high)` down to children, or verify that In-Order traversal is strictly increasing. |
| **#230. Kth Smallest Element in a BST** | `Medium` | [https://leetcode.com/problems/kth-smallest-element-in-a-bst/](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | Run In-Order traversal (`Left -> Root -> Right`) and stop at the K-th visited node. |
| **#235. Lowest Common Ancestor of a Binary Search Tree** | `Medium` | [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | If both `p` and `q` are smaller than `curr`, go left; if both are larger, go right; the split point is the LCA. |

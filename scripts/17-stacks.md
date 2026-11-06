# Episode #17: Stacks (LIFO & Nested Expression Evaluation)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 3 — Data Structure + Algorithmic Pattern (`Beginner`)  
> **Flowchart Node Term:** `Stacks (LIFO)`  
> **Recommended Prerequisites:** Arrays

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain how a Stack models nested scopes ('the last scope opened must be the first scope closed'). Show why every recursive function uses a Call Stack under the hood and how an explicit stack solves parentheses matching, calculators, and `Decode String`.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Stacks (LIFO)", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Nested structures, parentheses, calculators, or path history with N <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Stacks (LIFO)?
Last-In, First-Out (LIFO) structure ideal for tracking recent history, validating nested scopes (parentheses, HTML tags), undoing actions, and simulating recursion iteratively.

### Real-World Analogy
> **Visual Intuition:** A stack of clean plates in a cafeteria: you always place a new plate on the very top (`push`), and the next person takes that exact top plate first (`pop`).

### Key Takeaways to Remember
1. **Key Takeaway #1:** LIFO (Last-In, First-Out): the most recently opened item is always the first to be resolved.
2. **Key Takeaway #2:** Always guard with `if not stack:` before reading `stack[-1]` or calling `stack.pop()`.
3. **Key Takeaway #3:** At the end of the loop, verify `len(stack) == 0` to catch unclosed opening brackets.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Stacks (LIFO))
- [x] Validating or matching nested opening and closing symbols (`()`, `{}`, `[]`, tags).
- [x] Evaluating mathematical expressions (Reverse Polish Notation / RPN, calculators, decoding nested strings like `3[a2[c]]`).
- [x] Tracking active path state (Unix file path simplification `/a/b/../c`, browser Back/Undo history).

### When NOT to Use It (False Positives)
- [!] When items must be processed in strict arrival order (use a FIFO Queue instead).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Nested structures, parentheses, calculators, or path history with N <= 10^5`
- **Average Time Complexity:** `Push: O(1) | Pop: O(1) | Peek (`stack[-1]`): O(1)`
- **Worst-Case Time Complexity:** `O(N) to process N tokens`
- **Space Complexity:** `O(N) worst case when all elements are pushed`
- **Engineering Note:** In Python, a standard `list` serves as a fast Stack using `append()` and `pop()`.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Scan tokens or characters from left to right.
2. When entering a new nested context (opening bracket, operand), `stack.append(x)`.
3. When closing or combining the most recent context, `stack.pop()` and merge with the new top.

### Common Bugs & Edge Cases
- **Interview Trap:** Returning `True` at the end of `Valid Parentheses` without checking `len(stack) == 0` (fails on inputs like `'((('`).

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def is_valid_parentheses(s: str) -> bool:
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
    return len(stack) == 0
```

### TypeScript / JavaScript Template
```typescript
export function isValidParentheses(s: string): boolean {
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
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:30] The Law of Nesting: Last Opened, First Closed
- **On-Screen Visual / Slide Cue:** Nested Russian dolls and parentheses pushing and popping from a vertical stack.
- **Narration / Script:**
  > "Think about how parentheses work in math or how folders nest on your computer: the last block you opened is strictly the first block you must close. That property is called LIFO, and its data structure is the Stack."

### [01:30 - 04:00] From Valid Parentheses to Calculators and Decode String
- **On-Screen Visual / Slide Cue:** Animation of `3[a2[c]]` saving outer context on the stack when entering each bracket.
- **Narration / Script:**
  > "Whenever you have patterns nested inside other patterns, like in Decode String, a stack lets you pause what you were building outside, solve the inner bracket, and resume right where you left off."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#20. Valid Parentheses** | `Easy` | [https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/) | Push opening brackets and verify the top of the stack upon seeing a closing bracket. |
| **#150. Evaluate Reverse Polish Notation** | `Medium` | [https://leetcode.com/problems/evaluate-reverse-polish-notation/](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | Push numbers; on an operator, pop the top 2 operands (`b = pop()`, `a = pop()`) and push `a op b`. |
| **#394. Decode String** | `Medium` | [https://leetcode.com/problems/decode-string/](https://leetcode.com/problems/decode-string/) | On `[`, push `(prev_string, repeat_k)` onto the stack; on `]`, pop and expand. |

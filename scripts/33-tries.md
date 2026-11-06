# Episode #33: Tries / Prefix Trees
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 5 — Data Structure + Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Tries / Prefix Trees & Bitwise Tries`  
> **Recommended Prerequisites:** Binary Trees -> Hash Table -> Strings

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain how a Trie merges shared prefixes across thousands of words into a single tree and why the `is_end` boolean flag is essential to distinguish the prefix `'app'` from the complete word `'apple'`. Walk through 'Word Search II' to show how guiding board DFS with a Trie prunes millions of dead branches.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Tries (Prefix Tree)", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Prefix queries startsWith, multi-word board search, or Maximum XOR) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Tries (Prefix Tree)?
A tree specialized for string (or bit) dictionaries where each edge represents a character and words share common prefix paths. Searches for a word or checks if any word starts with prefix `P` in $O(|P|)$ time—independent of how many thousands of words are in the dictionary.

### Real-World Analogy
> **Visual Intuition:** Your phone's search autocomplete: when you type `A -> L -> G`, it does not scan 500,000 dictionary words one by one—it walks 3 steps down the `A`, `L`, and `G` branches of a tree, and everything hanging below that node is a word starting with `ALG` (`Algorithm`, `Algebra`).

### Key Takeaways to Remember
1. **Key Takeaway #1:** The only difference between `search(word)` and `startsWith(prefix)` is checking `node.is_end == True` at the final character.
2. **Key Takeaway #2:** In grid + dictionary problems (`Word Search II`), inserting the dictionary into a Trie lets a single board DFS match all words at once.
3. **Key Takeaway #3:** A Bitwise Trie inserts 32-bit integers from most-significant bit to least-significant bit to greedily pick opposite bits for Maximum XOR.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Tries (Prefix Tree))
- [x] Autocomplete, **prefix matching** (`startsWith`), spell checkers, or wildcard word search (`.`).
- [x] Searching for many dictionary words simultaneously on a 2D letter board (`Word Search II`: a Trie prunes dead-end board paths immediately).
- [x] **Bitwise Trie (0/1 Binary Trie)**: Finding the pair of numbers in an array that maximizes `a XOR b` (`Maximum XOR of Two Numbers in an Array`).

### When NOT to Use It (False Positives)
- [!] If you only need exact full-word lookups without prefix queries (a standard `Hash Set` of strings is simpler and faster for exact matches).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Prefix queries startsWith, multi-word board search, or Maximum XOR`
- **Average Time Complexity:** `Insert / Search / StartsWith: O(L) where L is word length`
- **Worst-Case Time Complexity:** `O(L)`
- **Space Complexity:** `O(Total characters inserted) sharing common prefixes`
- **Engineering Note:** Lookup time depends ONLY on the length L of the query word, not the number of words N in the dictionary.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Define `TrieNode` with a `children` map and `is_end = False`.
2. To insert, walk character by character creating missing nodes and set `curr.is_end = True` at the end.
3. Write a helper `_find_node(prefix)` shared by both `search` and `startsWith`.

### Common Bugs & Edge Cases
- **Interview Trap:** Forgetting `is_end`: after inserting `'apple'`, `search('app')` would falsely return `True` if you do not mark word endings.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
class TrieNode:
    def __init__(self):
        self.children: dict[str, TrieNode] = {}
        self.is_end: bool = False


class Trie:
    """
    Clean Standard Trie (Prefix Tree) Implementation.
    Time per operation: O(L) where L = len(word).
    """
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find_node(prefix) is not None

    def _find_node(self, prefix: str) -> TrieNode | None:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return None
            curr = curr.children[ch]
        return curr
```

### TypeScript / JavaScript Template
```typescript
class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        curr.children.set(ch, new TrieNode());
      }
      curr = curr.children.get(ch)!;
    }
    curr.isEnd = true;
  }

  search(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  private findNode(prefix: string): TrieNode | null {
    let curr = this.root;
    for (const ch of prefix) {
      const next = curr.children.get(ch);
      if (!next) return null;
      curr = next;
    }
    return curr;
  }
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] How Autocomplete Runs in O(Word Length)
- **On-Screen Visual / Slide Cue:** Words 'CAT', 'CAR', 'CARD' sharing the C -> A branch in a tree.
- **Narration / Script:**
  > "If you have a million words and want to find all words starting with 'PRO', a Hash Set cannot help because it only hashes complete strings. A Trie organizes words character by character so every shared prefix walks the exact same path."

### [01:45 - 04:30] The Trie + Backtracking Combo in Word Search II
- **On-Screen Visual / Slide Cue:** A 2D letter board immediately pruning paths whose 2-letter prefix does not exist in the Trie.
- **Narration / Script:**
  > "When you pair a Trie with 2D grid DFS, the moment a board path forms 'XZ' and no 'XZ' branch exists in your Trie, you prune the entire search branch on the spot."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#208. Implement Trie (Prefix Tree)** | `Medium` | [https://leetcode.com/problems/implement-trie-prefix-tree/](https://leetcode.com/problems/implement-trie-prefix-tree/) | Core TrieNode with `children = {}` and boolean `is_end` flag. |
| **#211. Design Add and Search Words Data Structure** | `Medium` | [https://leetcode.com/problems/design-add-and-search-words-data-structure/](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | When the current character is `'.'`, branch recursively across all `curr.children.values()`. |
| **#212. Word Search II** | `Hard` | [https://leetcode.com/problems/word-search-ii/](https://leetcode.com/problems/word-search-ii/) | Insert all target words into a Trie and walk the 2D board and the Trie simultaneously. |

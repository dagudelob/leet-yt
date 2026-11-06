# Episode #41: Rolling Hash & Rabin-Karp Algorithm
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 7 — Algorithmic Pattern (`Advanced`)  
> **Flowchart Node Term:** `Rolling Hash & Rabin-Karp Algorithm`  
> **Recommended Prerequisites:** Strings -> Sliding Window -> Hash Table

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Connect Prefix Sums and Sliding Window to strings: explain why hashing a length-K substring with a standard `hash()` function inside a window costs O(K) per step (O(N*K) total), whereas treating the string as a polynomial in base `B` lets you compute the hash of any substring in O(1).

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Rolling Hash", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (O(1) substring comparison or repeated substring search with N <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Rolling Hash?
Treating a string as a base-`B` number modulo a large prime `MOD` so that when a sliding window shifts one character to the right, we can **update the window's hash in O(1) time** (subtracting the exiting left character and adding the entering right character), enabling O(1) substring comparisons.

### Real-World Analogy
> **Visual Intuition:** In base 10, if you have the 4-digit window `3456` and slide one step right where `7` enters (to form `4567`), you do not rebuild the number from scratch: you subtract `3 * 1000`, multiply the remainder by `10`, and add `7`. Rolling Hash does the exact same arithmetic with characters.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Rolling Hash is the exact equivalent of Prefix Sums for strings: it gives you the fingerprint of `s[L..R]` in O(1).
2. **Key Takeaway #2:** When subtracting in modular arithmetic `(a - b) % MOD`, in languages like JS/C++/Java you must add `((a - b) % MOD + MOD) % MOD` to avoid negative remainders (in Python `%` already returns a non-negative result).

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Rolling Hash)
- [x] Comparing substrings or finding **duplicate substrings of length `L`** in O(N) (`Repeated DNA Sequences`, `Longest Duplicate Substring` combining `Binary Search + Rolling Hash`).
- [x] Searching for multiple patterns at once or finding the longest palindrome prefix using forward and backward rolling hashes.

### When NOT to Use It (False Positives)
- [!] For finding a single pattern in a text without needing numeric hashes, KMP is deterministic and free of modular collision risk.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `O(1) substring comparison or repeated substring search with N <= 10^5`
- **Average Time Complexity:** `Precompute or slide window: O(N) | Query hash of substring `s[L..R]`: O(1)`
- **Worst-Case Time Complexity:** `O(N) with a large prime (e.g., `MOD = 10^9 + 7` or `2^61 - 1`)`
- **Space Complexity:** `O(N) for prefix hashes and powers of the base`
- **Engineering Note:** Combining Binary Search on length `L` with Rolling Hash solves 'Longest Duplicate Substring' in O(N log N).

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Choose a `base` larger than the alphabet size (e.g., `31` or `313`) and a large prime `MOD` (`10^9 + 7` or `10^9 + 9`).
2. Precompute `pref_hash[i]` and `power[i] = base^i % MOD` in O(N).
3. Query any range `[L, R]` with `(pref_hash[R+1] - pref_hash[L] * power[R - L + 1]) % MOD`.

### Common Bugs & Edge Cases
- **Interview Trap:** Using a small modulus like `10,007`: by the Birthday Paradox, when comparing 10^5 substrings you will hit collisions with any modulus smaller than roughly N^2. Use a prime >= 10^9 + 7 or double hashing.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
class PolynomialRollingHash:
    """
    Precomputes polynomial prefix hashes to query the hash of ANY
    substring s[left..right] (inclusive) in O(1) time.
    """
    def __init__(self, s: str, base: int = 313, mod: int = 1_000_000_007):
        self.mod = mod
        n = len(s)
        self.pref_hash = [0] * (n + 1)
        self.power = [1] * (n + 1)

        for i, ch in enumerate(s):
            self.pref_hash[i + 1] = (self.pref_hash[i] * base + ord(ch)) % mod
            self.power[i + 1] = (self.power[i] * base) % mod

    def get_substring_hash(self, left: int, right: int) -> int:
        """Return the hash of s[left..right] inclusive in O(1)."""
        length = right - left + 1
        return (
            self.pref_hash[right + 1]
            - self.pref_hash[left] * self.power[length]
        ) % self.mod
```

### TypeScript / JavaScript Template
```typescript
export class RollingHash {
  private pref: bigint[];
  private pow: bigint[];
  private mod = 1_000_000_007n;
  private base = 313n;

  constructor(s: string) {
    const n = s.length;
    this.pref = new Array<bigint>(n + 1).fill(0n);
    this.pow = new Array<bigint>(n + 1).fill(1n);

    for (let i = 0; i < n; i++) {
      this.pref[i + 1] = (this.pref[i] * this.base + BigInt(s.charCodeAt(i))) % this.mod;
      this.pow[i + 1] = (this.pow[i] * this.base) % this.mod;
    }
  }

  getHash(left: number, right: number): bigint {
    const len = right - left + 1;
    const raw = (this.pref[right + 1] - (this.pref[left] * this.pow[len]) % this.mod) % this.mod;
    return (raw + this.mod) % this.mod;
  }
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] Turning Words into Numbers: The Base-10 Intuition
- **On-Screen Visual / Slide Cue:** The window `3456` sliding to `4567` by subtracting `3*1000`, multiplying by `10`, and adding `7`.
- **Narration / Script:**
  > "If you slice a ten-thousand-character substring into a Hash Set at every step of a sliding window, copying and hashing those ten thousand characters blows your complexity up to O(N^2). Rolling Hash updates the fingerprint in O(1) with a single subtraction and multiplication."

### [01:45 - 04:30] Prefix Hashes + Binary Search in Longest Duplicate Substring
- **On-Screen Visual / Slide Cue:** Combining Binary Search on length L with Rolling Hash to detect duplicates in O(N).
- **Narration / Script:**
  > "Once you precompute the hashes of all prefixes and powers of the base, you can extract the signature of any sub-segment `[L, R]` in constant O(1) time, just like Prefix Sums."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#187. Repeated DNA Sequences** | `Medium` | [https://leetcode.com/problems/repeated-dna-sequences/](https://leetcode.com/problems/repeated-dna-sequences/) | Slide a window of length 10 maintaining its numeric base-4 hash in O(1) per step. |
| **#1044. Longest Duplicate Substring** | `Hard` | [https://leetcode.com/problems/longest-duplicate-substring/](https://leetcode.com/problems/longest-duplicate-substring/) | Binary Search on length `L` + Rolling Hash in O(N) to check if any length-`L` hash repeats. |
| **#718. Maximum Length of Repeated Subarray** | `Medium` | [https://leetcode.com/problems/maximum-length-of-repeated-subarray/](https://leetcode.com/problems/maximum-length-of-repeated-subarray/) | Solvable in O((N + M) log(min(N, M))) with Binary Search + Rolling Hash. |

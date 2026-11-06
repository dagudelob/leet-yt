# Episode #42: String Matching (KMP Algorithm & LPS Prefix Function)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 7 — Algorithmic Pattern (`Advanced`)  
> **Flowchart Node Term:** `String Matching (KMP, Z-Algorithm & LPS Array)`  
> **Recommended Prerequisites:** Strings -> Two Pointers

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Visually explain what the KMP `LPS` table means ('how much of the tail of what I just read is identical to the start of the pattern so I never have to re-compare it?'). Reveal the star trick for Hard problems: concatenating `s + '#' + reverse(s)` and computing its LPS to find the longest palindromic prefix in O(N) (`Shortest Palindrome`).

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("String Matching (KMP)", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Exact pattern matching, string periodicity, or Shortest Palindrome in O(N)) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is String Matching (KMP)?
Find all occurrences of a pattern `P` inside a text `T` in strictly linear **O(|T| + |P|)** time without ever moving the text pointer backward. The secret is the **LPS (Longest Proper Prefix which is also Suffix)** array from the **Knuth-Morris-Pratt (KMP)** algorithm.

### Real-World Analogy
> **Visual Intuition:** If you are searching for `'ABABAC'` and after matching the first 5 letters `'ABABA'` you fail on the 6th letter, you do not need to restart from scratch: because you already know the tail `'ABA'` you just read matches the opening `'ABA'` of your pattern, you continue directly from the 4th letter.

### Key Takeaways to Remember
1. **Key Takeaway #1:** Naive string search degrades to O(N*M) when there are many false starts like searching for `'AAAAB'` inside `'AAAAAAAAAB'`. KMP never moves the text index `i` backward.
2. **Key Takeaway #2:** The key line in KMP is `length = lps[length - 1]`: when a character mismatches, we fall back to the second-best prefix-suffix already computed.
3. **Key Takeaway #3:** The minimum period of a string of length `N` is `N - lps[N - 1]`.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE String Matching (KMP))
- [x] Searching for a pattern `P` in a text `T` with guaranteed worst-case O(N + M) time (even on repetitive inputs like `'aaaa...ab'`).
- [x] Detecting whether a string is built by repeating a shorter periodic block (`Repeated Substring Pattern`).
- [x] Finding the **longest palindrome starting at index 0** by concatenating `s + '#' + s[::-1]` and inspecting the last value of its LPS array (`Shortest Palindrome`).

### When NOT to Use It (False Positives)
- [!] In simple problems where `N` is small and built-in `s.find(p)` is fast enough.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Exact pattern matching, string periodicity, or Shortest Palindrome in O(N)`
- **Average Time Complexity:** `Build LPS: O(M) | Search text: O(N) -> Total: O(N + M)`
- **Worst-Case Time Complexity:** `Deterministic O(N + M) (no pathological O(N*M) cases)`
- **Space Complexity:** `O(M) for the pattern's `lps` array`
- **Engineering Note:** The `lps[i]` entry stores the length of the longest proper prefix of `P[0..i]` that is also a suffix of `P[0..i]`.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Preprocess pattern `P` of length `M` to fill its `lps` array in O(M).
2. Scan text `T` with index `i` and pattern `P` with index `j`.
3. If `T[i] == P[j]`, advance both; if they mismatch and `j > 0`, jump `j = lps[j - 1]` without rewinding `i`.

### Common Bugs & Edge Cases
- **Interview Trap:** In `Shortest Palindrome` (`s + '#' + s[::-1]`), forgetting to insert a separator character `'#'` in the middle, allowing the prefix-suffix match to bleed across the boundary and exceed the length of `s`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def build_kmp_lps(pattern: str) -> list[int]:
    """
    Build the LPS (Longest Proper Prefix which is also Suffix) table in O(M).
    lps[i] = length of the longest proper prefix of pattern[0..i] that matches its suffix.
    """
    m = len(pattern)
    lps = [0] * m
    length = 0  # Length of the previous longest prefix-suffix
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            # Fall back smartly using the LPS table itself
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1
    return lps


def kmp_search(text: str, pattern: str) -> int:
    """Return the first index where 'pattern' appears in 'text', or -1."""
    if not pattern:
        return 0
    lps = build_kmp_lps(pattern)
    i = j = 0  # i scans text, j scans pattern

    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1
    return -1
```

### TypeScript / JavaScript Template
```typescript
export function buildKmpLps(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}
```

---

## 6. Long-Form In-Depth Video Script (16:9 Masterclass)
> **Target Duration:** 10–15 Minutes | **Format:** Teleprompter Script with On-Screen Visual Cues & Webapp CTA

### [00:00 - 02:00] Why Naive Search Backtracks and How KMP Only Looks Forward
- **On-Screen Visual / Slide Cue:** Comparison of a pointer rewinding over and over on `'AAAAAB'` vs KMP marching straight ahead.
- **Narration / Teleprompter Script:**
  > "When you search for a word and fail on the last letter, the naive algorithm throws away everything it just read and rewinds the text pointer. Knuth, Morris, and Pratt proved that what you just read already contains all the information needed to never step backward again."

### [02:00 - 04:45] The LPS Table and the `s + '#' + reverse(s)` Trick
- **On-Screen Visual / Slide Cue:** LPS table for `'ABABAC'` and its direct application to Shortest Palindrome.
- **Narration / Teleprompter Script:**
  > "Beyond searching words, the LPS table is a symmetry detector: it tells you in O(N) whether a string is made of repeating blocks and what the longest palindrome anchored at index zero is."

### [15:00 - End] Problem Solving Blueprint & Interactive Webapp CTA
- **On-Screen Visual / Slide Cue:** Cut to leet-yt webapp visualizer showing interactive step-by-step state transitions and the 3 recommended LeetCode practice problems.
- **Narration / Teleprompter Script:**
  > "Want to see these state transitions and pointers update live in your browser? Head over to our interactive webapp—the link is pinned in the description below! You can test custom inputs, step through edge cases, and solidify your mental model with interactive micro-challenges. Be sure to star the repo on GitHub, subscribe for Episode #43, and solve today's practice problems. See you in the next masterclass!"

---

## 7. High-Retention YouTube Short Script (9:16 Vertical)
> **Target Duration:** 45–55 Seconds | **Format:** Vertical Video with Dual CTA (Webapp + Channel)

### Target Specs:
- **Aspect Ratio:** `9:16 Vertical` (YouTube Shorts / Reels / TikTok)
- **Target Duration:** `45–55 Seconds` (~135 words)
- **Visual Split:** Top 40% Animated Visualizer Diagram | Middle 40% Presenter Camera | Bottom 20% Kinetic Captions & CTA Banner

---

#### [00:00 - 00:06] Phase 1: The Curiosity Hook
- **Visual Cue:** Fast zoom-on-screen with high-contrast text overlay: `⚠️ TLE Alert: Exact pattern matching, string periodicity, or Shortest Palindrome in O(N)`. Red warning icon flashes.
- **Presenter / Voiceover:**
  > "Stop solving String Matching (KMP) interview problems with nested loops! When constraints reach Exact pattern matching, string periodicity, or Shortest Palindrome in O(N), your quadratic approach will get Time Limit Exceeded instantly."

#### [00:06 - 00:42] Phase 2: The Mental Model & Visual Mechanics
- **Visual Cue:** Animated interactive simulation from the leet-yt webapp. Diagram highlights pointer movements and the core invariant.
- **Presenter / Voiceover:**
  > "Here is the visual trick: think of String Matching (KMP) as If you are searching for `'ABABAC'` and after matching the first 5 letters `'ABABA'` you fail on the 6th letter, you do not need to restart from scratch: because you already know the tail `'ABA'` you just read matches the opening `'ABA'` of your pattern, you continue directly from the 4th letter.. First, preprocess pattern `p` of length `m` to fill its `lps` array in o(m). Then, scan text `t` with index `i` and pattern `p` with index `j`. This collapses your time complexity from an unviable brute-force right down to Build LPS: O(M) | Search text: O(N) -> Total: O(N + M)! Watch out for the trap though: in `shortest palindrome` (`s + '#' + s[::-1]`), forgetting to insert a separator character `'#'` in the middle, allowing the prefix-suffix match to bleed across the boundary and exceed the length of `s`."

#### [00:42 - 00:55] Phase 3: The Dual Call to Action (Webapp + Long Video)
- **Visual Cue:** Split screen showing the interactive webapp visualizer (`🔗 leet-yt: Link in Bio / Comments`) and YouTube full video banner (`▶️ Full Masterclass on Channel`).
- **Presenter / Voiceover:**
  > "Test this live with interactive step controls on our webapp—link in bio and pinned comment! And for the full line-by-line code walkthrough and complexity proof, watch the deep-dive video on our channel."


---

## 8. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#28. Find the Index of the First Occurrence in a String** | `Easy` | [https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | Foundational problem for implementing KMP in O(N + M). |
| **#459. Repeated Substring Pattern** | `Easy` | [https://leetcode.com/problems/repeated-substring-pattern/](https://leetcode.com/problems/repeated-substring-pattern/) | With KMP: a string of length `N` is periodic iff `lps[-1] > 0` and `N % (N - lps[-1]) == 0`. |
| **#214. Shortest Palindrome** | `Hard` | [https://leetcode.com/problems/shortest-palindrome/](https://leetcode.com/problems/shortest-palindrome/) | Build the LPS array of `s + '#' + s[::-1]`: `lps[-1]` gives the longest palindromic prefix of `s` in O(N). |

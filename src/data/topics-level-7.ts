import { DSATopic } from "@/types/dsa";

export const TOPICS_LEVEL_7: DSATopic[] = [
  // ============================================================================
  // LEVEL 7: RANGE STRUCTURES, ADVANCED STRINGS, MATH & SPECIALIZED (38 - 46)
  // ============================================================================
  {
    id: "ordered-set",
    order: 38,
    title: "Ordered Set & Balanced BSTs (Dynamic Sorted Collections)",
    shortTitle: "Ordered Set",
    englishTerm: "Ordered Set / SortedList & Balanced BST Operations",
    kind: "hybrid",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["bst", "binary-search"],
    summary:
      "A self-balancing dynamic collection (`SortedList` / `SortedSet` from `sortedcontainers` in Python, `std::set` in C++, `TreeSet` in Java) that keeps elements sorted at all times, allowing **insertions, deletions, and nearest-neighbor queries (`>= x` or `<= x`) in O(log N)**.",
    analogy:
      "A magical library where every time you return a new book, the shelves rearrange themselves in `log N` steps, allowing you to instantly ask not only whether a book exists, but 'what is the book with the price immediately above $45?' or 'how many books cost less than $30?'.",
    whenToUse: [
      "You need to insert and remove numbers dynamically AND query at each step the **successor (`>= x` / `bisect_left`)**, the **predecessor (`<= x` / `bisect_right - 1`)**, or **how many elements smaller than `x`** have appeared so far.",
      "Maintaining non-overlapping active intervals in a dynamic calendar (`My Calendar I`) or a sorted sliding window (`Contains Duplicate III`, `Sliding Window Median`).",
    ],
    whenNotToUse: [
      "If all data is static from the start (you do not need a dynamic Ordered Set; just sort the array once and use Binary Search). If you only need the overall minimum or maximum, use a Heap (lighter weight).",
    ],
    timeComplexity: {
      average: "add / remove / bisect_left / index `s[k]`: O(log N)",
      worst: "O(log N)",
      note: "In LeetCode Python, `from sortedcontainers import SortedList` is pre-installed by default.",
    },
    spaceComplexity: "O(N)",
    constraintHint: "Dynamic Insertion/Deletion + Nearest Neighbor or Order-Statistic Query in O(log N)",
    pythonTemplate: `# In LeetCode Python, 'sortedcontainers' is included in the official runtime:
from sortedcontainers import SortedList

def contains_nearby_almost_duplicate(nums: list[int], indexDiff: int, valueDiff: int) -> bool:
    """
    Classic Ordered Set in a Sliding Window Pattern (LeetCode 220).
    Check if within the last 'indexDiff' elements there is any value in [x - valueDiff, x + valueDiff].
    Time: O(N log(indexDiff)) | Space: O(indexDiff)
    """
    window = SortedList()
    for i, x in enumerate(nums):
        # 1. Find the smallest element in the window that is >= x - valueDiff
        pos = window.bisect_left(x - valueDiff)
        if pos < len(window) and window[pos] <= x + valueDiff:
            return True

        # 2. Insert current element and evict the one leaving the indexDiff window
        window.add(x)
        if i >= indexDiff:
            window.remove(nums[i - indexDiff])
    return False`,
    typescriptTemplate: `// In TypeScript/JS we can use Binary Search on a maintained block structure or Coordinate Compression + Fenwick Tree
export function lowerBound(sortedArr: number[], target: number): number {
  let low = 0,
    high = sortedArr.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (sortedArr[mid] >= target) high = mid;
    else low = mid + 1;
  }
  return low;
}`,
    leetcodeProblems: [
      {
        number: 729,
        title: "My Calendar I",
        slug: "my-calendar-i",
        difficulty: "Medium",
        patternHint: "Store sorted intervals and use `bisect_left` to check only the immediately preceding and succeeding events.",
      },
      {
        number: 220,
        title: "Contains Duplicate III",
        slug: "contains-duplicate-iii",
        difficulty: "Hard",
        patternHint: "Maintain a `SortedList` of the last `k` elements and query `bisect_left(x - t)`.",
      },
      {
        number: 315,
        title: "Count of Smaller Numbers After Self",
        slug: "count-of-smaller-numbers-after-self",
        difficulty: "Hard",
        patternHint: "Scan right to left: `window.bisect_left(x)` tells you in O(log N) how many smaller elements you have already seen.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain what gap the Ordered Set fills between a Hash Set (which is O(1) but completely unordered) and a Heap (which only sees the minimum or maximum at the top). Reveal the secret weapon for Python interviews: LeetCode comes with `from sortedcontainers import SortedList` pre-installed.",
      keyTakeaways: [
        "Hash Set = O(1) exact lookup without order. Heap = only min/max in O(log N). Ordered Set = insertion, deletion, and nearest-neighbor lookup `>= x` in O(log N).",
        "In Python use `from sortedcontainers import SortedList` with `.add(x)`, `.remove(x)`, and `.bisect_left(x)`.",
      ],
      stepByStepWalkthrough: [
        "Identify that the problem requires inserting/deleting elements AND asking order or proximity questions (`>= x`, `<= x`, or the K-th active element).",
        "Query the neighbor with `idx = sl.bisect_left(target)` and verify `idx < len(sl)`.",
        "Update the collection with `sl.add(x)` and `sl.remove(old)`.",
      ],
      interviewTraps: [
        "Using `list.insert(idx, x)` after a `bisect` on a standard Python list thinking it is O(log N): searching is O(log N), but inserting into the middle of a `list` still shifts elements in O(N). Use `SortedList`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Hash Set vs Heap vs Ordered Set: The Collection Triad",
          visualCue: "Comparison table showing why neither a Hash Set nor a Heap can answer 'what is the closest element to X?'.",
          narration:
            "A Hash Set does not know who is larger than whom, and a Heap only knows the champion sitting at the top. When you need your entire collection to stay sorted while data enters and leaves live, the Ordered Set takes center stage.",
        },
        {
          timestamp: "01:45 - 04:15",
          sectionTitle: "SortedList in Python and the Nearest-Neighbor Pattern",
          visualCue: "Sliding window querying the floor and ceiling of `x` with `bisect_left`.",
          narration:
            "With `bisect_left` on a sorted collection, you find in logarithmic time the element immediately greater than or equal to your target and the one immediately smaller, solving calendar booking and near-duplicate problems in just a few lines.",
        },
      ],
    },
  },
  {
    id: "fenwick-tree",
    order: 39,
    title: "Fenwick Tree / Binary Indexed Tree (BIT)",
    shortTitle: "Fenwick Tree (BIT)",
    englishTerm: "Fenwick Tree / Binary Indexed Tree (BIT)",
    kind: "hybrid",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["prefix-sum", "trees"],
    summary:
      "A dynamic Prefix Sum in just 15 lines of code: it uses the lowest set bit (`i & -i`) so that **both updating an element (`update`) and querying the sum of any range `[L, R]` (`query`) take O(log N) time**.",
    analogy:
      "Instead of having every step store the sum of all previous steps (which would force you to fix every subsequent step whenever the first one changes), we group sums into powers of 2 (blocks of size 1, 2, 4, 8, 16...). That way, any update or prefix sum is assembled by jumping across at most `log2(N)` blocks.",
    whenToUse: [
      "The problem interleaves **point updates (`nums[i] += delta`)** with **range sum queries (`sum(nums[L..R])`)** (`Range Sum Query - Mutable`).",
      "Counting inversions or how many elements smaller/larger than `x` have appeared so far (using the values or their compressed ranks as indices in the Fenwick Tree).",
    ],
    whenNotToUse: [
      "If the array never changes (use a simple Prefix Sum in O(1) per query).",
      "If you need to query the **minimum or maximum of an arbitrary range `[L, R]` with updates that can freely increase or decrease values**: `min/max` is not invertible like subtraction `query(R) - query(L-1)`, so you need a **Segment Tree**.",
    ],
    timeComplexity: {
      average: "Update: O(log N) | Prefix/Range Query: O(log N)",
      worst: "O(log N)",
      note: "Uses 1-based indexing (`1..N`) because `0 & -0 == 0` would trap the loop at index 0.",
    },
    spaceComplexity: "O(N) a single `tree` array of size `N + 1`",
    constraintHint: "Dynamic range sums with updates or order-statistic counting in O(N log N)",
    pythonTemplate: `class FenwickTree:
    """
    Binary Indexed Tree (BIT / Fenwick Tree) in 15 lines.
    IMPORTANT: Internally always 1-indexed (indices 1 to N).
    Bit trick: (i & -i) extracts the largest power of 2 that divides 'i'.
    """
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (n + 1)

    def add(self, i: int, delta: int) -> None:
        """Add 'delta' at 1-based index 'i' in O(log N)."""
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i

    def prefix_sum(self, i: int) -> int:
        """Return the sum of [1..i] in O(log N)."""
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

    def range_sum(self, left: int, right: int) -> int:
        """Return the sum of [left..right] (1-based) in O(log N)."""
        return self.prefix_sum(right) - self.prefix_sum(left - 1)`,
    typescriptTemplate: `export class FenwickTree {
  private tree: number[];
  private n: number;

  constructor(n: number) {
    this.n = n;
    this.tree = new Array<number>(n + 1).fill(0);
  }

  add(i: number, delta: number): void {
    for (; i <= this.n; i += i & -i) {
      this.tree[i] += delta;
    }
  }

  prefixSum(i: number): number {
    let sum = 0;
    for (; i > 0; i -= i & -i) {
      sum += this.tree[i];
    }
    return sum;
  }

  rangeSum(left: number, right: number): number {
    return this.prefixSum(right) - this.prefixSum(left - 1);
  }
}`,
    leetcodeProblems: [
      {
        number: 307,
        title: "Range Sum Query - Mutable",
        slug: "range-sum-query-mutable",
        difficulty: "Medium",
        patternHint: "Use `bit.add(i + 1, new_val - old_val)` to update and `bit.range_sum(L + 1, R + 1)` to query.",
      },
      {
        number: 315,
        title: "Count of Smaller Numbers After Self",
        slug: "count-of-smaller-numbers-after-self",
        difficulty: "Hard",
        patternHint: "Coordinate-compress values (Rank Compression) and scan right to left querying `bit.prefix_sum(rank - 1)`.",
      },
      {
        number: 493,
        title: "Reverse Pairs",
        slug: "reverse-pairs",
        difficulty: "Hard",
        patternHint: "Count how many previous elements exceed `2 * nums[j]` using a Fenwick Tree with coordinate compression or Merge Sort.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Present the Fenwick Tree as 'the 15-line gem every advanced interviewee loves': while a recursive Segment Tree takes 50 lines, a Fenwick Tree can be written in 2 minutes thanks to the binary trick `i & -i` (isolating the lowest set bit). Explain why the index MUST start at 1 (`1-based`).",
      keyTakeaways: [
        "In a standard Array: `update` is O(1) and `range_sum` is O(N). In a Prefix Sum: `update` is O(N) and `range_sum` is O(1). In a Fenwick Tree: **BOTH are O(log N)**.",
        "The expression `i & -i` (two's complement) isolates the lowest set bit: to climb toward parent ranges do `i += i & -i`; to accumulate prefix blocks do `i -= i & -i`.",
        "Always add `+1` to 0-based LeetCode indices before passing them to the Fenwick Tree.",
      ],
      stepByStepWalkthrough: [
        "Create `tree = [0] * (n + 1)`.",
        "In `add(i, delta)`, while `i <= n`, add `delta` and advance with `i += i & -i`.",
        "In `prefix_sum(i)`, while `i > 0`, accumulate `tree[i]` and step back with `i -= i & -i`.",
      ],
      interviewTraps: [
        "Passing index `0` to `add(0, delta)`: since `0 & -0` is `0`, the loop `while i <= n: i += i & -i` never advances and hangs in an infinite loop.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "The Prefix Sum Dilemma When Data Mutates",
          visualCue: "Time comparison between Array, Prefix Sum, and Fenwick Tree (O(log N) for both operations).",
          narration:
            "Prefix Sums were perfect until someone mutated a number in the array and forced us to recompute the entire table in O(N). The Fenwick Tree solves this dilemma, achieving both point updates and range sums in logarithmic time with barely fifteen lines of code.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "The Magic of `i & -i` and Coordinate Compression",
          visualCue: "Power-of-2 staircase showing how `13 (1101_2)` jumps to `12 (1100_2)` and then to `8 (1000_2)`.",
          narration:
            "The entire secret of the Fenwick Tree lives in the operation `i & -i`, which extracts the lowest power of two from any integer. By subtracting it at each step, we decompose any prefix into at most log(N) jumps.",
        },
      ],
    },
  },
  {
    id: "segment-tree",
    order: 40,
    title: "Segment Tree & Lazy Propagation",
    shortTitle: "Segment Tree",
    englishTerm: "Segment Tree & Lazy Propagation",
    kind: "hybrid",
    level: 7,
    difficulty: "Expert",
    branchCategory: "advanced-math-range",
    prerequisites: ["fenwick-tree", "divide-and-conquer", "trees"],
    summary:
      "The ultimate data structure for queries and updates over **intervals `[L, R]`**: a binary tree where each node represents a sub-segment of the array and stores any associative function (**Min, Max, Sum, GCD, XOR**) in **O(log N)**.",
    analogy:
      "A regional sales hierarchy: the CEO holds the record for the entire country `[0..7]`; underneath sit the directors for the western half `[0..3]` and eastern half `[4..7]`, all the way down to individual stores. If you ask for the maximum across stores `[1..6]`, you do not visit all 6 stores: you ask a couple of middle managers whose regions cover that exact span in `log N` calls.",
    whenToUse: [
      "You need to query the **Minimum, Maximum, GCD, or Sum of a range `[L, R]`** while the array undergoes dynamic updates (where a Fenwick Tree cannot handle arbitrary sub-range `min/max`).",
      "**Lazy Propagation**: When updates modify not just a single cell, but **an entire range `[L, R]` at once** ('add +5 to every element between L and R' or 'set segment `[L, R]` to value X') in O(log N).",
    ],
    whenNotToUse: [
      "If you only need range sums with single-element updates: use a **Fenwick Tree**, which takes a third of the code and less memory.",
    ],
    timeComplexity: {
      average: "Build: O(N) | Update: O(log N) | Range Query `[L, R]`: O(log N)",
      worst: "O(log N) per operation",
      note: "The iterative Segment Tree uses only `2 * N` integers and is extremely fast and concise for interviews.",
    },
    spaceComplexity: "O(N) (`2N` in the iterative version or `4N` in the recursive version)",
    constraintHint: "Dynamic Range Min/Max/Sum Query with N, Q <= 10^5",
    pythonTemplate: `class IterativeSegmentTree:
    """
    Compact Iterative Segment Tree (Size 2N) for Range Maximum/Sum Query.
    Leaves live in tree[n .. 2n-1] and internal parents in tree[1 .. n-1].
    Build Time: O(N) | Update & Query: O(log N)
    """
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)
        # 1. Copy leaves into the second half
        for i, x in enumerate(nums):
            self.tree[self.n + i] = x
        # 2. Build internal parents bottom-up in O(N)
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = max(self.tree[2 * i], self.tree[2 * i + 1])

    def update(self, idx: int, val: int) -> None:
        pos = idx + self.n
        self.tree[pos] = val
        while pos > 1:
            pos //= 2
            self.tree[pos] = max(self.tree[2 * pos], self.tree[2 * pos + 1])

    def range_max(self, left: int, right: int) -> int:
        """Maximum in the closed range [left, right] (0-indexed)."""
        res = float("-inf")
        l = left + self.n
        r = right + self.n + 1  # Half-open [l, r)
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l //= 2
            r //= 2
        return res`,
    typescriptTemplate: `export class SegmentTreeMax {
  private n: number;
  private tree: number[];

  constructor(nums: number[]) {
    this.n = nums.length;
    this.tree = new Array<number>(2 * this.n).fill(-Infinity);
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = nums[i];
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = Math.max(this.tree[2 * i], this.tree[2 * i + 1]);
    }
  }

  update(idx: number, val: number): void {
    let pos = idx + this.n;
    this.tree[pos] = val;
    while (pos > 1) {
      pos >>= 1;
      this.tree[pos] = Math.max(this.tree[2 * pos], this.tree[2 * pos + 1]);
    }
  }

  rangeMax(left: number, right: number): number {
    let res = -Infinity;
    let l = left + this.n;
    let r = right + this.n + 1;
    while (l < r) {
      if (l & 1) res = Math.max(res, this.tree[l++]);
      if (r & 1) res = Math.max(res, this.tree[--r]);
      l >>= 1;
      r >>= 1;
    }
    return res;
  }
}`,
    leetcodeProblems: [
      {
        number: 307,
        title: "Range Sum Query - Mutable",
        slug: "range-sum-query-mutable",
        difficulty: "Medium",
        patternHint: "Replace `max` with `+` in the iterative Segment Tree.",
      },
      {
        number: 715,
        title: "Range Module",
        slug: "range-module",
        difficulty: "Hard",
        patternHint: "Dynamic Segment Tree with Lazy Propagation or sorted interval maintenance.",
      },
      {
        number: 2407,
        title: "Longest Increasing Subsequence II",
        slug: "longest-increasing-subsequence-ii",
        difficulty: "Hard",
        patternHint: "Combine DP with a Range Maximum Segment Tree: `dp[x] = 1 + seg.range_max(x - k, x - 1)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how a Segment Tree works by decomposing any arbitrary interval into at most `2 log2(N)` canonical blocks. Present the '2N Iterative Segment Tree' trick (which fits in 20 lines during an interview) and conceptually explain Lazy Propagation (postponing whole-block updates on a sticky note until a query actually needs to visit its children).",
      keyTakeaways: [
        "A Segment Tree works for ANY associative operation (`max`, `min`, `+`, `gcd`, `xor`, transition matrices), whereas a Fenwick Tree requires invertible operations like addition.",
        "In the `2N` iterative Segment Tree, leaves live in `[N .. 2N-1]` and the parent of `k` is `k // 2`.",
        "Lazy Propagation lets you update a million elements in a range `[L, R]` in O(log N) by storing the pending change on higher-level nodes.",
      ],
      stepByStepWalkthrough: [
        "Place initial elements in the right half `tree[n .. 2n-1]`.",
        "Fill parents from `n-1` down to `1` by combining `tree[2*i]` and `tree[2*i + 1]`.",
        "To update, modify leaf `idx + n` and walk up dividing by 2 to the root.",
        "To query `[L, R]`, climb from both ends inward in O(log N).",
      ],
      interviewTraps: [
        "In a recursive Segment Tree, allocating `2 * N` instead of `4 * N`: when `N` is not an exact power of 2, the recursive tree array requires up to `4 * N` slots.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "Why the Segment Tree Rules Range Queries",
          visualCue: "Binary tree of intervals covering range `[1..6]` with only 3 shaded canonical nodes.",
          narration:
            "What do you do when you need the maximum or minimum of a range a thousand times per second while array values mutate live? A Fenwick Tree is no longer enough because a maximum cannot be subtracted. Enter the Segment Tree.",
        },
        {
          timestamp: "02:00 - 05:00",
          sectionTitle: "20-Line Iterative Segment Tree and Lazy Propagation",
          visualCue: "Array of size `2N` updating leaves and propagating 'Lazy' tags across ranges.",
          narration:
            "Many candidates fear the Segment Tree because the classic recursive version is verbose. With the 2N iterative layout, leaves sit in the second half of the array and parents sit in the first half: clean, fast, and recursion-free.",
        },
      ],
    },
  },
  {
    id: "rolling-hash",
    order: 41,
    title: "Rolling Hash & Rabin-Karp Algorithm",
    shortTitle: "Rolling Hash",
    englishTerm: "Rolling Hash & Rabin-Karp Algorithm",
    kind: "algorithm",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["strings", "sliding-window", "hash-table"],
    summary:
      "Treating a string as a base-`B` number modulo a large prime `MOD` so that when a sliding window shifts one character to the right, we can **update the window's hash in O(1) time** (subtracting the exiting left character and adding the entering right character), enabling O(1) substring comparisons.",
    analogy:
      "In base 10, if you have the 4-digit window `3456` and slide one step right where `7` enters (to form `4567`), you do not rebuild the number from scratch: you subtract `3 * 1000`, multiply the remainder by `10`, and add `7`. Rolling Hash does the exact same arithmetic with characters.",
    whenToUse: [
      "Comparing substrings or finding **duplicate substrings of length `L`** in O(N) (`Repeated DNA Sequences`, `Longest Duplicate Substring` combining `Binary Search + Rolling Hash`).",
      "Searching for multiple patterns at once or finding the longest palindrome prefix using forward and backward rolling hashes.",
    ],
    whenNotToUse: [
      "For finding a single pattern in a text without needing numeric hashes, KMP is deterministic and free of modular collision risk.",
    ],
    timeComplexity: {
      average: "Precompute or slide window: O(N) | Query hash of substring `s[L..R]`: O(1)",
      worst: "O(N) with a large prime (e.g., `MOD = 10^9 + 7` or `2^61 - 1`)",
      note: "Combining Binary Search on length `L` with Rolling Hash solves 'Longest Duplicate Substring' in O(N log N).",
    },
    spaceComplexity: "O(N) for prefix hashes and powers of the base",
    constraintHint: "O(1) substring comparison or repeated substring search with N <= 10^5",
    pythonTemplate: `class PolynomialRollingHash:
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
        ) % self.mod`,
    typescriptTemplate: `export class RollingHash {
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
}`,
    leetcodeProblems: [
      {
        number: 187,
        title: "Repeated DNA Sequences",
        slug: "repeated-dna-sequences",
        difficulty: "Medium",
        patternHint: "Slide a window of length 10 maintaining its numeric base-4 hash in O(1) per step.",
      },
      {
        number: 1044,
        title: "Longest Duplicate Substring",
        slug: "longest-duplicate-substring",
        difficulty: "Hard",
        patternHint: "Binary Search on length `L` + Rolling Hash in O(N) to check if any length-`L` hash repeats.",
      },
      {
        number: 718,
        title: "Maximum Length of Repeated Subarray",
        slug: "maximum-length-of-repeated-subarray",
        difficulty: "Medium",
        patternHint: "Solvable in O((N + M) log(min(N, M))) with Binary Search + Rolling Hash.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Connect Prefix Sums and Sliding Window to strings: explain why hashing a length-K substring with a standard `hash()` function inside a window costs O(K) per step (O(N*K) total), whereas treating the string as a polynomial in base `B` lets you compute the hash of any substring in O(1).",
      keyTakeaways: [
        "Rolling Hash is the exact equivalent of Prefix Sums for strings: it gives you the fingerprint of `s[L..R]` in O(1).",
        "When subtracting in modular arithmetic `(a - b) % MOD`, in languages like JS/C++/Java you must add `((a - b) % MOD + MOD) % MOD` to avoid negative remainders (in Python `%` already returns a non-negative result).",
      ],
      stepByStepWalkthrough: [
        "Choose a `base` larger than the alphabet size (e.g., `31` or `313`) and a large prime `MOD` (`10^9 + 7` or `10^9 + 9`).",
        "Precompute `pref_hash[i]` and `power[i] = base^i % MOD` in O(N).",
        "Query any range `[L, R]` with `(pref_hash[R+1] - pref_hash[L] * power[R - L + 1]) % MOD`.",
      ],
      interviewTraps: [
        "Using a small modulus like `10,007`: by the Birthday Paradox, when comparing 10^5 substrings you will hit collisions with any modulus smaller than roughly N^2. Use a prime >= 10^9 + 7 or double hashing.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Turning Words into Numbers: The Base-10 Intuition",
          visualCue: "The window `3456` sliding to `4567` by subtracting `3*1000`, multiplying by `10`, and adding `7`.",
          narration:
            "If you slice a ten-thousand-character substring into a Hash Set at every step of a sliding window, copying and hashing those ten thousand characters blows your complexity up to O(N^2). Rolling Hash updates the fingerprint in O(1) with a single subtraction and multiplication.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Prefix Hashes + Binary Search in Longest Duplicate Substring",
          visualCue: "Combining Binary Search on length L with Rolling Hash to detect duplicates in O(N).",
          narration:
            "Once you precompute the hashes of all prefixes and powers of the base, you can extract the signature of any sub-segment `[L, R]` in constant O(1) time, just like Prefix Sums.",
        },
      ],
    },
  },
  {
    id: "string-matching",
    order: 42,
    title: "String Matching (KMP Algorithm & LPS Prefix Function)",
    shortTitle: "String Matching (KMP)",
    englishTerm: "String Matching (KMP, Z-Algorithm & LPS Array)",
    kind: "algorithm",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["strings", "two-pointers"],
    summary:
      "Find all occurrences of a pattern `P` inside a text `T` in strictly linear **O(|T| + |P|)** time without ever moving the text pointer backward. The secret is the **LPS (Longest Proper Prefix which is also Suffix)** array from the **Knuth-Morris-Pratt (KMP)** algorithm.",
    analogy:
      "If you are searching for `'ABABAC'` and after matching the first 5 letters `'ABABA'` you fail on the 6th letter, you do not need to restart from scratch: because you already know the tail `'ABA'` you just read matches the opening `'ABA'` of your pattern, you continue directly from the 4th letter.",
    whenToUse: [
      "Searching for a pattern `P` in a text `T` with guaranteed worst-case O(N + M) time (even on repetitive inputs like `'aaaa...ab'`).",
      "Detecting whether a string is built by repeating a shorter periodic block (`Repeated Substring Pattern`).",
      "Finding the **longest palindrome starting at index 0** by concatenating `s + '#' + s[::-1]` and inspecting the last value of its LPS array (`Shortest Palindrome`).",
    ],
    whenNotToUse: [
      "In simple problems where `N` is small and built-in `s.find(p)` is fast enough.",
    ],
    timeComplexity: {
      average: "Build LPS: O(M) | Search text: O(N) -> Total: O(N + M)",
      worst: "Deterministic O(N + M) (no pathological O(N*M) cases)",
      note: "The `lps[i]` entry stores the length of the longest proper prefix of `P[0..i]` that is also a suffix of `P[0..i]`.",
    },
    spaceComplexity: "O(M) for the pattern's `lps` array",
    constraintHint: "Exact pattern matching, string periodicity, or Shortest Palindrome in O(N)",
    pythonTemplate: `def build_kmp_lps(pattern: str) -> list[int]:
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
    return -1`,
    typescriptTemplate: `export function buildKmpLps(pattern: string): number[] {
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
}`,
    leetcodeProblems: [
      {
        number: 28,
        title: "Find the Index of the First Occurrence in a String",
        slug: "find-the-index-of-the-first-occurrence-in-a-string",
        difficulty: "Easy",
        patternHint: "Foundational problem for implementing KMP in O(N + M).",
      },
      {
        number: 459,
        title: "Repeated Substring Pattern",
        slug: "repeated-substring-pattern",
        difficulty: "Easy",
        patternHint: "With KMP: a string of length `N` is periodic iff `lps[-1] > 0` and `N % (N - lps[-1]) == 0`.",
      },
      {
        number: 214,
        title: "Shortest Palindrome",
        slug: "shortest-palindrome",
        difficulty: "Hard",
        patternHint: "Build the LPS array of `s + '#' + s[::-1]`: `lps[-1]` gives the longest palindromic prefix of `s` in O(N).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Visually explain what the KMP `LPS` table means ('how much of the tail of what I just read is identical to the start of the pattern so I never have to re-compare it?'). Reveal the star trick for Hard problems: concatenating `s + '#' + reverse(s)` and computing its LPS to find the longest palindromic prefix in O(N) (`Shortest Palindrome`).",
      keyTakeaways: [
        "Naive string search degrades to O(N*M) when there are many false starts like searching for `'AAAAB'` inside `'AAAAAAAAAB'`. KMP never moves the text index `i` backward.",
        "The key line in KMP is `length = lps[length - 1]`: when a character mismatches, we fall back to the second-best prefix-suffix already computed.",
        "The minimum period of a string of length `N` is `N - lps[N - 1]`.",
      ],
      stepByStepWalkthrough: [
        "Preprocess pattern `P` of length `M` to fill its `lps` array in O(M).",
        "Scan text `T` with index `i` and pattern `P` with index `j`.",
        "If `T[i] == P[j]`, advance both; if they mismatch and `j > 0`, jump `j = lps[j - 1]` without rewinding `i`.",
      ],
      interviewTraps: [
        "In `Shortest Palindrome` (`s + '#' + s[::-1]`), forgetting to insert a separator character `'#'` in the middle, allowing the prefix-suffix match to bleed across the boundary and exceed the length of `s`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "Why Naive Search Backtracks and How KMP Only Looks Forward",
          visualCue: "Comparison of a pointer rewinding over and over on `'AAAAAB'` vs KMP marching straight ahead.",
          narration:
            "When you search for a word and fail on the last letter, the naive algorithm throws away everything it just read and rewinds the text pointer. Knuth, Morris, and Pratt proved that what you just read already contains all the information needed to never step backward again.",
        },
        {
          timestamp: "02:00 - 04:45",
          sectionTitle: "The LPS Table and the `s + '#' + reverse(s)` Trick",
          visualCue: "LPS table for `'ABABAC'` and its direct application to Shortest Palindrome.",
          narration:
            "Beyond searching words, the LPS table is a symmetry detector: it tells you in O(N) whether a string is made of repeating blocks and what the longest palindrome anchored at index zero is.",
        },
      ],
    },
  },
  {
    id: "bit-manipulation",
    order: 43,
    title: "Bit Manipulation & XOR Tricks",
    shortTitle: "Bit Manipulation",
    englishTerm: "Bit Manipulation & XOR Tricks",
    kind: "algorithm",
    level: 7,
    difficulty: "Intermediate",
    branchCategory: "advanced-math-range",
    prerequisites: ["basic-dsa", "arrays"],
    summary:
      "Operate directly on the binary representation of numbers in CPU registers (`&`, `|`, `^`, `~`, `<<`, `>>`) to achieve O(1) extra space and blazing-fast constant-time operations.",
    analogy:
      "The XOR operator (`^`) works like a two-way staircase light switch: if you flip it twice with the same number (`x ^ x`), it returns to off (`0`). That is why if you XOR an entire list where every number appears in pairs except one, all pairs cancel out and leave only the lone number lit up.",
    whenToUse: [
      "**XOR Properties (`^`)**: Find the single non-repeating element (`Single Number`: `x ^ x = 0` and `x ^ 0 = x`) or the missing number in `0..N`.",
      "**Brian Kernighan's Trick (`n & (n - 1)`)**: Clear the lowest set `1` bit to count how many set bits an integer has (`Counting Bits`) or check in O(1) whether `n` is a power of 2 (`n > 0 and (n & (n - 1)) == 0`).",
      "**Isolating the Lowest Set Bit (`n & -n`)**: Split two unique numbers (`Single Number III`) or navigate a Fenwick Tree.",
    ],
    whenNotToUse: [
      "Do not sacrifice code readability with obscure bit hacks if standard arithmetic has the exact same complexity and is clearer.",
    ],
    timeComplexity: {
      average: "O(1) per bit operation | O(N) across an array scan",
      worst: "O(1) for 32/64-bit integers",
      note: "`n & (n - 1)` jumps directly between set bits without inspecting intermediate zeros.",
    },
    spaceComplexity: "O(1) CPU registers",
    constraintHint: "O(N) Time with strict O(1) Space constraint, XOR cancellation, or powers of 2",
    pythonTemplate: `def bit_manipulation_essentials(nums: list[int], n: int) -> tuple[int, bool, int]:
    """
    The 3 Core Bit Manipulation Tricks for Interviews:
    """
    # 1. XOR cancels duplicates: x ^ x = 0, x ^ 0 = x
    single = 0
    for x in nums:
        single ^= x

    # 2. Is 'n' an exact power of 2? (Has exactly one '1' bit set)
    is_power_of_two = n > 0 and (n & (n - 1)) == 0

    # 3. Brian Kernighan's Algorithm: count '1' bits by clearing the lowest set bit each step
    ones_count = 0
    temp = n
    while temp > 0:
        temp &= temp - 1  # Clears the least significant '1' bit
        ones_count += 1

    return single, is_power_of_two, ones_count`,
    typescriptTemplate: `export function singleNumberXor(nums: number[]): number {
  let ans = 0;
  for (const x of nums) {
    ans ^= x;
  }
  return ans;
}

export function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}`,
    leetcodeProblems: [
      {
        number: 136,
        title: "Single Number",
        slug: "single-number",
        difficulty: "Easy",
        patternHint: "Accumulate the XOR of all numbers: pairs cancel to `0` and the unique number survives in O(1) space.",
      },
      {
        number: 191,
        title: "Number of 1 Bits",
        slug: "number-of-1-bits",
        difficulty: "Easy",
        patternHint: "Repeat `n &= n - 1` counting how many steps it takes to reach 0.",
      },
      {
        number: 338,
        title: "Counting Bits",
        slug: "counting-bits",
        difficulty: "Easy",
        patternHint: "DP + Bits: `dp[i] = dp[i >> 1] + (i & 1)` or `dp[i] = dp[i & (i - 1)] + 1`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Take a brisk, memorable tour through the 4 superpowers of bit manipulation: 1) The 3 laws of XOR (`x ^ 0 = x`, `x ^ x = 0`, and commutativity/associativity), 2) Brian Kernighan's `n & (n - 1)` to clear the lowest set bit and detect powers of 2, 3) `n & -n` to isolate the lowest set bit, and 4) Shifts `1 << k` and `(n >> k) & 1`.",
      keyTakeaways: [
        "XOR (`^`) is base-2 addition without carry: adding the same value twice brings you back to zero.",
        "`n & (n - 1)` erases the rightmost `1` bit; if a positive integer was a power of 2 (had a single `1` bit), `n & (n - 1)` becomes `0`.",
        "In Python, integers have arbitrary precision (infinite bits), so when simulating signed 32-bit integers in problems like `Sum of Two Integers`, apply a mask `MASK = 0xFFFFFFFF`.",
      ],
      stepByStepWalkthrough: [
        "To read bit `k`: `(n >> k) & 1`.",
        "To set bit `k`: `n | (1 << k)`.",
        "To clear bit `k`: `n & ~(1 << k)`.",
        "To toggle bit `k`: `n ^ (1 << k)`.",
      ],
      interviewTraps: [
        "In Python, applying `~n` or bit shifts to negative numbers expecting automatic 32-bit overflow (like in C++/Java): Python integers do not wrap at 32 bits unless you explicitly mask with `& 0xFFFFFFFF`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "The Magic of XOR: Finding a Needle in a Haystack with O(1) Memory",
          visualCue: "Pairs of matching numbers colliding under XOR and turning into 0, leaving only the unique number.",
          narration:
            "When a problem asks you to find the only unpaired number in linear time while forbidding a Hash Set by demanding O(1) memory, the answer lives in the bits: the XOR operator cancels any number that appears an even number of times.",
        },
        {
          timestamp: "01:45 - 04:15",
          sectionTitle: "Brian Kernighan's Trick: `n & (n - 1)`",
          visualCue: "Binary `10100` subtracting 1 (`10011`) and ANDing to clear the lowest 1 (`10000`).",
          narration:
            "Subtracting 1 from a binary number flips every bit from the rightmost 1 to the end. That is why `n & (n - 1)` clears the lowest set bit in a single CPU instruction.",
        },
      ],
    },
  },
  {
    id: "math",
    order: 44,
    title: "Math, Combinatorics & Computational Geometry",
    shortTitle: "Math & Geometry",
    englishTerm: "Math, Combinatorics & Computational Geometry",
    kind: "algorithm",
    level: 7,
    difficulty: "Intermediate",
    branchCategory: "advanced-math-range",
    prerequisites: ["basic-dsa", "arrays"],
    summary:
      "Replace slow simulations with closed-form O(1) or O(log N) formulas: Gauss arithmetic series, combinatorics ($nCr$), binary exponentiation (`pow(x, n)` in O(log N)), slopes represented as irreducible fractions `(dy // g, dx // g)`, and 2D cross products.",
    analogy:
      "When young Carl Friedrich Gauss's teacher asked the class to sum the numbers from 1 to 100 to keep them busy for an hour, instead of adding one by one (O(N)), Gauss paired `1+100 = 101`, `2+99 = 101`... 50 pairs of 101 = `5050` in a single second (O(1)).",
    whenToUse: [
      "Series sums (`n * (n + 1) // 2`), pair counting (`n * (n - 1) // 2`), or grid paths via combinatorics $\\binom{m+n-2}{m-1}$.",
      "**Binary Exponentiation**: Compute $x^n$ in $O(\\log n)$ using $x^{2k} = (x^2)^k$.",
      "**2D Geometry**: Point collinearity (`Max Points on a Line`), turn orientation via **Cross Product**, and squared Euclidean distances (`dx^2 + dy^2` without `sqrt` to avoid floating-point inaccuracy).",
    ],
    whenNotToUse: [
      "NEVER divide floats `dy / dx` to use slopes as Hash Map keys! `0.1 + 0.2 != 0.3` in IEEE 754 and division by zero crashes on vertical lines. Always reduce by `gcd(dy, dx)` and store the integer tuple `(dy // g, dx // g)`.",
    ],
    timeComplexity: {
      average: "Gauss formulas: O(1) | Binary Exponentiation: O(log N)",
      worst: "O(log N)",
      note: "Avoid `math.sqrt` and `float` whenever you can compare squared distances with exact integers.",
    },
    spaceComplexity: "O(1)",
    constraintHint: "N >= 10^9 requiring O(1)/O(log N), combinatorial counting, or points on a 2D plane",
    pythonTemplate: `import math

def fast_power(x: float, n: int) -> float:
    """
    1. Binary Exponentiation (Pow(x, n)) in O(log N).
    If n is even: x^n = (x * x)^(n // 2).
    """
    if n < 0:
        x = 1.0 / x
        n = -n
    res = 1.0
    while n > 0:
        if n & 1:
            res *= x
        x *= x
        n >>= 1
    return res


def normalized_slope(p1: list[int], p2: list[int]) -> tuple[int, int]:
    """
    2. Exact Float-Free Slope in Geometry (safe as a Hash Map key).
    Reduce (dy, dx) by their Greatest Common Divisor and normalize the sign.
    """
    dy = p2[1] - p1[1]
    dx = p2[0] - p1[0]
    if dx == 0:
        return (1, 0)
    if dy == 0:
        return (0, 1)
    if dx < 0:
        dx, dy = -dx, -dy
    g = math.gcd(abs(dy), abs(dx))
    return (dy // g, dx // g)`,
    typescriptTemplate: `export function fastPower(x: number, n: number): number {
  let exp = BigInt(n);
  if (exp < 0n) {
    x = 1 / x;
    exp = -exp;
  }
  let res = 1;
  while (exp > 0n) {
    if ((exp & 1n) === 1n) res *= x;
    x *= x;
    exp >>= 1n;
  }
  return res;
}`,
    leetcodeProblems: [
      {
        number: 50,
        title: "Pow(x, n)",
        slug: "powx-n",
        difficulty: "Medium",
        patternHint: "Binary exponentiation halving the exponent `n` at each step in O(log N).",
      },
      {
        number: 149,
        title: "Max Points on a Line",
        slug: "max-points-on-a-line",
        difficulty: "Hard",
        patternHint: "For each anchor point, group other points in a Hash Map using the reduced integer slope `(dy // gcd, dx // gcd)`.",
      },
      {
        number: 62,
        title: "Unique Paths",
        slug: "unique-paths",
        difficulty: "Medium",
        patternHint: "Beyond DP, it is pure combinatorics: choose where the `m-1` down steps go among `(m-1) + (n-1)` total steps: `math.comb(m + n - 2, m - 1)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Teach the mathematical tools that save interviews: 1) How to count pairs `N*(N-1)//2` and subarrays `L*(L+1)//2` instantly, 2) Binary Exponentiation (`Pow(x, n)`) in O(log N), and 3) The golden rule of Computational Geometry: 'Floating point is your enemy; use squared distances and GCD-reduced slopes'.",
      keyTakeaways: [
        "In a group of `K` identical items, the number of pairs you can form is `K * (K - 1) // 2`.",
        "In a valid segment of length `L`, the number of contiguous subarrays contained within it is `L * (L + 1) // 2`.",
        "To compare distances in the plane, compare `dx*dx + dy*dy` with integers instead of `sqrt(dx*dx + dy*dy)`.",
      ],
      stepByStepWalkthrough: [
        "Check whether an O(N) simulation can be collapsed into an O(1) division, modulo, or Gauss sum.",
        "For large exponents, square the base and halve the exponent on each iteration.",
        "For line and point problems, represent each direction as `(dy // gcd, dx // gcd)`.",
      ],
      interviewTraps: [
        "Using floating-point `dy / dx` to group collinear points: it crashes with `ZeroDivisionError` on vertical lines and suffers from precision loss on large coordinates.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Gauss's Shortcut and Instant Pair & Subarray Counting",
          visualCue: "Triangle of pairs showing why `1 + 2 + ... + (N-1) = N*(N-1)/2`.",
          narration:
            "Often you have already found the valid groups with a Hash Map or a sliding window, and to finish the problem you just need to count how many pairs or subarrays they form without running an extra loop. Gauss's formula `N*(N-1)//2` solves it in O(1).",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "O(log N) Binary Exponentiation and Float-Free Geometry",
          visualCue: "Computing `x^1024` in just 10 multiplications and reducing fraction `(dy, dx)` by its GCD.",
          narration:
            "In interview geometry there is one commandment: stay away from floating-point decimals whenever possible. Representing a slope as a fraction simplified by its Greatest Common Divisor eliminates both division by zero and rounding errors.",
        },
      ],
    },
  },
  {
    id: "number-theory",
    order: 45,
    title: "Number Theory (Euclidean GCD, Sieve of Eratosthenes & Modular Arithmetic)",
    shortTitle: "Number Theory",
    englishTerm: "Number Theory (Euclidean GCD, Sieve of Eratosthenes & Modular Arithmetic)",
    kind: "algorithm",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["math", "arrays"],
    summary:
      "The pillars of integers and prime numbers: 1) **Euclidean Algorithm** for Greatest Common Divisor (`GCD`) and Least Common Multiple (`LCM`) in O(log(min(a,b))), 2) **Sieve of Eratosthenes** to find all primes up to `N` in $O(N \\log \\log N)$, 3) **Prime Factorization in $O(\\sqrt{N})$**, and 4) **Modular Arithmetic (`10^9 + 7`)**.",
    analogy:
      "The Sieve of Eratosthenes works like a layered strainer: you start at 2 and cross out all multiples of 2 (4, 6, 8...); the next uncrossed number is 3, so it is prime and you cross out its multiples starting from `3*3 = 9` onward. By the time you reach $\\sqrt{N}$, every surviving uncrossed number is prime.",
    whenToUse: [
      "The problem asks you to return the answer **'modulo $10^9 + 7$'** (a signal that the answer grows exponentially and you must apply `% MOD` at every addition and multiplication).",
      "Finding all prime numbers below `N` (`Count Primes`) or decomposing numbers into their prime factors (e.g., to connect numbers sharing a common factor via Union-Find).",
      "Simplifying fractions, synchronizing periodic cycles (`LCM(a, b) = (a * b) // GCD(a, b)`), or determining whether a target volume is measurable (`Water and Jug Problem` — Bezout's Identity).",
    ],
    whenNotToUse: [
      "To check whether a SINGLE individual number `X` is prime, do not build the entire Sieve up to `X`: just test divisors up to `d * d <= X` in $O(\\sqrt{X})$.",
    ],
    timeComplexity: {
      average: "Euclidean GCD: O(log(min(a,b))) | Sieve of Eratosthenes: O(N log log N) ~ O(N)",
      worst: "Factoring a single number X: O(sqrt(X))",
      note: "In the Sieve of Eratosthenes, when crossing out multiples of prime `p`, always start at `p * p` because smaller multiples (`2p, 3p...`) were already crossed out by smaller primes.",
    },
    spaceComplexity: "O(1) for GCD | O(N) for Sieve of Eratosthenes",
    constraintHint: "Primes up to N <= 5*10^6, divisibility, GCD/LCM, or answers modulo 10^9 + 7",
    pythonTemplate: `def gcd_and_lcm(a: int, b: int) -> tuple[int, int]:
    """
    1. Euclidean Algorithm in O(log(min(a, b))):
       gcd(a, b) = gcd(b, a % b)
    """
    x, y = a, b
    while y:
        x, y = y, x % y
    gcd_val = x
    lcm_val = (a * b) // gcd_val if gcd_val else 0
    return gcd_val, lcm_val


def sieve_of_eratosthenes(n: int) -> list[bool]:
    """
    2. Sieve of Eratosthenes to identify all primes in [0..n] in O(N log log N).
    """
    if n < 2:
        return [False] * (n + 1)
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    p = 2
    while p * p <= n:
        if is_prime[p]:
            # Start at p * p and step by p
            for multiple in range(p * p, n + 1, p):
                is_prime[multiple] = False
        p += 1
    return is_prime`,
    typescriptTemplate: `export function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function countPrimesSieve(n: number): number {
  if (n <= 2) return 0;
  const isPrime = new Uint8Array(n).fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;

  for (let p = 2; p * p < n; p++) {
    if (isPrime[p] === 1) {
      for (let mult = p * p; mult < n; mult += p) {
        isPrime[mult] = 0;
      }
    }
  }
  let count = 0;
  for (let i = 2; i < n; i++) count += isPrime[i];
  return count;
}`,
    leetcodeProblems: [
      {
        number: 204,
        title: "Count Primes",
        slug: "count-primes",
        difficulty: "Medium",
        patternHint: "Sieve of Eratosthenes crossing out from `p * p` with step `p` while `p * p < n`.",
      },
      {
        number: 1979,
        title: "Find Greatest Common Divisor of Array",
        slug: "find-greatest-common-divisor-of-array",
        difficulty: "Easy",
        patternHint: "Apply the Euclidean algorithm between `min(nums)` and `max(nums)`.",
      },
      {
        number: 952,
        title: "Largest Component Size by Common Factor",
        slug: "largest-component-size-by-common-factor",
        difficulty: "Hard",
        patternHint: "Decompose each number into its prime factors in O(sqrt(X)) and union them in a Disjoint Set Union (DSU).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain the 3 cornerstones of Number Theory in interviews: 1) The Euclidean Algorithm (`while b: a, b = b, a % b`) and why it is as fast as Binary Search, 2) The Sieve of Eratosthenes and why the inner loop starts at `p * p` (not `2 * p`), and 3) The rules of Modular Arithmetic (`10^9 + 7`), including Fermat's Little Theorem (`pow(b, MOD - 2, MOD)`) when dividing under a prime modulus.",
      keyTakeaways: [
        "In Euclid's algorithm, `a % b` shrinks the number by at least half every 2 steps, taking $O(\\log(\\min(a,b)))$.",
        "In the Sieve of Eratosthenes, starting at `p * p` saves massive work because any `k * p` with `k < p` was already crossed out earlier by the smallest prime factor of `k`.",
        "Under a prime modulus `MOD = 10^9 + 7`, addition and multiplication distribute `(a * b) % MOD`, but to divide by `b` you must multiply by its modular inverse `pow(b, MOD - 2, MOD)`.",
      ],
      stepByStepWalkthrough: [
        "To find all primes up to `N`: use the Sieve of Eratosthenes with `p * p <= n`.",
        "To factor a number `X`: test `d = 2` while `d * d <= X`, dividing `X //= d` while divisible; if `X > 1` at the end, the remaining `X` is also a prime factor.",
        "For calculations modulo `10^9 + 7`: apply `% MOD` at every accumulation step.",
      ],
      interviewTraps: [
        "Doing `(a // b) % MOD` when the problem asks for the result of a division modulo `10^9 + 7` (for instance in combinatorics $nCr \\pmod{10^9+7}$): once `a` has been reduced modulo `MOD`, ordinary integer division produces a completely wrong answer. Use the modular inverse `a * pow(b, MOD - 2, MOD) % MOD`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "History's Oldest and Most Elegant Algorithm: Euclid in 3 Lines",
          visualCue: "Two bars of length A and B reducing via `a % b` until finding the exact common measure.",
          narration:
            "Written more than two thousand three hundred years ago, the Euclidean Algorithm computes the Greatest Common Divisor of two astronomical numbers in the blink of an eye: while B is non-zero, replace A and B with B and A modulo B.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Sieve of Eratosthenes (`p * p`) and the Mystery of `10^9 + 7`",
          visualCue: "Number grid crossing out multiples from `p^2` and a visual breakdown of modulo `10^9 + 7`.",
          narration:
            "Why do so many LeetCode problems ask for the answer modulo 1,000,000,007? Because it is the first prime number after one billion: it fits cleanly inside standard integer types without overflowing, and being prime lets us divide using the modular inverse.",
        },
      ],
    },
  },
  {
    id: "specialized-advanced",
    order: 46,
    title: "Specialized Advanced Patterns (Sweep Line, Boyer-Moore, Tarjan & Euler)",
    shortTitle: "Specialized Patterns",
    englishTerm: "Sweep Line, Boyer-Moore Majority Vote, Reservoir Sampling, Tarjan & Hierholzer",
    kind: "algorithm",
    level: 7,
    difficulty: "Expert",
    branchCategory: "advanced-math-range",
    prerequisites: ["sorting-intervals", "graphs", "dfs"],
    summary:
      "The elite toolkit to complete the Flowchart: 1) **Sweep Line / Difference Array** (turning intervals into `+1` open and `-1` close events), 2) **Boyer-Moore Majority Vote** (finding the majority element in O(N) time and O(1) space), 3) **Reservoir Sampling**, 4) **Hierholzer's Algorithm (Eulerian Path)**, and 5) **Tarjan's Bridge-Finding Algorithm (`tin` & `low`)**.",
    analogy:
      "Picture a security guard at the entrance of a shopping mall (Sweep Line / Event Counter): to know which minute of the day had the highest crowd inside, you do not need to track each shopper individually; you simply add `+1` to your counter every time someone walks in and subtract `-1` every time someone walks out.",
    whenToUse: [
      "**Sweep Line / Difference Array**: How many intervals are active simultaneously at each point, or what is the peak number of rooms needed? (`Meeting Rooms II`, `Car Pooling`, `The Skyline Problem`).",
      "**Boyer-Moore Majority Vote**: Find the element that appears more than `floor(N/2)` (or `floor(N/3)`) times under a strict **O(1) memory** constraint (`Majority Element I & II`).",
      "**Hierholzer (Eulerian Path)**: Traverse **EVERY EDGE** of a graph exactly once (`Reconstruct Itinerary`) by appending nodes in post-order after exhausting outgoing edges.",
      "**Tarjan (`tin` and `low`)**: Find **Critical Connections (Bridges)** whose removal disconnects the graph (`Critical Connections in a Network`).",
    ],
    whenNotToUse: [
      "Do not use Boyer-Moore to find the general 'most frequent' element unless it is guaranteed to exceed `N/2` (or unless you run a second verification pass).",
    ],
    timeComplexity: {
      average: "Boyer-Moore: O(N) time, O(1) space | Sweep Line: O(N log N) | Tarjan / Hierholzer: O(V + E)",
      worst: "O(N log N) or O(V + E)",
      note: "A Difference Array (`diff[L] += val; diff[R+1] -= val`) applies N range additions in O(1) each and reconstructs the final array with a single O(N) Prefix Sum.",
    },
    spaceComplexity: "O(1) for Boyer-Moore | O(N) for Sweep Line / Tarjan",
    constraintHint: "Peak event concurrency, O(1)-space Majority Vote, Network Bridges, or Eulerian Path",
    pythonTemplate: `def boyer_moore_majority_vote(nums: list[int]) -> int:
    """
    1. Boyer-Moore Majority Vote Algorithm.
    Finds the element appearing > N/2 times in O(N) time and O(1) space.
    """
    candidate = 0
    count = 0
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate


def sweep_line_max_overlap(intervals: list[list[int]]) -> int:
    """
    2. Sweep Line (+1 / -1 Event Scanning).
    Finds the maximum number of simultaneously overlapping intervals (Meeting Rooms II).
    """
    events: list[tuple[int, int]] = []
    for start, end in intervals:
        events.append((start, +1))  # Interval opens
        events.append((end, -1))    # Interval closes

    # If one interval ends right when another starts, process the closing (-1) first
    events.sort(key=lambda e: (e[0], e[1]))
    active = max_active = 0
    for _, delta in events:
        active += delta
        max_active = max(max_active, active)
    return max_active`,
    typescriptTemplate: `export function boyerMooreMajorityVote(nums: number[]): number {
  let candidate = 0;
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}

export function sweepLineMaxOverlap(intervals: number[][]): number {
  const events: Array<[number, number]> = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }
  events.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

  let active = 0,
    maxActive = 0;
  for (const [, delta] of events) {
    active += delta;
    maxActive = Math.max(maxActive, active);
  }
  return maxActive;
}`,
    leetcodeProblems: [
      {
        number: 169,
        title: "Majority Element",
        slug: "majority-element",
        difficulty: "Easy",
        patternHint: "Boyer-Moore algorithm: cancel distinct elements pairwise while maintaining `candidate` and `count` in O(1) space.",
      },
      {
        number: 1094,
        title: "Car Pooling",
        slug: "car-pooling",
        difficulty: "Medium",
        patternHint: "Sweep Line / Difference Array: add `+passengers` at pickup `from` and subtract `-passengers` at drop-off `to`.",
      },
      {
        number: 1192,
        title: "Critical Connections in a Network",
        slug: "critical-connections-in-a-network",
        difficulty: "Hard",
        patternHint: "Tarjan's algorithm: an edge `(u, v)` is a critical bridge iff `low[v] > discovery_time[u]`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Close out episode #46 of the 'Leet-YT' series with a grand finale showcasing the 4 specialized patterns that make a Senior/Staff candidate shine: 1) Sweep Line & Difference Arrays (`+1` at `start`, `-1` at `end`), 2) O(1)-space Boyer-Moore Majority Vote, 3) Eulerian Path with Hierholzer (`Reconstruct Itinerary`), and 4) Critical Bridge Detection with Tarjan (`Critical Connections`).",
      keyTakeaways: [
        "Sweep Line breaks intervals `[start, end]` into two independent point events `(start, +1)` and `(end, -1)`.",
        "A Difference Array is the inverse of a Prefix Sum: adding `V` to the entire range `[L, R]` is just `diff[L] += V` and `diff[R+1] -= V` in O(1).",
        "In Boyer-Moore, if one army holds more than half the soldiers, even if every soldier pairs off 1-to-1 with an enemy and both vanish, the majority army is guaranteed to be the last one standing.",
      ],
      stepByStepWalkthrough: [
        "For interval concurrency (Sweep Line): emit `+delta` at `start` and `-delta` at `end`, sort by coordinate, and accumulate.",
        "For offline batch range additions (Difference Array): apply `+V` at `L` and `-V` at `R+1`, then take the prefix sum at the end.",
        "For Boyer-Moore: switch `candidate` only when `count == 0`.",
      ],
      interviewTraps: [
        "In Sweep Line, failing to define tie-breaking when one interval ends at the exact timestamp `t` another starts: if `[1, 2]` and `[2, 3]` do NOT overlap, `(t, -1)` must sort before `(t, +1)`; if touching endpoints DO count as overlapping, `(t, +1)` comes first.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "Sweep Line and Difference Arrays: The Power of +1 and -1 Events",
          visualCue: "A vertical line sweeping across intervals from left to right adding +1 on entry and -1 on exit.",
          narration:
            "We have reached the final episode of our 46-topic map. We kick off this capstone with a brilliant insight: an interval from start to end is nothing more than two point events in time, a `+1` when it opens and a `-1` when it closes.",
        },
        {
          timestamp: "02:00 - 05:15",
          sectionTitle: "O(1) Boyer-Moore, Eulerian Paths, and Tarjan's Bridges",
          visualCue: "Visual summary of Boyer-Moore cancellation, Eulerian edge traversal, and Tarjan's `low[v] > tin[u]` bridge condition.",
          narration:
            "With Boyer-Moore for O(1) majorities, Hierholzer for traversing every edge once, and Tarjan for spotting critical network bridges, you have completed all 46 nodes of the Leet-YT Flowchart.",
        },
      ],
    },
  },
];

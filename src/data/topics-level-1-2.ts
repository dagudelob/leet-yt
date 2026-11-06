import { DSATopic } from "@/types/dsa";

export const TOPICS_LEVEL_1_2: DSATopic[] = [
  // ============================================================================
  // LEVEL 1: FOUNDATIONS, COMPLEXITY & LINEAR SEQUENCES (01 - 07)
  // ============================================================================
  {
    id: "basic-dsa",
    order: 1,
    title: "Basic DSA & Big-O Complexity",
    shortTitle: "Basic DSA & Big-O",
    englishTerm: "Basic DSA & Time/Space Complexity",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "fundamentals",
    prerequisites: [],
    summary:
      "The master compass before writing a single line of code: how to read the input constraints (N) of any LeetCode problem to deduce in 5 seconds which time complexity (Big-O) and algorithm family you need.",
    analogy:
      "Imagine delivering packages across a city. If there are 10 packages (N <= 10), you can try every possible route order (O(N!)). If there are 100,000 packages (N <= 10^5), comparing every pair of addresses (O(N^2)) would take months: you need a single linear pass (O(N)) or a sorted route (O(N log N)). Problem constraints are your CPU time budget.",
    whenToUse: [
      "Always as Step 0 before solving any coding interview or competitive programming problem.",
      "Whenever you check the maximum value of N in the Constraints section (e.g., N <= 10^5 means O(N^2) will trigger Time Limit Exceeded - TLE).",
      "When deciding whether to trade O(N) extra memory in exchange for reducing time from O(N^2) down to O(N).",
    ],
    whenNotToUse: [
      "Do not over-engineer a complex O(N) solution if N <= 50 and a clean O(N^2) or O(N^3) solution runs in 2 milliseconds.",
    ],
    timeComplexity: {
      average: "O(1) < O(log N) < O(N) < O(N log N)",
      worst: "O(N^2) < O(2^N) < O(N!)",
      note: "Rule of thumb: a modern judge CPU executes ~10^8 simple operations per second.",
    },
    spaceComplexity: "O(1) auxiliary up to O(N) depending on data structures or recursion call stack",
    constraintHint: "N <= 20 -> O(2^N) | N <= 10^3 -> O(N^2) | N <= 10^5 -> O(N log N) or O(N) | N >= 10^9 -> O(log N) or O(1)",
    pythonTemplate: `def analyze_constraints(n: int) -> str:
    """
    Constraint-to-Complexity translator for coding interviews.
    Rule of thumb: ~10^8 simple operations per second.
    """
    if n <= 11:
        return "O(N!) - Permutations / Exhaustive Backtracking"
    elif n <= 20:
        return "O(2^N) or O(N * 2^N) - Subsets / Bitmask DP"
    elif n <= 500:
        return "O(N^3) - Floyd-Warshall / Interval DP"
    elif n <= 5_000:
        return "O(N^2) - Nested loops / 2D Dynamic Programming"
    elif n <= 200_000:
        return "O(N log N) or O(N) - Sorting, Heap, Two Pointers, Sliding Window, Hash"
    else:
        return "O(log N) or O(1) - Binary Search or Closed-Form Math"`,
    typescriptTemplate: `export function analyzeConstraints(n: number): string {
  // Rule of thumb: ~10^8 simple operations per second
  if (n <= 11) return "O(N!) - Permutations / Backtracking";
  if (n <= 20) return "O(2^N) - Subsets / Bitmask DP";
  if (n <= 500) return "O(N^3) - Cubic DP / Floyd-Warshall";
  if (n <= 5000) return "O(N^2) - Nested loops / 2D DP";
  if (n <= 200000) return "O(N log N) or O(N) - Sorting, Heap, Two Pointers, Hash";
  return "O(log N) or O(1) - Binary Search or Direct Math Formula";
}`,
    leetcodeProblems: [
      {
        number: 1480,
        title: "Running Sum of 1d Array",
        slug: "running-sum-of-1d-array",
        difficulty: "Easy",
        patternHint: "Compare recomputing from index 0 in O(N^2) vs accumulating in a single O(N) pass.",
      },
      {
        number: 412,
        title: "Fizz Buzz",
        slug: "fizz-buzz",
        difficulty: "Easy",
        patternHint: "Single linear O(N) scan and output memory analysis.",
      },
      {
        number: 1342,
        title: "Number of Steps to Reduce a Number to Zero",
        slug: "number-of-steps-to-reduce-a-number-to-zero",
        difficulty: "Easy",
        patternHint: "Dividing by 2 repeatedly introduces logarithmic time complexity O(log N).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Frame this as Episode #01 of the 'Leet-YT' series in English. Explain with energy how the Algorithm Decision Flowchart works and reveal the 'Constraint Secret': how looking at the maximum input size N lets you eliminate 80% of wrong algorithms before writing any code.",
      keyTakeaways: [
        "Never memorize thousands of isolated solutions; learn to decode problem signals and constraints.",
        "The 10^8 operations-per-second rule bridges the input size N to the maximum allowed Big-O complexity.",
        "Space complexity always includes the recursion Call Stack depth.",
      ],
      stepByStepWalkthrough: [
        "Read the problem statement and identify the primary input structure (Array, String, Tree, Graph).",
        "Jump immediately to the 'Constraints' section and inspect the upper bound of N.",
        "Map N to the complexity ceiling table to lock in your target Big-O.",
        "Follow the Leet-YT Decision Flowchart to pick the exact pattern.",
      ],
      interviewTraps: [
        "Ignoring hidden O(N) costs inside loops—such as array slicing `arr[i:j]` or string concatenation—which silently turn an O(N) loop into O(N^2).",
        "Forgetting that recursion of depth N consumes O(N) auxiliary Call Stack memory.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:15",
          sectionTitle: "Hook: Why We Freeze in Coding Interviews",
          visualCue: "Show the full Leet-YT Decision Flowchart lighting up from root to leaf nodes.",
          narration:
            "Have you ever opened a coding interview problem, stared at a blank editor, and wondered where to even begin? The number one mistake is guessing code before reading the clues the problem gives you for free.",
        },
        {
          timestamp: "01:15 - 03:30",
          sectionTitle: "The Golden Rule: Decoding Constraints (N)",
          visualCue: "Animated table comparing N <= 20, N <= 10^3, N <= 10^5, and N <= 10^9 against execution times.",
          narration:
            "Online judges execute roughly one hundred million operations per second. That means if N is one hundred thousand, a nested O(N^2) loop performs ten billion operations and hits Time Limit Exceeded. Just seeing N <= 10^5 tells you immediately that you need O(N) or O(N log N).",
        },
        {
          timestamp: "03:30 - 06:00",
          sectionTitle: "How to Navigate the 46-Node Flowchart",
          visualCue: "Visual walkthrough across the 7 progressive levels of the platform.",
          narration:
            "Across this series, we will master all 46 core building blocks—from Arrays and Two Pointers to Dynamic Programming and Segment Trees. Every episode unlocks a new node on the flowchart.",
        },
      ],
    },
  },
  {
    id: "brute-force",
    order: 2,
    title: "Brute Force & Exhaustive Search",
    shortTitle: "Brute Force",
    englishTerm: "Brute Force & Exhaustive Search",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "fundamentals",
    prerequisites: ["basic-dsa"],
    summary:
      "Systematically enumerating every candidate configuration and checking which ones satisfy the problem condition. It is the mandatory starting point in every interview before optimizing.",
    analogy:
      "Opening a 3-digit combination lock by testing 000, 001, 002 all the way to 999 one by one. It is not fancy, but it guarantees 100% that you will find the answer and clarifies the exact rules of the lock.",
    whenToUse: [
      "When N is very small (e.g., N <= 100 for O(N^2) or N <= 10 for O(N!)).",
      "During the first 2 minutes of an interview to establish a working baseline and pinpoint redundant work to optimize.",
      "To generate small stress-tests and verify your optimized algorithm produces the exact same output.",
    ],
    whenNotToUse: [
      "When N >= 10^4 and your brute force checks all pairs O(N^2) or all subsets O(2^N).",
    ],
    timeComplexity: {
      average: "O(N^2) or O(N^3) for pairs/triplets",
      worst: "O(2^N) or O(N!) for combinatorial search",
      note: "Directly proportional to the total number of candidate states.",
    },
    spaceComplexity: "O(1) when iterating with indices",
    constraintHint: "N <= 200 for triple loops | N <= 2000 for double loops",
    pythonTemplate: `def two_sum_brute_force(nums: list[int], target: int) -> list[int]:
    """
    Enumerates every unique pair (i, j) with i < j.
    Time: O(N^2) | Space: O(1)
    """
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
    typescriptTemplate: `export function twoSumBruteForce(nums: number[], target: number): number[] {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
    leetcodeProblems: [
      {
        number: 1,
        title: "Two Sum",
        slug: "two-sum",
        difficulty: "Easy",
        patternHint: "Start with the O(N^2) nested loop and notice that the inner lookup for `target - nums[i]` can be accelerated.",
      },
      {
        number: 1534,
        title: "Count Good Triplets",
        slug: "count-good-triplets",
        difficulty: "Easy",
        patternHint: "With N <= 100, the O(N^3) triple loop is the direct expected solution.",
      },
      {
        number: 2367,
        title: "Number of Arithmetic Triplets",
        slug: "number-of-arithmetic-triplets",
        difficulty: "Easy",
        patternHint: "Compare O(N^3) brute force against O(N) set lookup.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain why Brute Force is NOT a failure in a coding interview, but the essential first stepping stone. Show how stating the brute force clearly in 30 seconds reveals the bottleneck that leads to Hash Maps or Two Pointers.",
      keyTakeaways: [
        "Stating the brute-force baseline first shows structured thinking and confirms you understood the problem.",
        "Every optimization (Hash Map, Sliding Window, DP) comes from asking: 'What repeated work is my brute force doing?'",
      ],
      stepByStepWalkthrough: [
        "Define what a single 'candidate solution' looks like (a pair of indices, a subarray, a subset).",
        "Write nested loops that enumerate all unique candidates without duplicates (`j = i + 1`).",
        "Validate each candidate and update the best answer.",
        "Identify the innermost loop to optimize with a data structure.",
      ],
      interviewTraps: [
        "Starting `j` at `0` instead of `i + 1`, which uses the same element twice or counts duplicate pairs.",
        "Sitting in silence trying to invent a clever O(N) trick without first securing the O(N^2) baseline.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:00",
          sectionTitle: "The Myth That Brute Force Is Bad",
          visualCue: "Side-by-side comparison: a silent stuck candidate vs one who states the O(N^2) baseline in 30 seconds.",
          narration:
            "Many candidates think mentioning Brute Force in an interview loses points. In reality, it is your compass: you cannot optimize a bottleneck until you can see the bottleneck.",
        },
        {
          timestamp: "01:00 - 03:30",
          sectionTitle: "Anatomy of Pair and Triplet Enumeration",
          visualCue: "Animation of indices i and j scanning an upper-triangular grid.",
          narration:
            "When we scan pairs with i from 0 and j from i+1, we inspect N*(N-1)/2 combinations. Seeing that inner loop search for a complement makes it obvious why Hash Maps and Two Pointers exist.",
        },
      ],
    },
  },
  {
    id: "simulation",
    order: 3,
    title: "Simulation (Step-by-Step State Execution)",
    shortTitle: "Simulation",
    englishTerm: "Simulation",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "fundamentals",
    prerequisites: ["basic-dsa"],
    summary:
      "Faithfully translating the rules of a process, game, or physical system into clean, bug-free code by maintaining state transitions at each step.",
    analogy:
      "Acting as the referee of a board game who follows the rulebook to the letter: roll the dice, move the token X spaces, check if it landed on an obstacle, and update the scoreboard.",
    whenToUse: [
      "The problem describes explicit step-by-step rules (a robot turning on a grid, spiral matrix traversal, turn-based game).",
      "You are not asked to search millions of branches for a hidden optimum, but rather compute the exact outcome of following given rules.",
    ],
    whenNotToUse: [
      "When the number of steps to simulate is astronomical (e.g., K = 10^12 steps); in that case, detect cycles and use modular arithmetic (`K % cycle_length`) instead of simulating one by one.",
    ],
    timeComplexity: {
      average: "O(Steps * Cost per step)",
      worst: "O(N) to O(N^2)",
      note: "If states repeat cyclically, use modulo of the period to fast-forward large K.",
    },
    spaceComplexity: "O(1) or proportional to the board state",
    constraintHint: "Explicit rules with N or steps <= 10^5",
    pythonTemplate: `def robot_simulation(commands: list[str]) -> tuple[int, int]:
    """
    Clean Simulation using Direction Vectors (North, East, South, West).
    Avoids messy if/else chains by indexing into (dx, dy) offsets.
    """
    # North, East, South, West (clockwise order)
    dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    d = 0  # Starts facing North
    x, y = 0, 0

    for cmd in commands:
        if cmd == "R":
            d = (d + 1) % 4
        elif cmd == "L":
            d = (d - 1) % 4
        else:
            steps = int(cmd)
            dx, dy = dirs[d]
            x += dx * steps
            y += dy * steps
    return x, y`,
    typescriptTemplate: `export function robotSimulation(commands: string[]): [number, number] {
  // North, East, South, West in clockwise order
  const dirs: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let d = 0;
  let x = 0,
    y = 0;

  for (const cmd of commands) {
    if (cmd === "R") d = (d + 1) % 4;
    else if (cmd === "L") d = (d + 3) % 4;
    else {
      const steps = Number(cmd);
      x += dirs[d][0] * steps;
      y += dirs[d][1] * steps;
    }
  }
  return [x, y];
}`,
    leetcodeProblems: [
      {
        number: 657,
        title: "Robot Return to Origin",
        slug: "robot-return-to-origin",
        difficulty: "Easy",
        patternHint: "Track (x, y) coordinates applying directional unit vectors.",
      },
      {
        number: 54,
        title: "Spiral Matrix",
        slug: "spiral-matrix",
        difficulty: "Medium",
        patternHint: "Maintain 4 shrinking boundaries (`top`, `bottom`, `left`, `right`) after each directional pass.",
      },
      {
        number: 874,
        title: "Walking Robot Simulation",
        slug: "walking-robot-simulation",
        difficulty: "Medium",
        patternHint: "Clockwise direction vectors `(d + 1) % 4` paired with a Hash Set of obstacles.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Focus this episode on writing clean, bug-free code for Simulation problems. Teach the pro technique of clockwise 'Direction Vectors' `(dx, dy)` with `% 4` modular arithmetic to replace 20-line `if/else` blocks.",
      keyTakeaways: [
        "In simulation problems, the challenge is clean state engineering and boundary control rather than algorithmic invention.",
        "Use clockwise direction arrays `dirs = [(0,1), (1,0), (0,-1), (-1,0)]` so turning right is `(d + 1) % 4`.",
        "If asked to simulate 10^9 steps in a finite state space, detect the cycle and use modulo.",
      ],
      stepByStepWalkthrough: [
        "Identify the minimal variables that represent the full state of the system (e.g., `x, y, d`).",
        "Encode transitions using lookup tables or small helper functions.",
        "Check boundary conditions before committing each move.",
      ],
      interviewTraps: [
        "Writing 16 nested `if/else` branches for turns instead of circular indexing `% 4`.",
        "In JavaScript/TypeScript, forgetting that `-1 % 4` evaluates to `-1`; always use `(d + 3) % 4` for a left turn.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "What Makes a Problem a Simulation",
          visualCue: "A robot moving on a coordinate grid with directional arrows.",
          narration:
            "In some interview problems, you do not need to invent a hidden algorithm—the prompt already tells you exactly what happens at every step. The real test is translating those rules without tangling your own code.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "The Direction Vector Trick",
          visualCue: "Compass with indices 0, 1, 2, 3 showing `(d + 1) % 4` and `(d + 3) % 4`.",
          narration:
            "Forget giant switch statements for North, South, East, and West. By ordering your direction vectors clockwise, turning right is always adding 1 modulo 4.",
        },
      ],
    },
  },
  {
    id: "arrays",
    order: 4,
    title: "Arrays (Static & Dynamic Arrays)",
    shortTitle: "Arrays",
    englishTerm: "Arrays & Dynamic Arrays",
    kind: "data-structure",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["basic-dsa"],
    summary:
      "The foundational data structure of computing: contiguous blocks of memory that provide instant O(1) random access by index and optimal CPU cache locality.",
    analogy:
      "A row of numbered lockers (0 to N-1) along a straight hallway. Because every locker has the exact same width and sits right next to the previous one, jumping to locker #500 does not require walking past lockers 0 through 499—you calculate its exact position and jump there in O(1).",
    whenToUse: [
      "You need instant O(1) random access to any element given its index `i`.",
      "You want maximum memory efficiency and cache-friendly sequential iteration.",
      "As the underlying storage for Two Pointers, Sliding Window, Prefix Sums, Binary Search, and Binary Heaps.",
    ],
    whenNotToUse: [
      "You need frequent insertions or deletions at the front or middle of the collection (which costs O(N) because all subsequent elements must shift in memory).",
    ],
    timeComplexity: {
      average: "Index Access: O(1) | Append at end: O(1) amortized",
      worst: "Insert/Delete at front or middle: O(N) | Unsorted search: O(N)",
      note: "Dynamic arrays (`list` in Python, `Array` in JS) double their underlying capacity when full.",
    },
    spaceComplexity: "O(N) contiguous memory",
    constraintHint: "Foundation for almost all sequence problems with N <= 10^5",
    pythonTemplate: `def array_operations_demo(nums: list[int]) -> list[int]:
    """
    Core operations and real complexities on Python's dynamic array (list).
    """
    # 1. Random access by index -> O(1)
    first = nums[0] if nums else 0

    # 2. Append to the end -> O(1) amortized
    nums.append(first + 10)

    # 3. Pop from the end -> O(1)
    nums.pop()

    # 4. In-place reversal without extra memory -> O(N) time, O(1) space
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1

    return nums`,
    typescriptTemplate: `export function arrayOperationsDemo(nums: number[]): number[] {
  // 1. O(1) random access by index
  const first = nums.length > 0 ? nums[0] : 0;

  // 2. O(1) amortized push / pop at the end
  nums.push(first + 10);
  nums.pop();

  // 3. In-place reversal -> O(N) time, O(1) extra space
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  return nums;
}`,
    leetcodeProblems: [
      {
        number: 238,
        title: "Product of Array Except Self",
        slug: "product-of-array-except-self",
        difficulty: "Medium",
        patternHint: "Two passes over the array (prefix products forward, suffix products backward) in O(N) time and O(1) extra space.",
      },
      {
        number: 189,
        title: "Rotate Array",
        slug: "rotate-array",
        difficulty: "Medium",
        patternHint: "The 3-reversal in-place trick rotates an array in O(N) time and O(1) extra space.",
      },
      {
        number: 485,
        title: "Max Consecutive Ones",
        slug: "max-consecutive-ones",
        difficulty: "Easy",
        patternHint: "Single linear scan tracking the current streak counter.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how Arrays work in physical RAM (`base_address + i * element_size`) and how Dynamic Arrays achieve O(1) amortized append via geometric capacity doubling. Warn strongly against calling `pop(0)` or `insert(0, x)` inside a loop.",
      keyTakeaways: [
        "An Array stores elements in contiguous memory cells, computing the address of index `i` in O(1).",
        "Appending and popping at the end is O(1) amortized, but inserting or deleting at index 0 costs O(N).",
        "In-place segment reversals (like the 3-reverse rotation trick) save O(N) auxiliary memory.",
      ],
      stepByStepWalkthrough: [
        "Visualize the contiguous memory block and constant-time address offset calculation.",
        "Understand dynamic resizing: doubling capacity copies N elements only once every N appends.",
        "Use forward, backward, and two-pass prefix/suffix scans.",
      ],
      interviewTraps: [
        "Calling `nums.pop(0)` in Python or `nums.shift()` in JS inside a `while` loop—silently turning a linear algorithm into O(N^2). Use `collections.deque` for queues.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Why the Array Is King of Memory",
          visualCue: "Contiguous RAM blocks lighting up as `arr[4]` is accessed in a single jump.",
          narration:
            "Before diving into advanced algorithms, we must master the data structure behind 70% of interview problems: the Array. Its superpower lies in how it sits physically in RAM.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "Dynamic Arrays and the Hidden Cost of Shifting",
          visualCue: "Animation of every element shifting right when inserting at index 0.",
          narration:
            "Appending to the end takes constant amortized time. But deleting or inserting at index zero forces the entire row to shift one slot over. Doing that inside a loop is the #1 cause of silent Time Limit Exceeded.",
        },
      ],
    },
  },
  {
    id: "strings",
    order: 5,
    title: "Strings & Character Manipulation",
    shortTitle: "Strings",
    englishTerm: "Strings & Character Manipulation",
    kind: "data-structure",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["arrays"],
    summary:
      "Character sequences that behave like read-only arrays (immutable in Python, JS, and Java). Mastering ASCII offsets (`ord(c) - ord('a')`), 26-letter frequency signatures, and O(N) string building with `join` is essential before Sliding Window and String Matching.",
    analogy:
      "A necklace of lettered beads sealed with glue (immutable). You can inspect any bead instantly by position, but if you want to swap a single bead or add one at the end, you must restring a brand-new necklace.",
    whenToUse: [
      "Text processing, palindromes, anagrams, substrings, and format parsing.",
      "When the alphabet is small and fixed (e.g., 26 lowercase English letters `'a'-'z'`), letting you replace a general Hash Map with a fixed-size array of 26 integers.",
    ],
    whenNotToUse: [
      "Avoid repeatedly concatenating strings with `s += ch` inside large loops in languages with immutable strings; accumulate in a list of characters and call `''.join(chars)` in O(N).",
    ],
    timeComplexity: {
      average: "Index read `s[i]`: O(1) | Slice / Copy / Compare: O(N)",
      worst: "Naive repeated concatenation in a loop: O(N^2)",
      note: "Using `''.join(list_of_Parts)` guarantees O(N) string construction.",
    },
    spaceComplexity: "O(N) to hold the character list or resulting string",
    constraintHint: "Alphabet 'a'-'z' -> Fixed 26-slot frequency array in O(1) space",
    pythonTemplate: `def char_frequency_signature(s: str) -> tuple[int, ...]:
    """
    Maps a lowercase 'a'-'z' string to a 26-integer tuple signature in O(N).
    Two strings are anagrams if and only if their signatures are identical.
    """
    counts = [0] * 26
    for ch in s:
        # ord(ch) - ord('a') maps 'a'->0, 'b'->1, ..., 'z'->25
        counts[ord(ch) - ord('a')] += 1
    return tuple(counts)


def build_string_efficiently(parts: list[str]) -> str:
    # Always use ''.join() instead of += inside a loop
    return "".join(parts)`,
    typescriptTemplate: `export function charFrequencySignature(s: string): string {
  const counts = new Array<number>(26).fill(0);
  const base = "a".charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - base]++;
  }
  return counts.join("#");
}`,
    leetcodeProblems: [
      {
        number: 242,
        title: "Valid Anagram",
        slug: "valid-anagram",
        difficulty: "Easy",
        patternHint: "Use a 26-slot array with `ord(c) - ord('a')` to compare character frequencies in O(N) time and O(1) space.",
      },
      {
        number: 49,
        title: "Group Anagrams",
        slug: "group-anagrams",
        difficulty: "Medium",
        patternHint: "Group words using their 26-letter frequency tuple as the dictionary key in O(N * L).",
      },
      {
        number: 151,
        title: "Reverse Words in a String",
        slug: "reverse-words-in-a-string",
        difficulty: "Medium",
        patternHint: "Split by whitespace, reverse the word list, and join with a single space.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Highlight the two secrets that separate beginners from pros when handling Strings in interviews: 1) understanding string immutability (why `''.join()` beats `+=` in loops), and 2) the `ord(c) - ord('a')` trick to map lowercase letters into a 26-element array.",
      keyTakeaways: [
        "In Python, Java, and JavaScript, Strings are immutable: mutating a character allocates a new string.",
        "The expression `ord(ch) - ord('a')` converts any lowercase letter `'a'-'z'` into an array index `0..25` in O(1).",
        "Crucial distinction: a 'Substring' is contiguous (no gaps); a 'Subsequence' can skip characters while keeping relative order.",
      ],
      stepByStepWalkthrough: [
        "Check the character set in Constraints (lowercase `'a'-'z'`, alphanumeric, or full ASCII).",
        "If you need in-place character swaps, convert to `chars = list(s)` first and `''.join(chars)` at the end.",
        "Use a 26-slot integer array to compare anagram or window signatures.",
      ],
      interviewTraps: [
        "Confusing Substring (contiguous -> Sliding Window) with Subsequence (non-contiguous -> Two Pointers or Dynamic Programming).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Strings: Read-Only Arrays with an Immutability Secret",
          visualCue: "Animation of a locked string vs a mutable list of characters joined at the end.",
          narration:
            "Although a String looks just like an Array of characters, it hides a critical difference: it is immutable. Understanding what that means in memory will save you from quadratic performance bugs.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "The 26-Bucket Trick (`ord(c) - ord('a')`)",
          visualCue: "A 26-slot array incrementing counters as letters of 'anagram' stream in.",
          narration:
            "Whenever a problem uses lowercase English letters, you do not need a heavy Hash Map. Subtracting the ASCII code of 'a' gives you a direct O(1) index from 0 to 25.",
        },
      ],
    },
  },
  {
    id: "two-pointers",
    order: 6,
    title: "Two Pointers (Converging & Same-Direction)",
    shortTitle: "Two Pointers",
    englishTerm: "Two Pointers",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["arrays", "strings"],
    summary:
      "Using two coordinated indices across a sequence—either converging inward from opposite ends (`left` and `right`) or marching forward together (`write` and `read`)—to collapse O(N^2) pair searches into a single O(N) pass with O(1) space.",
    analogy:
      "Two shoppers looking for two items that add up to an exact gift card balance on a shelf sorted by price: one starts at the cheapest item on the left, the other at the most expensive item on the right. If the total is too high, the right shopper steps left; if too low, the left shopper steps right.",
    whenToUse: [
      "The input array is SORTED (or can be sorted) and you need pairs or triplets matching a target sum or constraint (`Two Sum II`, `3Sum`).",
      "Checking palindromes or symmetry by comparing characters from both ends toward the center.",
      "Compacting, filtering, or deduplicating an array in-place in O(1) extra space using a `read` pointer and a `write` pointer.",
    ],
    whenNotToUse: [
      "Finding pair sums in an UNSORTED array where you must return the original indices (sorting destroys original indices; use a Hash Map instead).",
    ],
    timeComplexity: {
      average: "O(N) (or O(N log N) if sorting first)",
      worst: "O(N)",
      note: "Every iteration advances at least one pointer toward the other, guaranteeing at most N steps.",
    },
    spaceComplexity: "O(1) auxiliary space",
    constraintHint: "N <= 10^5 with sorted input or O(1) in-place array compaction",
    pythonTemplate: `def two_pointers_converging(nums: list[int], target: int) -> list[int]:
    """
    Mode 1: Converging pointers on a SORTED array.
    Time: O(N) | Space: O(1)
    """
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1   # Need a larger sum
        else:
            right -= 1  # Need a smaller sum
    return []


def remove_duplicates_inplace(nums: list[int]) -> int:
    """
    Mode 2: Same-direction pointers (Write / Read).
    """
    if not nums:
        return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write`,
    typescriptTemplate: `export function twoPointersConverging(nums: number[], target: number): number[] {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
    leetcodeProblems: [
      {
        number: 167,
        title: "Two Sum II - Input Array Is Sorted",
        slug: "two-sum-ii-input-array-is-sorted",
        difficulty: "Medium",
        patternHint: "Place `left` at 0 and `right` at `n-1`, exploiting the sorted order to eliminate a row or column at each step.",
      },
      {
        number: 15,
        title: "3Sum",
        slug: "3sum",
        difficulty: "Medium",
        patternHint: "Sort the array, fix `i`, and run converging Two Pointers on `i+1 .. n-1` while skipping duplicates.",
      },
      {
        number: 11,
        title: "Container With Most Water",
        slug: "container-with-most-water",
        difficulty: "Medium",
        patternHint: "Always move the pointer with the shorter wall, since it bottlenecks the water height.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain the two core flavors of Two Pointers: 1) Converging pointers (`left` and `right` moving inward) and 2) Same-direction pointers (`write` and `read` for in-place filtering). Show why discarding one boundary never misses the optimal pair when the array is sorted.",
      keyTakeaways: [
        "Two Pointers turns O(N^2) pair scans into O(N) linear passes with O(1) extra space.",
        "On sorted arrays, every comparison eliminates an entire row or column of candidate pairs at once.",
        "For `3Sum`, fixing the first element in an outer loop reduces the remaining problem to `Two Sum II` in O(N^2).",
      ],
      stepByStepWalkthrough: [
        "Decide whether pointers start at `(0, n-1)` (converging) or `(0, 0)` (same direction).",
        "Define the monotonic rule that determines which pointer advances on each iteration.",
        "Ensure every iteration of `while left < right` moves at least one pointer.",
      ],
      interviewTraps: [
        "In `3Sum`, forgetting to skip duplicate values (`while left < right and nums[left] == nums[left-1]: left += 1`), producing duplicate triplets.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "From O(N^2) to O(N) with Two Coordinated Indices",
          visualCue: "Two arrows (L and R) at opposite ends of a sorted array converging toward the target sum.",
          narration:
            "If an array is sorted, checking all pairs with a nested loop throws away valuable information. With Two Pointers at opposite ends, every mismatch tells us with mathematical certainty which boundary we can discard forever.",
        },
        {
          timestamp: "01:30 - 04:30",
          sectionTitle: "Converging Pointers vs Read/Write Pointers",
          visualCue: "Split screen showing Container With Most Water on top and Remove Duplicates in-place on bottom.",
          narration:
            "Not all Two Pointers start at opposite ends. When asked to compact an array in-place without allocating a new array, the Read pointer scouts ahead while the Write pointer overwrites only valid elements.",
        },
      ],
    },
  },
  {
    id: "sliding-window",
    order: 7,
    title: "Sliding Window (Fixed & Dynamic)",
    shortTitle: "Sliding Window",
    englishTerm: "Sliding Window (Fixed & Dynamic)",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["arrays", "strings", "two-pointers"],
    summary:
      "Maintaining a contiguous subsegment `[left..right]` that glides across an array or string like a caterpillar: expanding on the right (`right++`) and shrinking from the left (`left++`) whenever the window constraint is violated, achieving O(N) time.",
    analogy:
      "A caterpillar crawling along a branch: it stretches its head forward (`right`) to include new leaves while the window is valid, and whenever it exceeds its limit, it pulls its tail forward (`left`) until the rule is restored—without ever recounting the leaves in the middle.",
    whenToUse: [
      "The problem asks for the longest, shortest, or optimal CONTIGUOUS subarray or substring satisfying a condition.",
      "Fixed-size window `K`: 'Find the maximum sum or average of any contiguous subarray of length K'.",
      "Dynamic-size window: 'Longest substring without repeating characters' or 'Smallest subarray with sum >= S'.",
    ],
    whenNotToUse: [
      "WARNING: If the array contains NEGATIVE numbers and the condition depends on subarray sum, adding elements to the right can decrease the sum, breaking monotonicity! For negative numbers, use `Prefix Sum + Hash Map`.",
    ],
    timeComplexity: {
      average: "O(N)",
      worst: "O(N)",
      note: "Even though there is a `while` loop inside a `for` loop, `left` and `right` each move forward at most N times (at most 2N total operations).",
    },
    spaceComplexity: "O(1) or O(K) for the window frequency counter",
    constraintHint: "Optimal contiguous subarray/substring with N <= 10^5 (and non-negative values for sum windows)",
    pythonTemplate: `def sliding_window_dynamic(s: str) -> int:
    """
    Universal 3-Step Dynamic Sliding Window Template
    (e.g., Longest Substring Without Repeating Characters).
    Time: O(N) | Space: O(alphabet)
    """
    window_counts: dict[str, int] = {}
    left = 0
    max_len = 0

    for right, ch in enumerate(s):
        # 1. EXPAND window by including s[right]
        window_counts[ch] = window_counts.get(ch, 0) + 1

        # 2. SHRINK from 'left' while window violates the invariant
        while window_counts[ch] > 1:
            left_ch = s[left]
            window_counts[left_ch] -= 1
            left += 1

        # 3. UPDATE best answer on valid window [left..right]
        max_len = max(max_len, right - left + 1)

    return max_len`,
    typescriptTemplate: `export function slidingWindowDynamic(s: string): number {
  const counts = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    counts.set(ch, (counts.get(ch) ?? 0) + 1);

    // Shrink while window invariant is broken
    while ((counts.get(ch) ?? 0) > 1) {
      const leftCh = s[left];
      counts.set(leftCh, (counts.get(leftCh) ?? 1) - 1);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    leetcodeProblems: [
      {
        number: 3,
        title: "Longest Substring Without Repeating Characters",
        slug: "longest-substring-without-repeating-characters",
        difficulty: "Medium",
        patternHint: "Expand `right` and shrink `left` whenever the newly added character's count exceeds 1.",
      },
      {
        number: 209,
        title: "Minimum Size Subarray Sum",
        slug: "minimum-size-subarray-sum",
        difficulty: "Medium",
        patternHint: "For a MINIMUM window, update the answer INSIDE the `while` loop while the sum is valid and shrink `left`.",
      },
      {
        number: 424,
        title: "Longest Repeating Character Replacement",
        slug: "longest-repeating-character-replacement",
        difficulty: "Medium",
        patternHint: "Window `[left..right]` is valid as long as `(right - left + 1) - max_freq <= k`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Teach the 'Universal 3-Step Sliding Window Template' (1. Expand with `right`, 2. Shrink with `while` from `left`, 3. Update answer). Explain the difference between finding the LONGEST valid window (update outside the `while`) vs the SHORTEST valid window (update inside the `while`), and why a `while` inside a `for` is still O(N) amortized.",
      keyTakeaways: [
        "Trigger keywords: 'contiguous subarray' or 'substring' + 'longest / shortest / maximum sum'.",
        "Amortized O(N) complexity: each element enters the window once via `right` and leaves at most once via `left`.",
        "For longest window: shrink while INVALID, then record length. For shortest window: record length and shrink while VALID.",
      ],
      stepByStepWalkthrough: [
        "Initialize `left = 0`, the window state (running sum or frequency map), and the best answer.",
        "Iterate `right` from `0` to `N-1`, adding `nums[right]` into the window state.",
        "Use a `while` loop to advance `left` and remove `nums[left]` whenever the window needs adjustment.",
        "Compute the window size using `right - left + 1`.",
      ],
      interviewTraps: [
        "Using sum-based Sliding Window when the array contains negative numbers (e.g., LeetCode 560 Subarray Sum Equals K). With negatives, use Prefix Sum + Hash Map.",
        "Off-by-one error on window length: the number of elements from `left` to `right` inclusive is `right - left + 1`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "The Caterpillar Mental Model: Stop Recomputing Sums",
          visualCue: "Glowing frame sliding across an array: adding the right element and subtracting the left element.",
          narration:
            "If you just summed five elements and slide your window one step right, why re-add the four elements in the middle? Just add the new element entering on the right and subtract the old one leaving on the left. That is Sliding Window.",
        },
        {
          timestamp: "01:30 - 04:30",
          sectionTitle: "The 10-Line Universal Dynamic Window Template",
          visualCue: "Code highlighted in 3 blocks: Expand, Shrink, and Update.",
          narration:
            "Ninety-five percent of dynamic sliding window problems fall to the exact same ten-line template: a `for` loop advancing `right`, and an inner `while` loop advancing `left` whenever our rule is broken.",
        },
      ],
    },
  },

  // ============================================================================
  // LEVEL 2: PREPROCESSING, HASHING, SORTING & SEARCH (08 - 14)
  // ============================================================================
  {
    id: "prefix-sum",
    order: 8,
    title: "Prefix Sums (1D, 2D & Subarray Sum = K)",
    shortTitle: "Prefix Sums",
    englishTerm: "Prefix Sums",
    kind: "algorithm",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays"],
    summary:
      "Precomputing cumulative sums from the start of an array in O(N) so that any range sum query `[L, R]` can be answered in instant O(1) time via simple subtraction: `prefix[R + 1] - prefix[L]`.",
    analogy:
      "A car's odometer on a highway trip: if the odometer read 10,200 km at Town A and 10,350 km at Town B, you know instantly that the distance between A and B is `10,350 - 10,200 = 150 km` without re-measuring every kilometer in between.",
    whenToUse: [
      "Answering multiple range sum or range XOR queries `[L, R]` on a static array in O(1) per query.",
      "Counting or finding subarrays that sum to `K` when **negative numbers ARE present** (combining `Prefix Sum + Hash Map`).",
      "Computing the sum of any 2D rectangular submatrix in O(1) using 2D inclusion-exclusion.",
    ],
    whenNotToUse: [
      "If the array values are frequently mutated between range queries (`update(i, val)` + `rangeSum(L, R)`): updating a Prefix Sum takes O(N). Use a Fenwick Tree or Segment Tree instead.",
    ],
    timeComplexity: {
      average: "Build: O(N) | Range Query `[L, R]`: O(1)",
      worst: "O(N) total",
      note: "Padding with a leading zero (`prefix = [0] * (n + 1)`) eliminates all `if L == 0` boundary checks.",
    },
    spaceComplexity: "O(N) for the prefix array or hash map",
    constraintHint: "Q <= 10^5 range sum queries or Subarray Sum = K with negative numbers",
    pythonTemplate: `class RangeSumQuery:
    """
    1D Prefix Sum padded with a leading 0 at index 0.
    pref[i] stores the sum of the first i elements: nums[0..i-1].
    """
    def __init__(self, nums: list[int]):
        self.pref = [0] * (len(nums) + 1)
        for i, x in enumerate(nums):
            self.pref[i + 1] = self.pref[i] + x

    def query(self, left: int, right: int) -> int:
        # Sum of nums[left..right] inclusive in O(1)
        return self.pref[right + 1] - self.pref[left]


def subarray_sum_equals_k(nums: list[int], k: int) -> int:
    """
    Star Pattern: Prefix Sum + Hash Map (works with NEGATIVE numbers!).
    If curr_sum - prev_sum == k, then prev_sum == curr_sum - k.
    """
    seen_prefixes = {0: 1}  # Base prefix of sum 0 occurs once
    curr_sum = 0
    count = 0
    for x in nums:
        curr_sum += x
        count += seen_prefixes.get(curr_sum - k, 0)
        seen_prefixes[curr_sum] = seen_prefixes.get(curr_sum, 0) + 1
    return count`,
    typescriptTemplate: `export function subarraySumEqualsK(nums: number[], k: number): number {
  const seenPrefixes = new Map<number, number>([[0, 1]]);
  let currSum = 0;
  let count = 0;

  for (const x of nums) {
    currSum += x;
    count += seenPrefixes.get(currSum - k) ?? 0;
    seenPrefixes.set(currSum, (seenPrefixes.get(currSum) ?? 0) + 1);
  }
  return count;
}`,
    leetcodeProblems: [
      {
        number: 303,
        title: "Range Sum Query - Immutable",
        slug: "range-sum-query-immutable",
        difficulty: "Easy",
        patternHint: "Build a `pref` array of size `N + 1` with `pref[0] = 0`.",
      },
      {
        number: 560,
        title: "Subarray Sum Equals K",
        slug: "subarray-sum-equals-k",
        difficulty: "Medium",
        patternHint: "Store how many times each `curr_sum` has appeared in a Hash Map and look up `curr_sum - k`.",
      },
      {
        number: 304,
        title: "Range Sum Query 2D - Immutable",
        slug: "range-sum-query-2d-immutable",
        difficulty: "Medium",
        patternHint: "2D inclusion-exclusion: `pref[r2][c2] - top - left + top_left_corner`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "First explain the odometer intuition for 1D Prefix Sums with the leading-zero sentinel trick (`N + 1` length). Then dedicate the core of the episode to the interview favorite: 'Prefix Sum + Hash Map' (LeetCode 560), showing why it succeeds with negative numbers where Sliding Window fails.",
      keyTakeaways: [
        "With a leading zero sentinel (`pref = [0] * (n + 1)`), the sum of `nums[L..R]` is always `pref[R + 1] - pref[L]` with zero edge cases.",
        "Any subarray sum `nums[i..j]` is the difference between two prefix sums: `pref[j + 1] - pref[i]`.",
        "Combining Prefix Sum with a Hash Map turns 'find a subarray summing to K' into `Two Sum` on prefix sums.",
      ],
      stepByStepWalkthrough: [
        "Allocate `pref` of length `N + 1` initialized to 0.",
        "For any range `[L, R]`, return `pref[R + 1] - pref[L]` in O(1).",
        "When counting subarrays with sum `K`, maintain a frequency map `{prefix_sum: count}` initialized with `{0: 1}`.",
      ],
      interviewTraps: [
        "Forgetting to initialize `seen_prefixes = {0: 1}` in `Subarray Sum Equals K`, which misses every valid subarray that starts at index 0.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "The Odometer Analogy and the Leading Zero Sentinel",
          visualCue: "Original array on top and `N+1` prefix array below highlighting subtraction of two cells.",
          narration:
            "If someone asks you ten thousand times for the sum between index L and R, looping from L to R every time is way too slow. With Prefix Sums, we do one O(N) pass up front and answer every future query with a single O(1) subtraction.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Prefix Sum + Hash Map: Conquering Negative Numbers",
          visualCue: "Line graph rising and falling with negative numbers, highlighting two points separated vertically by K.",
          narration:
            "When negative numbers appear, Sliding Window loses its monotonic compass. By storing every running prefix sum in a Hash Map, asking if a subarray sums to K becomes asking: have I already seen a prefix sum equal to `current_sum - K`?",
        },
      ],
    },
  },
  {
    id: "hash-table",
    order: 9,
    title: "Hash Tables (Hash Map & Hash Set)",
    shortTitle: "Hash Table",
    englishTerm: "Hash Table / Hash Map & Set",
    kind: "hybrid",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "strings"],
    summary:
      "The #1 tool for accelerating algorithms: uses a hash function to map any immutable key to a bucket index, providing O(1) average-time insertion, deletion, and lookup.",
    analogy:
      "A coat check room with a mathematical formula: instead of scanning every coat hook from 1 to 10,000 (O(N)), the formula computes your exact hook number directly from your name in one step (O(1)).",
    whenToUse: [
      "You need O(1) membership checks to see if an element has appeared before (`Hash Set` for duplicates).",
      "You need key-value associations: frequency counting, remembering the index where a value was seen (`Two Sum`), or grouping items by a shared signature.",
      "You want to replace an inner O(N) linear search loop with an instant O(1) lookup (trading O(N) space for O(N) time).",
    ],
    whenNotToUse: [
      "You need sorted order or nearest-neighbor queries like 'find the smallest element >= X' (Hash Tables are unordered; use Binary Search or an Ordered Set / BST instead).",
    ],
    timeComplexity: {
      average: "Insert / Lookup / Delete: O(1)",
      worst: "O(N) under adversarial hash collisions",
      note: "Modern implementations (`dict` in Python, `Map` in JS) resize automatically to keep load factor low.",
    },
    spaceComplexity: "O(N) to store up to N unique keys",
    constraintHint: "Eliminates inner linear search loops when N <= 10^5",
    pythonTemplate: `def two_sum_hash(nums: list[int], target: int) -> list[int]:
    """
    Classic Pattern: Store {value_seen: index} in a single pass.
    Time: O(N) | Space: O(N)
    """
    seen: dict[int, int] = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []


def longest_consecutive(nums: list[int]) -> int:
    """
    Sequence-Start Pattern with Hash Set in O(N).
    """
    num_set = set(nums)
    best = 0
    for x in num_set:
        # Only start counting if 'x' is the very START of a streak
        if (x - 1) not in num_set:
            length = 1
            while (x + length) in num_set:
                length += 1
            best = max(best, length)
    return best`,
    typescriptTemplate: `export function twoSumHash(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
    leetcodeProblems: [
      {
        number: 1,
        title: "Two Sum",
        slug: "two-sum",
        difficulty: "Easy",
        patternHint: "Check if `target - x` is already in the map before inserting `x`.",
      },
      {
        number: 128,
        title: "Longest Consecutive Sequence",
        slug: "longest-consecutive-sequence",
        difficulty: "Medium",
        patternHint: "Insert all numbers into a `set` and only expand streaks from numbers `x` where `x - 1` is NOT in the set.",
      },
      {
        number: 217,
        title: "Contains Duplicate",
        slug: "contains-duplicate",
        difficulty: "Easy",
        patternHint: "Instant O(N) duplicate detection with a `set`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how a Hash Table works under the hood (hash function -> modulo capacity -> collision handling) and then walk through the 3 high-yield interview patterns: 1) Complement lookup (`Two Sum`), 2) Frequency counter, and 3) Streak-start detection in O(N) (`Longest Consecutive Sequence`).",
      keyTakeaways: [
        "Classic interview truth: whenever you have an O(N^2) nested search, ask 'Can a Hash Map make the inner lookup O(1)?'",
        "In Python, `dict` keys and `set` elements must be immutable (`int`, `str`, `tuple`), never `list`.",
        "In `Longest Consecutive Sequence`, checking `if (x - 1) not in num_set` prevents redundant work and guarantees O(N).",
      ],
      stepByStepWalkthrough: [
        "Ask: what information from previous elements do I wish I could look up in O(1) while standing at index `i`?",
        "Define the `Key` (what you search by) and the `Value` (index, frequency, or grouped list).",
        "Scan the input updating and querying the hash table in O(1).",
      ],
      interviewTraps: [
        "Trying to use a mutable `list` as a dictionary key in Python (`TypeError: unhashable type: 'list'`). Convert it to `tuple` first.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "How a Hash Table Works Under the Hood",
          visualCue: "Animation of a key passing through `hash(key) % buckets` into an array slot.",
          narration:
            "A Hash Table combines the flexibility of searching by any key with the instant O(1) speed of an Array. How? By running your key through a deterministic hash function that maps it to a bucket index.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "The 3 Master Patterns: Complement, Frequency, and Sequence Start",
          visualCue: "Three visual cards: O(1) Complement, Frequency Map, and Streak Sentinel.",
          narration:
            "In interviews, you will use hash tables for three signature plays: remembering the index of a complement, counting frequencies, and detecting the exact start of consecutive sequences in linear time.",
        },
      ],
    },
  },
  {
    id: "counting",
    order: 10,
    title: "Counting & Bucket Sort",
    shortTitle: "Counting / Buckets",
    englishTerm: "Counting Sort & Bucket Sort",
    kind: "algorithm",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "hash-table"],
    summary:
      "Breaking the O(N log N) comparison-sort barrier: when values or frequencies fall within a bounded range `[0..K]`, we can group them into buckets and sort in linear O(N + K) time.",
    analogy:
      "Sorting 500 coins of denominations 1, 5, 10, and 25 cents. Instead of comparing coins two by two (QuickSort/MergeSort), you place 4 labeled boxes on the table, drop each coin into its box in one pass, and collect the boxes in order.",
    whenToUse: [
      "The range of possible values `K` is small or proportional to `N` (e.g., ages `0..120`, colors `0, 1, 2`, scores `0..100`).",
      "Sorting elements by their **FREQUENCY of occurrence**: since no element in an array of length `N` can appear more than `N` times, you can allocate `N + 1` buckets indexed by frequency (`Top K Frequent Elements` in O(N)).",
    ],
    whenNotToUse: [
      "When values span an huge arbitrary range (e.g., integers up to `10^9`), since allocating `10^9` buckets would exhaust memory.",
    ],
    timeComplexity: {
      average: "O(N + K) where K is the bucket range",
      worst: "O(N + K)",
      note: "Beats O(N log N) whenever K = O(N).",
    },
    spaceComplexity: "O(N + K) for the bucket array",
    constraintHint: "Bounded value range K <= 10^5 or sorting by frequency (max frequency <= N)",
    pythonTemplate: `def top_k_frequent_buckets(nums: list[int], k: int) -> list[int]:
    """
    Bucket Sort by Frequency (LeetCode 347) in pure O(N) time without a Heap.
    Since no number can appear more than N times, we create N + 1 buckets.
    """
    freq_map: dict[int, int] = {}
    for x in nums:
        freq_map[x] = freq_map.get(x, 0) + 1

    # buckets[f] stores all numbers that appeared exactly 'f' times
    buckets: list[list[int]] = [[] for _ in range(len(nums) + 1)]
    for num, freq in freq_map.items():
        buckets[freq].append(num)

    result: list[int] = []
    for freq in range(len(nums), 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result`,
    typescriptTemplate: `export function topKFrequentBuckets(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const x of nums) {
    freqMap.set(x, (freqMap.get(x) ?? 0) + 1);
  }

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of freqMap.entries()) {
    buckets[freq].push(num);
  }

  const res: number[] = [];
  for (let f = nums.length; f >= 1; f--) {
    for (const num of buckets[f]) {
      res.push(num);
      if (res.length === k) return res;
    }
  }
  return res;
}`,
    leetcodeProblems: [
      {
        number: 347,
        title: "Top K Frequent Elements",
        slug: "top-k-frequent-elements",
        difficulty: "Medium",
        patternHint: "Use `buckets[frequency]` of size `N + 1` to achieve O(N) time instead of O(N log K) with a Heap.",
      },
      {
        number: 451,
        title: "Sort Characters By Frequency",
        slug: "sort-characters-by-frequency",
        difficulty: "Medium",
        patternHint: "Count frequencies and rebuild the string by scanning buckets from `N` down to `1`.",
      },
      {
        number: 274,
        title: "H-Index",
        slug: "h-index",
        difficulty: "Medium",
        patternHint: "Cap citations larger than `N` into bucket `N` and accumulate from right to left in O(N).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how we can sort in O(N) time without violating computer science laws (by avoiding pairwise comparisons and indexing directly into buckets). Highlight the 'Bucket Sort by Frequency' pattern for Top K Frequent Elements.",
      keyTakeaways: [
        "Every comparison-based sort (`<`, `>`) requires at least O(N log N), but Counting/Bucket Sort indexes directly without comparing.",
        "Even if input numbers are huge (`-10^9` to `10^9`), their FREQUENCIES are bounded between `1` and `N`, enabling O(N) Bucket Sort by frequency.",
      ],
      stepByStepWalkthrough: [
        "Identify the bounded quantity (either the element value itself or its frequency count).",
        "Allocate a `buckets` list indexed by that bounded value.",
        "Scan the buckets in ascending or descending order to collect the sorted output in O(N).",
      ],
      interviewTraps: [
        "Initializing buckets in Python with `buckets = [[]] * (n + 1)`—which creates `n + 1` references to the SAME list object. Always use `[[] for _ in range(n + 1)]`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Breaking the O(N log N) Speed Limit",
          visualCue: "Comparison decision tree O(N log N) vs direct drop into numbered buckets O(N).",
          narration:
            "In CS 101 we learn that sorting takes N log N. But that lower bound only applies when sorting via pairwise comparisons. When your keys or frequencies fall in a bounded range, you can use the numbers themselves as array indices.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "Bucket Sort by Frequency (Top-K in Pure O(N))",
          visualCue: "Bucket array from 0 to N where each index holds numbers appearing that many times.",
          narration:
            "Even when input integers are arbitrarily large, how many times can any number appear in an array of length N? At most N times. That lets us sort by frequency in 100% linear time.",
        },
      ],
    },
  },
  {
    id: "sorting-intervals",
    order: 11,
    title: "Sorting + Interval Scan (Merge Intervals)",
    shortTitle: "Sorting + Intervals",
    englishTerm: "Sorting & Merge Intervals",
    kind: "algorithm",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "basic-dsa"],
    summary:
      "Sorting segments `[start, end]` by start time so that any overlapping intervals become adjacent, allowing us to merge overlaps, insert intervals, or detect free gaps in a single linear sweep.",
    analogy:
      "Organizing your daily meeting calendar: if sticky notes with meeting times are scattered across your desk, spotting conflicts is hard. Once you line them up chronologically from 8:00 AM to 6:00 PM, you only need to compare each meeting against the one immediately before it.",
    whenToUse: [
      "The input is a list of intervals `[start, end]`, meeting times, reservations, or 1D line segments.",
      "You need to merge overlapping intervals (`Merge Intervals`), insert a new interval, or find free time gaps.",
    ],
    whenNotToUse: [
      "If asked for the MAXIMUM number of non-overlapping intervals (`Non-overlapping Intervals` / Interval Scheduling), sort by **END time (`x[1]`)** rather than start time.",
    ],
    timeComplexity: {
      average: "O(N log N) dominated by the initial sort",
      worst: "O(N log N)",
      note: "The linear merge sweep after sorting takes only O(N).",
    },
    spaceComplexity: "O(N) to store the merged output list",
    constraintHint: "List of [start, end] pairs with N <= 10^5",
    pythonTemplate: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """
    Canonical Merge Intervals Pattern:
    1. Sort by start time: key=lambda x: x[0]
    2. Overlap condition: curr_start <= prev_end
    Time: O(N log N) | Space: O(N)
    """
    if not intervals:
        return []

    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        prev_end = merged[-1][1]
        if start <= prev_end:
            # Overlap: extend the end using max() in case one interval wraps the other
            merged[-1][1] = max(prev_end, end)
        else:
            merged.append([start, end])

    return merged`,
    typescriptTemplate: `export function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [[...intervals[0]]];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}`,
    leetcodeProblems: [
      {
        number: 56,
        title: "Merge Intervals",
        slug: "merge-intervals",
        difficulty: "Medium",
        patternHint: "Sort by `start` and merge whenever `curr.start <= merged[-1].end` using `max(prev_end, curr_end)`.",
      },
      {
        number: 57,
        title: "Insert Interval",
        slug: "insert-interval",
        difficulty: "Medium",
        patternHint: "Split into 3 phases: intervals ending before `new`, intervals overlapping `new`, and intervals starting after `new`.",
      },
      {
        number: 435,
        title: "Non-overlapping Intervals",
        slug: "non-overlapping-intervals",
        difficulty: "Medium",
        patternHint: "Sort by `end` time (or on collision keep the interval that finishes earliest).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Visually walk through the 3 relative positions of two intervals sorted by start time: 1) Disjoint (`curr.start > prev.end`), 2) Partial overlap, and 3) Complete containment (`[1, 10]` and `[2, 5]`), explaining why `max(prev.end, curr.end)` is mandatory.",
      keyTakeaways: [
        "Sorting by `start` guarantees that overlapping intervals sit next to each other.",
        "Once sorted by start, the universal overlap check is simply `curr.start <= prev.end`.",
        "Always update the merged end as `max(prev.end, curr.end)` because the earlier interval might completely contain the later one.",
      ],
      stepByStepWalkthrough: [
        "Sort intervals in ascending order by their start coordinate `x[0]`.",
        "Initialize `merged = [intervals[0]]`.",
        "For each subsequent interval, compare `start` against `merged[-1][1]`.",
        "If `start <= merged[-1][1]`, update `merged[-1][1] = max(merged[-1][1], end)`; otherwise append `[start, end]`.",
      ],
      interviewTraps: [
        "Writing `merged[-1][1] = end` instead of `max(merged[-1][1], end)`, which breaks when `[1, 10]` is followed by `[2, 3]`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Taming Interval Chaos with a Single Sort",
          visualCue: "Scattered horizontal bars aligning left-to-right after sorting by start time.",
          narration:
            "Comparing every interval against every other interval takes O(N^2). But the moment we sort them by start time, any overlap can only happen with the immediately preceding merged interval.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "The `start <= prev_end` Check and the Containment Trap",
          visualCue: "Interval [1, 10] swallowing interval [2, 5] while keeping the right endpoint at 10.",
          narration:
            "The most common bug in interval interviews is overwriting the end blindly. What if the first interval runs from 1 to 10 and the second runs from 2 to 5? Always take the maximum of both endpoints.",
        },
      ],
    },
  },
  {
    id: "partitioning",
    order: 12,
    title: "Partitioning (QuickSelect & Dutch National Flag)",
    shortTitle: "Partitioning",
    englishTerm: "Partitioning, QuickSelect & 3-Way Partition",
    kind: "algorithm",
    level: 2,
    difficulty: "Intermediate",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "two-pointers"],
    summary:
      "Rearranging an array in-place around a pivot in O(N) time to separate elements that are smaller, equal, and larger—without paying the full O(N log N) cost of sorting everything.",
    analogy:
      "Finding the median-height player in a gym class by picking a volunteer pivot: everyone shorter steps left, everyone taller steps right. If 20 people are on the left and you want the 10th shortest overall, you never even need to sort the right half.",
    whenToUse: [
      "Finding the **K-th largest or smallest element** (or median) in **O(N) average time** (`QuickSelect`).",
      "Grouping an array into **3 distinct categories in-place** in a single pass (`Dutch National Flag` / `Sort Colors` with `low`, `mid`, `high` pointers).",
      "Segregating zeroes, evens/odds, or positives/negatives in-place in O(1) space.",
    ],
    whenNotToUse: [
      "If you need the entire array sorted or need to answer many different K queries on the same static array (sort once in O(N log N) instead).",
    ],
    timeComplexity: {
      average: "O(N) (QuickSelect geometric series: N + N/2 + N/4 + ... = 2N)",
      worst: "O(N^2) in QuickSelect if bad pivots are chosen (use random pivot + 3-way partition)",
      note: "Dijkstra's Dutch National Flag is strictly O(N) in a single pass.",
    },
    spaceComplexity: "O(1) in-place",
    constraintHint: "K-th Largest in O(N) average time or 3-way in-place classification in O(1) space",
    pythonTemplate: `def sort_colors_dutch_flag(nums: list[int]) -> None:
    """
    Dijkstra's Dutch National Flag Algorithm (3-Way In-Place Partition).
    Groups 0s (left), 1s (middle), and 2s (right) in a single O(N) pass.
    Invariant:
      nums[0..low-1] == 0
      nums[low..mid-1] == 1
      nums[high+1..n-1] == 2
    """
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1  # NOTE: Do NOT increment mid yet; the swapped value from 'high' is uninspected`,
    typescriptTemplate: `export function sortColorsDutchFlag(nums: number[]): void {
  let low = 0,
    mid = 0,
    high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--; // Do not increment mid until the newly swapped element is inspected
    }
  }
}`,
    leetcodeProblems: [
      {
        number: 75,
        title: "Sort Colors",
        slug: "sort-colors",
        difficulty: "Medium",
        patternHint: "Use the 3 pointers (`low`, `mid`, `high`) of Dijkstra's Dutch National Flag algorithm.",
      },
      {
        number: 215,
        title: "Kth Largest Element in an Array",
        slug: "kth-largest-element-in-an-array",
        difficulty: "Medium",
        patternHint: "QuickSelect with 3-way partitioning (`< pivot`, `== pivot`, `> pivot`) achieves O(N) average time.",
      },
      {
        number: 283,
        title: "Move Zeroes",
        slug: "move-zeroes",
        difficulty: "Easy",
        patternHint: "2-way stable partition: swap non-zero elements forward into the `low` pointer.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explain how Partitioning powers both QuickSort and QuickSelect (finding the K-th element in O(N) because we only recurse on one side: `N + N/2 + N/4 = 2N`). Then explain Dijkstra's 3-pointer Dutch National Flag invariant and why `mid` does NOT advance when swapping with `high`.",
      keyTakeaways: [
        "QuickSelect finds the K-th largest element in O(N) average time because it discards half the remaining subarray at each step (`N + N/2 + N/4 ... = 2N`).",
        "3-way partitioning (`< pivot`, `== pivot`, `> pivot`) prevents O(N^2) degradation on arrays with many duplicates.",
        "When swapping `mid` with `high`, the element arriving from `high` has not been inspected yet, so `mid` must stay put for the next check.",
      ],
      stepByStepWalkthrough: [
        "Maintain boundary pointers (`low`, `mid`, `high`) partitioning the array into 4 regions.",
        "Inspect `nums[mid]` while `mid <= high`.",
        "In QuickSelect, compare the target index `k` against the pivot boundaries to recurse into only one partition.",
      ],
      interviewTraps: [
        "Incrementing `mid` after swapping with `high` in `Sort Colors`, which skips inspecting the unknown element brought in from `high`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Why Partial Sorting Beats Full Sorting: QuickSelect",
          visualCue: "QuickSort tree pruning an entire half at every level: N + N/2 + N/4 = 2N.",
          narration:
            "If you only care about who finished in K-th place, why sort the entire stadium? By partitioning around a pivot, you know immediately which side holds index K and discard the other side forever.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Dijkstra's Dutch National Flag (3-Way Partition)",
          visualCue: "Three colored zones (0s, 1s, 2s) and the shrinking unknown zone between `mid` and `high`.",
          narration:
            "When you have three categories or heavy duplicates, Dijkstra's three-pointer partition maintains four zones in the array and shrinks the unknown region until `mid` crosses `high`.",
        },
      ],
    },
  },
  {
    id: "binary-search",
    order: 13,
    title: "Binary Search (Sorted Arrays & Monotonic Search Space)",
    shortTitle: "Binary Search",
    englishTerm: "Binary Search & Monotonic Search Space",
    kind: "algorithm",
    level: 2,
    difficulty: "Intermediate",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "basic-dsa"],
    summary:
      "Repeatedly halving a search space in O(log N) time. Beyond finding a value in a sorted array, Binary Search works on ANY monotonic boolean condition `[False, False, ..., True, True]`—including searching for the optimal answer itself ('Binary Search on Answer').",
    analogy:
      "Finding the lowest floor of a 100-story building from which an egg breaks: you test floor 50 first. If it breaks, floors 51–100 will also break, so you record 50 and search the lower half; if it survives, floors 1–50 are safe and you search the upper half.",
    whenToUse: [
      "The array is sorted (or rotated sorted) and you need to find a target or the first index `>= target` (`lower_bound`).",
      "The problem asks for 'the MINIMUM X such that it is possible to achieve Y' or 'the MAXIMUM X such that Y holds' and `is_feasible(X)` is monotonic (`Binary Search on Answer`).",
      "Constraints are huge (`N >= 10^9` requiring `O(log N)`, or `N <= 10^5` with an `O(N)` feasibility check giving `O(N log(Range))`).",
    ],
    whenNotToUse: [
      "When the condition is not monotonic (knowing the outcome at `mid` gives zero guarantee about which half to discard).",
    ],
    timeComplexity: {
      average: "O(log N) on arrays | O(N log(Max - Min)) on Answer Space",
      worst: "O(log N)",
      note: "For N = 1,000,000,000 (`10^9`), `log2(N)` is only ~30 iterations.",
    },
    spaceComplexity: "O(1) iterative",
    constraintHint: "Sorted array or 'Minimize the Maximum / Maximize the Minimum' with monotonic feasibility",
    pythonTemplate: `def binary_search_first_true(low: int, high: int, is_feasible) -> int:
    """
    Master AlgoMonster Template: Find the FIRST value where is_feasible(mid) is True.
    Domain pattern: [False, False, False, True, True, True]
                                           ^-- We want this first True
    """
    first_true_idx = -1
    while low <= high:
        mid = low + (high - low) // 2
        if is_feasible(mid):
            first_true_idx = mid   # Record valid candidate
            high = mid - 1         # Try to find an even smaller valid value on the left
        else:
            low = mid + 1          # Too small; search the right half
    return first_true_idx`,
    typescriptTemplate: `export function binarySearchFirstTrue(
  low: number,
  high: number,
  isFeasible: (mid: number) => boolean
): number {
  let firstTrueIdx = -1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isFeasible(mid)) {
      firstTrueIdx = mid; // Record valid candidate
      high = mid - 1;     // Search left for an earlier True
    } else {
      low = mid + 1;      // Search right
    }
  }
  return firstTrueIdx;
}`,
    leetcodeProblems: [
      {
        number: 704,
        title: "Binary Search",
        slug: "binary-search",
        difficulty: "Easy",
        patternHint: "Classic binary search on a sorted array.",
      },
      {
        number: 33,
        title: "Search in Rotated Sorted Array",
        slug: "search-in-rotated-sorted-array",
        difficulty: "Medium",
        patternHint: "When splitting at `mid`, at least ONE of the two halves (`[low..mid]` or `[mid..high]`) is guaranteed to be strictly sorted.",
      },
      {
        number: 875,
        title: "Koko Eating Bananas",
        slug: "koko-eating-bananas",
        difficulty: "Medium",
        patternHint: "Binary Search on Answer: search for the minimum eating speed `k` in `[1, max(piles)]` where `hours_needed(k) <= h`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Reframe how the listener thinks about Binary Search: it is NOT just for finding a number in a sorted array—it is for finding the boundary between `False` and `True` in any monotonic boolean function (the `first_true_idx` template). Walk through 'Koko Eating Bananas' to demonstrate Binary Search on the Answer Space.",
      keyTakeaways: [
        "Instead of memorizing 5 fragile `while (l < r)` variants that risk infinite loops, always use the `first_true_idx` template: save `ans = mid` and shrink with `high = mid - 1` or `low = mid + 1`.",
        "Whenever a problem asks for 'the minimum X to accomplish Y' and succeeding at X implies succeeding at X+1, use Binary Search on Answer.",
      ],
      stepByStepWalkthrough: [
        "Identify the search range `[low, high]` (array indices `[0, n-1]` or answer range `[min_possible, max_possible]`).",
        "Write the monotonic predicate `is_feasible(mid) -> bool`.",
        "If `is_feasible(mid)` is `True`, record `ans = mid` and search left (`high = mid - 1`); otherwise search right (`low = mid + 1`).",
      ],
      interviewTraps: [
        "Getting stuck in an infinite loop with `mid = (l + r) // 2` and `l = mid` when `r = l + 1`. Recording `ans = mid` with `low = mid + 1` and `high = mid - 1` strictly shrinks the range on every step.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "The True Essence of Binary Search: The False -> True Boundary",
          visualCue: "Row of red switches (False) followed by green switches (True), spotlighting the first green switch.",
          narration:
            "Forget the idea that Binary Search is only for finding a number inside a sorted array. Its real superpower appears whenever you can ask a Yes/No question where all the 'No' answers sit on the left and all the 'Yes' answers sit on the right.",
        },
        {
          timestamp: "01:45 - 05:00",
          sectionTitle: "Binary Search on the Answer Space (Koko Eating Bananas)",
          visualCue: "Speedometer testing speeds between 1 and Max, verifying in O(N) if Koko finishes within H hours.",
          narration:
            "When a problem asks for the minimum ship capacity or the minimum speed to finish within H hours, we do not binary search the input array—we binary search the range of possible answers directly.",
        },
      ],
    },
  },
  {
    id: "matrices-grids",
    order: 14,
    title: "Matrices & 2D Grids",
    shortTitle: "Matrices / 2D Grids",
    englishTerm: "2D Matrices & Grids",
    kind: "data-structure",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["arrays", "simulation"],
    summary:
      "Two-dimensional arrays `grid[r][c]` of `R` rows by `C` columns that model images, game boards, spreadsheets, and implicit graphs where each cell connects to its 4 or 8 neighbors.",
    analogy:
      "A chessboard or spreadsheet: every cell has a unique `(row, col)` address, and every cell acts like a room with 4 doors (`up, down, left, right`) connecting it to adjacent rooms.",
    whenToUse: [
      "In-place geometric transformations on tables or images (rotate 90 degrees, transpose, zero out rows/columns).",
      "Island counting, shortest paths in mazes, flood fill, or 2D dynamic programming grids.",
    ],
    whenNotToUse: [
      "If the grid dimensions are huge (e.g., `10^6 x 10^6`) but almost all cells are empty (sparse matrix): do not allocate the 2D matrix; store only active coordinates `(r, c)` in a `Hash Set`.",
    ],
    timeComplexity: {
      average: "Full traversal: O(R * C) | Cell access: O(1)",
      worst: "O(R * C)",
      note: "An R x C grid is an implicit graph with V = R * C vertices and up to 4 * R * C edges.",
    },
    spaceComplexity: "O(1) if mutated in-place, or O(R * C) with a visited matrix",
    constraintHint: "R, C <= 1000 (total cells R * C <= 10^6)",
    pythonTemplate: `def rotate_matrix_90_clockwise(matrix: list[list[int]]) -> None:
    """
    1. Classic In-Place 90-Degree Clockwise Matrix Rotation:
       Step A: Transpose across main diagonal (swap matrix[r][c] with matrix[c][r])
       Step B: Reverse each row
    """
    n = len(matrix)
    for r in range(n):
        for c in range(r + 1, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
    for row in matrix:
        row.reverse()


def get_valid_4_neighbors(r: int, c: int, rows: int, cols: int) -> list[tuple[int, int]]:
    """
    2. Clean 4-directional orthogonal neighbor generator within grid bounds.
    """
    neighbors = []
    for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            neighbors.append((nr, nc))
    return neighbors`,
    typescriptTemplate: `export function rotateMatrix90Clockwise(matrix: number[][]): void {
  const n = matrix.length;
  // 1. Transpose across the main diagonal
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }
  // 2. Reverse each row
  for (let r = 0; r < n; r++) {
    matrix[r].reverse();
  }
}`,
    leetcodeProblems: [
      {
        number: 48,
        title: "Rotate Image",
        slug: "rotate-image",
        difficulty: "Medium",
        patternHint: "Rotate 90° clockwise = Transpose matrix + Reverse each row in-place.",
      },
      {
        number: 73,
        title: "Set Matrix Zeroes",
        slug: "set-matrix-zeroes",
        difficulty: "Medium",
        patternHint: "Use the first row and first column as in-place markers to achieve O(1) extra space.",
      },
      {
        number: 74,
        title: "Search a 2D Matrix",
        slug: "search-a-2d-matrix",
        difficulty: "Medium",
        patternHint: "Map a 1D binary search index `idx` to 2D coordinates via `r = idx // cols` and `c = idx % cols`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Present 2D Matrices as the bridge between simple 1D arrays and Graph/DP algorithms. Teach the 3 essential recipes: 1) Flattening 2D <-> 1D with `idx = r * cols + c`, 2) Rotating 90° via Transpose + Row Reverse, and 3) 4-directional neighbor traversal with strict boundary checks `0 <= nr < rows`.",
      keyTakeaways: [
        "Any 2D coordinate `(r, c)` maps to a unique 1D index `id = r * C + c`, and converts back via `r = id // C`, `c = id % C`.",
        "Rotating 90° clockwise never requires complex 4-corner index math: just Transpose (`r, c <-> c, r`) and Reverse each row.",
        "Every 2D grid is an implicit Graph where cells are vertices and `(-1,0), (1,0), (0,-1), (0,1)` are edges.",
      ],
      stepByStepWalkthrough: [
        "Always extract `rows = len(grid)` and `cols = len(grid[0])` at the top of the function.",
        "When transposing in-place, start `c` at `r + 1` so you do not swap elements twice back to their original spots.",
        "Always check `0 <= nr < rows and 0 <= nc < cols` before indexing `grid[nr][nc]`.",
      ],
      interviewTraps: [
        "In Python, negative indices like `grid[-1][0]` do NOT raise `IndexError`—they silently wrap around to the last row of the matrix! Always write `0 <= nr < rows`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "From 1D to 2D: Coordinates, Diagonals, and Flattening",
          visualCue: "Grid highlighting rows, columns, main diagonal (`r - c == const`), and anti-diagonal (`r + c == const`).",
          narration:
            "A 2D matrix is an array of arrays with neat geometric invariants: along any main diagonal `r - c` is constant, and along any anti-diagonal `r + c` is constant.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Python's Negative Index Trap and the Bridge to Graphs",
          visualCue: "Cursor stepping above row 0 to `r = -1` and accidentally reading the bottom row in Python.",
          narration:
            "Watch out in Python: if your row index steps above zero to `-1`, Python will not throw an error—it silently reads the bottom row of your grid and corrupts your traversal. Checking `0 <= nr < rows` is mandatory.",
        },
      ],
    },
  },
];

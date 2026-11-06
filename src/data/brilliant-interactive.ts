import { DSATopic, MicroChallenge, VisualStateStep } from "@/types/dsa";

interface TopicInteractiveBundle {
  visualSteps: VisualStateStep[];
  microChallenge: MicroChallenge;
}

const CUSTOM_INTERACTIVE_BUNDLES: Record<string, TopicInteractiveBundle> = {
  "basic-dsa": {
    visualSteps: [
      {
        stepTitle: "Step 1: Read the input bound N",
        caption: "Suppose a problem states N <= 10^5. A CPU executes ~10^8 simple operations per second.",
        cells: ["N = 10", "N = 5000", "N = 10^5", "N = 10^9"],
        activeIndices: [2],
        pointers: { "Target N": 2 },
        badge: "Constraint Check",
      },
      {
        stepTitle: "Step 2: Eliminate O(N^2)",
        caption: "With N = 10^5, an O(N^2) nested loop executes 10^10 operations (~100 seconds) -> Time Limit Exceeded (TLE).",
        cells: ["O(N!): TLE", "O(N^2): 10^10 TLE", "O(N log N): 1.7*10^6 OK", "O(N): 10^5 OK"],
        activeIndices: [1],
        pointers: { "TLE Wall": 1 },
        badge: "10^10 > 10^8",
      },
      {
        stepTitle: "Step 3: Lock in O(N log N) or O(N)",
        caption: "Before writing a single line of code, you immediately know you need Sorting, Binary Search, Two Pointers, Sliding Window, or a Hash Map.",
        cells: ["O(N!): TLE", "O(N^2): 10^10 TLE", "O(N log N): 1.7*10^6 OK", "O(N): 10^5 OK"],
        activeIndices: [2, 3],
        secondaryIndices: [1],
        pointers: { Optimal: 3 },
        badge: "Passes in < 0.02s",
      },
    ],
    microChallenge: {
      question: "If a problem specifies N <= 200,000 (2 * 10^5), which time complexity is the slowest one that will still comfortably pass within 1 second?",
      options: [
        "O(N^2) — Nested loops over all pairs",
        "O(N log N) — Sorting, Heap, or Binary Search per element",
        "O(2^N) — Recursive subset enumeration",
      ],
      correctIndex: 1,
      explanation: "At N = 2*10^5, O(N^2) requires 4*10^10 operations (TLE). O(N log N) takes roughly 2*10^5 * 18 ≈ 3.6*10^6 operations, well below the 10^8/sec limit.",
    },
  },
  "two-pointers": {
    visualSteps: [
      {
        stepTitle: "Step 1: Place pointers at opposite ends",
        caption: "Target sum = 13 on sorted array. Start with left = 0 (2) and right = 4 (11). Current sum = 2 + 11 = 13.",
        cells: ["2", "4", "6", "9", "11"],
        activeIndices: [0, 4],
        pointers: { L: 0, R: 4 },
        badge: "sum = 2 + 11 = 13",
      },
      {
        stepTitle: "Step 2: What if Target = 10?",
        caption: "At L=0 (2) and R=4 (11), sum = 13 > 10. Since the array is sorted, any pair with 11 and an element >= 2 will be >= 13. Discard 11 by moving R left!",
        cells: ["2", "4", "6", "9", "11"],
        activeIndices: [0, 3],
        secondaryIndices: [4],
        pointers: { L: 0, R: 3 },
        badge: "13 > 10 -> R--",
      },
      {
        stepTitle: "Step 3: Too small? Move L right",
        caption: "Now L=0 (2) and R=2 (6) gives sum = 8 < 10. We need a larger sum, so we advance L to index 1 (4): 4 + 6 = 10!",
        cells: ["2", "4", "6", "9", "11"],
        activeIndices: [1, 2],
        secondaryIndices: [0, 4],
        pointers: { L: 1, R: 2 },
        badge: "4 + 6 == 10 (Match!)",
      },
    ],
    microChallenge: {
      question: "In a sorted array [1, 3, 5, 8, 12] with Target = 9, currently L=0 (val 1) and R=4 (val 12) give sum = 13. Which pointer should move next and why?",
      options: [
        "Move L right (L++) to increase the sum",
        "Move R left (R--) because 12 + anything >= 1 is strictly >= 13 > 9",
        "Move both L++ and R-- simultaneously",
      ],
      correctIndex: 1,
      explanation: "Because sum = 13 > 9 and `nums[L]` is already the smallest available number, `nums[R] = 12` can never be part of a valid pair. Decrementing `R` eliminates N-1 useless pairs in O(1).",
    },
  },
  "sliding-window": {
    visualSteps: [
      {
        stepTitle: "Step 1: Expand Right to grow the window",
        caption: "Goal: Longest subarray with sum <= 8. Expand R from 0 to 2: window [3, 1, 2] has sum = 6 <= 8 (valid, length = 3).",
        cells: ["3", "1", "2", "5", "1", "1"],
        activeIndices: [0, 1, 2],
        pointers: { L: 0, R: 2 },
        badge: "sum = 6 <= 8 (len 3)",
      },
      {
        stepTitle: "Step 2: Window violates constraint -> Shrink Left",
        caption: "R advances to index 3 (val 5). Window [3, 1, 2, 5] has sum = 11 > 8! We increment L (removing 3) so sum becomes 8 <= 8.",
        cells: ["3", "1", "2", "5", "1", "1"],
        activeIndices: [1, 2, 3],
        secondaryIndices: [0],
        pointers: { L: 1, R: 3 },
        badge: "11 > 8 -> L++ (sum = 8)",
      },
      {
        stepTitle: "Step 3: Each element enters & leaves at most once",
        caption: "Neither L nor R ever moves backward. Total pointer moves across the entire run <= 2N -> O(N) time!",
        cells: ["3", "1", "2", "5", "1", "1"],
        activeIndices: [2, 3, 4, 5],
        secondaryIndices: [0, 1],
        pointers: { L: 2, R: 5 },
        badge: "O(N) Amortized",
      },
    ],
    microChallenge: {
      question: "Why does the `while` loop inside a `for right in range(n)` Sliding Window still run in O(N) total time instead of O(N^2)?",
      options: [
        "Because the `while` loop only executes on prime indices",
        "Because the `left` pointer only moves forward and can increment at most N times across the entire algorithm",
        "Because Python optimizes nested `while` loops into binary search",
      ],
      correctIndex: 1,
      explanation: "Each element is added once by `right` and removed at most once by `left`. Across the entire execution, `left` increments at most N times, giving 2N total operations = O(N).",
    },
  },
  "binary-search": {
    visualSteps: [
      {
        stepTitle: "Step 1: Monotonic Predicate [F, F, F, T, T, T]",
        caption: "Every Binary Search problem can be framed as finding the first index where a condition check(x) flips from False to True.",
        cells: ["F", "F", "F", "T", "T", "T"],
        activeIndices: [0, 1, 2, 3, 4, 5],
        pointers: { low: 0, mid: 2, high: 5 },
        badge: "mid = 2 is False",
      },
      {
        stepTitle: "Step 2: mid is False -> Discard left half",
        caption: "Since check(2) is False, indices 0, 1, and 2 cannot be the first True. Set low = mid + 1 = 3.",
        cells: ["F", "F", "F", "T", "T", "T"],
        activeIndices: [3, 4, 5],
        secondaryIndices: [0, 1, 2],
        pointers: { low: 3, mid: 4, high: 5 },
        badge: "low = mid + 1 = 3",
      },
      {
        stepTitle: "Step 3: mid is True -> Keep mid, discard right",
        caption: "check(4) is True! Index 4 might be the first True (or an earlier one exists), so set high = mid = 4 until low == high == 3.",
        cells: ["F", "F", "F", "T", "T", "T"],
        activeIndices: [3],
        secondaryIndices: [0, 1, 2, 4, 5],
        pointers: { "low=high": 3 },
        badge: "First True at idx 3",
      },
    ],
    microChallenge: {
      question: "When searching for the FIRST `True` in `[False, False, True, True]` using `while low < high`, if `check(mid)` is `True`, how should you update the bounds?",
      options: [
        "high = mid — because `mid` itself could be the first `True`",
        "high = mid - 1 — because we already checked `mid`",
        "low = mid + 1 — to search the right half",
      ],
      correctIndex: 0,
      explanation: "When `check(mid)` is `True`, `mid` is a valid candidate for the first `True`. Setting `high = mid - 1` would accidentally discard the answer if `mid` was the very first `True`!",
    },
  },
  "monotonic-stack": {
    visualSteps: [
      {
        stepTitle: "Step 1: Push decreasing elements onto the stack",
        caption: "Finding Next Greater Element for [73, 74, 75, 71, 69, 72]. Stack holds indices waiting for a warmer day.",
        cells: ["73", "74", "75", "71", "69", "72"],
        activeIndices: [2, 3, 4],
        pointers: { "Stack Top": 4 },
        badge: "Stack: [75, 71, 69]",
      },
      {
        stepTitle: "Step 2: Incoming 72 breaks decreasing order!",
        caption: "72 > 69 and 72 > 71! Pop 69 (answer = 72) and pop 71 (answer = 72). Stop at 75 because 75 > 72.",
        cells: ["73", "74", "75", "71->72", "69->72", "72"],
        activeIndices: [5],
        secondaryIndices: [3, 4],
        pointers: { Incoming: 5 },
        badge: "Popped 69 & 71!",
      },
      {
        stepTitle: "Step 3: Push 72 and continue in O(N)",
        caption: "Now the stack is [75, 72] — strictly decreasing again. Every element is pushed once and popped at most once.",
        cells: ["73", "74", "75", "Resolved", "Resolved", "72"],
        activeIndices: [2, 5],
        pointers: { "New Top": 5 },
        badge: "Stack: [75, 72]",
      },
    ],
    microChallenge: {
      question: "To find the NEXT GREATER element to the right for each item in a single left-to-right pass, what invariant should the Monotonic Stack maintain from bottom to top?",
      options: [
        "Monotonically decreasing values (pop whenever incoming `x > stack[-1]`)",
        "Monotonically increasing values (pop whenever incoming `x < stack[-1]`)",
        "Sorted alphabetically by index",
      ],
      correctIndex: 0,
      explanation: "Smaller elements sit on top waiting for the first larger element `x` to arrive. As soon as `x > stack[-1]`, `x` is the Next Greater Element for all smaller elements at the top of the stack.",
    },
  },
};

export function getTopicInteractiveBundle(topic: DSATopic): TopicInteractiveBundle {
  if (CUSTOM_INTERACTIVE_BUNDLES[topic.id]) {
    return CUSTOM_INTERACTIVE_BUNDLES[topic.id];
  }

  // Generate tailored Brilliant-style Visual State Steps & MicroChallenge from the topic's structured walkthrough & interview traps
  const steps: VisualStateStep[] = topic.notebookLM.stepByStepWalkthrough.map((stepText, idx, arr) => {
    const cells = arr.map((_, i) => `Phase ${i + 1}`);
    return {
      stepTitle: `Step ${idx + 1} of ${arr.length}`,
      caption: stepText,
      cells,
      activeIndices: [idx],
      secondaryIndices: Array.from({ length: idx }, (_, i) => i),
      pointers: { Current: idx },
      badge: idx === arr.length - 1 ? `Target: ${topic.timeComplexity.average}` : `${topic.shortTitle} State`,
    };
  });

  const primaryTrap = topic.notebookLM.interviewTraps[0] ?? "Ignoring edge cases and complexity bounds.";
  const primarySignal = topic.whenToUse[0] ?? topic.summary;
  const falsePositive = topic.whenNotToUse[0] ?? "When a simpler O(1) or O(N) approach suffices.";

  const microChallenge: MicroChallenge = {
    question: `Before inspecting the code template: When is "${topic.shortTitle}" the optimal pattern choice in an interview?`,
    options: [
      primarySignal.length > 140 ? `${primarySignal.slice(0, 137)}...` : primarySignal,
      `Even when: ${falsePositive.length > 125 ? `${falsePositive.slice(0, 122)}...` : falsePositive}`,
      `By falling into this trap: ${primaryTrap.length > 120 ? `${primaryTrap.slice(0, 117)}...` : primaryTrap}`,
    ],
    correctIndex: 0,
    explanation: `Correct! ${topic.notebookLM.keyTakeaways[0] ?? topic.summary} Watch out for the classic trap: ${primaryTrap}`,
  };

  return {
    visualSteps: steps,
    microChallenge,
  };
}

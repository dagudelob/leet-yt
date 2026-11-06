import { FlowchartQuestionNode } from "@/types/dsa";

export interface VisualDecisionBranch {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  borderColor: string;
  bgGlow: string;
  rootQuestion: string;
  steps: Array<{
    question: string;
    yesLabel: string;
    yesTopics: string[];
    noLabel?: string;
    noTopics?: string[];
  }>;
}

export interface ConstraintCheatsheetRow {
  constraint: string;
  maxN: number;
  targetComplexity: string;
  explanation: string;
  recommendedTopicIds: string[];
}

export const CONSTRAINT_CHEATSHEET: ConstraintCheatsheetRow[] = [
  {
    constraint: "N <= 11",
    maxN: 11,
    targetComplexity: "O(N!) or O(2^N)",
    explanation: "Tiny search space: you can enumerate all permutations or assignments via recursive brute force.",
    recommendedTopicIds: ["backtracking", "brute-force"],
  },
  {
    constraint: "12 <= N <= 20",
    maxN: 20,
    targetComplexity: "O(2^N) or O(N^2 * 2^N)",
    explanation: "Classic signal for subsets or Bitmask DP: 2^20 ~ 10^6 operations easily finishes within 1 second.",
    recommendedTopicIds: ["bitmask-dp", "backtracking"],
  },
  {
    constraint: "N <= 400",
    maxN: 400,
    targetComplexity: "O(N^3)",
    explanation: "Allows cubic algorithms such as interval DP, matrix multiplication, or Floyd-Warshall.",
    recommendedTopicIds: ["dynamic-programming", "brute-force", "simulation"],
  },
  {
    constraint: "N <= 5,000",
    maxN: 5000,
    targetComplexity: "O(N^2)",
    explanation: "5000^2 = 2.5 * 10^7 operations: ideal for 2D DP (LCS, Knapsack), dense graphs, or fixing index i + Two Pointers (3Sum).",
    recommendedTopicIds: ["dynamic-programming", "memoization", "two-pointers", "matrices-grids", "dfs", "bfs"],
  },
  {
    constraint: "N <= 200,000 (10^5)",
    maxN: 200000,
    targetComplexity: "O(N log N) or O(N)",
    explanation: "O(N^2) will TLE! You need Sorting, Heaps, Binary Search, Sliding Window, Two Pointers, Hash Map, Monotonic Stack, or O(V+E) Graph traversal.",
    recommendedTopicIds: [
      "sliding-window",
      "two-pointers",
      "hash-table",
      "prefix-sum",
      "binary-search",
      "sorting-intervals",
      "monotonic-stack",
      "heaps",
      "heap-sorting",
      "dijkstra",
      "topological-sort-dag",
      "disjoint-set-union",
      "fenwick-tree",
      "segment-tree",
      "greedy",
    ],
  },
  {
    constraint: "N <= 1,000,000 (10^6)",
    maxN: 1000000,
    targetComplexity: "Strict O(N)",
    explanation: "Even O(N log N) can be tight: prioritize a single linear O(N) pass with Hashing, Counting Sort, KMP, Trie, or Bit Manipulation.",
    recommendedTopicIds: ["counting", "prefix-sum", "string-matching", "rolling-hash", "tries", "bit-manipulation", "number-theory"],
  },
  {
    constraint: "N >= 10^9",
    maxN: 1000000000,
    targetComplexity: "O(log N) or O(1)",
    explanation: "You cannot even loop from 1 to N: use Binary Search on Answer, Binary Exponentiation, Euclidean GCD, or a closed-form math formula.",
    recommendedTopicIds: ["binary-search", "math", "number-theory", "bit-manipulation"],
  },
];

/**
 * INTERACTIVE DECISION TREE (STEP-BY-STEP WIZARD + FLOWCHART)
 * Guides learners through problem signals until landing on the exact algorithmic node.
 */
export const FLOWCHART_DECISION_NODES: Record<string, FlowchartQuestionNode> = {
  "q-root": {
    id: "q-root",
    label: "What is the primary input structure or objective of your problem?",
    sublabel: "Flowchart starting point (inspired by AlgoMonster & Brilliant)",
    category: "Root",
    options: [
      {
        label: "1D Array or Number Sequence",
        conditionHint: "Subarrays, pairs, searching, sorting, or range queries",
        targetNodeId: "q-array-main",
        isTopic: false,
      },
      {
        label: "Strings / Text Processing",
        conditionHint: "Substrings, anagrams, prefixes, palindromes, or pattern matching",
        targetNodeId: "q-string-main",
        isTopic: false,
      },
      {
        label: "Binary Trees or Hierarchies",
        conditionHint: "TreeNode, BST, ancestors, level-order, or subtree properties",
        targetNodeId: "q-tree-main",
        isTopic: false,
      },
      {
        label: "Graphs, Networks, or 2D Grids (Matrices/Islands)",
        conditionHint: "Shortest paths, connectivity, dependencies (DAG), or mazes",
        targetNodeId: "q-graph-main",
        isTopic: false,
      },
      {
        label: "Optimization, Counting Ways, or Generating Subsets",
        conditionHint: "'Maximum/Minimum', 'Number of ways', or 'Generate all combinations'",
        targetNodeId: "q-opt-main",
        isTopic: false,
      },
      {
        label: "Linked Lists, Stacks, Queues, or Custom Class Design",
        conditionHint: "ListNode, LIFO/FIFO, Next Greater Element, or LRU Cache",
        targetNodeId: "q-linked-stack-main",
        isTopic: false,
      },
      {
        label: "Math, Bit Manipulation, Primes, or N >= 10^9",
        conditionHint: "XOR, divisors, modular arithmetic, or 2D geometry",
        targetNodeId: "q-math-bits-main",
        isTopic: false,
      },
    ],
  },

  // --- BRANCH 1: ARRAYS ---
  "q-array-main": {
    id: "q-array-main",
    label: "What property does the array have, or what operation is requested?",
    sublabel: "Arrays & Sequences Branch",
    category: "Arrays",
    options: [
      {
        label: "The array is SORTED (or rotated) / Monotonic False->True condition",
        conditionHint: "O(log N) halving or O(N) converging pointers",
        targetNodeId: "q-array-sorted",
        isTopic: false,
      },
      {
        label: "Find a CONTIGUOUS SUBARRAY (longest, shortest, or target sum K)",
        conditionHint: "Adjacent elements without gaps",
        targetNodeId: "q-array-subarray",
        isTopic: false,
      },
      {
        label: "Involves INTERVALS [start, end] (meetings, overlaps, calendars)",
        conditionHint: "Merge, count rooms, or insert ranges",
        targetNodeId: "q-array-intervals",
        isTopic: false,
      },
      {
        label: "Repeated RANGE QUERIES [L, R] (sum, maximum, or minimum)",
        conditionHint: "With or without dynamic point/range updates",
        targetNodeId: "q-array-range-queries",
        isTopic: false,
      },
      {
        label: "Find Top-K, Median, K-th largest, or Frequencies in O(N)",
        conditionHint: "Selection and partial sorting",
        targetNodeId: "q-array-topk",
        isTopic: false,
      },
      {
        label: "Fast O(1) complement/duplicate lookup or foundational array manipulation",
        conditionHint: "General unsorted array",
        targetNodeId: "q-array-unsorted-basic",
        isTopic: false,
      },
    ],
  },
  "q-array-sorted": {
    id: "q-array-sorted",
    label: "In this sorted array (or monotonic search space), what do you need to find?",
    category: "Arrays",
    options: [
      {
        label: "A target element, first-True boundary, or minimizing the maximum possible value",
        conditionHint: "Discard half the search space each step -> O(log N)",
        targetNodeId: "binary-search",
        isTopic: true,
      },
      {
        label: "A pair or triplet summing to Target, or in-place deduplication in O(1) space",
        conditionHint: "Two coordinated indices -> O(N)",
        targetNodeId: "two-pointers",
        isTopic: true,
      },
    ],
  },
  "q-array-subarray": {
    id: "q-array-subarray",
    label: "Can the contiguous subarray contain NEGATIVE numbers that affect the sum?",
    category: "Arrays",
    options: [
      {
        label: "NO negative numbers (or window validity is monotonic when expanding/shrinking)",
        conditionHint: "Elastic window [left..right] in O(N)",
        targetNodeId: "sliding-window",
        isTopic: true,
      },
      {
        label: "YES, there are negative numbers and I need subarrays with exact sum K",
        conditionHint: "pref[R] - pref[L] == K stored in a Hash Map",
        targetNodeId: "prefix-sum",
        isTopic: true,
      },
    ],
  },
  "q-array-intervals": {
    id: "q-array-intervals",
    label: "What do you need to do with the intervals [start, end]?",
    category: "Arrays",
    options: [
      {
        label: "Merge overlapping intervals or detect free gaps",
        conditionHint: "Sort by start and compare curr.start <= prev.end",
        targetNodeId: "sorting-intervals",
        isTopic: true,
      },
      {
        label: "Select the MAXIMUM number of mutually NON-overlapping intervals",
        conditionHint: "Greedily sort by END time",
        targetNodeId: "greedy",
        isTopic: true,
      },
      {
        label: "Find how many intervals are active simultaneously (peak concurrency)",
        conditionHint: "+1 on open and -1 on close events (Sweep Line)",
        targetNodeId: "specialized-advanced",
        isTopic: true,
      },
    ],
  },
  "q-array-range-queries": {
    id: "q-array-range-queries",
    label: "Do the array values MUTATE between range queries [L, R]?",
    category: "Arrays",
    options: [
      {
        label: "NO mutations (the array is static / immutable)",
        conditionHint: "Precompute in O(N) and answer queries in O(1)",
        targetNodeId: "prefix-sum",
        isTopic: true,
      },
      {
        label: "YES, point updates occur and I need RANGE SUMS in O(log N)",
        conditionHint: "15 lines using the lowest set bit trick i & -i",
        targetNodeId: "fenwick-tree",
        isTopic: true,
      },
      {
        label: "YES, updates occur (point or full range) and I need RANGE MIN, MAX, or custom associative queries",
        conditionHint: "Binary tree of intervals in O(log N)",
        targetNodeId: "segment-tree",
        isTopic: true,
      },
    ],
  },
  "q-array-topk": {
    id: "q-array-topk",
    label: "How do you need to extract the largest, most frequent, or median elements?",
    category: "Arrays",
    options: [
      {
        label: "Top-K in a live stream, K-Way Merge, or Running Median (Two Heaps)",
        conditionHint: "O(N log K) with a Priority Queue",
        targetNodeId: "heap-sorting",
        isTopic: true,
      },
      {
        label: "Find the K-th largest in average O(N) in-place or partition into 3 groups (0, 1, 2)",
        conditionHint: "QuickSelect / Dutch National Flag",
        targetNodeId: "partitioning",
        isTopic: true,
      },
      {
        label: "Values or frequencies are bounded in [0..N] and I want pure O(N) sorting",
        conditionHint: "Comparison-free bucket indexing",
        targetNodeId: "counting",
        isTopic: true,
      },
      {
        label: "Dynamically insert/delete while querying the nearest neighbor >= X in O(log N)",
        conditionHint: "SortedList / Balanced BST",
        targetNodeId: "ordered-set",
        isTopic: true,
      },
    ],
  },
  "q-array-unsorted-basic": {
    id: "q-array-unsorted-basic",
    label: "What operation do you need on the array?",
    category: "Arrays",
    options: [
      {
        label: "Remember seen elements, frequencies, or indices in O(1) (e.g., Two Sum)",
        conditionHint: "Trade O(N) memory for O(1) time",
        targetNodeId: "hash-table",
        isTopic: true,
      },
      {
        label: "Deduce the maximum allowed Big-O complexity from the problem's N constraint",
        conditionHint: "Constraint Analysis",
        targetNodeId: "basic-dsa",
        isTopic: true,
      },
      {
        label: "Contiguous memory manipulation, in-place rotations, or prefix/suffix products",
        conditionHint: "Core Array operations",
        targetNodeId: "arrays",
        isTopic: true,
      },
      {
        label: "Simulate explicit step-by-step rules or test all pairs when N is small",
        conditionHint: "Simulation / Brute Force",
        targetNodeId: "simulation",
        isTopic: true,
      },
    ],
  },

  // --- BRANCH 2: STRINGS ---
  "q-string-main": {
    id: "q-string-main",
    label: "What kind of String problem are you solving?",
    sublabel: "Strings & Text Search Branch",
    category: "Strings",
    options: [
      {
        label: "Longest/shortest substring satisfying a character frequency condition or anagram",
        conditionHint: "Sliding Window over a string in O(N)",
        targetNodeId: "sliding-window",
        isTopic: true,
      },
      {
        label: "Autocomplete, multi-word dictionary, or PREFIX search (startsWith)",
        conditionHint: "Character-by-character Prefix Tree",
        targetNodeId: "tries",
        isTopic: true,
      },
      {
        label: "Exact pattern matching in O(N+M), periodic strings, or Shortest Palindrome",
        conditionHint: "Backtrack-free LPS prefix-suffix table",
        targetNodeId: "string-matching",
        isTopic: true,
      },
      {
        label: "Compare arbitrary substrings in O(1) or find the longest duplicate substring",
        conditionHint: "Polynomial Rolling Hash (Rabin-Karp)",
        targetNodeId: "rolling-hash",
        isTopic: true,
      },
      {
        label: "26-letter frequency arrays ('a'-'z'), immutability, and foundational string ops",
        conditionHint: "String & ASCII fundamentals",
        targetNodeId: "strings",
        isTopic: true,
      },
    ],
  },

  // --- BRANCH 3: TREES ---
  "q-tree-main": {
    id: "q-tree-main",
    label: "What property does the Tree have, or how do you need to traverse it?",
    sublabel: "Binary Trees Branch",
    category: "Trees",
    options: [
      {
        label: "It is a Binary Search Tree (BST: left < root < right)",
        conditionHint: "Prune half the tree in O(H) or use sorted In-Order traversal",
        targetNodeId: "bst",
        isTopic: true,
      },
      {
        label: "Traverse LEVEL BY LEVEL (layer by layer) or find the shallowest leaf",
        conditionHint: "FIFO Queue with len(queue)",
        targetNodeId: "bfs",
        isTopic: true,
      },
      {
        label: "Compute heights, diameters, path sums, or recursive subtree properties",
        conditionHint: "Pre-order, In-order, and Post-order",
        targetNodeId: "trees",
        isTopic: true,
      },
      {
        label: "Split a problem into independent recursive halves and combine their results",
        conditionHint: "Divide and Conquer",
        targetNodeId: "divide-and-conquer",
        isTopic: true,
      },
    ],
  },

  // --- BRANCH 4: GRAPHS & 2D MATRICES ---
  "q-graph-main": {
    id: "q-graph-main",
    label: "What are you asked to solve on the Graph or 2D Grid?",
    sublabel: "Graphs, DAGs & Grids Branch",
    category: "Graphs",
    options: [
      {
        label: "Find the SHORTEST PATH (minimum distance or minimum cost)",
        conditionHint: "Depends on whether edges are weighted or unweighted",
        targetNodeId: "q-graph-shortest",
        isTopic: false,
      },
      {
        label: "Task PREREQUISITES, dependencies, a DAG, or directed cycle detection",
        conditionHint: "Topological Sort (Kahn's Algorithm) & DAG DP",
        targetNodeId: "topological-sort-dag",
        isTopic: true,
      },
      {
        label: "Dynamically merge groups, count components as edges arrive, or Minimum Spanning Tree (MST)",
        conditionHint: "find(x) and union(a, b) in O(alpha(N)) ~ O(1)",
        targetNodeId: "disjoint-set-union",
        isTopic: true,
      },
      {
        label: "Count islands, explore connected components, or deep Flood Fill",
        conditionHint: "Recursion marking visited cells",
        targetNodeId: "dfs",
        isTopic: true,
      },
      {
        label: "Model edges via Adjacency List, node degrees, or Bipartite graph (2-coloring)",
        conditionHint: "Foundational Graph representation",
        targetNodeId: "graphs",
        isTopic: true,
      },
      {
        label: "Rotate or traverse a 2D Matrix in-place or navigate (r, c) coordinates",
        conditionHint: "2D Matrices & Grids",
        targetNodeId: "matrices-grids",
        isTopic: true,
      },
    ],
  },
  "q-graph-shortest": {
    id: "q-graph-shortest",
    label: "Do the graph edges have WEIGHTS (different costs) or does every step cost 1?",
    category: "Graphs",
    options: [
      {
        label: "ALL edges cost 1 (unweighted) or simultaneous wave propagation (Multi-Source)",
        conditionHint: "BFS with a FIFO Queue in O(V + E)",
        targetNodeId: "bfs",
        isTopic: true,
      },
      {
        label: "Edges have non-negative WEIGHTS (w >= 0) and I need the cheapest path",
        conditionHint: "Dijkstra with a Min-Heap in O(E log V)",
        targetNodeId: "dijkstra",
        isTopic: true,
      },
    ],
  },

  // --- BRANCH 5: OPTIMIZATION, COUNTING & COMBINATORICS ---
  "q-opt-main": {
    id: "q-opt-main",
    label: "What kind of output and input size N does your optimization/counting problem have?",
    sublabel: "Backtracking, Greedy & Dynamic Programming Branch",
    category: "Optimization",
    options: [
      {
        label: "Asks to LIST ALL valid combinations, permutations, or subsets (N <= 20)",
        conditionHint: "Choose -> Explore -> Unchoose (pop)",
        targetNodeId: "backtracking",
        isTopic: true,
      },
      {
        label: "12 <= N <= 20 and the optimal cost depends on WHICH subset of items was already used",
        conditionHint: "Pack visited state into a binary integer mask",
        targetNodeId: "bitmask-dp",
        isTopic: true,
      },
      {
        label: "A provable local greedy choice exists (e.g., furthest reach or earliest end time) without regret",
        conditionHint: "Local optimum -> Global optimum in O(N) / O(N log N)",
        targetNodeId: "greedy",
        isTopic: true,
      },
      {
        label: "Recursive choices with overlapping subproblems where I want to add caching (@cache)",
        conditionHint: "Top-Down Dynamic Programming",
        targetNodeId: "memoization",
        isTopic: true,
      },
      {
        label: "Fill an iterative 1D/2D table (Knapsack, Coin Change, LCS, LIS) and optimize space",
        conditionHint: "Bottom-Up Dynamic Programming",
        targetNodeId: "dynamic-programming",
        isTopic: true,
      },
    ],
  },

  // --- BRANCH 6: LINKED LISTS, STACKS, QUEUES & DESIGN ---
  "q-linked-stack-main": {
    id: "q-linked-stack-main",
    label: "Which linear structure or system design pattern are you working with?",
    sublabel: "Pointers, Stacks, Queues & O(1) Design Branch",
    category: "Linear & Design",
    options: [
      {
        label: "Find the 'Next Greater/Smaller Element', temperatures, largest histogram, or window maximum",
        conditionHint: "Sorted Stack or Deque that pops when monotonicity breaks",
        targetNodeId: "monotonic-stack",
        isTopic: true,
      },
      {
        label: "Detect cycles in O(1) space, find the middle node, or reverse a Linked List in-place",
        conditionHint: "Fast & Slow Pointers (Floyd) and 3-pointer reversal",
        targetNodeId: "linkedlist-manipulation",
        isTopic: true,
      },
      {
        label: "Insert/delete pointer nodes and use a Dummy Node (Sentinel)",
        conditionHint: "Singly & Doubly Linked List fundamentals",
        targetNodeId: "linked-list",
        isTopic: true,
      },
      {
        label: "Validate nested parentheses, evaluate RPN expressions, or decode nested strings",
        conditionHint: "LIFO Stack (Last-In, First-Out)",
        targetNodeId: "stacks",
        isTopic: true,
      },
      {
        label: "Process in FIFO arrival order or push/pop from both ends in O(1)",
        conditionHint: "Queues & Deques (collections.deque)",
        targetNodeId: "queues-deques",
        isTopic: true,
      },
      {
        label: "Design a composite O(1) data structure like LRU Cache, MinStack, or RandomizedSet",
        conditionHint: "Combine Hash Map + Doubly Linked List / Dynamic Array",
        targetNodeId: "system-ds-design",
        isTopic: true,
      },
      {
        label: "Repeatedly extract the highest-priority element (min or max) in O(log N)",
        conditionHint: "Binary Heap / Priority Queue",
        targetNodeId: "heaps",
        isTopic: true,
      },
    ],
  },

  // --- BRANCH 7: MATH, BITS & SPECIALIZED ---
  "q-math-bits-main": {
    id: "q-math-bits-main",
    label: "Which mathematical, bitwise, or specialized advanced pattern do you need?",
    sublabel: "Bits, Number Theory & Specialized Patterns Branch",
    category: "Math & Advanced",
    options: [
      {
        label: "Cancel duplicates via XOR in O(1) space, count '1' bits, or check powers of 2",
        conditionHint: "x ^ x = 0 and n & (n - 1)",
        targetNodeId: "bit-manipulation",
        isTopic: true,
      },
      {
        label: "Prime numbers (Sieve of Eratosthenes), Greatest Common Divisor (Euclid), or Modulo 10^9 + 7",
        conditionHint: "Number Theory & Modular Arithmetic",
        targetNodeId: "number-theory",
        isTopic: true,
      },
      {
        label: "Fast exponentiation Pow(x, n), combinatorics, Gauss sums, or collinear 2D points",
        conditionHint: "Float-free Math & Computational Geometry",
        targetNodeId: "math",
        isTopic: true,
      },
      {
        label: "Majority element in O(1) space (Boyer-Moore), Critical Bridges (Tarjan), or Eulerian Path",
        conditionHint: "Specialized advanced patterns",
        targetNodeId: "specialized-advanced",
        isTopic: true,
      },
    ],
  },
};

/**
 * VISUAL DECISION BRANCHES FOR THE FLOWCHART CANVAS (ALGOMONSTER + BRILLIANT STYLE)
 * Visually organizes question nodes -> algorithmic leaf nodes for at-a-glance exploration.
 */
export const VISUAL_FLOWCHART_BRANCHES: VisualDecisionBranch[] = [
  {
    id: "branch-fundamentals",
    title: "0. Step Zero: Constraints & Foundations",
    subtitle: "Before picking an algorithm, read N in the problem constraints",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/40",
    bgGlow: "from-amber-500/15 to-transparent",
    rootQuestion: "What is the upper bound of N, and are there explicit step-by-step rules?",
    steps: [
      {
        question: "How do I deduce the maximum allowed Big-O from N?",
        yesLabel: "10^8 ops/sec rule",
        yesTopics: ["basic-dsa"],
        noLabel: "Is N tiny or do I need a quick baseline?",
        noTopics: ["brute-force", "simulation"],
      },
    ],
  },
  {
    id: "branch-arrays-strings",
    title: "1. Arrays, Strings & Sliding Windows",
    subtitle: "Contiguous sequences, two pointers, and binary search",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/40",
    bgGlow: "from-cyan-500/15 to-transparent",
    rootQuestion: "Are you working with an Array, String, or 2D Matrix?",
    steps: [
      {
        question: "What is the underlying sequence layout?",
        yesLabel: "1D / Strings",
        yesTopics: ["arrays", "strings"],
        noLabel: "2D Grid (Rows x Columns)",
        noTopics: ["matrices-grids"],
      },
      {
        question: "Is it SORTED or does it have a monotonic [False...True] boundary?",
        yesLabel: "YES -> Halve space or converge pointers",
        yesTopics: ["binary-search", "two-pointers"],
        noLabel: "NO -> Looking for a contiguous subarray?",
        noTopics: ["sliding-window", "prefix-sum"],
      },
      {
        question: "Is it advanced string matching (prefixes, patterns, or rolling hashes)?",
        yesLabel: "Prefix dictionary",
        yesTopics: ["tries"],
        noLabel: "O(1) Substrings or O(N+M) Pattern match",
        noTopics: ["rolling-hash", "string-matching"],
      },
    ],
  },
  {
    id: "branch-hashing-sorting",
    title: "2. Hashing, Sorting & Intervals",
    subtitle: "O(1) lookups, frequency buckets, partitioning, and intervals",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/40",
    bgGlow: "from-emerald-500/15 to-transparent",
    rootQuestion: "Do you need O(1) memory lookups, custom sorting, or interval merging?",
    steps: [
      {
        question: "Do you need to check if a complement or key has appeared in O(1)?",
        yesLabel: "YES -> Trade O(N) space for O(1) time",
        yesTopics: ["hash-table"],
        noLabel: "Bounded values/frequencies in [0..N]?",
        noTopics: ["counting"],
      },
      {
        question: "Are the inputs intervals [start, end] or finding the K-th element in-place?",
        yesLabel: "Intervals [start, end]",
        yesTopics: ["sorting-intervals"],
        noLabel: "3-way Partition / O(N) QuickSelect",
        noTopics: ["partitioning"],
      },
    ],
  },
  {
    id: "branch-linked-stacks",
    title: "3. Linked Lists, Stacks, Queues & O(1) Design",
    subtitle: "Pointer manipulation, monotonic stacks, and composite structures",
    accentColor: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/40",
    bgGlow: "from-fuchsia-500/15 to-transparent",
    rootQuestion: "Working with linked nodes, LIFO/FIFO ordering, or custom class design?",
    steps: [
      {
        question: "Is the input a Linked List (ListNode)?",
        yesLabel: "Dummy Node / Fast & Slow / Reversal",
        yesTopics: ["linked-list", "linkedlist-manipulation"],
        noLabel: "LIFO nesting or FIFO Queue?",
        noTopics: ["stacks", "queues-deques"],
      },
      {
        question: "Looking for the 'Next Greater/Smaller' or designing an O(1) class like LRU Cache?",
        yesLabel: "Next Greater / Histogram / Window Max",
        yesTopics: ["monotonic-stack"],
        noLabel: "Combine Hash Map + List/Array",
        noTopics: ["system-ds-design"],
      },
    ],
  },
  {
    id: "branch-trees-heaps",
    title: "4. Trees, Heaps & Backtracking",
    subtitle: "Hierarchies, Top-K priority queues, and combinatorial search",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/40",
    bgGlow: "from-violet-500/15 to-transparent",
    rootQuestion: "Hierarchical tree, continuous min/max extraction, or generating combinations?",
    steps: [
      {
        question: "Is it a general Binary Tree or a BST with left < root < right ordering?",
        yesLabel: "Binary Tree / Divide & Conquer",
        yesTopics: ["divide-and-conquer", "trees"],
        noLabel: "BST Property",
        noTopics: ["bst"],
      },
      {
        question: "Do you need to repeatedly extract the Min/Max, Top-K, or Running Median?",
        yesLabel: "YES -> Priority Queue / Heaps",
        yesTopics: ["heaps", "heap-sorting"],
        noLabel: "Asks to GENERATE ALL combinations/permutations?",
        noTopics: ["backtracking"],
      },
    ],
  },
  {
    id: "branch-graphs-dag",
    title: "5. Graphs, DAGs & Shortest Paths",
    subtitle: "BFS, DFS, Dijkstra, Topological Sort, and Union-Find",
    accentColor: "text-rose-400",
    borderColor: "border-rose-500/40",
    bgGlow: "from-rose-500/15 to-transparent",
    rootQuestion: "Are there connections between nodes, grid islands, or dependencies?",
    steps: [
      {
        question: "Exploring connected components/islands or finding the SHORTEST PATH?",
        yesLabel: "Explore all / Islands -> DFS",
        yesTopics: ["graphs", "dfs"],
        noLabel: "Shortest Path (Unweighted: BFS | Weighted: Dijkstra)",
        noTopics: ["bfs", "dijkstra"],
      },
      {
        question: "Are there directed prerequisites (DAG) or dynamic group merges?",
        yesLabel: "Dependencies / DAG -> Kahn's Algorithm",
        yesTopics: ["topological-sort-dag"],
        noLabel: "Dynamic components / MST -> Union-Find",
        noTopics: ["disjoint-set-union"],
      },
    ],
  },
  {
    id: "branch-dp-greedy",
    title: "6. Dynamic Programming & Greedy",
    subtitle: "Optimization and counting with overlapping subproblems",
    accentColor: "text-orange-400",
    borderColor: "border-orange-500/40",
    bgGlow: "from-orange-500/15 to-transparent",
    rootQuestion: "Asks for the optimal value (max/min) or number of ways without listing them all?",
    steps: [
      {
        question: "Does taking the best local choice at each step guarantee the global optimum?",
        yesLabel: "YES -> Greedy in O(N) / O(N log N)",
        yesTopics: ["greedy"],
        noLabel: "NO -> Overlapping subproblems (DP)",
        noTopics: ["memoization", "dynamic-programming"],
      },
      {
        question: "Is N <= 20 and the state depends on the exact subset of visited elements?",
        yesLabel: "YES -> Bitmask DP O(N^2 * 2^N)",
        yesTopics: ["bitmask-dp"],
      },
    ],
  },
  {
    id: "branch-advanced-range-math",
    title: "7. Dynamic Ranges, Math & Elite Patterns",
    subtitle: "Segment/Fenwick Trees, Bit Manipulation, Number Theory, and Sweep Line",
    accentColor: "text-indigo-400",
    borderColor: "border-indigo-500/40",
    bgGlow: "from-indigo-500/15 to-transparent",
    rootQuestion: "Mutable range queries, bitwise tricks, prime numbers, or event sweeping?",
    steps: [
      {
        question: "Do you need dynamic sorted order or mutable range queries [L, R]?",
        yesLabel: "Nearest >= X / Mutable Range Sum",
        yesTopics: ["ordered-set", "fenwick-tree"],
        noLabel: "Mutable Range Min/Max or Lazy Updates",
        noTopics: ["segment-tree"],
      },
      {
        question: "O(1) bitwise ops, primes/modulo 10^9+7, or specialized advanced patterns?",
        yesLabel: "Bits / Math / Number Theory",
        yesTopics: ["bit-manipulation", "math", "number-theory"],
        noLabel: "Sweep Line / Boyer-Moore / Tarjan",
        noTopics: ["specialized-advanced"],
      },
    ],
  },
];

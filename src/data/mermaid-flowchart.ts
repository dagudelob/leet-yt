export interface MermaidDecisionNode {
  id: string;
  question: string;
  branch: string;
  yesCondition: string;
  yesTopicId?: string;
  yesTargetQuestionId?: string;
  noCondition?: string;
  noTopicId?: string;
  noTargetQuestionId?: string;
}

export interface MermaidBranchData {
  id: string;
  title: string;
  color: string;
  borderColor: string;
  nodes: MermaidDecisionNode[];
}

export const MERMAID_BRANCHES: MermaidBranchData[] = [
  {
    id: "arrays-strings",
    title: "1. Arrays, Strings & Two Pointers",
    color: "text-cyan-400",
    borderColor: "border-cyan-500/40",
    nodes: [
      {
        id: "Q_SORTED",
        question: "Is the array SORTED or monotonic?",
        branch: "arrays-strings",
        yesCondition: "Yes (Sorted)",
        yesTargetQuestionId: "Q_TARGET_FIND",
        noCondition: "No (Unsorted)",
        noTargetQuestionId: "Q_SUBARRAY",
      },
      {
        id: "Q_TARGET_FIND",
        question: "Find single value, first-True, or minimize max?",
        branch: "arrays-strings",
        yesCondition: "Yes -> O(log N) Halving",
        yesTopicId: "binary-search",
        noCondition: "Find Pair / Triplet with Target Sum",
        noTopicId: "two-pointers",
      },
      {
        id: "Q_SUBARRAY",
        question: "Looking for contiguous subarray with condition?",
        branch: "arrays-strings",
        yesCondition: "Yes -> Positive elements only",
        yesTopicId: "sliding-window",
        noCondition: "Negative numbers present or Prefix sums",
        noTopicId: "prefix-sum",
      },
      {
        id: "Q_STRING_SEARCH",
        question: "Advanced string query (Prefix, Pattern, or Rolling)?",
        branch: "arrays-strings",
        yesCondition: "Prefix Dictionary (startsWith)",
        yesTopicId: "tries",
        noCondition: "O(N+M) Pattern (KMP) or O(1) Substrings",
        noTopicId: "string-matching",
      },
    ],
  },
  {
    id: "hashing-sorting",
    title: "2. Hashing, Intervals & Partitions",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/40",
    nodes: [
      {
        id: "Q_LOOKUP_O1",
        question: "Need to check if complement or key appeared in O(1)?",
        branch: "hashing-sorting",
        yesCondition: "Yes -> Trade O(N) Space for O(1) Time",
        yesTopicId: "hash-table",
        noCondition: "Values/Frequencies bounded in [0..N]",
        noTopicId: "counting",
      },
      {
        id: "Q_INTERVALS",
        question: "Input given as [start, end] intervals?",
        branch: "hashing-sorting",
        yesCondition: "Merge or check overlaps",
        yesTopicId: "sorting-intervals",
        noCondition: "K-th element in-place / 3-way partition",
        noTopicId: "partitioning",
      },
    ],
  },
  {
    id: "linked-stacks",
    title: "3. Linked Lists, Stacks & Queues",
    color: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/40",
    nodes: [
      {
        id: "Q_LINKED_NODE",
        question: "Is the data structure a Linked List (ListNode)?",
        branch: "linked-stacks",
        yesCondition: "Cycle / Midpoint / Reversal in O(1) Space",
        yesTopicId: "linkedlist-manipulation",
        noCondition: "Fundamental Node ops + Dummy Sentinel",
        noTopicId: "linked-list",
      },
      {
        id: "Q_STACK_LIFO",
        question: "Need 'Next Greater Element', temperatures, or histogram?",
        branch: "linked-stacks",
        yesCondition: "Yes -> Pop on broken monotonicity",
        yesTopicId: "monotonic-stack",
        noCondition: "Parentheses validation / RPN / LIFO",
        noTopicId: "stacks",
      },
      {
        id: "Q_SYSTEM_DESIGN",
        question: "Design an O(1) composite class (e.g. LRU Cache)?",
        branch: "linked-stacks",
        yesCondition: "Combine Hash Map + Doubly Linked List",
        yesTopicId: "system-ds-design",
        noCondition: "FIFO Queue or Sliding Deque",
        noTopicId: "queues-deques",
      },
    ],
  },
  {
    id: "trees-heaps",
    title: "4. Trees, Heaps & Backtracking",
    color: "text-violet-400",
    borderColor: "border-violet-500/40",
    nodes: [
      {
        id: "Q_TREE_TYPE",
        question: "Is it a Binary Search Tree (BST: left < root < right)?",
        branch: "trees-heaps",
        yesCondition: "Yes -> Prune half in O(H) / In-Order",
        yesTopicId: "bst",
        noCondition: "General Binary Tree Recursion",
        noTopicId: "trees",
      },
      {
        id: "Q_HEAP_STREAM",
        question: "Continuously extract Min/Max, Top-K, or Median in stream?",
        branch: "trees-heaps",
        yesCondition: "Yes -> Priority Queue / Heaps",
        yesTopicId: "heaps",
        noCondition: "K-Way Merge or Two-Heaps running median",
        noTopicId: "heap-sorting",
      },
      {
        id: "Q_COMBINATORIAL",
        question: "Must GENERATE ALL valid combinations, permutations, or subsets (N <= 20)?",
        branch: "trees-heaps",
        yesCondition: "Yes -> Choose -> Explore -> Unchoose (pop)",
        yesTopicId: "backtracking",
        noCondition: "Divide and conquer independent subproblems",
        noTopicId: "divide-and-conquer",
      },
    ],
  },
  {
    id: "graphs-dag",
    title: "5. Graphs, DAGs & Shortest Paths",
    color: "text-rose-400",
    borderColor: "border-rose-500/40",
    nodes: [
      {
        id: "Q_GRAPH_EXPLORE",
        question: "Need shortest path, connectivity, or cycle detection?",
        branch: "graphs-dag",
        yesCondition: "Shortest Path (Fewest steps / Unweighted)",
        yesTopicId: "bfs",
        noCondition: "Explore islands / Flood Fill / Full DFS",
        noTopicId: "dfs",
      },
      {
        id: "Q_WEIGHTED_GRAPH",
        question: "Edges have positive weights (w >= 0)?",
        branch: "graphs-dag",
        yesCondition: "Yes -> Dijkstra with Min-Heap",
        yesTopicId: "dijkstra",
        noCondition: "Directed prerequisites / Tasks -> Kahn's DAG",
        noTopicId: "topological-sort-dag",
      },
      {
        id: "Q_UNION_FIND",
        question: "Dynamic connectivity, component merges, or Kruskal's MST?",
        branch: "graphs-dag",
        yesCondition: "Yes -> Disjoint Set Union in O(alpha(N))",
        yesTopicId: "disjoint-set-union",
        noCondition: "General Adjacency List representation",
        noTopicId: "graphs",
      },
    ],
  },
  {
    id: "dp-greedy",
    title: "6. Optimization, Greedy & Dynamic Programming",
    color: "text-orange-400",
    borderColor: "border-orange-500/40",
    nodes: [
      {
        id: "Q_GREEDY_CHOICE",
        question: "Does taking the local best choice guarantee the global optimum?",
        branch: "dp-greedy",
        yesCondition: "Yes -> Greedy choice property without regret",
        yesTopicId: "greedy",
        noCondition: "No -> Subproblems overlap (Need DP)",
        noTargetQuestionId: "Q_DP_TYPE",
      },
      {
        id: "Q_DP_TYPE",
        question: "Recursive formulation with @cache vs Bottom-up table?",
        branch: "dp-greedy",
        yesCondition: "Top-Down Memoization",
        yesTopicId: "memoization",
        noCondition: "Iterative 1D/2D Tabulation (Knapsack, LCS, LIS)",
        noTopicId: "dynamic-programming",
      },
      {
        id: "Q_BITMASK_DP",
        question: "Is N <= 20 and state depends on the exact subset of items visited?",
        branch: "dp-greedy",
        yesCondition: "Yes -> Bitmask DP in O(N^2 * 2^N)",
        yesTopicId: "bitmask-dp",
      },
    ],
  },
  {
    id: "advanced-range-math",
    title: "7. Dynamic Ranges, Advanced Strings & Math",
    color: "text-indigo-400",
    borderColor: "border-indigo-500/40",
    nodes: [
      {
        id: "Q_MUTABLE_RANGES",
        question: "Point updates + Range queries on intervals [L, R]?",
        branch: "advanced-range-math",
        yesCondition: "Range Sums in 15 lines (i & -i)",
        yesTopicId: "fenwick-tree",
        noCondition: "Range Min/Max/GCD or Lazy Segment Updates",
        noTopicId: "segment-tree",
      },
      {
        id: "Q_DYNAMIC_ORDER",
        question: "Need nearest neighbor >= X dynamically while inserting/deleting?",
        branch: "advanced-range-math",
        yesCondition: "Yes -> SortedList / Balanced BST",
        yesTopicId: "ordered-set",
        noCondition: "Cancel duplicates in O(1) Space via XOR",
        noTopicId: "bit-manipulation",
      },
      {
        id: "Q_MATH_SPECIALIZED",
        question: "Primes, modular arithmetic, geometry, or specialized algorithms?",
        branch: "advanced-range-math",
        yesCondition: "Primes / GCD / Modulo 10^9+7",
        yesTopicId: "number-theory",
        noCondition: "Boyer-Moore O(1) / Sweep Line / Tarjan Bridges",
        noTopicId: "specialized-advanced",
      },
    ],
  },
];

export const FULL_MERMAID_DIAGRAM_SOURCE = `flowchart TD
  %% Root Decision
  START{"What is the input structure & objective?"}
  
  %% Branch 1: Arrays & Strings
  START -->|"1D Sequence / Array"| Q_SORTED{"Is array sorted?"}
  Q_SORTED -->|"Yes"| Q_TARGET{"Find single value or pair?"}
  Q_TARGET -->|"Single value / boundary"| BS["#13 Binary Search O(log N)"]
  Q_TARGET -->|"Pair / Triplet Sum"| TP["#06 Two Pointers O(N)"]
  Q_SORTED -->|"No"| Q_SUBARRAY{"Contiguous subarray?"}
  Q_SUBARRAY -->|"Yes (Positive)"| SW["#07 Sliding Window O(N)"]
  Q_SUBARRAY -->|"Negative numbers"| PS["#08 Prefix Sum O(N)"]
  
  %% Branch 2: Lookups & Intervals
  START -->|"Lookups & Sets"| Q_LOOKUP{"O(1) duplicate / complement check?"}
  Q_LOOKUP -->|"Yes"| HT["#09 Hash Table O(1)"]
  Q_LOOKUP -->|"Intervals [start, end]"| SI["#11 Sorting + Intervals O(N log N)"]
  
  %% Branch 3: Linear & Design
  START -->|"Pointers / Stacks"| Q_STACK{"LIFO / Next Greater Element?"}
  Q_STACK -->|"Next Greater / Histogram"| MS["#19 Monotonic Stack O(N)"]
  Q_STACK -->|"Nested Parentheses"| ST["#17 Stack LIFO"]
  Q_STACK -->|"Linked List Nodes"| LL["#16 Fast & Slow Pointers"]
  
  %% Branch 4: Hierarchies & Trees
  START -->|"Trees & Heaps"| Q_TREE{"Tree or Stream Extrema?"}
  Q_TREE -->|"BST left < root < right"| BST["#23 Binary Search Tree"]
  Q_TREE -->|"Top-K / Live Median"| HP["#28 Heap Sorting & Two Heaps"]
  Q_TREE -->|"Generate all subsets"| BT["#26 Backtracking O(2^N)"]
  
  %% Branch 5: Networks & DAGs
  START -->|"Graph / Maze / DAG"| Q_GRAPH{"Shortest path or Dependencies?"}
  Q_GRAPH -->|"Unweighted Shortest Path"| BFS["#25 Breadth-First Search O(V+E)"]
  Q_GRAPH -->|"Weighted w >= 0"| DIJK["#31 Dijkstra O(E log V)"]
  Q_GRAPH -->|"Prerequisites / DAG"| TOPO["#30 Topological Sort (Kahn)"]
  Q_GRAPH -->|"Dynamic Component Merges"| DSU["#32 Disjoint Set Union O(alpha N)"]
  
  %% Branch 6: Optimization
  START -->|"Max / Min / Count Ways"| Q_OPT{"Local best choice without regret?"}
  Q_OPT -->|"Yes"| GR["#34 Greedy Algorithm"]
  Q_OPT -->|"Overlapping Subproblems"| DP["#36 Dynamic Programming"]
  Q_OPT -->|"N <= 20 Subset State"| BM["#37 Bitmask DP O(N^2 2^N)"]
  
  %% Branch 7: Dynamic Ranges & Elite
  START -->|"Mutable Ranges / Math"| Q_RANGE{"Interval updates [L, R]?"}
  Q_RANGE -->|"Range Sum (15 lines)"| BIT["#39 Fenwick Tree (BIT) O(log N)"]
  Q_RANGE -->|"Range Min/Max / Lazy"| SEGT["#40 Segment Tree O(log N)"]
  Q_RANGE -->|"Nearest >= X"| OS["#38 Ordered Set O(log N)"]
  Q_RANGE -->|"Events / Majority / Bridges"| SPEC["#46 Specialized Advanced Patterns"]
`;

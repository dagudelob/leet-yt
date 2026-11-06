import { DSATopic, LevelMetadata } from "@/types/dsa";
import { TOPICS_LEVEL_1_2 } from "./topics-level-1-2";
import { TOPICS_LEVEL_3_4 } from "./topics-level-3-4";
import { TOPICS_LEVEL_5_6 } from "./topics-level-5-6";
import { TOPICS_LEVEL_7 } from "./topics-level-7";

export const ALL_DSA_TOPICS: DSATopic[] = [
  ...TOPICS_LEVEL_1_2,
  ...TOPICS_LEVEL_3_4,
  ...TOPICS_LEVEL_5_6,
  ...TOPICS_LEVEL_7,
].sort((a, b) => a.order - b.order);

export const TOPICS_BY_ID: Record<string, DSATopic> = Object.fromEntries(
  ALL_DSA_TOPICS.map((topic) => [topic.id, topic])
);

export const LEVEL_METADATA: LevelMetadata[] = [
  {
    level: 1,
    title: "Level 1: Foundations, Complexity & Linear Sequences",
    subtitle: "Big-O, Brute Force, Simulation, Arrays, Strings, Two Pointers & Sliding Window",
    colorClass: "text-cyan-400",
    badgeClass: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    borderClass: "border-cyan-500/40",
    glowClass: "shadow-cyan-500/10",
    goalDescription:
      "Learn to deduce the target time complexity from N in 5 seconds and master O(N) patterns over arrays and strings with O(1) extra space.",
  },
  {
    level: 2,
    title: "Level 2: Preprocessing, Hashing, Sorting & Binary Search",
    subtitle: "Prefix Sums, Hash Tables, Counting/Buckets, Intervals, Partitioning, Binary Search & 2D Matrices",
    colorClass: "text-emerald-400",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    borderClass: "border-emerald-500/40",
    glowClass: "shadow-emerald-500/10",
    goalDescription:
      "Turn O(N^2) lookups into O(1) with Hash Maps and Prefix Sums, master interval merging, and apply Binary Search on both arrays and monotonic answer spaces.",
  },
  {
    level: 3,
    title: "Level 3: Linked Pointers, Stacks, Queues & O(1) Design",
    subtitle: "Linked Lists, Fast & Slow Pointers, Stacks, Queues/Deques, Monotonic Stack & LRU Cache",
    colorClass: "text-fuchsia-400",
    badgeClass: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
    borderClass: "border-fuchsia-500/40",
    glowClass: "shadow-fuchsia-500/10",
    goalDescription:
      "Master pointer manipulation, LIFO/FIFO ordering, monotonic stacks for 'Next Greater Element', and composite data structures for O(1) system design.",
  },
  {
    level: 4,
    title: "Level 4: Recursion, Trees, Heaps & Backtracking",
    subtitle: "Divide & Conquer, Binary Trees, BST, DFS, BFS, Backtracking & Priority Queues (Top-K / Two Heaps)",
    colorClass: "text-violet-400",
    badgeClass: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    borderClass: "border-violet-500/40",
    glowClass: "shadow-violet-500/10",
    goalDescription:
      "Unlock recursive thinking on trees, depth-first (DFS) and level-order (BFS) traversals, combinatorial pruning, and priority queues.",
  },
  {
    level: 5,
    title: "Level 5: Graphs, DAGs, Shortest Paths, Connectivity & Tries",
    subtitle: "Adjacency Lists, Topological Sort (Kahn & DAG DP), Dijkstra, Union-Find (DSU) & Prefix Trees",
    colorClass: "text-rose-400",
    badgeClass: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    borderClass: "border-rose-500/40",
    glowClass: "shadow-rose-500/10",
    goalDescription:
      "Model any network of connections or dependencies: solve prerequisites on DAGs, weighted shortest paths with Dijkstra, and dynamic connectivity with Union-Find.",
  },
  {
    level: 6,
    title: "Level 6: Optimization, Greedy & Dynamic Programming",
    subtitle: "Greedy Algorithms, Memoization (Top-Down), Bottom-Up DP (1D/2D/Knapsack/LCS/LIS) & Bitmask DP",
    colorClass: "text-orange-400",
    badgeClass: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    borderClass: "border-orange-500/40",
    glowClass: "shadow-orange-500/10",
    goalDescription:
      "Move from exponential recursion to polynomial solutions by caching overlapping subproblems, filling iterative tables, and encoding state with bitmasks.",
  },
  {
    level: 7,
    title: "Level 7: Dynamic Ranges, Advanced Strings, Math & Elite Patterns",
    subtitle: "Ordered Set, Fenwick Tree, Segment Tree, Rolling Hash, KMP, Bits, Math, Number Theory & Sweep Line",
    colorClass: "text-indigo-400",
    badgeClass: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    borderClass: "border-indigo-500/40",
    glowClass: "shadow-indigo-500/10",
    goalDescription:
      "The advanced toolkit for Hard problems and final rounds: logarithmic range trees, linear string matching, modular arithmetic, and sweep-line event processing.",
  },
];

/**
 * Builds the complete Hybrid Production Package in Markdown ready to upload to Google NotebookLM
 * or use as a YouTube recording teleprompter.
 */
export function buildNotebookLMMarkdown(topic: DSATopic): string {
  const epNum = String(topic.order).padStart(2, "0");
  const kindLabel =
    topic.kind === "data-structure"
      ? "Data Structure"
      : topic.kind === "algorithm"
      ? "Algorithmic Pattern"
      : "Data Structure + Algorithmic Pattern";

  const prereqNames =
    topic.prerequisites.length > 0
      ? topic.prerequisites
          .map((id) => TOPICS_BY_ID[id]?.shortTitle ?? id)
          .join(" -> ")
      : "None (Series Starting Point)";

  const whenToUseList = topic.whenToUse.map((item) => `- [x] ${item}`).join("\n");
  const whenNotToUseList = topic.whenNotToUse.map((item) => `- [!] ${item}`).join("\n");
  const takeawaysList = topic.notebookLM.keyTakeaways
    .map((item, idx) => `${idx + 1}. **Key Takeaway #${idx + 1}:** ${item}`)
    .join("\n");
  const stepsList = topic.notebookLM.stepByStepWalkthrough
    .map((item, idx) => `${idx + 1}. ${item}`)
    .join("\n");
  const trapsList = topic.notebookLM.interviewTraps
    .map((item) => `- **Interview Trap:** ${item}`)
    .join("\n");

  const narrativeSection = topic.notebookLM.narrativeBlocks
    .map(
      (b) => `### [${b.timestamp}] ${b.sectionTitle}
- **On-Screen Visual / Slide Cue:** ${b.visualCue}
- **Narration / Script:**
  > "${b.narration}"`
    )
    .join("\n\n");

  const problemsSection = topic.leetcodeProblems
    .map(
      (p) =>
        `| **#${p.number}. ${p.title}** | \`${p.difficulty}\` | [https://leetcode.com/problems/${p.slug}/](https://leetcode.com/problems/${p.slug}/) | ${p.patternHint} |`
    )
    .join("\n");

  return `# Episode #${epNum}: ${topic.title}
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level ${topic.level} — ${kindLabel} (\`${topic.difficulty}\`)  
> **Flowchart Node Term:** \`${topic.englishTerm}\`  
> **Recommended Prerequisites:** ${prereqNames}

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

\`\`\`text
${topic.notebookLM.customDirectionPrompt}

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("${topic.shortTitle}", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (${topic.constraintHint}) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
\`\`\`

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is ${topic.shortTitle}?
${topic.summary}

### Real-World Analogy
> **Visual Intuition:** ${topic.analogy}

### Key Takeaways to Remember
${takeawaysList}

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE ${topic.shortTitle})
${whenToUseList}

### When NOT to Use It (False Positives)
${whenNotToUseList}

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** \`${topic.constraintHint}\`
- **Average Time Complexity:** \`${topic.timeComplexity.average}\`
- **Worst-Case Time Complexity:** \`${topic.timeComplexity.worst}\`
- **Space Complexity:** \`${topic.spaceComplexity}\`
- **Engineering Note:** ${topic.timeComplexity.note}

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
${stepsList}

### Common Bugs & Edge Cases
${trapsList}

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
\`\`\`python
${topic.pythonTemplate}
\`\`\`

### TypeScript / JavaScript Template
\`\`\`typescript
${topic.typescriptTemplate}
\`\`\`

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

${narrativeSection}

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
${problemsSection}
`;
}

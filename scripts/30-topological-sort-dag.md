# Episode #30: Topological Sort & DAG Dynamic Programming
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 5 — Algorithmic Pattern (`Intermediate`)  
> **Flowchart Node Term:** `Topological Sort (Kahn's Algorithm) & DAG Dynamic Programming`  
> **Recommended Prerequisites:** Graphs -> BFS -> DFS

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Cover both Topological Sort (Kahn's Algorithm) and DAG Dynamic Programming: explain what a DAG (Directed Acyclic Graph) is, how Kahn's `in_degree` countdown resolves dependencies and catches cycles simultaneously, and why processing nodes in topological order lets you compute longest paths or critical project timelines in O(V + E).

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Topological Sort & DAG", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Prerequisites, task ordering, directed cycle detection, or DAG paths with V, E <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Topological Sort & DAG?
Linearly ordering the vertices of a **Directed Acyclic Graph (DAG)** so that for every directed edge `u -> v` (`u` is a prerequisite of `v`), `u` comes before `v`. Using **Kahn's Algorithm (BFS with `in_degree`)**, it also detects directed cycles and enables Dynamic Programming over DAGs.

### Real-World Analogy
> **Visual Intuition:** Planning your university degree curriculum: you cannot take 'Calculus II' before passing 'Calculus I'. You start by enrolling in all courses with **0 prerequisites** (`in_degree == 0`). Each time you finish a course, you cross it off as a requirement for downstream courses, unlocking new courses whose prerequisite count drops to 0.

### Key Takeaways to Remember
1. **Key Takeaway #1:** DAG stands for Directed Acyclic Graph: directed arrows with zero cycles.
2. **Key Takeaway #2:** Kahn's Algorithm tracks incoming arrows (`in_degree`): a node is ready to execute the exact moment its `in_degree` drops to 0.
3. **Key Takeaway #3:** If Kahn's queue empties while `len(order) < V`, the remaining nodes are trapped in or downstream of a cycle.
4. **Key Takeaway #4:** Processing nodes in Topological Order guarantees every predecessor `u` is finalized before `v` (enabling DP on DAGs).

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Topological Sort & DAG)
- [x] The problem involves **prerequisites, task dependencies, build order**, recipes, or precedence rules (`Course Schedule I & II`, `Alien Dictionary`).
- [x] You need to **detect a cycle in a directed graph** (if Kahn's algorithm finishes with `len(order) < N`, a cycle blocked the remaining nodes!).
- [x] **DP on a DAG**: Computing the minimum time to finish parallel tasks or the longest path in an acyclic network (`Parallel Courses III`).

### When NOT to Use It (False Positives)
- [!] Topological ordering does not exist on undirected graphs or directed graphs containing a cycle (`A -> B -> A`).

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Prerequisites, task ordering, directed cycle detection, or DAG paths with V, E <= 10^5`
- **Average Time Complexity:** `O(V + E)`
- **Worst-Case Time Complexity:** `O(V + E)`
- **Space Complexity:** `O(V + E) for `adj`, `in_degree`, and the `deque``
- **Engineering Note:** Each node enters Kahn's queue at most once when its `in_degree` hits 0, and each edge is decremented once.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Build the adjacency list `prereq -> course` and increment `in_degree[course] += 1`.
2. Push all nodes with `in_degree[i] == 0` into a queue.
3. Pop `u`, append to `order`, and decrement `in_degree[v] -= 1` for each neighbor `v`. If `in_degree[v] == 0`, enqueue `v`.
4. Verify `len(order) == N`.

### Common Bugs & Edge Cases
- **Interview Trap:** Reversing the edge direction in `[course, prereq]` without matching `in_degree`, or forgetting to check `len(order) == num_courses` when a cycle `0 -> 1 -> 0` exists.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
from collections import deque

def topological_sort_kahn(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    """
    Kahn's Algorithm (BFS with In-Degrees).
    Returns a valid topological ordering, or [] if a directed cycle exists.
    Time: O(V + E) | Space: O(V + E)
    """
    adj: list[list[int]] = [[] for _ in range(num_courses)]
    in_degree = [0] * num_courses

    for course, prereq in prerequisites:
        adj[prereq].append(course)  # prereq -> course
        in_degree[course] += 1

    # 1. Enqueue all nodes with 0 pending prerequisites (in_degree == 0)
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    order: list[int] = []

    while queue:
        u = queue.popleft()
        order.append(u)
        # 2. Completing 'u' satisfies 1 prerequisite for each dependent 'v'
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    # If all courses were processed, no cycle exists; otherwise a cycle blocked the rest
    return order if len(order) == num_courses else []
```

### TypeScript / JavaScript Template
```typescript
export function topologicalSortKahn(
  numCourses: number,
  prerequisites: number[][]
): number[] {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array<number>(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order: number[] = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }

  return order.length === numCourses ? order : [];
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] What Is a DAG? The University Prerequisite Mental Model
- **On-Screen Visual / Slide Cue:** Course dependency graph spotlighting nodes with `in_degree = 0`.
- **Narration / Script:**
  > "Whenever a problem mentions prerequisites, build order, or task dependencies, you are looking at a DAG—a Directed Acyclic Graph. And its signature algorithm is Kahn's Topological Sort."

### [01:45 - 05:00] Kahn's Algorithm: Ordering, Cycle Detection, and DP on DAGs
- **On-Screen Visual / Slide Cue:** `in_degree` counters dropping to zero and propagating maximum completion times forward.
- **Narration / Script:**
  > "Kahn's algorithm accomplishes three goals at once: it produces a valid execution order, detects impossible cycles if nodes are left behind, and sets up the exact transition order for Dynamic Programming on DAGs."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#207. Course Schedule** | `Medium` | [https://leetcode.com/problems/course-schedule/](https://leetcode.com/problems/course-schedule/) | Run Kahn's algorithm and return `len(order) == numCourses`. |
| **#210. Course Schedule II** | `Medium` | [https://leetcode.com/problems/course-schedule-ii/](https://leetcode.com/problems/course-schedule-ii/) | Return the `order` list produced by Kahn's queue (or `[]` if a cycle exists). |
| **#2050. Parallel Courses III** | `Hard` | [https://leetcode.com/problems/parallel-courses-iii/](https://leetcode.com/problems/parallel-courses-iii/) | DP on a DAG during Kahn's BFS: `finish_time[v] = max(finish_time[v], finish_time[u] + time[v])`. |

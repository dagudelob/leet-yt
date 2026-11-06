# Episode #03: Simulation (Step-by-Step State Execution)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 1 — Algorithmic Pattern (`Beginner`)  
> **Flowchart Node Term:** `Simulation`  
> **Recommended Prerequisites:** Basic DSA & Big-O

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Focus this episode on writing clean, bug-free code for Simulation problems. Teach the pro technique of clockwise 'Direction Vectors' `(dx, dy)` with `% 4` modular arithmetic to replace 20-line `if/else` blocks.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Simulation", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Explicit rules with N or steps <= 10^5) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Simulation?
Faithfully translating the rules of a process, game, or physical system into clean, bug-free code by maintaining state transitions at each step.

### Real-World Analogy
> **Visual Intuition:** Acting as the referee of a board game who follows the rulebook to the letter: roll the dice, move the token X spaces, check if it landed on an obstacle, and update the scoreboard.

### Key Takeaways to Remember
1. **Key Takeaway #1:** In simulation problems, the challenge is clean state engineering and boundary control rather than algorithmic invention.
2. **Key Takeaway #2:** Use clockwise direction arrays `dirs = [(0,1), (1,0), (0,-1), (-1,0)]` so turning right is `(d + 1) % 4`.
3. **Key Takeaway #3:** If asked to simulate 10^9 steps in a finite state space, detect the cycle and use modulo.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Simulation)
- [x] The problem describes explicit step-by-step rules (a robot turning on a grid, spiral matrix traversal, turn-based game).
- [x] You are not asked to search millions of branches for a hidden optimum, but rather compute the exact outcome of following given rules.

### When NOT to Use It (False Positives)
- [!] When the number of steps to simulate is astronomical (e.g., K = 10^12 steps); in that case, detect cycles and use modular arithmetic (`K % cycle_length`) instead of simulating one by one.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Explicit rules with N or steps <= 10^5`
- **Average Time Complexity:** `O(Steps * Cost per step)`
- **Worst-Case Time Complexity:** `O(N) to O(N^2)`
- **Space Complexity:** `O(1) or proportional to the board state`
- **Engineering Note:** If states repeat cyclically, use modulo of the period to fast-forward large K.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. Identify the minimal variables that represent the full state of the system (e.g., `x, y, d`).
2. Encode transitions using lookup tables or small helper functions.
3. Check boundary conditions before committing each move.

### Common Bugs & Edge Cases
- **Interview Trap:** Writing 16 nested `if/else` branches for turns instead of circular indexing `% 4`.
- **Interview Trap:** In JavaScript/TypeScript, forgetting that `-1 % 4` evaluates to `-1`; always use `(d + 3) % 4` for a left turn.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def robot_simulation(commands: list[str]) -> tuple[int, int]:
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
    return x, y
```

### TypeScript / JavaScript Template
```typescript
export function robotSimulation(commands: string[]): [number, number] {
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
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:30] What Makes a Problem a Simulation
- **On-Screen Visual / Slide Cue:** A robot moving on a coordinate grid with directional arrows.
- **Narration / Script:**
  > "In some interview problems, you do not need to invent a hidden algorithm—the prompt already tells you exactly what happens at every step. The real test is translating those rules without tangling your own code."

### [01:30 - 04:00] The Direction Vector Trick
- **On-Screen Visual / Slide Cue:** Compass with indices 0, 1, 2, 3 showing `(d + 1) % 4` and `(d + 3) % 4`.
- **Narration / Script:**
  > "Forget giant switch statements for North, South, East, and West. By ordering your direction vectors clockwise, turning right is always adding 1 modulo 4."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#657. Robot Return to Origin** | `Easy` | [https://leetcode.com/problems/robot-return-to-origin/](https://leetcode.com/problems/robot-return-to-origin/) | Track (x, y) coordinates applying directional unit vectors. |
| **#54. Spiral Matrix** | `Medium` | [https://leetcode.com/problems/spiral-matrix/](https://leetcode.com/problems/spiral-matrix/) | Maintain 4 shrinking boundaries (`top`, `bottom`, `left`, `right`) after each directional pass. |
| **#874. Walking Robot Simulation** | `Medium` | [https://leetcode.com/problems/walking-robot-simulation/](https://leetcode.com/problems/walking-robot-simulation/) | Clockwise direction vectors `(d + 1) % 4` paired with a Hash Set of obstacles. |

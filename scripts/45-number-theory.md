# Episode #45: Number Theory (Euclidean GCD, Sieve of Eratosthenes & Modular Arithmetic)
> **Project:** Leet-YT (Interactive DSA Flowchart + Progressive Video Curriculum)  
> **Category:** Level 7 — Algorithmic Pattern (`Advanced`)  
> **Flowchart Node Term:** `Number Theory (Euclidean GCD, Sieve of Eratosthenes & Modular Arithmetic)`  
> **Recommended Prerequisites:** Math & Geometry -> Arrays

---

## 1. Google NotebookLM Direction Prompt (Audio / Video Overview)
> **How to use:** Copy the prompt block below and paste it into the *"Customize"* field before generating the **Audio Overview** or **Video Overview** in Google NotebookLM after uploading this file as a source.

```text
Explain the 3 cornerstones of Number Theory in interviews: 1) The Euclidean Algorithm (`while b: a, b = b, a % b`) and why it is as fast as Binary Search, 2) The Sieve of Eratosthenes and why the inner loop starts at `p * p` (not `2 * p`), and 3) The rules of Modular Arithmetic (`10^9 + 7`), including Fermat's Little Theorem (`pow(b, MOD - 2, MOD)`) when dividing under a prime modulus.

Additional instructions for the NotebookLM hosts:
1. Speak in clear, energetic, and pedagogical English using standard technical interview terminology ("Number Theory", "Time Limit Exceeded", "Big-O").
2. Open with the real-world analogy from Section 2 so viewers build visual intuition before seeing a single line of code.
3. Explicitly highlight the problem statement signals ("When to Use") and the constraint hint (Primes up to N <= 5*10^6, divisibility, GCD/LCM, or answers modulo 10^9 + 7) to connect this node to the Leet-YT decision flowchart.
4. Close by naming the 3 recommended LeetCode practice problems so viewers can apply the template immediately.
```

---

## 2. Executive Summary & Intuition (NotebookLM Source Document)

### What is Number Theory?
The pillars of integers and prime numbers: 1) **Euclidean Algorithm** for Greatest Common Divisor (`GCD`) and Least Common Multiple (`LCM`) in O(log(min(a,b))), 2) **Sieve of Eratosthenes** to find all primes up to `N` in $O(N \log \log N)$, 3) **Prime Factorization in $O(\sqrt{N})$**, and 4) **Modular Arithmetic (`10^9 + 7`)**.

### Real-World Analogy
> **Visual Intuition:** The Sieve of Eratosthenes works like a layered strainer: you start at 2 and cross out all multiples of 2 (4, 6, 8...); the next uncrossed number is 3, so it is prime and you cross out its multiples starting from `3*3 = 9` onward. By the time you reach $\sqrt{N}$, every surviving uncrossed number is prime.

### Key Takeaways to Remember
1. **Key Takeaway #1:** In Euclid's algorithm, `a % b` shrinks the number by at least half every 2 steps, taking $O(\log(\min(a,b)))$.
2. **Key Takeaway #2:** In the Sieve of Eratosthenes, starting at `p * p` saves massive work because any `k * p` with `k < p` was already crossed out earlier by the smallest prime factor of `k`.
3. **Key Takeaway #3:** Under a prime modulus `MOD = 10^9 + 7`, addition and multiplication distribute `(a * b) % MOD`, but to divide by `b` you must multiply by its modular inverse `pow(b, MOD - 2, MOD)`.

---

## 3. Decision Flowchart Connection (How to Spot It in an Interview)

### Problem Statement Signals (When to USE Number Theory)
- [x] The problem asks you to return the answer **'modulo $10^9 + 7$'** (a signal that the answer grows exponentially and you must apply `% MOD` at every addition and multiplication).
- [x] Finding all prime numbers below `N` (`Count Primes`) or decomposing numbers into their prime factors (e.g., to connect numbers sharing a common factor via Union-Find).
- [x] Simplifying fractions, synchronizing periodic cycles (`LCM(a, b) = (a * b) // GCD(a, b)`), or determining whether a target volume is measurable (`Water and Jug Problem` — Bezout's Identity).

### When NOT to Use It (False Positives)
- [!] To check whether a SINGLE individual number `X` is prime, do not build the entire Sieve up to `X`: just test divisors up to `d * d <= X` in $O(\sqrt{X})$.

### Input Constraint Hint ($N$) & Big-O Complexity
- **Typical LeetCode Constraint:** `Primes up to N <= 5*10^6, divisibility, GCD/LCM, or answers modulo 10^9 + 7`
- **Average Time Complexity:** `Euclidean GCD: O(log(min(a,b))) | Sieve of Eratosthenes: O(N log log N) ~ O(N)`
- **Worst-Case Time Complexity:** `Factoring a single number X: O(sqrt(X))`
- **Space Complexity:** `O(1) for GCD | O(N) for Sieve of Eratosthenes`
- **Engineering Note:** In the Sieve of Eratosthenes, when crossing out multiples of prime `p`, always start at `p * p` because smaller multiples (`2p, 3p...`) were already crossed out by smaller primes.

---

## 4. Step-by-Step Recipe & Interview Traps

### Step-by-Step Algorithm
1. To find all primes up to `N`: use the Sieve of Eratosthenes with `p * p <= n`.
2. To factor a number `X`: test `d = 2` while `d * d <= X`, dividing `X //= d` while divisible; if `X > 1` at the end, the remaining `X` is also a prime factor.
3. For calculations modulo `10^9 + 7`: apply `% MOD` at every accumulation step.

### Common Bugs & Edge Cases
- **Interview Trap:** Doing `(a // b) % MOD` when the problem asks for the result of a division modulo `10^9 + 7` (for instance in combinatorics $nCr \pmod{10^9+7}$): once `a` has been reduced modulo `MOD`, ordinary integer division produces a completely wrong answer. Use the modular inverse `a * pow(b, MOD - 2, MOD) % MOD`.

---

## 5. Code Templates

### Python Template (Primary for Video Walkthrough)
```python
def gcd_and_lcm(a: int, b: int) -> tuple[int, int]:
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
    return is_prime
```

### TypeScript / JavaScript Template
```typescript
export function gcd(a: number, b: number): number {
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
}
```

---

## 6. Timestamped Narrative Script & Visual Cues (Teleprompter / Slides)

### [00:00 - 01:45] History's Oldest and Most Elegant Algorithm: Euclid in 3 Lines
- **On-Screen Visual / Slide Cue:** Two bars of length A and B reducing via `a % b` until finding the exact common measure.
- **Narration / Script:**
  > "Written more than two thousand three hundred years ago, the Euclidean Algorithm computes the Greatest Common Divisor of two astronomical numbers in the blink of an eye: while B is non-zero, replace A and B with B and A modulo B."

### [01:45 - 04:45] Sieve of Eratosthenes (`p * p`) and the Mystery of `10^9 + 7`
- **On-Screen Visual / Slide Cue:** Number grid crossing out multiples from `p^2` and a visual breakdown of modulo `10^9 + 7`.
- **Narration / Script:**
  > "Why do so many LeetCode problems ask for the answer modulo 1,000,000,007? Because it is the first prime number after one billion: it fits cleanly inside standard integer types without overflowing, and being prime lets us divide using the modular inverse."

---

## 7. Classic LeetCode Problems to Practice Today

| Problem | Difficulty | Direct Link | Template Application Hint |
| :--- | :---: | :--- | :--- |
| **#204. Count Primes** | `Medium` | [https://leetcode.com/problems/count-primes/](https://leetcode.com/problems/count-primes/) | Sieve of Eratosthenes crossing out from `p * p` with step `p` while `p * p < n`. |
| **#1979. Find Greatest Common Divisor of Array** | `Easy` | [https://leetcode.com/problems/find-greatest-common-divisor-of-array/](https://leetcode.com/problems/find-greatest-common-divisor-of-array/) | Apply the Euclidean algorithm between `min(nums)` and `max(nums)`. |
| **#952. Largest Component Size by Common Factor** | `Hard` | [https://leetcode.com/problems/largest-component-size-by-common-factor/](https://leetcode.com/problems/largest-component-size-by-common-factor/) | Decompose each number into its prime factors in O(sqrt(X)) and union them in a Disjoint Set Union (DSU). |

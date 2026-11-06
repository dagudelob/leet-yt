# 🎬 Episodio #45: Number Theory (Teoría de Números: GCD, Criba de Eratóstenes y Módulo)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 7 — Patrón Algorítmico (`Advanced`)  
> **Término en Inglés (Flowchart):** `Number Theory (Euclidean GCD, Sieve of Eratosthenes & Modular Arithmetic)`  
> **Prerrequisitos Recomendados:** Math & Geometry → Arrays

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica las 3 piedras angulares de Number Theory en entrevistas: 1) El Algoritmo de Euclides (`while b: a, b = b, a % b`) y por qué es tan veloz como Binary Search, 2) La Criba de Eratóstenes y por qué el bucle interno empieza en `p * p` (no en `2 * p`), y 3) Las reglas de Aritmética Modular (`10⁹ + 7`), incluyendo el Pequeño Teorema de Fermat (`pow(b, MOD - 2, MOD)`) cuando toca dividir bajo un módulo primo.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Number Theory", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Primos hasta N ≤ 5·10⁶, divisibilidad, GCD/LCM o respuestas módulo 10⁹ + 7) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Number Theory?
Los pilares de los números enteros y primos: 1) **Algoritmo de Euclides** para el Máximo Común Divisor (`GCD`) y Mínimo Común Múltiplo (`LCM`) en O(log(min(a,b))), 2) **Criba de Eratóstenes** para hallar todos los primos hasta `N` en $O(N \log \log N)$, 3) **Factorización en $O(\sqrt{N})$**, y 4) **Aritmética Modular (`10⁹ + 7`)**.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** La Criba de Eratóstenes es como un colador por capas: empiezas en el 2 y tachas todos los múltiplos de 2 (4, 6, 8...); el siguiente número sin tachar es el 3, así que es primo y tachas sus múltiplos desde `3×3 = 9` en adelante. Al llegar a $\sqrt{N}$, todos los números que sobrevivieron sin tachar son primos.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En Euclides, `a % b` reduce el número al menos a la mitad cada 2 pasos, tardando $O(\log(\min(a,b)))$.
2. **Idea Clave #2:** En la Criba de Eratóstenes, empezar en `p * p` ahorra muchísimo trabajo porque cualquier `k * p` con `k < p` ya fue tachado antes por el factor primo de `k`.
3. **Idea Clave #3:** Bajo un módulo primo `MOD = 10⁹ + 7`, la suma y la multiplicación distribuyen `(a * b) % MOD`, pero para dividir entre `b` debes multiplicar por su inverso modular `pow(b, MOD - 2, MOD)`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Number Theory)
- ✅ El enunciado pide devolver la respuesta **'modulo $10^9 + 7$'** (señal de que la respuesta crece exponencialmente y debes aplicar `% MOD` en cada suma y multiplicación).
- ✅ Encontrar todos los números primos menores a `N` (`Count Primes`) o descomponer números en sus factores primos (para conectar números con factores comunes vía Union-Find).
- ✅ Simplificar fracciones, sincronizar ciclos periódicos (`LCM(a, b) = (a * b) // GCD(a, b)`) o saber si es posible medir cierta cantidad de agua (`Water and Jug Problem` — Identidad de Bézout).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Para verificar si un SOLO número individual `X` es primo, no construyas toda la Criba hasta `X`: basta probar divisores hasta `d * d <= X` en $O(\sqrt{X})$.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Primos hasta N ≤ 5·10⁶, divisibilidad, GCD/LCM o respuestas módulo 10⁹ + 7`
- **Complejidad Temporal Promedio:** `Euclides GCD: O(log(min(a,b))) | Criba de Eratóstenes: O(N log log N) ≈ O(N)`
- **Complejidad Temporal Peor Caso:** `Factorización de un número X: O(√X)`
- **Complejidad Espacial:** `O(1) en GCD | O(N) en Criba de Eratóstenes`
- **Nota Técnica:** En la Criba de Eratóstenes, al tachar múltiplos del primo `p`, empieza siempre desde `p * p` porque los múltiplos menores (`2p, 3p...`) ya fueron tachados por primos más pequeños.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Para hallar todos los primos hasta `N`: usar Criba de Eratóstenes con `p * p <= n`.
2. Para factorizar un número `X`: probar `d = 2` mientras `d * d <= X`, dividiendo `X //= d` mientras sea divisible; si al final `X > 1`, el resto `X` también es un factor primo.
3. Para cálculos módulo `10⁹ + 7`: aplicar `% MOD` en cada acumulación.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Hacer `(a // b) % MOD` cuando el problema pide el resultado de una división módulo `10⁹ + 7` (por ejemplo en combinatoria $nCr \pmod{10^9+7}$): si `a` ya fue reducido módulo `MOD`, la división entera normal da un resultado completamente falso. Usa el inverso modular `a * pow(b, MOD - 2, MOD) % MOD`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def gcd_and_lcm(a: int, b: int) -> tuple[int, int]:
    """
    1. Algoritmo de Euclides en O(log(min(a, b))):
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
    2. Criba de Eratóstenes para identificar todos los primos en [0..n] en O(N log log N).
    """
    if n < 2:
        return [False] * (n + 1)
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    p = 2
    while p * p <= n:
        if is_prime[p]:
            # Empezamos en p * p e incrementamos de p en p
            for multiple in range(p * p, n + 1, p):
                is_prime[multiple] = False
        p += 1
    return is_prime
```

### Plantilla en TypeScript / JavaScript
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

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] El algoritmo más antiguo y elegante de la historia: Euclides en 3 líneas
- **🎬 Visual en Pantalla / Slide:** Dos barras de longitud A y B reduciéndose con `a % b` hasta hallar la medida común exacta.
- **🎙️ Narración / Guion:**
  > "Escrito hace más de dos mil trescientos años, el Algoritmo de Euclides calcula el Máximo Común Divisor de dos números gigantescos en un parpadeo: mientras B no sea cero, reemplazas A y B por B y el residuo de A entre B."

### ⏱️ [01:45 - 04:45] Criba de Eratóstenes (`p * p`) y el misterio de `10^9 + 7`
- **🎬 Visual en Pantalla / Slide:** Tablero numérico tachando múltiplos desde `p²` y explicación visual del módulo `10^9 + 7`.
- **🎙️ Narración / Guion:**
  > "¿Por qué tantos problemas de LeetCode piden devolver la respuesta módulo 1,000,000,007? Porque es el primer número primo después de mil millones: cabe perfectamente en enteros estándar sin desbordar y, al ser primo, nos permite incluso dividir usando el inverso modular."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#204. Count Primes** | `Medium` | [https://leetcode.com/problems/count-primes/](https://leetcode.com/problems/count-primes/) | Criba de Eratóstenes tachando desde `p * p` con paso `p` hasta `p * p < n`. |
| **#1979. Find Greatest Common Divisor of Array** | `Easy` | [https://leetcode.com/problems/find-greatest-common-divisor-of-array/](https://leetcode.com/problems/find-greatest-common-divisor-of-array/) | Aplica el algoritmo de Euclides entre `min(nums)` y `max(nums)`. |
| **#952. Largest Component Size by Common Factor** | `Hard` | [https://leetcode.com/problems/largest-component-size-by-common-factor/](https://leetcode.com/problems/largest-component-size-by-common-factor/) | Descompón cada número en sus factores primos en O(√X) y únelos en un Disjoint Set Union (DSU). |

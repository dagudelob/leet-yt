# 🎬 Episodio #36: Dynamic Programming (DP Bottom-Up y Patrones Clásicos)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 6 — Patrón Algorítmico (`Advanced`)  
> **Término en Inglés (Flowchart):** `Bottom-Up Dynamic Programming (1D, 2D, Knapsack, LCS, LIS)`  
> **Prerrequisitos Recomendados:** Memoization (Top-Down DP) → Arrays → Matrices / Grids 2D

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Estructura este episodio como la guía definitiva de las 4 grandes familias de Programación Dinámica Bottom-Up: 1) DP Lineal 1D (`House Robber`), 2) Mochila / Knapsack (`Coin Change`, `Partition Equal Subset Sum`), 3) DP de Dos Secuencias (`Longest Common Subsequence`, `Edit Distance`), y 4) LIS (`Longest Increasing Subsequence`). Enseña la receta de 4 pasos: Definición de `dp[i]`, Caso Base, Ecuación de Transición y Orden de Llenado.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Dynamic Programming", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones ('Min/Max/Number of ways' con subproblemas superpuestos y N ≤ 10³ - 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Dynamic Programming?
Construir la solución óptima de abajo hacia arriba (Bottom-Up) llenando iterativamente una tabla `dp` desde los casos más pequeños hasta `N`, sin usar recursión y permitiendo **optimizar la memoria** (ej. de una tabla `O(N)` a solo 2 variables `O(1)`, o de `O(N × M)` a una sola fila `O(M)`).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Subir una escalera construyendo cada escalón apoyándote firmemente en los dos escalones anteriores que ya dejaste terminados. Como para construir el escalón #10 solo necesitas apoyarte en el #9 y el #8, ni siquiera necesitas guardar los escalones del #1 al #7 en memoria.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Antes de escribir un bucle de DP, escribe en un comentario en español qué significa exactamente `dp[i]` o `dp[i][j]`.
2. **Idea Clave #2:** En 0/1 Knapsack (cada objeto se usa máximo 1 vez), si optimizas a un arreglo 1D debes recorrer la capacidad **hacia atrás** (`for w in range(target, num - 1, -1)`) para no reutilizar el mismo objeto dos veces.
3. **Idea Clave #3:** En DP de dos strings (`LCS`, `Edit Distance`), agregar una fila 0 y columna 0 para el string vacío elimina todos los `if` de bordes.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Dynamic Programming)
- ✅ **DP 1D Lineal / Secuencias**: `House Robber`, `Coin Change`, `Decode Ways`, `Longest Increasing Subsequence (LIS)`.
- ✅ **DP de Mochila (0/1 Knapsack & Unbounded Knapsack)**: `Partition Equal Subset Sum`, `Coin Change I & II`.
- ✅ **DP 2D en Grids o Dos Strings**: `Unique Paths`, `Minimum Path Sum`, `Longest Common Subsequence (LCS)`, `Edit Distance`.
- ✅ **DP de Intervalos**: `Burst Balloons`, `Longest Palindromic Subsequence`.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si el problema pide devolver TODAS las listas detalladas de soluciones posibles y el tamaño de salida es exponencial (ahí usa Backtracking).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `'Min/Max/Number of ways' con subproblemas superpuestos y N ≤ 10³ - 10⁵`
- **Complejidad Temporal Promedio:** `1D: O(N) o O(N·K) | 2D / Knapsack / LCS: O(N × M)`
- **Complejidad Temporal Peor Caso:** `Polinomial según dimensiones de la tabla `dp``
- **Complejidad Espacial:** `O(N) o O(N × M), optimizable a O(1) u O(M) con Rolling Array`
- **Nota Técnica:** Si `dp[i]` solo depende de `dp[i-1]` y `dp[i-2]`, puedes reducir el espacio a O(1).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. 1. Definir el significado exacto de `dp[i]`.
2. 2. Inicializar la tabla con el valor neutro (`0` para conteo/máximo, `inf` para mínimo) y fijar el caso base (`dp[0]`).
3. 3. Escribir la ecuación de recurrencia mirando qué estados previos alimentan al estado actual.
4. 4. (Bonus en entrevista) Si solo miras la fila anterior, reducir el espacio con dos filas `prev` y `curr`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En 0/1 Knapsack con arreglo 1D, iterar la capacidad de izquierda a derecha en vez de derecha a izquierda: de izquierda a derecha convierte el problema por accidente en Unbounded Knapsack (usando el mismo elemento múltiples veces).

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def coin_change_bottom_up(coins: list[int], amount: int) -> int:
    """
    Patrón 1: Unbounded Knapsack (Coin Change) en DP 1D.
    dp[a] = mínimo número de monedas para sumar exactamente la cantidad 'a'.
    Tiempo: O(amount * len(coins)) | Espacio: O(amount)
    """
    INF = amount + 1
    dp = [INF] * (amount + 1)
    dp[0] = 0  # Caso base: 0 monedas para sumar 0

    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])

    return dp[amount] if dp[amount] != INF else -1


def longest_common_subsequence(text1: str, text2: str) -> int:
    """
    Patrón 2: DP 2D sobre Dos Strings (LCS).
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = 1 + dp[i - 1][j - 1]
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]
```

### Plantilla en TypeScript / JavaScript
```typescript
export function coinChangeBottomUp(coins: number[], amount: number): number {
  const INF = amount + 1;
  const dp = new Array<number>(amount + 1).fill(INF);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const c of coins) {
      if (a - c >= 0) {
        dp[a] = Math.min(dp[a], 1 + dp[a - c]);
      }
    }
  }
  return dp[amount] === INF ? -1 : dp[amount];
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 02:00] De Top-Down a Bottom-Up: Llenando la tabla desde los cimientos
- **🎬 Visual en Pantalla / Slide:** Transformación de las flechas recursivas de Memoization en una tabla que se llena de izquierda a derecha.
- **🎙️ Narración / Guion:**
  > "Ya sabemos que Memoization resuelve DP de arriba hacia abajo. Ahora daremos el paso profesional: llenar la tabla directamente desde el caso base hacia arriba, eliminando la recursión y abriendo la puerta a reducir la memoria a O(1)."

### ⏱️ [02:00 - 05:30] Las 4 Familias Clásicas: Lineal, Knapsack, LCS y LIS
- **🎬 Visual en Pantalla / Slide:** Cuatro cuadrantes visuales mostrando las transiciones de flechas de cada familia de DP.
- **🎙️ Narración / Guion:**
  > "El 90% de los problemas de Programación Dinámica en entrevistas pertenecen a una de cuatro familias: secuencias 1D, problemas de mochila como Coin Change, alineación de dos strings como LCS, o subsecuencias crecientes como LIS."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#322. Coin Change** | `Medium` | [https://leetcode.com/problems/coin-change/](https://leetcode.com/problems/coin-change/) | `dp[a] = min(dp[a], 1 + dp[a - coin])` con `dp[0] = 0`. |
| **#1143. Longest Common Subsequence** | `Medium` | [https://leetcode.com/problems/longest-common-subsequence/](https://leetcode.com/problems/longest-common-subsequence/) | Tabla `(M+1) × (N+1)`: si las letras coinciden suma `1 + diagonal`; si no, `max(arriba, izquierda)`. |
| **#300. Longest Increasing Subsequence** | `Medium` | [https://leetcode.com/problems/longest-increasing-subsequence/](https://leetcode.com/problems/longest-increasing-subsequence/) | DP clásica O(N²) `dp[i] = max(1 + dp[j])` u optimizada con Binary Search (Patience Sorting) en O(N log N). |

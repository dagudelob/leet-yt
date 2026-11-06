# 🎬 Episodio #35: Memoization (Programación Dinámica Top-Down)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 6 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Memoization / Top-Down Dynamic Programming`  
> **Prerrequisitos Recomendados:** Divide & Conquer → Binary Trees → Hash Table → Backtracking

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Quítale todo el miedo a la Programación Dinámica: explica que Memoization NO es más que una función recursiva normal (`dfs`) a la que le pones una libreta de notas (`memo` o `@cache` en Python). Muestra visualmente cómo el árbol exponencial de `Climbing Stairs` o `House Robber` se poda hasta convertirse en una línea recta O(N).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Memoization (Top-Down DP)", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Decisiones recursivas con estados repetidos (N ≤ 10³ para 2D, N ≤ 10⁵ para 1D)) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Memoization (Top-Down DP)?
La forma más natural e intuitiva de dominar la Programación Dinámica: escribes primero la solución recursiva de decisiones (como en DFS/Backtracking) y le agregas una **caché (`memo` o `@cache`)** para que cada subproblema único se calcule **una sola vez** y luego se responda en O(1).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Si alguien te pregunta cuánto es `347 × 89`, haces la cuenta en un papel y te toma 30 segundos, pero anotas el resultado en un post-it. Si cinco minutos después te vuelven a preguntar `347 × 89`, no vuelves a multiplicar: miras tu post-it y respondes en medio segundo.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Ecuación fundamental: `Backtracking (fuerza bruta recursiva) + Caché de estados = Memoization (Top-Down DP)`.
2. **Idea Clave #2:** El 'Estado' son únicamente los parámetros que cambian de una llamada recursiva a otra (ej. `i`, o `(i, capacidad_restante)`).
3. **Idea Clave #3:** En Python 3.9+, el decorador `@functools.cache` convierte cualquier función recursiva pura en Programación Dinámica Top-Down en 1 sola línea.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Memoization (Top-Down DP))
- ✅ El problema pide el **máximo, mínimo o número total de formas** de hacer algo, y al dibujar el árbol de decisiones ves que **el mismo estado se repite por distintos caminos** (Subproblemas Superpuestos).
- ✅ Cuando no todos los estados posibles son alcanzables o cuando el orden de transición es complejo de ordenar iterativamente.
- ✅ Como primer paso en cualquier problema de DP antes de (opcionalmente) pasarlo a una tabla Bottom-Up.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si la profundidad de recursión supera el límite de la pila en lenguajes con stack pequeño o necesitas optimizar el espacio de O(N) a O(1) (ahí traduce tu Memoization a DP Bottom-Up).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Decisiones recursivas con estados repetidos (N ≤ 10³ para 2D, N ≤ 10⁵ para 1D)`
- **Complejidad Temporal Promedio:** `O(Número de Estados Únicos × Costo de Transición por Estado)`
- **Complejidad Temporal Peor Caso:** `Polinomial (pasa de O(2ᴺ) a O(N) u O(N²))`
- **Complejidad Espacial:** `O(Estados Únicos) en el diccionario `memo` + O(Profundidad) en Call Stack`
- **Nota Técnica:** Fórmula universal para calcular el Big-O de cualquier Memoization: `(Estados posibles de los argumentos) × (Trabajo dentro de 1 llamada sin contar la recursión)`.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Identificar qué decisiones tomas en cada paso (ej. tomar o saltar el elemento `i`) y qué variables definen el Estado.
2. Escribir la función recursiva `dfs(estado)` con sus casos base.
3. Agregar un diccionario `memo` (o `@cache`): si `estado in memo`, retornar `memo[estado]` inmediatamente antes de calcular.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Pasar listas mutables o variables innecesarias como argumentos de `dfs(...)`, haciendo que el estado no sea hasheable o que el número de estados explote.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
from functools import cache

def house_robber_memo(nums: list[int]) -> int:
    """
    Plantilla Universal de Memoization (Top-Down DP).
    En cada casa 'i' tenemos 2 decisiones:
      1) Saltar la casa 'i' -> dfs(i + 1)
      2) Robar la casa 'i'  -> nums[i] + dfs(i + 2)
    Sin @cache: O(2^N) | Con @cache: O(N) tiempo y O(N) espacio.
    """
    n = len(nums)

    @cache
    def dfs(i: int) -> int:
        if i >= n:
            return 0
        skip = dfs(i + 1)
        take = nums[i] + dfs(i + 2)
        return max(skip, take)

    return dfs(0)
```

### Plantilla en TypeScript / JavaScript
```typescript
export function houseRobberMemo(nums: number[]): number {
  const memo = new Map<number, number>();

  function dfs(i: number): number {
    if (i >= nums.length) return 0;
    if (memo.has(i)) return memo.get(i)!;

    const ans = Math.max(dfs(i + 1), nums[i] + dfs(i + 2));
    memo.set(i, ans);
    return ans;
  }

  return dfs(0);
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 02:00] Desmitificando DP: Solo es Recursión con Memoria
- **🎬 Visual en Pantalla / Slide:** Árbol de Fibonacci donde todas las ramas repetidas se iluminan en verde y se leen en O(1) de una tabla.
- **🎙️ Narración / Guion:**
  > "Si ya entiendes recursión en árboles y Backtracking, ya sabes el 90% de Programación Dinámica. El único problema de la recursión pura es que tiene amnesia: resuelve el mismo subproblema miles de veces. Memoization le regala una libreta de apuntes."

### ⏱️ [02:00 - 04:45] Cómo definir el Estado y calcular la complejidad en 5 segundos
- **🎬 Visual en Pantalla / Slide:** Fórmula en pantalla: Complejidad = (# Estados Únicos) × (Costo por Transición).
- **🎙️ Narración / Guion:**
  > "Para saber cuánto tarda tu solución con Memoization ni siquiera tienes que dibujar el árbol: cuenta cuántos valores posibles pueden tomar los parámetros de tu función y multiplícalo por el trabajo interno de una llamada."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#70. Climbing Stairs** | `Easy` | [https://leetcode.com/problems/climbing-stairs/](https://leetcode.com/problems/climbing-stairs/) | `dfs(i) = dfs(i + 1) + dfs(i + 2)` con `memo`: poda el árbol de Fibonacci de O(2ᴺ) a O(N). |
| **#198. House Robber** | `Medium` | [https://leetcode.com/problems/house-robber/](https://leetcode.com/problems/house-robber/) | Decisión binaria en cada índice: `max(dfs(i + 1), nums[i] + dfs(i + 2))`. |
| **#494. Target Sum** | `Medium` | [https://leetcode.com/problems/target-sum/](https://leetcode.com/problems/target-sum/) | Estado de 2 variables `dfs(i, current_sum)` memoizado en diccionario `(i, current_sum)`. |

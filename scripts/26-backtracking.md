# 🎬 Episodio #26: Backtracking (Búsqueda Exhaustiva con Poda)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 4 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Backtracking (Subsets, Permutations & Pruning)`  
> **Prerrequisitos Recomendados:** DFS → Binary Trees

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Enseña el mantra de los 3 pasos del Backtracking ('Elegir, Explorar, Deshacer') y muestra cómo la misma plantilla resuelve los 3 grandes problemas cambiando una sola línea: 1) Subsets (`backtrack(i + 1)`), 2) Combination Sum con repetición (`backtrack(i)`), y 3) Permutations (usando un arreglo `used[i]`). Advierte sobre el bug clásico de hacer `res.append(path)` sin copiar `path[:]`.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Backtracking", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones ('Return all possible...' con N ≤ 20) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Backtracking?
Un DFS sobre un árbol de decisiones implícito que construye una solución paso a paso y sigue el mantra de 3 tiempos: **1) Elegir (`append`) -> 2) Explorar (`backtrack`) -> 3) Deshacer la elección (`pop`)**, podando de raíz las ramas que ya violan las reglas.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Resolver un Sudoku con lápiz y borrador: escribes un 5 en una casilla (Elegir), intentas llenar las siguientes casillas (Explorar), y si llegas a una contradicción donde ningún número cabe, borras ese 5 (Deshacer / Backtrack) y pruebas con un 6.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** El mantra del Backtracking: `path.append(x)` -> `backtrack(...)` -> `path.pop()`.
2. **Idea Clave #2:** Diferencia clave: en Combinaciones/Subconjuntos el orden NO importa (usamos `start_idx` para mirar solo hacia adelante); en Permutaciones el orden SÍ importa (miramos desde 0 usando un marcador `used`).
3. **Idea Clave #3:** La Poda (Pruning) corta una rama entera antes de entrar en ella si la suma ya se pasó del objetivo o una reina ya es atacada.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Backtracking)
- ✅ El problema pide **GENERAR TODAS** las combinaciones, subconjuntos (`Subsets`), permutaciones (`Permutations`), particiones de palíndromos o tableros válidos (`N-Queens`, `Sudoku Solver`).
- ✅ Las restricciones son pequeñas (`N ≤ 15` o `N ≤ 20`), señal inequívoca de complejidad exponencial $O(2^N)$ u $O(N!)$.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si el problema NO pide listar todas las configuraciones sino solo **CONTAR cuántas hay** o **hallar el valor máximo/mínimo** con `N ≥ 100`: ahí no enumeres una por una con Backtracking; usa **Dynamic Programming**.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `'Return all possible...' con N ≤ 20`
- **Complejidad Temporal Promedio:** `Subconjuntos: O(N · 2ᴺ) | Permutaciones: O(N · N!)`
- **Complejidad Temporal Peor Caso:** `Exponencial o Factorial (reducido drásticamente en la práctica gracias a la Poda / Pruning)`
- **Complejidad Espacial:** `O(N) profundidad de la pila de recursión y de la lista `path` actual`
- **Nota Técnica:** Al guardar un resultado en `res`, debes guardar una COPIA (`path[:]`), nunca la referencia a la misma lista mutable.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Definir el estado parcial `path` que se modifica in-place a medida que bajamos y subimos por el árbol.
2. En el caso base (cuando `path` es una solución completa), hacer `res.append(path[:])`.
3. En el bucle de opciones, verificar si la opción es válida (Poda), hacer `append`, llamar recursivamente y hacer `pop`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Hacer `res.append(path)` en vez de `res.append(path[:])` (o `[...path]` en JS): como `path` se vacía al final con `pop()`, terminarás con una lista llena de listas vacías `[[], [], []]`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def subsets_backtracking(nums: list[int]) -> list[list[int]]:
    """
    Plantilla Universal de Backtracking: Elegir -> Explorar -> Deshacer.
    Genera los 2^N subconjuntos de 'nums'.
    """
    res: list[list[int]] = []
    path: list[int] = []

    def backtrack(start_idx: int) -> None:
        # 1. Guardar una COPIA de la configuración actual
        res.append(path[:])

        # 2. Probar cada candidato disponible desde start_idx
        for i in range(start_idx, len(nums)):
            path.append(nums[i])      # A) ELEGIR (Choose)
            backtrack(i + 1)          # B) EXPLORAR (Explore)
            path.pop()                # C) DESHACER (Unchoose / Backtrack)

    backtrack(0)
    return res
```

### Plantilla en TypeScript / JavaScript
```typescript
export function subsetsBacktracking(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];

  function backtrack(startIdx: number): void {
    res.push([...path]); // Copia de la solución actual

    for (let i = startIdx; i < nums.length; i++) {
      path.push(nums[i]);     // 1. Elegir
      backtrack(i + 1);       // 2. Explorar
      path.pop();             // 3. Deshacer
    }
  }

  backtrack(0);
  return res;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Elegir, Explorar y Deshacer: El ritmo del Backtracking
- **🎬 Visual en Pantalla / Slide:** Árbol de decisiones donde una lista `path` agrega un elemento al bajar y hace `pop()` al subir.
- **🎙️ Narración / Guion:**
  > "Cuando el problema te pide encontrar TODAS las combinaciones o permutaciones posibles, estás ante un árbol de decisiones. Backtracking recorre ese árbol usando una sola lista compartida gracias a su ritmo de tres pasos: elegir, explorar y deshacer."

### ⏱️ [01:45 - 04:45] Subsets vs Combination Sum vs Permutations y el bug de `path[:]`
- **🎬 Visual en Pantalla / Slide:** Tres bloques de código casi idénticos resaltando la única línea que cambia entre los tres.
- **🎙️ Narración / Guion:**
  > "No necesitas aprender veinte códigos distintos. Si entiendes la diferencia entre avanzar con `start_idx` para combinaciones y usar un booleano `used` para permutaciones, dominas toda la familia."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#78. Subsets** | `Medium` | [https://leetcode.com/problems/subsets/](https://leetcode.com/problems/subsets/) | En cada nodo del árbol guarda `path[:]` y explora candidatos con índice `i >= start_idx`. |
| **#46. Permutations** | `Medium` | [https://leetcode.com/problems/permutations/](https://leetcode.com/problems/permutations/) | El orden sí importa: itera sobre todos los elementos usando un conjunto/arreglo `used` para no repetir el mismo índice. |
| **#39. Combination Sum** | `Medium` | [https://leetcode.com/problems/combination-sum/](https://leetcode.com/problems/combination-sum/) | Como puedes reutilizar el mismo número, llama a `backtrack(i, rem - nums[i])` sin sumar 1 al índice `i`. |

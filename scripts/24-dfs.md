# 🎬 Episodio #24: DFS - Depth-First Search (Búsqueda en Profundidad)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 4 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Depth-First Search (Trees, Grids & Graphs)`  
> **Prerrequisitos Recomendados:** Binary Trees → Matrices / Grids 2D → Stacks (LIFO)

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo funciona DFS tanto en Árboles (donde no hace falta `visited` porque no hay ciclos) como en Grafos y Grids 2D (donde marcar `visited` ANTES de explorar vecinos es obligatorio para no caer en un bucle infinito). Usa el ejemplo visual de 'Number of Islands' (Flood Fill).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "DFS", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Islas, componentes conexas, caminos en árboles/grafos con V, E ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es DFS?
Explorar un camino hasta llegar lo más profundo posible antes de retroceder y probar otra bifurcación. Es el algoritmo estándar para contar componentes conexas (islas), verificar conectividad, detectar ciclos y recorrer árboles.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Explorar un laberinto con un ovillo de hilo (como Teseo y el Minotauro): avanzas siempre por el primer pasillo disponible hasta topar con una pared sin salida; entonces rebobinas el hilo hasta la última intersección que tenía una puerta sin explorar y entras por ahí.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En árboles no hay ciclos, pero en Grafos y Matrices 2D SIEMPRE debes marcar el nodo como visitado apenas entras a `dfs(u)`.
2. **Idea Clave #2:** DFS es más corto de programar que BFS porque usa la propia recursión del lenguaje como pila.
3. **Idea Clave #3:** Para contar el tamaño de una región, haz que `dfs` devuelva `1 + sum(dfs(vecino))`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR DFS)
- ✅ Recorrer todos los nodos de un árbol, cuadrícula 2D o grafo para contar componentes conexas (`Number of Islands`, `Max Area of Island`).
- ✅ Verificar si existe algún camino de `A` a `B`, clonar un grafo o detectar ciclos.
- ✅ Calcular propiedades de subárboles o caminos de la raíz a las hojas (`Path Sum`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Cuando necesitas encontrar el **camino MÁS CORTO** en un grafo o cuadrícula sin pesos: DFS puede encontrar primero un camino larguísimo que da mil vueltas; para camino más corto sin pesos usa siempre **BFS**.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Islas, componentes conexas, caminos en árboles/grafos con V, E ≤ 10⁵`
- **Complejidad Temporal Promedio:** `O(V + E) en grafos | O(R × C) en cuadrículas`
- **Complejidad Temporal Peor Caso:** `O(V + E)`
- **Complejidad Espacial:** `O(V) para el conjunto `visited` y la pila de recursión`
- **Nota Técnica:** Con un conjunto `visited`, cada nodo y arista se procesa una constante de veces.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Verificar primero el caso base (fuera de límites, obstáculo o nodo ya visitado).
2. Marcar inmediatamente el nodo actual como visitado (`visited.add(u)` o `grid[r][c] = '0'`).
3. Iterar sobre todos los vecinos y llamar recursivamente a `dfs(vecino)`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Olvidar marcar un nodo como visitado en un grafo con ciclos, provocando `Maximum Call Stack Size Exceeded` en milisegundos.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def num_islands_dfs(grid: list[list[str]]) -> int:
    """
    Plantilla Clásica de DFS en Cuadrícula 2D (Flood Fill / Hundir Islas).
    Tiempo: O(R * C) | Espacio: O(R * C) en call stack
    """
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])

    def dfs(r: int, c: int) -> None:
        # Caso base: fuera de límites o ya es agua ('0')
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == "0":
            return
        # Marcamos como visitado convirtiendo tierra '1' en agua '0'
        grid[r][c] = "0"
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            dfs(r + dr, c + dc)

    islands = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                islands += 1
                dfs(r, c)
    return islands
```

### Plantilla en TypeScript / JavaScript
```typescript
export function numIslandsDFS(grid: string[][]): number {
  if (grid.length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") {
      return;
    }
    grid[r][c] = "0"; // Marcar como visitado
    dfs(r - 1, c);
    dfs(r + 1, c);
    dfs(r, c - 1);
    dfs(r, c + 1);
  }

  let islands = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        dfs(r, c);
      }
    }
  }
  return islands;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Teseo en el laberinto: Cómo piensa Depth-First Search
- **🎬 Visual en Pantalla / Slide:** Un rastro de luz penetrando hasta el fondo de una rama antes de retroceder.
- **🎙️ Narración / Guion:**
  > "Depth-First Search tiene una personalidad decidida: elige una dirección y avanza sin detenerse hasta tocar fondo. Solo cuando ya no puede avanzar más, da un paso atrás y prueba la siguiente puerta."

### ⏱️ [01:45 - 04:30] Flood Fill en Matrices: Hundiendo islas en O(R × C)
- **🎬 Visual en Pantalla / Slide:** Mapa de 1s y 0s donde tocar un 1 propaga una onda que apaga toda la isla conectada.
- **🎙️ Narración / Guion:**
  > "En 'Number of Islands', cada vez que encontramos una celda de tierra sumamos una isla al contador y lanzamos DFS como un bote de pintura que marca toda esa isla como visitada para no contarla dos veces."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#200. Number of Islands** | `Medium` | [https://leetcode.com/problems/number-of-islands/](https://leetcode.com/problems/number-of-islands/) | Recorre la matriz; al ver un `'1'`, suma 1 isla y lanza DFS para 'hundir' toda la tierra conectada. |
| **#695. Max Area of Island** | `Medium` | [https://leetcode.com/problems/max-area-of-island/](https://leetcode.com/problems/max-area-of-island/) | Haz que `dfs(r, c)` retorne `1 + suma(dfs de los 4 vecinos)`. |
| **#133. Clone Graph** | `Medium` | [https://leetcode.com/problems/clone-graph/](https://leetcode.com/problems/clone-graph/) | Usa un diccionario `{nodo_original: nodo_clonado}` que actúa a la vez como `visited` y mapa de copias. |

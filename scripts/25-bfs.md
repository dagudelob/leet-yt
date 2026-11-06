# 🎬 Episodio #25: BFS - Breadth-First Search (Búsqueda en Anchura)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 4 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Breadth-First Search (Level Order & Shortest Path)`  
> **Prerrequisitos Recomendados:** Queues & Deques → Binary Trees → Matrices / Grids 2D

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Enfatiza las 3 joyas de BFS: 1) El patrón `for _ in range(len(queue)):` para procesar piso por piso y contar la distancia exacta, 2) La regla vital de marcar `visited` AL ENCOLAR (y no al sacar de la cola, lo cual causaría duplicados masivos y TLE), y 3) El patrón 'Multi-Source BFS' (`Rotting Oranges`) metiendo todos los focos iniciales en la cola en el minuto 0.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "BFS", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones ('Mínimo número de pasos', 'Recorrido por niveles' o propagación simultánea) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es BFS?
Explorar por capas concéntricas (primero todos los nodos a distancia 1, luego todos los de distancia 2, luego distancia 3...) usando una Cola FIFO (`deque`). Garantiza encontrar el **camino más corto** en cualquier grafo o tablero sin pesos.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Dejar caer una piedra en un estanque tranquilo: la onda circular se expande uniformemente en todas direcciones a la misma velocidad. El primer instante en que la onda toca la orilla destino es, por ley física, el camino más corto posible.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Si el problema dice 'mínimo número de pasos/movimientos' y cada paso cuesta 1, la respuesta inmediata en el Flowchart es BFS.
2. **Idea Clave #2:** El truco `level_size = len(queue)` toma una fotografía de cuántos nodos hay en la capa actual antes de que se mezclen con sus hijos.
3. **Idea Clave #3:** Marcar `visited.add(vecino)` justo antes de `queue.append(vecino)` es obligatorio para evitar que varios nodos encolen al mismo vecino repetidas veces.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR BFS)
- ✅ Encontrar la **distancia mínima** o el **menor número de pasos/movimientos** desde un origen hasta un destino en un grafo o matriz sin pesos (`Shortest Path in Binary Matrix`, `Word Ladder`).
- ✅ Recorrer un árbol binario nivel por nivel (`Binary Tree Level Order Traversal`, `Right Side View`).
- ✅ **Multi-Source BFS**: Cuando el fenómeno se propaga simultáneamente desde MÚLTIPLES orígenes al mismo tiempo (`Rotting Oranges`, `01 Matrix`) — simplemente metes todos los orígenes iniciales en la cola en el segundo 0.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si las aristas tienen PESOS DISTINTOS (ej. calles con peajes de costo 1, 5, 20): BFS normal ya no garantiza el camino más barato; necesitas el **Algoritmo de Dijkstra**.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `'Mínimo número de pasos', 'Recorrido por niveles' o propagación simultánea`
- **Complejidad Temporal Promedio:** `O(V + E) en grafos | O(R × C) en cuadrículas`
- **Complejidad Temporal Peor Caso:** `O(V + E)`
- **Complejidad Espacial:** `O(V) para la cola `deque` y el conjunto `visited``
- **Nota Técnica:** Marcar `visited` en el instante de ENCOLAR (`append`) evita meter el mismo nodo duplicado múltiples veces en la cola.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Inicializar `queue = deque([origenes])` y `visited = set(origenes)`.
2. Mientras la cola no esté vacía, medir `level_size = len(queue)` e iterar esa cantidad de veces.
3. Para cada vecino válido no visitado, agregarlo a `visited` y luego a `queue`.
4. Al terminar el bucle del nivel, incrementar `steps += 1`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Marcar `visited.add(u)` recién cuando haces `u = queue.popleft()`: en una cuadrícula, eso hace que la misma celda se agregue muchas veces a la cola desde distintos vecinos y explote la memoria y el tiempo.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
from collections import deque

def bfs_shortest_path_grid(grid: list[list[int]], start: tuple[int, int], target: tuple[int, int]) -> int:
    """
    Plantilla Universal de BFS por Niveles (Camino Más Corto en Tablero Sin Pesos).
    REGLA DE ORO: Marcar como visitado AL ENCOLAR (antes de meter a deque), no al desencolar.
    """
    rows, cols = len(grid), len(grid[0])
    queue = deque([start])
    visited = {start}
    steps = 0

    while queue:
        # Procesamos exactamente todos los nodos del nivel actual
        level_size = len(queue)
        for _ in range(level_size):
            r, c = queue.popleft()
            if (r, c) == target:
                return steps

            for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                nr, nc = r + dr, c + dc
                if (
                    0 <= nr < rows
                    and 0 <= nc < cols
                    and grid[nr][nc] == 0
                    and (nr, nc) not in visited
                ):
                    visited.add((nr, nc))  # ¡Marcar AL ENCOLAR!
                    queue.append((nr, nc))
        steps += 1

    return -1
```

### Plantilla en TypeScript / JavaScript
```typescript
export function bfsLevelOrder(
  adj: number[][],
  start: number,
  target: number
): number {
  const visited = new Set<number>([start]);
  let queue: number[] = [start];
  let steps = 0;

  while (queue.length > 0) {
    const nextQueue: number[] = [];
    for (const u of queue) {
      if (u === target) return steps;
      for (const v of adj[u]) {
        if (!visited.has(v)) {
          visited.add(v); // Marcar al encolar
          nextQueue.push(v);
        }
      }
    }
    queue = nextQueue;
    steps++;
  }
  return -1;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] La onda en el estanque: Por qué BFS garantiza el camino más corto
- **🎬 Visual en Pantalla / Slide:** Ondas concéntricas de distancia 1, 2, 3 expandiéndose desde el origen hasta tocar la meta.
- **🎙️ Narración / Guion:**
  > "Si necesitas el camino más corto en un laberinto donde cada paso vale uno, DFS es una mala idea porque puede irse por un pasillo larguísimo. BFS avanza como una ola circular: explora primero todo lo que está a 1 paso, luego todo lo que está a 2 pasos."

### ⏱️ [01:45 - 04:45] Multi-Source BFS y la Regla de Oro de `visited`
- **🎬 Visual en Pantalla / Slide:** Múltiples naranjas podridas expandiendo ondas simultáneas en el minuto 1, 2 y 3.
- **🎙️ Narración / Guion:**
  > "¿Y qué pasa cuando tienes múltiples puntos de inicio al mismo tiempo, como en Rotting Oranges? No lances varios BFS separados: mete todos los orígenes juntos en la cola inicial y deja que las olas avancen sincronizadas."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#102. Binary Tree Level Order Traversal** | `Medium` | [https://leetcode.com/problems/binary-tree-level-order-traversal/](https://leetcode.com/problems/binary-tree-level-order-traversal/) | Usa `for _ in range(len(queue)):` para agrupar exactamente los nodos de cada piso. |
| **#994. Rotting Oranges** | `Medium` | [https://leetcode.com/problems/rotting-oranges/](https://leetcode.com/problems/rotting-oranges/) | Multi-Source BFS: mete TODAS las naranjas podridas iniciales en la cola antes de empezar el `while`. |
| **#127. Word Ladder** | `Hard` | [https://leetcode.com/problems/word-ladder/](https://leetcode.com/problems/word-ladder/) | Cada palabra es un nodo; dos palabras tienen arista si difieren en 1 sola letra. Busca el camino más corto con BFS. |

# 🎬 Episodio #31: Dijkstra & Shortest Paths (Caminos Más Cortos con Pesos)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 5 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Dijkstra's Algorithm & Weighted Shortest Paths`  
> **Prerrequisitos Recomendados:** Graphs → BFS → Heaps (Priority Queue)

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Muestra que Dijkstra NO es un algoritmo difícil de memorizar: es literalmente el mismo código de BFS cambiando `deque` por `heapq` y el conjunto `visited` por un arreglo `dist` inicializado en infinito. Destaca la línea `if d > dist[u]: continue` (Lazy Deletion) que evita reprocesar nodos obsoletos, y cómo cambiar `+` por `max()` en la relajación resuelve problemas minimax como 'Path With Minimum Effort'.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Dijkstra", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Camino más barato/rápido con pesos w ≥ 0 y V, E ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Dijkstra?
Encontrar la ruta de **menor costo total** desde un origen hacia todos los demás nodos en un grafo con pesos **no negativos** (`w >= 0`). Es exactamente un BFS donde reemplazamos la cola FIFO normal por un **Min-Heap (Priority Queue)** ordenado por distancia acumulada.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Si BFS es una onda de agua que avanza a la misma velocidad por todos lados, Dijkstra es agua avanzando por tuberías de distinta longitud: el agua llega primero a la intersección cuya suma de tramos sea más corta. Usar un Min-Heap nos dice siempre a qué intersección acaba de llegar el agua primero.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En las tuplas del Min-Heap, pon SIEMPRE la distancia primero `(dist_acumulada, nodo)` para que `heapq` ordene por menor distancia.
2. **Idea Clave #2:** La operación `if d + w < dist[v]: dist[v] = d + w` se llama Relajación de Arista (Edge Relaxation).
3. **Idea Clave #3:** La línea `if d > dist[u]: continue` descarta entradas viejas del Heap sin necesidad de implementar `decrease_key`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Dijkstra)
- ✅ El problema pide el **camino más corto / más barato / más rápido / de menor esfuerzo** en un grafo o matriz donde cada arista tiene un costo o peso positivo (`w >= 0`).
- ✅ **0-1 BFS (optimización con Deque)**: Si los pesos son únicamente `0` y `1`, al cruzar una arista de peso `0` haces `appendleft` y con peso `1` haces `append` en O(V + E).
- ✅ **Bellman-Ford**: Cuando existen pesos **negativos** o hay un límite de a lo sumo `K` escalas (`Cheapest Flights Within K Stops`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ ¡NUNCA uses Dijkstra si hay aristas con pesos NEGATIVOS (especialmente ciclos negativos)! Dijkstra asume que una vez que sacas el mínimo del Heap ningún camino futuro podrá ser más barato gracias a que sumar pesos >= 0 solo aumenta el costo.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Camino más barato/rápido con pesos w ≥ 0 y V, E ≤ 10⁵`
- **Complejidad Temporal Promedio:** `O((V + E) log V) usando Min-Heap`
- **Complejidad Temporal Peor Caso:** `O(E log V)`
- **Complejidad Espacial:** `O(V + E) para `adj`, `dist` y el Min-Heap`
- **Nota Técnica:** Incluir el chequeo `if d > dist[u]: continue` al sacar del Heap descarta entradas obsoletas en O(1).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Inicializar `dist = [inf] * n`, poner `dist[start] = 0` y meter `(0, start)` en el Min-Heap.
2. Extraer `(d, u)` del Heap. Si `d > dist[u]`, hacer `continue`.
3. Si `u == target` (cuando buscas un único destino), puedes retornar `d` inmediatamente porque es garantizadamente óptimo.
4. Para cada vecino `(v, w)`, si `d + w < dist[v]`, actualizar `dist[v]` y hacer `heappush`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Guardar `(nodo, distancia)` en vez de `(distancia, nodo)` en `heapq` de Python: `heapq` ordena por el primer elemento de la tupla, así que ordenaría por ID de nodo en lugar de por costo.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
import heapq

def dijkstra_shortest_path(
    n: int, adj: list[list[tuple[int, int]]], start: int
) -> list[float]:
    """
    Plantilla Canónica de Dijkstra con Min-Heap.
    adj[u] contiene pares (vecino_v, peso_w) con w >= 0.
    Tiempo: O((V + E) log V) | Espacio: O(V)
    """
    dist = [float("inf")] * n
    dist[start] = 0
    # Min-Heap guarda tuplas: (distancia_acumulada, nodo)
    pq: list[tuple[float, int]] = [(0, start)]

    while pq:
        d, u = heapq.heappop(pq)

        # ¡LÍNEA VITAL! Si esta entrada del heap es vieja (peor que la mejor ruta ya conocida), la ignoramos
        if d > dist[u]:
            continue

        # Relajación de aristas (Edge Relaxation)
        for v, weight in adj[u]:
            new_dist = d + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))

    return dist
```

### Plantilla en TypeScript / JavaScript
```typescript
import { MinHeap } from "./heaps";

export function networkDelayDijkstra(
  times: number[][],
  n: number,
  k: number
): number {
  const adj: Array<Array<[number, number]>> = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) {
    adj[u].push([v, w]);
  }

  const dist = new Array<number>(n + 1).fill(Infinity);
  dist[k] = 0;

  // Empaquetamos (dist, node) o usamos cola de prioridad ordenada por distancia
  const pq: Array<[number, number]> = [[0, k]];

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift()!;
    if (d > dist[u]) continue;

    for (const [v, w] of adj[u]) {
      if (d + w < dist[v]) {
        dist[v] = d + w;
        pq.push([dist[v], v]);
      }
    }
  }

  let maxWait = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxWait = Math.max(maxWait, dist[i]);
  }
  return maxWait;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] De BFS a Dijkstra: Cuando las calles tienen peajes distintos
- **🎬 Visual en Pantalla / Slide:** Un grafo donde una ruta de 3 calles de costo 1 gana contra una ruta directa de 1 calle de costo 10.
- **🎙️ Narración / Guion:**
  > "En BFS asumíamos que todas las aristas valían 1. Pero en el mundo real un vuelo directo puede costar 500 dólares y dos vuelos con escala pueden costar 150. Al cambiar la Cola normal por un Min-Heap, nace el Algoritmo de Dijkstra."

### ⏱️ [01:45 - 04:45] Relajación de aristas, Lazy Deletion (`d > dist[u]`) y Dijkstra Minimax
- **🎬 Visual en Pantalla / Slide:** Animación de la tabla `dist[]` actualizándose y el Min-Heap ignorando entradas antiguas.
- **🎙️ Narración / Guion:**
  > "Además de sumar costos, Dijkstra sirve para minimizar el máximo esfuerzo de un camino o maximizar la probabilidad de éxito: solo cambias la suma `d + w` por `max(d, w)`."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#743. Network Delay Time** | `Medium` | [https://leetcode.com/problems/network-delay-time/](https://leetcode.com/problems/network-delay-time/) | Aplicación directa de Dijkstra desde el nodo `k`; la respuesta es `max(dist[1..n])`. |
| **#1631. Path With Minimum Effort** | `Medium` | [https://leetcode.com/problems/path-with-minimum-effort/](https://leetcode.com/problems/path-with-minimum-effort/) | Dijkstra en cuadrícula 2D donde el 'costo' de una ruta es el máximo salto de altura en vez de la suma: `new_effort = max(d, abs(h1 - h2))`. |
| **#787. Cheapest Flights Within K Stops** | `Medium` | [https://leetcode.com/problems/cheapest-flights-within-k-stops/](https://leetcode.com/problems/cheapest-flights-within-k-stops/) | Variante con restricción de K paradas (Bellman-Ford en K+1 rondas o Dijkstra rastreando paradas mínimas). |

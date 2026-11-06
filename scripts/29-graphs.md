# 🎬 Episodio #29: Graphs (Representación de Grafos: Lista y Matriz de Adyacencia)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 5 — Estructura de Datos (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Graph Representations (Adjacency List & Matrix)`  
> **Prerrequisitos Recomendados:** Binary Trees → Hash Table → DFS → BFS

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Enseña el 'Diccionario de Traducción de Grafos': cómo problemas disfrazados de cursos universitarios, llaves y cuartos, alianzas o vuelos son todos Grafos. Explica las 3 propiedades fundamentales (Dirigido vs No Dirigido, Ponderado vs No Ponderado, Grados de Entrada `in-degree` y Salida `out-degree`) y el patrón de Bipartición (2-Coloración).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Graphs", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (V, E ≤ 10⁵ → Lista de Adyacencia obligatoria) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Graphs?
La estructura universal que modela redes de ciudades, vuelos, dependencias, internet y relaciones sociales mediante Vértices (`V`) y Aristas (`E`). En entrevistas, el 95% de las veces debes convertir la lista de aristas de entrada en una **Lista de Adyacencia** (`adj[u] = [v1, v2, ...]`) antes de aplicar cualquier algoritmo.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Tu agenda de contactos del teléfono (Lista de Adyacencia): debajo del nombre de cada persona tienes únicamente la lista de amigos con los que se comunica directamente, en lugar de una tabla gigante de 8 mil millones × 8 mil millones con todos los habitantes del planeta (Matriz de Adyacencia).

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En LeetCode casi nunca te dan objetos `GraphNode`: te dan un entero `n` y una lista `edges = [[u, v], ...]`. Tu primera línea siempre es armar la Lista de Adyacencia.
2. **Idea Clave #2:** En un grafo no dirigido debes agregar TANTO `adj[u].append(v)` COMO `adj[v].append(u)`.
3. **Idea Clave #3:** Un grafo es Bipartito (divisible en 2 bandos sin conflictos internos) si y solo si no tiene ciclos de longitud impar.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Graphs)
- ✅ El problema entrega pares de conexiones `edges = [[u, v], ...]` (carreteras, vuelos, prerrequisitos, amistades).
- ✅ **Lista de Adyacencia (`defaultdict(list)`)**: Estándar para grafos dispersos (sparse) donde `E` es mucho menor que `V²`.
- ✅ **Matriz de Adyacencia (`grid[u][v]`)**: Solo cuando el grafo es pequeño y denso (`V ≤ 500`, como en Floyd-Warshall) o necesitas consultar si existe la arista `(u, v)` en O(1).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Nunca crees una Matriz de Adyacencia `V × V` si `V = 10⁵`: una matriz de `10⁵ × 10⁵` requiere `10¹⁰` celdas (~40 GB de RAM) y provocará `Memory Limit Exceeded` de inmediato.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `V, E ≤ 10⁵ → Lista de Adyacencia obligatoria`
- **Complejidad Temporal Promedio:** `Construir Lista de Adyacencia: O(V + E) | Recorrer vecinos de u: O(grado(u))`
- **Complejidad Temporal Peor Caso:** `O(V + E)`
- **Complejidad Espacial:** `O(V + E) en Lista de Adyacencia vs O(V²) en Matriz de Adyacencia`
- **Nota Técnica:** Verifica siempre si el grafo es Dirigido (1 sola dirección `u -> v`) o No Dirigido (ambas direcciones `u <-> v`).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Identificar qué son los nodos `V` y qué son las aristas `E` en la historia del problema.
2. Preguntarse: ¿la relación es de una sola vía (Dirigido) o mutua (No Dirigido)? ¿Tiene costo (Ponderado)?
3. Construir `adj` y, si el grafo puede estar desconectado, envolver tu búsqueda en un bucle `for i in range(n): if i not in visited:`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Lanzar DFS/BFS solo desde el nodo `0` asumiendo que todo el grafo está conectado en una sola pieza, ignorando componentes conexas aisladas.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
from collections import defaultdict

def build_adjacency_list(
    n: int, edges: list[list[int]], directed: bool = False
) -> dict[int, list[int]]:
    """
    Paso 0 de todo problema de Grafos en LeetCode:
    Convertir la lista de aristas [[u, v], ...] en una Lista de Adyacencia.
    Tiempo: O(V + E) | Espacio: O(V + E)
    """
    adj: dict[int, list[int]] = defaultdict(list)
    for u, v in edges:
        adj[u].append(v)
        if not directed:
            adj[v].append(u)
    return adj


def is_bipartite_coloring(n: int, edges: list[list[int]]) -> bool:
    """
    Patrón Clásico de Grafos: 2-Coloración (Bipartite Graph Check).
    color[u] = 0 (sin pintar), 1 (Azul), -1 (Rojo)
    """
    adj = build_adjacency_list(n, edges, directed=False)
    color = [0] * n

    def dfs(u: int, c: int) -> bool:
        color[u] = c
        for v in adj[u]:
            if color[v] == c:
                return False  # Conflicto: dos vecinos con el mismo color
            if color[v] == 0 and not dfs(v, -c):
                return False
        return True

    for i in range(n):
        if color[i] == 0 and not dfs(i, 1):
            return False
    return True
```

### Plantilla en TypeScript / JavaScript
```typescript
export function buildAdjacencyList(
  n: number,
  edges: number[][],
  directed = false
): number[][] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    adj[u].push(v);
    if (!directed) {
      adj[v].push(u);
    }
  }
  return adj;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Todos los árboles son grafos, pero los grafos rompen las reglas
- **🎬 Visual en Pantalla / Slide:** Un árbol conectando sus hojas entre sí y formando ciclos hasta convertirse en una red de grafo.
- **🎙️ Narración / Guion:**
  > "Un Árbol no es más que un grafo bien portado sin ciclos. En cuanto permitimos que cualquier nodo se conecte con cualquier otro, entramos al mundo de los Grafos: la estructura que modela desde Google Maps hasta las dependencias de paquetes de software."

### ⏱️ [01:45 - 04:30] Lista de Adyacencia, Grados (In-Degree/Out-Degree) y 2-Coloración
- **🎬 Visual en Pantalla / Slide:** Transformación de `edges = [[0,1], [1,2]]` en una lista `adj` y pintado de nodos en rojo y azul.
- **🎙️ Narración / Guion:**
  > "Tu reflejo automático al ver una lista de aristas debe ser construir la Lista de Adyacencia en cinco líneas. A partir de ahí, contar cuántas flechas entran o salen de cada nodo o colorear en dos bandos se vuelve inmediato."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#785. Is Graph Bipartite?** | `Medium` | [https://leetcode.com/problems/is-graph-bipartite/](https://leetcode.com/problems/is-graph-bipartite/) | Colorea los nodos alternando `1` y `-1` con BFS o DFS; si un vecino ya tiene tu mismo color, hay un ciclo impar y NO es bipartito. |
| **#841. Keys and Rooms** | `Medium` | [https://leetcode.com/problems/keys-and-rooms/](https://leetcode.com/problems/keys-and-rooms/) | La entrada ya es una Lista de Adyacencia; verifica si un DFS/BFS desde el cuarto 0 visita los N cuartos. |
| **#997. Find the Town Judge** | `Easy` | [https://leetcode.com/problems/find-the-town-judge/](https://leetcode.com/problems/find-the-town-judge/) | Calcula grados de entrada (`in_degree`) y salida (`out_degree`): el juez tiene `in_degree == N - 1` y `out_degree == 0`. |

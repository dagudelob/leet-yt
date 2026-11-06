# 🎬 Episodio #30: Topological Sort & DAG-Related (Orden Topológico y DP en DAGs)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 5 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Topological Sort (Kahn's Algorithm) & DAG Dynamic Programming`  
> **Prerrequisitos Recomendados:** Graphs → BFS → DFS

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Dedica este episodio tanto al Orden Topológico (Algoritmo de Kahn) como a toda la categoría 'DAG-Related' que pide el usuario: explica qué es un DAG (Directed Acyclic Graph), cómo Kahn resuelve dependencias y detecta ciclos al mismo tiempo, y por qué cualquier DAG permite hacer Programación Dinámica procesando los nodos en orden topológico (ej. camino más largo o ruta crítica de un proyecto).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Topological Sort & DAG", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Prerrequisitos, dependencias, ciclos dirigidos o caminos en DAG con V, E ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Topological Sort & DAG?
Ordenar linealmente los nodos de un **Grafo Dirigido Acíclico (DAG)** de modo que para toda arista dirigida `u -> v` (donde `u` es prerrequisito de `v`), `u` aparezca antes que `v`. Mediante el **Algoritmo de Kahn (BFS con `in_degree`)**, además detecta ciclos y permite calcular el camino más largo o crítico en un DAG.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Armar tu plan de estudios en la universidad: no puedes cursar 'Cálculo II' antes de aprobar 'Cálculo I'. Empiezas inscribiendo todas las materias que tienen **0 prerrequisitos** (`in_degree == 0`). Cada vez que apruebas una materia, la tachas como requisito de las siguientes, desbloqueando nuevas materias que ahora quedan con 0 pendientes.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** DAG significa Grafo Dirigido Acíclico: tiene flechas con dirección pero es imposible salir de un nodo y volver a él.
2. **Idea Clave #2:** El Algoritmo de Kahn cuenta cuántas flechas entran a cada nodo (`in_degree`): solo cuando un nodo llega a `in_degree == 0` está listo para ejecutarse.
3. **Idea Clave #3:** Si al vaciarse la cola de Kahn `len(order) < V`, los nodos que nunca llegaron a 0 forman parte o dependen de un ciclo.
4. **Idea Clave #4:** Procesar nodos en Orden Topológico garantiza que cuando llegas al nodo `v`, todos sus predecesores `u` ya calcularon su respuesta óptima (DP en DAG).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Topological Sort & DAG)
- ✅ El problema habla de **prerrequisitos, dependencias de tareas, orden de compilación**, recetas o jerarquías (`Course Schedule I & II`, `Alien Dictionary`).
- ✅ Necesitas **detectar si hay un ciclo en un grafo dirigido** (si al terminar Kahn visitaste menos de `N` nodos, ¡había un ciclo bloqueando el resto!).
- ✅ **DP sobre DAG**: Calcular el tiempo mínimo para completar todas las tareas en paralelo o el camino más largo en un grafo sin ciclos (`Parallel Courses III`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ No existe orden topológico si el grafo es no dirigido o si contiene un ciclo dirigido (`A -> B -> A`).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Prerrequisitos, dependencias, ciclos dirigidos o caminos en DAG con V, E ≤ 10⁵`
- **Complejidad Temporal Promedio:** `O(V + E)`
- **Complejidad Temporal Peor Caso:** `O(V + E)`
- **Complejidad Espacial:** `O(V + E) para `adj`, `in_degree` y la cola `deque``
- **Nota Técnica:** Cada nodo entra a la cola de Kahn exactamente cuando su `in_degree` baja a 0, y cada arista se descuenta 1 sola vez.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Construir la lista de adyacencia `prereq -> course` e incrementar `in_degree[course] += 1`.
2. Meter en una cola todos los nodos con `in_degree[i] == 0`.
3. Mientras haya elementos en la cola, sacar `u`, agregarlo al resultado y restar `1` al `in_degree` de cada vecino `v`. Si `in_degree[v] == 0`, encolar `v`.
4. Comprobar si `len(order) == N`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Invertir el sentido de la arista en `[course, prereq]` sin ajustar `in_degree`, o no verificar `len(order) == num_courses` cuando el grafo tiene un ciclo como `0 -> 1 -> 0`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
from collections import deque

def topological_sort_kahn(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    """
    Algoritmo de Kahn (BFS con Grados de Entrada / in_degree).
    Además de devolver el orden válido, detecta ciclos si len(order) < num_courses.
    Tiempo: O(V + E) | Espacio: O(V + E)
    """
    adj: list[list[int]] = [[] for _ in range(num_courses)]
    in_degree = [0] * num_courses

    for course, prereq in prerequisites:
        adj[prereq].append(course)  # prereq -> course
        in_degree[course] += 1

    # 1. Encolar todos los nodos que NO tienen dependencias pendientes (in_degree == 0)
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    order: list[int] = []

    while queue:
        u = queue.popleft()
        order.append(u)
        # 2. Al completar 'u', descontamos 1 dependencia a todos sus dependientes 'v'
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    # Si procesamos todos los cursos, no hay ciclos; si faltaron, había un ciclo
    return order if len(order) == num_courses else []
```

### Plantilla en TypeScript / JavaScript
```typescript
export function topologicalSortKahn(
  numCourses: number,
  prerequisites: number[][]
): number[] {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array<number>(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    adj[prereq].push(course);
    inDegree[course]++;
  }

  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order: number[] = [];
  let head = 0;
  while (head < queue.length) {
    const u = queue[head++];
    order.push(u);
    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }

  return order.length === numCourses ? order : [];
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Qué es un DAG y la intuición de los Prerrequisitos Universitarios
- **🎬 Visual en Pantalla / Slide:** Grafo de materias universitarias iluminando las que tienen `in_degree = 0`.
- **🎙️ Narración / Guion:**
  > "Siempre que escuches palabras como 'prerrequisitos', 'dependencias de paquetes' o 'qué tarea debe ir antes de cuál', estás frente a un DAG: un Grafo Dirigido sin Ciclos. Y su algoritmo rey es el Orden Topológico de Kahn."

### ⏱️ [01:45 - 05:00] Algoritmo de Kahn: Ordenar, Detectar Ciclos y hacer DP sobre DAGs
- **🎬 Visual en Pantalla / Slide:** Contadores `in_degree` bajando a cero y propagando el tiempo máximo acumulado hacia adelante.
- **🎙️ Narración / Guion:**
  > "Lo genial del algoritmo de Kahn es que mata tres pájaros de un tiro: te da el orden válido de ejecución, detecta si hay un ciclo imposible si al final sobran nodos sin procesar, y te sirve en bandeja la transición para calcular caminos más largos o tiempos de proyectos en paralelo."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#207. Course Schedule** | `Medium` | [https://leetcode.com/problems/course-schedule/](https://leetcode.com/problems/course-schedule/) | Ejecuta el algoritmo de Kahn; retorna `len(order) == numCourses`. |
| **#210. Course Schedule II** | `Medium` | [https://leetcode.com/problems/course-schedule-ii/](https://leetcode.com/problems/course-schedule-ii/) | Devuelve directamente la lista `order` generada por la cola de Kahn. |
| **#2050. Parallel Courses III** | `Hard` | [https://leetcode.com/problems/parallel-courses-iii/](https://leetcode.com/problems/parallel-courses-iii/) | DP sobre DAG durante Kahn: `finish_time[v] = max(finish_time[v], finish_time[u] + time[v])`. |

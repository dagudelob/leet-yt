import { DSATopic } from "@/types/dsa";

export const TOPICS_LEVEL_5_6: DSATopic[] = [
  // ============================================================================
  // NIVEL 5: GRAFOS, DAGS, CAMINOS CORTOS, CONECTIVIDAD Y TRIES (29 - 33)
  // ============================================================================
  {
    id: "graphs",
    order: 29,
    title: "Graphs (Representación de Grafos: Lista y Matriz de Adyacencia)",
    shortTitle: "Graphs",
    englishTerm: "Graph Representations (Adjacency List & Matrix)",
    kind: "data-structure",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["trees", "hash-table", "dfs", "bfs"],
    summary:
      "La estructura universal que modela redes de ciudades, vuelos, dependencias, internet y relaciones sociales mediante Vértices (`V`) y Aristas (`E`). En entrevistas, el 95% de las veces debes convertir la lista de aristas de entrada en una **Lista de Adyacencia** (`adj[u] = [v1, v2, ...]`) antes de aplicar cualquier algoritmo.",
    analogy:
      "Tu agenda de contactos del teléfono (Lista de Adyacencia): debajo del nombre de cada persona tienes únicamente la lista de amigos con los que se comunica directamente, en lugar de una tabla gigante de 8 mil millones × 8 mil millones con todos los habitantes del planeta (Matriz de Adyacencia).",
    whenToUse: [
      "El problema entrega pares de conexiones `edges = [[u, v], ...]` (carreteras, vuelos, prerrequisitos, amistades).",
      "**Lista de Adyacencia (`defaultdict(list)`)**: Estándar para grafos dispersos (sparse) donde `E` es mucho menor que `V²`.",
      "**Matriz de Adyacencia (`grid[u][v]`)**: Solo cuando el grafo es pequeño y denso (`V ≤ 500`, como en Floyd-Warshall) o necesitas consultar si existe la arista `(u, v)` en O(1).",
    ],
    whenNotToUse: [
      "Nunca crees una Matriz de Adyacencia `V × V` si `V = 10⁵`: una matriz de `10⁵ × 10⁵` requiere `10¹⁰` celdas (~40 GB de RAM) y provocará `Memory Limit Exceeded` de inmediato.",
    ],
    timeComplexity: {
      average: "Construir Lista de Adyacencia: O(V + E) | Recorrer vecinos de u: O(grado(u))",
      worst: "O(V + E)",
      note: "Verifica siempre si el grafo es Dirigido (1 sola dirección `u -> v`) o No Dirigido (ambas direcciones `u <-> v`).",
    },
    spaceComplexity: "O(V + E) en Lista de Adyacencia vs O(V²) en Matriz de Adyacencia",
    constraintHint: "V, E ≤ 10⁵ → Lista de Adyacencia obligatoria",
    pythonTemplate: `from collections import defaultdict

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
    return True`,
    typescriptTemplate: `export function buildAdjacencyList(
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
}`,
    leetcodeProblems: [
      {
        number: 785,
        title: "Is Graph Bipartite?",
        slug: "is-graph-bipartite",
        difficulty: "Medium",
        patternHint: "Colorea los nodos alternando `1` y `-1` con BFS o DFS; si un vecino ya tiene tu mismo color, hay un ciclo impar y NO es bipartito.",
      },
      {
        number: 841,
        title: "Keys and Rooms",
        slug: "keys-and-rooms",
        difficulty: "Medium",
        patternHint: "La entrada ya es una Lista de Adyacencia; verifica si un DFS/BFS desde el cuarto 0 visita los N cuartos.",
      },
      {
        number: 997,
        title: "Find the Town Judge",
        slug: "find-the-town-judge",
        difficulty: "Easy",
        patternHint: "Calcula grados de entrada (`in_degree`) y salida (`out_degree`): el juez tiene `in_degree == N - 1` y `out_degree == 0`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Enseña el 'Diccionario de Traducción de Grafos': cómo problemas disfrazados de cursos universitarios, llaves y cuartos, alianzas o vuelos son todos Grafos. Explica las 3 propiedades fundamentales (Dirigido vs No Dirigido, Ponderado vs No Ponderado, Grados de Entrada `in-degree` y Salida `out-degree`) y el patrón de Bipartición (2-Coloración).",
      keyTakeaways: [
        "En LeetCode casi nunca te dan objetos `GraphNode`: te dan un entero `n` y una lista `edges = [[u, v], ...]`. Tu primera línea siempre es armar la Lista de Adyacencia.",
        "En un grafo no dirigido debes agregar TANTO `adj[u].append(v)` COMO `adj[v].append(u)`.",
        "Un grafo es Bipartito (divisible en 2 bandos sin conflictos internos) si y solo si no tiene ciclos de longitud impar.",
      ],
      stepByStepWalkthrough: [
        "Identificar qué son los nodos `V` y qué son las aristas `E` en la historia del problema.",
        "Preguntarse: ¿la relación es de una sola vía (Dirigido) o mutua (No Dirigido)? ¿Tiene costo (Ponderado)?",
        "Construir `adj` y, si el grafo puede estar desconectado, envolver tu búsqueda en un bucle `for i in range(n): if i not in visited:`.",
      ],
      interviewTraps: [
        "Lanzar DFS/BFS solo desde el nodo `0` asumiendo que todo el grafo está conectado en una sola pieza, ignorando componentes conexas aisladas.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Todos los árboles son grafos, pero los grafos rompen las reglas",
          visualCue: "Un árbol conectando sus hojas entre sí y formando ciclos hasta convertirse en una red de grafo.",
          narration:
            "Un Árbol no es más que un grafo bien portado sin ciclos. En cuanto permitimos que cualquier nodo se conecte con cualquier otro, entramos al mundo de los Grafos: la estructura que modela desde Google Maps hasta las dependencias de paquetes de software.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Lista de Adyacencia, Grados (In-Degree/Out-Degree) y 2-Coloración",
          visualCue: "Transformación de `edges = [[0,1], [1,2]]` en una lista `adj` y pintado de nodos en rojo y azul.",
          narration:
            "Tu reflejo automático al ver una lista de aristas debe ser construir la Lista de Adyacencia en cinco líneas. A partir de ahí, contar cuántas flechas entran o salen de cada nodo o colorear en dos bandos se vuelve inmediato.",
        },
      ],
    },
  },
  {
    id: "topological-sort-dag",
    order: 30,
    title: "Topological Sort & DAG-Related (Orden Topológico y DP en DAGs)",
    shortTitle: "Topological Sort & DAG",
    englishTerm: "Topological Sort (Kahn's Algorithm) & DAG Dynamic Programming",
    kind: "algorithm",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["graphs", "bfs", "dfs"],
    summary:
      "Ordenar linealmente los nodos de un **Grafo Dirigido Acíclico (DAG)** de modo que para toda arista dirigida `u -> v` (donde `u` es prerrequisito de `v`), `u` aparezca antes que `v`. Mediante el **Algoritmo de Kahn (BFS con `in_degree`)**, además detecta ciclos y permite calcular el camino más largo o crítico en un DAG.",
    analogy:
      "Armar tu plan de estudios en la universidad: no puedes cursar 'Cálculo II' antes de aprobar 'Cálculo I'. Empiezas inscribiendo todas las materias que tienen **0 prerrequisitos** (`in_degree == 0`). Cada vez que apruebas una materia, la tachas como requisito de las siguientes, desbloqueando nuevas materias que ahora quedan con 0 pendientes.",
    whenToUse: [
      "El problema habla de **prerrequisitos, dependencias de tareas, orden de compilación**, recetas o jerarquías (`Course Schedule I & II`, `Alien Dictionary`).",
      "Necesitas **detectar si hay un ciclo en un grafo dirigido** (si al terminar Kahn visitaste menos de `N` nodos, ¡había un ciclo bloqueando el resto!).",
      "**DP sobre DAG**: Calcular el tiempo mínimo para completar todas las tareas en paralelo o el camino más largo en un grafo sin ciclos (`Parallel Courses III`).",
    ],
    whenNotToUse: [
      "No existe orden topológico si el grafo es no dirigido o si contiene un ciclo dirigido (`A -> B -> A`).",
    ],
    timeComplexity: {
      average: "O(V + E)",
      worst: "O(V + E)",
      note: "Cada nodo entra a la cola de Kahn exactamente cuando su `in_degree` baja a 0, y cada arista se descuenta 1 sola vez.",
    },
    spaceComplexity: "O(V + E) para `adj`, `in_degree` y la cola `deque`",
    constraintHint: "Prerrequisitos, dependencias, ciclos dirigidos o caminos en DAG con V, E ≤ 10⁵",
    pythonTemplate: `from collections import deque

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
    return order if len(order) == num_courses else []`,
    typescriptTemplate: `export function topologicalSortKahn(
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
}`,
    leetcodeProblems: [
      {
        number: 207,
        title: "Course Schedule",
        slug: "course-schedule",
        difficulty: "Medium",
        patternHint: "Ejecuta el algoritmo de Kahn; retorna `len(order) == numCourses`.",
      },
      {
        number: 210,
        title: "Course Schedule II",
        slug: "course-schedule-ii",
        difficulty: "Medium",
        patternHint: "Devuelve directamente la lista `order` generada por la cola de Kahn.",
      },
      {
        number: 2050,
        title: "Parallel Courses III",
        slug: "parallel-courses-iii",
        difficulty: "Hard",
        patternHint: "DP sobre DAG durante Kahn: `finish_time[v] = max(finish_time[v], finish_time[u] + time[v])`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Dedica este episodio tanto al Orden Topológico (Algoritmo de Kahn) como a toda la categoría 'DAG-Related' que pide el usuario: explica qué es un DAG (Directed Acyclic Graph), cómo Kahn resuelve dependencias y detecta ciclos al mismo tiempo, y por qué cualquier DAG permite hacer Programación Dinámica procesando los nodos en orden topológico (ej. camino más largo o ruta crítica de un proyecto).",
      keyTakeaways: [
        "DAG significa Grafo Dirigido Acíclico: tiene flechas con dirección pero es imposible salir de un nodo y volver a él.",
        "El Algoritmo de Kahn cuenta cuántas flechas entran a cada nodo (`in_degree`): solo cuando un nodo llega a `in_degree == 0` está listo para ejecutarse.",
        "Si al vaciarse la cola de Kahn `len(order) < V`, los nodos que nunca llegaron a 0 forman parte o dependen de un ciclo.",
        "Procesar nodos en Orden Topológico garantiza que cuando llegas al nodo `v`, todos sus predecesores `u` ya calcularon su respuesta óptima (DP en DAG).",
      ],
      stepByStepWalkthrough: [
        "Construir la lista de adyacencia `prereq -> course` e incrementar `in_degree[course] += 1`.",
        "Meter en una cola todos los nodos con `in_degree[i] == 0`.",
        "Mientras haya elementos en la cola, sacar `u`, agregarlo al resultado y restar `1` al `in_degree` de cada vecino `v`. Si `in_degree[v] == 0`, encolar `v`.",
        "Comprobar si `len(order) == N`.",
      ],
      interviewTraps: [
        "Invertir el sentido de la arista en `[course, prereq]` sin ajustar `in_degree`, o no verificar `len(order) == num_courses` cuando el grafo tiene un ciclo como `0 -> 1 -> 0`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Qué es un DAG y la intuición de los Prerrequisitos Universitarios",
          visualCue: "Grafo de materias universitarias iluminando las que tienen `in_degree = 0`.",
          narration:
            "Siempre que escuches palabras como 'prerrequisitos', 'dependencias de paquetes' o 'qué tarea debe ir antes de cuál', estás frente a un DAG: un Grafo Dirigido sin Ciclos. Y su algoritmo rey es el Orden Topológico de Kahn.",
        },
        {
          timestamp: "01:45 - 05:00",
          sectionTitle: "Algoritmo de Kahn: Ordenar, Detectar Ciclos y hacer DP sobre DAGs",
          visualCue: "Contadores `in_degree` bajando a cero y propagando el tiempo máximo acumulado hacia adelante.",
          narration:
            "Lo genial del algoritmo de Kahn es que mata tres pájaros de un tiro: te da el orden válido de ejecución, detecta si hay un ciclo imposible si al final sobran nodos sin procesar, y te sirve en bandeja la transición para calcular caminos más largos o tiempos de proyectos en paralelo.",
        },
      ],
    },
  },
  {
    id: "dijkstra",
    order: 31,
    title: "Dijkstra & Shortest Paths (Caminos Más Cortos con Pesos)",
    shortTitle: "Dijkstra",
    englishTerm: "Dijkstra's Algorithm & Weighted Shortest Paths",
    kind: "algorithm",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["graphs", "bfs", "heaps"],
    summary:
      "Encontrar la ruta de **menor costo total** desde un origen hacia todos los demás nodos en un grafo con pesos **no negativos** (`w >= 0`). Es exactamente un BFS donde reemplazamos la cola FIFO normal por un **Min-Heap (Priority Queue)** ordenado por distancia acumulada.",
    analogy:
      "Si BFS es una onda de agua que avanza a la misma velocidad por todos lados, Dijkstra es agua avanzando por tuberías de distinta longitud: el agua llega primero a la intersección cuya suma de tramos sea más corta. Usar un Min-Heap nos dice siempre a qué intersección acaba de llegar el agua primero.",
    whenToUse: [
      "El problema pide el **camino más corto / más barato / más rápido / de menor esfuerzo** en un grafo o matriz donde cada arista tiene un costo o peso positivo (`w >= 0`).",
      "**0-1 BFS (optimización con Deque)**: Si los pesos son únicamente `0` y `1`, al cruzar una arista de peso `0` haces `appendleft` y con peso `1` haces `append` en O(V + E).",
      "**Bellman-Ford**: Cuando existen pesos **negativos** o hay un límite de a lo sumo `K` escalas (`Cheapest Flights Within K Stops`).",
    ],
    whenNotToUse: [
      "¡NUNCA uses Dijkstra si hay aristas con pesos NEGATIVOS (especialmente ciclos negativos)! Dijkstra asume que una vez que sacas el mínimo del Heap ningún camino futuro podrá ser más barato gracias a que sumar pesos >= 0 solo aumenta el costo.",
    ],
    timeComplexity: {
      average: "O((V + E) log V) usando Min-Heap",
      worst: "O(E log V)",
      note: "Incluir el chequeo `if d > dist[u]: continue` al sacar del Heap descarta entradas obsoletas en O(1).",
    },
    spaceComplexity: "O(V + E) para `adj`, `dist` y el Min-Heap",
    constraintHint: "Camino más barato/rápido con pesos w ≥ 0 y V, E ≤ 10⁵",
    pythonTemplate: `import heapq

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

    return dist`,
    typescriptTemplate: `import { MinHeap } from "./heaps";

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
}`,
    leetcodeProblems: [
      {
        number: 743,
        title: "Network Delay Time",
        slug: "network-delay-time",
        difficulty: "Medium",
        patternHint: "Aplicación directa de Dijkstra desde el nodo `k`; la respuesta es `max(dist[1..n])`.",
      },
      {
        number: 1631,
        title: "Path With Minimum Effort",
        slug: "path-with-minimum-effort",
        difficulty: "Medium",
        patternHint: "Dijkstra en cuadrícula 2D donde el 'costo' de una ruta es el máximo salto de altura en vez de la suma: `new_effort = max(d, abs(h1 - h2))`.",
      },
      {
        number: 787,
        title: "Cheapest Flights Within K Stops",
        slug: "cheapest-flights-within-k-stops",
        difficulty: "Medium",
        patternHint: "Variante con restricción de K paradas (Bellman-Ford en K+1 rondas o Dijkstra rastreando paradas mínimas).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Muestra que Dijkstra NO es un algoritmo difícil de memorizar: es literalmente el mismo código de BFS cambiando `deque` por `heapq` y el conjunto `visited` por un arreglo `dist` inicializado en infinito. Destaca la línea `if d > dist[u]: continue` (Lazy Deletion) que evita reprocesar nodos obsoletos, y cómo cambiar `+` por `max()` en la relajación resuelve problemas minimax como 'Path With Minimum Effort'.",
      keyTakeaways: [
        "En las tuplas del Min-Heap, pon SIEMPRE la distancia primero `(dist_acumulada, nodo)` para que `heapq` ordene por menor distancia.",
        "La operación `if d + w < dist[v]: dist[v] = d + w` se llama Relajación de Arista (Edge Relaxation).",
        "La línea `if d > dist[u]: continue` descarta entradas viejas del Heap sin necesidad de implementar `decrease_key`.",
      ],
      stepByStepWalkthrough: [
        "Inicializar `dist = [inf] * n`, poner `dist[start] = 0` y meter `(0, start)` en el Min-Heap.",
        "Extraer `(d, u)` del Heap. Si `d > dist[u]`, hacer `continue`.",
        "Si `u == target` (cuando buscas un único destino), puedes retornar `d` inmediatamente porque es garantizadamente óptimo.",
        "Para cada vecino `(v, w)`, si `d + w < dist[v]`, actualizar `dist[v]` y hacer `heappush`.",
      ],
      interviewTraps: [
        "Guardar `(nodo, distancia)` en vez de `(distancia, nodo)` en `heapq` de Python: `heapq` ordena por el primer elemento de la tupla, así que ordenaría por ID de nodo en lugar de por costo.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "De BFS a Dijkstra: Cuando las calles tienen peajes distintos",
          visualCue: "Un grafo donde una ruta de 3 calles de costo 1 gana contra una ruta directa de 1 calle de costo 10.",
          narration:
            "En BFS asumíamos que todas las aristas valían 1. Pero en el mundo real un vuelo directo puede costar 500 dólares y dos vuelos con escala pueden costar 150. Al cambiar la Cola normal por un Min-Heap, nace el Algoritmo de Dijkstra.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Relajación de aristas, Lazy Deletion (`d > dist[u]`) y Dijkstra Minimax",
          visualCue: "Animación de la tabla `dist[]` actualizándose y el Min-Heap ignorando entradas antiguas.",
          narration:
            "Además de sumar costos, Dijkstra sirve para minimizar el máximo esfuerzo de un camino o maximizar la probabilidad de éxito: solo cambias la suma `d + w` por `max(d, w)`.",
        },
      ],
    },
  },
  {
    id: "disjoint-set-union",
    order: 32,
    title: "Disjoint Set Union (DSU / Union-Find & Kruskal MST)",
    shortTitle: "Disjoint Set (Union-Find)",
    englishTerm: "Disjoint Set Union (DSU / Union-Find) & Minimum Spanning Tree",
    kind: "hybrid",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["graphs", "trees"],
    summary:
      "Estructura de datos ultrarrápida para gestionar grupos o componentes conexas dinámicas mediante dos operaciones en tiempo casi constante $O(\alpha(N)) \approx O(1)$: **`find(x)`** (¿quién es el líder del grupo de `x`?) y **`union(x, y)`** (fusionar los grupos de `x` y `y`).",
    analogy:
      "Empresas que se van fusionando: al principio cada persona es dueña de su propia startup (`parent[i] = i`). Cuando dos empresas se fusionan (`union`), el CEO de la más pequeña pasa a reportarle al CEO de la más grande (**Union by Rank/Size**). Y cuando alguien pregunta quién es el dueño supremo de su grupo (`find`), de paso actualiza su contacto directo con el CEO supremo (**Path Compression**).",
    whenToUse: [
      "El problema agrega conexiones (`edges`) dinámicamente y pregunta si dos nodos ya están conectados, cuántos grupos independientes quedan, o qué arista crea el primer ciclo (`Redundant Connection`, `Accounts Merge`).",
      "**Algoritmo de Kruskal (Minimum Spanning Tree - MST)**: Ordenar todas las aristas de menor a mayor peso e ir uniéndolas con `union(u, v)` si aún no estaban en el mismo grupo (`Min Cost to Connect All Points`).",
    ],
    whenNotToUse: [
      "Si necesitas **DESCONECTAR** (borrar aristas) dinámicamente: Union-Find está diseñado para unir grupos hacia adelante, no para separarlos (a menos que inviertas las consultas en el tiempo de atrás hacia adelante).",
    ],
    timeComplexity: {
      average: "O(α(N)) ≈ O(1) por operación `find` o `union`",
      worst: "O(α(N)) donde α es la inversa de Ackermann (≤ 4 para cualquier N en el universo)",
      note: "Combinar Path Compression + Union by Size/Rank logra complejidad prácticamente O(1).",
    },
    spaceComplexity: "O(N) para los arreglos `parent` y `size`",
    constraintHint: "Conectividad dinámica, fusión de cuentas/grupos, ciclos no dirigidos o Kruskal MST",
    pythonTemplate: `class UnionFind:
    """
    Plantilla Profesional de Disjoint Set Union (DSU) en ~15 líneas.
    Incluye Compresión de Caminos (Path Compression) y Unión por Tamaño (Union by Size).
    Tiempo por operación: O(alpha(N)) ≈ O(1) | Espacio: O(N)
    """
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.size = [1] * n
        self.components = n

    def find(self, x: int) -> int:
        # Path Compression: apunta directamente a la raíz suprema
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a: int, b: int) -> bool:
        root_a, root_b = self.find(a), self.find(b)
        if root_a == root_b:
            return False  # ¡Ya estaban en el mismo grupo! (Arista redundante / Ciclo)

        # Union by Size: colgar el árbol más pequeño debajo del más grande
        if self.size[root_a] < self.size[root_b]:
            root_a, root_b = root_b, root_a
        self.parent[root_b] = root_a
        self.size[root_a] += self.size[root_b]
        self.components -= 1
        return True`,
    typescriptTemplate: `export class UnionFind {
  parent: number[];
  size: number[];
  components: number;

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array<number>(n).fill(1);
    this.components = n;
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(a: number, b: number): boolean {
    let rootA = this.find(a);
    let rootB = this.find(b);
    if (rootA === rootB) return false;

    if (this.size[rootA] < this.size[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }
    this.parent[rootB] = rootA;
    this.size[rootA] += this.size[rootB];
    this.components--;
    return true;
  }
}`,
    leetcodeProblems: [
      {
        number: 684,
        title: "Redundant Connection",
        slug: "redundant-connection",
        difficulty: "Medium",
        patternHint: "La primera arista `[u, v]` donde `uf.union(u, v)` devuelve `False` es exactamente la que cierra el ciclo.",
      },
      {
        number: 721,
        title: "Accounts Merge",
        slug: "accounts-merge",
        difficulty: "Medium",
        patternHint: "Une con DSU todas las cuentas que compartan al menos un correo electrónico.",
      },
      {
        number: 1584,
        title: "Min Cost to Connect All Points",
        slug: "min-cost-to-connect-all-points",
        difficulty: "Medium",
        patternHint: "Algoritmo de Kruskal: ordena las aristas por distancia Manhattan y suma las `N - 1` aristas donde `union(u, v)` sea `True`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Muestra por qué Disjoint Set Union (Union-Find) es una de las estructuras con mejor relación 'pocas líneas de código vs poder extremo'. Explica visualmente las dos optimizaciones mágicas (Path Compression y Union by Size) que aplastan la altura del árbol a casi 1, y cómo al retornar `False` cuando `root_a == root_b` detectas ciclos y construyes el Árbol de Expansión Mínima (Kruskal).",
      keyTakeaways: [
        "Inicialmente cada nodo es su propio jefe (`parent[i] = i`) y hay `N` componentes conexas.",
        "`Path Compression` (`self.parent[x] = self.find(self.parent[x])`) aplana el árbol en una línea recursiva.",
        "Cada vez que `union(u, v)` tiene éxito, el número total de componentes conexas disminuye exactamente en 1 (`self.components -= 1`).",
      ],
      stepByStepWalkthrough: [
        "Instanciar `uf = UnionFind(n)`.",
        "Por cada relación o arista `(u, v)`, llamar a `uf.union(u, v)`.",
        "Si necesitas saber si `x` e `y` están conectados, compara `uf.find(x) == uf.find(y)` (nunca compares `uf.parent[x] == uf.parent[y]` directamente sin llamar a `find`).",
      ],
      interviewTraps: [
        "Comparar `uf.parent[x] == uf.parent[y]` en vez de `uf.find(x) == uf.find(y)`: `parent[x]` puede no estar actualizado hasta la raíz suprema si aún no se ejecutó `find(x)` tras la última unión.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Fusiones de empresas en tiempo O(1): ¿Qué es Union-Find?",
          visualCue: "Nodos agrupándose bajo un líder y aplanando sus flechas directamente hacia la raíz con Path Compression.",
          narration:
            "Imagina que te dan cien mil ciudades y van construyendo carreteras una por una, preguntándote en cada instante si ya se puede viajar de A a B. Lanzar un DFS cada vez sería lentísimo. Union-Find responde esa pregunta en tiempo prácticamente constante.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Detección de Ciclos y el Algoritmo de Kruskal (MST)",
          visualCue: "Aristas ordenadas por peso uniéndose con Union-Find y saltando las que forman ciclo.",
          narration:
            "Si intentas unir dos nodos que ya tienen el mismo jefe supremo, acabas de descubrir un ciclo. Y si ordenas las aristas de más barata a más cara e ignoras los ciclos, acabas de programar el famoso Algoritmo de Kruskal.",
        },
      ],
    },
  },
  {
    id: "tries",
    order: 33,
    title: "Tries / Prefix Trees (Árboles de Prefijos)",
    shortTitle: "Tries (Prefix Tree)",
    englishTerm: "Tries / Prefix Trees & Bitwise Tries",
    kind: "hybrid",
    level: 5,
    difficulty: "Intermediate",
    branchCategory: "graphs-dag",
    prerequisites: ["trees", "hash-table", "strings"],
    summary:
      "Un árbol especializado para diccionarios de cadenas (o bits) donde cada arista representa un carácter y los nodos comparten prefijos comunes. Permite buscar palabras o verificar si existe cualquier palabra que empiece con un prefijo `P` en tiempo $O(|P|)$, independientemente de cuántas miles de palabras haya en el diccionario.",
    analogy:
      "El autocompletado del buscador de tu celular: cuando escribes `A -> L -> G`, no revisa las 500,000 palabras del idioma español una por una; simplemente baja tres escalones por las ramas `A`, `L` y `G` del árbol, y todo lo que cuelga debajo de ese nodo son las palabras que empiezan por `ALG` (`Algoritmo`, `Álgebra`, `Alguien`).",
    whenToUse: [
      "Autocompletado, búsqueda por **prefijos** (`startsWith`), correctores ortográficos o comodines (`.`).",
      "Buscar simultáneamente muchas palabras de un diccionario dentro de un tablero de letras (`Word Search II`: un Trie poda de golpe miles de búsquedas en el tablero cuando un prefijo no existe).",
      "**Bitwise Trie (Trie de Bits 0 y 1)**: Encontrar el par de números que maximiza el XOR (`Maximum XOR of Two Numbers in an Array`).",
    ],
    whenNotToUse: [
      "Si solo necesitas buscar palabras exactas completas sin consultar prefijos (un `Hash Set` normal de strings es más simple y rápido para coincidencias exactas).",
    ],
    timeComplexity: {
      average: "Insert / Search / StartsWith: O(L) donde L es la longitud de la palabra",
      worst: "O(L)",
      note: "El tiempo NO depende del número de palabras N en el diccionario, solo del largo L de la palabra consultada.",
    },
    spaceComplexity: "O(Total de caracteres insertados) compartiendo prefijos comunes",
    constraintHint: "Consultas de prefijos startsWith, diccionarios en tableros o Maximum XOR",
    pythonTemplate: `class TrieNode:
    def __init__(self):
        self.children: dict[str, TrieNode] = {}
        self.is_end: bool = False


class Trie:
    """
    Implementación Limpia y Estándar de Trie (Prefix Tree).
    Tiempo por operación: O(L) donde L = len(word).
    """
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find_node(prefix) is not None

    def _find_node(self, prefix: str) -> TrieNode | None:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return None
            curr = curr.children[ch]
        return curr`,
    typescriptTemplate: `class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        curr.children.set(ch, new TrieNode());
      }
      curr = curr.children.get(ch)!;
    }
    curr.isEnd = true;
  }

  search(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  private findNode(prefix: string): TrieNode | null {
    let curr = this.root;
    for (const ch of prefix) {
      const next = curr.children.get(ch);
      if (!next) return null;
      curr = next;
    }
    return curr;
  }
}`,
    leetcodeProblems: [
      {
        number: 208,
        title: "Implement Trie (Prefix Tree)",
        slug: "implement-trie-prefix-tree",
        difficulty: "Medium",
        patternHint: "Estructura base con `children = {}` y bandera booleana `is_end`.",
      },
      {
        number: 211,
        title: "Design Add and Search Words Data Structure",
        slug: "design-add-and-search-words-data-structure",
        difficulty: "Medium",
        patternHint: "Cuando el carácter buscado es `'.'`, lanza recursión sobre todos los valores de `curr.children.values()`.",
      },
      {
        number: 212,
        title: "Word Search II",
        slug: "word-search-ii",
        difficulty: "Hard",
        patternHint: "Mete las palabras en un Trie y camina simultáneamente por el tablero 2D y por los nodos del Trie.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo un Trie fusiona los prefijos repetidos de miles de palabras en un solo árbol y por qué la bandera `is_end` es indispensable para distinguir entre el prefijo `'app'` y la palabra completa `'apple'`. Muestra el caso de estudio estrella: cómo pasar de TLE a una solución rapidísima en 'Word Search II' guiando el Backtracking con un Trie.",
      keyTakeaways: [
        "La diferencia entre `search(word)` y `startsWith(prefix)` es únicamente verificar `node.is_end == True` al final.",
        "En problemas de tableros + diccionarios (`Word Search II`), invertir la perspectiva metiendo las palabras en un Trie evita buscar palabras una por una.",
        "Un Bitwise Trie inserta los 32 bits de un entero del bit más significativo al menos significativo para maximizar el XOR buscando siempre el bit opuesto.",
      ],
      stepByStepWalkthrough: [
        "Definir `TrieNode` con un diccionario `children` y un booleano `is_end = False`.",
        "Al insertar, recorrer letra por letra creando nodos si no existen y marcar `curr.is_end = True` en la última letra.",
        "Extraer una función auxiliar `_find_node(prefix)` que reutilizan tanto `search` como `startsWith`.",
      ],
      interviewTraps: [
        "Olvidar la bandera `is_end`: si insertas `'apple'`, `search('app')` devolvería `True` por error si no distingues entre un nodo de paso y un final de palabra.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Cómo funciona el autocompletado en tiempo O(Longitud)",
          visualCue: "Las palabras 'CASA', 'CASO', 'CAMA' compartiendo las ramas C -> A en un árbol.",
          narration:
            "Si tienes un diccionario con un millón de palabras y quieres saber cuáles empiezan con 'PRO', un Hash Set no te sirve porque solo busca palabras completas. Un Trie organiza las palabras letra por letra en un árbol donde todos los prefijos comunes comparten el mismo camino.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "El combo Trie + Backtracking en Word Search II",
          visualCue: "Un tablero de sopa de letras podando inmediatamente ramas que no existen en el Trie.",
          narration:
            "Cuando combinas un Trie con DFS en un tablero 2D, si en la segunda casilla se forma la combinación 'XZ' y ves que en tu Trie no hay rama 'XZ', cortas la búsqueda al instante ahorrando millones de pasos.",
        },
      ],
    },
  },

  // ============================================================================
  // NIVEL 6: OPTIMIZACIÓN, GREEDY Y PROGRAMACIÓN DINÁMICA (34 - 37)
  // ============================================================================
  {
    id: "greedy",
    order: 34,
    title: "Greedy Algorithms (Algoritmos Voraces)",
    shortTitle: "Greedy",
    englishTerm: "Greedy Algorithms",
    kind: "algorithm",
    level: 6,
    difficulty: "Intermediate",
    branchCategory: "dp-greedy",
    prerequisites: ["sorting-intervals", "heaps"],
    summary:
      "Tomar en cada paso la decisión que parece mejor **en ese preciso instante** (óptimo local) sin mirar atrás ni explorar otras ramas, demostrando que esa regla voraz conduce garantizadamente al óptimo global en O(N) o O(N log N).",
    analogy:
      "Si quieres meter la mayor cantidad de reuniones posibles en tu día (sin importar cuánto duren), la regla voraz infalible es elegir siempre la reunión que **termine más temprano**: así liberas tu sala lo antes posible para las siguientes.",
    whenToUse: [
      "Problemas de **alcance máximo** o saltos (`Jump Game I & II`: mantener siempre `max_reach = max(max_reach, i + nums[i])`).",
      "**Interval Scheduling**: Elegir la mayor cantidad de intervalos que no se solapen (ordenando por punto de **FIN** `end`).",
      "Asignación con ordenamiento o Heaps (`Gas Station`, `Candy`, `Boats to Save People`, `Partition Labels`).",
    ],
    whenNotToUse: [
      "Cuando una elección voraz temprana te bloquea una recompensa mucho mayor más adelante (ej. `0/1 Knapsack` o cambio de monedas con denominaciones como `[1, 3, 4]` para sumar `6`, donde el voraz elige `4+1+1` (3 monedas) en vez del óptimo `3+3` (2 monedas)). Si el voraz falla, necesitas **Dynamic Programming**.",
    ],
    timeComplexity: {
      average: "O(N) en barrido directo | O(N log N) si requiere ordenar antes",
      worst: "O(N log N)",
      note: "Siempre pon a prueba tu idea Greedy intentando inventar un contraejemplo pequeño de 3 o 4 elementos antes de programarla.",
    },
    spaceComplexity: "O(1) adicional",
    constraintHint: "Optimización con N ≤ 10⁵ donde existe propiedad de elección voraz",
    pythonTemplate: `def can_jump_greedy(nums: list[int]) -> bool:
    """
    Patrón Greedy de Alcance Máximo (Jump Game).
    En lugar de probar todos los saltos con DP O(N^2), rastreamos hasta qué índice máximo podemos llegar.
    Tiempo: O(N) | Espacio: O(1)
    """
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False  # Quedamos atrapados antes de poder pisar la casilla 'i'
        max_reach = max(max_reach, i + jump)
    return True


def max_non_overlapping_intervals(intervals: list[list[int]]) -> int:
    """
    Patrón Greedy de Intervalos: Ordenar por FIN (x[1]), nunca por inicio.
    """
    intervals.sort(key=lambda x: x[1])
    count = 0
    last_end = float("-inf")
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count`,
    typescriptTemplate: `export function canJumpGreedy(nums: number[]): boolean {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
    leetcodeProblems: [
      {
        number: 55,
        title: "Jump Game",
        slug: "jump-game",
        difficulty: "Medium",
        patternHint: "Mantén la frontera más lejana alcanzable `max_reach = max(max_reach, i + nums[i])`.",
      },
      {
        number: 134,
        title: "Gas Station",
        slug: "gas-station",
        difficulty: "Medium",
        patternHint: "Si `sum(gas) >= sum(cost)`, existe solución; si el tanque cae `< 0` en `i`, ninguna estación anterior podía ser el inicio, así que reinicia en `i + 1`.",
      },
      {
        number: 763,
        title: "Partition Labels",
        slug: "partition-labels",
        difficulty: "Medium",
        patternHint: "Precalcula la última aparición de cada letra y extiende el corte actual hasta `max(end, last_pos[ch])`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Contrasta Greedy con Dynamic Programming: en DP desconfías y pruebas todas las opciones guardando resultados; en Greedy confías en una regla local que descarta el resto sin arrepentirse. Enseña cómo distinguir en 30 segundos en una entrevista si un problema es Greedy o DP intentando construir un contraejemplo pequeño.",
      keyTakeaways: [
        "En problemas de selección de intervalos sin solapamiento, ordenar por hora de FIN (`end`) es óptimo; ordenar por inicio falla cuando una reunión empieza temprano pero dura todo el día.",
        "En `Jump Game` y `Gas Station`, en lugar de simular cada punto de partida, mantienes una frontera o acumulador que descarta rangos enteros de una sola vez.",
      ],
      stepByStepWalkthrough: [
        "Proponer la regla voraz candidata (ej. ordenar por menor fin, mayor ratio valor/peso, o mantener alcance máximo).",
        "Intentar romperla con un contraejemplo de 3 elementos. Si resiste y cumple la propiedad de intercambio, programarla en O(N) u O(N log N).",
      ],
      interviewTraps: [
        "Aplicar Greedy en problemas tipo `Coin Change` con monedas arbitrarias o `House Robber` donde tomar el máximo inmediato te impide tomar dos vecinos que sumaban más.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Greedy vs DP: ¿Cuándo vale la pena ser voraz?",
          visualCue: "Un escalador tomando el camino más alto inmediato vs un mapa con vista aérea.",
          narration:
            "Un algoritmo Greedy toma la mejor decisión del momento y jamás mira por el espejo retrovisor. Cuando la propiedad matemática se cumple, transforma problemas que parecerían requerir Programación Dinámica en un simple barrido lineal con O(1) de memoria.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Jump Game, Gas Station y la Regla de Ordenar por Final",
          visualCue: "Animación de `max_reach` avanzando como una ola sobre las casillas de Jump Game.",
          narration:
            "En Jump Game no nos importa qué combinación exacta de saltos dimos: solo nos importa cuál es la casilla más lejana que podemos alcanzar hasta este momento.",
        },
      ],
    },
  },
  {
    id: "memoization",
    order: 35,
    title: "Memoization (Programación Dinámica Top-Down)",
    shortTitle: "Memoization (Top-Down DP)",
    englishTerm: "Memoization / Top-Down Dynamic Programming",
    kind: "algorithm",
    level: 6,
    difficulty: "Intermediate",
    branchCategory: "dp-greedy",
    prerequisites: ["divide-and-conquer", "trees", "hash-table", "backtracking"],
    summary:
      "La forma más natural e intuitiva de dominar la Programación Dinámica: escribes primero la solución recursiva de decisiones (como en DFS/Backtracking) y le agregas una **caché (`memo` o `@cache`)** para que cada subproblema único se calcule **una sola vez** y luego se responda en O(1).",
    analogy:
      "Si alguien te pregunta cuánto es `347 × 89`, haces la cuenta en un papel y te toma 30 segundos, pero anotas el resultado en un post-it. Si cinco minutos después te vuelven a preguntar `347 × 89`, no vuelves a multiplicar: miras tu post-it y respondes en medio segundo.",
    whenToUse: [
      "El problema pide el **máximo, mínimo o número total de formas** de hacer algo, y al dibujar el árbol de decisiones ves que **el mismo estado se repite por distintos caminos** (Subproblemas Superpuestos).",
      "Cuando no todos los estados posibles son alcanzables o cuando el orden de transición es complejo de ordenar iterativamente.",
      "Como primer paso en cualquier problema de DP antes de (opcionalmente) pasarlo a una tabla Bottom-Up.",
    ],
    whenNotToUse: [
      "Si la profundidad de recursión supera el límite de la pila en lenguajes con stack pequeño o necesitas optimizar el espacio de O(N) a O(1) (ahí traduce tu Memoization a DP Bottom-Up).",
    ],
    timeComplexity: {
      average: "O(Número de Estados Únicos × Costo de Transición por Estado)",
      worst: "Polinomial (pasa de O(2ᴺ) a O(N) u O(N²))",
      note: "Fórmula universal para calcular el Big-O de cualquier Memoization: `(Estados posibles de los argumentos) × (Trabajo dentro de 1 llamada sin contar la recursión)`.",
    },
    spaceComplexity: "O(Estados Únicos) en el diccionario `memo` + O(Profundidad) en Call Stack",
    constraintHint: "Decisiones recursivas con estados repetidos (N ≤ 10³ para 2D, N ≤ 10⁵ para 1D)",
    pythonTemplate: `from functools import cache

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

    return dfs(0)`,
    typescriptTemplate: `export function houseRobberMemo(nums: number[]): number {
  const memo = new Map<number, number>();

  function dfs(i: number): number {
    if (i >= nums.length) return 0;
    if (memo.has(i)) return memo.get(i)!;

    const ans = Math.max(dfs(i + 1), nums[i] + dfs(i + 2));
    memo.set(i, ans);
    return ans;
  }

  return dfs(0);
}`,
    leetcodeProblems: [
      {
        number: 70,
        title: "Climbing Stairs",
        slug: "climbing-stairs",
        difficulty: "Easy",
        patternHint: "`dfs(i) = dfs(i + 1) + dfs(i + 2)` con `memo`: poda el árbol de Fibonacci de O(2ᴺ) a O(N).",
      },
      {
        number: 198,
        title: "House Robber",
        slug: "house-robber",
        difficulty: "Medium",
        patternHint: "Decisión binaria en cada índice: `max(dfs(i + 1), nums[i] + dfs(i + 2))`.",
      },
      {
        number: 494,
        title: "Target Sum",
        slug: "target-sum",
        difficulty: "Medium",
        patternHint: "Estado de 2 variables `dfs(i, current_sum)` memoizado en diccionario `(i, current_sum)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Quítale todo el miedo a la Programación Dinámica: explica que Memoization NO es más que una función recursiva normal (`dfs`) a la que le pones una libreta de notas (`memo` o `@cache` en Python). Muestra visualmente cómo el árbol exponencial de `Climbing Stairs` o `House Robber` se poda hasta convertirse en una línea recta O(N).",
      keyTakeaways: [
        "Ecuación fundamental: `Backtracking (fuerza bruta recursiva) + Caché de estados = Memoization (Top-Down DP)`.",
        "El 'Estado' son únicamente los parámetros que cambian de una llamada recursiva a otra (ej. `i`, o `(i, capacidad_restante)`).",
        "En Python 3.9+, el decorador `@functools.cache` convierte cualquier función recursiva pura en Programación Dinámica Top-Down en 1 sola línea.",
      ],
      stepByStepWalkthrough: [
        "Identificar qué decisiones tomas en cada paso (ej. tomar o saltar el elemento `i`) y qué variables definen el Estado.",
        "Escribir la función recursiva `dfs(estado)` con sus casos base.",
        "Agregar un diccionario `memo` (o `@cache`): si `estado in memo`, retornar `memo[estado]` inmediatamente antes de calcular.",
      ],
      interviewTraps: [
        "Pasar listas mutables o variables innecesarias como argumentos de `dfs(...)`, haciendo que el estado no sea hasheable o que el número de estados explote.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "Desmitificando DP: Solo es Recursión con Memoria",
          visualCue: "Árbol de Fibonacci donde todas las ramas repetidas se iluminan en verde y se leen en O(1) de una tabla.",
          narration:
            "Si ya entiendes recursión en árboles y Backtracking, ya sabes el 90% de Programación Dinámica. El único problema de la recursión pura es que tiene amnesia: resuelve el mismo subproblema miles de veces. Memoization le regala una libreta de apuntes.",
        },
        {
          timestamp: "02:00 - 04:45",
          sectionTitle: "Cómo definir el Estado y calcular la complejidad en 5 segundos",
          visualCue: "Fórmula en pantalla: Complejidad = (# Estados Únicos) × (Costo por Transición).",
          narration:
            "Para saber cuánto tarda tu solución con Memoization ni siquiera tienes que dibujar el árbol: cuenta cuántos valores posibles pueden tomar los parámetros de tu función y multiplícalo por el trabajo interno de una llamada.",
        },
      ],
    },
  },
  {
    id: "dynamic-programming",
    order: 36,
    title: "Dynamic Programming (DP Bottom-Up y Patrones Clásicos)",
    shortTitle: "Dynamic Programming",
    englishTerm: "Bottom-Up Dynamic Programming (1D, 2D, Knapsack, LCS, LIS)",
    kind: "algorithm",
    level: 6,
    difficulty: "Advanced",
    branchCategory: "dp-greedy",
    prerequisites: ["memoization", "arrays", "matrices-grids"],
    summary:
      "Construir la solución óptima de abajo hacia arriba (Bottom-Up) llenando iterativamente una tabla `dp` desde los casos más pequeños hasta `N`, sin usar recursión y permitiendo **optimizar la memoria** (ej. de una tabla `O(N)` a solo 2 variables `O(1)`, o de `O(N × M)` a una sola fila `O(M)`).",
    analogy:
      "Subir una escalera construyendo cada escalón apoyándote firmemente en los dos escalones anteriores que ya dejaste terminados. Como para construir el escalón #10 solo necesitas apoyarte en el #9 y el #8, ni siquiera necesitas guardar los escalones del #1 al #7 en memoria.",
    whenToUse: [
      "**DP 1D Lineal / Secuencias**: `House Robber`, `Coin Change`, `Decode Ways`, `Longest Increasing Subsequence (LIS)`.",
      "**DP de Mochila (0/1 Knapsack & Unbounded Knapsack)**: `Partition Equal Subset Sum`, `Coin Change I & II`.",
      "**DP 2D en Grids o Dos Strings**: `Unique Paths`, `Minimum Path Sum`, `Longest Common Subsequence (LCS)`, `Edit Distance`.",
      "**DP de Intervalos**: `Burst Balloons`, `Longest Palindromic Subsequence`.",
    ],
    whenNotToUse: [
      "Si el problema pide devolver TODAS las listas detalladas de soluciones posibles y el tamaño de salida es exponencial (ahí usa Backtracking).",
    ],
    timeComplexity: {
      average: "1D: O(N) o O(N·K) | 2D / Knapsack / LCS: O(N × M)",
      worst: "Polinomial según dimensiones de la tabla `dp`",
      note: "Si `dp[i]` solo depende de `dp[i-1]` y `dp[i-2]`, puedes reducir el espacio a O(1).",
    },
    spaceComplexity: "O(N) o O(N × M), optimizable a O(1) u O(M) con Rolling Array",
    constraintHint: "'Min/Max/Number of ways' con subproblemas superpuestos y N ≤ 10³ - 10⁵",
    pythonTemplate: `def coin_change_bottom_up(coins: list[int], amount: int) -> int:
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
    return dp[m][n]`,
    typescriptTemplate: `export function coinChangeBottomUp(coins: number[], amount: number): number {
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
}`,
    leetcodeProblems: [
      {
        number: 322,
        title: "Coin Change",
        slug: "coin-change",
        difficulty: "Medium",
        patternHint: "`dp[a] = min(dp[a], 1 + dp[a - coin])` con `dp[0] = 0`.",
      },
      {
        number: 1143,
        title: "Longest Common Subsequence",
        slug: "longest-common-subsequence",
        difficulty: "Medium",
        patternHint: "Tabla `(M+1) × (N+1)`: si las letras coinciden suma `1 + diagonal`; si no, `max(arriba, izquierda)`.",
      },
      {
        number: 300,
        title: "Longest Increasing Subsequence",
        slug: "longest-increasing-subsequence",
        difficulty: "Medium",
        patternHint: "DP clásica O(N²) `dp[i] = max(1 + dp[j])` u optimizada con Binary Search (Patience Sorting) en O(N log N).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Estructura este episodio como la guía definitiva de las 4 grandes familias de Programación Dinámica Bottom-Up: 1) DP Lineal 1D (`House Robber`), 2) Mochila / Knapsack (`Coin Change`, `Partition Equal Subset Sum`), 3) DP de Dos Secuencias (`Longest Common Subsequence`, `Edit Distance`), y 4) LIS (`Longest Increasing Subsequence`). Enseña la receta de 4 pasos: Definición de `dp[i]`, Caso Base, Ecuación de Transición y Orden de Llenado.",
      keyTakeaways: [
        "Antes de escribir un bucle de DP, escribe en un comentario en español qué significa exactamente `dp[i]` o `dp[i][j]`.",
        "En 0/1 Knapsack (cada objeto se usa máximo 1 vez), si optimizas a un arreglo 1D debes recorrer la capacidad **hacia atrás** (`for w in range(target, num - 1, -1)`) para no reutilizar el mismo objeto dos veces.",
        "En DP de dos strings (`LCS`, `Edit Distance`), agregar una fila 0 y columna 0 para el string vacío elimina todos los `if` de bordes.",
      ],
      stepByStepWalkthrough: [
        "1. Definir el significado exacto de `dp[i]`.",
        "2. Inicializar la tabla con el valor neutro (`0` para conteo/máximo, `inf` para mínimo) y fijar el caso base (`dp[0]`).",
        "3. Escribir la ecuación de recurrencia mirando qué estados previos alimentan al estado actual.",
        "4. (Bonus en entrevista) Si solo miras la fila anterior, reducir el espacio con dos filas `prev` y `curr`.",
      ],
      interviewTraps: [
        "En 0/1 Knapsack con arreglo 1D, iterar la capacidad de izquierda a derecha en vez de derecha a izquierda: de izquierda a derecha convierte el problema por accidente en Unbounded Knapsack (usando el mismo elemento múltiples veces).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "De Top-Down a Bottom-Up: Llenando la tabla desde los cimientos",
          visualCue: "Transformación de las flechas recursivas de Memoization en una tabla que se llena de izquierda a derecha.",
          narration:
            "Ya sabemos que Memoization resuelve DP de arriba hacia abajo. Ahora daremos el paso profesional: llenar la tabla directamente desde el caso base hacia arriba, eliminando la recursión y abriendo la puerta a reducir la memoria a O(1).",
        },
        {
          timestamp: "02:00 - 05:30",
          sectionTitle: "Las 4 Familias Clásicas: Lineal, Knapsack, LCS y LIS",
          visualCue: "Cuatro cuadrantes visuales mostrando las transiciones de flechas de cada familia de DP.",
          narration:
            "El 90% de los problemas de Programación Dinámica en entrevistas pertenecen a una de cuatro familias: secuencias 1D, problemas de mochila como Coin Change, alineación de dos strings como LCS, o subsecuencias crecientes como LIS.",
        },
      ],
    },
  },
  {
    id: "bitmask-dp",
    order: 37,
    title: "Bitmask DP (Programación Dinámica con Máscaras de Bits)",
    shortTitle: "Bitmask DP",
    englishTerm: "Bitmask Dynamic Programming (TSP & Subset States)",
    kind: "algorithm",
    level: 6,
    difficulty: "Expert",
    branchCategory: "dp-greedy",
    prerequisites: ["dynamic-programming", "memoization", "backtracking"],
    summary:
      "Representar un subconjunto de elementos visitados o usados mediante los bits `0` y `1` de un solo número entero (`mask` de `0` a `2ᴺ - 1`). Permite memoizar estados de tipo *'¿qué elementos ya usé?'* reduciendo problemas factoriales $O(N!)$ (como el Problema del Viajante - TSP) a $O(N^2 \cdot 2^N)$.",
    analogy:
      "Un panel de 15 interruptores de luz en la pared: en lugar de llevar una lista escrita con los nombres de las habitaciones encendidas, fotografías los 15 interruptores como un número binario (`010110...`). Ese único número entero resume al instante qué habitaciones ya visitaste y cuáles faltan.",
    whenToUse: [
      "La restricción del problema es muy específica: **$N \le 15$ o $N \le 20$** (demasiado grande para $O(N!)$ que solo aguanta hasta $N \le 11$, pero perfecto para $2^{20} \approx 10^6$).",
      "Necesitas asignar tareas a trabajadores, emparejar elementos, o encontrar el recorrido óptimo visitando todos los nodos (`Traveling Salesperson Problem - TSP`, `Shortest Path Visiting All Nodes`).",
    ],
    whenNotToUse: [
      "Si $N > 22$: $2^{25}$ son más de 33 millones de estados y agotará el tiempo y la memoria.",
    ],
    timeComplexity: {
      average: "O(N · 2ᴺ) o O(N² · 2ᴺ)",
      worst: "O(N² · 2ᴺ)",
      note: "Para N = 15, `15! = 1.3 × 10¹²` (TLE imposible), mientras que `15² × 2¹⁵ = 7.3 × 10⁶` (corre en ~0.05 segundos).",
    },
    spaceComplexity: "O(N · 2ᴺ) para la tabla de estados `(u, mask)`",
    constraintHint: "¡Señal inconfundible! 12 ≤ N ≤ 20 y el estado depende del subconjunto de elementos ya usados",
    pythonTemplate: `from functools import cache

def tsp_bitmask_dp(dist: list[list[int]]) -> int:
    """
    Plantilla Clásica de Bitmask DP (Problema del Viajante / TSP).
    mask: entero de N bits donde el bit 'i' es 1 si la ciudad 'i' ya fue visitada.
    all_visited = (1 << n) - 1   (ej. para n=4 es 1111 en binario = 15)
    Tiempo: O(N^2 * 2^N) | Espacio: O(N * 2^N)
    """
    n = len(dist)
    all_visited = (1 << n) - 1

    @cache
    def dfs(u: int, mask: int) -> int:
        # Caso base: todas las ciudades tienen su bit en 1
        if mask == all_visited:
            return dist[u][0]  # Regresar al origen (o return 0 si no pide volver)

        best = float("inf")
        for v in range(n):
            # Verificar si el bit 'v' está APAGADO (ciudad 'v' aún no visitada)
            if not (mask & (1 << v)):
                # Encender el bit 'v' usando OR: mask | (1 << v)
                best = min(best, dist[u][v] + dfs(v, mask | (1 << v)))
        return best

    # Empezamos en la ciudad 0 con el bit 0 encendido (mask = 1)
    return dfs(0, 1)`,
    typescriptTemplate: `export function tspBitmaskDP(dist: number[][]): number {
  const n = dist.length;
  const allVisited = (1 << n) - 1;
  const memo: number[][] = Array.from({ length: n }, () =>
    new Array<number>(1 << n).fill(-1)
  );

  function dfs(u: number, mask: number): number {
    if (mask === allVisited) return dist[u][0];
    if (memo[u][mask] !== -1) return memo[u][mask];

    let best = Infinity;
    for (let v = 0; v < n; v++) {
      if ((mask & (1 << v)) === 0) {
        best = Math.min(best, dist[u][v] + dfs(v, mask | (1 << v)));
      }
    }
    memo[u][mask] = best;
    return best;
  }

  return dfs(0, 1);
}`,
    leetcodeProblems: [
      {
        number: 847,
        title: "Shortest Path Visiting All Nodes",
        slug: "shortest-path-visiting-all-nodes",
        difficulty: "Hard",
        patternHint: "BFS/DP donde el estado es `(nodo_actual, mask_de_visitados)` hasta alcanzar `mask == (1 << n) - 1`.",
      },
      {
        number: 1879,
        title: "Minimum XOR Sum of Two Arrays",
        slug: "minimum-xor-sum-of-two-arrays",
        difficulty: "Hard",
        patternHint: "Con `N <= 14`, `dfs(mask)` asigna el elemento `bit_count(mask)` de `nums1` a cualquier elemento libre en `mask` de `nums2`.",
      },
      {
        number: 698,
        title: "Partition to K Equal Sum Subsets",
        slug: "partition-to-k-equal-sum-subsets",
        difficulty: "Medium",
        patternHint: "Con `N <= 16`, memoiza `mask` de elementos ya colocados en cubetas.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Enseña la señal de radar más poderosa para problemas Hard de entrevistas: 'Cuando veas `N <= 15` o `N <= 20`, piensa inmediatamente en Bitmask DP'. Explica las 3 operaciones de bits que necesita saber (`(mask >> i) & 1` para leer si el elemento `i` ya se usó, `mask | (1 << i)` para marcarlo como usado, y `(1 << n) - 1` para saber que ya se usaron todos) y por qué pasar de `N!` a `2^N` es la diferencia entre 15 minutos y 50 milisegundos.",
      keyTakeaways: [
        "No puedes usar un `set` ni una `list` como llave de `@cache` en DP porque son mutables y lentos, pero un entero `mask` es inmutable, ocupa 1 palabra de CPU y se indexa en O(1).",
        "Por qué ahorra tanto tiempo: ir por `0 -> 1 -> 2 -> 3` e ir por `0 -> 2 -> 1 -> 3` llegan al MISMO estado `(nodo_actual = 3, visitados = {0,1,2,3})`. El factorial las calcula por separado; Bitmask DP las fusiona.",
      ],
      stepByStepWalkthrough: [
        "Confirmar en los Constraints que $N \le 20$.",
        "Definir `all_visited = (1 << n) - 1`.",
        "Probar cada candidato `v` cuyo bit esté apagado `if not (mask & (1 << v)):` y llamar recursivamente con `mask | (1 << v)`.",
      ],
      interviewTraps: [
        "En lenguajes como JS/C++/Python, olvidar los paréntesis en `(mask & (1 << v)) == 0`, ya que `==` tiene mayor precedencia que `&` en varios lenguajes.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "La pista secreta en el enunciado: ¿Por qué N <= 16?",
          visualCue: "Comparación dramática entre `16! = 20 billones` vs `2^16 = 65,536` estados.",
          narration:
            "Cuando abras un problema Hard y veas que N es menor o igual a 16 o 20, sonríe: el autor del problema te acaba de confesar que la solución es Bitmask DP. Con N igual a 16, probar permutaciones en orden factorial explota, pero los subconjuntos posibles son apenas 65 mil.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Las 3 operaciones de máscara y el Problema del Viajante (TSP)",
          visualCue: "Un número binario de 5 bits encendiendo casillas con `mask | (1 << v)`.",
          narration:
            "En vez de pasar un arreglo booleano de visitados a nuestra recursión, empaquetamos todo ese arreglo en los bits de un único número entero. Así el estado `(ciudad_actual, mascara)` se guarda en caché al instante.",
        },
      ],
    },
  },
];

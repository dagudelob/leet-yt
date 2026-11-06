import { FlowchartQuestionNode } from "@/types/dsa";

export interface VisualDecisionBranch {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  borderColor: string;
  bgGlow: string;
  rootQuestion: string;
  steps: Array<{
    question: string;
    yesLabel: string;
    yesTopics: string[];
    noLabel?: string;
    noTopics?: string[];
  }>;
}

export interface ConstraintCheatsheetRow {
  constraint: string;
  maxN: number;
  targetComplexity: string;
  explanation: string;
  recommendedTopicIds: string[];
}

export const CONSTRAINT_CHEATSHEET: ConstraintCheatsheetRow[] = [
  {
    constraint: "N ≤ 11",
    maxN: 11,
    targetComplexity: "O(N!) o O(2ᴺ)",
    explanation: "Espacio diminuto: puedes enumerar todas las permutaciones o asignaciones por fuerza bruta recursiva.",
    recommendedTopicIds: ["backtracking", "brute-force"],
  },
  {
    constraint: "12 ≤ N ≤ 20",
    maxN: 20,
    targetComplexity: "O(2ᴺ) o O(N² · 2ᴺ)",
    explanation: "Señal clásica de subconjuntos o Bitmask DP: 2²⁰ ≈ 10⁶ operaciones cabe perfecto en 1 segundo.",
    recommendedTopicIds: ["bitmask-dp", "backtracking"],
  },
  {
    constraint: "N ≤ 400",
    maxN: 400,
    targetComplexity: "O(N³)",
    explanation: "Permite algoritmos cúbicos como DP de intervalos, multiplicación de matrices o Floyd-Warshall.",
    recommendedTopicIds: ["dynamic-programming", "brute-force", "simulation"],
  },
  {
    constraint: "N ≤ 5,000",
    maxN: 5000,
    targetComplexity: "O(N²)",
    explanation: "5000² = 2.5 × 10⁷ operaciones: ideal para DP 2D (LCS, Knapsack), grafos densos o fijar i + Two Pointers (3Sum).",
    recommendedTopicIds: ["dynamic-programming", "memoization", "two-pointers", "matrices-grids", "dfs", "bfs"],
  },
  {
    constraint: "N ≤ 200,000 (10⁵)",
    maxN: 200000,
    targetComplexity: "O(N log N) u O(N)",
    explanation: "¡Prohibido O(N²)! Necesitas Sorting, Heaps, Binary Search, Sliding Window, Two Pointers, Hash Map, Monotonic Stack o Grafos O(V+E).",
    recommendedTopicIds: [
      "sliding-window",
      "two-pointers",
      "hash-table",
      "prefix-sum",
      "binary-search",
      "sorting-intervals",
      "monotonic-stack",
      "heaps",
      "heap-sorting",
      "dijkstra",
      "topological-sort-dag",
      "disjoint-set-union",
      "fenwick-tree",
      "segment-tree",
      "greedy",
    ],
  },
  {
    constraint: "N ≤ 1,000,000 (10⁶)",
    maxN: 1000000,
    targetComplexity: "O(N) estricto",
    explanation: "Incluso O(N log N) puede ser ajustado: prioriza un solo pase lineal O(N) con Hashing, Counting Sort, KMP, Trie o Bit Manipulation.",
    recommendedTopicIds: ["counting", "prefix-sum", "string-matching", "rolling-hash", "tries", "bit-manipulation", "number-theory"],
  },
  {
    constraint: "N ≥ 10⁹",
    maxN: 1000000000,
    targetComplexity: "O(log N) u O(1)",
    explanation: "Ni siquiera puedes hacer un bucle de 1 a N: necesitas Binary Search en espacio de respuestas, Exponenciación Binaria, Euclides GCD o fórmula matemática cerrada.",
    recommendedTopicIds: ["binary-search", "math", "number-theory", "bit-manipulation"],
  },
];

/**
 * ÁRBOL DE DECISIÓN INTERACTIVO (MODO ASISTENTE PASO A PASO + FLOWCHART)
 * Permite responder preguntas sobre el problema actual hasta aterrizar en el nodo exacto.
 */
export const FLOWCHART_DECISION_NODES: Record<string, FlowchartQuestionNode> = {
  "q-root": {
    id: "q-root",
    label: "¿Cuál es la estructura de entrada o el objetivo principal de tu problema?",
    sublabel: "Punto de partida del Flowchart (inspirado en AlgoMonster)",
    category: "Root",
    options: [
      {
        label: "Arreglo 1D o Secuencia de Números",
        conditionHint: "Subarreglos, pares, búsquedas, ordenamiento o rangos",
        targetNodeId: "q-array-main",
        isTopic: false,
      },
      {
        label: "Strings / Cadenas de Texto",
        conditionHint: "Substrings, anagramas, prefijos, palíndromos o búsqueda de patrones",
        targetNodeId: "q-string-main",
        isTopic: false,
      },
      {
        label: "Árboles Binarios o Jerarquías",
        conditionHint: "TreeNode, BST, ancestros, niveles o subárboles",
        targetNodeId: "q-tree-main",
        isTopic: false,
      },
      {
        label: "Grafos, Redes o Tableros 2D (Matrices/Islas)",
        conditionHint: "Rutas más cortas, conectividad, dependencias (DAG) o laberintos",
        targetNodeId: "q-graph-main",
        isTopic: false,
      },
      {
        label: "Optimización, Conteo de Formas o Subconjuntos",
        conditionHint: "'Máximo/Mínimo', 'Número de formas', 'Generar todas las combinaciones'",
        targetNodeId: "q-opt-main",
        isTopic: false,
      },
      {
        label: "Listas Enlazadas, Pilas, Colas o Diseño de Clases",
        conditionHint: "ListNode, LIFO/FIFO, Next Greater Element o LRU Cache",
        targetNodeId: "q-linked-stack-main",
        isTopic: false,
      },
      {
        label: "Matemáticas, Bits, Primos o N ≥ 10⁹",
        conditionHint: "XOR, divisores, aritmética modular o geometría",
        targetNodeId: "q-math-bits-main",
        isTopic: false,
      },
    ],
  },

  // --- RAMA 1: ARRAYS ---
  "q-array-main": {
    id: "q-array-main",
    label: "¿Qué propiedad tiene el arreglo o qué operación te piden sobre él?",
    sublabel: "Rama de Arreglos y Secuencias",
    category: "Arrays",
    options: [
      {
        label: "El arreglo está ORDENADO (o rotado) / Condición monótona False→True",
        conditionHint: "O(log N) o punteros en extremos O(N)",
        targetNodeId: "q-array-sorted",
        isTopic: false,
      },
      {
        label: "Busco un SUBARREGLO CONTIGUO (ventana más larga, más corta o suma K)",
        conditionHint: "Elementos adyacentes sin saltos",
        targetNodeId: "q-array-subarray",
        isTopic: false,
      },
      {
        label: "Involucra INTERVALOS [start, end] (reuniones, traslapes, calendarios)",
        conditionHint: "Fusionar, contar salas o insertar rangos",
        targetNodeId: "q-array-intervals",
        isTopic: false,
      },
      {
        label: "Consultas repetidas en RANGOS [L, R] (suma, máximo o mínimo)",
        conditionHint: "Con o sin actualizaciones dinámicas",
        targetNodeId: "q-array-range-queries",
        isTopic: false,
      },
      {
        label: "Encontrar Top-K, Mediana, K-ésimo mayor o Frecuencias en O(N)",
        conditionHint: "Selección y ordenamiento parcial",
        targetNodeId: "q-array-topk",
        isTopic: false,
      },
      {
        label: "Búsqueda rápida O(1) de complementos/duplicados o manipulación base",
        conditionHint: "Arreglo desordenado general",
        targetNodeId: "q-array-unsorted-basic",
        isTopic: false,
      },
    ],
  },
  "q-array-sorted": {
    id: "q-array-sorted",
    label: "En este arreglo ordenado (o espacio monótono), ¿qué necesitas encontrar?",
    category: "Arrays",
    options: [
      {
        label: "Un elemento objetivo, frontera primera vez True, o minimizar el máximo posible",
        conditionHint: "Descartar la mitad en cada paso → O(log N)",
        targetNodeId: "binary-search",
        isTopic: true,
      },
      {
        label: "Un par o tripleta que sume Target, o compactar duplicados in-place en O(1) espacio",
        conditionHint: "Dos índices moviéndose coordinadamente → O(N)",
        targetNodeId: "two-pointers",
        isTopic: true,
      },
    ],
  },
  "q-array-subarray": {
    id: "q-array-subarray",
    label: "¿El subarreglo contiguo puede tener números NEGATIVOS que afecten la suma?",
    category: "Arrays",
    options: [
      {
        label: "NO hay negativos (o la condición de validez es monótona al expandir/contraer)",
        conditionHint: "Ventana elástica [left..right] en O(N)",
        targetNodeId: "sliding-window",
        isTopic: true,
      },
      {
        label: "SÍ hay números negativos y busco subarreglos con suma exacta K",
        conditionHint: "pref[R] - pref[L] == K guardado en Hash Map",
        targetNodeId: "prefix-sum",
        isTopic: true,
      },
    ],
  },
  "q-array-intervals": {
    id: "q-array-intervals",
    label: "¿Qué necesitas hacer con los intervalos [start, end]?",
    category: "Arrays",
    options: [
      {
        label: "Fusionar intervalos superpuestos o detectar huecos libres",
        conditionHint: "Ordenar por start y comparar curr.start <= prev.end",
        targetNodeId: "sorting-intervals",
        isTopic: true,
      },
      {
        label: "Elegir el MÁXIMO número de intervalos que NO se solapen entre sí",
        conditionHint: "Ordenar vorazmente por punto de FIN (end)",
        targetNodeId: "greedy",
        isTopic: true,
      },
      {
        label: "Saber cuántos intervalos están activos al mismo tiempo (pico de concurrencia)",
        conditionHint: "Eventos +1 al abrir y -1 al cerrar (Sweep Line)",
        targetNodeId: "specialized-advanced",
        isTopic: true,
      },
    ],
  },
  "q-array-range-queries": {
    id: "q-array-range-queries",
    label: "¿Los valores del arreglo CAMBIAN entre una consulta de rango [L, R] y otra?",
    category: "Arrays",
    options: [
      {
        label: "NO cambian (el arreglo es estático / inmutable)",
        conditionHint: "Precalcular en O(N) y responder en O(1)",
        targetNodeId: "prefix-sum",
        isTopic: true,
      },
      {
        label: "SÍ cambian (updates puntuales) y necesito SUMAS de rango en O(log N)",
        conditionHint: "15 líneas con el truco de bits i & -i",
        targetNodeId: "fenwick-tree",
        isTopic: true,
      },
      {
        label: "SÍ cambian (puntuales o rangos enteros) y necesito MÍNIMO, MÁXIMO o función general",
        conditionHint: "Árbol binario de intervalos en O(log N)",
        targetNodeId: "segment-tree",
        isTopic: true,
      },
    ],
  },
  "q-array-topk": {
    id: "q-array-topk",
    label: "¿Cómo necesitas extraer los elementos más grandes, frecuentes o la mediana?",
    category: "Arrays",
    options: [
      {
        label: "Top-K en flujo continuo, K-Way Merge o Mediana en vivo (Two Heaps)",
        conditionHint: "O(N log K) con Priority Queue",
        targetNodeId: "heap-sorting",
        isTopic: true,
      },
      {
        label: "Hallar el K-ésimo mayor en O(N) promedio in-place o clasificar en 3 grupos (0, 1, 2)",
        conditionHint: "QuickSelect / Dutch National Flag",
        targetNodeId: "partitioning",
        isTopic: true,
      },
      {
        label: "Los valores o frecuencias están acotados en [0..N] y quiero ordenar en O(N) puro",
        conditionHint: "Sin comparaciones usando cubetas",
        targetNodeId: "counting",
        isTopic: true,
      },
      {
        label: "Insertar/borrar dinámicamente consultando el vecino más cercano >= X en O(log N)",
        conditionHint: "SortedList / Balanced BST",
        targetNodeId: "ordered-set",
        isTopic: true,
      },
    ],
  },
  "q-array-unsorted-basic": {
    id: "q-array-unsorted-basic",
    label: "¿Qué necesitas hacer sobre el arreglo?",
    category: "Arrays",
    options: [
      {
        label: "Recordar elementos vistos, frecuencias o índices en O(1) (ej. Two Sum)",
        conditionHint: "Trade-off memoria O(N) por tiempo O(1)",
        targetNodeId: "hash-table",
        isTopic: true,
      },
      {
        label: "Entender el techo de complejidad Big-O según el límite N del problema",
        conditionHint: "Análisis de Constraints",
        targetNodeId: "basic-dsa",
        isTopic: true,
      },
      {
        label: "Manipulación contigua en memoria, rotaciones in-place o productos prefijo/sufijo",
        conditionHint: "Operaciones base de Array",
        targetNodeId: "arrays",
        isTopic: true,
      },
      {
        label: "Simular reglas explícitas paso a paso o probar pares cuando N es pequeño",
        conditionHint: "Simulation / Brute Force",
        targetNodeId: "simulation",
        isTopic: true,
      },
    ],
  },

  // --- RAMA 2: STRINGS ---
  "q-string-main": {
    id: "q-string-main",
    label: "¿Qué tipo de problema sobre Strings estás resolviendo?",
    sublabel: "Rama de Cadenas y Búsqueda de Texto",
    category: "Strings",
    options: [
      {
        label: "Substring más largo/corto que cumpla una condición de caracteres o anagrama",
        conditionHint: "Ventana deslizante sobre string en O(N)",
        targetNodeId: "sliding-window",
        isTopic: true,
      },
      {
        label: "Autocompletado, diccionario de muchas palabras o búsqueda por PREFIJOS (startsWith)",
        conditionHint: "Árbol de prefijos letra por letra",
        targetNodeId: "tries",
        isTopic: true,
      },
      {
        label: "Buscar un patrón exacto en O(N+M), detectar cadenas periódicas o Shortest Palindrome",
        conditionHint: "Tabla de prefijos-sufijos LPS sin retroceder",
        targetNodeId: "string-matching",
        isTopic: true,
      },
      {
        label: "Comparar substrings en O(1) o hallar el substring duplicado más largo",
        conditionHint: "Hash polinomial rodante (Rabin-Karp)",
        targetNodeId: "rolling-hash",
        isTopic: true,
      },
      {
        label: "Frecuencias de 26 letras ('a'-'z'), inmutabilidad y manipulación base de caracteres",
        conditionHint: "Fundamentos de Strings y ASCII",
        targetNodeId: "strings",
        isTopic: true,
      },
    ],
  },

  // --- RAMA 3: ÁRBOLES ---
  "q-tree-main": {
    id: "q-tree-main",
    label: "¿Qué característica tiene el Árbol o cómo necesitas recorrerlo?",
    sublabel: "Rama de Árboles Binarios",
    category: "Trees",
    options: [
      {
        label: "Es un Árbol Binario de Búsqueda (BST: left < root < right)",
        conditionHint: "Descartar mitades en O(H) o recorrido In-Order ordenado",
        targetNodeId: "bst",
        isTopic: true,
      },
      {
        label: "Necesito recorrer NIVEL POR NIVEL (piso por piso) o hallar la hoja más cercana",
        conditionHint: "Cola FIFO con len(queue)",
        targetNodeId: "bfs",
        isTopic: true,
      },
      {
        label: "Calcular alturas, diámetros, sumas de ramas o propiedades recursivas de subárboles",
        conditionHint: "Pre-order, In-order y Post-order",
        targetNodeId: "trees",
        isTopic: true,
      },
      {
        label: "Partir un problema en mitades recursivas independientes y combinar sus respuestas",
        conditionHint: "Divide and Conquer",
        targetNodeId: "divide-and-conquer",
        isTopic: true,
      },
    ],
  },

  // --- RAMA 4: GRAFOS Y MATRICES 2D ---
  "q-graph-main": {
    id: "q-graph-main",
    label: "¿Qué te piden resolver en el Grafo o Cuadrícula 2D?",
    sublabel: "Rama de Grafos, DAGs y Tableros",
    category: "Graphs",
    options: [
      {
        label: "Encontrar el CAMINO MÁS CORTO (menor distancia o costo)",
        conditionHint: "Depende de si las aristas tienen peso o no",
        targetNodeId: "q-graph-shortest",
        isTopic: false,
      },
      {
        label: "Hay PRERREQUISITOS, dependencias de tareas, un DAG o debo detectar ciclos dirigidos",
        conditionHint: "Orden Topológico (Algoritmo de Kahn) y DP en DAG",
        targetNodeId: "topological-sort-dag",
        isTopic: true,
      },
      {
        label: "Unir grupos dinámicamente, contar componentes al agregar aristas o Árbol de Expansión Mínima (MST)",
        conditionHint: "find(x) y union(a, b) en O(α(N)) ≈ O(1)",
        targetNodeId: "disjoint-set-union",
        isTopic: true,
      },
      {
        label: "Contar islas, explorar componentes conexas o Flood Fill en profundidad",
        conditionHint: "Recursión marcando visitados",
        targetNodeId: "dfs",
        isTopic: true,
      },
      {
        label: "Modelar aristas en Lista de Adyacencia, grados de nodos o grafo Bipartito (2 colores)",
        conditionHint: "Representación fundamental de Grafos",
        targetNodeId: "graphs",
        isTopic: true,
      },
      {
        label: "Rotar o recorrer una Matriz 2D in-place o manejar coordenadas (r, c)",
        conditionHint: "Matrices y Grids 2D",
        targetNodeId: "matrices-grids",
        isTopic: true,
      },
    ],
  },
  "q-graph-shortest": {
    id: "q-graph-shortest",
    label: "¿Las aristas del grafo tienen PESOS (costos distintos) o todas valen 1 paso?",
    category: "Graphs",
    options: [
      {
        label: "TODAS las aristas valen 1 (sin pesos) o hay propagación simultánea (Multi-Source)",
        conditionHint: "BFS con Cola FIFO en O(V + E)",
        targetNodeId: "bfs",
        isTopic: true,
      },
      {
        label: "Tienen PESOS positivos distintos (w ≥ 0) y busco la ruta más barata",
        conditionHint: "Dijkstra con Min-Heap en O(E log V)",
        targetNodeId: "dijkstra",
        isTopic: true,
      },
    ],
  },

  // --- RAMA 5: OPTIMIZACIÓN, CONTEO Y COMBINATORIA ---
  "q-opt-main": {
    id: "q-opt-main",
    label: "¿Qué tipo de salida y tamaño de entrada N tiene tu problema de optimización/conteo?",
    sublabel: "Rama de Backtracking, Greedy y Programación Dinámica",
    category: "Optimization",
    options: [
      {
        label: "Pide LISTAR TODAS las combinaciones, permutaciones o subconjuntos (N ≤ 20)",
        conditionHint: "Elegir -> Explorar -> Deshacer (pop)",
        targetNodeId: "backtracking",
        isTopic: true,
      },
      {
        label: "12 ≤ N ≤ 20 y el costo óptimo depende de QUÉ subconjunto de elementos ya visité/usé",
        conditionHint: "Empaquetar visitados en un entero binario mask",
        targetNodeId: "bitmask-dp",
        isTopic: true,
      },
      {
        label: "Existe una regla local voraz comprobable (ej. alcance máximo o fin más temprano) sin arrepentirse",
        conditionHint: "Óptimo local → Óptimo global en O(N) / O(N log N)",
        targetNodeId: "greedy",
        isTopic: true,
      },
      {
        label: "Hay decisiones recursivas con subproblemas repetidos y quiero agregar caché (@cache)",
        conditionHint: "Programación Dinámica Top-Down",
        targetNodeId: "memoization",
        isTopic: true,
      },
      {
        label: "Quiero llenar una tabla 1D/2D iterativa (Knapsack, Coin Change, LCS, LIS) y optimizar memoria",
        conditionHint: "Programación Dinámica Bottom-Up",
        targetNodeId: "dynamic-programming",
        isTopic: true,
      },
    ],
  },

  // --- RAMA 6: LINKED LISTS, STACKS, QUEUES & DESIGN ---
  "q-linked-stack-main": {
    id: "q-linked-stack-main",
    label: "¿Con qué estructura lineal o patrón de diseño estás trabajando?",
    sublabel: "Rama de Punteros, Pilas, Colas y Diseño",
    category: "Linear & Design",
    options: [
      {
        label: "Encontrar el 'Siguiente Elemento Mayor/Menor', temperaturas, histogramas o máximo en ventana",
        conditionHint: "Pila o Deque ordenada que desapila al romper la monotonía",
        targetNodeId: "monotonic-stack",
        isTopic: true,
      },
      {
        label: "Detectar ciclos en O(1) espacio, hallar la mitad o invertir una Linked List in-place",
        conditionHint: "Fast & Slow Pointers (Floyd) y reversión de 3 punteros",
        targetNodeId: "linkedlist-manipulation",
        isTopic: true,
      },
      {
        label: "Insertar/borrar nodos con punteros y usar un Nodo Dummy (Centinela)",
        conditionHint: "Estructura Linked List Simple y Doble",
        targetNodeId: "linked-list",
        isTopic: true,
      },
      {
        label: "Validar paréntesis anidados, evaluar expresiones RPN o decodificar strings anidados",
        conditionHint: "Pila LIFO (Last-In, First-Out)",
        targetNodeId: "stacks",
        isTopic: true,
      },
      {
        label: "Procesar en orden de llegada FIFO o insertar/sacar por ambos extremos en O(1)",
        conditionHint: "Queues & Deques (collections.deque)",
        targetNodeId: "queues-deques",
        isTopic: true,
      },
      {
        label: "Diseñar una estructura híbrida O(1) como LRU Cache, MinStack o RandomizedSet",
        conditionHint: "Combinar Hash Map + Doubly Linked List / Array",
        targetNodeId: "system-ds-design",
        isTopic: true,
      },
      {
        label: "Extraer continuamente el elemento más prioritario (mínimo o máximo) en O(log N)",
        conditionHint: "Binary Heap / Priority Queue",
        targetNodeId: "heaps",
        isTopic: true,
      },
    ],
  },

  // --- RAMA 7: MATEMÁTICAS, BITS Y ESPECIALIZADOS ---
  "q-math-bits-main": {
    id: "q-math-bits-main",
    label: "¿Qué herramienta matemática, de bits o patrón avanzado necesitas?",
    sublabel: "Rama de Bits, Teoría de Números y Patrones Especializados",
    category: "Math & Advanced",
    options: [
      {
        label: "Cancelar duplicados con XOR en O(1) espacio, contar bits '1' o verificar potencias de 2",
        conditionHint: "x ^ x = 0 y n & (n - 1)",
        targetNodeId: "bit-manipulation",
        isTopic: true,
      },
      {
        label: "Números primos (Criba de Eratóstenes), Máximo Común Divisor (Euclides) o Módulo 10⁹ + 7",
        conditionHint: "Teoría de Números y Aritmética Modular",
        targetNodeId: "number-theory",
        isTopic: true,
      },
      {
        label: "Exponenciación rápida Pow(x, n), combinatoria, sumas de Gauss o puntos colineales 2D",
        conditionHint: "Matemáticas y Geometría sin punto flotante",
        targetNodeId: "math",
        isTopic: true,
      },
      {
        label: "Elemento mayoritario en O(1) espacio (Boyer-Moore), Puentes (Tarjan) o Camino de Euler",
        conditionHint: "Patrones avanzados especializados",
        targetNodeId: "specialized-advanced",
        isTopic: true,
      },
    ],
  },
};

/**
 * RAMAS VISUALES DEL LIENZO FLOWCHART (ESTILO ALGOMONSTER)
 * Organiza visualmente los rombos de pregunta -> hojas de algoritmos para explorar de un vistazo.
 */
export const VISUAL_FLOWCHART_BRANCHES: VisualDecisionBranch[] = [
  {
    id: "branch-fundamentals",
    title: "0. Paso Cero: Restricciones & Base",
    subtitle: "Antes de elegir algoritmo, lee N en Constraints",
    accentColor: "text-amber-400",
    borderColor: "border-amber-500/40",
    bgGlow: "from-amber-500/15 to-transparent",
    rootQuestion: "¿Cuál es el límite de N y existen reglas paso a paso?",
    steps: [
      {
        question: "¿Cómo deduzco el Big-O máximo permitido a partir de N?",
        yesLabel: "Regla de 10⁸ ops/seg",
        yesTopics: ["basic-dsa"],
        noLabel: "¿N es pequeño o necesito un baseline rápido?",
        noTopics: ["brute-force", "simulation"],
      },
    ],
  },
  {
    id: "branch-arrays-strings",
    title: "1. Arrays, Strings & Ventanas",
    subtitle: "Secuencias contiguas, punteros y búsqueda binaria",
    accentColor: "text-cyan-400",
    borderColor: "border-cyan-500/40",
    bgGlow: "from-cyan-500/15 to-transparent",
    rootQuestion: "¿Trabajas con un Array, String o Matriz 2D?",
    steps: [
      {
        question: "¿Cuál es la estructura base de la secuencia?",
        yesLabel: "1D / Cadenas",
        yesTopics: ["arrays", "strings"],
        noLabel: "Tablero 2D (Filas × Columnas)",
        noTopics: ["matrices-grids"],
      },
      {
        question: "¿Está ORDENADO o tiene condición monótona [False...True]?",
        yesLabel: "SÍ → Descartar mitad o extremos",
        yesTopics: ["binary-search", "two-pointers"],
        noLabel: "NO → ¿Buscas subarreglo contiguo?",
        noTopics: ["sliding-window", "prefix-sum"],
      },
      {
        question: "¿Es búsqueda avanzada sobre Strings (prefijos, patrones o hashes)?",
        yesLabel: "Diccionario de prefijos",
        yesTopics: ["tries"],
        noLabel: "Substrings en O(1) o Patrón en O(N+M)",
        noTopics: ["rolling-hash", "string-matching"],
      },
    ],
  },
  {
    id: "branch-hashing-sorting",
    title: "2. Hashing, Ordenamiento & Intervalos",
    subtitle: "Lookups O(1), cubetas, particiones e intervalos",
    accentColor: "text-emerald-400",
    borderColor: "border-emerald-500/40",
    bgGlow: "from-emerald-500/15 to-transparent",
    rootQuestion: "¿Necesitas recordar vistos en O(1), ordenar o fusionar intervalos?",
    steps: [
      {
        question: "¿Necesitas consultar si un complemento o clave ya apareció en O(1)?",
        yesLabel: "SÍ → Memoria O(N) por Tiempo O(1)",
        yesTopics: ["hash-table"],
        noLabel: "¿Valores o frecuencias acotadas en [0..N]?",
        noTopics: ["counting"],
      },
      {
        question: "¿El input son intervalos [start, end] o pide el K-ésimo elemento in-place?",
        yesLabel: "Intervalos [start, end]",
        yesTopics: ["sorting-intervals"],
        noLabel: "Partición 3-vías / QuickSelect O(N)",
        noTopics: ["partitioning"],
      },
    ],
  },
  {
    id: "branch-linked-stacks",
    title: "3. Linked Lists, Stacks, Queues & Diseño",
    subtitle: "Punteros, pilas monótonas y estructuras compuestas O(1)",
    accentColor: "text-fuchsia-400",
    borderColor: "border-fuchsia-500/40",
    bgGlow: "from-fuchsia-500/15 to-transparent",
    rootQuestion: "¿Trabajas con nodos enlazados, orden LIFO/FIFO o diseño de clases?",
    steps: [
      {
        question: "¿Es una Lista Enlazada (ListNode)?",
        yesLabel: "Nodos + Dummy / Fast & Slow / Reversión",
        yesTopics: ["linked-list", "linkedlist-manipulation"],
        noLabel: "¿Anidamiento LIFO o Cola FIFO?",
        noTopics: ["stacks", "queues-deques"],
      },
      {
        question: "¿Buscas el 'Siguiente Mayor/Menor' o diseñas una clase O(1) como LRU Cache?",
        yesLabel: "Next Greater / Histograma / Ventana Max",
        yesTopics: ["monotonic-stack"],
        noLabel: "Combinar Hash Map + Lista/Array",
        noTopics: ["system-ds-design"],
      },
    ],
  },
  {
    id: "branch-trees-heaps",
    title: "4. Árboles, Heaps & Backtracking",
    subtitle: "Jerarquías, colas de prioridad Top-K y combinatoria",
    accentColor: "text-violet-400",
    borderColor: "border-violet-500/40",
    bgGlow: "from-violet-500/15 to-transparent",
    rootQuestion: "¿Estructura jerárquica, extracción continua del extremo o generar combinaciones?",
    steps: [
      {
        question: "¿Es un Árbol Binario normal o un BST con orden left < root < right?",
        yesLabel: "Árbol / Divide & Conquer",
        yesTopics: ["divide-and-conquer", "trees"],
        noLabel: "Propiedad BST",
        noTopics: ["bst"],
      },
      {
        question: "¿Necesitas extraer continuamente el Mínimo/Máximo, Top-K o la Mediana en vivo?",
        yesLabel: "SÍ → Priority Queue / Heaps",
        yesTopics: ["heaps", "heap-sorting"],
        noLabel: "¿Pide GENERAR TODAS las combinaciones/permutaciones?",
        noTopics: ["backtracking"],
      },
    ],
  },
  {
    id: "branch-graphs-dag",
    title: "5. Grafos, DAGs & Caminos Más Cortos",
    subtitle: "BFS, DFS, Dijkstra, Orden Topológico y Union-Find",
    accentColor: "text-rose-400",
    borderColor: "border-rose-500/40",
    bgGlow: "from-rose-500/15 to-transparent",
    rootQuestion: "¿Hay conexiones entre nodos, islas o dependencias?",
    steps: [
      {
        question: "¿Buscas explorar islas/componentes o el CAMINO MÁS CORTO?",
        yesLabel: "Explorar todo / Islas → DFS",
        yesTopics: ["graphs", "dfs"],
        noLabel: "Camino más corto (Sin peso: BFS | Con peso: Dijkstra)",
        noTopics: ["bfs", "dijkstra"],
      },
      {
        question: "¿Hay prerrequisitos dirigidos (DAG) o fusiones dinámicas de grupos?",
        yesLabel: "Dependencias / DAG → Kahn",
        yesTopics: ["topological-sort-dag"],
        noLabel: "Grupos dinámicos / MST → Union-Find",
        noTopics: ["disjoint-set-union"],
      },
    ],
  },
  {
    id: "branch-dp-greedy",
    title: "6. Programación Dinámica & Greedy",
    subtitle: "Optimización y conteo con subproblemas superpuestos",
    accentColor: "text-orange-400",
    borderColor: "border-orange-500/40",
    bgGlow: "from-orange-500/15 to-transparent",
    rootQuestion: "¿Pide el valor óptimo (máx/mín) o cuántas formas existen sin listar cada una?",
    steps: [
      {
        question: "¿Basta tomar siempre la mejor decisión local sin arrepentirse?",
        yesLabel: "SÍ → Greedy en O(N) / O(N log N)",
        yesTopics: ["greedy"],
        noLabel: "NO → Hay subproblemas repetidos (DP)",
        noTopics: ["memoization", "dynamic-programming"],
      },
      {
        question: "¿N ≤ 20 y el estado depende del subconjunto de elementos ya usados?",
        yesLabel: "SÍ → Bitmask DP O(N² · 2ᴺ)",
        yesTopics: ["bitmask-dp"],
      },
    ],
  },
  {
    id: "branch-advanced-range-math",
    title: "7. Rangos Dinámicos, Matemáticas & Élite",
    subtitle: "Segment/Fenwick Trees, Bits, Teoría de Números y Sweep Line",
    accentColor: "text-indigo-400",
    borderColor: "border-indigo-500/40",
    bgGlow: "from-indigo-500/15 to-transparent",
    rootQuestion: "¿Consultas de rango con updates, trucos de bits, primos o barrido de eventos?",
    steps: [
      {
        question: "¿Necesitas mantener orden dinámico o consultas de rango [L, R] con actualizaciones?",
        yesLabel: "Vecino >= X / Suma de rango",
        yesTopics: ["ordered-set", "fenwick-tree"],
        noLabel: "Min/Max de rango o Lazy Updates",
        noTopics: ["segment-tree"],
      },
      {
        question: "¿Operaciones en bits O(1), primos/módulo 10⁹+7 o patrones avanzados?",
        yesLabel: "Bits / Math / Number Theory",
        yesTopics: ["bit-manipulation", "math", "number-theory"],
        noLabel: "Sweep Line / Boyer-Moore / Tarjan",
        noTopics: ["specialized-advanced"],
      },
    ],
  },
];

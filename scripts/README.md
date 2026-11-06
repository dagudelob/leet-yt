# 🎙️ Guiones y Paquetes Híbridos para Google NotebookLM & YouTube (`leet-yt`)

Esta carpeta contiene los **46 paquetes de producción completos** organizados en **7 niveles progresivos** (enseñando cada estructura de datos justo antes de los algoritmos que la utilizan).

## 🚀 Cómo producir cada video con Google NotebookLM

1. Abre [Google NotebookLM](https://notebooklm.google.com/) y crea un nuevo cuaderno para el episodio (ej. `Episodio #07 - Sliding Window`).
2. Sube el archivo Markdown correspondiente de esta carpeta (ej. [`07-sliding-window.md`](./07-sliding-window.md)) como **Fuente (Source)**.
3. Abre la sección **Audio Overview** o **Video Overview**, haz clic en **Customize (Personalizar)** y pega el bloque de la **Sección 1 (Prompt de Dirección para Google NotebookLM)** que viene al inicio del archivo.
4. Usa la **Sección 5 (Plantilla Python)** y la **Sección 6 (Guion Narrado por Bloques + Visuales/Slides)** como apoyo visual en pantalla.
5. Una vez publicado el video en YouTube, pega la URL en [`src/data/youtube-links.ts`](../src/data/youtube-links.ts) (o desde la pestaña **Estudio YouTube & NotebookLM** de la web).

---

## 📋 Índice Maestro de los 46 Episodios

| Episodio | Nivel | Guion y Documento Fuente (.md) | Tipo | Complejidad Promedio |
| :---: | :---: | :--- | :---: | :--- |
| **#01** | Nivel 1 | [Basic DSA & Big-O Complexity](./01-basic-dsa.md) | `Algoritmo` | `O(1) < O(log N) < O(N) < O(N log N)` |
| **#02** | Nivel 1 | [Brute Force (Fuerza Bruta)](./02-brute-force.md) | `Algoritmo` | `O(N²) o O(N³) en pares/tripletas` |
| **#03** | Nivel 1 | [Simulation (Simulación Paso a Paso)](./03-simulation.md) | `Algoritmo` | `O(Pasos × Costo por paso)` |
| **#04** | Nivel 1 | [Arrays (Arreglos Estáticos y Dinámicos)](./04-arrays.md) | `Estructura` | `Acceso: O(1) | Append final: O(1) amortizado` |
| **#05** | Nivel 1 | [Strings (Cadenas de Caracteres)](./05-strings.md) | `Estructura` | `Lectura `s[i]`: O(1) | Comparación/Copia/Slice: O(N)` |
| **#06** | Nivel 1 | [Two Pointers (Dos Punteros)](./06-two-pointers.md) | `Algoritmo` | `O(N) (o O(N log N) si primero ordenas)` |
| **#07** | Nivel 1 | [Sliding Window (Ventana Deslizante)](./07-sliding-window.md) | `Algoritmo` | `O(N)` |
| **#08** | Nivel 2 | [Prefix Sums (Sumas de Prefijos 1D y 2D)](./08-prefix-sum.md) | `Algoritmo` | `Preprocesamiento: O(N) | Consulta de rango `[L, R]`: O(1)` |
| **#09** | Nivel 2 | [Hash Tables (Hash Map & Hash Set)](./09-hash-table.md) | `Híbrido` | `Insertar / Buscar / Borrar: O(1)` |
| **#10** | Nivel 2 | [Counting & Bucket Sort (Ordenamiento por Conteo)](./10-counting.md) | `Algoritmo` | `O(N + K) donde K es el número de cubetas` |
| **#11** | Nivel 2 | [Sorting + Interval Scan ( Barrido de Intervalos)](./11-sorting-intervals.md) | `Algoritmo` | `O(N log N) dominado por el ordenamiento inicial` |
| **#12** | Nivel 2 | [Partitioning (QuickSelect & Dutch National Flag)](./12-partitioning.md) | `Algoritmo` | `O(N) (QuickSelect: N + N/2 + N/4 + ... = 2N)` |
| **#13** | Nivel 2 | [Binary Search (Búsqueda Binaria y Espacio de Respuestas)](./13-binary-search.md) | `Algoritmo` | `O(log N) en arreglo | O(N log(Max - Min)) en Binary Search on Answer` |
| **#14** | Nivel 2 | [Matrices & 2D Grids (Tableros y Cuadrículas)](./14-matrices-grids.md) | `Estructura` | `Recorrido completo: O(R × C) | Acceso a celda: O(1)` |
| **#15** | Nivel 3 | [Linked Lists (Listas Enlazadas Simples y Dobles)](./15-linked-list.md) | `Estructura` | `Insertar/Borrar con puntero al nodo: O(1) | Buscar por índice/valor: O(N)` |
| **#16** | Nivel 3 | [Linked List Manipulation (Fast & Slow Pointers y Reversión)](./16-linkedlist-manipulation.md) | `Algoritmo` | `O(N)` |
| **#17** | Nivel 3 | [Stacks (Pilas LIFO y Evaluación Anidada)](./17-stacks.md) | `Híbrido` | `Push: O(1) | Pop: O(1) | Peek (`stack[-1]`): O(1)` |
| **#18** | Nivel 3 | [Queues & Deques (Colas FIFO y Colas de Doble Extremo)](./18-queues-deques.md) | `Estructura` | `append / appendleft / pop / popleft: O(1)` |
| **#19** | Nivel 3 | [Monotonic Stack & Queue (Pila y Cola Monótona)](./19-monotonic-stack.md) | `Algoritmo` | `O(N)` |
| **#20** | Nivel 3 | [Design + Supporting Data Structures (LRU Cache, O(1) Set)](./20-system-ds-design.md) | `Híbrido` | `O(1) para todas las operaciones diseñadas` |
| **#21** | Nivel 4 | [Divide and Conquer (Divide y Vencerás)](./21-divide-and-conquer.md) | `Algoritmo` | `O(N log N) cuando partes en 2 mitades y combinas en O(N)` |
| **#22** | Nivel 4 | [Trees (Árboles Binarios y Recorridos)](./22-trees.md) | `Estructura` | `Recorrido completo: O(N) visitando cada nodo 1 vez` |
| **#23** | Nivel 4 | [Binary Search Trees (Árboles Binarios de Búsqueda - BST)](./23-bst.md) | `Estructura` | `Búsqueda / Inserción / Borrado: O(log N) en BST balanceado` |
| **#24** | Nivel 4 | [DFS - Depth-First Search (Búsqueda en Profundidad)](./24-dfs.md) | `Algoritmo` | `O(V + E) en grafos | O(R × C) en cuadrículas` |
| **#25** | Nivel 4 | [BFS - Breadth-First Search (Búsqueda en Anchura)](./25-bfs.md) | `Algoritmo` | `O(V + E) en grafos | O(R × C) en cuadrículas` |
| **#26** | Nivel 4 | [Backtracking (Búsqueda Exhaustiva con Poda)](./26-backtracking.md) | `Algoritmo` | `Subconjuntos: O(N · 2ᴺ) | Permutaciones: O(N · N!)` |
| **#27** | Nivel 4 | [Heaps / Priority Queues (Montículos y Colas de Prioridad)](./27-heaps.md) | `Estructura` | `Peek (`heap[0]`): O(1) | Push / Pop: O(log N) | `heapify(lista)`: O(N)` |
| **#28** | Nivel 4 | [Heap Patterns (Top-K, K-Way Merge, Two Heaps & Heap Sort)](./28-heap-sorting.md) | `Algoritmo` | `Top-K: O(N log K) | Two Heaps insert: O(log N), median: O(1) | Heap Sort: O(N log N)` |
| **#29** | Nivel 5 | [Graphs (Representación de Grafos: Lista y Matriz de Adyacencia)](./29-graphs.md) | `Estructura` | `Construir Lista de Adyacencia: O(V + E) | Recorrer vecinos de u: O(grado(u))` |
| **#30** | Nivel 5 | [Topological Sort & DAG-Related (Orden Topológico y DP en DAGs)](./30-topological-sort-dag.md) | `Algoritmo` | `O(V + E)` |
| **#31** | Nivel 5 | [Dijkstra & Shortest Paths (Caminos Más Cortos con Pesos)](./31-dijkstra.md) | `Algoritmo` | `O((V + E) log V) usando Min-Heap` |
| **#32** | Nivel 5 | [Disjoint Set Union (DSU / Union-Find & Kruskal MST)](./32-disjoint-set-union.md) | `Híbrido` | `O(α(N)) ≈ O(1) por operación `find` o `union`` |
| **#33** | Nivel 5 | [Tries / Prefix Trees (Árboles de Prefijos)](./33-tries.md) | `Híbrido` | `Insert / Search / StartsWith: O(L) donde L es la longitud de la palabra` |
| **#34** | Nivel 6 | [Greedy Algorithms (Algoritmos Voraces)](./34-greedy.md) | `Algoritmo` | `O(N) en barrido directo | O(N log N) si requiere ordenar antes` |
| **#35** | Nivel 6 | [Memoization (Programación Dinámica Top-Down)](./35-memoization.md) | `Algoritmo` | `O(Número de Estados Únicos × Costo de Transición por Estado)` |
| **#36** | Nivel 6 | [Dynamic Programming (DP Bottom-Up y Patrones Clásicos)](./36-dynamic-programming.md) | `Algoritmo` | `1D: O(N) o O(N·K) | 2D / Knapsack / LCS: O(N × M)` |
| **#37** | Nivel 6 | [Bitmask DP (Programación Dinámica con Máscaras de Bits)](./37-bitmask-dp.md) | `Algoritmo` | `O(N · 2ᴺ) o O(N² · 2ᴺ)` |
| **#38** | Nivel 7 | [Ordered Set & Balanced BSTs (Conjuntos Ordenados Dinámicos)](./38-ordered-set.md) | `Híbrido` | `add / remove / bisect_left / index `s[k]`: O(log N)` |
| **#39** | Nivel 7 | [Fenwick Tree / Binary Indexed Tree (BIT)](./39-fenwick-tree.md) | `Híbrido` | `Update: O(log N) | Prefix/Range Query: O(log N)` |
| **#40** | Nivel 7 | [Segment Tree (Árbol de Segmentos y Lazy Propagation)](./40-segment-tree.md) | `Híbrido` | `Build: O(N) | Update: O(log N) | Range Query `[L, R]`: O(log N)` |
| **#41** | Nivel 7 | [Rolling Hash (Hash Rodante y Rabin-Karp)](./41-rolling-hash.md) | `Algoritmo` | `Precalcular o deslizar ventana: O(N) | Consultar hash de substring `s[L..R]`: O(1)` |
| **#42** | Nivel 7 | [String Matching (Algoritmo KMP y Función Prefijo LPS)](./42-string-matching.md) | `Algoritmo` | `Construir LPS: O(M) | Buscar en texto: O(N) → Total: O(N + M)` |
| **#43** | Nivel 7 | [Bit Manipulation (Manipulación de Bits y Trucos XOR)](./43-bit-manipulation.md) | `Algoritmo` | `O(1) por operación de bit | O(N) en barrido sobre arreglo` |
| **#44** | Nivel 7 | [Math & Geometry (Matemáticas, Combinatoria y Geometría)](./44-math.md) | `Algoritmo` | `Fórmulas de Gauss: O(1) | Binary Exponentiation: O(log N)` |
| **#45** | Nivel 7 | [Number Theory (Teoría de Números: GCD, Criba de Eratóstenes y Módulo)](./45-number-theory.md) | `Algoritmo` | `Euclides GCD: O(log(min(a,b))) | Criba de Eratóstenes: O(N log log N) ≈ O(N)` |
| **#46** | Nivel 7 | [Specialized Advanced Patterns (Sweep Line, Boyer-Moore, Tarjan & Euler)](./46-specialized-advanced.md) | `Algoritmo` | `Boyer-Moore: O(N) tiempo, O(1) espacio | Sweep Line: O(N log N) | Tarjan / Hierholzer: O(V + E)` |

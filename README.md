# 🧭 Leet-YT — Flowchart Interactivo de Algoritmos, Estructuras de Datos & Estudio YouTube / NotebookLM

[![License: MIT](https://img.shields.io/badge/License-MIT-violet.svg)](./LICENSE)
[![Stack: Vite + React + TS + Tailwind](https://img.shields.io/badge/Lovable_Stack-Vite_%2B_React_%2B_TS_%2B_Tailwind-06b6d4)](https://lovable.dev)
[![Topics: 46 Nodos DSA](https://img.shields.io/badge/Nodos_DSA-46_Episodios-10b981)](./scripts/README.md)

**Leet-YT** es una plataforma web interactiva (inspirada en el [Flowchart de AlgoMonster](https://algo.monster/flowchart) y en rutas progresivas como NeetCode) diseñada para acompañar una serie de **46 videos en YouTube** donde cada nodo del árbol de decisión cuenta con:

1. **Flowchart de Decisión Interactivo + Asistente Paso a Paso (`¿Qué Algoritmo Uso?`)**: Rombos de decisión basados en las propiedades del problema y calculadora de restricciones ($N \to \text{Complejidad Big-O}$).
2. **Ruta de Aprendizaje Progresiva en 7 Niveles**: Ordenada pedagógicamente del **Episodio `#01` al `#46`**, introduciendo cada **Estructura de Datos** justo antes de los **Patrones Algorítmicos** que la utilizan.
3. **Panel de Estudio por Nodo**:
   - 🎬 **Reproductor de YouTube integrado** + Analogía del mundo real + Señales del enunciado + Falsos positivos.
   - 💻 **Plantillas de Código ("Code Templates")** listas para entrevistas en **Python 3** y **TypeScript / JavaScript**.
   - 🏆 **Top Problemas de LeetCode** por tema con pista de aplicación y seguimiento de progreso local (`localStorage`).
   - 🎙️ **Kit de Producción para Google NotebookLM**: Prompt de Dirección para *Customize* + Documento Fuente + Escaleta narrada con sugerencias visuales.

---

## 🗺️ Organización Pedagógica: Los 46 Episodios en 7 Niveles

Todos los guiones híbridos se encuentran listos en la carpeta [`/scripts/`](./scripts/README.md) y también son accesibles desde la pestaña **"3. Estudio YouTube & NotebookLM"** dentro de la aplicación web.

### Nivel 1: Fundamentos, Complejidad y Secuencias Lineales
| # | Nodo / Tema | Tipo | Guion NotebookLM |
| :---: | :--- | :---: | :--- |
| **01** | **Basic DSA & Big-O Complexity** (Lectura de Constraints $N$) | Algoritmo | [`scripts/01-basic-dsa.md`](./scripts/01-basic-dsa.md) |
| **02** | **Brute Force** (Fuerza Bruta y Búsqueda Exhaustiva) | Algoritmo | [`scripts/02-brute-force.md`](./scripts/02-brute-force.md) |
| **03** | **Simulation** (Simulación y Vectores de Dirección) | Algoritmo | [`scripts/03-simulation.md`](./scripts/03-simulation.md) |
| **04** | **Arrays** (Arreglos Estáticos y Dinámicos) | Estructura | [`scripts/04-arrays.md`](./scripts/04-arrays.md) |
| **05** | **Strings** (Cadenas, Inmutabilidad y Firma ASCII de 26 letras) | Estructura | [`scripts/05-strings.md`](./scripts/05-strings.md) |
| **06** | **Two Pointers** (Dos Punteros Convergentes y Lector/Escritor) | Algoritmo | [`scripts/06-two-pointers.md`](./scripts/06-two-pointers.md) |
| **07** | **Sliding Window** (Ventana Deslizante Fija y Dinámica) | Algoritmo | [`scripts/07-sliding-window.md`](./scripts/07-sliding-window.md) |

### Nivel 2: Preprocesamiento, Hashing, Ordenamiento y Búsqueda
| # | Nodo / Tema | Tipo | Guion NotebookLM |
| :---: | :--- | :---: | :--- |
| **08** | **Prefix Sums** (Sumas de Prefijos 1D, 2D y Subarray Sum = K) | Algoritmo | [`scripts/08-prefix-sum.md`](./scripts/08-prefix-sum.md) |
| **09** | **Hash Tables** (Hash Map & Hash Set: Lookups $O(1)$) | Híbrido | [`scripts/09-hash-table.md`](./scripts/09-hash-table.md) |
| **10** | **Counting & Bucket Sort** (Ordenamiento por Conteo y Frecuencia en $O(N)$) | Algoritmo | [`scripts/10-counting.md`](./scripts/10-counting.md) |
| **11** | **Sorting + Interval Scan** (Fusión y Barrido de Intervalos) | Algoritmo | [`scripts/11-sorting-intervals.md`](./scripts/11-sorting-intervals.md) |
| **12** | **Partitioning** (QuickSelect $O(N)$ y Bandera Holandesa 3-Way) | Algoritmo | [`scripts/12-partitioning.md`](./scripts/12-partitioning.md) |
| **13** | **Binary Search** (Búsqueda Binaria y en Espacio de Respuestas) | Algoritmo | [`scripts/13-binary-search.md`](./scripts/13-binary-search.md) |
| **14** | **Matrices & 2D Grids** (Tableros 2D, Rotación In-Place y Vecinos) | Estructura | [`scripts/14-matrices-grids.md`](./scripts/14-matrices-grids.md) |

### Nivel 3: Punteros Enlazados, Pilas, Colas y Diseño $O(1)$
| # | Nodo / Tema | Tipo | Guion NotebookLM |
| :---: | :--- | :---: | :--- |
| **15** | **Linked Lists** (Listas Enlazadas Simples, Dobles y Nodo Dummy) | Estructura | [`scripts/15-linked-list.md`](./scripts/15-linked-list.md) |
| **16** | **Linked List Manipulation** (Fast & Slow Pointers de Floyd y Reversión) | Algoritmo | [`scripts/16-linkedlist-manipulation.md`](./scripts/16-linkedlist-manipulation.md) |
| **17** | **Stacks** (Pilas LIFO y Evaluación de Expresiones Anidadas) | Híbrido | [`scripts/17-stacks.md`](./scripts/17-stacks.md) |
| **18** | **Queues & Deques** (Colas FIFO, Cola Circular y Deque $O(1)$) | Estructura | [`scripts/18-queues-deques.md`](./scripts/18-queues-deques.md) |
| **19** | **Monotonic Stack & Queue** (Next Greater Element, Histogramas y Ventana Máxima) | Algoritmo | [`scripts/19-monotonic-stack.md`](./scripts/19-monotonic-stack.md) |
| **20** | **Design + Supporting Data Structures** (LRU Cache, MinStack, RandomizedSet $O(1)$) | Híbrido | [`scripts/20-system-ds-design.md`](./scripts/20-system-ds-design.md) |

### Nivel 4: Recursión, Árboles, Heaps y Backtracking
| # | Nodo / Tema | Tipo | Guion NotebookLM |
| :---: | :--- | :---: | :--- |
| **21** | **Divide and Conquer** (Divide y Vencerás y Merge Sort) | Algoritmo | [`scripts/21-divide-and-conquer.md`](./scripts/21-divide-and-conquer.md) |
| **22** | **Trees** (Árboles Binarios y Recorridos Pre / In / Post-Order) | Estructura | [`scripts/22-trees.md`](./scripts/22-trees.md) |
| **23** | **Binary Search Trees (BST)** (Invariante `left < root < right` e In-Order) | Estructura | [`scripts/23-bst.md`](./scripts/23-bst.md) |
| **24** | **DFS — Depth-First Search** (Búsqueda en Profundidad e Islas) | Algoritmo | [`scripts/24-dfs.md`](./scripts/24-dfs.md) |
| **25** | **BFS — Breadth-First Search** (Recorrido por Niveles y Camino Más Corto Sin Peso) | Algoritmo | [`scripts/25-bfs.md`](./scripts/25-bfs.md) |
| **26** | **Backtracking** (Elegir → Explorar → Deshacer y Poda Combinatoria) | Algoritmo | [`scripts/26-backtracking.md`](./scripts/26-backtracking.md) |
| **27** | **Heaps / Priority Queues** (Min-Heap, Max-Heap y `heapify` en $O(N)$) | Estructura | [`scripts/27-heaps.md`](./scripts/27-heaps.md) |
| **28** | **Heap Patterns** (Top-K Elements, K-Way Merge, Two Heaps y Heap Sort) | Algoritmo | [`scripts/28-heap-sorting.md`](./scripts/28-heap-sorting.md) |

### Nivel 5: Grafos, DAGs, Caminos Cortos, Conectividad y Tries
| # | Nodo / Tema | Tipo | Guion NotebookLM |
| :---: | :--- | :---: | :--- |
| **29** | **Graphs** (Lista y Matriz de Adyacencia, Grados y Bipartición) | Estructura | [`scripts/29-graphs.md`](./scripts/29-graphs.md) |
| **30** | **Topological Sort & DAG-Related** (Algoritmo de Kahn, Ciclos y DP sobre DAGs) | Algoritmo | [`scripts/30-topological-sort-dag.md`](./scripts/30-topological-sort-dag.md) |
| **31** | **Dijkstra & Shortest Paths** (Caminos Más Cortos con Pesos y Relajación) | Algoritmo | [`scripts/31-dijkstra.md`](./scripts/31-dijkstra.md) |
| **32** | **Disjoint Set Union (DSU / Union-Find)** (Compresión de Caminos y Kruskal MST) | Híbrido | [`scripts/32-disjoint-set-union.md`](./scripts/32-disjoint-set-union.md) |
| **33** | **Tries / Prefix Trees** (Árboles de Prefijos y Búsqueda en Diccionarios) | Híbrido | [`scripts/33-tries.md`](./scripts/33-tries.md) |

### Nivel 6: Optimización, Greedy y Programación Dinámica
| # | Nodo / Tema | Tipo | Guion NotebookLM |
| :---: | :--- | :---: | :--- |
| **34** | **Greedy Algorithms** (Elección Voraz Local, Jump Game e Intervalos) | Algoritmo | [`scripts/34-greedy.md`](./scripts/34-greedy.md) |
| **35** | **Memoization** (Programación Dinámica Top-Down con Caché) | Algoritmo | [`scripts/35-memoization.md`](./scripts/35-memoization.md) |
| **36** | **Dynamic Programming** (DP Bottom-Up: 1D, 2D, Knapsack, LCS y LIS) | Algoritmo | [`scripts/36-dynamic-programming.md`](./scripts/36-dynamic-programming.md) |
| **37** | **Bitmask DP** (DP con Máscaras de Bits para $N \le 20$ y TSP) | Algoritmo | [`scripts/37-bitmask-dp.md`](./scripts/37-bitmask-dp.md) |

### Nivel 7: Rangos Dinámicos, Strings Avanzados, Matemáticas y Élite
| # | Nodo / Tema | Tipo | Guion NotebookLM |
| :---: | :--- | :---: | :--- |
| **38** | **Ordered Set & Balanced BSTs** (`SortedList`, Predecesor y Sucesor en $O(\log N)$) | Híbrido | [`scripts/38-ordered-set.md`](./scripts/38-ordered-set.md) |
| **39** | **Fenwick Tree / Binary Indexed Tree (BIT)** (Sumas de Rango Dinámicas con `i & -i`) | Híbrido | [`scripts/39-fenwick-tree.md`](./scripts/39-fenwick-tree.md) |
| **40** | **Segment Tree** (Consultas de Rango Min/Max/Sum y Lazy Propagation) | Híbrido | [`scripts/40-segment-tree.md`](./scripts/40-segment-tree.md) |
| **41** | **Rolling Hash** (Hash Polinomial Rodante y Rabin-Karp en $O(1)$) | Algoritmo | [`scripts/41-rolling-hash.md`](./scripts/41-rolling-hash.md) |
| **42** | **String Matching** (Algoritmo KMP y Tabla Prefijo-Sufijo LPS en $O(N+M)$) | Algoritmo | [`scripts/42-string-matching.md`](./scripts/42-string-matching.md) |
| **43** | **Bit Manipulation** (Trucos XOR y Algoritmo de Brian Kernighan `n & (n-1)`) | Algoritmo | [`scripts/43-bit-manipulation.md`](./scripts/43-bit-manipulation.md) |
| **44** | **Math & Geometry** (Exponenciación Binaria, Gauss y Pendientes con GCD) | Algoritmo | [`scripts/44-math.md`](./scripts/44-math.md) |
| **45** | **Number Theory** (Euclides GCD, Criba de Eratóstenes y Módulo $10^9+7$) | Algoritmo | [`scripts/45-number-theory.md`](./scripts/45-number-theory.md) |
| **46** | **Specialized Advanced Patterns** (Sweep Line, Boyer-Moore, Tarjan y Euler) | Algoritmo | [`scripts/46-specialized-advanced.md`](./scripts/46-specialized-advanced.md) |

---

## 🛠️ Stack Tecnológico (100% Compatible con Lovable)

- **Framework:** [Vite](https://vitejs.dev/) + [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v3](https://tailwindcss.com/) + `tailwindcss-animate`
- **Iconografía:** [`lucide-react`](https://lucide.dev/)
- **Enrutamiento:** `react-router-dom` v6

### Cómo desplegar en Lovable o ejecutar localmente

1. **En Lovable:** Conecta directamente el repositorio público `dagudelob/leet-yt` desde GitHub; Lovable detectará automáticamente la estructura `Vite + React + TypeScript + Tailwind` y desplegará la web sin configuración adicional.
2. **En local:**
   ```bash
   npm install
   npm run dev
   ```
3. **Cómo agregar tus links de YouTube conforme publiques cada video:**
   - Opción A (Desde la Web): Entra a la pestaña **"3. Estudio YouTube & NotebookLM"**, pega la URL de YouTube en el episodio correspondiente y haz clic en **"Exportar youtube-links.ts"**.
   - Opción B (En el código): Edita directamente [`src/data/youtube-links.ts`](./src/data/youtube-links.ts).

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo [`LICENSE`](./LICENSE) para más detalles.

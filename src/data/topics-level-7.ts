import { DSATopic } from "@/types/dsa";

export const TOPICS_LEVEL_7: DSATopic[] = [
  // ============================================================================
  // NIVEL 7: ESTRUCTURAS DE RANGO, STRINGS AVANZADOS, MATEMÁTicas Y ESPECIALIZADOS (38 - 46)
  // ============================================================================
  {
    id: "ordered-set",
    order: 38,
    title: "Ordered Set & Balanced BSTs (Conjuntos Ordenados Dinámicos)",
    shortTitle: "Ordered Set",
    englishTerm: "Ordered Set / SortedList & Balanced BST Operations",
    kind: "hybrid",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["bst", "binary-search"],
    summary:
      "Colección dinámica auto-balanceada (`SortedList` / `SortedSet` de `sortedcontainers` en Python, `std::set` en C++, `TreeSet` en Java) que mantiene los elementos ordenados en todo momento permitiendo **insertar, borrar y buscar el vecino más cercano (`>= x` o `<= x`) en O(log N)**.",
    analogy:
      "Una biblioteca mágica donde cada vez que devuelves un libro nuevo, los estantes se acomodan solos en `log N` pasos, permitiéndote preguntar al instante no solo si existe un libro, sino '¿cuál es el libro de precio inmediatamente superior a $45?' o '¿cuántos libros cuestan menos de $30?'.",
    whenToUse: [
      "Necesitas insertar y eliminar números dinámicamente Y consultar en cada paso el **sucesor (`>= x` / `bisect_left`)**, el **predecesor (`<= x` / `bisect_right - 1`)**, o **cuántos elementos menores que `x`** han aparecido hasta ahora.",
      "Mantener intervalos activos sin solapamiento en un calendario dinámico (`My Calendar I`) o una ventana deslizante ordenada (`Contains Duplicate III`, `Sliding Window Median`).",
    ],
    whenNotToUse: [
      "Si todos los datos están fijos desde el principio (no necesitas un Ordered Set dinámico; basta ordenar el arreglo una vez y usar Binary Search). Si solo necesitas el mínimo o máximo extremo, usa un Heap (más ligero).",
    ],
    timeComplexity: {
      average: "add / remove / bisect_left / index `s[k]`: O(log N)",
      worst: "O(log N)",
      note: "En LeetCode Python, la librería `from sortedcontainers import SortedList` viene instalada por defecto.",
    },
    spaceComplexity: "O(N)",
    constraintHint: "Inserción/Borrado dinámico + Búsqueda de vecino más cercano o rango en O(log N)",
    pythonTemplate: `# En LeetCode Python, 'sortedcontainers' está incluido en el entorno oficial:
from sortedcontainers import SortedList

def contains_nearby_almost_duplicate(nums: list[int], indexDiff: int, valueDiff: int) -> bool:
    """
    Patrón Clásico de Ordered Set en Ventana Deslizante (LeetCode 220).
    Buscamos si en los últimos 'indexDiff' elementos existe alguno en [x - valueDiff, x + valueDiff].
    Tiempo: O(N log(indexDiff)) | Espacio: O(indexDiff)
    """
    window = SortedList()
    for i, x in enumerate(nums):
        # 1. Buscar el menor elemento en la ventana que sea >= x - valueDiff
        pos = window.bisect_left(x - valueDiff)
        if pos < len(window) and window[pos] <= x + valueDiff:
            return True

        # 2. Insertar el actual y retirar el que sale de la ventana de tamaño indexDiff
        window.add(x)
        if i >= indexDiff:
            window.remove(nums[i - indexDiff])
    return False`,
    typescriptTemplate: `// En TypeScript/JS podemos usar Búsqueda Binaria sobre arreglo mantenido o compresión + Fenwick Tree
export function lowerBound(sortedArr: number[], target: number): number {
  let low = 0,
    high = sortedArr.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (sortedArr[mid] >= target) high = mid;
    else low = mid + 1;
  }
  return low;
}`,
    leetcodeProblems: [
      {
        number: 729,
        title: "My Calendar I",
        slug: "my-calendar-i",
        difficulty: "Medium",
        patternHint: "Guarda intervalos ordenados y usa `bisect_left` para revisar solo el evento inmediatamente anterior y el siguiente.",
      },
      {
        number: 220,
        title: "Contains Duplicate III",
        slug: "contains-duplicate-iii",
        difficulty: "Hard",
        patternHint: "Mantén un `SortedList` de los últimos `k` elementos y consulta `bisect_left(x - t)`.",
      },
      {
        number: 315,
        title: "Count of Smaller Numbers After Self",
        slug: "count-of-smaller-numbers-after-self",
        difficulty: "Hard",
        patternHint: "Recorre de derecha a izquierda: `window.bisect_left(x)` te dice en O(log N) cuántos menores ya viste.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica qué vacío llena el Ordered Set entre el Hash Set (que es O(1) pero está totalmente desordenado) y el Heap (que solo ve el mínimo o máximo en la punta). Revela el arma secreta para entrevistas en Python: que LeetCode incluye preinstalado `from sortedcontainers import SortedList`.",
      keyTakeaways: [
        "Hash Set = búsqueda exacta O(1) sin orden. Heap = solo mínimo/máximo en O(log N). Ordered Set = inserción, borrado y búsqueda de vecinos cercanos `>= x` en O(log N).",
        "En Python usa `from sortedcontainers import SortedList` con `.add(x)`, `.remove(x)` y `.bisect_left(x)`.",
      ],
      stepByStepWalkthrough: [
        "Identificar que el problema pide insertar/borrar elementos Y hacer preguntas de orden o cercanía (`>= x`, `<= x`, o el K-ésimo elemento activo).",
        "Consultar el vecino con `idx = sl.bisect_left(target)` y verificar que `idx < len(sl)`.",
        "Actualizar la colección con `sl.add(x)` y `sl.remove(old)`.",
      ],
      interviewTraps: [
        "Usar `list.insert(idx, x)` tras un `bisect` sobre una lista normal de Python creyendo que es O(log N): la búsqueda es O(log N), pero insertar en medio de una `list` sigue siendo O(N). Usa `SortedList`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Hash Set vs Heap vs Ordered Set: La tríada de colecciones",
          visualCue: "Tabla comparativa mostrando por qué ni el Hash Set ni el Heap pueden responder '¿cuál es el elemento más cercano a X?'.",
          narration:
            "Un Hash Set no sabe quién es mayor que quién, y un Heap solo conoce al campeón que está en la cima. Cuando necesitas que toda tu colección se mantenga ordenada mientras entran y salen datos en vivo, entra en escena el Ordered Set.",
        },
        {
          timestamp: "01:45 - 04:15",
          sectionTitle: "SortedList en Python y el patrón de Vecino Más Cercano",
          visualCue: "Ventana deslizante consultando el piso y techo de `x` con `bisect_left`.",
          narration:
            "Con `bisect_left` sobre un conjunto ordenado, encuentras en tiempo logarítmico el elemento inmediatamente mayor o igual y el inmediatamente menor, resolviendo problemas de calendarios y duplicados cercanos en pocas líneas.",
        },
      ],
    },
  },
  {
    id: "fenwick-tree",
    order: 39,
    title: "Fenwick Tree / Binary Indexed Tree (BIT)",
    shortTitle: "Fenwick Tree (BIT)",
    englishTerm: "Fenwick Tree / Binary Indexed Tree (BIT)",
    kind: "hybrid",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["prefix-sum", "trees"],
    summary:
      "Un Prefix Sum dinámico en apenas 15 líneas de código: utiliza el bit menos significativo (`i & -i`) para que **tanto actualizar un elemento (`update`) como consultar la suma de cualquier rango `[L, R]` (`query`) tomen tiempo O(log N)**.",
    analogy:
      "En lugar de que cada escalón guarde la suma de todos los anteriores (que obligaría a corregir todos los escalones siguientes si cambia el primero), agrupamos las sumas en potencias de 2 (escalones de 1, 2, 4, 8, 16...). Así, cualquier cambio o suma se arma saltando por a lo sumo `log₂ N` bloques.",
    whenToUse: [
      "El problema combina **actualizaciones puntuales (`nums[i] += delta`)** intercaladas con **consultas de suma en rangos (`sum(nums[L..R])`)** (`Range Sum Query - Mutable`).",
      "Contar inversiones o cuántos elementos menores/mayores que `x` han aparecido hasta ahora (usando los valores o sus rangos comprimidos como índices del Fenwick Tree).",
    ],
    whenNotToUse: [
      "Si el arreglo nunca cambia (usa un simple Prefix Sum en O(1) por consulta).",
      "Si necesitas consultar el **mínimo o máximo de un rango arbitrario `[L, R]` con actualizaciones que disminuyen o aumentan libremente**: la operación `min/max` no tiene inverso como la resta `query(R) - query(L-1)`, por lo que ahí necesitas un **Segment Tree**.",
    ],
    timeComplexity: {
      average: "Update: O(log N) | Prefix/Range Query: O(log N)",
      worst: "O(log N)",
      note: "Usa índices 1-based (`1..N`) porque `0 & -0 == 0` atraparía el bucle en 0.",
    },
    spaceComplexity: "O(N) un único arreglo `tree` de tamaño `N + 1`",
    constraintHint: "Sumas de rango dinámicas con actualizaciones o conteo por orden en O(N log N)",
    pythonTemplate: `class FenwickTree:
    """
    Binary Indexed Tree (BIT / Fenwick Tree) en 15 líneas.
    IMPORTANTE: Internamente siempre es 1-indexed (índices de 1 a N).
    Truco de bit: (i & -i) extrae la mayor potencia de 2 que divide a 'i'.
    """
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (n + 1)

    def add(self, i: int, delta: int) -> None:
        """Suma 'delta' en el índice 1-based 'i' en O(log N)."""
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i

    def prefix_sum(self, i: int) -> int:
        """Retorna la suma de [1..i] en O(log N)."""
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

    def range_sum(self, left: int, right: int) -> int:
        """Retorna la suma de [left..right] (1-based) en O(log N)."""
        return self.prefix_sum(right) - self.prefix_sum(left - 1)`,
    typescriptTemplate: `export class FenwickTree {
  private tree: number[];
  private n: number;

  constructor(n: number) {
    this.n = n;
    this.tree = new Array<number>(n + 1).fill(0);
  }

  add(i: number, delta: number): void {
    for (; i <= this.n; i += i & -i) {
      this.tree[i] += delta;
    }
  }

  prefixSum(i: number): number {
    let sum = 0;
    for (; i > 0; i -= i & -i) {
      sum += this.tree[i];
    }
    return sum;
  }

  rangeSum(left: number, right: number): number {
    return this.prefixSum(right) - this.prefixSum(left - 1);
  }
}`,
    leetcodeProblems: [
      {
        number: 307,
        title: "Range Sum Query - Mutable",
        slug: "range-sum-query-mutable",
        difficulty: "Medium",
        patternHint: "Usa `bit.add(i + 1, new_val - old_val)` para actualizar y `bit.range_sum(L + 1, R + 1)` para consultar.",
      },
      {
        number: 315,
        title: "Count of Smaller Numbers After Self",
        slug: "count-of-smaller-numbers-after-self",
        difficulty: "Hard",
        patternHint: "Comprime coordenadas (Rank Compression) y recorre de derecha a izquierda consultando `bit.prefix_sum(rank - 1)`.",
      },
      {
        number: 493,
        title: "Reverse Pairs",
        slug: "reverse-pairs",
        difficulty: "Hard",
        patternHint: "Cuenta cuántos elementos previos superan `2 * nums[j]` usando Fenwick Tree con compresión de coordenadas o Merge Sort.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Presenta el Fenwick Tree como 'la joya de 15 líneas que todo entrevistado avanzado ama': mientras un Segment Tree toma 50 líneas, un Fenwick Tree se escribe en 2 minutos gracias al truco binario `i & -i` (aislar el último bit encendido). Explica por qué el índice DEBE empezar en 1 (`1-based`).",
      keyTakeaways: [
        "En un Array normal: `update` es O(1) y `range_sum` es O(N). En Prefix Sum: `update` es O(N) y `range_sum` es O(1). En Fenwick Tree: **AMBOS son O(log N)**.",
        "La expresión `i & -i` (complemento a dos) aísla el bit menos significativo: para subir hacia los padres haces `i += i & -i`; para sumar prefijos haces `i -= i & -i`.",
        "Siempre suma `+1` a los índices 0-based de LeetCode antes de pasarlos al Fenwick Tree.",
      ],
      stepByStepWalkthrough: [
        "Crear `tree = [0] * (n + 1)`.",
        "En `add(i, delta)`, mientras `i <= n`, sumar `delta` y avanzar con `i += i & -i`.",
        "En `prefix_sum(i)`, mientras `i > 0`, acumular `tree[i]` y retroceder con `i -= i & -i`.",
      ],
      interviewTraps: [
        "Pasar el índice `0` a `add(0, delta)`: como `0 & -0` es `0`, el bucle `while i <= n: i += i & -i` nunca avanza y se queda colgado en un ciclo infinito.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "El dilema del Prefix Sum cuando los datos cambian",
          visualCue: "Comparación de tiempos entre Array, Prefix Sum y Fenwick Tree (O(log N) en ambos).",
          narration:
            "El Prefix Sum era perfecto hasta que alguien cambió un número del arreglo y nos obligó a recalcular toda la tabla en O(N). El Árbol de Fenwick resuelve este dilema logrando tanto actualizaciones como sumas de rango en tiempo logarítmico con apenas quince líneas de código.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "La magia de `i & -i` y la Compresión de Coordenadas",
          visualCue: "Escalera de potencias de 2 mostrando cómo `13 (1101₂)` salta a `12 (1100₂)` y a `8 (1000₂)`.",
          narration:
            "Todo el secreto del Fenwick Tree reside en la operación `i & -i`, que extrae la última potencia de dos de cualquier número. Restándola en cada paso, descomponemos cualquier rango en a lo sumo log(N) saltos.",
        },
      ],
    },
  },
  {
    id: "segment-tree",
    order: 40,
    title: "Segment Tree (Árbol de Segmentos y Lazy Propagation)",
    shortTitle: "Segment Tree",
    englishTerm: "Segment Tree & Lazy Propagation",
    kind: "hybrid",
    level: 7,
    difficulty: "Expert",
    branchCategory: "advanced-math-range",
    prerequisites: ["fenwick-tree", "divide-and-conquer", "trees"],
    summary:
      "La estructura de datos definitiva para consultas y actualizaciones sobre **intervalos `[L, R]`**: un árbol binario donde cada nodo representa un subsegmento del arreglo y almacena cualquier función asociativa (**Mínimo, Máximo, Suma, GCD, XOR**) en **O(log N)**.",
    analogy:
      "Un gerente regional de ventas: el CEO tiene el récord del país completo `[0..7]`; debajo tiene al director de la mitad oeste `[0..3]` y la mitad este `[4..7]`, y así hasta cada tienda individual. Si pides el máximo de las tiendas `[1..6]`, no visitas las 6 tiendas: le preguntas a un par de gerentes intermedios que cubren exactamente ese bloque en `log N` llamadas.",
    whenToUse: [
      "Necesitas consultar el **Mínimo, Máximo, GCD o Suma de un rango `[L, R]`** mientras el arreglo sufre actualizaciones dinámicas (donde Fenwick Tree no puede hacer `min/max` general en subrangos).",
      "**Lazy Propagation**: Cuando las actualizaciones no son a 1 sola casilla sino a **todo un rango completo** ('suma +5 a todos los elementos entre L y R' o 'pinta de rojo el segmento `[L, R]`') en O(log N).",
    ],
    whenNotToUse: [
      "Si solo necesitas sumas de rango con actualizaciones de 1 elemento: usa un **Fenwick Tree**, que lleva un tercio del código y menos memoria.",
    ],
    timeComplexity: {
      average: "Build: O(N) | Update: O(log N) | Range Query `[L, R]`: O(log N)",
      worst: "O(log N) por operación",
      note: "La versión iterativa de Segment Tree ocupa solo `2 * N` enteros y es extremadamente rápida y concisa para entrevistas.",
    },
    spaceComplexity: "O(N) (`2N` en versión iterativa o `4N` en versión recursiva)",
    constraintHint: "Range Min/Max/Sum Query con actualizaciones dinámicas y N, Q ≤ 10⁵",
    pythonTemplate: `class IterativeSegmentTree:
    """
    Segment Tree Iterativo Compacto (Tamaño 2N) para Range Maximum/Sum Query.
    Las hojas viven en tree[n .. 2n-1] y los padres en tree[1 .. n-1].
    Tiempo Build: O(N) | Update y Query: O(log N)
    """
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)
        # 1. Copiar hojas en la segunda mitad
        for i, x in enumerate(nums):
            self.tree[self.n + i] = x
        # 2. Construir padres hacia atrás en O(N)
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = max(self.tree[2 * i], self.tree[2 * i + 1])

    def update(self, idx: int, val: int) -> None:
        pos = idx + self.n
        self.tree[pos] = val
        while pos > 1:
            pos //= 2
            self.tree[pos] = max(self.tree[2 * pos], self.tree[2 * pos + 1])

    def range_max(self, left: int, right: int) -> int:
        """Máximo en el rango cerrado [left, right] (0-indexed)."""
        res = float("-inf")
        l = left + self.n
        r = right + self.n + 1  # Semiabierto [l, r)
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l //= 2
            r //= 2
        return res`,
    typescriptTemplate: `export class SegmentTreeMax {
  private n: number;
  private tree: number[];

  constructor(nums: number[]) {
    this.n = nums.length;
    this.tree = new Array<number>(2 * this.n).fill(-Infinity);
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = nums[i];
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = Math.max(this.tree[2 * i], this.tree[2 * i + 1]);
    }
  }

  update(idx: number, val: number): void {
    let pos = idx + this.n;
    this.tree[pos] = val;
    while (pos > 1) {
      pos >>= 1;
      this.tree[pos] = Math.max(this.tree[2 * pos], this.tree[2 * pos + 1]);
    }
  }

  rangeMax(left: number, right: number): number {
    let res = -Infinity;
    let l = left + this.n;
    let r = right + this.n + 1;
    while (l < r) {
      if (l & 1) res = Math.max(res, this.tree[l++]);
      if (r & 1) res = Math.max(res, this.tree[--r]);
      l >>= 1;
      r >>= 1;
    }
    return res;
  }
}`,
    leetcodeProblems: [
      {
        number: 307,
        title: "Range Sum Query - Mutable",
        slug: "range-sum-query-mutable",
        difficulty: "Medium",
        patternHint: "Reemplaza `max` por `+` en el Segment Tree iterativo.",
      },
      {
        number: 715,
        title: "Range Module",
        slug: "range-module",
        difficulty: "Hard",
        patternHint: "Segment Tree dinámico con Lazy Propagation o mantenimiento de intervalos.",
      },
      {
        number: 2407,
        title: "Longest Increasing Subsequence II",
        slug: "longest-increasing-subsequence-ii",
        difficulty: "Hard",
        patternHint: "Combina DP con un Segment Tree de Máximos: `dp[x] = 1 + seg.range_max(x - k, x - 1)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo funciona un Segment Tree dividiendo cualquier intervalo en a lo sumo `2 log₂ N` bloques canónicos. Presenta el truco del 'Segment Tree Iterativo de tamaño 2N' (que se escribe en 20 líneas y cabe cómodamente en una entrevista) y explica conceptualmente qué es Lazy Propagation (postergar actualizaciones de un bloque entero en una nota adhesiva hasta que alguien necesite bajar a sus hijos).",
      keyTakeaways: [
        "El Segment Tree funciona para CUALQUIER operación asociativa (`max`, `min`, `+`, `gcd`, `xor`, matriz de transición), mientras que el Fenwick Tree requiere operaciones invertibles como la suma.",
        "En el Segment Tree iterativo de tamaño `2N`, las hojas viven en `[N .. 2N-1]` y el padre de `k` es `k // 2`.",
        "Lazy Propagation permite actualizar un millón de elementos de un rango `[L, R]` en O(log N) guardando el cambio pendiente en los nodos superiores.",
      ],
      stepByStepWalkthrough: [
        "Colocar los elementos iniciales en la mitad derecha `tree[n .. 2n-1]`.",
        "Llenar los padres de `n-1` hasta `1` combinando `tree[2*i]` y `tree[2*i + 1]`.",
        "Para actualizar, cambiar la hoja `idx + n` y subir dividiendo entre 2 hasta la raíz.",
        "Para consultar `[L, R]`, subir desde ambos extremos cerrando el rango en O(log N).",
      ],
      interviewTraps: [
        "En la versión recursiva de Segment Tree, reservar `2 * N` en vez de `4 * N`: cuando `N` no es potencia exacta de 2, el árbol recursivo necesita hasta `4 * N` casillas.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "Por qué el Segment Tree es el rey de las consultas de rango",
          visualCue: "Árbol binario de intervalos cubriendo el rango `[1..6]` con solo 3 nodos sombreados.",
          narration:
            "¿Qué haces cuando necesitas el máximo o mínimo de un rango mil veces por segundo mientras los valores del arreglo cambian en vivo? El Fenwick Tree ya no basta porque el máximo no se puede restar. Aquí entra el poderoso Segment Tree.",
        },
        {
          timestamp: "02:00 - 05:00",
          sectionTitle: "Segment Tree Iterativo en 20 líneas y Lazy Propagation",
          visualCue: "Arreglo de tamaño `2N` actualizando hojas y propagando notas 'Lazy' en rangos.",
          narration:
            "Muchos temen al Segment Tree porque la versión recursiva clásica es larga. Pero con la representación iterativa de tamaño 2N, las hojas van en la segunda mitad del arreglo y los padres en la primera mitad: limpio, rápido y libre de recursión.",
        },
      ],
    },
  },
  {
    id: "rolling-hash",
    order: 41,
    title: "Rolling Hash (Hash Rodante y Rabin-Karp)",
    shortTitle: "Rolling Hash",
    englishTerm: "Rolling Hash & Rabin-Karp Algorithm",
    kind: "algorithm",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["strings", "sliding-window", "hash-table"],
    summary:
      "Tratar un string como un número en base `B` módulo un primo grande `MOD` para que, al deslizar una ventana un carácter a la derecha, podamos **actualizar el hash de la ventana en tiempo O(1)** (quitando la letra que sale por la izquierda y agregando la que entra por la derecha), permitiendo comparar substrings de longitud `L` en O(1).",
    analogy:
      "En base 10, si tienes el número `3456` en una ventana de 4 dígitos y te mueves un paso a la derecha donde entra un `7` (para formar `4567`), no construyes el número desde cero: le restas `3 × 1000`, multiplicas lo que queda por `10` y le sumas `7`. Rolling Hash hace exactamente eso con letras.",
    whenToUse: [
      "Comparar substrings o encontrar **substrings duplicados de longitud `L`** en O(N) (`Repeated DNA Sequences`, `Longest Duplicate Substring` combinando `Binary Search + Rolling Hash`).",
      "Buscar múltiples patrones o encontrar el palíndromo más largo desde el inicio usando hash hacia adelante y hacia atrás.",
    ],
    whenNotToUse: [
      "Para buscar un único patrón en un texto sin necesidad de hashes numéricos, KMP es determinista sin riesgo de colisiones modulares.",
    ],
    timeComplexity: {
      average: "Precalcular o deslizar ventana: O(N) | Consultar hash de substring `s[L..R]`: O(1)",
      worst: "O(N) con primo grande (ej. `MOD = 10⁹ + 7` o `2⁶¹ - 1`)",
      note: "Combinar Binary Search en la longitud `L` con Rolling Hash resuelve 'Longest Duplicate Substring' en O(N log N).",
    },
    spaceComplexity: "O(N) para hashes de prefijo y potencias de la base",
    constraintHint: "Comparación O(1) de substrings o búsqueda de subcadenas repetidas con N ≤ 10⁵",
    pythonTemplate: `class PolynomialRollingHash:
    """
    Precalcula hashes polinomiales de prefijos para consultar el hash de CUALQUIER
    substring s[left..right] (inclusive) en tiempo O(1).
    """
    def __init__(self, s: str, base: int = 313, mod: int = 1_000_000_007):
        self.mod = mod
        n = len(s)
        self.pref_hash = [0] * (n + 1)
        self.power = [1] * (n + 1)

        for i, ch in enumerate(s):
            self.pref_hash[i + 1] = (self.pref_hash[i] * base + ord(ch)) % mod
            self.power[i + 1] = (self.power[i] * base) % mod

    def get_Substring_hash(self, left: int, right: int) -> int:
        """Retorna el hash de s[left..right] inclusive en O(1)."""
        length = right - left + 1
        return (
            self.pref_hash[right + 1]
            - self.pref_hash[left] * self.power[length]
        ) % self.mod`,
    typescriptTemplate: `export class RollingHash {
  private pref: bigint[];
  private pow: bigint[];
  private mod = 1_000_000_007n;
  private base = 313n;

  constructor(s: string) {
    const n = s.length;
    this.pref = new Array<bigint>(n + 1).fill(0n);
    this.pow = new Array<bigint>(n + 1).fill(1n);

    for (let i = 0; i < n; i++) {
      this.pref[i + 1] = (this.pref[i] * this.base + BigInt(s.charCodeAt(i))) % this.mod;
      this.pow[i + 1] = (this.pow[i] * this.base) % this.mod;
    }
  }

  getHash(left: number, right: number): bigint {
    const len = right - left + 1;
    const raw = (this.pref[right + 1] - (this.pref[left] * this.pow[len]) % this.mod) % this.mod;
    return (raw + this.mod) % this.mod;
  }
}`,
    leetcodeProblems: [
      {
        number: 187,
        title: "Repeated DNA Sequences",
        slug: "repeated-dna-sequences",
        difficulty: "Medium",
        patternHint: "Ventana deslizante de longitud 10 manteniendo su representación numérica en O(1) por paso.",
      },
      {
        number: 1044,
        title: "Longest Duplicate Substring",
        slug: "longest-duplicate-substring",
        difficulty: "Hard",
        patternHint: "Binary Search sobre la longitud `L` + Rolling Hash en O(N) para verificar si algún hash de longitud `L` se repite.",
      },
      {
        number: 718,
        title: "Maximum Length of Repeated Subarray",
        slug: "maximum-length-of-repeated-subarray",
        difficulty: "Medium",
        patternHint: "Se resuelve en O((N + M) log(min(N, M))) con Binary Search + Rolling Hash.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Conecta el concepto de Prefix Sum y Sliding Window con las cadenas de texto: explica por qué hashear un substring de tamaño K con la función `hash()` normal dentro de una ventana cuesta O(K) por paso (total O(N·K)), mientras que tratar el string como un polinomio en base `B` permite calcular el hash de cualquier substring en O(1).",
      keyTakeaways: [
        "Rolling Hash es el equivalente exacto de Prefix Sum pero para Strings: permite obtener la huella digital de `s[L..R]` en O(1).",
        "Al restar en aritmética modular `(a - b) % MOD`, en lenguajes como JS/C++/Java debes sumar `(a - b % MOD + MOD) % MOD` para evitar restos negativos (en Python `%` ya devuelve positivo).",
      ],
      stepByStepWalkthrough: [
        "Elegir una `base` mayor que el tamaño del alfabeto (ej. `31` o `313`) y un primo grande `MOD` (`10⁹ + 7` o `10⁹ + 9`).",
        "Precalcular `pref_hash[i]` y `power[i] = base^i % MOD` en O(N).",
        "Consultar cualquier rango `[L, R]` con `(pref_hash[R+1] - pref_hash[L] * power[R - L + 1]) % MOD`.",
      ],
      interviewTraps: [
        "Usar un módulo pequeño como `10,007`: por la Paradoja del Cumpleaños, cuando comparas $10^5$ substrings empezarás a tener colisiones con módulos menores a $\approx N^2$. Usa un primo $\ge 10^9 + 7$ o doble hash.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Convertir palabras en números: La intuición en base 10",
          visualCue: "La ventana `3456` deslizándose a `4567` restando `3*1000`, multiplicando por `10` y sumando `7`.",
          narration:
            "Si metes un substring de diez mil letras dentro de un Hash Set en cada paso de una ventana deslizante, copiar y hashear esas diez mil letras rompe tu complejidad a O(N²). Rolling Hash actualiza el hash en O(1) con una resta y una multiplicación.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Hashes de Prefijos + Binary Search en Longest Duplicate Substring",
          visualCue: "Combinación de Binary Search eligiendo longitud L y Rolling Hash detectando duplicados en O(N).",
          narration:
            "Cuando precalculas los hashes de todos los prefijos y las potencias de la base, puedes obtener la firma de cualquier subsegmento `[L, R]` en tiempo constante O(1), igual que hacíamos con Prefix Sums.",
        },
      ],
    },
  },
  {
    id: "string-matching",
    order: 42,
    title: "String Matching (Algoritmo KMP y Función Prefijo LPS)",
    shortTitle: "String Matching (KMP)",
    englishTerm: "String Matching (KMP, Z-Algorithm & LPS Array)",
    kind: "algorithm",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["strings", "two-pointers"],
    summary:
      "Buscar todas las apariciones de un patrón `P` dentro de un texto `T` en tiempo estrictamente lineal **O(|T| + |P|)** sin retroceder jamás el puntero del texto `T`. El secreto es el arreglo **LPS (Longest Proper Prefix which is also Suffix)** del algoritmo **Knuth-Morris-Pratt (KMP)**.",
    analogy:
      "Si estás buscando la palabra `'ABABAC'` y tras coincidir las primeras 5 letras `'ABABA'` fallas en la sexta letra, no tienes que volver a empezar desde cero: como sabes que el final `'ABA'` que acabas de leer coincide exactamente con el inicio `'ABA'` de tu patrón, continúas directamente desde la cuarta letra.",
    whenToUse: [
      "Buscar un patrón `P` en un texto `T` garantizando O(N + M) en el peor caso (incluso en textos repetitivos como `'aaaa...ab'`).",
      "Detectar si un string está formado por la repetición periódica de un bloque más corto (`Repeated Substring Pattern`).",
      "Encontrar el **palíndromo más largo que empieza en el índice 0** concatenando `s + '#' + s[::-1]` y mirando el último valor del arreglo LPS (`Shortest Palindrome`).",
    ],
    whenNotToUse: [
      "En problemas sencillos donde `N` es pequeño y `s.find(p)` de la librería estándar es suficiente.",
    ],
    timeComplexity: {
      average: "Construir LPS: O(M) | Buscar en texto: O(N) → Total: O(N + M)",
      worst: "O(N + M) determinista (sin casos patológicos O(N·M))",
      note: "El arreglo `lps[i]` guarda la longitud del prefijo propio más largo de `P[0..i]` que también es sufijo de `P[0..i]`.",
    },
    spaceComplexity: "O(M) para el arreglo `lps` del patrón",
    constraintHint: "Búsqueda exacta de patrones, periodicidad de cadenas o Shortest Palindrome en O(N)",
    pythonTemplate: `def build_kmp_lps(pattern: str) -> list[int]:
    """
    Construye la tabla LPS (Longest Proper Prefix which is also Suffix) en O(M).
    lps[i] = longitud del mayor prefijo propio de pattern[0..i] que coincide con su sufijo.
    """
    m = len(pattern)
    lps = [0] * m
    length = 0  # Longitud del LPS previo
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            # Retrocedemos inteligentemente usando la propia tabla LPS
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1
    return lps


def kmp_search(text: str, pattern: str) -> int:
    """Retorna el primer índice donde 'pattern' aparece en 'text', o -1."""
    if not pattern:
        return 0
    lps = build_kmp_lps(pattern)
    i = j = 0  # i recorre text, j recorre pattern

    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1
    return -1`,
    typescriptTemplate: `export function buildKmpLps(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}`,
    leetcodeProblems: [
      {
        number: 28,
        title: "Find the Index of the First Occurrence in a String",
        slug: "find-the-index-of-the-first-occurrence-in-a-string",
        difficulty: "Easy",
        patternHint: "Problema base para implementar KMP en O(N + M).",
      },
      {
        number: 459,
        title: "Repeated Substring Pattern",
        slug: "repeated-substring-pattern",
        difficulty: "Easy",
        patternHint: "Con KMP: un string de largo `N` es periódico si `lps[-1] > 0` y `N % (N - lps[-1]) == 0`.",
      },
      {
        number: 214,
        title: "Shortest Palindrome",
        slug: "shortest-palindrome",
        difficulty: "Hard",
        patternHint: "Construye el arreglo LPS de `s + '#' + s[::-1]`: `lps[-1]` te da el prefijo palindrómico más largo de `s` en O(N).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica de forma muy visual qué significa la tabla `LPS` de KMP ('¿qué parte del final de lo que acabo de leer es idéntica al principio del patrón para no tener que volver a compararla?'). Revela el truco estrella para problemas Hard: concatenar `s + '#' + reverse(s)` y calcular su LPS para hallar el prefijo palindrómico más largo en O(N) (`Shortest Palindrome`).",
      keyTakeaways: [
        "La búsqueda ingenua de strings empeora a O(N·M) cuando hay muchos falsos inicios como buscar `'AAAAB'` en `'AAAAAAAAAB'`. KMP nunca retrocede el índice `i` del texto.",
        "La línea clave de KMP es `length = lps[length - 1]`: cuando falla un carácter, reutilizamos el segundo mejor prefijo-sufijo ya calculado.",
        "El periodo mínimo de un string de longitud `N` es `N - lps[N - 1]`.",
      ],
      stepByStepWalkthrough: [
        "Preprocesar el patrón `P` de longitud `M` para llenar su arreglo `lps` en O(M).",
        "Recorrer el texto `T` con índice `i` y el patrón con índice `j`.",
        "Si `T[i] == P[j]`, avanzar ambos; si no coinciden y `j > 0`, saltar `j = lps[j - 1]` sin retroceder `i`.",
      ],
      interviewTraps: [
        "En `Shortest Palindrome` (`s + '#' + s[::-1]`), olvidar poner un carácter separador `'#'` en medio, haciendo que el prefijo-sufijo cruce la mitad y supere la longitud de `s`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "Por qué la búsqueda ingenua retrocede y cómo KMP mira solo hacia adelante",
          visualCue: "Comparación de un puntero retrocediendo una y otra vez en `'AAAAAB'` vs KMP avanzando en línea recta.",
          narration:
            "Cuando buscas una palabra y fallas en la última letra, el algoritmo ingenuo tira a la basura todo lo que acababa de leer y retrocede en el texto. Knuth, Morris y Pratt demostraron que lo que acabas de leer ya contiene toda la información necesaria para no retroceder jamás.",
        },
        {
          timestamp: "02:00 - 04:45",
          sectionTitle: "La tabla LPS y el truco de `s + '#' + reverse(s)`",
          visualCue: "Tabla LPS de `'ABABAC'` y aplicación directa a Shortest Palindrome.",
          narration:
            "Más allá de buscar palabras, la tabla LPS es un detector de simetrías: te dice en O(N) si una cadena está hecha de bloques repetidos y cuál es el palíndromo más largo pegado al inicio.",
        },
      ],
    },
  },
  {
    id: "bit-manipulation",
    order: 43,
    title: "Bit Manipulation (Manipulación de Bits y Trucos XOR)",
    shortTitle: "Bit Manipulation",
    englishTerm: "Bit Manipulation & XOR Tricks",
    kind: "algorithm",
    level: 7,
    difficulty: "Intermediate",
    branchCategory: "advanced-math-range",
    prerequisites: ["basic-dsa", "arrays"],
    summary:
      "Operar directamente sobre la representación binaria de los números en los registros de la CPU (`&`, `|`, `^`, `~`, `<<`, `>>`) para lograr algoritmos en O(1) espacio y máxima velocidad.",
    analogy:
      "El operador XOR (`^`) es como un interruptor de luz de escalera: si lo presionas dos veces con el mismo número (`x ^ x`), vuelve a quedar apagado (`0`). Por eso, si aplicas XOR a una lista donde todos los números vienen en pareja menos uno, todas las parejas se cancelan entre sí y queda encendido únicamente el número solitario.",
    whenToUse: [
      "**Propiedades de XOR (`^`)**: Encontrar el único elemento que no se repite (`Single Number`: `x ^ x = 0` y `x ^ 0 = x`) o el número faltante en `0..N`.",
      "**Truco de Brian Kernighan (`n & (n - 1)`)**: Apagar el bit `1` más a la derecha para contar cuántos bits encendidos tiene un número (`Counting Bits`) o verificar en O(1) si `n` es potencia de 2 (`n > 0 and (n & (n - 1)) == 0`).",
      "**Aislar el último bit encendido (`n & -n`)**: Separar dos números únicos (`Single Number III`) o moverse en un Fenwick Tree.",
    ],
    whenNotToUse: [
      "No sacrifiques legibilidad con trucos oscuros de bits si una operación aritmética normal tiene la misma complejidad y es más clara.",
    ],
    timeComplexity: {
      average: "O(1) por operación de bit | O(N) en barrido sobre arreglo",
      worst: "O(1) para enteros de 32/64 bits",
      note: "`n & (n - 1)` salta directamente entre bits encendidos sin revisar los ceros intermedios.",
    },
    spaceComplexity: "O(1) registros de CPU",
    constraintHint: "Tiempo O(N) con restricción estricta de Espacio O(1), XOR o potencias de 2",
    pythonTemplate: `def bit_manipulation_essentials(nums: list[int], n: int) -> tuple[int, bool, int]:
    """
    Los 3 Trucos Fundamentales de Bits para Entrevistas:
    """
    # 1. XOR cancela duplicados: x ^ x = 0, x ^ 0 = x
    single = 0
    for x in nums:
        single ^= x

    # 2. ¿Es 'n' una potencia exacta de 2? (Solo tiene un único bit '1' encendido)
    is_power_of_two = n > 0 and (n & (n - 1)) == 0

    # 3. Algoritmo de Brian Kernighan: contar bits '1' apagando el último bit en cada paso
    ones_count = 0
    temp = n
    while temp > 0:
        temp &= temp - 1  # Apaga el bit '1' menos significativo
        ones_count += 1

    return single, is_power_of_two, ones_count`,
    typescriptTemplate: `export function singleNumberXor(nums: number[]): number {
  let ans = 0;
  for (const x of nums) {
    ans ^= x;
  }
  return ans;
}

export function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}`,
    leetcodeProblems: [
      {
        number: 136,
        title: "Single Number",
        slug: "single-number",
        difficulty: "Easy",
        patternHint: "Acumula el XOR de todos los números: las parejas dan `0` y sobrevive el único solitario en O(1) espacio.",
      },
      {
        number: 191,
        title: "Number of 1 Bits",
        slug: "number-of-1-bits",
        difficulty: "Easy",
        patternHint: "Repite `n &= n - 1` contando cuántos pasos toma llegar a 0.",
      },
      {
        number: 338,
        title: "Counting Bits",
        slug: "counting-bits",
        difficulty: "Easy",
        patternHint: "DP + Bits: `dp[i] = dp[i >> 1] + (i & 1)` o `dp[i] = dp[i & (i - 1)] + 1`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Haz un recorrido ágil y memorable por los 4 superpoderes de la manipulación de bits: 1) Las 3 leyes del XOR (`x ^ 0 = x`, `x ^ x = 0`, y que el orden no importa), 2) `n & (n - 1)` de Brian Kernighan para apagar el último 1 y detectar potencias de 2, 3) `n & -n` para aislar el último 1, y 4) Desplazamientos `1 << k` y `(n >> k) & 1`.",
      keyTakeaways: [
        "XOR (`^`) es una suma en base 2 sin acarreo: sumar dos veces lo mismo vuelve a dar cero.",
        "`n & (n - 1)` borra el bit `1` más a la derecha; si un número positivo era potencia de 2 (tenía un solo bit `1`), al hacer `n & (n - 1)` queda en `0`.",
        "En Python los enteros tienen precisión arbitraria (infinitos bits), por lo que al simular enteros de 32 bits con signo en problemas como `Sum of Two Integers` se usa una máscara `MASK = 0xFFFFFFFF`.",
      ],
      stepByStepWalkthrough: [
        "Para leer el bit `k`: `(n >> k) & 1`.",
        "Para encender el bit `k`: `n | (1 << k)`.",
        "Para apagar el bit `k`: `n & ~(1 << k)`.",
        "Para invertir (toggle) el bit `k`: `n ^ (1 << k)`.",
      ],
      interviewTraps: [
        "En Python, aplicar `~n` o desplazamientos a negativos esperando comportamiento de 32 bits con overflow automático (como en C++/Java): en Python los enteros no desbordan a 32 bits a menos que apliques `& 0xFFFFFFFF`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "La magia del XOR: Cómo encontrar una aguja en un pajar con O(1) de memoria",
          visualCue: "Parejas de números iguales chocando con XOR y convirtiéndose en 0, dejando solo al número único.",
          narration:
            "Cuando un problema te pide encontrar el único número que no tiene pareja en tiempo lineal pero te prohíbe usar un Hash Set exigiendo memoria O(1), la respuesta está en los bits: el operador XOR cancela cualquier número repetido un número par de veces.",
        },
        {
          timestamp: "01:45 - 04:15",
          sectionTitle: "El truco de Brian Kernighan: `n & (n - 1)`",
          visualCue: "El binario `10100` restando 1 (`10011`) y haciendo AND para apagar el último 1 (`10000`).",
          narration:
            "Restar 1 a un número binario invierte todos los bits desde el último 1 hacia la derecha. Por eso, al hacer `n & (n - 1)` apagas de un solo golpe el bit encendido más bajo.",
        },
      ],
    },
  },
  {
    id: "math",
    order: 44,
    title: "Math & Geometry (Matemáticas, Combinatoria y Geometría)",
    shortTitle: "Math & Geometry",
    englishTerm: "Math, Combinatorics & Computational Geometry",
    kind: "algorithm",
    level: 7,
    difficulty: "Intermediate",
    branchCategory: "advanced-math-range",
    prerequisites: ["basic-dsa", "arrays"],
    summary:
      "Reemplazar simulaciones lentas por fórmulas cerradas en O(1) u O(log N): series aritméticas de Gauss, combinatoria ($nCr$), exponenciación rápida (`pow(x, n)` en O(log N)), pendientes representadas como fracciones irreducibles `(dy // g, dx // g)` y producto cruz en geometría 2D.",
    analogy:
      "Cuando el profesor le pidió al niño Carl Friedrich Gauss sumar los números del 1 al 100 para mantenerlo ocupado una hora, en lugar de sumar uno por uno (O(N)), emparejó `1+100 = 101`, `2+99 = 101`... 50 parejas de 101 = `5050` en un segundo (O(1)).",
    whenToUse: [
      "Sumas de series (`n * (n + 1) // 2`), conteo de pares (`n * (n - 1) // 2`) o caminos en cuadrícula con combinatoria $\binom{m+n-2}{m-1}$.",
      "**Exponenciación Binaria**: Calcular $x^n$ en $O(\log n)$ usando que $x^{2k} = (x^2)^k$.",
      "**Geometría 2D**: Colinealidad de puntos (`Max Points on a Line`), orientación de giros con **Producto Cruz** y distancias euclidianas al cuadrado (`dx² + dy²` sin usar `sqrt` para evitar errores de punto flotante).",
    ],
    whenNotToUse: [
      "¡NUNCA dividas flotantes `dy / dx` para usar pendientes como llaves de un Hash Map! `0.1 + 0.2 != 0.3` en IEEE 754 y la división por cero falla en líneas verticales. Simplifica siempre por el `gcd(dy, dx)` y guarda la tupla entera `(dy // g, dx // g)`.",
    ],
    timeComplexity: {
      average: "Fórmulas de Gauss: O(1) | Binary Exponentiation: O(log N)",
      worst: "O(log N)",
      note: "Evita `math.sqrt` y `float` siempre que puedas comparar distancias al cuadrado con enteros exactos.",
    },
    spaceComplexity: "O(1)",
    constraintHint: "N ≥ 10⁹ exigiendo O(1)/O(log N), conteo combinatorio o puntos en el plano 2D",
    pythonTemplate: `import math

def fast_power(x: float, n: int) -> float:
    """
    1. Exponenciación Binaria (Pow(x, n)) en O(log N).
    Si n es par: x^n = (x * x)^(n // 2).
    """
    if n < 0:
        x = 1.0 / x
        n = -n
    res = 1.0
    while n > 0:
        if n & 1:
            res *= x
        x *= x
        n >>= 1
    return res


def normalized_slope(p1: list[int], p2: list[int]) -> tuple[int, int]:
    """
    2. Pendiente Exacta en Geometría sin punto flotante (para usar en Hash Map).
    Reduce (dy, dx) por su Máximo Común Divisor y normaliza el signo.
    """
    dy = p2[1] - p1[1]
    dx = p2[0] - p1[0]
    if dx == 0:
        return (1, 0)
    if dy == 0:
        return (0, 1)
    if dx < 0:
        dx, dy = -dx, -dy
    g = math.gcd(abs(dy), abs(dx))
    return (dy // g, dx // g)`,
    typescriptTemplate: `export function fastPower(x: number, n: number): number {
  let exp = BigInt(n);
  if (exp < 0n) {
    x = 1 / x;
    exp = -exp;
  }
  let res = 1;
  while (exp > 0n) {
    if ((exp & 1n) === 1n) res *= x;
    x *= x;
    exp >>= 1n;
  }
  return res;
}`,
    leetcodeProblems: [
      {
        number: 50,
        title: "Pow(x, n)",
        slug: "powx-n",
        difficulty: "Medium",
        patternHint: "Exponenciación binaria dividiendo el exponente `n` entre 2 en cada paso en O(log N).",
      },
      {
        number: 149,
        title: "Max Points on a Line",
        slug: "max-points-on-a-line",
        difficulty: "Hard",
        patternHint: "Para cada punto base, agrupa los demás en un Hash Map usando la pendiente entera reducida `(dy // gcd, dx // gcd)`.",
      },
      {
        number: 62,
        title: "Unique Paths",
        slug: "unique-paths",
        difficulty: "Medium",
        patternHint: "Además de DP, es combinatoria pura: elegir dónde van los `m-1` pasos hacia abajo entre `(m-1) + (n-1)` pasos totales: `math.comb(m + n - 2, m - 1)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Enseña las herramientas matemáticas que salvan entrevistas: 1) Cómo contar pares `N*(N-1)//2` y subarreglos `L*(L+1)//2` al instante, 2) Exponenciación Binaria (`Pow(x, n)`) en O(log N), y 3) La regla de oro en Geometría Computacional: 'El punto flotante es tu enemigo; usa distancias al cuadrado y pendientes reducidas con GCD'.",
      keyTakeaways: [
        "En un grupo de `K` elementos iguales, el número de pares que puedes formar es `K * (K - 1) // 2`.",
        "En un segmento válido de longitud `L`, el número de subarreglos contiguos contenidos es `L * (L + 1) // 2`.",
        "Para comparar distancias en el plano, compara `dx*dx + dy*dy` con enteros en vez de `sqrt(dx*dx + dy*dy)`.",
      ],
      stepByStepWalkthrough: [
        "Verificar si una simulación O(N) se puede colapsar en una división, módulo o suma de Gauss O(1).",
        "En potencias grandes, elevar la base al cuadrado y dividir el exponente entre 2 en cada iteración.",
        "En problemas de rectas y puntos, representar cada dirección como `(dy // gcd, dx // gcd)`.",
      ],
      interviewTraps: [
        "Usar `dy / dx` en punto flotante para agrupar puntos colineales: falla con `ZeroDivisionError` en rectas verticales y por pérdida de precisión en números grandes.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "El atajo de Gauss y el conteo instantáneo de pares y subarreglos",
          visualCue: "Triángulo de pares mostrando por qué `1 + 2 + ... + (N-1) = N*(N-1)/2`.",
          narration:
            "Muchas veces ya encontraste los grupos válidos con un Hash Map o una ventana deslizante, y para rematar el problema solo necesitas contar cuántos pares o subarreglos se forman sin hacer un bucle extra. La fórmula de Gauss `N*(N-1)//2` lo resuelve en O(1).",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Exponenciación Binaria O(log N) y Geometría libre de punto flotante",
          visualCue: "Cálculo de `x^1024` en solo 10 multiplicaciones y reducción de fracción `(dy, dx)` por su GCD.",
          narration:
            "En geometría para entrevistas hay un mandamiento: aléjate de los números decimales siempre que puedas. Representar una pendiente como una fracción simplificada por su Máximo Común Divisor elimina tanto la división por cero como los errores de redondeo.",
        },
      ],
    },
  },
  {
    id: "number-theory",
    order: 45,
    title: "Number Theory (Teoría de Números: GCD, Criba de Eratóstenes y Módulo)",
    shortTitle: "Number Theory",
    englishTerm: "Number Theory (Euclidean GCD, Sieve of Eratosthenes & Modular Arithmetic)",
    kind: "algorithm",
    level: 7,
    difficulty: "Advanced",
    branchCategory: "advanced-math-range",
    prerequisites: ["math", "arrays"],
    summary:
      "Los pilares de los números enteros y primos: 1) **Algoritmo de Euclides** para el Máximo Común Divisor (`GCD`) y Mínimo Común Múltiplo (`LCM`) en O(log(min(a,b))), 2) **Criba de Eratóstenes** para hallar todos los primos hasta `N` en $O(N \log \log N)$, 3) **Factorización en $O(\sqrt{N})$**, y 4) **Aritmética Modular (`10⁹ + 7`)**.",
    analogy:
      "La Criba de Eratóstenes es como un colador por capas: empiezas en el 2 y tachas todos los múltiplos de 2 (4, 6, 8...); el siguiente número sin tachar es el 3, así que es primo y tachas sus múltiplos desde `3×3 = 9` en adelante. Al llegar a $\sqrt{N}$, todos los números que sobrevivieron sin tachar son primos.",
    whenToUse: [
      "El enunciado pide devolver la respuesta **'modulo $10^9 + 7$'** (señal de que la respuesta crece exponencialmente y debes aplicar `% MOD` en cada suma y multiplicación).",
      "Encontrar todos los números primos menores a `N` (`Count Primes`) o descomponer números en sus factores primos (para conectar números con factores comunes vía Union-Find).",
      "Simplificar fracciones, sincronizar ciclos periódicos (`LCM(a, b) = (a * b) // GCD(a, b)`) o saber si es posible medir cierta cantidad de agua (`Water and Jug Problem` — Identidad de Bézout).",
    ],
    whenNotToUse: [
      "Para verificar si un SOLO número individual `X` es primo, no construyas toda la Criba hasta `X`: basta probar divisores hasta `d * d <= X` en $O(\sqrt{X})$.",
    ],
    timeComplexity: {
      average: "Euclides GCD: O(log(min(a,b))) | Criba de Eratóstenes: O(N log log N) ≈ O(N)",
      worst: "Factorización de un número X: O(√X)",
      note: "En la Criba de Eratóstenes, al tachar múltiplos del primo `p`, empieza siempre desde `p * p` porque los múltiplos menores (`2p, 3p...`) ya fueron tachados por primos más pequeños.",
    },
    spaceComplexity: "O(1) en GCD | O(N) en Criba de Eratóstenes",
    constraintHint: "Primos hasta N ≤ 5·10⁶, divisibilidad, GCD/LCM o respuestas módulo 10⁹ + 7",
    pythonTemplate: `def gcd_and_lcm(a: int, b: int) -> tuple[int, int]:
    """
    1. Algoritmo de Euclides en O(log(min(a, b))):
       gcd(a, b) = gcd(b, a % b)
    """
    x, y = a, b
    while y:
        x, y = y, x % y
    gcd_val = x
    lcm_val = (a * b) // gcd_val if gcd_val else 0
    return gcd_val, lcm_val


def sieve_of_eratosthenes(n: int) -> list[bool]:
    """
    2. Criba de Eratóstenes para identificar todos los primos en [0..n] en O(N log log N).
    """
    if n < 2:
        return [False] * (n + 1)
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    p = 2
    while p * p <= n:
        if is_prime[p]:
            # Empezamos en p * p e incrementamos de p en p
            for multiple in range(p * p, n + 1, p):
                is_prime[multiple] = False
        p += 1
    return is_prime`,
    typescriptTemplate: `export function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function countPrimesSieve(n: number): number {
  if (n <= 2) return 0;
  const isPrime = new Uint8Array(n).fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;

  for (let p = 2; p * p < n; p++) {
    if (isPrime[p] === 1) {
      for (let mult = p * p; mult < n; mult += p) {
        isPrime[mult] = 0;
      }
    }
  }
  let count = 0;
  for (let i = 2; i < n; i++) count += isPrime[i];
  return count;
}`,
    leetcodeProblems: [
      {
        number: 204,
        title: "Count Primes",
        slug: "count-primes",
        difficulty: "Medium",
        patternHint: "Criba de Eratóstenes tachando desde `p * p` con paso `p` hasta `p * p < n`.",
      },
      {
        number: 1979,
        title: "Find Greatest Common Divisor of Array",
        slug: "find-greatest-common-divisor-of-array",
        difficulty: "Easy",
        patternHint: "Aplica el algoritmo de Euclides entre `min(nums)` y `max(nums)`.",
      },
      {
        number: 952,
        title: "Largest Component Size by Common Factor",
        slug: "largest-component-size-by-common-factor",
        difficulty: "Hard",
        patternHint: "Descompón cada número en sus factores primos en O(√X) y únelos en un Disjoint Set Union (DSU).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica las 3 piedras angulares de Number Theory en entrevistas: 1) El Algoritmo de Euclides (`while b: a, b = b, a % b`) y por qué es tan veloz como Binary Search, 2) La Criba de Eratóstenes y por qué el bucle interno empieza en `p * p` (no en `2 * p`), y 3) Las reglas de Aritmética Modular (`10⁹ + 7`), incluyendo el Pequeño Teorema de Fermat (`pow(b, MOD - 2, MOD)`) cuando toca dividir bajo un módulo primo.",
      keyTakeaways: [
        "En Euclides, `a % b` reduce el número al menos a la mitad cada 2 pasos, tardando $O(\log(\min(a,b)))$.",
        "En la Criba de Eratóstenes, empezar en `p * p` ahorra muchísimo trabajo porque cualquier `k * p` con `k < p` ya fue tachado antes por el factor primo de `k`.",
        "Bajo un módulo primo `MOD = 10⁹ + 7`, la suma y la multiplicación distribuyen `(a * b) % MOD`, pero para dividir entre `b` debes multiplicar por su inverso modular `pow(b, MOD - 2, MOD)`.",
      ],
      stepByStepWalkthrough: [
        "Para hallar todos los primos hasta `N`: usar Criba de Eratóstenes con `p * p <= n`.",
        "Para factorizar un número `X`: probar `d = 2` mientras `d * d <= X`, dividiendo `X //= d` mientras sea divisible; si al final `X > 1`, el resto `X` también es un factor primo.",
        "Para cálculos módulo `10⁹ + 7`: aplicar `% MOD` en cada acumulación.",
      ],
      interviewTraps: [
        "Hacer `(a // b) % MOD` cuando el problema pide el resultado de una división módulo `10⁹ + 7` (por ejemplo en combinatoria $nCr \pmod{10^9+7}$): si `a` ya fue reducido módulo `MOD`, la división entera normal da un resultado completamente falso. Usa el inverso modular `a * pow(b, MOD - 2, MOD) % MOD`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "El algoritmo más antiguo y elegante de la historia: Euclides en 3 líneas",
          visualCue: "Dos barras de longitud A y B reduciéndose con `a % b` hasta hallar la medida común exacta.",
          narration:
            "Escrito hace más de dos mil trescientos años, el Algoritmo de Euclides calcula el Máximo Común Divisor de dos números gigantescos en un parpadeo: mientras B no sea cero, reemplazas A y B por B y el residuo de A entre B.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Criba de Eratóstenes (`p * p`) y el misterio de `10^9 + 7`",
          visualCue: "Tablero numérico tachando múltiplos desde `p²` y explicación visual del módulo `10^9 + 7`.",
          narration:
            "¿Por qué tantos problemas de LeetCode piden devolver la respuesta módulo 1,000,000,007? Porque es el primer número primo después de mil millones: cabe perfectamente en enteros estándar sin desbordar y, al ser primo, nos permite incluso dividir usando el inverso modular.",
        },
      ],
    },
  },
  {
    id: "specialized-advanced",
    order: 46,
    title: "Specialized Advanced Patterns (Sweep Line, Boyer-Moore, Tarjan & Euler)",
    shortTitle: "Specialized Patterns",
    englishTerm: "Sweep Line, Boyer-Moore Majority Vote, Reservoir Sampling, Tarjan & Hierholzer",
    kind: "algorithm",
    level: 7,
    difficulty: "Expert",
    branchCategory: "advanced-math-range",
    prerequisites: ["sorting-intervals", "graphs", "dfs"],
    summary:
      "El arsenal de élite para cerrar el Flowchart: 1) **Sweep Line / Difference Array** (convertir intervalos en eventos `+1` al abrir y `-1` al cerrar), 2) **Boyer-Moore Majority Vote** (hallar el elemento mayoritario en O(N) tiempo y O(1) espacio), 3) **Reservoir Sampling**, 4) **Algoritmo de Hierholzer (Camino de Euler)** y 5) **Algoritmo de Tarjan (Puentes / SCC)**.",
    analogy:
      "Imagina un guardia en la puerta de un centro comercial (Sweep Line / Eventos): para saber en qué minuto del día hubo más gente adentro, no necesitas seguir a cada comprador; simplemente sumas `+1` al contador cada vez que alguien entra por la puerta y restas `-1` cada vez que alguien sale.",
    whenToUse: [
      "**Sweep Line / Difference Array**: ¿Cuántos intervalos están activos simultáneamente en cada punto o cuál es el pico máximo de salas necesarias? (`Meeting Rooms II`, `Car Pooling`, `The Skyline Problem`).",
      "**Boyer-Moore Majority Vote**: Encontrar el elemento que aparece más de `⌊N/2⌋` (o `⌊N/3⌋`) veces exigiendo estrictamente **O(1) memoria** (`Majority Element I & II`).",
      "**Hierholzer (Eulerian Path)**: Recorrer **TODAS LAS ARISTAS** de un grafo exactamente 1 vez (`Reconstruct Itinerary`) agregando el nodo al resultado en post-order (`dfs` agotando aristas salientes).",
      "**Tarjan (`tin` y `low`)**: Encontrar **Aristas Críticas (Bridges)** cuya eliminación desconecta el grafo (`Critical Connections in a Network`).",
    ],
    whenNotToUse: [
      "No uses Boyer-Moore para encontrar el elemento 'más frecuente' general si no está garantizado que supere `N/2` (o si no haces una segunda pasada de verificación).",
    ],
    timeComplexity: {
      average: "Boyer-Moore: O(N) tiempo, O(1) espacio | Sweep Line: O(N log N) | Tarjan / Hierholzer: O(V + E)",
      worst: "O(N log N) o O(V + E)",
      note: "Un Difference Array (`diff[L] += val; diff[R+1] -= val`) aplica N sumas de rango en O(1) cada una y reconstruye el arreglo final con un Prefix Sum en O(N).",
    },
    spaceComplexity: "O(1) en Boyer-Moore | O(N) en Sweep Line / Tarjan",
    constraintHint: "Concurrencia máxima de eventos, Majority Vote en O(1) espacio, Puentes en redes o Camino de Euler",
    pythonTemplate: `def boyer_moore_majority_vote(nums: list[int]) -> int:
    """
    1. Algoritmo de Voto Mayoritario de Boyer-Moore.
    Encuentra el elemento que aparece > N/2 veces en O(N) tiempo y O(1) espacio.
    """
    candidate = 0
    count = 0
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate


def sweep_line_max_overlap(intervals: list[list[int]]) -> int:
    """
    2. Sweep Line (Barrido de Eventos +1 / -1).
    Encuentra el máximo número de intervalos superpuestos al mismo tiempo (Meeting Rooms II).
    """
    events: list[tuple[int, int]] = []
    for start, end in intervals:
        events.append((start, +1))  # Abre un intervalo
        events.append((end, -1))    # Cierra un intervalo

    # Si un intervalo termina justo cuando otro empieza, procesamos el cierre (-1) primero
    events.sort(key=lambda e: (e[0], e[1]))
    active = max_active = 0
    for _, delta in events:
        active += delta
        max_active = max(max_active, active)
    return max_active`,
    typescriptTemplate: `export function boyerMooreMajorityVote(nums: number[]): number {
  let candidate = 0;
  let count = 0;
  for (const x of nums) {
    if (count === 0) candidate = x;
    count += x === candidate ? 1 : -1;
  }
  return candidate;
}

export function sweepLineMaxOverlap(intervals: number[][]): number {
  const events: Array<[number, number]> = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }
  events.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]));

  let active = 0,
    maxActive = 0;
  for (const [, delta] of events) {
    active += delta;
    maxActive = Math.max(maxActive, active);
  }
  return maxActive;
}`,
    leetcodeProblems: [
      {
        number: 169,
        title: "Majority Element",
        slug: "majority-element",
        difficulty: "Easy",
        patternHint: "Algoritmo de Boyer-Moore: cancela elementos distintos de par en par manteniendo `candidate` y `count` en O(1) espacio.",
      },
      {
        number: 1094,
        title: "Car Pooling",
        slug: "car-pooling",
        difficulty: "Medium",
        patternHint: "Sweep Line / Difference Array: suma `+pasajeros` al subir en `from` y resta `-pasajeros` al bajar en `to`.",
      },
      {
        number: 1192,
        title: "Critical Connections in a Network",
        slug: "critical-connections-in-a-network",
        difficulty: "Hard",
        patternHint: "Algoritmo de Tarjan: una arista `(u, v)` es un puente crítico si `low[v] > discovery_time[u]`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Cierra con broche de oro el episodio #46 de la serie 'Leet-YT' presentando los 4 patrones especializados que hacen brillar a un candidato Senior/Staff: 1) Sweep Line & Difference Arrays (`+1` en `start`, `-1` en `end`), 2) Boyer-Moore Majority Vote en O(1) espacio, 3) Camino de Euler con Hierholzer (`Reconstruct Itinerary`), y 4) Detección de Puentes Críticos con Tarjan (`Critical Connections`).",
      keyTakeaways: [
        "Sweep Line desarma intervalos `[start, end]` en dos eventos puntuales independientes `(start, +1)` y `(end, -1)`.",
        "Difference Array es el inverso del Prefix Sum: sumar `V` a todo el rango `[L, R]` es solo `diff[L] += V` y `diff[R+1] -= V` en O(1).",
        "En Boyer-Moore, si un ejército tiene más de la mitad de los soldados, aunque cada soldado se anule 1 a 1 con un enemigo distinto, siempre quedará en pie el ejército mayoritario.",
      ],
      stepByStepWalkthrough: [
        "Para concurrencia de intervalos (Sweep Line): emitir `+delta` en `start` y `-delta` en `end`, ordenar por coordenada y acumular.",
        "Para actualizaciones masivas de rango offline (Difference Array): aplicar `+V` en `L` y `-V` en `R+1`, y al final calcular la suma prefija.",
        "Para Boyer-Moore: cambiar `candidate` solo cuando `count == 0`.",
      ],
      interviewTraps: [
        "En Sweep Line, no definir cómo desempatar cuando un intervalo termina en el mismo instante `t` en que otro empieza: si `[1, 2]` y `[2, 3]` NO se solapan, `(t, -1)` debe ir antes que `(t, +1)`; si SÍ cuentan como traslape en el borde, `(t, +1)` va primero.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "Sweep Line y Difference Arrays: El poder de los eventos +1 y -1",
          visualCue: "Una línea vertical barriendo intervalos de izquierda a derecha sumando +1 al entrar y -1 al salir.",
          narration:
            "Llegamos al episodio final de nuestro mapa de 46 temas. Empezamos este bloque con una idea brillante: un intervalo de inicio a fin no es más que dos eventos en el tiempo, un `+1` cuando empieza y un `-1` cuando termina.",
        },
        {
          timestamp: "02:00 - 05:15",
          sectionTitle: "Boyer-Moore en O(1), Caminos de Euler y Puentes de Tarjan",
          visualCue: "Resumen visual de Boyer-Moore, el recorrido de aristas de Euler y los tiempos `low[v] > tin[u]` de Tarjan.",
          narration:
            "Con Boyer-Moore para mayorías en O(1), Hierholzer para recorrer todas las aristas sin repetir y Tarjan para detectar conexiones críticas en una red, has completado los 46 nodos del Flowchart de Leet-YT.",
        },
      ],
    },
  },
];

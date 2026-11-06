import { DSATopic } from "@/types/dsa";

export const TOPICS_LEVEL_1_2: DSATopic[] = [
  // ============================================================================
  // NIVEL 1: FUNDAMENTOS, COMPLEJIDAD Y SECUENCIAS LINEALES (01 - 07)
  // ============================================================================
  {
    id: "basic-dsa",
    order: 1,
    title: "Basic DSA & Big-O Complexity",
    shortTitle: "Basic DSA & Big-O",
    englishTerm: "Basic DSA & Time/Space Complexity",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "fundamentals",
    prerequisites: [],
    summary:
      "El mapa maestro antes de escribir una sola línea de código: cómo leer las restricciones (constraints N) de un problema de LeetCode para deducir en 5 segundos qué complejidad temporal (Big-O) y qué familia de algoritmos necesitas.",
    analogy:
      "Imagina que debes entregar paquetes en una ciudad. Si son 10 paquetes (N ≤ 10), puedes ir caminando en cualquier orden (O(N!)). Si son 100,000 paquetes (N ≤ 10⁵), ir de uno en uno comparando todos contra todos (O(N²)) te tomaría meses: necesitas una ruta lineal (O(N)) o clasificada por código postal (O(N log N)). Las restricciones del problema son el presupuesto de tiempo que te da el juez.",
    whenToUse: [
      "Siempre como Paso 0 antes de resolver cualquier problema de entrevista o programación competitiva.",
      "Cuando ves el límite de N en el enunciado (ej. N ≤ 10⁵ significa que O(N²) dará Time Limit Exceeded - TLE).",
      "Para decidir si vale la pena gastar memoria extra O(N) a cambio de bajar el tiempo de O(N²) a O(N).",
    ],
    whenNotToUse: [
      "No optimices prematuramente a O(N) complicado si N ≤ 50 y una solución limpia O(N²) o O(N³) pasa en 2 milisegundos.",
    ],
    timeComplexity: {
      average: "O(1) < O(log N) < O(N) < O(N log N)",
      worst: "O(N²) < O(2ᴺ) < O(N!)",
      note: "Regla de oro: una CPU moderna ejecuta ~10⁸ operaciones simples por segundo.",
    },
    spaceComplexity: "O(1) Auxiliar a O(N) según estructura o pila de recursión",
    constraintHint: "N ≤ 20 → O(2ᴺ) | N ≤ 10³ → O(N²) | N ≤ 10⁵ → O(N log N) o O(N) | N ≥ 10⁹ → O(log N) o O(1)",
    pythonTemplate: `def analyze_constraints(n: int) -> str:
    """
    Traductor de restricciones N -> Complejidad objetivo en LeetCode.
    Regla práctica: ~10^8 operaciones máximas por segundo.
    """
    if n <= 11:
        return "O(N!) - Permutaciones / Backtracking exhaustivo"
    elif n <= 20:
        return "O(2^N) o O(N * 2^N) - Backtracking / Bitmask DP"
    elif n <= 500:
        return "O(N^3) - Floyd-Warshall / DP de intervalos"
    elif n <= 5_000:
        return "O(N^2) - Doble bucle / DP 2D"
    elif n <= 200_000:
        return "O(N log N) o O(N) - Sorting, Heap, Two Pointers, Sliding Window, Hash"
    else:
        return "O(log N) o O(1) - Binary Search, Math / Number Theory"`,
    typescriptTemplate: `export function analyzeConstraints(n: number): string {
  // Regla práctica: ~10^8 operaciones simples por segundo
  if (n <= 11) return "O(N!) - Permutaciones / Backtracking";
  if (n <= 20) return "O(2^N) - Subconjuntos / Bitmask DP";
  if (n <= 500) return "O(N^3) - DP Cúbica / Floyd-Warshall";
  if (n <= 5000) return "O(N^2) - Doble ciclo / DP 2D";
  if (n <= 200000) return "O(N log N) u O(N) - Sorting, Heap, Two Pointers, Hash";
  return "O(log N) u O(1) - Binary Search o Fórmula Matemática";
}`,
    leetcodeProblems: [
      {
        number: 1480,
        title: "Running Sum of 1d Array",
        slug: "running-sum-of-1d-array",
        difficulty: "Easy",
        patternHint: "Compara recalcular desde cero O(N²) vs acumular en un pase O(N).",
      },
      {
        number: 412,
        title: "Fizz Buzz",
        slug: "fizz-buzz",
        difficulty: "Easy",
        patternHint: "Recorrido lineal O(N) y uso de memoria de salida.",
      },
      {
        number: 1342,
        title: "Number of Steps to Reduce a Number to Zero",
        slug: "number-of-steps-to-reduce-a-number-to-zero",
        difficulty: "Easy",
        patternHint: "Dividir entre 2 repetidamente introduce complejidad logarítmica O(log N).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Enfoca este episodio como el Episodio #01 de la serie 'Leet-YT'. Explica con entusiasmo cómo funciona el Flowchart de Decisión de Algoritmos y revela el 'secreto de las restricciones N': cómo al mirar el tamaño del input en LeetCode puedes descartar el 80% de los algoritmos incorrectos antes de programar.",
      keyTakeaways: [
        "No memorices miles de soluciones; aprende a leer las señales del enunciado.",
        "La regla de 10⁸ operaciones por segundo conecta el tamaño del input N con la complejidad Big-O máxima permitida.",
        "La complejidad espacial incluye la pila de llamadas (call stack) cuando usas recursión.",
      ],
      stepByStepWalkthrough: [
        "Leer el enunciado e identificar el tipo de dato de entrada (Array, String, Árbol, Grafo).",
        "Bajar inmediatamente a la sección 'Constraints' y mirar el valor máximo de N.",
        "Cruzar el valor de N con la tabla de complejidades para fijar tu techo de Big-O.",
        "Usar el Flowchart de Leet-YT para elegir la estructura de datos y el patrón exacto.",
      ],
      interviewTraps: [
        "Ignorar el costo oculto de operaciones como slicing `arr[i:j]` o concatenación de strings dentro de un bucle, que convierten un O(N) aparente en O(N²).",
        "Olvidar que la recursión de profundidad N consume O(N) de memoria en el Call Stack.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:15",
          sectionTitle: "Gancho: Por qué fallamos en LeetCode",
          visualCue: "Mostrar el Flowchart completo de Leet-YT iluminándose desde la raíz.",
          narration:
            "¿Alguna vez abriste un problema de entrevista, te quedaste mirando la pantalla en blanco y pensaste 'por dónde empiezo'? El error número uno es intentar adivinar el código sin antes leer las pistas que el propio problema te regala.",
        },
        {
          timestamp: "01:15 - 03:30",
          sectionTitle: "La Regla de Oro: El Truco de las Constraints (N)",
          visualCue: "Tabla animada comparando N <= 20, N <= 10^3, N <= 10^5 y N <= 10^9 contra tiempos de ejecución.",
          narration:
            "Los servidores de evaluación ejecutan cerca de cien millones de operaciones por segundo. Eso significa que si el problema dice que N llega a cien mil (10^5), un doble ciclo anidado hará diez mil millones de operaciones y dará Time Limit Exceeded. Solo con ver N <= 10^5 ya sabes que necesitas O(N) u O(N log N).",
        },
        {
          timestamp: "03:30 - 06:00",
          sectionTitle: "Cómo usar este Flowchart y Roadmap",
          visualCue: "Recorrido visual por los 7 niveles del proyecto y cierre con llamada a la acción.",
          narration:
            "En esta serie recorreremos los 46 bloques fundamentales: desde Arrays y Dos Punteros hasta Programación Dinámica y Árboles de Segmentos. Cada video desbloquea un nodo del Flowchart.",
        },
      ],
    },
  },
  {
    id: "brute-force",
    order: 2,
    title: "Brute Force (Fuerza Bruta)",
    shortTitle: "Brute Force",
    englishTerm: "Brute Force & Exhaustive Search",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "fundamentals",
    prerequisites: ["basic-dsa"],
    summary:
      "Probar sistemáticamente todas las posibilidades candidatas y verificar cuáles cumplen la condición. Es el punto de partida obligatorio en toda entrevista antes de optimizar.",
    analogy:
      "Abrir un candado de combinación de 3 dígitos probando desde el 000 hasta el 999 uno por uno. No es elegante, pero garantiza al 100% que encontrarás la combinación correcta y te permite entender las reglas del candado.",
    whenToUse: [
      "Cuando N es muy pequeño (ej. N ≤ 100 para O(N²) o N ≤ 10 para O(N!)).",
      "Durante los primeros 2 minutos de una entrevista para establecer una solución base correcta (baseline) y luego identificar qué trabajo repetido puedes optimizar.",
      "Para generar tests pequeños y verificar que tu algoritmo optimizado da la misma respuesta.",
    ],
    whenNotToUse: [
      "Cuando N ≥ 10⁴ y tu fuerza bruta requiere revisar todos los pares O(N²) o subconjuntos O(2ᴺ).",
    ],
    timeComplexity: {
      average: "O(N²) o O(N³) en pares/tripletas",
      worst: "O(2ᴺ) o O(N!) en combinatoria",
      note: "Depende del tamaño del espacio de búsqueda.",
    },
    spaceComplexity: "O(1) si solo iteramos con índices",
    constraintHint: "N ≤ 200 para triple bucle | N ≤ 2000 para doble bucle",
    pythonTemplate: `def two_sum_brute_force(nums: list[int], target: int) -> list[int]:
    """
    Revisa absolutamente todos los pares (i, j) con i < j.
    Tiempo: O(N^2) | Espacio: O(1)
    """
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
    typescriptTemplate: `export function twoSumBruteForce(nums: number[], target: number): number[] {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
    leetcodeProblems: [
      {
        number: 1,
        title: "Two Sum",
        slug: "two-sum",
        difficulty: "Easy",
        patternHint: "Empieza con el doble bucle O(N²) y nota que la búsqueda interna de `target - nums[i]` se puede acelerar.",
      },
      {
        number: 1534,
        title: "Count Good Triplets",
        slug: "count-good-triplets",
        difficulty: "Easy",
        patternHint: "Con N ≤ 100, el triple bucle O(N³) es la solución directa esperada.",
      },
      {
        number: 2367,
        title: "Number of Arithmetic Triplets",
        slug: "number-of-arithmetic-triplets",
        difficulty: "Easy",
        patternHint: "Compara fuerza bruta O(N³) contra búsqueda en conjunto.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica por qué la Fuerza Bruta NO es un 'mal algoritmo', sino el primer escalón indispensable en una entrevista técnica. Muestra cómo verbalizar la solución de fuerza bruta ante un entrevistador te da claridad para descubrir el cuello de botella.",
      keyTakeaways: [
        "En una entrevista, mencionar primero la fuerza bruta demuestra estructura mental y asegura que entendiste el problema.",
        "Toda optimización (Hash Map, Sliding Window, DP) nace de preguntarse: '¿qué cálculo estoy repitiendo innecesariamente en mi fuerza bruta?'",
      ],
      stepByStepWalkthrough: [
        "Definir qué forma tiene una 'solución candidata' (un par de índices, un subarreglo, una asignación).",
        "Escribir los ciclos anidados que enumeran todos los candidatos sin repetir (`j = i + 1`).",
        "Validar cada candidato y actualizar la respuesta óptima.",
        "Identificar el bucle más interno para optimizarlo con una estructura de datos.",
      ],
      interviewTraps: [
        "Empezar `j` desde `0` en vez de `i + 1`, usando el mismo elemento dos veces o contando pares duplicados.",
        "Quedarse callado en la entrevista intentando buscar la solución O(N) mágica sin antes enunciar la O(N²).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:00",
          sectionTitle: "El mito de que Fuerza Bruta es fracasar",
          visualCue: "Comparación entre un candidato bloqueado en silencio vs uno que plantea el baseline en 30 segundos.",
          narration:
            "Muchos creen que mencionar Fuerza Bruta en una entrevista resta puntos. En realidad, es todo lo contrario: es tu brújula para descubrir dónde está el trabajo repetido.",
        },
        {
          timestamp: "01:00 - 03:30",
          sectionTitle: "Anatomía de la enumeración de pares y tripletas",
          visualCue: "Animación de índices i y j recorriendo una cuadrícula triangular superior.",
          narration:
            "Cuando recorremos pares con i desde 0 y j desde i+1, exploramos N*(N-1)/2 combinaciones. Al ver ese bucle interno buscando un complemento, se vuelve obvio por qué existen los Hash Maps y los Dos Punteros.",
        },
      ],
    },
  },
  {
    id: "simulation",
    order: 3,
    title: "Simulation (Simulación Paso a Paso)",
    shortTitle: "Simulation",
    englishTerm: "Simulation",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "fundamentals",
    prerequisites: ["basic-dsa"],
    summary:
      "Traducir fielmente las reglas de un proceso, juego o sistema físico en código limpio y libre de bugs, manteniendo el estado en cada instante de tiempo o movimiento.",
    analogy:
      "Ser el árbitro de un juego de mesa que sigue el manual de instrucciones al pie de la letra: lanzas los dados, mueves la ficha exactamente X casillas, verificas si cayó en una trampa y actualizas el marcador.",
    whenToUse: [
      "El enunciado describe reglas explícitas paso a paso (un robot que gira en una cuadrícula, un juego por turnos, un cajero que da cambio).",
      "No se pide encontrar un camino óptimo entre millones de opciones, sino calcular el resultado exacto tras aplicar las reglas dadas.",
    ],
    whenNotToUse: [
      "Cuando el número de pasos a simular es gigantesco (ej. K = 10¹² pasos); ahí debes detectar ciclos con aritmética modular (`K % longitud_ciclo`) en vez de simular uno por uno.",
    ],
    timeComplexity: {
      average: "O(Pasos × Costo por paso)",
      worst: "O(N) a O(N²)",
      note: "Si hay ciclos repetitivos, usa el módulo del periodo para reducir K pasos grandes.",
    },
    spaceComplexity: "O(1) o proporcional al estado del tablero",
    constraintHint: "Reglas directas con N o pasos ≤ 10⁵",
    pythonTemplate: `def robot_simulation(commands: list[str]) -> tuple[int, int]:
    """
    Simulación con vectores de dirección (Norte, Este, Sur, Oeste).
    Evita decenas de if/else usando arreglos de desplazamiento dx, dy.
    """
    # Norte, Este, Sur, Oeste (sentido horario)
    dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    d = 0  # Empieza mirando al Norte
    x, y = 0, 0

    for cmd in commands:
        if cmd == "R":
            d = (d + 1) % 4
        elif cmd == "L":
            d = (d - 1) % 4
        else:
            steps = int(cmd)
            dx, dy = dirs[d]
            x += dx * steps
            y += dy * steps
    return x, y`,
    typescriptTemplate: `export function robotSimulation(commands: string[]): [number, number] {
  // Norte, Este, Sur, Oeste en sentido horario
  const dirs: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let d = 0;
  let x = 0,
    y = 0;

  for (const cmd of commands) {
    if (cmd === "R") d = (d + 1) % 4;
    else if (cmd === "L") d = (d + 3) % 4;
    else {
      const steps = Number(cmd);
      x += dirs[d][0] * steps;
      y += dirs[d][1] * steps;
    }
  }
  return [x, y];
}`,
    leetcodeProblems: [
      {
        number: 657,
        title: "Robot Return to Origin",
        slug: "robot-return-to-origin",
        difficulty: "Easy",
        patternHint: "Rastrea coordenadas (x, y) aplicando vectores de dirección.",
      },
      {
        number: 54,
        title: "Spiral Matrix",
        slug: "spiral-matrix",
        difficulty: "Medium",
        patternHint: "Simula los 4 bordes (top, bottom, left, right) encogiéndolos tras cada pasada.",
      },
      {
        number: 874,
        title: "Walking Robot Simulation",
        slug: "walking-robot-simulation",
        difficulty: "Medium",
        patternHint: "Vectores de dirección `(d + 1) % 4` + conjunto de obstáculos.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Enfoca este video en el arte de escribir código limpio para problemas de Simulación. Enseña el truco profesional de los 'vectores de dirección' `(dx, dy)` con aritmética modular `% 4` para evitar bloques gigantes de `if/else` que producen bugs en entrevistas.",
      keyTakeaways: [
        "En problemas de simulación, el reto no es algorítmico sino de ingeniería limpia y manejo de bordes.",
        "Usa arreglos de direcciones `dirs = [(0,1), (1,0), (0,-1), (-1,0)]` para rotar con `(d + 1) % 4`.",
        "Si el problema pide simular 10⁹ pasos en un estado finito, busca el ciclo y usa el operador módulo.",
      ],
      stepByStepWalkthrough: [
        "Identificar las variables que definen el estado completo del sistema (ej. posición x, y, dirección d).",
        "Codificar las transiciones de estado en funciones pequeñas o tablas de vectores.",
        "Verificar condiciones de frontera antes de aplicar cada movimiento.",
      ],
      interviewTraps: [
        "Escribir 16 `if/else` anidados para giros a izquierda/derecha en lugar de usar índices circulares `% 4`.",
        "En JavaScript/TypeScript, olvidar que `-1 % 4` da `-1`, por lo que para girar a la izquierda se usa `(d + 3) % 4`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Qué es un problema de Simulación",
          visualCue: "Un robot moviéndose en una cuadrícula con flechas de dirección.",
          narration:
            "Hay problemas donde no necesitas inventar un algoritmo secreto: el enunciado ya te dice exactamente qué hacer en cada paso. El verdadero examen aquí es traducir esas reglas sin enredarte en tu propio código.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "El truco de los Vectores de Dirección",
          visualCue: "Brújula con índices 0, 1, 2, 3 mostrando `(d + 1) % 4` y `(d + 3) % 4`.",
          narration:
            "Olvídate de escribir un switch gigante para Norte, Sur, Este y Oeste. Si ordenas tus vectores en sentido horario, girar a la derecha siempre es sumar 1 módulo 4.",
        },
      ],
    },
  },
  {
    id: "arrays",
    order: 4,
    title: "Arrays (Arreglos Estáticos y Dinámicos)",
    shortTitle: "Arrays",
    englishTerm: "Arrays & Dynamic Arrays",
    kind: "data-structure",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["basic-dsa"],
    summary:
      "La estructura de datos más importante de la computación: bloques contiguos de memoria que permiten acceso instantáneo O(1) por índice y máxima velocidad de caché en CPU.",
    analogy:
      "Una fila de casilleros numerados del 0 al N-1 en un pasillo recto. Como todos miden exactamente lo mismo y están pegados uno al lado del otro, para ir al casillero #500 no tienes que contar desde el 0: calculas su posición exacta y vas directo en un instante.",
    whenToUse: [
      "Necesitas acceso aleatorio instantáneo O(1) a cualquier elemento conociendo su índice `i`.",
      "Quieres recorrer secuencias con máxima eficiencia de memoria y caché.",
      "Como bloque constructor para Two Pointers, Sliding Window, Prefix Sums, Binary Search y Heaps.",
    ],
    whenNotToUse: [
      "Necesitas insertar o eliminar elementos frecuentemente al inicio o en medio de la colección (cuesta O(N) porque obliga a desplazar todos los elementos siguientes).",
    ],
    timeComplexity: {
      average: "Acceso: O(1) | Append final: O(1) amortizado",
      worst: "Inserción/Borrado en medio: O(N) | Búsqueda sin orden: O(N)",
      note: "Los arreglos dinámicos (`list` en Python, `Array` en JS) duplican su capacidad interna cuando se llenan.",
    },
    spaceComplexity: "O(N) memoria contigua",
    constraintHint: "Base de todos los problemas con N ≤ 10⁵",
    pythonTemplate: `def array_operations_demo(nums: list[int]) -> list[int]:
    """
    Operaciones esenciales y sus complejidades reales en Python (list = Dynamic Array).
    """
    # 1. Acceso por índice -> O(1)
    first = nums[0] if nums else 0

    # 2. Agregar al final (append) -> O(1) amortizado
    nums.append(first + 10)

    # 3. Eliminar del final (pop) -> O(1)
    nums.pop()

    # 4. Inversión in-place sin duplicar memoria -> O(N) tiempo, O(1) espacio
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1

    return nums`,
    typescriptTemplate: `export function arrayOperationsDemo(nums: number[]): number[] {
  // 1. Acceso aleatorio por índice -> O(1)
  const first = nums.length > 0 ? nums[0] : 0;

  // 2. Push / Pop al final -> O(1) amortizado
  nums.push(first + 10);
  nums.pop();

  // 3. Inversión in-place -> O(N) tiempo, O(1) espacio extra
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  return nums;
}`,
    leetcodeProblems: [
      {
        number: 238,
        title: "Product of Array Except Self",
        slug: "product-of-array-except-self",
        difficulty: "Medium",
        patternHint: "Dos pasadas sobre el arreglo (prefijos hacia adelante y sufijos hacia atrás) en O(N) y espacio O(1) extra.",
      },
      {
        number: 189,
        title: "Rotate Array",
        slug: "rotate-array",
        difficulty: "Medium",
        patternHint: "El truco de las 3 reversiones in-place para rotar un arreglo en O(1) de espacio.",
      },
      {
        number: 485,
        title: "Max Consecutive Ones",
        slug: "max-consecutive-ones",
        difficulty: "Easy",
        patternHint: "Recorrido lineal manteniendo un contador de racha actual.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo funcionan los Arrays en memoria física (aritmética de direcciones `base + i * tamaño`) y cómo funcionan los Dynamic Arrays (`list` en Python) con duplicación de capacidad para lograr `append` en O(1) amortizado. Advierte sobre la trampa mortal de hacer `pop(0)` o `insert(0, x)` dentro de un bucle.",
      keyTakeaways: [
        "Un Array guarda elementos en celdas de memoria contiguas, permitiendo calcular la dirección del índice `i` en O(1).",
        "Insertar o borrar al final (`append`/`pop`) es O(1) amortizado, pero hacerlo al inicio (`pop(0)`) cuesta O(N).",
        "Dominar manipulaciones in-place (como el truco de revertir subsegmentos) ahorra memoria O(N).",
      ],
      stepByStepWalkthrough: [
        "Visualizar el bloque contiguo de memoria y el cálculo de offset.",
        "Entender qué pasa cuando un arreglo dinámico se llena: reserva el doble de espacio y copia en O(N) una sola vez cada N inserciones.",
        "Aplicar recorridos por índice de izquierda a derecha y de derecha a izquierda.",
      ],
      interviewTraps: [
        "Usar `nums.pop(0)` en Python o `nums.shift()` en JS dentro de un bucle `while`: convierte un algoritmo lineal en O(N²). Para colas usa `collections.deque`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Por qué el Array es el rey de la memoria",
          visualCue: "Bloques de RAM contiguos iluminándose al acceder a `arr[4]` en un solo salto.",
          narration:
            "Antes de aprender algoritmos avanzados, necesitamos dominar la estructura donde vive el 70% de los problemas de entrevista: el Array. Su superpoder está en cómo se guarda físicamente en la memoria RAM.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "Arreglos Dinámicos y el costo oculto de insertar en medio",
          visualCue: "Animación de todos los elementos corriéndose un lugar a la derecha al insertar en el índice 0.",
          narration:
            "Cuando agregas al final con append, toma tiempo constante amortizado. Pero si borras o insertas en la posición cero, obligas a toda la fila a moverse un paso. Hacer eso en un bucle es la causa número uno de Time Limit Exceeded silencioso.",
        },
      ],
    },
  },
  {
    id: "strings",
    order: 5,
    title: "Strings (Cadenas de Caracteres)",
    shortTitle: "Strings",
    englishTerm: "Strings & Character Manipulation",
    kind: "data-structure",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["arrays"],
    summary:
      "Secuencias de caracteres que funcionan como arreglos de solo lectura (inmutables en Python, JS y Java). Dominar códigos ASCII, conteo de frecuencias de 26 letras y construcción con `join` es esencial antes de Sliding Window y String Matching.",
    analogy:
      "Un collar de cuentas con letras grabadas donde el hilo está sellado con pegamento (inmutable). Puedes leer cualquier letra al instante, pero si quieres cambiar una sola letra o agregar una al final, no puedes abrir el collar: tienes que fabricar un collar nuevo copiando todas las cuentas.",
    whenToUse: [
      "Procesamiento de texto, palíndromos, anagramas, subcadenas (substrings) y validación de formatos.",
      "Cuando el alfabeto es pequeño y fijo (ej. 26 letras minúsculas `'a'-'z'`), permitiendo usar un arreglo fijo de tamaño 26 en lugar de un Hash Map general.",
    ],
    whenNotToUse: [
      "Nunca concatenes strings con `s += char` dentro de un bucle grande en lenguajes con strings inmutables; usa una lista de caracteres y `''.join(chars)` al final.",
    ],
    timeComplexity: {
      average: "Lectura `s[i]`: O(1) | Comparación/Copia/Slice: O(N)",
      worst: "Concatenación repetida ingenua en bucle: O(N²)",
      note: "Usar `''.join(lista)` garantiza construcción en O(N).",
    },
    spaceComplexity: "O(N) para almacenar la cadena o lista mutable de caracteres",
    constraintHint: "Alfabeto 'a'-'z' → Vector de frecuencia de tamaño 26 en O(1) espacio",
    pythonTemplate: `def char_frequency_signature(s: str) -> tuple[int, ...]:
    """
    Convierte un string de letras 'a'-'z' en una firma de 26 enteros en O(N).
    Dos strings son anagramas si y solo si tienen la misma firma.
    """
    counts = [0] * 26
    for ch in s:
        # ord(ch) - ord('a') mapea 'a'->0, 'b'->1, ..., 'z'->25
        counts[ord(ch) - ord('a')] += 1
    return tuple(counts)


def build_string_efficiently(parts: list[str]) -> str:
    # SIEMPRE usa ''.join() en lugar de concatenar con += en un bucle
    return "".join(parts)`,
    typescriptTemplate: `export function charFrequencySignature(s: string): string {
  const counts = new Array<number>(26).fill(0);
  const base = "a".charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - base]++;
  }
  return counts.join("#");
}`,
    leetcodeProblems: [
      {
        number: 242,
        title: "Valid Anagram",
        slug: "valid-anagram",
        difficulty: "Easy",
        patternHint: "Usa un arreglo de tamaño 26 con `ord(c) - ord('a')` para contar frecuencias en O(N) tiempo y O(1) espacio.",
      },
      {
        number: 49,
        title: "Group Anagrams",
        slug: "group-anagrams",
        difficulty: "Medium",
        patternHint: "Agrupa palabras usando su tupla de conteo de 26 letras como llave de un Hash Map.",
      },
      {
        number: 151,
        title: "Reverse Words in a String",
        slug: "reverse-words-in-a-string",
        difficulty: "Medium",
        patternHint: "Tokenización limpia e inversión de lista de palabras con `join`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Destaca las 2 claves que separan a un principiante de un experto manejando Strings en entrevistas: 1) entender la inmutabilidad (por qué concatenar en bucle puede ser cuadrático y cómo resolverlo con `join`), y 2) el truco `ord(c) - ord('a')` para mapear letras a un arreglo de 26 posiciones.",
      keyTakeaways: [
        "En Python, Java y JavaScript los Strings son inmutables: modificar un carácter crea un objeto nuevo.",
        "El truco `ord(ch) - ord('a')` convierte cualquier letra minúscula en un índice de 0 a 25 en O(1).",
        "Distinción crucial: 'Substring' es contiguo (sin saltos); 'Subsequence' puede saltar caracteres manteniendo el orden relativo.",
      ],
      stepByStepWalkthrough: [
        "Verificar qué caracteres puede contener el string (solo `'a'-'z'`, alfanumérico, o ASCII completo de 128/256).",
        "Si necesitas mutar caracteres in-place, convierte primero a lista `chars = list(s)` y al terminar haz `''.join(chars)`.",
        "Para comparar frecuencias de ventanas o anagramas, usa un vector fijo de 26 enteros.",
      ],
      interviewTraps: [
        "Confundir Substring (contiguo, se resuelve con Sliding Window) con Subsequence (no contiguo, suele requerir Two Pointers o Dynamic Programming).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Strings: Arreglos con un secreto de inmutabilidad",
          visualCue: "Animación de un string bloqueado con candado vs una lista mutable de caracteres.",
          narration:
            "Aunque un String se parece a un Array de letras, guarda una diferencia crítica: es inmutable. Entender qué significa esto en memoria te salvará de errores de rendimiento en entrevistas.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "El truco de las 26 casillas (`ord(c) - ord('a')`)",
          visualCue: "Vector de 26 casillas incrementándose mientras pasan las letras de la palabra 'anagrama'.",
          narration:
            "Cuando el problema usa letras minúsculas del inglés, no necesitas un Hash Map pesado. Restar el código ASCII de la letra 'a' te da un índice limpio del 0 al 25.",
        },
      ],
    },
  },
  {
    id: "two-pointers",
    order: 6,
    title: "Two Pointers (Dos Punteros)",
    shortTitle: "Two Pointers",
    englishTerm: "Two Pointers",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["arrays", "strings"],
    summary:
      "Utilizar dos índices coordinados que recorren una secuencia (acercándose desde los extremos `left/right` o avanzando en la misma dirección `read/write`) para reducir búsquedas de O(N²) a un solo pase lineal O(N) con espacio O(1).",
    analogy:
      "Dos personas buscando un libro en un estante ordenado por precio: una empieza por el más barato a la izquierda y otra por el más caro a la derecha. Si la suma de ambos precios se pasa de tu presupuesto, quien está en el lado caro da un paso a la izquierda; si falta dinero, quien está en el lado barato da un paso a la derecha.",
    whenToUse: [
      "El arreglo está ordenado (o puedes ordenarlo) y buscas pares o tripletas que cumplan una suma o condición (`Two Sum II`, `3Sum`).",
      "Quieres verificar palíndromos o simetría comparando extremos hacia el centro.",
      "Debes compactar, filtrar o eliminar duplicados de un arreglo in-place en O(1) espacio usando un puntero lector y otro escritor.",
    ],
    whenNotToUse: [
      "Para buscar pares con suma objetivo en un arreglo NO ordenado donde debes devolver los índices originales (ordenarlo destruiría los índices originales; ahí usa un Hash Map).",
    ],
    timeComplexity: {
      average: "O(N) (o O(N log N) si primero ordenas)",
      worst: "O(N)",
      note: "Cada paso mueve al menos uno de los dos punteros, haciendo como máximo N iteraciones.",
    },
    spaceComplexity: "O(1) espacio auxiliar",
    constraintHint: "N ≤ 10⁵ con arreglo ordenado o modificación in-place O(1) espacio",
    pythonTemplate: `def two_pointers_converging(nums: list[int], target: int) -> list[int]:
    """
    Modalidad 1: Punteros convergentes en un arreglo ORDENADO.
    Tiempo: O(N) | Espacio: O(1)
    """
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1   # Necesitamos una suma más grande
        else:
            right -= 1  # Necesitamos una suma más pequeña
    return []


def remove_duplicates_inplace(nums: list[int]) -> int:
    """
    Modalidad 2: Punteros en la misma dirección (Write / Read).
    """
    if not nums:
        return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write`,
    typescriptTemplate: `export function twoPointersConverging(nums: number[], target: number): number[] {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`,
    leetcodeProblems: [
      {
        number: 167,
        title: "Two Sum II - Input Array Is Sorted",
        slug: "two-sum-ii-input-array-is-sorted",
        difficulty: "Medium",
        patternHint: "Punteros `left` al inicio y `right` al final aprovechando el orden ascendente.",
      },
      {
        number: 15,
        title: "3Sum",
        slug: "3sum",
        difficulty: "Medium",
        patternHint: "Ordena el arreglo, fija `i` y ejecuta Two Pointers en `i+1 ... n-1` saltando duplicados.",
      },
      {
        number: 11,
        title: "Container With Most Water",
        slug: "container-with-most-water",
        difficulty: "Medium",
        patternHint: "Mueve siempre el puntero que tenga la pared más baja, porque es el cuello de botella del área.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica con claridad cristalina las dos modalidades de Two Pointers: 1) Extremos opuestos (`left` y `right` acercándose) y 2) Misma dirección (`write` y `read` para modificar arreglos in-place). Demuestra por qué descartar un extremo nunca pierde la respuesta correcta cuando el arreglo está ordenado.",
      keyTakeaways: [
        "Two Pointers convierte problemas cuadráticos O(N²) en lineales O(N) sin usar memoria extra O(1).",
        "En arreglos ordenados, cada comparación te permite descartar toda una fila o columna de pares de un solo golpe.",
        "Para `3Sum`, fijas un elemento con un bucle externo y reduces el resto a `Two Sum II` en O(N²).",
      ],
      stepByStepWalkthrough: [
        "Identificar si los punteros deben empezar en `(0, n-1)` (convergentes) o en `(0, 0)` (misma dirección).",
        "Definir la condición invariante que decide qué puntero debe moverse en cada iteración.",
        "Asegurar que en cada paso del `while (left < right)` al menos un puntero avance para evitar ciclos infinitos.",
      ],
      interviewTraps: [
        "En problemas como `3Sum`, olvidar saltar valores duplicados (`while left < right and nums[left] == nums[left-1]: left += 1`), generando tripletas repetidas.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "De O(N²) a O(N) con dos índices",
          visualCue: "Dos flechas (L y R) en los extremos de un arreglo ordenado convergiendo al centro.",
          narration:
            "Si el arreglo está ordenado, revisar todos los pares con un doble bucle es desperdiciar información. Con Dos Punteros en los extremos, cada suma fallida nos dice con certeza matemática cuál extremo debemos descartar.",
        },
        {
          timestamp: "01:30 - 04:30",
          sectionTitle: "Las 2 variantes: Convergentes vs Lector/Escritor",
          visualCue: "Pantalla dividida mostrando Container With Most Water arriba y Remove Duplicates abajo.",
          narration:
            "No todos los Dos Punteros vienen de extremos opuestos. Cuando te piden limpiar un arreglo in-place sin crear otro nuevo, el puntero lector explora hacia adelante mientras el puntero escritor guarda solo los elementos válidos.",
        },
      ],
    },
  },
  {
    id: "sliding-window",
    order: 7,
    title: "Sliding Window (Ventana Deslizante)",
    shortTitle: "Sliding Window",
    englishTerm: "Sliding Window (Fixed & Dynamic)",
    kind: "algorithm",
    level: 1,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["arrays", "strings", "two-pointers"],
    summary:
      "Mantener un subsegmento contiguo `[left..right]` que se desliza sobre un arreglo o string como una oruga: se expande por la derecha (`right++`) y se contrae por la izquierda (`left++`) reutilizando el cálculo anterior en O(N).",
    analogy:
      "Una oruga avanzando por una rama: estira la cabeza hacia adelante (`right`) para comer hojas mientras la ventana sea válida, y cuando se pasa del límite permitido, encoge la cola (`left`) hasta volver a cumplir la regla, sin volver a contar las hojas del medio.",
    whenToUse: [
      "El problema pide el subarreglo o substring CONTIGUO más largo, más corto o de suma máxima/mínima que cumpla cierta condición.",
      "Ventana de tamaño fijo `K`: 'encuentra el promedio/suma máxima de cualquier subarreglo de longitud K'.",
      "Ventana de tamaño dinámico: 'el substring más largo sin caracteres repetidos' o 'con a lo sumo K ceros'.",
    ],
    whenNotToUse: [
      "¡CUIDADO! Si el arreglo tiene números NEGATIVOS y buscas una suma objetivo o ventana válida por suma, agregar un elemento a la derecha puede disminuir la suma en vez de aumentarla, rompiendo la monotonía de Sliding Window (ahí usa Prefix Sum + Hash Map o Monotonic Deque).",
    ],
    timeComplexity: {
      average: "O(N)",
      worst: "O(N)",
      note: "Aunque hay un `while` dentro de un `for`, tanto `left` como `right` avanzan como máximo N veces en total (2N pasos = O(N)).",
    },
    spaceComplexity: "O(1) o O(K) para el mapa de frecuencias de la ventana",
    constraintHint: "Subarray/Substring contiguo óptimo con N ≤ 10⁵ (y valores no negativos si es por suma)",
    pythonTemplate: `def sliding_window_dynamic(s: str) -> int:
    """
    Plantilla Universal de Sliding Window Dinámica (ej. Longest Substring Without Repeating Chars).
    Tiempo: O(N) | Espacio: O(alfabeto)
    """
    window_counts: dict[str, int] = {}
    left = 0
    max_len = 0

    for right, ch in enumerate(s):
        # 1. Expandir la ventana incluyendo s[right]
        window_counts[ch] = window_counts.get(ch, 0) + 1

        # 2. Contraer desde 'left' mientras la ventana viole la condición
        while window_counts[ch] > 1:
            left_ch = s[left]
            window_counts[left_ch] -= 1
            left += 1

        # 3. Actualizar la mejor respuesta con la ventana válida [left..right]
        max_len = max(max_len, right - left + 1)

    return max_len`,
    typescriptTemplate: `export function slidingWindowDynamic(s: string): number {
  const counts = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    counts.set(ch, (counts.get(ch) ?? 0) + 1);

    // Contraer mientras la condición sea inválida
    while ((counts.get(ch) ?? 0) > 1) {
      const leftCh = s[left];
      counts.set(leftCh, (counts.get(leftCh) ?? 1) - 1);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    leetcodeProblems: [
      {
        number: 3,
        title: "Longest Substring Without Repeating Characters",
        slug: "longest-substring-without-repeating-characters",
        difficulty: "Medium",
        patternHint: "Expande `right` y encoge `left` mientras el carácter recién agregado tenga frecuencia > 1.",
      },
      {
        number: 209,
        title: "Minimum Size Subarray Sum",
        slug: "minimum-size-subarray-sum",
        difficulty: "Medium",
        patternHint: "Para ventana MÍNIMA, actualiza la respuesta DENTRO del `while` mientras la condición se cumpla y encoge `left`.",
      },
      {
        number: 424,
        title: "Longest Repeating Character Replacement",
        slug: "longest-repeating-character-replacement",
        difficulty: "Medium",
        patternHint: "La ventana es válida si `(right - left + 1) - max_frecuencia <= k`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Presenta la 'Plantilla Universal de 3 Pasos de Sliding Window' (1. Expandir con `right`, 2. Contraer con `while` desde `left`, 3. Actualizar respuesta). Explica la diferencia entre buscar la ventana MÁS LARGA (actualizar fuera del while) vs la ventana MÁS CORTA (actualizar dentro del while), y por qué el `while` dentro del `for` sigue siendo O(N) y no O(N²).",
      keyTakeaways: [
        "Palabra clave en el enunciado: 'subarray contiguo' o 'substring' + 'más largo / más corto / suma máxima'.",
        "Complejidad O(N) amortizada: ningún elemento entra más de una vez por `right` ni sale más de una vez por `left`.",
        "Diferencia clave: en ventana máxima encoges cuando es INVÁLIDA; en ventana mínima encoges mientras sea VÁLIDA para exprimir su tamaño.",
      ],
      stepByStepWalkthrough: [
        "Inicializar `left = 0`, el estado de la ventana (suma o diccionario de conteo) y la variable de mejor respuesta.",
        "Iterar `right` de `0` a `N-1` agregando el elemento `nums[right]` al estado de la ventana.",
        "Usar un ciclo `while` para avanzar `left` y restar `nums[left]` cuando la ventana necesita ajustarse.",
        "Calcular el tamaño de la ventana con la fórmula `right - left + 1`.",
      ],
      interviewTraps: [
        "Intentar usar Sliding Window de suma cuando el arreglo tiene números negativos (ej. LeetCode 560 Subarray Sum Equals K). Con negativos, usa Prefix Sum + Hash Map.",
        "Equivocarse por 1 en el tamaño de la ventana: la cantidad de elementos entre `left` y `right` inclusive es `right - left + 1`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "La Oruga: Por qué no recalcular desde cero",
          visualCue: "Marco luminoso deslizándose sobre un arreglo: entra el elemento derecho y sale el izquierdo.",
          narration:
            "Si calculas la suma de cinco elementos y luego te mueves un paso a la derecha, ¿para qué volver a sumar los cuatro del medio? Solo suma el que entra por la derecha y resta el que sale por la izquierda. Eso es Sliding Window.",
        },
        {
          timestamp: "01:30 - 04:30",
          sectionTitle: "La Plantilla Universal de Ventana Dinámica",
          visualCue: "Código con los 3 bloques numerados: Expandir, Contraer y Actualizar.",
          narration:
            "El 95% de los problemas de ventana deslizante caen con la misma plantilla de diez líneas: un bucle for para avanzar right, y un while interno que avanza left solo cuando rompemos la regla.",
        },
      ],
    },
  },

  // ============================================================================
  // NIVEL 2: PREPROCESAMIENTO, HASHING, ORDENAMIENTO Y BÚSQUEDA (08 - 14)
  // ============================================================================
  {
    id: "prefix-sum",
    order: 8,
    title: "Prefix Sums (Sumas de Prefijos 1D y 2D)",
    shortTitle: "Prefix Sums",
    englishTerm: "Prefix Sums",
    kind: "algorithm",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays"],
    summary:
      "Precalcular en O(N) las sumas acumuladas desde el inicio del arreglo para responder cualquier consulta de suma en un rango `[L, R]` en tiempo instantáneo O(1) mediante la resta `prefix[R+1] - prefix[L]`.",
    analogy:
      "El odómetro (cuentakilómetros) de un auto en una carretera: si en el kilómetro 0 de tu viaje marcaba 10,200 km al pasar por el pueblo A y luego marca 10,350 km al llegar al pueblo B, sabes en un instante que entre A y B hay exactamente 150 km (`10350 - 10200`), sin tener que volver a medir cada metro del tramo.",
    whenToUse: [
      "Múltiples consultas de suma o XOR sobre rangos `[L, R]` de un arreglo estático.",
      "Contar o encontrar subarreglos que sumen exactamente `K` cuando PUEDE haber números negativos (combinando `Prefix Sum + Hash Map`).",
      "Consultas de suma de submatrices rectangulares en 2D en O(1) por consulta.",
    ],
    whenNotToUse: [
      "Si el arreglo cambia constantemente entre consultas (`update(i, val)` + `rangeSum(L, R)`): actualizar un Prefix Sum cuesta O(N). Para actualizaciones dinámicas necesitas un Fenwick Tree o Segment Tree.",
    ],
    timeComplexity: {
      average: "Preprocesamiento: O(N) | Consulta de rango `[L, R]`: O(1)",
      worst: "O(N) total",
      note: "Agregar un cero inicial (`prefix = [0] * (n + 1)`) elimina todos los casos borde cuando L = 0.",
    },
    spaceComplexity: "O(N) para guardar el arreglo de prefijos",
    constraintHint: "Q ≤ 10⁵ consultas de rango o Subarray Sum = K con números negativos",
    pythonTemplate: `class RangeSumQuery:
    """
    Prefix Sum 1D con padding de un 0 a la izquierda.
    pref[i] guarda la suma de los primeros i elementos: nums[0..i-1].
    """
    def __init__(self, nums: list[int]):
        self.pref = [0] * (len(nums) + 1)
        for i, x in enumerate(nums):
            self.pref[i + 1] = self.pref[i] + x

    def query(self, left: int, right: int) -> int:
        # Suma de nums[left..right] inclusive en O(1)
        return self.pref[right + 1] - self.pref[left]


def subarray_sum_equals_k(nums: list[int], k: int) -> int:
    """
    Patrón Estrella: Prefix Sum + Hash Map (funciona con números NEGATIVOS).
    Si pref_actual - pref_anterior == k -> entonces pref_anterior == pref_actual - k.
    """
    seen_prefixes = {0: 1}  # Un prefijo vacío tiene suma 0
    curr_sum = 0
    count = 0
    for x in nums:
        curr_sum += x
        count += seen_prefixes.get(curr_sum - k, 0)
        seen_prefixes[curr_sum] = seen_prefixes.get(curr_sum, 0) + 1
    return count`,
    typescriptTemplate: `export function subarraySumEqualsK(nums: number[], k: number): number {
  const seenPrefixes = new Map<number, number>([[0, 1]]);
  let currSum = 0;
  let count = 0;

  for (const x of nums) {
    currSum += x;
    count += seenPrefixes.get(currSum - k) ?? 0;
    seenPrefixes.set(currSum, (seenPrefixes.get(currSum) ?? 0) + 1);
  }
  return count;
}`,
    leetcodeProblems: [
      {
        number: 303,
        title: "Range Sum Query - Immutable",
        slug: "range-sum-query-immutable",
        difficulty: "Easy",
        patternHint: "Arreglo `pref` de tamaño `N+1` con `pref[0] = 0`.",
      },
      {
        number: 560,
        title: "Subarray Sum Equals K",
        slug: "subarray-sum-equals-k",
        difficulty: "Medium",
        patternHint: "Guarda en un Hash Map cuántas veces ha aparecido cada `curr_sum` y busca `curr_sum - k`.",
      },
      {
        number: 304,
        title: "Range Sum Query 2D - Immutable",
        slug: "range-sum-query-2d-immutable",
        difficulty: "Medium",
        patternHint: "Principio de inclusión-exclusión en 2D: `pref[r2][c2] - arriba - izquierda + esquina_diagonal`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica primero la intuición del odómetro para Prefix Sum 1D con el truco del `0` extra al inicio (`N+1` elementos), y luego dedica la mitad central al patrón favorito de las entrevistas de Google y Meta: 'Prefix Sum + Hash Map' (LeetCode 560), explicando por qué triunfa donde Sliding Window falla (cuando hay números negativos).",
      keyTakeaways: [
        "Con un cero centinela al inicio (`pref = [0] * (n+1)`), la suma de `nums[L..R]` siempre es `pref[R+1] - pref[L]` sin `if L == 0`.",
        "La suma de un subarreglo `nums[i..j]` es la diferencia entre dos prefijos: `pref[j+1] - pref[i]`.",
        "Combinar Prefix Sum con un Hash Map transforma 'buscar un subarreglo de suma K' en un problema de tipo `Two Sum` sobre prefijos.",
      ],
      stepByStepWalkthrough: [
        "Construir el arreglo `pref` de longitud `N + 1` inicializado en 0.",
        "Para cada consulta `[L, R]`, devolver `pref[R + 1] - pref[L]` en O(1).",
        "Si buscas subarreglos con suma `K`, mantén un diccionario `{suma_prefijo: frecuencia}` inicializado en `{0: 1}`.",
      ],
      interviewTraps: [
        "Olvidar inicializar el diccionario con `{0: 1}` en `Subarray Sum Equals K`, perdiendo todos los subarreglos que empiezan exactamente en el índice 0.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "La analogía del odómetro y el Cero Centinela",
          visualCue: "Arreglo original arriba y arreglo `pref` de tamaño N+1 abajo mostrando la resta de dos casillas.",
          narration:
            "Si te preguntan mil veces cuánto suman los elementos entre el índice L y el R, sumar desde L hasta R cada vez es lentísimo. Con Prefix Sums hacemos una sola pasada inicial y luego cada pregunta se responde con una simple resta en O(1).",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Prefix Sum + Hash Map: El salvavidas con números negativos",
          visualCue: "Gráfica subiendo y bajando con números negativos mostrando dos puntos cuya diferencia de altura es K.",
          narration:
            "Cuando hay números negativos, la ventana deslizante pierde su brújula. Pero si guardamos cada suma acumulada en un Hash Map, preguntar si existe un subarreglo que sume K equivale a preguntar: ¿ya vi antes un prefijo igual a `suma_actual - K`?",
        },
      ],
    },
  },
  {
    id: "hash-table",
    order: 9,
    title: "Hash Tables (Hash Map & Hash Set)",
    shortTitle: "Hash Table",
    englishTerm: "Hash Table / Hash Map & Set",
    kind: "hybrid",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "strings"],
    summary:
      "La herramienta número uno para acelerar algoritmos: utiliza una función hash para transformar cualquier clave inmutable en un índice de arreglo, logrando inserción, borrado y búsqueda en tiempo promedio O(1).",
    analogy:
      "Un guardarropa de teatro con una regla matemática: en lugar de buscar tu abrigo revisando perchero por perchero (O(N)), la etiqueta calcula un número exacto a partir de tu nombre y el encargado va directo a ese gancho en un segundo (O(1)).",
    whenToUse: [
      "Necesitas saber en O(1) si un elemento ya apareció antes (`Hash Set` para duplicados o pertenencia).",
      "Necesitas asociar claves con valores: conteo de frecuencias, guardar el índice donde viste cada número (`Two Sum`), o agrupar elementos por una firma común.",
      "Quieres cambiar un bucle interno de búsqueda O(N) por una consulta instantánea O(1) (Trade-off Espacio por Tiempo).",
    ],
    whenNotToUse: [
      "Necesitas mantener los elementos ordenados o buscar el 'elemento más cercano mayor o igual a X' (un Hash Map no tiene orden; para eso usa Binary Search o un Ordered Set / BST).",
    ],
    timeComplexity: {
      average: "Insertar / Buscar / Borrar: O(1)",
      worst: "O(N) si todas las claves colisionan en el mismo bucket",
      note: "Las implementaciones modernas (`dict` en Python, `Map` en JS) redimensionan la tabla para mantener el factor de carga bajo.",
    },
    spaceComplexity: "O(N) para almacenar hasta N claves únicas",
    constraintHint: "Reemplaza búsquedas lineales internas cuando N ≤ 10⁵",
    pythonTemplate: `def two_sum_hash(nums: list[int], target: int) -> list[int]:
    """
    Patrón Clásico: Guardar {valor_visto: indice} mientras recorres en 1 solo pase.
    Tiempo: O(N) | Espacio: O(N)
    """
    seen: dict[int, int] = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []


def longest_consecutive(nums: list[int]) -> int:
    """
    Patrón de Inicio de Secuencia con Hash Set en O(N).
    """
    num_set = set(nums)
    best = 0
    for x in num_set:
        # Solo empezamos a contar si 'x' es el INICIO de una racha
        if (x - 1) not in num_set:
            length = 1
            while (x + length) in num_set:
                length += 1
            best = max(best, length)
    return best`,
    typescriptTemplate: `export function twoSumHash(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
    leetcodeProblems: [
      {
        number: 1,
        title: "Two Sum",
        slug: "two-sum",
        difficulty: "Easy",
        patternHint: "Consulta si `target - x` ya está en el diccionario antes de insertar `x`.",
      },
      {
        number: 128,
        title: "Longest Consecutive Sequence",
        slug: "longest-consecutive-sequence",
        difficulty: "Medium",
        patternHint: "Mete todo en un `set` y solo expande hacia adelante desde números `x` cuyo `x - 1` NO esté en el set.",
      },
      {
        number: 217,
        title: "Contains Duplicate",
        slug: "contains-duplicate",
        difficulty: "Easy",
        patternHint: "Detección inmediata en O(N) con `set`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo funciona una Tabla Hash por dentro (función hash -> módulo capacidad -> resolución de colisiones) y luego enseña los 3 patrones de entrevista con Hash: 1) Búsqueda de complemento (`Two Sum`), 2) Mapa de frecuencias, y 3) Detección de inicio de racha en O(N) (`Longest Consecutive Sequence`).",
      keyTakeaways: [
        "Chiste clásico pero real de entrevistas: si te atascas, pregúntate '¿y si le meto un Hash Map?'",
        "En Python, las llaves de un `dict` o elementos de un `set` deben ser inmutables (`int`, `str`, `tuple`), nunca `list`.",
        "En `Longest Consecutive Sequence`, verificar `if (x - 1) not in num_set` evita trabajo repetido y garantiza O(N).",
      ],
      stepByStepWalkthrough: [
        "Preguntarse: ¿qué información del pasado me gustaría consultar en O(1) mientras estoy en el índice `i`?",
        "Definir qué es la Clave (`key`) y qué es el Valor (`value`: índice, frecuencia o lista de elementos agrupados).",
        "Recorrer la entrada actualizando y consultando la tabla hash.",
      ],
      interviewTraps: [
        "Intentar usar una lista mutable `[1, 2]` como llave de un diccionario en Python (`TypeError: unhashable type: 'list'`). Conviértela a `tuple([1, 2])`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Cómo funciona una Hash Table bajo el capó",
          visualCue: "Animación de una clave pasando por `hash(key) % buckets` y manejando una colisión.",
          narration:
            "Una Tabla Hash combina la flexibilidad de buscar por cualquier llave con la velocidad instantánea de un Array. ¿Cómo lo logra? Usando una función matemática que convierte tu llave en un índice numérico.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Los 3 Patrones Maestros con Hash Map y Hash Set",
          visualCue: "Tres tarjetas visuales: Complemento O(1), Contador de Frecuencias y Centinela de Secuencia.",
          narration:
            "Más allá de guardar datos, en entrevistas usarás tablas hash para tres jugadas maestras: recordar el índice de un complemento, contar frecuencias y detectar el inicio exacto de secuencias consecutivas en tiempo lineal.",
        },
      ],
    },
  },
  {
    id: "counting",
    order: 10,
    title: "Counting & Bucket Sort (Ordenamiento por Conteo)",
    shortTitle: "Counting / Buckets",
    englishTerm: "Counting Sort & Bucket Sort",
    kind: "algorithm",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "hash-table"],
    summary:
      "Romper la barrera teórica del O(N log N) de los ordenamientos por comparación: cuando los valores o frecuencias caen en un rango acotado `[0..K]`, podemos agruparlos en cubetas (buckets) y ordenarlos en tiempo lineal O(N + K).",
    analogy:
      "Ordenar un mazo de 500 monedas de 1, 5, 10 y 20 pesos. En lugar de comparar monedas de dos en dos (QuickSort/MergeSort), simplemente pones 4 cajas en la mesa, tiras cada moneda en su caja correspondiente y al final juntas las cajas en orden.",
    whenToUse: [
      "El rango de valores posibles `K` es pequeño o proporcional a `N` (ej. edades `0..120`, colores `0, 1, 2`, calificaciones `0..100`).",
      "Quieres ordenar elementos por su FRECUENCIA de aparición (la frecuencia máxima nunca supera `N`, por lo que puedes crear `N + 1` cubetas donde el índice `f` guarda los elementos que aparecen `f` veces).",
    ],
    whenNotToUse: [
      "Cuando los valores pueden ser gigantescos o arbitrarios (ej. enteros de hasta `10⁹` o flotantes sin acotar), ya que crear un arreglo de tamaño `10⁹` agotaría la memoria RAM.",
    ],
    timeComplexity: {
      average: "O(N + K) donde K es el número de cubetas",
      worst: "O(N + K)",
      note: "Supera a O(N log N) cuando K = O(N).",
    },
    spaceComplexity: "O(N + K) para los contadores y cubetas",
    constraintHint: "Rango de valores K ≤ 10⁵ o ordenar por frecuencia (frecuencia ≤ N)",
    pythonTemplate: `def top_k_frequent_buckets(nums: list[int], k: int) -> list[int]:
    """
    Bucket Sort por Frecuencia (LeetCode 347) en O(N) puro, sin usar Heap.
    Como ningún elemento puede aparecer más de N veces, creamos N+1 cubetas.
    """
    freq_map: dict[int, int] = {}
    for x in nums:
        freq_map[x] = freq_map.get(x, 0) + 1

    # buckets[f] contiene la lista de números que aparecieron exactamente 'f' veces
    buckets: list[list[int]] = [[] for _ in range(len(nums) + 1)]
    for num, freq in freq_map.items():
        buckets[freq].append(num)

    result: list[int] = []
    # Recorremos las cubetas desde la mayor frecuencia hacia abajo
    for freq in range(len(nums), 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result`,
    typescriptTemplate: `export function topKFrequentBuckets(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const x of nums) {
    freqMap.set(x, (freqMap.get(x) ?? 0) + 1);
  }

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of freqMap.entries()) {
    buckets[freq].push(num);
  }

  const res: number[] = [];
  for (let f = nums.length; f >= 1; f--) {
    for (const num of buckets[f]) {
      res.push(num);
      if (res.length === k) return res;
    }
  }
  return res;
}`,
    leetcodeProblems: [
      {
        number: 347,
        title: "Top K Frequent Elements",
        slug: "top-k-frequent-elements",
        difficulty: "Medium",
        patternHint: "Usa `buckets[frecuencia]` de tamaño `N+1` para lograr O(N) en vez de O(N log K) con Heap.",
      },
      {
        number: 451,
        title: "Sort Characters By Frequency",
        slug: "sort-characters-by-frequency",
        difficulty: "Medium",
        patternHint: "Cuenta frecuencias y reconstruye el string recorriendo las cubetas de `N` a `1`.",
      },
      {
        number: 274,
        title: "H-Index",
        slug: "h-index",
        difficulty: "Medium",
        patternHint: "Trunca citas mayores a `N` en la cubeta `N` y acumula de derecha a izquierda en O(N).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo es posible ordenar en O(N) sin romper las leyes de la computación (evitando comparaciones directas y usando los propios valores o frecuencias como índices de un arreglo de cubetas). Destaca el truco de Bucket Sort por Frecuencia en 'Top K Frequent Elements'.",
      keyTakeaways: [
        "Todo algoritmo de ordenamiento basado en comparaciones (`<`, `>`) tarda al menos O(N log N), pero Counting/Bucket Sort no compara: indexa directamente.",
        "Aunque los números de entrada sean enormes (`-10⁹` a `10⁹`), sus FRECUENCIAS siempre están entre `1` y `N`, permitiendo usar Bucket Sort por frecuencia en O(N).",
      ],
      stepByStepWalkthrough: [
        "Identificar la variable acotada (el valor del elemento si es pequeño, o su frecuencia si ya contamos con un Hash Map).",
        "Crear un arreglo de cubetas `buckets` cuyo índice representa esa cantidad acotada.",
        "Recorrer las cubetas en orden ascendente o descendente para recolectar la respuesta en O(N).",
      ],
      interviewTraps: [
        "Inicializar cubetas en Python con `buckets = [[]] * (n + 1)`: eso crea `n + 1` referencias a la MISMA lista en memoria. Siempre usa `[[] for _ in range(n + 1)]`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Rompiendo el límite de O(N log N)",
          visualCue: "Comparación de árbol de decisiones O(N log N) vs caída directa en cubetas numeradas O(N).",
          narration:
            "En la universidad nos enseñan que ordenar toma N log N. Pero eso solo aplica si ordenas comparando elementos entre sí. Si sabes que tus datos caen en un rango pequeño, puedes usar los propios números como índices de casilleros.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "Bucket Sort por Frecuencia (El truco de Top-K en O(N))",
          visualCue: "Arreglo de cubetas de 0 a N donde cada índice guarda los números con esa frecuencia.",
          narration:
            "Incluso si los números del arreglo son gigantescos, ¿cuántas veces puede repetirse un número en un arreglo de tamaño N? Como máximo N veces. Eso nos permite ordenar por frecuencia en tiempo 100% lineal.",
        },
      ],
    },
  },
  {
    id: "sorting-intervals",
    order: 11,
    title: "Sorting + Interval Scan ( Barrido de Intervalos)",
    shortTitle: "Sorting + Intervals",
    englishTerm: "Sorting & Merge Intervals",
    kind: "algorithm",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "basic-dsa"],
    summary:
      "Ordenar segmentos `[start, end]` (por su punto de inicio o de fin) para que cualquier par de intervalos que se traslapen queden adyacentes, permitiendo fusionarlos, contar colisiones o detectar huecos libres en un solo barrido lineal.",
    analogy:
      "Organizar tu calendario de reuniones del día: si las notas de tus reuniones están revueltas sobre el escritorio, es difícil ver cuáles se cruzan. Pero si las ordenas por hora de inicio de las 8:00 AM a las 6:00 PM, basta mirar cada reunión contra la inmediatamente anterior para ver si chocan.",
    whenToUse: [
      "El input es una lista de intervalos `[start, end]`, horarios de reuniones, reservas o segmentos en una línea.",
      "Te piden fusionar intervalos superpuestos (`Merge Intervals`), insertar un nuevo intervalo, o encontrar huecos libres.",
    ],
    whenNotToUse: [
      "Si el problema pide elegir el MÁXIMO número de intervalos que NO se solapan (Interval Scheduling Greedy), conviene ordenar por `end` (hora de finalización) en lugar de `start`.",
    ],
    timeComplexity: {
      average: "O(N log N) dominado por el ordenamiento inicial",
      worst: "O(N log N)",
      note: "El barrido posterior al sort toma solo O(N).",
    },
    spaceComplexity: "O(N) para almacenar la lista de intervalos fusionados",
    constraintHint: "Lista de pares [start, end] con N ≤ 10⁵",
    pythonTemplate: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """
    Patrón Clásico de Fusión de Intervalos.
    1. Ordenar por start: key=lambda x: x[0]
    2. Comparar curr[start] <= prev[end]
    Tiempo: O(N log N) | Espacio: O(N)
    """
    if not intervals:
        return []

    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        prev_end = merged[-1][1]
        if start <= prev_end:
            # Hay traslape: extendemos el final con el máximo de ambos
            merged[-1][1] = max(prev_end, end)
        else:
            # No hay traslape: agregamos un nuevo intervalo independiente
            merged.append([start, end])

    return merged`,
    typescriptTemplate: `export function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];

  intervals.sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [[...intervals[0]]];

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}`,
    leetcodeProblems: [
      {
        number: 56,
        title: "Merge Intervals",
        slug: "merge-intervals",
        difficulty: "Medium",
        patternHint: "Ordena por `start` y fusiona si `curr.start <= merged[-1].end` usando `max(prev_end, curr_end)`.",
      },
      {
        number: 57,
        title: "Insert Interval",
        slug: "insert-interval",
        difficulty: "Medium",
        patternHint: "Divide en 3 fases: los que terminan antes del nuevo, los que se solapan con el nuevo, y los que empiezan después.",
      },
      {
        number: 435,
        title: "Non-overlapping Intervals",
        slug: "non-overlapping-intervals",
        difficulty: "Medium",
        patternHint: "Ordena por `end` (o al detectar choque conserva el intervalo que termine más temprano).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Muestra visualmente los 3 casos posibles entre dos intervalos ordenados por inicio: 1) Separados (`curr.start > prev.end`), 2) Traslape parcial, y 3) Uno completamente contenido dentro del otro (por eso es obligatorio usar `max(prev.end, curr.end)` y no simplemente `curr.end`).",
      keyTakeaways: [
        "Ordenar por `start` garantiza que si dos intervalos se solapan, estarán contiguos en el recorrido.",
        "La condición universal de solapamiento (una vez ordenados por inicio) es simplemente `curr.start <= prev.end`.",
        "Al fusionar, el nuevo fin es `max(prev.end, curr.end)` porque el primer intervalo podría ser más largo y envolver al segundo (`[1, 10]` y `[2, 5]`).",
      ],
      stepByStepWalkthrough: [
        "Ordenar el arreglo de intervalos de menor a mayor según su extremo izquierdo `x[0]`.",
        "Inicializar la lista `merged` con el primer intervalo.",
        "Para cada intervalo siguiente, comparar su inicio con el final del último intervalo en `merged`.",
        "Si se solapan, ampliar el final con `max`; si no, hacer `append`.",
      ],
      interviewTraps: [
        "Escribir `merged[-1][1] = end` en vez de `max(merged[-1][1], end)`: falla cuando un intervalo grande como `[1, 10]` es seguido por uno pequeño `[2, 3]`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Domando el caos de los intervalos con un Sort",
          visualCue: "Barras horizontales desordenadas alineándose de izquierda a derecha tras ordenar por inicio.",
          narration:
            "Comparar todos los intervalos contra todos toma O(N²). Pero en cuanto los ordenamos por su punto de inicio, ocurre la magia: cualquier traslape ocurre únicamente con el vecino inmediato.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "La condición `start <= prev_end` y la trampa del intervalo envolvente",
          visualCue: "El intervalo [1, 10] tragándose al intervalo [2, 5] manteniendo el final en 10.",
          narration:
            "El error más común en entrevistas al fusionar intervalos es reemplazar el final directamente. ¿Qué pasa si el primer intervalo iba de 1 a 10 y el segundo va de 2 a 5? Siempre debes usar el máximo de ambos finales.",
        },
      ],
    },
  },
  {
    id: "partitioning",
    order: 12,
    title: "Partitioning (QuickSelect & Dutch National Flag)",
    shortTitle: "Partitioning",
    englishTerm: "Partitioning, QuickSelect & 3-Way Partition",
    kind: "algorithm",
    level: 2,
    difficulty: "Intermediate",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "two-pointers"],
    summary:
      "Reorganizar un arreglo in-place alrededor de un pivote en O(N) para separar elementos menores, iguales y mayores sin tener que ordenar todo el arreglo completo.",
    analogy:
      "Clasificar la ropa para lavar en tres cestos (blanca, de color y oscura) en una sola pasada, o encontrar al jugador de estatura mediana de un salón haciendo que los más bajos que un voluntario pasen a la izquierda y los más altos a la derecha: si a la izquierda quedaron muchos, solo sigues buscando en ese grupo.",
    whenToUse: [
      "Necesitas el K-ésimo elemento más grande o más pequeño (o la mediana) en O(N) tiempo promedio sin pagar el O(N log N) de ordenar todo (`QuickSelect`).",
      "Debes agrupar un arreglo en exactamente 3 categorías in-place en un solo pase (`Dutch National Flag` / `Sort Colors` con punteros `low`, `mid`, `high`).",
      "Mover todos los ceros o pares al frente manteniendo O(1) espacio.",
    ],
    whenNotToUse: [
      "Si necesitas que TODOS los elementos queden ordenados o vas a hacer muchas consultas de distintos K sobre el mismo arreglo (ahí ordena una sola vez en O(N log N)).",
    ],
    timeComplexity: {
      average: "O(N) (QuickSelect: N + N/2 + N/4 + ... = 2N)",
      worst: "O(N²) en QuickSelect si el pivote siempre cae en un extremo (usa pivote aleatorio + 3-way partition)",
      note: "Dutch National Flag siempre es O(N) estricto en un solo pase.",
    },
    spaceComplexity: "O(1) in-place",
    constraintHint: "K-th Largest en O(N) promedio o clasificación en 3 grupos con O(1) espacio",
    pythonTemplate: `def sort_colors_dutch_flag(nums: list[int]) -> None:
    """
    Algoritmo de la Bandera Holandesa de Dijkstra (3-Way Partitioning in-place).
    Clasifica 0s (izquierda), 1s (centro) y 2s (derecha) en 1 solo pase O(N).
    Invariante:
      nums[0..low-1] == 0
      nums[low..mid-1] == 1
      nums[high+1..n-1] == 2
    """
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1  # OJO: No incrementamos mid porque el valor traído de 'high' aún no fue inspeccionado`,
    typescriptTemplate: `export function sortColorsDutchFlag(nums: number[]): void {
  let low = 0,
    mid = 0,
    high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--; // No avanzar mid hasta evaluar el nuevo elemento traído desde high
    }
  }
}`,
    leetcodeProblems: [
      {
        number: 75,
        title: "Sort Colors",
        slug: "sort-colors",
        difficulty: "Medium",
        patternHint: "Usa los 3 punteros (`low`, `mid`, `high`) de la Bandera Nacional Holandesa.",
      },
      {
        number: 215,
        title: "Kth Largest Element in an Array",
        slug: "kth-largest-element-in-an-array",
        difficulty: "Medium",
        patternHint: "QuickSelect con partición en 3 vías (`< pivot`, `== pivot`, `> pivot`) para alcanzar O(N) promedio.",
      },
      {
        number: 283,
        title: "Move Zeroes",
        slug: "move-zeroes",
        difficulty: "Easy",
        patternHint: "Partición estable de 2 vías: intercambia elementos no-cero hacia el puntero `low`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo la operación de Partición es el motor tanto de QuickSort como de QuickSelect (encontrar el K-ésimo elemento en O(N) porque solo exploras una mitad: N + N/2 + N/4 = 2N). Luego explica en detalle el invariante de los 3 punteros de Edsger Dijkstra ('Dutch National Flag') y por qué NO se incrementa `mid` cuando intercambias con `high`.",
      keyTakeaways: [
        "QuickSelect encuentra el K-ésimo elemento en O(N) promedio porque descarta una mitad en cada paso (`N + N/2 + N/4 ... = 2N`).",
        "La partición de 3 vías (Dutch National Flag) evita el peor caso O(N²) cuando el arreglo tiene muchos elementos duplicados.",
        "Al intercambiar `mid` con `high`, el elemento que viene desde `high` es desconocido, así que `mid` debe quedarse quieto para evaluarlo en la siguiente vuelta.",
      ],
      stepByStepWalkthrough: [
        "Definir las regiones del arreglo mediante punteros frontera (`low`, `mid`, `high`).",
        "Inspeccionar siempre el elemento en `nums[mid]` mientras `mid <= high`.",
        "En QuickSelect, comparar el índice del pivote (o rango de iguales al pivote) contra `k` para decidir en qué subarreglo continuar.",
      ],
      interviewTraps: [
        "Incrementar `mid` después de hacer swap con `high` en `Sort Colors`: te saltarías sin revisar el número que acabas de traer desde el final.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Ordenar a medias es el doble de inteligente: QuickSelect",
          visualCue: "Árbol de QuickSort podando una rama entera en cada nivel: N + N/2 + N/4 = 2N.",
          narration:
            "Si solo te interesa saber quién quedó en el puesto número K, ¿para qué ordenar todo el salón? Al partir el grupo respecto a un pivote, sabes instantáneamente de qué lado está el puesto K y descartas la otra mitad para siempre.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "La Bandera Holandesa de Dijkstra (3-Way Partition)",
          visualCue: "Tres zonas de color (Rojo 0, Blanco 1, Azul 2) y la zona gris de incógnita entre mid y high.",
          narration:
            "Cuando tienes tres categorías o muchos duplicados, la partición de tres punteros de Dijkstra mantiene cuatro zonas en el arreglo y reduce la zona desconocida hasta que `mid` cruza a `high`.",
        },
      ],
    },
  },
  {
    id: "binary-search",
    order: 13,
    title: "Binary Search (Búsqueda Binaria y Espacio de Respuestas)",
    shortTitle: "Binary Search",
    englishTerm: "Binary Search & Monotonic Search Space",
    kind: "algorithm",
    level: 2,
    difficulty: "Intermediate",
    branchCategory: "hashing-sorting-search",
    prerequisites: ["arrays", "basic-dsa"],
    summary:
      "Dividir repetidamente a la mitad un espacio de búsqueda en O(log N). No solo sirve para buscar un número en un arreglo ordenado: funciona sobre CUALQUIER condición monótona `[False, False, ..., True, True]`, incluyendo buscar la respuesta óptima ('Binary Search on Answer').",
    analogy:
      "Adivinar un número del 1 al 1,000,000 cuando te dicen 'más alto' o 'más bajo', o probar a partir de qué piso de un edificio de 100 pisos se rompe un cristal: empiezas en el piso 50; si se rompe, sabes que del 51 al 100 también se romperá y buscas abajo; si resiste, buscas arriba. En solo 20 preguntas resuelves un millón de opciones.",
    whenToUse: [
      "El arreglo está ordenado (o rotado) y necesitas buscar un elemento o el primer índice `>= target` (`lower_bound`).",
      "El problema pide 'el MÍNIMO X tal que sea posible hacer Y' o 'el MÁXIMO X tal que se cumpla Y' y existe una función `es_factible(x)` monótona (`Binary Search on Answer`).",
      "La restricción es enorme (`N ≤ 10⁵` con verificación `O(N)` → total `O(N log(Rango))`, o `N ≥ 10⁹` → `O(log N)`).",
    ],
    whenNotToUse: [
      "Cuando la propiedad no es monótona (saber qué pasa en `mid` no te da ninguna certeza para descartar la mitad izquierda ni la mitad derecha).",
    ],
    timeComplexity: {
      average: "O(log N) en arreglo | O(N log(Max - Min)) en Binary Search on Answer",
      worst: "O(log N)",
      note: "Para N = 1,000,000,000 (`10⁹`), `log₂(N)` son apenas ~30 iteraciones.",
    },
    spaceComplexity: "O(1) iterativo",
    constraintHint: "Arreglo ordenado o 'Minimiza el máximo / Maximiza el mínimo' con función factible monótona",
    pythonTemplate: `def binary_search_first_true(low: int, high: int, is_feasible) -> int:
    """
    Plantilla Maestra de AlgoMonster: Encontrar el PRIMER valor donde is_feasible(mid) es True.
    Patrón del dominio: [False, False, False, True, True, True]
                                              ^-- Queremos este primer True
    """
    first_true_idx = -1
    while low <= high:
        mid = low + (high - low) // 2
        if is_feasible(mid):
            first_true_idx = mid   # Guardamos candidato válido
            high = mid - 1         # Intentamos encontrar uno aún más a la izquierda (menor)
        else:
            low = mid + 1          # No alcanza, necesitamos un valor mayor
    return first_true_idx`,
    typescriptTemplate: `export function binarySearchFirstTrue(
  low: number,
  high: number,
  isFeasible: (mid: number) => boolean
): number {
  let firstTrueIdx = -1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isFeasible(mid)) {
      firstTrueIdx = mid; // Candidato válido encontrado
      high = mid - 1;     // Buscar si existe uno menor a la izquierda
    } else {
      low = mid + 1;      // Buscar a la derecha
    }
  }
  return firstTrueIdx;
}`,
    leetcodeProblems: [
      {
        number: 704,
        title: "Binary Search",
        slug: "binary-search",
        difficulty: "Easy",
        patternHint: "Búsqueda binaria clásica en arreglo ordenado.",
      },
      {
        number: 33,
        title: "Search in Rotated Sorted Array",
        slug: "search-in-rotated-sorted-array",
        difficulty: "Medium",
        patternHint: "Al partir en `mid`, al menos UNA de las dos mitades siempre está perfectamente ordenada.",
      },
      {
        number: 875,
        title: "Koko Eating Bananas",
        slug: "koko-eating-bananas",
        difficulty: "Medium",
        patternHint: "Binary Search on Answer: busca la velocidad mínima `k` en `[1, max(piles)]` donde `horas(k) <= h`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Revoluciona la forma en que el oyente entiende Binary Search: deja claro que NO se trata solo de buscar un número en un arreglo, sino de encontrar la frontera entre `False` y `True` en cualquier función monótona (la plantilla `first_true_idx` de AlgoMonster). Explica con el ejemplo de 'Koko Eating Bananas' cómo hacer Binary Search sobre el espacio de respuestas.",
      keyTakeaways: [
        "En vez de memorizar 5 variantes distintas de `while (l < r)` vs `while (l <= r)` que dan ciclos infinitos, usa siempre la plantilla de 'guardar el mejor candidato `ans = mid` y mover `high = mid - 1`'.",
        "Siempre que un problema pida 'el mínimo X para lograr Y' y si funciona con X también funciona con X+1, estás ante Binary Search on Answer.",
      ],
      stepByStepWalkthrough: [
        "Definir el rango posible de respuestas `[low, high]` (en un arreglo es `[0, n-1]`; en espacio de respuestas es `[min_posible, max_posible]`).",
        "Escribir la función booleana `is_feasible(mid)` que responde si con `mid` se cumple la condición.",
        "Si `is_feasible(mid)` es `True`, guardar `ans = mid` y probar si se puede mejorar (`high = mid - 1`). Si es `False`, hacer `low = mid + 1`.",
      ],
      interviewTraps: [
        "Quedar atrapado en un bucle infinito con `mid = (l + r) // 2` y `l = mid`. Usando `ans = mid` con `low = mid + 1` y `high = mid - 1` el rango se encoge en TODAS las iteraciones sin excepción.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "La verdadera esencia de Binary Search: La Frontera False → True",
          visualCue: "Fila de interruptores rojos (False) seguidos de interruptores verdes (True), iluminando el primer verde.",
          narration:
            "Olvida la idea de que Binary Search solo sirve para buscar un número dentro de un arreglo ordenado. Su verdadero poder aparece cuando puedes formular una pregunta de Sí o No donde todos los 'No' están a la izquierda y todos los 'Sí' están a la derecha.",
        },
        {
          timestamp: "01:45 - 05:00",
          sectionTitle: "Binary Search en el Espacio de Respuestas (Koko Eating Bananas)",
          visualCue: "Velocímetro probando velocidades entre 1 y Max, verificando en O(N) si llega a tiempo.",
          narration:
            "Cuando un problema pide la capacidad mínima de un barco o la velocidad mínima para terminar en H horas, no hacemos búsqueda binaria en el arreglo de entrada: la hacemos directamente sobre el rango de posibles respuestas.",
        },
      ],
    },
  },
  {
    id: "matrices-grids",
    order: 14,
    title: "Matrices & 2D Grids (Tableros y Cuadrículas)",
    shortTitle: "Matrices / Grids 2D",
    englishTerm: "2D Matrices & Grids",
    kind: "data-structure",
    level: 2,
    difficulty: "Beginner",
    branchCategory: "arrays-strings",
    prerequisites: ["arrays", "simulation"],
    summary:
      "Arreglos bidimensionales `grid[r][c]` de `R` filas por `C` columnas que modelan mapas, imágenes, tableros y grafos implícitos donde cada celda se conecta con sus 4 u 8 vecinos.",
    analogy:
      "Un tablero de ajedrez o una hoja de cálculo de Excel: cada casilla tiene una dirección única `(fila, columna)`. Además, cada casilla es como una habitación con 4 puertas (arriba, abajo, izquierda, derecha) que la conectan con las habitaciones vecinas.",
    whenToUse: [
      "Operaciones geométricas sobre imágenes o tablas (rotar 90 grados, transponer, poner filas/columnas en cero in-place).",
      "Problemas de islas, laberintos, propagación de fuego o caminos en cuadrículas (puente directo hacia BFS, DFS y DP 2D).",
    ],
    whenNotToUse: [
      "Si la cuadrícula es gigantesca (ej. `10⁶ × 10⁶`) pero casi todas las celdas están vacías (matriz dispersa / sparse): no crees la matriz en memoria; guarda solo las coordenadas activas `(r, c)` en un `Hash Set`.",
    ],
    timeComplexity: {
      average: "Recorrido completo: O(R × C) | Acceso a celda: O(1)",
      worst: "O(R × C)",
      note: "Una cuadrícula de R×C es un grafo con V = R*C nodos y hasta 4*R*C aristas.",
    },
    spaceComplexity: "O(1) si modificas in-place o O(R × C) con matriz de visitados",
    constraintHint: "R, C ≤ 1000 (total de celdas R × C ≤ 10⁶)",
    pythonTemplate: `def grid_neighbors_and_rotate(matrix: list[list[int]]) -> None:
    """
    1. Truco Clásico: Rotar una matriz N x N 90 grados en sentido horario IN-PLACE:
       Paso A: Transponer (intercambiar matrix[r][c] con matrix[c][r])
       Paso B: Invertir cada fila
    """
    n = len(matrix)
    for r in range(n):
        for c in range(r + 1, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
    for row in matrix:
        row.reverse()


def get_valid_4_neighbors(r: int, c: int, rows: int, cols: int) -> list[tuple[int, int]]:
    """
    2. Generador limpio de los 4 vecinos ortogonales dentro de los límites del tablero.
    """
    neighbors = []
    for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            neighbors.append((nr, nc))
    return neighbors`,
    typescriptTemplate: `export function rotateMatrix90Clockwise(matrix: number[][]): void {
  const n = matrix.length;
  // 1. Transponer sobre la diagonal principal
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }
  // 2. Invertir cada fila
  for (let r = 0; r < n; r++) {
    matrix[r].reverse();
  }
}`,
    leetcodeProblems: [
      {
        number: 48,
        title: "Rotate Image",
        slug: "rotate-image",
        difficulty: "Medium",
        patternHint: "Rotar 90° en sentido horario = Transponer la matriz + Invertir cada fila in-place.",
      },
      {
        number: 73,
        title: "Set Matrix Zeroes",
        slug: "set-matrix-zeroes",
        difficulty: "Medium",
        patternHint: "Usa la primera fila y la primera columna como marcadores para lograr O(1) espacio extra.",
      },
      {
        number: 74,
        title: "Search a 2D Matrix",
        slug: "search-a-2d-matrix",
        difficulty: "Medium",
        patternHint: "Mapea un índice 1D `idx` a coordenadas 2D con `r = idx // cols` y `c = idx % cols`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Presenta las Matrices 2D como el puente entre los arreglos simples y el mundo de los Grafos y la Programación Dinámica. Enseña las 3 recetas imprescindibles: 1) Mapear 1D <-> 2D con `idx = r * cols + c`, 2) Rotar 90° mediante Transponer + Reverse, y 3) Recorrer los 4 vecinos con `0 <= nr < rows and 0 <= nc < cols`.",
      keyTakeaways: [
        "Cualquier coordenada `(r, c)` se aplana a un índice 1D único con `id = r * C + c`, y se recupera con `r = id // C`, `c = id % C`.",
        "Rotar 90° horario nunca requiere fórmulas complicadas de 4 esquinas: basta Transponer (`r, c -> c, r`) e invertir cada fila.",
        "Todo tablero 2D es en realidad un Grafo implícito donde las celdas son nodos y las direcciones `(-1,0), (1,0), (0,-1), (0,1)` son las aristas.",
      ],
      stepByStepWalkthrough: [
        "Extraer siempre `rows = len(grid)` y `cols = len(grid[0])` al inicio de la función.",
        "Al transponer in-place, iniciar `c` desde `r + 1` para no intercambiar dos veces y dejar la matriz igual.",
        "Validar siempre los límites `0 <= nr < rows and 0 <= nc < cols` antes de leer `grid[nr][nc]`.",
      ],
      interviewTraps: [
        "En Python, los índices negativos como `grid[-1][0]` NO lanzan error sino que leen la última fila del tablero por accidente. Siempre escribe `0 <= nr < rows`, nunca solo `nr < rows`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "De 1D a 2D: Coordenadas, Diagonales y Aplanamiento",
          visualCue: "Cuadrícula iluminando filas, columnas, diagonal principal (`r == c`) y secundaria (`r + c == n - 1`).",
          narration:
            "Una matriz 2D no es más que un arreglo de arreglos, pero esconde propiedades geométricas geniales: en una misma diagonal principal `r - c` es constante, y en la diagonal inversa `r + c` es constante.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "La trampa de los índices negativos en Python y el puente a Grafos",
          visualCue: "Un cursor saliendo por arriba de la fila 0 a `r = -1` y leyendo por error la última fila en Python.",
          narration:
            "Atención si programas en Python: si te sales del borde superior hacia la fila `-1`, Python no lanza IndexError: lee silenciosamente la última fila de la matriz y arruina tu búsqueda. Verificar `0 <= nr < rows` es sagrado.",
        },
      ],
    },
  },
];

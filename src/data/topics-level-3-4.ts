import { DSATopic } from "@/types/dsa";

export const TOPICS_LEVEL_3_4: DSATopic[] = [
  // ============================================================================
  // NIVEL 3: PUNTEROS ENLAZADOS, PILAS, COLAS Y DISEÑO DE ESTRUCTURAS (15 - 20)
  // ============================================================================
  {
    id: "linked-list",
    order: 15,
    title: "Linked Lists (Listas Enlazadas Simples y Dobles)",
    shortTitle: "Linked Lists",
    englishTerm: "Singly & Doubly Linked Lists",
    kind: "data-structure",
    level: 3,
    difficulty: "Beginner",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["arrays"],
    summary:
      "Nodos independientes dispersos en memoria donde cada uno guarda su valor y una flecha (`next`, y `prev` en listas dobles) al siguiente nodo. Permiten insertar o eliminar en O(1) en cualquier punto si ya tienes la referencia al nodo.",
    analogy:
      "Una búsqueda del tesoro con pistas en sobres: el primer sobre no está pegado físicamente al segundo, pero adentro tiene un papel que dice 'la siguiente pista está debajo de la maceta azul'. Para llegar a la pista #5 debes abrir las pistas 1, 2, 3 y 4 en orden.",
    whenToUse: [
      "Necesitas insertar o eliminar elementos en O(1) en medio o en los extremos sin desplazar memoria contigua.",
      "Listas Doblemente Enlazadas (`prev` y `next`): cuando necesitas quitar un nodo específico de en medio de una cola en O(1) teniendo su referencia directa (pieza clave de LRU Cache).",
    ],
    whenNotToUse: [
      "Cuando necesitas acceso aleatorio por índice (`get(i)` cuesta O(N) porque debes caminar desde la cabeza `head`).",
    ],
    timeComplexity: {
      average: "Insertar/Borrar con puntero al nodo: O(1) | Buscar por índice/valor: O(N)",
      worst: "O(N)",
      note: "Usar un nodo centinela `dummy = ListNode(0, head)` elimina los casos especiales al borrar o cambiar la cabeza.",
    },
    spaceComplexity: "O(N) nodos y punteros",
    constraintHint: "Manipulación de punteros in-place en O(1) memoria extra",
    pythonTemplate: `class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None):
        self.val = val
        self.next = next


def delete_value_with_dummy(head: ListNode | None, target: int) -> ListNode | None:
    """
    El Truco del Nodo Dummy (Centinela):
    Evita tener que escribir un 'if' especial cuando el nodo a borrar es el propio 'head'.
    """
    dummy = ListNode(0, head)
    curr = dummy
    while curr.next:
        if curr.next.val == target:
            curr.next = curr.next.next  # Saltamos el nodo objetivo en O(1)
        else:
            curr = curr.next
    return dummy.next`,
    typescriptTemplate: `export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function deleteValueWithDummy(head: ListNode | null, target: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let curr: ListNode = dummy;
  while (curr.next !== null) {
    if (curr.next.val === target) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }
  return dummy.next;
}`,
    leetcodeProblems: [
      {
        number: 21,
        title: "Merge Two Sorted Lists",
        slug: "merge-two-sorted-lists",
        difficulty: "Easy",
        patternHint: "Crea un nodo `dummy` y ve cosiendo el menor entre `l1` y `l2`.",
      },
      {
        number: 203,
        title: "Remove Linked List Elements",
        slug: "remove-linked-list-elements",
        difficulty: "Easy",
        patternHint: "Usa `dummy.next = head` por si los primeros nodos también deben eliminarse.",
      },
      {
        number: 707,
        title: "Design Linked List",
        slug: "design-linked-list",
        difficulty: "Medium",
        patternHint: "Implementa con centinelas `head_dummy` y `tail_dummy` para simplificar inserciones.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Contrasta visualmente un Array (casilleros pegados en memoria) con una Linked List (nodos unidos por flechas/punteros). Enseña por qué el 'Nodo Dummy (Centinela)' es el mejor amigo del programador para evitar errores de `NullPointerException` cuando la cabeza de la lista cambia.",
      keyTakeaways: [
        "En una Linked List no existen índices automáticos: perder la referencia a `head` significa perder toda la lista.",
        "El orden en que reasignas punteros importa: guarda `nxt = curr.next` antes de sobrescribir `curr.next`.",
        "Un nodo `dummy` antes de `head` hace que todos los nodos tengan un nodo previo real.",
      ],
      stepByStepWalkthrough: [
        "Dibujar siempre 3 cajitas con flechas antes de escribir código de punteros.",
        "Crear `dummy = ListNode(0, head)` siempre que la cabeza original pueda cambiar o eliminarse.",
        "Retornar `dummy.next` al final.",
      ],
      interviewTraps: [
        "Hacer `curr.next = nuevo` antes de conectar `nuevo.next = curr.next`, cortando la cadena y perdiendo el resto de la lista en memoria.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "Arrays vs Linked Lists: Cajas contiguas vs Búsqueda del tesoro",
          visualCue: "Animación de nodos enlazados flotando en memoria conectados por flechas luminosas.",
          narration:
            "Si los Arrays son casilleros pegados en una pared, una Linked List es una cadena de pistas donde cada nodo solo sabe dónde vive el siguiente. Eso hace que buscar por posición sea lento, pero insertar o cortar eslabones sea instantáneo.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "El superpoder del Nodo Dummy (Centinela)",
          visualCue: "Un nodo gris 'Dummy' colocado delante de 'head' permitiendo borrar el primer elemento sin casos borde.",
          narration:
            "El 80% de los bugs en listas enlazadas ocurren cuando te toca borrar o mover el primer nodo. La solución profesional es colocar un nodo fantasma Dummy al inicio y devolver `dummy.next` al final.",
        },
      ],
    },
  },
  {
    id: "linkedlist-manipulation",
    order: 16,
    title: "Linked List Manipulation (Fast & Slow Pointers y Reversión)",
    shortTitle: "LL Manipulation",
    englishTerm: "Fast & Slow Pointers & In-Place Reversal",
    kind: "algorithm",
    level: 3,
    difficulty: "Intermediate",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["linked-list", "two-pointers"],
    summary:
      "Las dos técnicas quirúrgicas sobre listas enlazadas: 1) Tortuga y Liebre (`slow` avanza 1 paso, `fast` avanza 2 pasos) para hallar el nodo central o detectar ciclos en O(1) espacio, y 2) Inversión de punteros in-place con `prev, curr, nxt`.",
    analogy:
      "Dos corredores en una pista: si la pista es recta, cuando el corredor que va al doble de velocidad llega a la meta, el corredor lento va exactamente por la mitad. Y si la pista es circular (hay un ciclo), el corredor rápido inevitablemente alcanzará al lento dándole una vuelta de ventaja.",
    whenToUse: [
      "Encontrar el nodo del medio de una lista en una sola pasada sin contar su longitud previamente.",
      "Detectar si una lista (o secuencia de estados funcionales) tiene un ciclo y hallar el nodo exacto donde empieza el ciclo (Algoritmo de Floyd).",
      "Invertir toda la lista o un subsegmento `[left, right]` in-place sin crear nodos nuevos.",
    ],
    whenNotToUse: [
      "Nunca hagas `fast.next.next` sin verificar primero `while fast and fast.next:` en la condición del bucle.",
    ],
    timeComplexity: {
      average: "O(N)",
      worst: "O(N)",
      note: "Usa O(1) de memoria auxiliar frente a O(N) que usaría un Hash Set o pila recursiva.",
    },
    spaceComplexity: "O(1) punteros in-place",
    constraintHint: "Operaciones sobre listas o secuencias cíclicas exigiendo O(1) memoria extra",
    pythonTemplate: `def reverse_linked_list(head):
    """
    1. Reversión In-Place con 3 punteros: prev, curr, nxt.
    Tiempo: O(N) | Espacio: O(1)
    """
    prev = None
    curr = head
    while curr:
        nxt = curr.next      # 1. Guardar el siguiente antes de romper el enlace
        curr.next = prev     # 2. Invertir la flecha hacia atrás
        prev = curr          # 3. Avanzar prev
        curr = nxt           # 4. Avanzar curr
    return prev


def middle_and_cycle_detection(head):
    """
    2. Tortuga y Liebre (Fast & Slow Pointers de Floyd).
    """
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True  # ¡Ciclo detectado!
    return False`,
    typescriptTemplate: `import { ListNode } from "./linked-list";

export function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr !== null) {
    const nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }
  return prev;
}

export function hasCycleFloyd(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    leetcodeProblems: [
      {
        number: 206,
        title: "Reverse Linked List",
        slug: "reverse-linked-list",
        difficulty: "Easy",
        patternHint: "Baile de 4 líneas con `prev = None`, `curr = head` y `nxt = curr.next`.",
      },
      {
        number: 141,
        title: "Linked List Cycle",
        slug: "linked-list-cycle",
        difficulty: "Easy",
        patternHint: "Tortuga (`slow.next`) y Liebre (`fast.next.next`) en O(1) espacio.",
      },
      {
        number: 143,
        title: "Reorder List",
        slug: "reorder-list",
        difficulty: "Medium",
        patternHint: "El combo definitivo: 1) Halla la mitad con Slow/Fast, 2) Invierte la 2ª mitad, 3) Intercala ambas mitades.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Haz que el oyente domine de memoria las dos coreografías más preguntadas en entrevistas: 1) El baile de 4 pasos para invertir una lista (`nxt = curr.next`, `curr.next = prev`, `prev = curr`, `curr = nxt`) y 2) El algoritmo de la Tortuga y la Liebre de Floyd, cerrando con cómo ambos se combinan en 'Reorder List' o 'Palindrome Linked List'.",
      keyTakeaways: [
        "Invertir una lista in-place solo requiere 3 variables (`prev`, `curr`, `nxt`) y 4 asignaciones en orden cíclico.",
        "Cuando `fast` llega al final, `slow` está exactamente en el medio.",
        "En detección de ciclos de Floyd, si tras chocar reinicias un puntero en `head` y avanzas ambos de 1 en 1, se encuentran en la entrada exacta del ciclo.",
      ],
      stepByStepWalkthrough: [
        "Para hallar mitad/ciclo: inicializar `slow = fast = head` y ciclar con `while fast and fast.next:`.",
        "Para invertir: inicializar `prev = None`, `curr = head`, respaldar `nxt = curr.next` en cada paso y retornar `prev`.",
        "Para problemas compuestos (ej. `Reorder List`), partir la lista poniendo `slow.next = None` antes de invertir la segunda mitad.",
      ],
      interviewTraps: [
        "En `Reorder List`, olvidar cortar el enlace entre la primera y la segunda mitad (`slow.next = None`), provocando un ciclo infinito al mezclar las listas.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "La coreografía de 4 pasos: Invertir una Linked List in-place",
          visualCue: "Animación de las flechas girando 180 grados nodo por nodo con `prev`, `curr` y `nxt`.",
          narration:
            "Invertir una lista enlazada es una pregunta tan clásica que deberías poder escribirla con los ojos cerrados. No intentes memorizar código: memoriza el ciclo visual donde cada variable toma el lugar de la siguiente.",
        },
        {
          timestamp: "02:00 - 04:45",
          sectionTitle: "Tortuga y Liebre (Floyd) y el Combo de Reorder List",
          visualCue: "Dos cursores a velocidad 1x y 2x hallando la mitad y luego intercalando extremos.",
          narration:
            "¿Cómo encuentras la mitad de una lista sin saber cuántos nodos tiene? Con un puntero lento y uno rápido. Y cuando combinas eso con invertir la segunda mitad, resuelves problemas Medium y Hard en O(1) de memoria.",
        },
      ],
    },
  },
  {
    id: "stacks",
    order: 17,
    title: "Stacks (Pilas LIFO y Evaluación Anidada)",
    shortTitle: "Stacks (LIFO)",
    englishTerm: "Stacks (LIFO)",
    kind: "hybrid",
    level: 3,
    difficulty: "Beginner",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["arrays"],
    summary:
      "Estructura Last-In, First-Out (el último en entrar es el primero en salir) ideal para recordar el historial reciente, validar estructuras anidadas (paréntesis, HTML), deshacer acciones y simular recursión de forma iterativa.",
    analogy:
      "Una torre de platos limpios en una cafetería: siempre colocas el plato nuevo arriba del todo (`push`), y cuando alguien necesita un plato, toma exactamente ese último plato que pusiste arriba (`pop`).",
    whenToUse: [
      "Validar o emparejar símbolos que abren y cierran en orden anidado (`()`, `{}`, `[]`, etiquetas).",
      "Evaluar expresiones matemáticas (Notación Polaca Inversa / RPN, calculadoras con precedencia, decodificar strings `3[a2[c]]`).",
      "Rastrear el camino actual (historial de directorios `/a/b/../c`, botón Undo/Back).",
    ],
    whenNotToUse: [
      "Cuando necesitas atender elementos en el orden exacto de llegada (ahí usa una Queue FIFO).",
    ],
    timeComplexity: {
      average: "Push: O(1) | Pop: O(1) | Peek (`stack[-1]`): O(1)",
      worst: "O(N) para procesar N elementos",
      note: "En Python, una `list` normal funciona como Stack perfecto usando `append()` y `pop()`.",
    },
    spaceComplexity: "O(N) en el peor caso cuando todos los elementos se apilan",
    constraintHint: "Estructuras anidadas, paréntesis, calculadoras o historial con N ≤ 10⁵",
    pythonTemplate: `def is_valid_parentheses(s: str) -> bool:
    """
    Patrón Clásico de Emparejamiento LIFO con Stack.
    Tiempo: O(N) | Espacio: O(N)
    """
    closing_to_opening = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []

    for ch in s:
        if ch in closing_to_opening:
            # Si llega un cierre, el tope de la pila DEBE ser su apertura correspondiente
            if not stack or stack[-1] != closing_to_opening[ch]:
                return False
            stack.pop()
        else:
            stack.append(ch)

    # Al final la pila debe quedar completamente vacía
    return len(stack) == 0`,
    typescriptTemplate: `export function isValidParentheses(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];

  for (const ch of s) {
    if (ch in pairs) {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
    leetcodeProblems: [
      {
        number: 20,
        title: "Valid Parentheses",
        slug: "valid-parentheses",
        difficulty: "Easy",
        patternHint: "Apila aperturas y verifica el tope al encontrar un cierre.",
      },
      {
        number: 150,
        title: "Evaluate Reverse Polish Notation",
        slug: "evaluate-reverse-polish-notation",
        difficulty: "Medium",
        patternHint: "Apila números; al ver un operador, saca los 2 últimos (`b = pop()`, `a = pop()`) y apila `a op b`.",
      },
      {
        number: 394,
        title: "Decode String",
        slug: "decode-string",
        difficulty: "Medium",
        patternHint: "Al ver `[`, guarda `(string_previo, numero_k)` en la pila; al ver `]`, desapila y multiplica.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo una Pila (Stack) es la máquina del tiempo para todo lo que tenga anidamiento ('lo último que se abrió debe ser lo primero en cerrarse'). Muestra por qué toda llamada recursiva en la computadora usa internamente un Call Stack y cómo usar una pila explícita resuelve paréntesis, rutas de archivos y decodificación de cadenas.",
      keyTakeaways: [
        "LIFO (Last-In, First-Out): el elemento más reciente en entrar es siempre el primero en resolverse.",
        "Siempre verifica `if not stack:` antes de leer `stack[-1]` o hacer `stack.pop()`.",
        "Al finalizar el recorrido, verifica que `len(stack) == 0` por si quedaron aperturas huérfanas sin cerrar.",
      ],
      stepByStepWalkthrough: [
        "Recorrer los tokens o caracteres de izquierda a derecha.",
        "Si inicia un contexto nuevo (paréntesis abierto, operando), hacer `stack.append(x)`.",
        "Si cierra o combina el contexto más reciente, hacer `stack.pop()` y combinar con el nuevo tope.",
      ],
      interviewTraps: [
        "Retornar `True` al terminar el bucle en `Valid Parentheses` sin comprobar que la pila quedó vacía (falla en inputs como `'((('`).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "La ley del anidamiento: El último en abrir es el primero en cerrar",
          visualCue: "Cajas rusas (matrioshkas) y paréntesis anidados apilándose y desapilándose.",
          narration:
            "Piensa en cómo funcionan los paréntesis en matemáticas o las carpetas en tu computadora: el último bloque que abriste es obligatoriamente el primero que tienes que cerrar. Esa propiedad tiene nombre: LIFO, y su estructura es el Stack.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "De Valid Parentheses a Calculadoras y Decode String",
          visualCue: "Animación de `3[a2[c]]` guardando el contexto previo en la pila al entrar a cada corchete.",
          narration:
            "Cuando tienes estructuras dentro de otras estructuras, como en Decode String, la pila te permite pausar lo que estabas construyendo afuera, resolver lo de adentro y luego retomar exactamente donde te quedaste.",
        },
      ],
    },
  },
  {
    id: "queues-deques",
    order: 18,
    title: "Queues & Deques (Colas FIFO y Colas de Doble Extremo)",
    shortTitle: "Queues & Deques",
    englishTerm: "Queues (FIFO) & Double-Ended Queues (Deque)",
    kind: "data-structure",
    level: 3,
    difficulty: "Beginner",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["arrays", "linked-list"],
    summary:
      "Colas First-In, First-Out (el primero en llegar es el primero en salir) y Deques (`collections.deque`) que permiten insertar y extraer tanto por la izquierda como por la derecha en tiempo constante O(1).",
    analogy:
      "Una fila de personas en el banco (Queue FIFO): el primero que se formó en la fila es el primero al que atienden en la ventanilla. Una Deque es una fila VIP con puerta adelante y atrás que permite meter o sacar por ambos extremos al instante.",
    whenToUse: [
      "Procesar eventos o tareas en orden estricto de llegada (ventana de tiempo reciente, buffer de streaming).",
      "Recorrer árboles o grafos nivel por nivel (motor fundamental de Breadth-First Search - BFS).",
      "Mantener ventanas deslizantes donde entran elementos por la derecha y salen por la izquierda en O(1).",
    ],
    whenNotToUse: [
      "En Python, NUNCA uses `list.pop(0)` como cola porque cuesta O(N); importa siempre `from collections import deque` y usa `popleft()` en O(1).",
    ],
    timeComplexity: {
      average: "append / appendleft / pop / popleft: O(1)",
      worst: "O(1) en extremos",
      note: "`collections.deque` está implementada en C como una lista doblemente enlazada de bloques.",
    },
    spaceComplexity: "O(N) para los elementos en espera",
    constraintHint: "Procesamiento por orden de llegada, buffers circulares o BFS",
    pythonTemplate: `from collections import deque

class RecentCounter:
    """
    Ejemplo clásico de Queue FIFO en ventana de tiempo [t - 3000, t].
    Tiempo: O(1) amortizado por llamada | Espacio: O(W)
    """
    def __init__(self):
        self.q = deque()

    def ping(self, t: int) -> int:
        self.q.append(t)
        # Sacamos por la izquierda en O(1) todos los eventos que ya caducaron
        while self.q and self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)`,
    typescriptTemplate: `export class CircularDeque<T> {
  private items: Record<number, T> = {};
  private head = 0;
  private tail = 0;

  pushBack(val: T): void {
    this.items[this.tail++] = val;
  }

  popFront(): T | undefined {
    if (this.head === this.tail) return undefined;
    const val = this.items[this.head];
    delete this.items[this.head++];
    return val;
  }

  get size(): number {
    return this.tail - this.head;
  }
}`,
    leetcodeProblems: [
      {
        number: 933,
        title: "Number of Recent Calls",
        slug: "number-of-recent-calls",
        difficulty: "Easy",
        patternHint: "Agrega `t` con `append` y elimina llamadas `< t - 3000` con `popleft()`.",
      },
      {
        number: 622,
        title: "Design Circular Queue",
        slug: "design-circular-queue",
        difficulty: "Medium",
        patternHint: "Arreglo fijo de tamaño `K` con índices `(head + count) % K`.",
      },
      {
        number: 225,
        title: "Implement Stack using Queues",
        slug: "implement-stack-using-queues",
        difficulty: "Easy",
        patternHint: "Al insertar un elemento, rota los `N-1` anteriores detrás de él.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica la filosofía FIFO (First-In, First-Out) y por qué la estructura `deque` (Double-Ended Queue) es la navaja suiza que puede actuar como Stack, como Queue y como ventana deslizante en O(1). Enseña también cómo funciona una Cola Circular sobre un arreglo fijo usando el operador módulo `% capacity`.",
      keyTakeaways: [
        "FIFO procesa por orden de antigüedad o cercanía (por eso es la base de BFS para caminos más cortos).",
        "`collections.deque` en Python da `append`, `appendleft`, `pop` y `popleft` todos en O(1).",
        "En JavaScript/TypeScript no hay `deque` nativa en la librería estándar: usar un objeto con índices `head` y `tail` o un arreglo circular evita el costo O(N) de `Array.shift()`.",
      ],
      stepByStepWalkthrough: [
        "Importar `from collections import deque`.",
        "Encolar elementos nuevos por la derecha con `q.append(x)`.",
        "Desencolar el elemento más antiguo por la izquierda con `q.popleft()`.",
      ],
      interviewTraps: [
        "Usar `Array.shift()` en JS o `list.pop(0)` en Python en una cola con 100,000 elementos, causando TLE.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:30",
          sectionTitle: "FIFO vs LIFO: La justicia del orden de llegada",
          visualCue: "Túnel donde los datos entran por la derecha y salen en el mismo orden por la izquierda.",
          narration:
            "Mientras la Pila atiende siempre al último en llegar, la Cola respeta el turno de llegada: el primero en entrar es el primero en salir. Es la estructura esencial para procesar eventos en tiempo real y explorar grafos por capas.",
        },
        {
          timestamp: "01:30 - 04:00",
          sectionTitle: "Deque y Colas Circulares: O(1) en ambos extremos",
          visualCue: "Anillo circular con punteros head y tail avanzando con aritmética `% capacidad`.",
          narration:
            "Con una Deque o una Cola Circular obtienes inserciones y extracciones instantáneas tanto al frente como al final, preparando el terreno para dos de los algoritmos más potentes: BFS y Monotonic Queue.",
        },
      ],
    },
  },
  {
    id: "monotonic-stack",
    order: 19,
    title: "Monotonic Stack & Queue (Pila y Cola Monótona)",
    shortTitle: "Monotonic Stack",
    englishTerm: "Monotonic Stack & Monotonic Deque",
    kind: "algorithm",
    level: 3,
    difficulty: "Intermediate",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["stacks", "queues-deques"],
    summary:
      "Mantener una pila o deque cuyos elementos están estrictamente ordenados (crecientes o decrecientes). Al llegar un nuevo elemento que rompe el orden, desapilamos los anteriores, descubriendo en O(N) total cuál es el 'Siguiente Elemento Mayor o Menor' de cada posición.",
    analogy:
      "Una fila de edificios mirando hacia el mar: si se construye un rascacielos nuevo muy alto adelante, tapa la vista de todos los edificios más bajos que estaban detrás de él. Esos edificios bajos ya nunca serán el 'edificio más alto visible', así que podemos retirarlos de la lista de candidatos.",
    whenToUse: [
      "El problema pide para cada índice `i` encontrar el **Next Greater Element** (siguiente mayor a la derecha), **Next Smaller Element**, o cuántos días faltan para un día más cálido (`Daily Temperatures`).",
      "Encontrar el rectángulo de mayor área en un histograma (`Largest Rectangle in Histogram`) o cuánta agua atrapa un relieve (`Trapping Rain Water`).",
      "**Monotonic Deque**: Encontrar el máximo o mínimo dentro de una ventana deslizante de tamaño `K` en tiempo O(N) (`Sliding Window Maximum`).",
    ],
    whenNotToUse: [
      "Si solo necesitas el máximo o mínimo global de todo el arreglo hasta ahora (para eso basta una simple variable `max_so_far`).",
    ],
    timeComplexity: {
      average: "O(N)",
      worst: "O(N)",
      note: "Cada índice entra a la pila exactamente 1 vez y sale como máximo 1 vez (máximo 2N operaciones).",
    },
    spaceComplexity: "O(N) para la pila de índices",
    constraintHint: "Next Greater/Smaller Element, Histogramas o Sliding Window Maximum con N ≤ 10⁵",
    pythonTemplate: `def daily_temperatures(temps: list[int]) -> list[int]:
    """
    Plantilla Universal de Monotonic Decreasing Stack (guardamos ÍNDICES, no valores).
    Encuentra para cada posición cuántos pasos faltan hasta el primer elemento MAYOR a su derecha.
    Tiempo: O(N) | Espacio: O(N)
    """
    n = len(temps)
    ans = [0] * n
    stack: list[int] = []  # Pila de índices con temperaturas decrecientes

    for i, curr_temp in enumerate(temps):
        # Mientras el día actual sea MÁS CÁLIDO que el día en el tope de la pila,
        # ¡acabamos de encontrar el Next Greater Element para stack[-1]!
        while stack and curr_temp > temps[stack[-1]]:
            prev_idx = stack.pop()
            ans[prev_idx] = i - prev_idx
        stack.append(i)

    return ans`,
    typescriptTemplate: `export function dailyTemperatures(temps: number[]): number[] {
  const n = temps.length;
  const ans = new Array<number>(n).fill(0);
  const stack: number[] = []; // Guarda índices

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temps[i] > temps[stack[stack.length - 1]]) {
      const prevIdx = stack.pop()!;
      ans[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }
  return ans;
}`,
    leetcodeProblems: [
      {
        number: 739,
        title: "Daily Temperatures",
        slug: "daily-temperatures",
        difficulty: "Medium",
        patternHint: "Pila monótona decreciente de índices: desapila cuando `temps[i] > temps[stack[-1]]`.",
      },
      {
        number: 84,
        title: "Largest Rectangle in Histogram",
        slug: "largest-rectangle-in-histogram",
        difficulty: "Hard",
        patternHint: "Pila monótona creciente: cuando una barra baja, sabemos hasta dónde podía extenderse la barra alta anterior.",
      },
      {
        number: 239,
        title: "Sliding Window Maximum",
        slug: "sliding-window-maximum",
        difficulty: "Hard",
        patternHint: "Monotonic Deque decreciente: saca por atrás los menores al nuevo y por delante los que salieron de la ventana `i - k`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Desmitifica el Monotonic Stack, uno de los temas que más intimida en entrevistas pero que tiene una plantilla de apenas 10 líneas. Explica la regla de oro: 'Guarda siempre ÍNDICES en la pila, nunca solo los valores', y muestra cómo al hacer `pop()` descubres simultáneamente el límite derecho e izquierdo de un elemento (clave para `Largest Rectangle in Histogram`).",
      keyTakeaways: [
        "Para buscar el 'Siguiente Mayor' (Next Greater), mantén una pila monótona DECRECIENTE: el primer número mayor que llegue disparará los `pop()`.",
        "Para buscar el 'Siguiente Menor' (Next Smaller), mantén una pila monótona CRECIENTE.",
        "Guarda siempre ÍNDICES en la pila: con el índice `i` puedes calcular distancias (`i - prev_idx`) y también consultar el valor `nums[i]`.",
      ],
      stepByStepWalkthrough: [
        "Crear una lista `stack = []` que almacenará índices pendientes de encontrar su respuesta.",
        "Por cada nuevo índice `i`, usar un `while stack and nums[i] > nums[stack[-1]]:` para resolver y desapilar.",
        "Apilar el índice actual `stack.append(i)`.",
      ],
      interviewTraps: [
        "Guardar solo el valor `nums[i]` en vez del índice `i` en la pila, impidiendo saber en qué posición del arreglo de respuesta escribir o qué ancho tiene una ventana/rectángulo.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "La intuición de los rascacielos: ¿Qué es una Pila Monótona?",
          visualCue: "Barras de distintas alturas; al entrar una barra alta, las barras pequeñas previas se resuelven y salen de la pila.",
          narration:
            "Si para cada día de la semana quieres saber cuándo llegará un día más caluroso, comparar cada día con todos los futuros toma O(N²). Pero con una Pila Monótona, mantenemos en espera los días fríos y, en cuanto llega una ola de calor, resolvemos todos esos días pendientes de golpe en O(N).",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Histogramas y Sliding Window Maximum (Monotonic Deque)",
          visualCue: "Animación de `Largest Rectangle in Histogram` y `Sliding Window Maximum` con una Deque decreciente.",
          narration:
            "Lo más hermoso de una pila creciente es que cuando desapilas una barra porque llegó una más baja, el elemento que la saca es su límite derecho y el que quedó debajo en la pila es su límite izquierdo.",
        },
      ],
    },
  },
  {
    id: "system-ds-design",
    order: 20,
    title: "Design + Supporting Data Structures (LRU Cache, O(1) Set)",
    shortTitle: "Design + Supporting DS",
    englishTerm: "Data Structure Design (LRU, LFU, RandomizedSet)",
    kind: "hybrid",
    level: 3,
    difficulty: "Intermediate",
    branchCategory: "linked-stacks-queues",
    prerequisites: ["hash-table", "linked-list", "arrays", "stacks"],
    summary:
      "Combinar dos o más estructuras de datos (como `Hash Map + Doubly Linked List` o `Hash Map + Dynamic Array`) para superar las debilidades individuales de cada una y lograr que TODAS las operaciones compuestas corran en O(1).",
    analogy:
      "Un bibliotecario con un índice digital (Hash Map) que le dice en un segundo exactamente en qué eslabón de una cadena móvil (Doubly Linked List) está cualquier libro. Así puede encontrar el libro en O(1) con el índice y moverlo al frente de 'los más leídos recientemente' en O(1) desenganchando su eslabón.",
    whenToUse: [
      "El problema empieza con `Design a data structure that supports...` exigiendo O(1) en múltiples operaciones aparentemente contradictorias.",
      "**LRU Cache** (`get` y `put` en O(1) expulsando el menos usado recientemente): `Hash Map + Doubly Linked List`.",
      "**Insert / Delete / GetRandom en O(1)** (`RandomizedSet`): `Hash Map {val: idx} + Dynamic Array` (intercambiando el elemento a borrar con el último del array antes de hacer `pop()`).",
      "**Min Stack** (`push`, `pop`, `getMin` en O(1)): Pila que guarda pares `(valor, minimo_hasta_aqui)`.",
    ],
    whenNotToUse: [
      "Cuando una sola estructura estándar ya cumple los requisitos de tiempo.",
    ],
    timeComplexity: {
      average: "O(1) para todas las operaciones diseñadas",
      worst: "O(1)",
      note: "Cada estructura soporta la operación donde la otra sería O(N).",
    },
    spaceComplexity: "O(N) o O(Capacidad)",
    constraintHint: "Diseño de clases con múltiples métodos exigiendo O(1) por operación",
    pythonTemplate: `import random

class RandomizedSet:
    """
    Combo Clásico: Dynamic Array + Hash Map para Insert, Remove y GetRandom en O(1).
    Truco clave: Para borrar nums[idx] en O(1), copiamos el ÚLTIMO elemento en idx y hacemos pop().
    """
    def __init__(self):
        self.nums: list[int] = []
        self.val_to_idx: dict[int, int] = {}

    def insert(self, val: int) -> bool:
        if val in self.val_to_idx:
            return False
        self.val_to_idx[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.val_to_idx:
            return False
        idx = self.val_to_idx[val]
        last_val = self.nums[-1]
        # Movemos el último elemento al hueco 'idx'
        self.nums[idx] = last_val
        self.val_to_idx[last_val] = idx
        # Eliminamos el último en O(1)
        self.nums.pop()
        del self.val_to_idx[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)`,
    typescriptTemplate: `export class MinStack {
  private stack: Array<{ val: number; min: number }> = [];

  push(val: number): void {
    const currentMin =
      this.stack.length === 0 ? val : Math.min(val, this.stack[this.stack.length - 1].min);
    this.stack.push({ val, min: currentMin });
  }

  pop(): void {
    this.stack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1].val;
  }

  getMin(): number {
    return this.stack[this.stack.length - 1].min;
  }
}`,
    leetcodeProblems: [
      {
        number: 146,
        title: "LRU Cache",
        slug: "lru-cache",
        difficulty: "Medium",
        patternHint: "Hash Map `{key: Node}` + Lista Doblemente Enlazada con nodos centinela `head` y `tail`.",
      },
      {
        number: 380,
        title: "Insert Delete GetRandom O(1)",
        slug: "insert-delete-getrandom-o1",
        difficulty: "Medium",
        patternHint: "Array + Hash Map: para borrar en O(1), haz swap con `nums[-1]`, actualiza su índice en el mapa y haz `pop()`.",
      },
      {
        number: 155,
        title: "Min Stack",
        slug: "min-stack",
        difficulty: "Medium",
        patternHint: "Guarda en cada piso de la pila el par `(valor, minimo_acumulado)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Presenta este episodio como 'Arquitectura de Estructuras Híbridas': cómo fusionar dos estructuras básicas para conseguir superpoderes O(1). Explica los 3 diseños más preguntados en la historia de las entrevistas: 1) LRU Cache (Hash Map + Doubly Linked List), 2) RandomizedSet (Array + Hash Map con el truco de intercambiar con el último elemento al borrar), y 3) Min Stack.",
      keyTakeaways: [
        "Ninguna estructura básica lo hace todo en O(1): el Array tiene `getRandom` O(1) pero borrado O(N); el Hash Map tiene búsqueda O(1) pero no tiene índices aleatorios. ¡Juntos logran todo en O(1)!",
        "En LRU Cache, los dos nodos centinela `left_dummy` (LRU) y `right_dummy` (MRU) eliminan todos los errores de punteros nulos.",
      ],
      stepByStepWalkthrough: [
        "Listar las operaciones pedidas y qué complejidad exige cada una.",
        "Elegir la estructura primaria (ej. Hash Map para búsqueda O(1)) y la estructura de soporte (ej. Doubly Linked List para orden de uso O(1)).",
        "Mantener ambas estructuras sincronizadas en cada inserción o borrado.",
      ],
      interviewTraps: [
        "En `RandomizedSet.remove(val)`, borrar primero `del val_to_idx[val]` antes de actualizar `val_to_idx[last_val] = idx` falla cuando el elemento a borrar ES precisamente el último elemento del arreglo.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "El arte de fusionar estructuras de datos",
          visualCue: "Diagrama uniendo un Hash Map con una Lista Doblemente Enlazada (LRU Cache).",
          narration:
            "En las entrevistas de diseño de estructuras te pedirán cosas que parecen imposibles: buscar por llave en O(1), mantener el orden de uso reciente en O(1) y borrar de en medio en O(1). El secreto es hacer que dos estructuras trabajen en equipo.",
        },
        {
          timestamp: "02:00 - 05:00",
          sectionTitle: "LRU Cache y el truco del Swap-Pop en RandomizedSet",
          visualCue: "Animación de cómo borrar el índice 2 de un Array en O(1) copiando el último elemento encima.",
          narration:
            "¿Cómo borras un elemento en medio de un Array en tiempo O(1) si no te importa el orden? Copias el último elemento sobre el que quieres borrar, actualizas su posición en el Hash Map y haces pop al final.",
        },
      ],
    },
  },

  // ============================================================================
  // NIVEL 4: RECURSIÓN, ÁRBOLES, HEAPS Y TRIES (21 - 28)
  // ============================================================================
  {
    id: "divide-and-conquer",
    order: 21,
    title: "Divide and Conquer (Divide y Vencerás)",
    shortTitle: "Divide & Conquer",
    englishTerm: "Divide and Conquer",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["arrays", "binary-search"],
    summary:
      "Resolver un problema grande partiéndolo en 2 o más subproblemas independientes del mismo tipo (Divide), resolviéndolos recursivamente (Conquer) y combinando sus respuestas para formar la solución total (Combine).",
    analogy:
      "Contar los votos de un país: una sola persona tardaría años, pero si divides el país en estados, cada estado en municipios y cada municipio en mesas electorales, cada mesa cuenta 200 votos en minutos y luego solo sumas los totales hacia arriba.",
    whenToUse: [
      "El problema se puede partir en mitades independientes cuyas soluciones se pueden fusionar eficientemente (`Merge Sort`, `Count of Smaller Numbers After Self`, `Merge K Sorted Lists`).",
      "Construcción recursiva de árboles o estructuras geométricas a partir de mitades (`Convert Sorted Array to BST`, `Construct Quad Tree`).",
    ],
    whenNotToUse: [
      "Si los subproblemas NO son independientes sino que se repiten una y otra vez calculando lo mismo (subproblemas superpuestos): ahí Divide & Conquer puro se vuelve exponencial y necesitas Memoization / Dynamic Programming.",
    ],
    timeComplexity: {
      average: "O(N log N) cuando partes en 2 mitades y combinas en O(N)",
      worst: "O(N log N)",
      note: "Árbol de recursión de altura `log₂ N` donde cada nivel realiza `O(N)` trabajo total.",
    },
    spaceComplexity: "O(N) auxiliar en Merge Sort + O(log N) pila de recursión",
    constraintHint: "Partición recursiva con N ≤ 10⁵ logrando O(N log N)",
    pythonTemplate: `def merge_sort(nums: list[int]) -> list[int]:
    """
    Esqueleto canónico de Divide & Conquer (Merge Sort).
    1. Base case: len <= 1
    2. Divide: partir en mid
    3. Conquer: ordenar left y right recursivamente
    4. Combine: fusionar ambas mitades ordenadas en O(N)
    """
    if len(nums) <= 1:
        return nums

    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])

    # Combine (Merge step con dos punteros)
    merged: list[int] = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged`,
    typescriptTemplate: `export function mergeSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));

  const merged: number[] = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  while (i < left.length) merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);
  return merged;
}`,
    leetcodeProblems: [
      {
        number: 912,
        title: "Sort an Array",
        slug: "sort-an-array",
        difficulty: "Medium",
        patternHint: "Implementa Merge Sort garantizando O(N log N) en el peor caso.",
      },
      {
        number: 108,
        title: "Convert Sorted Array to Binary Search Tree",
        slug: "convert-sorted-array-to-binary-search-tree",
        difficulty: "Easy",
        patternHint: "El elemento central `mid` es la raíz; la mitad izquierda forma el subárbol izquierdo y la derecha el derecho.",
      },
      {
        number: 23,
        title: "Merge k Sorted Lists",
        slug: "merge-k-sorted-lists",
        difficulty: "Hard",
        patternHint: "Divide las K listas en dos mitades recursivamente y fusiónalas de par en par en O(N log K).",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica las 3 fases de Divide & Conquer (Dividir, Conquistar y Combinar) y visualiza el árbol de recursión de Merge Sort para demostrar por qué tiene `log₂ N` pisos y cada piso suma `N` operaciones, dando `O(N log N)`. Contrasta Divide & Conquer (subproblemas disjuntos) con Programación Dinámica (subproblemas repetidos).",
      keyTakeaways: [
        "Todo algoritmo recursivo necesita primero un Caso Base que detenga la recursión (`if len <= 1`).",
        "La magia de Merge Sort ocurre en el paso 'Combine': fusionar dos listas ya ordenadas cuesta solo O(N) con dos punteros.",
        "Incluso puedes contar inversiones en un arreglo durante el paso Merge en O(N log N).",
      ],
      stepByStepWalkthrough: [
        "Escribir el caso base para entradas de tamaño 0 o 1.",
        "Calcular el punto medio `mid` y hacer las llamadas recursivas para `[low..mid]` y `[mid+1..high]`.",
        "Combinar los resultados de los hijos en tiempo lineal respecto al tamaño del subproblema.",
      ],
      interviewTraps: [
        "Olvidar el caso base o partir un rango de tamaño 2 en `(0, 2)` y `(0, 0)`, provocando `RecursionError: maximum recursion depth exceeded`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Divide, Conquista y Combina: La mentalidad recursiva",
          visualCue: "Árbol dividiendo un arreglo de 8 números hasta hojas de 1 elemento y fusionándolas hacia arriba.",
          narration:
            "Antes de entrar a los Árboles Binarios, debemos entrenar el músculo de la recursión. Divide y Vencerás nos enseña a confiar en la función recursiva: divide el problema a la mitad, deja que la recursión resuelva cada mitad y concéntrate solo en cómo juntar ambas respuestas.",
        },
        {
          timestamp: "01:45 - 04:15",
          sectionTitle: "Por qué N niveles se convierten en log₂(N) niveles",
          visualCue: "Niveles horizontales del árbol donde cada piso suma exactamente N operaciones.",
          narration:
            "Cuando partes un problema a la mitad en cada paso, solo puedes partirlo log₂(N) veces antes de llegar a tamaño 1. Si en cada piso haces trabajo lineal O(N), el costo total es O(N log N).",
        },
      ],
    },
  },
  {
    id: "trees",
    order: 22,
    title: "Trees (Árboles Binarios y Recorridos)",
    shortTitle: "Binary Trees",
    englishTerm: "Binary Trees & Traversals (Pre/In/Post-Order)",
    kind: "data-structure",
    level: 4,
    difficulty: "Beginner",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["divide-and-conquer", "linked-list"],
    summary:
      "Estructura jerárquica sin ciclos donde cada nodo tiene un valor y hasta dos hijos (`left` y `right`). Como cada subárbol es a su vez un árbol binario, el 95% de sus problemas se resuelven con funciones recursivas elegantes de 5 líneas.",
    analogy:
      "El organigrama de una empresa o un árbol genealógico: el director general (Raíz / `root`) le pide un reporte a su gerente izquierdo y a su gerente derecho; cada gerente hace lo mismo con su equipo hasta llegar a los empleados sin gente a cargo (Hojas / `leaves`), y los resultados suben sumándose hasta la raíz.",
    whenToUse: [
      "Representar datos jerárquicos, expresiones sintácticas (AST), decisiones o estructuras recursivas.",
      "**Pre-order (`Raíz -> Izq -> Der`)**: Clonar o serializar un árbol de arriba hacia abajo.",
      "**In-order (`Izq -> Raíz -> Der`)**: Procesar un Árbol Binario de Búsqueda (BST) en orden ascendente.",
      "**Post-order (`Izq -> Der -> Raíz`)**: Calcular alturas, diámetros, sumas de subárboles o el Ancestro Común Más Bajo (LCA), donde necesitas las respuestas de ambos hijos antes de calcular la del padre.",
    ],
    whenNotToUse: [
      "Si el árbol está completamente degenerado en una línea recta (altura `H = N`) y el lenguaje tiene límite de recursión bajo, usa recorrido iterativo con pila o cola.",
    ],
    timeComplexity: {
      average: "Recorrido completo: O(N) visitando cada nodo 1 vez",
      worst: "O(N)",
      note: "El espacio en el Call Stack es O(H), donde H es la altura del árbol (O(log N) balanceado, O(N) degenerado).",
    },
    spaceComplexity: "O(H) altura del árbol en la pila de recursión",
    constraintHint: "Estructuras jerárquicas TreeNode con N ≤ 10⁵",
    pythonTemplate: `class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None):
        self.val = val
        self.left = left
        self.right = right


def max_depth_postorder(root: TreeNode | None) -> int:
    """
    Mentalidad Post-Order:
    1. Caso base: un árbol vacío tiene altura 0.
    2. Pide la altura al hijo izquierdo y al hijo derecho.
    3. Tu altura es 1 + max(izq, der).
    """
    if not root:
        return 0
    left_height = max_depth_postorder(root.left)
    right_height = max_depth_postorder(root.right)
    return 1 + max(left_height, right_height)`,
    typescriptTemplate: `export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    leetcodeProblems: [
      {
        number: 104,
        title: "Maximum Depth of Binary Tree",
        slug: "maximum-depth-of-binary-tree",
        difficulty: "Easy",
        patternHint: "Caso base `None -> 0`, paso recursivo `1 + max(depth(left), depth(right))`.",
      },
      {
        number: 226,
        title: "Invert Binary Tree",
        slug: "invert-binary-tree",
        difficulty: "Easy",
        patternHint: "Intercambia `root.left, root.right = invert(root.right), invert(root.left)`.",
      },
      {
        number: 543,
        title: "Diameter of Binary Tree",
        slug: "diameter-of-binary-tree",
        difficulty: "Easy",
        patternHint: "En cada nodo, el camino más largo que pasa por él como pico es `left_height + right_height`, mientras retornas hacia arriba `1 + max(left_height, right_height)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Enseña a pensar en Árboles Binarios desde la perspectiva de UN SOLO NODO: '¿Qué información necesito pasarle a mis hijos hacia abajo (Pre-order) o qué información necesito que mis hijos me devuelvan hacia arriba (Post-order)?'. Explica con 'Diameter of Binary Tree' cómo actualizar una respuesta global mientras retornas la altura hacia el padre.",
      keyTakeaways: [
        "No intentes rastrear en tu cabeza toda la recursión del árbol completo: enfócate solo en la relación entre `root`, `root.left` y `root.right`.",
        "Pre-Order pasa información de padres a hijos (Top-Down); Post-Order agrega información de hijos a padres (Bottom-Up).",
        "Un árbol binario de N nodos siempre tiene exactamente `N - 1` aristas.",
      ],
      stepByStepWalkthrough: [
        "Definir qué significa el caso base `if not root:` (normalmente devuelve `0`, `None` o `True`).",
        "Decidir qué valor debe retornar la función recursiva al padre.",
        "Combinar `left_res` y `right_res` con `root.val`.",
      ],
      interviewTraps: [
        "En problemas como `Diameter of Binary Tree` o `Binary Tree Maximum Path Sum`, confundir el camino que 'hace curva en el nodo actual' (`left + right`, que actualiza el máximo global) con el camino que 'puede seguir subiendo hacia el padre' (`max(left, right)`, que solo puede elegir una rama).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "La definición recursiva de un Árbol Binario",
          visualCue: "Árbol binario donde cada hijo se enmarca mostrando que es un árbol idéntico más pequeño.",
          narration:
            "Los árboles binarios parecen intimidantes hasta que descubres un secreto: no tienes que resolver todo el árbol. Solo tienes que resolver un nodo suponiendo que tus hijos izquierdo y derecho ya hicieron su trabajo.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Pre-Order, In-Order y Post-Order: Cuándo usar cada uno",
          visualCue: "Un cursor rodeando el contorno del árbol marcando la primera visita (Pre), visita inferior (In) y última visita (Post).",
          narration:
            "Pre-order, In-order y Post-order no son tres algoritmos distintos: son el mismo recorrido visto en tres momentos diferentes: al llegar al nodo, al pasar entre sus dos hijos y antes de despedirte hacia arriba.",
        },
      ],
    },
  },
  {
    id: "bst",
    order: 23,
    title: "Binary Search Trees (Árboles Binarios de Búsqueda - BST)",
    shortTitle: "BST",
    englishTerm: "Binary Search Trees (BST)",
    kind: "data-structure",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["trees", "binary-search"],
    summary:
      "Un árbol binario con una ley de orden global: TODOS los nodos del subárbol izquierdo son estrictamente menores que la raíz, y TODOS los del subárbol derecho son estrictamente mayores. Permite buscar, insertar y borrar en O(log N) cuando está balanceado.",
    analogy:
      "Un árbol de decisiones donde cada puerta tiene un cartel numérico: si buscas el número 42 y estás en la puerta 50, ni siquiera miras el pasillo derecho porque sabes con certeza que todo a la derecha es mayor que 50; giras a la izquierda descartando la mitad del edificio.",
    whenToUse: [
      "Buscar, insertar o encontrar el ancestro común (`LCA`) aprovechando la propiedad de orden `left < root < right` en O(H).",
      "Obtener los elementos ordenados de menor a mayor o hallar el `K-th Smallest Element` mediante un recorrido **In-Order (`Izq -> Raíz -> Der`)**.",
    ],
    whenNotToUse: [
      "Si insertas elementos ya ordenados (`1, 2, 3, 4, 5`) en un BST simple sin auto-balanceo, se degenera en una lista enlazada con altura `O(N)`.",
    ],
    timeComplexity: {
      average: "Búsqueda / Inserción / Borrado: O(log N) en BST balanceado",
      worst: "O(H) donde H es la altura (hasta O(N) si no está balanceado)",
      note: "Un recorrido In-Order de cualquier BST válido produce un arreglo estrictamente creciente.",
    },
    spaceComplexity: "O(H) pila de recursión (O(1) si se navega iterativamente)",
    constraintHint: "Árbol con propiedad left < node < right o búsquedas por rango en árbol",
    pythonTemplate: `def is_valid_bst(root, low: float = float("-inf"), high: float = float("inf")) -> bool:
    """
    Validación de BST propagando el rango permitido (low, high) hacia abajo.
    ¡No basta comparar solo con el padre inmediato!
    """
    if not root:
        return True
    if not (low < root.val < high):
        return False
    return (
        is_valid_bst(root.left, low, root.val)
        and is_valid_bst(root.right, root.val, high)
    )


def search_bst_iterative(root, target: int):
    """
    Búsqueda en O(H) tiempo y O(1) espacio descartando la mitad en cada paso.
    """
    curr = root
    while curr:
        if target == curr.val:
            return curr
        curr = curr.left if target < curr.val else curr.right
    return None`,
    typescriptTemplate: `import { TreeNode } from "./trees";

export function isValidBST(
  root: TreeNode | null,
  low = -Infinity,
  high = Infinity
): boolean {
  if (root === null) return true;
  if (root.val <= low || root.val >= high) return false;
  return (
    isValidBST(root.left, low, root.val) &&
    isValidBST(root.right, root.val, high)
  );
}`,
    leetcodeProblems: [
      {
        number: 98,
        title: "Validate Binary Search Tree",
        slug: "validate-binary-search-tree",
        difficulty: "Medium",
        patternHint: "Propaga el intervalo abierto `(min_val, max_val)` hacia los hijos o verifica que el recorrido In-Order sea estrictamente creciente.",
      },
      {
        number: 230,
        title: "Kth Smallest Element in a BST",
        slug: "kth-smallest-element-in-a-bst",
        difficulty: "Medium",
        patternHint: "Recorrido In-Order (`Izq -> Raíz -> Der`) deteniéndote en el K-ésimo nodo visitado.",
      },
      {
        number: 235,
        title: "Lowest Common Ancestor of a Binary Search Tree",
        slug: "lowest-common-ancestor-of-a-binary-search-tree",
        difficulty: "Medium",
        patternHint: "Si ambos `p` y `q` son menores que `curr`, baja a la izquierda; si ambos son mayores, baja a la derecha; el primer punto donde se separan es el LCA.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo un BST combina la búsqueda rápida de Binary Search con la inserción flexible de una Linked List. Haz énfasis en las 2 grandes lecciones de entrevistas sobre BST: 1) La trampa de 'Validate BST' (por qué comparar solo `node.left.val < node.val` está mal y debes propagar el rango `(low, high)`), y 2) Que el recorrido In-Order aplana cualquier BST en una lista ordenada.",
      keyTakeaways: [
        "Invariante global del BST: TODO el subárbol izquierdo debe ser `< root.val`, no solo el hijo izquierdo directo.",
        "El recorrido In-Order (`Izq -> Raíz -> Der`) de un BST visita los valores en orden ascendente perfecto.",
        "En un BST, navegar hacia un objetivo es idéntico a Binary Search y se puede hacer en O(1) espacio con un simple bucle `while curr:`.",
      ],
      stepByStepWalkthrough: [
        "Si necesitas buscar un valor o el LCA de dos nodos, compara con `curr.val` para elegir si bajar por `curr.left` o `curr.right`.",
        "Si necesitas validar el BST, pasa `(low, high)` en la recursión actualizando el tope superior al ir a la izquierda y el inferior al ir a la derecha.",
        "Si el problema habla de 'el K-ésimo menor' o 'la diferencia mínima entre valores', piensa inmediatamente en In-Order.",
      ],
      interviewTraps: [
        "En `Validate BST`, verificar únicamente `root.left.val < root.val < root.right.val`: falla cuando un nieto a la izquierda de la derecha es menor que la raíz principal.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Binary Search convertido en Árbol: El invariante del BST",
          visualCue: "Un arreglo ordenado elevándose por su punto medio hasta formar un BST balanceado.",
          narration:
            "¿Qué pasaría si conviertes cada decisión de Binary Search en un nodo físico con punteros? Obtienes un Binary Search Tree. En cada nodo, todo lo menor vive a la izquierda y todo lo mayor vive a la derecha.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "La trampa clásica de Validate BST y el poder del In-Order",
          visualCue: "Un nodo nieto violando el límite de su abuelo, detectado por el intervalo `(low, high)`.",
          narration:
            "Cuidado con la trampa favorita de los entrevistadores: para que un árbol sea un BST válido, no basta que cada hijo cumpla con su padre directo; debe respetar el rango heredado de todos sus ancestros.",
        },
      ],
    },
  },
  {
    id: "dfs",
    order: 24,
    title: "DFS - Depth-First Search (Búsqueda en Profundidad)",
    shortTitle: "DFS",
    englishTerm: "Depth-First Search (Trees, Grids & Graphs)",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["trees", "matrices-grids", "stacks"],
    summary:
      "Explorar un camino hasta llegar lo más profundo posible antes de retroceder y probar otra bifurcación. Es el algoritmo estándar para contar componentes conexas (islas), verificar conectividad, detectar ciclos y recorrer árboles.",
    analogy:
      "Explorar un laberinto con un ovillo de hilo (como Teseo y el Minotauro): avanzas siempre por el primer pasillo disponible hasta topar con una pared sin salida; entonces rebobinas el hilo hasta la última intersección que tenía una puerta sin explorar y entras por ahí.",
    whenToUse: [
      "Recorrer todos los nodos de un árbol, cuadrícula 2D o grafo para contar componentes conexas (`Number of Islands`, `Max Area of Island`).",
      "Verificar si existe algún camino de `A` a `B`, clonar un grafo o detectar ciclos.",
      "Calcular propiedades de subárboles o caminos de la raíz a las hojas (`Path Sum`).",
    ],
    whenNotToUse: [
      "Cuando necesitas encontrar el **camino MÁS CORTO** en un grafo o cuadrícula sin pesos: DFS puede encontrar primero un camino larguísimo que da mil vueltas; para camino más corto sin pesos usa siempre **BFS**.",
    ],
    timeComplexity: {
      average: "O(V + E) en grafos | O(R × C) en cuadrículas",
      worst: "O(V + E)",
      note: "Con un conjunto `visited`, cada nodo y arista se procesa una constante de veces.",
    },
    spaceComplexity: "O(V) para el conjunto `visited` y la pila de recursión",
    constraintHint: "Islas, componentes conexas, caminos en árboles/grafos con V, E ≤ 10⁵",
    pythonTemplate: `def num_islands_dfs(grid: list[list[str]]) -> int:
    """
    Plantilla Clásica de DFS en Cuadrícula 2D (Flood Fill / Hundir Islas).
    Tiempo: O(R * C) | Espacio: O(R * C) en call stack
    """
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])

    def dfs(r: int, c: int) -> None:
        # Caso base: fuera de límites o ya es agua ('0')
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == "0":
            return
        # Marcamos como visitado convirtiendo tierra '1' en agua '0'
        grid[r][c] = "0"
        for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            dfs(r + dr, c + dc)

    islands = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                islands += 1
                dfs(r, c)
    return islands`,
    typescriptTemplate: `export function numIslandsDFS(grid: string[][]): number {
  if (grid.length === 0) return 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") {
      return;
    }
    grid[r][c] = "0"; // Marcar como visitado
    dfs(r - 1, c);
    dfs(r + 1, c);
    dfs(r, c - 1);
    dfs(r, c + 1);
  }

  let islands = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        islands++;
        dfs(r, c);
      }
    }
  }
  return islands;
}`,
    leetcodeProblems: [
      {
        number: 200,
        title: "Number of Islands",
        slug: "number-of-islands",
        difficulty: "Medium",
        patternHint: "Recorre la matriz; al ver un `'1'`, suma 1 isla y lanza DFS para 'hundir' toda la tierra conectada.",
      },
      {
        number: 695,
        title: "Max Area of Island",
        slug: "max-area-of-island",
        difficulty: "Medium",
        patternHint: "Haz que `dfs(r, c)` retorne `1 + suma(dfs de los 4 vecinos)`.",
      },
      {
        number: 133,
        title: "Clone Graph",
        slug: "clone-graph",
        difficulty: "Medium",
        patternHint: "Usa un diccionario `{nodo_original: nodo_clonado}` que actúa a la vez como `visited` y mapa de copias.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo funciona DFS tanto en Árboles (donde no hace falta `visited` porque no hay ciclos) como en Grafos y Grids 2D (donde marcar `visited` ANTES de explorar vecinos es obligatorio para no caer en un bucle infinito). Usa el ejemplo visual de 'Number of Islands' (Flood Fill).",
      keyTakeaways: [
        "En árboles no hay ciclos, pero en Grafos y Matrices 2D SIEMPRE debes marcar el nodo como visitado apenas entras a `dfs(u)`.",
        "DFS es más corto de programar que BFS porque usa la propia recursión del lenguaje como pila.",
        "Para contar el tamaño de una región, haz que `dfs` devuelva `1 + sum(dfs(vecino))`.",
      ],
      stepByStepWalkthrough: [
        "Verificar primero el caso base (fuera de límites, obstáculo o nodo ya visitado).",
        "Marcar inmediatamente el nodo actual como visitado (`visited.add(u)` o `grid[r][c] = '0'`).",
        "Iterar sobre todos los vecinos y llamar recursivamente a `dfs(vecino)`.",
      ],
      interviewTraps: [
        "Olvidar marcar un nodo como visitado en un grafo con ciclos, provocando `Maximum Call Stack Size Exceeded` en milisegundos.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Teseo en el laberinto: Cómo piensa Depth-First Search",
          visualCue: "Un rastro de luz penetrando hasta el fondo de una rama antes de retroceder.",
          narration:
            "Depth-First Search tiene una personalidad decidida: elige una dirección y avanza sin detenerse hasta tocar fondo. Solo cuando ya no puede avanzar más, da un paso atrás y prueba la siguiente puerta.",
        },
        {
          timestamp: "01:45 - 04:30",
          sectionTitle: "Flood Fill en Matrices: Hundiendo islas en O(R × C)",
          visualCue: "Mapa de 1s y 0s donde tocar un 1 propaga una onda que apaga toda la isla conectada.",
          narration:
            "En 'Number of Islands', cada vez que encontramos una celda de tierra sumamos una isla al contador y lanzamos DFS como un bote de pintura que marca toda esa isla como visitada para no contarla dos veces.",
        },
      ],
    },
  },
  {
    id: "bfs",
    order: 25,
    title: "BFS - Breadth-First Search (Búsqueda en Anchura)",
    shortTitle: "BFS",
    englishTerm: "Breadth-First Search (Level Order & Shortest Path)",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["queues-deques", "trees", "matrices-grids"],
    summary:
      "Explorar por capas concéntricas (primero todos los nodos a distancia 1, luego todos los de distancia 2, luego distancia 3...) usando una Cola FIFO (`deque`). Garantiza encontrar el **camino más corto** en cualquier grafo o tablero sin pesos.",
    analogy:
      "Dejar caer una piedra en un estanque tranquilo: la onda circular se expande uniformemente en todas direcciones a la misma velocidad. El primer instante en que la onda toca la orilla destino es, por ley física, el camino más corto posible.",
    whenToUse: [
      "Encontrar la **distancia mínima** o el **menor número de pasos/movimientos** desde un origen hasta un destino en un grafo o matriz sin pesos (`Shortest Path in Binary Matrix`, `Word Ladder`).",
      "Recorrer un árbol binario nivel por nivel (`Binary Tree Level Order Traversal`, `Right Side View`).",
      "**Multi-Source BFS**: Cuando el fenómeno se propaga simultáneamente desde MÚLTIPLES orígenes al mismo tiempo (`Rotting Oranges`, `01 Matrix`) — simplemente metes todos los orígenes iniciales en la cola en el segundo 0.",
    ],
    whenNotToUse: [
      "Si las aristas tienen PESOS DISTINTOS (ej. calles con peajes de costo 1, 5, 20): BFS normal ya no garantiza el camino más barato; necesitas el **Algoritmo de Dijkstra**.",
    ],
    timeComplexity: {
      average: "O(V + E) en grafos | O(R × C) en cuadrículas",
      worst: "O(V + E)",
      note: "Marcar `visited` en el instante de ENCOLAR (`append`) evita meter el mismo nodo duplicado múltiples veces en la cola.",
    },
    spaceComplexity: "O(V) para la cola `deque` y el conjunto `visited`",
    constraintHint: "'Mínimo número de pasos', 'Recorrido por niveles' o propagación simultánea",
    pythonTemplate: `from collections import deque

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

    return -1`,
    typescriptTemplate: `export function bfsLevelOrder(
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
}`,
    leetcodeProblems: [
      {
        number: 102,
        title: "Binary Tree Level Order Traversal",
        slug: "binary-tree-level-order-traversal",
        difficulty: "Medium",
        patternHint: "Usa `for _ in range(len(queue)):` para agrupar exactamente los nodos de cada piso.",
      },
      {
        number: 994,
        title: "Rotting Oranges",
        slug: "rotting-oranges",
        difficulty: "Medium",
        patternHint: "Multi-Source BFS: mete TODAS las naranjas podridas iniciales en la cola antes de empezar el `while`.",
      },
      {
        number: 127,
        title: "Word Ladder",
        slug: "word-ladder",
        difficulty: "Hard",
        patternHint: "Cada palabra es un nodo; dos palabras tienen arista si difieren en 1 sola letra. Busca el camino más corto con BFS.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Enfatiza las 3 joyas de BFS: 1) El patrón `for _ in range(len(queue)):` para procesar piso por piso y contar la distancia exacta, 2) La regla vital de marcar `visited` AL ENCOLAR (y no al sacar de la cola, lo cual causaría duplicados masivos y TLE), y 3) El patrón 'Multi-Source BFS' (`Rotting Oranges`) metiendo todos los focos iniciales en la cola en el minuto 0.",
      keyTakeaways: [
        "Si el problema dice 'mínimo número de pasos/movimientos' y cada paso cuesta 1, la respuesta inmediata en el Flowchart es BFS.",
        "El truco `level_size = len(queue)` toma una fotografía de cuántos nodos hay en la capa actual antes de que se mezclen con sus hijos.",
        "Marcar `visited.add(vecino)` justo antes de `queue.append(vecino)` es obligatorio para evitar que varios nodos encolen al mismo vecino repetidas veces.",
      ],
      stepByStepWalkthrough: [
        "Inicializar `queue = deque([origenes])` y `visited = set(origenes)`.",
        "Mientras la cola no esté vacía, medir `level_size = len(queue)` e iterar esa cantidad de veces.",
        "Para cada vecino válido no visitado, agregarlo a `visited` y luego a `queue`.",
        "Al terminar el bucle del nivel, incrementar `steps += 1`.",
      ],
      interviewTraps: [
        "Marcar `visited.add(u)` recién cuando haces `u = queue.popleft()`: en una cuadrícula, eso hace que la misma celda se agregue muchas veces a la cola desde distintos vecinos y explote la memoria y el tiempo.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "La onda en el estanque: Por qué BFS garantiza el camino más corto",
          visualCue: "Ondas concéntricas de distancia 1, 2, 3 expandiéndose desde el origen hasta tocar la meta.",
          narration:
            "Si necesitas el camino más corto en un laberinto donde cada paso vale uno, DFS es una mala idea porque puede irse por un pasillo larguísimo. BFS avanza como una ola circular: explora primero todo lo que está a 1 paso, luego todo lo que está a 2 pasos.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Multi-Source BFS y la Regla de Oro de `visited`",
          visualCue: "Múltiples naranjas podridas expandiendo ondas simultáneas en el minuto 1, 2 y 3.",
          narration:
            "¿Y qué pasa cuando tienes múltiples puntos de inicio al mismo tiempo, como en Rotting Oranges? No lances varios BFS separados: mete todos los orígenes juntos en la cola inicial y deja que las olas avancen sincronizadas.",
        },
      ],
    },
  },
  {
    id: "backtracking",
    order: 26,
    title: "Backtracking (Búsqueda Exhaustiva con Poda)",
    shortTitle: "Backtracking",
    englishTerm: "Backtracking (Subsets, Permutations & Pruning)",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["dfs", "trees"],
    summary:
      "Un DFS sobre un árbol de decisiones implícito que construye una solución paso a paso y sigue el mantra de 3 tiempos: **1) Elegir (`append`) -> 2) Explorar (`backtrack`) -> 3) Deshacer la elección (`pop`)**, podando de raíz las ramas que ya violan las reglas.",
    analogy:
      "Resolver un Sudoku con lápiz y borrador: escribes un 5 en una casilla (Elegir), intentas llenar las siguientes casillas (Explorar), y si llegas a una contradicción donde ningún número cabe, borras ese 5 (Deshacer / Backtrack) y pruebas con un 6.",
    whenToUse: [
      "El problema pide **GENERAR TODAS** las combinaciones, subconjuntos (`Subsets`), permutaciones (`Permutations`), particiones de palíndromos o tableros válidos (`N-Queens`, `Sudoku Solver`).",
      "Las restricciones son pequeñas (`N ≤ 15` o `N ≤ 20`), señal inequívoca de complejidad exponencial $O(2^N)$ u $O(N!)$.",
    ],
    whenNotToUse: [
      "Si el problema NO pide listar todas las configuraciones sino solo **CONTAR cuántas hay** o **hallar el valor máximo/mínimo** con `N ≥ 100`: ahí no enumeres una por una con Backtracking; usa **Dynamic Programming**.",
    ],
    timeComplexity: {
      average: "Subconjuntos: O(N · 2ᴺ) | Permutaciones: O(N · N!)",
      worst: "Exponencial o Factorial (reducido drásticamente en la práctica gracias a la Poda / Pruning)",
      note: "Al guardar un resultado en `res`, debes guardar una COPIA (`path[:]`), nunca la referencia a la misma lista mutable.",
    },
    spaceComplexity: "O(N) profundidad de la pila de recursión y de la lista `path` actual",
    constraintHint: "'Return all possible...' con N ≤ 20",
    pythonTemplate: `def subsets_backtracking(nums: list[int]) -> list[list[int]]:
    """
    Plantilla Universal de Backtracking: Elegir -> Explorar -> Deshacer.
    Genera los 2^N subconjuntos de 'nums'.
    """
    res: list[list[int]] = []
    path: list[int] = []

    def backtrack(start_idx: int) -> None:
        # 1. Guardar una COPIA de la configuración actual
        res.append(path[:])

        # 2. Probar cada candidato disponible desde start_idx
        for i in range(start_idx, len(nums)):
            path.append(nums[i])      # A) ELEGIR (Choose)
            backtrack(i + 1)          # B) EXPLORAR (Explore)
            path.pop()                # C) DESHACER (Unchoose / Backtrack)

    backtrack(0)
    return res`,
    typescriptTemplate: `export function subsetsBacktracking(nums: number[]): number[][] {
  const res: number[][] = [];
  const path: number[] = [];

  function backtrack(startIdx: number): void {
    res.push([...path]); // Copia de la solución actual

    for (let i = startIdx; i < nums.length; i++) {
      path.push(nums[i]);     // 1. Elegir
      backtrack(i + 1);       // 2. Explorar
      path.pop();             // 3. Deshacer
    }
  }

  backtrack(0);
  return res;
}`,
    leetcodeProblems: [
      {
        number: 78,
        title: "Subsets",
        slug: "subsets",
        difficulty: "Medium",
        patternHint: "En cada nodo del árbol guarda `path[:]` y explora candidatos con índice `i >= start_idx`.",
      },
      {
        number: 46,
        title: "Permutations",
        slug: "permutations",
        difficulty: "Medium",
        patternHint: "El orden sí importa: itera sobre todos los elementos usando un conjunto/arreglo `used` para no repetir el mismo índice.",
      },
      {
        number: 39,
        title: "Combination Sum",
        slug: "combination-sum",
        difficulty: "Medium",
        patternHint: "Como puedes reutilizar el mismo número, llama a `backtrack(i, rem - nums[i])` sin sumar 1 al índice `i`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Enseña el mantra de los 3 pasos del Backtracking ('Elegir, Explorar, Deshacer') y muestra cómo la misma plantilla resuelve los 3 grandes problemas cambiando una sola línea: 1) Subsets (`backtrack(i + 1)`), 2) Combination Sum con repetición (`backtrack(i)`), y 3) Permutations (usando un arreglo `used[i]`). Advierte sobre el bug clásico de hacer `res.append(path)` sin copiar `path[:]`.",
      keyTakeaways: [
        "El mantra del Backtracking: `path.append(x)` -> `backtrack(...)` -> `path.pop()`.",
        "Diferencia clave: en Combinaciones/Subconjuntos el orden NO importa (usamos `start_idx` para mirar solo hacia adelante); en Permutaciones el orden SÍ importa (miramos desde 0 usando un marcador `used`).",
        "La Poda (Pruning) corta una rama entera antes de entrar en ella si la suma ya se pasó del objetivo o una reina ya es atacada.",
      ],
      stepByStepWalkthrough: [
        "Definir el estado parcial `path` que se modifica in-place a medida que bajamos y subimos por el árbol.",
        "En el caso base (cuando `path` es una solución completa), hacer `res.append(path[:])`.",
        "En el bucle de opciones, verificar si la opción es válida (Poda), hacer `append`, llamar recursivamente y hacer `pop`.",
      ],
      interviewTraps: [
        "Hacer `res.append(path)` en vez de `res.append(path[:])` (o `[...path]` en JS): como `path` se vacía al final con `pop()`, terminarás con una lista llena de listas vacías `[[], [], []]`.",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Elegir, Explorar y Deshacer: El ritmo del Backtracking",
          visualCue: "Árbol de decisiones donde una lista `path` agrega un elemento al bajar y hace `pop()` al subir.",
          narration:
            "Cuando el problema te pide encontrar TODAS las combinaciones o permutaciones posibles, estás ante un árbol de decisiones. Backtracking recorre ese árbol usando una sola lista compartida gracias a su ritmo de tres pasos: elegir, explorar y deshacer.",
        },
        {
          timestamp: "01:45 - 04:45",
          sectionTitle: "Subsets vs Combination Sum vs Permutations y el bug de `path[:]`",
          visualCue: "Tres bloques de código casi idénticos resaltando la única línea que cambia entre los tres.",
          narration:
            "No necesitas aprender veinte códigos distintos. Si entiendes la diferencia entre avanzar con `start_idx` para combinaciones y usar un booleano `used` para permutaciones, dominas toda la familia.",
        },
      ],
    },
  },
  {
    id: "heaps",
    order: 27,
    title: "Heaps / Priority Queues (Montículos y Colas de Prioridad)",
    shortTitle: "Heaps (Priority Queue)",
    englishTerm: "Binary Heaps & Priority Queues",
    kind: "data-structure",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["arrays", "trees"],
    summary:
      "Un árbol binario casi completo almacenado de forma compacta dentro de un Array (sin punteros) donde cada padre es menor o igual que sus hijos (`Min-Heap`) o mayor o igual (`Max-Heap`). Permite consultar el mínimo/máximo en O(1) e insertar o extraer el extremo en O(log N).",
    analogy:
      "La sala de urgencias de un hospital (Triage): no atienden por orden de llegada como en el banco, sino que siempre pasa primero el paciente con mayor urgencia (`pop` en O(log N)), sin importar si acaba de entrar hace un minuto (`push` en O(log N)).",
    whenToUse: [
      "Necesitas consultar y extraer repetidamente el elemento **MÍNIMO** o **MÁXIMO** de una colección dinámica que sigue recibiendo nuevos elementos.",
      "Simular eventos ordenados por su timestamp más próximo o elegir siempre la tarea más prioritaria.",
      "Motor interno del algoritmo de Dijkstra, Prim MST y codificación de Huffman.",
    ],
    whenNotToUse: [
      "Si el conjunto de datos es estático y solo necesitas el mínimo una sola vez (usa `min(nums)` en O(N)).",
      "Si necesitas buscar un elemento arbitrario de en medio: un Heap solo garantiza acceso instantáneo a la cima `heap[0]`, no es un BST completo.",
    ],
    timeComplexity: {
      average: "Peek (`heap[0]`): O(1) | Push / Pop: O(log N) | `heapify(lista)`: O(N)",
      worst: "Push / Pop: O(log N)",
      note: "¡Convertir una lista existente en un Heap con `heapq.heapify(nums)` toma O(N) lineal, NO O(N log N)!",
    },
    spaceComplexity: "O(N) almacenado en un arreglo contiguo",
    constraintHint: "Extracción continua del mínimo/máximo con N ≤ 10⁵",
    pythonTemplate: `import heapq

def heap_fundamentals_demo(nums: list[int]) -> tuple[int, int]:
    """
    En Python, 'heapq' implementa un MIN-HEAP sobre una lista normal.
    TRUCO PARA MAX-HEAP: Guardar los números con signo NEGATIVO (-x).
    """
    # 1. Min-Heap: convertir lista en heap en tiempo lineal O(N)
    min_heap = nums[:]
    heapq.heapify(min_heap)
    heapq.heappush(min_heap, 5)          # O(log N)
    smallest = heapq.heappop(min_heap)   # O(log N)

    # 2. Max-Heap: multiplicamos por -1 al insertar y al extraer
    max_heap = [-x for x in nums]
    heapq.heapify(max_heap)
    heapq.heappush(max_heap, -5)
    largest = -heapq.heappop(max_heap)

    return smallest, largest`,
    typescriptTemplate: `export class MinHeap {
  private data: number[] = [];

  get size(): number {
    return this.data.length;
  }

  peek(): number | undefined {
    return this.data[0];
  }

  push(val: number): void {
    this.data.push(val);
    this.siftUp(this.data.length - 1);
  }

  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  private siftUp(i: number): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }

  private siftDown(i: number): void {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n && this.data[l] < this.data[smallest]) smallest = l;
      if (r < n && this.data[r] < this.data[smallest]) smallest = r;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}`,
    leetcodeProblems: [
      {
        number: 1046,
        title: "Last Stone Weight",
        slug: "last-stone-weight",
        difficulty: "Easy",
        patternHint: "Usa un Max-Heap (negando los valores en `heapq`) para sacar siempre las 2 piedras más pesadas en O(log N).",
      },
      {
        number: 703,
        title: "Kth Largest Element in a Stream",
        slug: "kth-largest-element-in-a-stream",
        difficulty: "Easy",
        patternHint: "Mantén un Min-Heap de tamaño fijo `K`: la raíz `heap[0]` siempre será el K-ésimo más grande.",
      },
      {
        number: 621,
        title: "Task Scheduler",
        slug: "task-scheduler",
        difficulty: "Medium",
        patternHint: "Max-Heap con las frecuencias restantes + una cola de enfriamiento `(frecuencia, tiempo_disponible)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica cómo un Heap logra representar un árbol binario dentro de un simple Array sin gastar memoria en punteros (`left = 2*i + 1`, `right = 2*i + 2`, `parent = (i - 1) // 2`). Enseña por qué `heapify` toma O(N) y el truco indispensable en Python: cómo convertir el Min-Heap de `heapq` en un Max-Heap multiplicando los números por `-1`.",
      keyTakeaways: [
        "Un Heap NO está completamente ordenado: solo garantiza que cada padre domina a sus dos hijos y que el extremo global está en `heap[0]`.",
        "En Python, `heapq` es siempre un Min-Heap; para simular un Max-Heap guarda `-valor` o tuplas `(-prioridad, item)`.",
        "`heapq.heapify(arr)` construye el montículo de abajo hacia arriba en tiempo O(N) lineal.",
      ],
      stepByStepWalkthrough: [
        "Decidir si necesitas extraer repetidamente el menor (Min-Heap) o el mayor (Max-Heap con `-x`).",
        "Si partes de una lista inicial, usar `heapq.heapify(lista)` en O(N).",
        "Usar `heappop` y `heappush` para mantener la invariante en O(log N) por operación.",
      ],
      interviewTraps: [
        "Llamar a `nums.sort()` dentro de un bucle cada vez que se inserta un elemento nuevo (cuesta O(N² log N)) en lugar de usar un Heap (O(N log N)).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 01:45",
          sectionTitle: "Un árbol escondido dentro de un Array",
          visualCue: "Árbol binario mapeando sus nodos directamente a las casillas 0..N-1 de un arreglo con `2i+1` y `2i+2`.",
          narration:
            "¿Y si te dijera que el Heap es un árbol binario que no usa ni un solo objeto nodo ni punteros? Como se llena de izquierda a derecha sin huecos, los hijos del índice `i` viven matemáticamente en `2i + 1` y `2i + 2`.",
        },
        {
          timestamp: "01:45 - 04:15",
          sectionTitle: "Sift-Up, Sift-Down y el truco del signo negativo en Python",
          visualCue: "Un elemento nuevo subiendo por el árbol en `log N` saltos y ejemplo de Max-Heap con `-x`.",
          narration:
            "Mantener todo un arreglo ordenado cuando entran y salen datos es carísimo. Pero si solo te importa quién va ganando en la cima, un Heap reacomoda una rama de altura log(N) en un parpadeo.",
        },
      ],
    },
  },
  {
    id: "heap-sorting",
    order: 28,
    title: "Heap Patterns (Top-K, K-Way Merge, Two Heaps & Heap Sort)",
    shortTitle: "Heap Patterns & Top-K",
    englishTerm: "Heap Sort, Top-K, K-Way Merge & Two Heaps",
    kind: "algorithm",
    level: 4,
    difficulty: "Intermediate",
    branchCategory: "trees-heaps-backtracking",
    prerequisites: ["heaps", "sorting-intervals"],
    summary:
      "Los 4 patrones algorítmicos construidos sobre Heaps: 1) **Top-K Elements** (usar un Min-Heap de tamaño `K` para quedarte con los `K` más grandes en O(N log K)), 2) **K-Way Merge** (fusionar `K` listas ordenadas), 3) **Two Heaps** (Max-Heap + Min-Heap para calcular la mediana en vivo), y 4) **Heap Sort**.",
    analogy:
      "Para quedarte con los 3 atletas más rápidos de una maratón de 100,000 corredores (Top-3), no necesitas una tarima para 100,000 personas: pon un podio con solo 3 sillas (un Min-Heap de tamaño 3). Cada vez que llega alguien más rápido que el peor de los 3 sentados en el podio, ese peor cede su silla. Al final quedan exactamente los 3 mejores.",
    whenToUse: [
      "**Patrón Top-K**: 'Encuentra los K elementos más grandes / más pequeños / más cercanos / más frecuentes' en O(N log K) tiempo y O(K) memoria.",
      "**Patrón K-Way Merge**: Fusionar `K` listas o arreglos ordenados o hallar el K-ésimo menor en una matriz ordenada.",
      "**Patrón Two Heaps**: Mantener la **Mediana** de un flujo de datos en tiempo real (un `Max-Heap` para la mitad inferior y un `Min-Heap` para la mitad superior).",
    ],
    whenNotToUse: [
      "Nunca confundas qué Heap usar para Top-K: para conservar los K MÁS GRANDES necesitas un **MIN-HEAP** de tamaño K (para expulsar rápidamente al más pequeño cuando el tamaño supera K).",
    ],
    timeComplexity: {
      average: "Top-K: O(N log K) | Two Heaps insert: O(log N), median: O(1) | Heap Sort: O(N log N)",
      worst: "O(N log K) o O(N log N)",
      note: "Cuando K es pequeño frente a N, O(N log K) es mucho más rápido y usa mucha menos memoria que ordenar todo en O(N log N).",
    },
    spaceComplexity: "O(K) en Top-K y K-Way Merge | O(1) en Heap Sort in-place",
    constraintHint: "'Top K', 'K closest', 'Merge K sorted' o 'Median from Data Stream'",
    pythonTemplate: `import heapq

def find_k_largest_with_min_heap(nums: list[int], k: int) -> list[int]:
    """
    Patrón 1: Top-K Más Grandes usando un MIN-HEAP de tamaño K.
    Tiempo: O(N log K) | Espacio: O(K)
    """
    min_heap: list[int] = []
    for x in nums:
        heapq.heappush(min_heap, x)
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Expulsamos al menor de los K+1
    return min_heap


class MedianFinderTwoHeaps:
    """
    Patrón 2: Two Heaps para Mediana en Streaming.
    small_half: Max-Heap (valores negados) con la mitad menor de los datos.
    large_half: Min-Heap con la mitad mayor de los datos.
    """
    def __init__(self):
        self.small: list[int] = []  # Max-Heap (negado)
        self.large: list[int] = []  # Min-Heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
    typescriptTemplate: `import { MinHeap } from "./heaps";

export function findKLargest(nums: number[], k: number): number {
  const minHeap = new MinHeap();
  for (const x of nums) {
    minHeap.push(x);
    if (minHeap.size > k) {
      minHeap.pop(); // Expulsa el más pequeño para conservar los K más grandes
    }
  }
  return minHeap.peek()!;
}`,
    leetcodeProblems: [
      {
        number: 973,
        title: "K Closest Points to Origin",
        slug: "k-closest-points-to-origin",
        difficulty: "Medium",
        patternHint: "Para quedarte con los K MÁS PEQUEÑOS en distancia, usa un Max-Heap de tamaño K (`(-dist, x, y)`).",
      },
      {
        number: 295,
        title: "Find Median from Data Stream",
        slug: "find-median-from-data-stream",
        difficulty: "Hard",
        patternHint: "Two Heaps: un Max-Heap para la mitad izquierda y un Min-Heap para la mitad derecha balanceados en tamaño.",
      },
      {
        number: 373,
        title: "Find K Pairs with Smallest Sums",
        slug: "find-k-pairs-with-smallest-sums",
        difficulty: "Medium",
        patternHint: "K-Way Merge con un Min-Heap guardando `(nums1[i] + nums2[j], i, j)`.",
      },
    ],
    notebookLM: {
      customDirectionPrompt:
        "Explica la paradoja intuitiva de Top-K: por qué para quedarte con los K MÁS GRANDES usas un MIN-Heap (el portero de un club VIP de K sillas que solo mira quién es el menos importante sentado adentro para ver si el recién llegado lo supera), y para los K MÁS PEQUEÑOS usas un MAX-Heap. Luego explica la elegancia visual del patrón Two Heaps para calcular la mediana en tiempo real.",
      keyTakeaways: [
        "Regla invertida de Top-K: ¿Quieres los K mayores? Usa Min-Heap de tamaño K. ¿Quieres los K menores? Usa Max-Heap de tamaño K.",
        "En Two Heaps (`Find Median from Data Stream`), el tope del Max-Heap izquierdo y el tope del Min-Heap derecho abrazan exactamente el centro de los datos.",
        "K-Way Merge usa un Min-Heap con 1 representante de cada una de las K listas para extraer el menor global en O(log K).",
      ],
      stepByStepWalkthrough: [
        "Para Top-K: mantener un Heap de capacidad máxima `K`; cada vez que `len(heap) > K`, hacer `heappop`.",
        "Para Two Heaps: pasar cada número nuevo por `small` hacia `large` y luego reequilibrar tamaños para que `len(small)` sea igual o `1` mayor que `len(large)`.",
      ],
      interviewTraps: [
        "Meter los `N` elementos al Heap en vez de limitar su tamaño a `K`, perdiendo la ventaja de memoria O(K) y tiempo O(N log K).",
      ],
      narrativeBlocks: [
        {
          timestamp: "00:00 - 02:00",
          sectionTitle: "El secreto del Podio VIP: Por qué los K Mayores usan un Min-Heap",
          visualCue: "Un podio con 3 sillas donde el más bajo de los 3 está en la puerta listo para ser reemplazado.",
          narration:
            "Aquí viene una pregunta clásica con trampa: si quieres conservar los K números más grandes de un millón de datos, ¿usas un Max-Heap o un Min-Heap? Aunque suene al revés, usas un Min-Heap de tamaño K, porque a quien necesitas expulsar cada vez que entra alguien mejor es al más pequeño del grupo VIP.",
        },
        {
          timestamp: "02:00 - 05:00",
          sectionTitle: "Two Heaps: Encontrando la Mediana en vivo en O(1)",
          visualCue: "Dos triángulos enfrentados por sus puntas (Max-Heap abajo y Min-Heap arriba) mostrando la mediana justo en medio.",
          narration:
            "¿Cómo mantienes la mediana cuando llegan miles de números por segundo? Partes el universo en dos mitades: un Max-Heap para los números pequeños y un Min-Heap para los números grandes. Sus dos cimas te dan la mediana al instante.",
        },
      ],
    },
  },
];

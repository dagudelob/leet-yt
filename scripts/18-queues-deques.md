# 🎬 Episodio #18: Queues & Deques (Colas FIFO y Colas de Doble Extremo)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 3 — Estructura de Datos (`Beginner`)  
> **Término en Inglés (Flowchart):** `Queues (FIFO) & Double-Ended Queues (Deque)`  
> **Prerrequisitos Recomendados:** Arrays → Linked Lists

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica la filosofía FIFO (First-In, First-Out) y por qué la estructura `deque` (Double-Ended Queue) es la navaja suiza que puede actuar como Stack, como Queue y como ventana deslizante en O(1). Enseña también cómo funciona una Cola Circular sobre un arreglo fijo usando el operador módulo `% capacity`.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Queues & Deques", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Procesamiento por orden de llegada, buffers circulares o BFS) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Queues & Deques?
Colas First-In, First-Out (el primero en llegar es el primero en salir) y Deques (`collections.deque`) que permiten insertar y extraer tanto por la izquierda como por la derecha en tiempo constante O(1).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Una fila de personas en el banco (Queue FIFO): el primero que se formó en la fila es el primero al que atienden en la ventanilla. Una Deque es una fila VIP con puerta adelante y atrás que permite meter o sacar por ambos extremos al instante.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** FIFO procesa por orden de antigüedad o cercanía (por eso es la base de BFS para caminos más cortos).
2. **Idea Clave #2:** `collections.deque` en Python da `append`, `appendleft`, `pop` y `popleft` todos en O(1).
3. **Idea Clave #3:** En JavaScript/TypeScript no hay `deque` nativa en la librería estándar: usar un objeto con índices `head` y `tail` o un arreglo circular evita el costo O(N) de `Array.shift()`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Queues & Deques)
- ✅ Procesar eventos o tareas en orden estricto de llegada (ventana de tiempo reciente, buffer de streaming).
- ✅ Recorrer árboles o grafos nivel por nivel (motor fundamental de Breadth-First Search - BFS).
- ✅ Mantener ventanas deslizantes donde entran elementos por la derecha y salen por la izquierda en O(1).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ En Python, NUNCA uses `list.pop(0)` como cola porque cuesta O(N); importa siempre `from collections import deque` y usa `popleft()` en O(1).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Procesamiento por orden de llegada, buffers circulares o BFS`
- **Complejidad Temporal Promedio:** `append / appendleft / pop / popleft: O(1)`
- **Complejidad Temporal Peor Caso:** `O(1) en extremos`
- **Complejidad Espacial:** `O(N) para los elementos en espera`
- **Nota Técnica:** `collections.deque` está implementada en C como una lista doblemente enlazada de bloques.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Importar `from collections import deque`.
2. Encolar elementos nuevos por la derecha con `q.append(x)`.
3. Desencolar el elemento más antiguo por la izquierda con `q.popleft()`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Usar `Array.shift()` en JS o `list.pop(0)` en Python en una cola con 100,000 elementos, causando TLE.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
from collections import deque

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
        return len(self.q)
```

### Plantilla en TypeScript / JavaScript
```typescript
export class CircularDeque<T> {
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
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] FIFO vs LIFO: La justicia del orden de llegada
- **🎬 Visual en Pantalla / Slide:** Túnel donde los datos entran por la derecha y salen en el mismo orden por la izquierda.
- **🎙️ Narración / Guion:**
  > "Mientras la Pila atiende siempre al último en llegar, la Cola respeta el turno de llegada: el primero en entrar es el primero en salir. Es la estructura esencial para procesar eventos en tiempo real y explorar grafos por capas."

### ⏱️ [01:30 - 04:00] Deque y Colas Circulares: O(1) en ambos extremos
- **🎬 Visual en Pantalla / Slide:** Anillo circular con punteros head y tail avanzando con aritmética `% capacidad`.
- **🎙️ Narración / Guion:**
  > "Con una Deque o una Cola Circular obtienes inserciones y extracciones instantáneas tanto al frente como al final, preparando el terreno para dos de los algoritmos más potentes: BFS y Monotonic Queue."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#933. Number of Recent Calls** | `Easy` | [https://leetcode.com/problems/number-of-recent-calls/](https://leetcode.com/problems/number-of-recent-calls/) | Agrega `t` con `append` y elimina llamadas `< t - 3000` con `popleft()`. |
| **#622. Design Circular Queue** | `Medium` | [https://leetcode.com/problems/design-circular-queue/](https://leetcode.com/problems/design-circular-queue/) | Arreglo fijo de tamaño `K` con índices `(head + count) % K`. |
| **#225. Implement Stack using Queues** | `Easy` | [https://leetcode.com/problems/implement-stack-using-queues/](https://leetcode.com/problems/implement-stack-using-queues/) | Al insertar un elemento, rota los `N-1` anteriores detrás de él. |

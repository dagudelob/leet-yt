# 🎬 Episodio #27: Heaps / Priority Queues (Montículos y Colas de Prioridad)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 4 — Estructura de Datos (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Binary Heaps & Priority Queues`  
> **Prerrequisitos Recomendados:** Arrays → Binary Trees

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo un Heap logra representar un árbol binario dentro de un simple Array sin gastar memoria en punteros (`left = 2*i + 1`, `right = 2*i + 2`, `parent = (i - 1) // 2`). Enseña por qué `heapify` toma O(N) y el truco indispensable en Python: cómo convertir el Min-Heap de `heapq` en un Max-Heap multiplicando los números por `-1`.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Heaps (Priority Queue)", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Extracción continua del mínimo/máximo con N ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Heaps (Priority Queue)?
Un árbol binario casi completo almacenado de forma compacta dentro de un Array (sin punteros) donde cada padre es menor o igual que sus hijos (`Min-Heap`) o mayor o igual (`Max-Heap`). Permite consultar el mínimo/máximo en O(1) e insertar o extraer el extremo en O(log N).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** La sala de urgencias de un hospital (Triage): no atienden por orden de llegada como en el banco, sino que siempre pasa primero el paciente con mayor urgencia (`pop` en O(log N)), sin importar si acaba de entrar hace un minuto (`push` en O(log N)).

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Un Heap NO está completamente ordenado: solo garantiza que cada padre domina a sus dos hijos y que el extremo global está en `heap[0]`.
2. **Idea Clave #2:** En Python, `heapq` es siempre un Min-Heap; para simular un Max-Heap guarda `-valor` o tuplas `(-prioridad, item)`.
3. **Idea Clave #3:** `heapq.heapify(arr)` construye el montículo de abajo hacia arriba en tiempo O(N) lineal.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Heaps (Priority Queue))
- ✅ Necesitas consultar y extraer repetidamente el elemento **MÍNIMO** o **MÁXIMO** de una colección dinámica que sigue recibiendo nuevos elementos.
- ✅ Simular eventos ordenados por su timestamp más próximo o elegir siempre la tarea más prioritaria.
- ✅ Motor interno del algoritmo de Dijkstra, Prim MST y codificación de Huffman.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si el conjunto de datos es estático y solo necesitas el mínimo una sola vez (usa `min(nums)` en O(N)).
- ⚠️ Si necesitas buscar un elemento arbitrario de en medio: un Heap solo garantiza acceso instantáneo a la cima `heap[0]`, no es un BST completo.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Extracción continua del mínimo/máximo con N ≤ 10⁵`
- **Complejidad Temporal Promedio:** `Peek (`heap[0]`): O(1) | Push / Pop: O(log N) | `heapify(lista)`: O(N)`
- **Complejidad Temporal Peor Caso:** `Push / Pop: O(log N)`
- **Complejidad Espacial:** `O(N) almacenado en un arreglo contiguo`
- **Nota Técnica:** ¡Convertir una lista existente en un Heap con `heapq.heapify(nums)` toma O(N) lineal, NO O(N log N)!

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Decidir si necesitas extraer repetidamente el menor (Min-Heap) o el mayor (Max-Heap con `-x`).
2. Si partes de una lista inicial, usar `heapq.heapify(lista)` en O(N).
3. Usar `heappop` y `heappush` para mantener la invariante en O(log N) por operación.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Llamar a `nums.sort()` dentro de un bucle cada vez que se inserta un elemento nuevo (cuesta O(N² log N)) en lugar de usar un Heap (O(N log N)).

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
import heapq

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

    return smallest, largest
```

### Plantilla en TypeScript / JavaScript
```typescript
export class MinHeap {
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
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Un árbol escondido dentro de un Array
- **🎬 Visual en Pantalla / Slide:** Árbol binario mapeando sus nodos directamente a las casillas 0..N-1 de un arreglo con `2i+1` y `2i+2`.
- **🎙️ Narración / Guion:**
  > "¿Y si te dijera que el Heap es un árbol binario que no usa ni un solo objeto nodo ni punteros? Como se llena de izquierda a derecha sin huecos, los hijos del índice `i` viven matemáticamente en `2i + 1` y `2i + 2`."

### ⏱️ [01:45 - 04:15] Sift-Up, Sift-Down y el truco del signo negativo en Python
- **🎬 Visual en Pantalla / Slide:** Un elemento nuevo subiendo por el árbol en `log N` saltos y ejemplo de Max-Heap con `-x`.
- **🎙️ Narración / Guion:**
  > "Mantener todo un arreglo ordenado cuando entran y salen datos es carísimo. Pero si solo te importa quién va ganando en la cima, un Heap reacomoda una rama de altura log(N) en un parpadeo."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#1046. Last Stone Weight** | `Easy` | [https://leetcode.com/problems/last-stone-weight/](https://leetcode.com/problems/last-stone-weight/) | Usa un Max-Heap (negando los valores en `heapq`) para sacar siempre las 2 piedras más pesadas en O(log N). |
| **#703. Kth Largest Element in a Stream** | `Easy` | [https://leetcode.com/problems/kth-largest-element-in-a-stream/](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | Mantén un Min-Heap de tamaño fijo `K`: la raíz `heap[0]` siempre será el K-ésimo más grande. |
| **#621. Task Scheduler** | `Medium` | [https://leetcode.com/problems/task-scheduler/](https://leetcode.com/problems/task-scheduler/) | Max-Heap con las frecuencias restantes + una cola de enfriamiento `(frecuencia, tiempo_disponible)`. |

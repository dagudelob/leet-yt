# 🎬 Episodio #28: Heap Patterns (Top-K, K-Way Merge, Two Heaps & Heap Sort)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 4 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Heap Sort, Top-K, K-Way Merge & Two Heaps`  
> **Prerrequisitos Recomendados:** Heaps (Priority Queue) → Sorting + Intervals

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica la paradoja intuitiva de Top-K: por qué para quedarte con los K MÁS GRANDES usas un MIN-Heap (el portero de un club VIP de K sillas que solo mira quién es el menos importante sentado adentro para ver si el recién llegado lo supera), y para los K MÁS PEQUEÑOS usas un MAX-Heap. Luego explica la elegancia visual del patrón Two Heaps para calcular la mediana en tiempo real.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Heap Patterns & Top-K", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones ('Top K', 'K closest', 'Merge K sorted' o 'Median from Data Stream') para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Heap Patterns & Top-K?
Los 4 patrones algorítmicos construidos sobre Heaps: 1) **Top-K Elements** (usar un Min-Heap de tamaño `K` para quedarte con los `K` más grandes en O(N log K)), 2) **K-Way Merge** (fusionar `K` listas ordenadas), 3) **Two Heaps** (Max-Heap + Min-Heap para calcular la mediana en vivo), y 4) **Heap Sort**.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Para quedarte con los 3 atletas más rápidos de una maratón de 100,000 corredores (Top-3), no necesitas una tarima para 100,000 personas: pon un podio con solo 3 sillas (un Min-Heap de tamaño 3). Cada vez que llega alguien más rápido que el peor de los 3 sentados en el podio, ese peor cede su silla. Al final quedan exactamente los 3 mejores.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Regla invertida de Top-K: ¿Quieres los K mayores? Usa Min-Heap de tamaño K. ¿Quieres los K menores? Usa Max-Heap de tamaño K.
2. **Idea Clave #2:** En Two Heaps (`Find Median from Data Stream`), el tope del Max-Heap izquierdo y el tope del Min-Heap derecho abrazan exactamente el centro de los datos.
3. **Idea Clave #3:** K-Way Merge usa un Min-Heap con 1 representante de cada una de las K listas para extraer el menor global en O(log K).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Heap Patterns & Top-K)
- ✅ **Patrón Top-K**: 'Encuentra los K elementos más grandes / más pequeños / más cercanos / más frecuentes' en O(N log K) tiempo y O(K) memoria.
- ✅ **Patrón K-Way Merge**: Fusionar `K` listas o arreglos ordenados o hallar el K-ésimo menor en una matriz ordenada.
- ✅ **Patrón Two Heaps**: Mantener la **Mediana** de un flujo de datos en tiempo real (un `Max-Heap` para la mitad inferior y un `Min-Heap` para la mitad superior).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Nunca confundas qué Heap usar para Top-K: para conservar los K MÁS GRANDES necesitas un **MIN-HEAP** de tamaño K (para expulsar rápidamente al más pequeño cuando el tamaño supera K).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `'Top K', 'K closest', 'Merge K sorted' o 'Median from Data Stream'`
- **Complejidad Temporal Promedio:** `Top-K: O(N log K) | Two Heaps insert: O(log N), median: O(1) | Heap Sort: O(N log N)`
- **Complejidad Temporal Peor Caso:** `O(N log K) o O(N log N)`
- **Complejidad Espacial:** `O(K) en Top-K y K-Way Merge | O(1) en Heap Sort in-place`
- **Nota Técnica:** Cuando K es pequeño frente a N, O(N log K) es mucho más rápido y usa mucha menos memoria que ordenar todo en O(N log N).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Para Top-K: mantener un Heap de capacidad máxima `K`; cada vez que `len(heap) > K`, hacer `heappop`.
2. Para Two Heaps: pasar cada número nuevo por `small` hacia `large` y luego reequilibrar tamaños para que `len(small)` sea igual o `1` mayor que `len(large)`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Meter los `N` elementos al Heap en vez de limitar su tamaño a `K`, perdiendo la ventaja de memoria O(K) y tiempo O(N log K).

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
import heapq

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
        return (-self.small[0] + self.large[0]) / 2.0
```

### Plantilla en TypeScript / JavaScript
```typescript
import { MinHeap } from "./heaps";

export function findKLargest(nums: number[], k: number): number {
  const minHeap = new MinHeap();
  for (const x of nums) {
    minHeap.push(x);
    if (minHeap.size > k) {
      minHeap.pop(); // Expulsa el más pequeño para conservar los K más grandes
    }
  }
  return minHeap.peek()!;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 02:00] El secreto del Podio VIP: Por qué los K Mayores usan un Min-Heap
- **🎬 Visual en Pantalla / Slide:** Un podio con 3 sillas donde el más bajo de los 3 está en la puerta listo para ser reemplazado.
- **🎙️ Narración / Guion:**
  > "Aquí viene una pregunta clásica con trampa: si quieres conservar los K números más grandes de un millón de datos, ¿usas un Max-Heap o un Min-Heap? Aunque suene al revés, usas un Min-Heap de tamaño K, porque a quien necesitas expulsar cada vez que entra alguien mejor es al más pequeño del grupo VIP."

### ⏱️ [02:00 - 05:00] Two Heaps: Encontrando la Mediana en vivo en O(1)
- **🎬 Visual en Pantalla / Slide:** Dos triángulos enfrentados por sus puntas (Max-Heap abajo y Min-Heap arriba) mostrando la mediana justo en medio.
- **🎙️ Narración / Guion:**
  > "¿Cómo mantienes la mediana cuando llegan miles de números por segundo? Partes el universo en dos mitades: un Max-Heap para los números pequeños y un Min-Heap para los números grandes. Sus dos cimas te dan la mediana al instante."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#973. K Closest Points to Origin** | `Medium` | [https://leetcode.com/problems/k-closest-points-to-origin/](https://leetcode.com/problems/k-closest-points-to-origin/) | Para quedarte con los K MÁS PEQUEÑOS en distancia, usa un Max-Heap de tamaño K (`(-dist, x, y)`). |
| **#295. Find Median from Data Stream** | `Hard` | [https://leetcode.com/problems/find-median-from-data-stream/](https://leetcode.com/problems/find-median-from-data-stream/) | Two Heaps: un Max-Heap para la mitad izquierda y un Min-Heap para la mitad derecha balanceados en tamaño. |
| **#373. Find K Pairs with Smallest Sums** | `Medium` | [https://leetcode.com/problems/find-k-pairs-with-smallest-sums/](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/) | K-Way Merge con un Min-Heap guardando `(nums1[i] + nums2[j], i, j)`. |

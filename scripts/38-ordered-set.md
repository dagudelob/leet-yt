# 🎬 Episodio #38: Ordered Set & Balanced BSTs (Conjuntos Ordenados Dinámicos)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 7 — Estructura de Datos + Patrón Algorítmico (`Advanced`)  
> **Término en Inglés (Flowchart):** `Ordered Set / SortedList & Balanced BST Operations`  
> **Prerrequisitos Recomendados:** BST → Binary Search

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica qué vacío llena el Ordered Set entre el Hash Set (que es O(1) pero está totalmente desordenado) y el Heap (que solo ve el mínimo o máximo en la punta). Revela el arma secreta para entrevistas en Python: que LeetCode incluye preinstalado `from sortedcontainers import SortedList`.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Ordered Set", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Inserción/Borrado dinámico + Búsqueda de vecino más cercano o rango en O(log N)) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Ordered Set?
Colección dinámica auto-balanceada (`SortedList` / `SortedSet` de `sortedcontainers` en Python, `std::set` en C++, `TreeSet` en Java) que mantiene los elementos ordenados en todo momento permitiendo **insertar, borrar y buscar el vecino más cercano (`>= x` o `<= x`) en O(log N)**.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Una biblioteca mágica donde cada vez que devuelves un libro nuevo, los estantes se acomodan solos en `log N` pasos, permitiéndote preguntar al instante no solo si existe un libro, sino '¿cuál es el libro de precio inmediatamente superior a $45?' o '¿cuántos libros cuestan menos de $30?'.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Hash Set = búsqueda exacta O(1) sin orden. Heap = solo mínimo/máximo en O(log N). Ordered Set = inserción, borrado y búsqueda de vecinos cercanos `>= x` en O(log N).
2. **Idea Clave #2:** En Python usa `from sortedcontainers import SortedList` con `.add(x)`, `.remove(x)` y `.bisect_left(x)`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Ordered Set)
- ✅ Necesitas insertar y eliminar números dinámicamente Y consultar en cada paso el **sucesor (`>= x` / `bisect_left`)**, el **predecesor (`<= x` / `bisect_right - 1`)**, o **cuántos elementos menores que `x`** han aparecido hasta ahora.
- ✅ Mantener intervalos activos sin solapamiento en un calendario dinámico (`My Calendar I`) o una ventana deslizante ordenada (`Contains Duplicate III`, `Sliding Window Median`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si todos los datos están fijos desde el principio (no necesitas un Ordered Set dinámico; basta ordenar el arreglo una vez y usar Binary Search). Si solo necesitas el mínimo o máximo extremo, usa un Heap (más ligero).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Inserción/Borrado dinámico + Búsqueda de vecino más cercano o rango en O(log N)`
- **Complejidad Temporal Promedio:** `add / remove / bisect_left / index `s[k]`: O(log N)`
- **Complejidad Temporal Peor Caso:** `O(log N)`
- **Complejidad Espacial:** `O(N)`
- **Nota Técnica:** En LeetCode Python, la librería `from sortedcontainers import SortedList` viene instalada por defecto.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Identificar que el problema pide insertar/borrar elementos Y hacer preguntas de orden o cercanía (`>= x`, `<= x`, o el K-ésimo elemento activo).
2. Consultar el vecino con `idx = sl.bisect_left(target)` y verificar que `idx < len(sl)`.
3. Actualizar la colección con `sl.add(x)` y `sl.remove(old)`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Usar `list.insert(idx, x)` tras un `bisect` sobre una lista normal de Python creyendo que es O(log N): la búsqueda es O(log N), pero insertar en medio de una `list` sigue siendo O(N). Usa `SortedList`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
# En LeetCode Python, 'sortedcontainers' está incluido en el entorno oficial:
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
    return False
```

### Plantilla en TypeScript / JavaScript
```typescript
// En TypeScript/JS podemos usar Búsqueda Binaria sobre arreglo mantenido o compresión + Fenwick Tree
export function lowerBound(sortedArr: number[], target: number): number {
  let low = 0,
    high = sortedArr.length;
  while (low < high) {
    const mid = (low + high) >> 1;
    if (sortedArr[mid] >= target) high = mid;
    else low = mid + 1;
  }
  return low;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Hash Set vs Heap vs Ordered Set: La tríada de colecciones
- **🎬 Visual en Pantalla / Slide:** Tabla comparativa mostrando por qué ni el Hash Set ni el Heap pueden responder '¿cuál es el elemento más cercano a X?'.
- **🎙️ Narración / Guion:**
  > "Un Hash Set no sabe quién es mayor que quién, y un Heap solo conoce al campeón que está en la cima. Cuando necesitas que toda tu colección se mantenga ordenada mientras entran y salen datos en vivo, entra en escena el Ordered Set."

### ⏱️ [01:45 - 04:15] SortedList en Python y el patrón de Vecino Más Cercano
- **🎬 Visual en Pantalla / Slide:** Ventana deslizante consultando el piso y techo de `x` con `bisect_left`.
- **🎙️ Narración / Guion:**
  > "Con `bisect_left` sobre un conjunto ordenado, encuentras en tiempo logarítmico el elemento inmediatamente mayor o igual y el inmediatamente menor, resolviendo problemas de calendarios y duplicados cercanos en pocas líneas."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#729. My Calendar I** | `Medium` | [https://leetcode.com/problems/my-calendar-i/](https://leetcode.com/problems/my-calendar-i/) | Guarda intervalos ordenados y usa `bisect_left` para revisar solo el evento inmediatamente anterior y el siguiente. |
| **#220. Contains Duplicate III** | `Hard` | [https://leetcode.com/problems/contains-duplicate-iii/](https://leetcode.com/problems/contains-duplicate-iii/) | Mantén un `SortedList` de los últimos `k` elementos y consulta `bisect_left(x - t)`. |
| **#315. Count of Smaller Numbers After Self** | `Hard` | [https://leetcode.com/problems/count-of-smaller-numbers-after-self/](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) | Recorre de derecha a izquierda: `window.bisect_left(x)` te dice en O(log N) cuántos menores ya viste. |

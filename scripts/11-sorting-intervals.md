# 🎬 Episodio #11: Sorting + Interval Scan ( Barrido de Intervalos)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 2 — Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Sorting & Merge Intervals`  
> **Prerrequisitos Recomendados:** Arrays → Basic DSA & Big-O

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Muestra visualmente los 3 casos posibles entre dos intervalos ordenados por inicio: 1) Separados (`curr.start > prev.end`), 2) Traslape parcial, y 3) Uno completamente contenido dentro del otro (por eso es obligatorio usar `max(prev.end, curr.end)` y no simplemente `curr.end`).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Sorting + Intervals", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Lista de pares [start, end] con N ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Sorting + Intervals?
Ordenar segmentos `[start, end]` (por su punto de inicio o de fin) para que cualquier par de intervalos que se traslapen queden adyacentes, permitiendo fusionarlos, contar colisiones o detectar huecos libres en un solo barrido lineal.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Organizar tu calendario de reuniones del día: si las notas de tus reuniones están revueltas sobre el escritorio, es difícil ver cuáles se cruzan. Pero si las ordenas por hora de inicio de las 8:00 AM a las 6:00 PM, basta mirar cada reunión contra la inmediatamente anterior para ver si chocan.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Ordenar por `start` garantiza que si dos intervalos se solapan, estarán contiguos en el recorrido.
2. **Idea Clave #2:** La condición universal de solapamiento (una vez ordenados por inicio) es simplemente `curr.start <= prev.end`.
3. **Idea Clave #3:** Al fusionar, el nuevo fin es `max(prev.end, curr.end)` porque el primer intervalo podría ser más largo y envolver al segundo (`[1, 10]` y `[2, 5]`).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Sorting + Intervals)
- ✅ El input es una lista de intervalos `[start, end]`, horarios de reuniones, reservas o segmentos en una línea.
- ✅ Te piden fusionar intervalos superpuestos (`Merge Intervals`), insertar un nuevo intervalo, o encontrar huecos libres.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si el problema pide elegir el MÁXIMO número de intervalos que NO se solapan (Interval Scheduling Greedy), conviene ordenar por `end` (hora de finalización) en lugar de `start`.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Lista de pares [start, end] con N ≤ 10⁵`
- **Complejidad Temporal Promedio:** `O(N log N) dominado por el ordenamiento inicial`
- **Complejidad Temporal Peor Caso:** `O(N log N)`
- **Complejidad Espacial:** `O(N) para almacenar la lista de intervalos fusionados`
- **Nota Técnica:** El barrido posterior al sort toma solo O(N).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Ordenar el arreglo de intervalos de menor a mayor según su extremo izquierdo `x[0]`.
2. Inicializar la lista `merged` con el primer intervalo.
3. Para cada intervalo siguiente, comparar su inicio con el final del último intervalo en `merged`.
4. Si se solapan, ampliar el final con `max`; si no, hacer `append`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Escribir `merged[-1][1] = end` en vez de `max(merged[-1][1], end)`: falla cuando un intervalo grande como `[1, 10]` es seguido por uno pequeño `[2, 3]`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
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

    return merged
```

### Plantilla en TypeScript / JavaScript
```typescript
export function mergeIntervals(intervals: number[][]): number[][] {
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
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] Domando el caos de los intervalos con un Sort
- **🎬 Visual en Pantalla / Slide:** Barras horizontales desordenadas alineándose de izquierda a derecha tras ordenar por inicio.
- **🎙️ Narración / Guion:**
  > "Comparar todos los intervalos contra todos toma O(N²). Pero en cuanto los ordenamos por su punto de inicio, ocurre la magia: cualquier traslape ocurre únicamente con el vecino inmediato."

### ⏱️ [01:30 - 04:00] La condición `start <= prev_end` y la trampa del intervalo envolvente
- **🎬 Visual en Pantalla / Slide:** El intervalo [1, 10] tragándose al intervalo [2, 5] manteniendo el final en 10.
- **🎙️ Narración / Guion:**
  > "El error más común en entrevistas al fusionar intervalos es reemplazar el final directamente. ¿Qué pasa si el primer intervalo iba de 1 a 10 y el segundo va de 2 a 5? Siempre debes usar el máximo de ambos finales."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#56. Merge Intervals** | `Medium` | [https://leetcode.com/problems/merge-intervals/](https://leetcode.com/problems/merge-intervals/) | Ordena por `start` y fusiona si `curr.start <= merged[-1].end` usando `max(prev_end, curr_end)`. |
| **#57. Insert Interval** | `Medium` | [https://leetcode.com/problems/insert-interval/](https://leetcode.com/problems/insert-interval/) | Divide en 3 fases: los que terminan antes del nuevo, los que se solapan con el nuevo, y los que empiezan después. |
| **#435. Non-overlapping Intervals** | `Medium` | [https://leetcode.com/problems/non-overlapping-intervals/](https://leetcode.com/problems/non-overlapping-intervals/) | Ordena por `end` (o al detectar choque conserva el intervalo que termine más temprano). |

# 🎬 Episodio #46: Specialized Advanced Patterns (Sweep Line, Boyer-Moore, Tarjan & Euler)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 7 — Patrón Algorítmico (`Expert`)  
> **Término en Inglés (Flowchart):** `Sweep Line, Boyer-Moore Majority Vote, Reservoir Sampling, Tarjan & Hierholzer`  
> **Prerrequisitos Recomendados:** Sorting + Intervals → Graphs → DFS

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Cierra con broche de oro el episodio #46 de la serie 'Leet-YT' presentando los 4 patrones especializados que hacen brillar a un candidato Senior/Staff: 1) Sweep Line & Difference Arrays (`+1` en `start`, `-1` en `end`), 2) Boyer-Moore Majority Vote en O(1) espacio, 3) Camino de Euler con Hierholzer (`Reconstruct Itinerary`), y 4) Detección de Puentes Críticos con Tarjan (`Critical Connections`).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Specialized Patterns", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Concurrencia máxima de eventos, Majority Vote en O(1) espacio, Puentes en redes o Camino de Euler) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Specialized Patterns?
El arsenal de élite para cerrar el Flowchart: 1) **Sweep Line / Difference Array** (convertir intervalos en eventos `+1` al abrir y `-1` al cerrar), 2) **Boyer-Moore Majority Vote** (hallar el elemento mayoritario en O(N) tiempo y O(1) espacio), 3) **Reservoir Sampling**, 4) **Algoritmo de Hierholzer (Camino de Euler)** y 5) **Algoritmo de Tarjan (Puentes / SCC)**.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Imagina un guardia en la puerta de un centro comercial (Sweep Line / Eventos): para saber en qué minuto del día hubo más gente adentro, no necesitas seguir a cada comprador; simplemente sumas `+1` al contador cada vez que alguien entra por la puerta y restas `-1` cada vez que alguien sale.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Sweep Line desarma intervalos `[start, end]` en dos eventos puntuales independientes `(start, +1)` y `(end, -1)`.
2. **Idea Clave #2:** Difference Array es el inverso del Prefix Sum: sumar `V` a todo el rango `[L, R]` es solo `diff[L] += V` y `diff[R+1] -= V` en O(1).
3. **Idea Clave #3:** En Boyer-Moore, si un ejército tiene más de la mitad de los soldados, aunque cada soldado se anule 1 a 1 con un enemigo distinto, siempre quedará en pie el ejército mayoritario.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Specialized Patterns)
- ✅ **Sweep Line / Difference Array**: ¿Cuántos intervalos están activos simultáneamente en cada punto o cuál es el pico máximo de salas necesarias? (`Meeting Rooms II`, `Car Pooling`, `The Skyline Problem`).
- ✅ **Boyer-Moore Majority Vote**: Encontrar el elemento que aparece más de `⌊N/2⌋` (o `⌊N/3⌋`) veces exigiendo estrictamente **O(1) memoria** (`Majority Element I & II`).
- ✅ **Hierholzer (Eulerian Path)**: Recorrer **TODAS LAS ARISTAS** de un grafo exactamente 1 vez (`Reconstruct Itinerary`) agregando el nodo al resultado en post-order (`dfs` agotando aristas salientes).
- ✅ **Tarjan (`tin` y `low`)**: Encontrar **Aristas Críticas (Bridges)** cuya eliminación desconecta el grafo (`Critical Connections in a Network`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ No uses Boyer-Moore para encontrar el elemento 'más frecuente' general si no está garantizado que supere `N/2` (o si no haces una segunda pasada de verificación).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Concurrencia máxima de eventos, Majority Vote en O(1) espacio, Puentes en redes o Camino de Euler`
- **Complejidad Temporal Promedio:** `Boyer-Moore: O(N) tiempo, O(1) espacio | Sweep Line: O(N log N) | Tarjan / Hierholzer: O(V + E)`
- **Complejidad Temporal Peor Caso:** `O(N log N) o O(V + E)`
- **Complejidad Espacial:** `O(1) en Boyer-Moore | O(N) en Sweep Line / Tarjan`
- **Nota Técnica:** Un Difference Array (`diff[L] += val; diff[R+1] -= val`) aplica N sumas de rango en O(1) cada una y reconstruye el arreglo final con un Prefix Sum en O(N).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Para concurrencia de intervalos (Sweep Line): emitir `+delta` en `start` y `-delta` en `end`, ordenar por coordenada y acumular.
2. Para actualizaciones masivas de rango offline (Difference Array): aplicar `+V` en `L` y `-V` en `R+1`, y al final calcular la suma prefija.
3. Para Boyer-Moore: cambiar `candidate` solo cuando `count == 0`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En Sweep Line, no definir cómo desempatar cuando un intervalo termina en el mismo instante `t` en que otro empieza: si `[1, 2]` y `[2, 3]` NO se solapan, `(t, -1)` debe ir antes que `(t, +1)`; si SÍ cuentan como traslape en el borde, `(t, +1)` va primero.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def boyer_moore_majority_vote(nums: list[int]) -> int:
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
    return max_active
```

### Plantilla en TypeScript / JavaScript
```typescript
export function boyerMooreMajorityVote(nums: number[]): number {
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
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 02:00] Sweep Line y Difference Arrays: El poder de los eventos +1 y -1
- **🎬 Visual en Pantalla / Slide:** Una línea vertical barriendo intervalos de izquierda a derecha sumando +1 al entrar y -1 al salir.
- **🎙️ Narración / Guion:**
  > "Llegamos al episodio final de nuestro mapa de 46 temas. Empezamos este bloque con una idea brillante: un intervalo de inicio a fin no es más que dos eventos en el tiempo, un `+1` cuando empieza y un `-1` cuando termina."

### ⏱️ [02:00 - 05:15] Boyer-Moore en O(1), Caminos de Euler y Puentes de Tarjan
- **🎬 Visual en Pantalla / Slide:** Resumen visual de Boyer-Moore, el recorrido de aristas de Euler y los tiempos `low[v] > tin[u]` de Tarjan.
- **🎙️ Narración / Guion:**
  > "Con Boyer-Moore para mayorías en O(1), Hierholzer para recorrer todas las aristas sin repetir y Tarjan para detectar conexiones críticas en una red, has completado los 46 nodos del Flowchart de Leet-YT."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#169. Majority Element** | `Easy` | [https://leetcode.com/problems/majority-element/](https://leetcode.com/problems/majority-element/) | Algoritmo de Boyer-Moore: cancela elementos distintos de par en par manteniendo `candidate` y `count` en O(1) espacio. |
| **#1094. Car Pooling** | `Medium` | [https://leetcode.com/problems/car-pooling/](https://leetcode.com/problems/car-pooling/) | Sweep Line / Difference Array: suma `+pasajeros` al subir en `from` y resta `-pasajeros` al bajar en `to`. |
| **#1192. Critical Connections in a Network** | `Hard` | [https://leetcode.com/problems/critical-connections-in-a-network/](https://leetcode.com/problems/critical-connections-in-a-network/) | Algoritmo de Tarjan: una arista `(u, v)` es un puente crítico si `low[v] > discovery_time[u]`. |

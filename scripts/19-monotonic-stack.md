# 🎬 Episodio #19: Monotonic Stack & Queue (Pila y Cola Monótona)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 3 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Monotonic Stack & Monotonic Deque`  
> **Prerrequisitos Recomendados:** Stacks (LIFO) → Queues & Deques

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Desmitifica el Monotonic Stack, uno de los temas que más intimida en entrevistas pero que tiene una plantilla de apenas 10 líneas. Explica la regla de oro: 'Guarda siempre ÍNDICES en la pila, nunca solo los valores', y muestra cómo al hacer `pop()` descubres simultáneamente el límite derecho e izquierdo de un elemento (clave para `Largest Rectangle in Histogram`).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Monotonic Stack", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Next Greater/Smaller Element, Histogramas o Sliding Window Maximum con N ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Monotonic Stack?
Mantener una pila o deque cuyos elementos están estrictamente ordenados (crecientes o decrecientes). Al llegar un nuevo elemento que rompe el orden, desapilamos los anteriores, descubriendo en O(N) total cuál es el 'Siguiente Elemento Mayor o Menor' de cada posición.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Una fila de edificios mirando hacia el mar: si se construye un rascacielos nuevo muy alto adelante, tapa la vista de todos los edificios más bajos que estaban detrás de él. Esos edificios bajos ya nunca serán el 'edificio más alto visible', así que podemos retirarlos de la lista de candidatos.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Para buscar el 'Siguiente Mayor' (Next Greater), mantén una pila monótona DECRECIENTE: el primer número mayor que llegue disparará los `pop()`.
2. **Idea Clave #2:** Para buscar el 'Siguiente Menor' (Next Smaller), mantén una pila monótona CRECIENTE.
3. **Idea Clave #3:** Guarda siempre ÍNDICES en la pila: con el índice `i` puedes calcular distancias (`i - prev_idx`) y también consultar el valor `nums[i]`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Monotonic Stack)
- ✅ El problema pide para cada índice `i` encontrar el **Next Greater Element** (siguiente mayor a la derecha), **Next Smaller Element**, o cuántos días faltan para un día más cálido (`Daily Temperatures`).
- ✅ Encontrar el rectángulo de mayor área en un histograma (`Largest Rectangle in Histogram`) o cuánta agua atrapa un relieve (`Trapping Rain Water`).
- ✅ **Monotonic Deque**: Encontrar el máximo o mínimo dentro de una ventana deslizante de tamaño `K` en tiempo O(N) (`Sliding Window Maximum`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si solo necesitas el máximo o mínimo global de todo el arreglo hasta ahora (para eso basta una simple variable `max_so_far`).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Next Greater/Smaller Element, Histogramas o Sliding Window Maximum con N ≤ 10⁵`
- **Complejidad Temporal Promedio:** `O(N)`
- **Complejidad Temporal Peor Caso:** `O(N)`
- **Complejidad Espacial:** `O(N) para la pila de índices`
- **Nota Técnica:** Cada índice entra a la pila exactamente 1 vez y sale como máximo 1 vez (máximo 2N operaciones).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Crear una lista `stack = []` que almacenará índices pendientes de encontrar su respuesta.
2. Por cada nuevo índice `i`, usar un `while stack and nums[i] > nums[stack[-1]]:` para resolver y desapilar.
3. Apilar el índice actual `stack.append(i)`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Guardar solo el valor `nums[i]` en vez del índice `i` en la pila, impidiendo saber en qué posición del arreglo de respuesta escribir o qué ancho tiene una ventana/rectángulo.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def daily_temperatures(temps: list[int]) -> list[int]:
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

    return ans
```

### Plantilla en TypeScript / JavaScript
```typescript
export function dailyTemperatures(temps: number[]): number[] {
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
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] La intuición de los rascacielos: ¿Qué es una Pila Monótona?
- **🎬 Visual en Pantalla / Slide:** Barras de distintas alturas; al entrar una barra alta, las barras pequeñas previas se resuelven y salen de la pila.
- **🎙️ Narración / Guion:**
  > "Si para cada día de la semana quieres saber cuándo llegará un día más caluroso, comparar cada día con todos los futuros toma O(N²). Pero con una Pila Monótona, mantenemos en espera los días fríos y, en cuanto llega una ola de calor, resolvemos todos esos días pendientes de golpe en O(N)."

### ⏱️ [01:45 - 04:45] Histogramas y Sliding Window Maximum (Monotonic Deque)
- **🎬 Visual en Pantalla / Slide:** Animación de `Largest Rectangle in Histogram` y `Sliding Window Maximum` con una Deque decreciente.
- **🎙️ Narración / Guion:**
  > "Lo más hermoso de una pila creciente es que cuando desapilas una barra porque llegó una más baja, el elemento que la saca es su límite derecho y el que quedó debajo en la pila es su límite izquierdo."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#739. Daily Temperatures** | `Medium` | [https://leetcode.com/problems/daily-temperatures/](https://leetcode.com/problems/daily-temperatures/) | Pila monótona decreciente de índices: desapila cuando `temps[i] > temps[stack[-1]]`. |
| **#84. Largest Rectangle in Histogram** | `Hard` | [https://leetcode.com/problems/largest-rectangle-in-histogram/](https://leetcode.com/problems/largest-rectangle-in-histogram/) | Pila monótona creciente: cuando una barra baja, sabemos hasta dónde podía extenderse la barra alta anterior. |
| **#239. Sliding Window Maximum** | `Hard` | [https://leetcode.com/problems/sliding-window-maximum/](https://leetcode.com/problems/sliding-window-maximum/) | Monotonic Deque decreciente: saca por atrás los menores al nuevo y por delante los que salieron de la ventana `i - k`. |

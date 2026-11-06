# 🎬 Episodio #34: Greedy Algorithms (Algoritmos Voraces)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 6 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Greedy Algorithms`  
> **Prerrequisitos Recomendados:** Sorting + Intervals → Heaps (Priority Queue)

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Contrasta Greedy con Dynamic Programming: en DP desconfías y pruebas todas las opciones guardando resultados; en Greedy confías en una regla local que descarta el resto sin arrepentirse. Enseña cómo distinguir en 30 segundos en una entrevista si un problema es Greedy o DP intentando construir un contraejemplo pequeño.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Greedy", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Optimización con N ≤ 10⁵ donde existe propiedad de elección voraz) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Greedy?
Tomar en cada paso la decisión que parece mejor **en ese preciso instante** (óptimo local) sin mirar atrás ni explorar otras ramas, demostrando que esa regla voraz conduce garantizadamente al óptimo global en O(N) o O(N log N).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Si quieres meter la mayor cantidad de reuniones posibles en tu día (sin importar cuánto duren), la regla voraz infalible es elegir siempre la reunión que **termine más temprano**: así liberas tu sala lo antes posible para las siguientes.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En problemas de selección de intervalos sin solapamiento, ordenar por hora de FIN (`end`) es óptimo; ordenar por inicio falla cuando una reunión empieza temprano pero dura todo el día.
2. **Idea Clave #2:** En `Jump Game` y `Gas Station`, en lugar de simular cada punto de partida, mantienes una frontera o acumulador que descarta rangos enteros de una sola vez.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Greedy)
- ✅ Problemas de **alcance máximo** o saltos (`Jump Game I & II`: mantener siempre `max_reach = max(max_reach, i + nums[i])`).
- ✅ **Interval Scheduling**: Elegir la mayor cantidad de intervalos que no se solapen (ordenando por punto de **FIN** `end`).
- ✅ Asignación con ordenamiento o Heaps (`Gas Station`, `Candy`, `Boats to Save People`, `Partition Labels`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Cuando una elección voraz temprana te bloquea una recompensa mucho mayor más adelante (ej. `0/1 Knapsack` o cambio de monedas con denominaciones como `[1, 3, 4]` para sumar `6`, donde el voraz elige `4+1+1` (3 monedas) en vez del óptimo `3+3` (2 monedas)). Si el voraz falla, necesitas **Dynamic Programming**.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Optimización con N ≤ 10⁵ donde existe propiedad de elección voraz`
- **Complejidad Temporal Promedio:** `O(N) en barrido directo | O(N log N) si requiere ordenar antes`
- **Complejidad Temporal Peor Caso:** `O(N log N)`
- **Complejidad Espacial:** `O(1) adicional`
- **Nota Técnica:** Siempre pon a prueba tu idea Greedy intentando inventar un contraejemplo pequeño de 3 o 4 elementos antes de programarla.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Proponer la regla voraz candidata (ej. ordenar por menor fin, mayor ratio valor/peso, o mantener alcance máximo).
2. Intentar romperla con un contraejemplo de 3 elementos. Si resiste y cumple la propiedad de intercambio, programarla en O(N) u O(N log N).

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Aplicar Greedy en problemas tipo `Coin Change` con monedas arbitrarias o `House Robber` donde tomar el máximo inmediato te impide tomar dos vecinos que sumaban más.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def can_jump_greedy(nums: list[int]) -> bool:
    """
    Patrón Greedy de Alcance Máximo (Jump Game).
    En lugar de probar todos los saltos con DP O(N^2), rastreamos hasta qué índice máximo podemos llegar.
    Tiempo: O(N) | Espacio: O(1)
    """
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False  # Quedamos atrapados antes de poder pisar la casilla 'i'
        max_reach = max(max_reach, i + jump)
    return True


def max_non_overlapping_intervals(intervals: list[list[int]]) -> int:
    """
    Patrón Greedy de Intervalos: Ordenar por FIN (x[1]), nunca por inicio.
    """
    intervals.sort(key=lambda x: x[1])
    count = 0
    last_end = float("-inf")
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count
```

### Plantilla en TypeScript / JavaScript
```typescript
export function canJumpGreedy(nums: number[]): boolean {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Greedy vs DP: ¿Cuándo vale la pena ser voraz?
- **🎬 Visual en Pantalla / Slide:** Un escalador tomando el camino más alto inmediato vs un mapa con vista aérea.
- **🎙️ Narración / Guion:**
  > "Un algoritmo Greedy toma la mejor decisión del momento y jamás mira por el espejo retrovisor. Cuando la propiedad matemática se cumple, transforma problemas que parecerían requerir Programación Dinámica en un simple barrido lineal con O(1) de memoria."

### ⏱️ [01:45 - 04:30] Jump Game, Gas Station y la Regla de Ordenar por Final
- **🎬 Visual en Pantalla / Slide:** Animación de `max_reach` avanzando como una ola sobre las casillas de Jump Game.
- **🎙️ Narración / Guion:**
  > "En Jump Game no nos importa qué combinación exacta de saltos dimos: solo nos importa cuál es la casilla más lejana que podemos alcanzar hasta este momento."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#55. Jump Game** | `Medium` | [https://leetcode.com/problems/jump-game/](https://leetcode.com/problems/jump-game/) | Mantén la frontera más lejana alcanzable `max_reach = max(max_reach, i + nums[i])`. |
| **#134. Gas Station** | `Medium` | [https://leetcode.com/problems/gas-station/](https://leetcode.com/problems/gas-station/) | Si `sum(gas) >= sum(cost)`, existe solución; si el tanque cae `< 0` en `i`, ninguna estación anterior podía ser el inicio, así que reinicia en `i + 1`. |
| **#763. Partition Labels** | `Medium` | [https://leetcode.com/problems/partition-labels/](https://leetcode.com/problems/partition-labels/) | Precalcula la última aparición de cada letra y extiende el corte actual hasta `max(end, last_pos[ch])`. |

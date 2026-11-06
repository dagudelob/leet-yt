# 🎬 Episodio #37: Bitmask DP (Programación Dinámica con Máscaras de Bits)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 6 — Patrón Algorítmico (`Expert`)  
> **Término en Inglés (Flowchart):** `Bitmask Dynamic Programming (TSP & Subset States)`  
> **Prerrequisitos Recomendados:** Dynamic Programming → Memoization (Top-Down DP) → Backtracking

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Enseña la señal de radar más poderosa para problemas Hard de entrevistas: 'Cuando veas `N <= 15` o `N <= 20`, piensa inmediatamente en Bitmask DP'. Explica las 3 operaciones de bits que necesita saber (`(mask >> i) & 1` para leer si el elemento `i` ya se usó, `mask | (1 << i)` para marcarlo como usado, y `(1 << n) - 1` para saber que ya se usaron todos) y por qué pasar de `N!` a `2^N` es la diferencia entre 15 minutos y 50 milisegundos.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Bitmask DP", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (¡Señal inconfundible! 12 ≤ N ≤ 20 y el estado depende del subconjunto de elementos ya usados) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Bitmask DP?
Representar un subconjunto de elementos visitados o usados mediante los bits `0` y `1` de un solo número entero (`mask` de `0` a `2ᴺ - 1`). Permite memoizar estados de tipo *'¿qué elementos ya usé?'* reduciendo problemas factoriales $O(N!)$ (como el Problema del Viajante - TSP) a $O(N^2 \cdot 2^N)$.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Un panel de 15 interruptores de luz en la pared: en lugar de llevar una lista escrita con los nombres de las habitaciones encendidas, fotografías los 15 interruptores como un número binario (`010110...`). Ese único número entero resume al instante qué habitaciones ya visitaste y cuáles faltan.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** No puedes usar un `set` ni una `list` como llave de `@cache` en DP porque son mutables y lentos, pero un entero `mask` es inmutable, ocupa 1 palabra de CPU y se indexa en O(1).
2. **Idea Clave #2:** Por qué ahorra tanto tiempo: ir por `0 -> 1 -> 2 -> 3` e ir por `0 -> 2 -> 1 -> 3` llegan al MISMO estado `(nodo_actual = 3, visitados = {0,1,2,3})`. El factorial las calcula por separado; Bitmask DP las fusiona.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Bitmask DP)
- ✅ La restricción del problema es muy específica: **$N \le 15$ o $N \le 20$** (demasiado grande para $O(N!)$ que solo aguanta hasta $N \le 11$, pero perfecto para $2^{20} \approx 10^6$).
- ✅ Necesitas asignar tareas a trabajadores, emparejar elementos, o encontrar el recorrido óptimo visitando todos los nodos (`Traveling Salesperson Problem - TSP`, `Shortest Path Visiting All Nodes`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si $N > 22$: $2^{25}$ son más de 33 millones de estados y agotará el tiempo y la memoria.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `¡Señal inconfundible! 12 ≤ N ≤ 20 y el estado depende del subconjunto de elementos ya usados`
- **Complejidad Temporal Promedio:** `O(N · 2ᴺ) o O(N² · 2ᴺ)`
- **Complejidad Temporal Peor Caso:** `O(N² · 2ᴺ)`
- **Complejidad Espacial:** `O(N · 2ᴺ) para la tabla de estados `(u, mask)``
- **Nota Técnica:** Para N = 15, `15! = 1.3 × 10¹²` (TLE imposible), mientras que `15² × 2¹⁵ = 7.3 × 10⁶` (corre en ~0.05 segundos).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Confirmar en los Constraints que $N \le 20$.
2. Definir `all_visited = (1 << n) - 1`.
3. Probar cada candidato `v` cuyo bit esté apagado `if not (mask & (1 << v)):` y llamar recursivamente con `mask | (1 << v)`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En lenguajes como JS/C++/Python, olvidar los paréntesis en `(mask & (1 << v)) == 0`, ya que `==` tiene mayor precedencia que `&` en varios lenguajes.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
from functools import cache

def tsp_bitmask_dp(dist: list[list[int]]) -> int:
    """
    Plantilla Clásica de Bitmask DP (Problema del Viajante / TSP).
    mask: entero de N bits donde el bit 'i' es 1 si la ciudad 'i' ya fue visitada.
    all_visited = (1 << n) - 1   (ej. para n=4 es 1111 en binario = 15)
    Tiempo: O(N^2 * 2^N) | Espacio: O(N * 2^N)
    """
    n = len(dist)
    all_visited = (1 << n) - 1

    @cache
    def dfs(u: int, mask: int) -> int:
        # Caso base: todas las ciudades tienen su bit en 1
        if mask == all_visited:
            return dist[u][0]  # Regresar al origen (o return 0 si no pide volver)

        best = float("inf")
        for v in range(n):
            # Verificar si el bit 'v' está APAGADO (ciudad 'v' aún no visitada)
            if not (mask & (1 << v)):
                # Encender el bit 'v' usando OR: mask | (1 << v)
                best = min(best, dist[u][v] + dfs(v, mask | (1 << v)))
        return best

    # Empezamos en la ciudad 0 con el bit 0 encendido (mask = 1)
    return dfs(0, 1)
```

### Plantilla en TypeScript / JavaScript
```typescript
export function tspBitmaskDP(dist: number[][]): number {
  const n = dist.length;
  const allVisited = (1 << n) - 1;
  const memo: number[][] = Array.from({ length: n }, () =>
    new Array<number>(1 << n).fill(-1)
  );

  function dfs(u: number, mask: number): number {
    if (mask === allVisited) return dist[u][0];
    if (memo[u][mask] !== -1) return memo[u][mask];

    let best = Infinity;
    for (let v = 0; v < n; v++) {
      if ((mask & (1 << v)) === 0) {
        best = Math.min(best, dist[u][v] + dfs(v, mask | (1 << v)));
      }
    }
    memo[u][mask] = best;
    return best;
  }

  return dfs(0, 1);
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] La pista secreta en el enunciado: ¿Por qué N <= 16?
- **🎬 Visual en Pantalla / Slide:** Comparación dramática entre `16! = 20 billones` vs `2^16 = 65,536` estados.
- **🎙️ Narración / Guion:**
  > "Cuando abras un problema Hard y veas que N es menor o igual a 16 o 20, sonríe: el autor del problema te acaba de confesar que la solución es Bitmask DP. Con N igual a 16, probar permutaciones en orden factorial explota, pero los subconjuntos posibles son apenas 65 mil."

### ⏱️ [01:45 - 04:45] Las 3 operaciones de máscara y el Problema del Viajante (TSP)
- **🎬 Visual en Pantalla / Slide:** Un número binario de 5 bits encendiendo casillas con `mask | (1 << v)`.
- **🎙️ Narración / Guion:**
  > "En vez de pasar un arreglo booleano de visitados a nuestra recursión, empaquetamos todo ese arreglo en los bits de un único número entero. Así el estado `(ciudad_actual, mascara)` se guarda en caché al instante."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#847. Shortest Path Visiting All Nodes** | `Hard` | [https://leetcode.com/problems/shortest-path-visiting-all-nodes/](https://leetcode.com/problems/shortest-path-visiting-all-nodes/) | BFS/DP donde el estado es `(nodo_actual, mask_de_visitados)` hasta alcanzar `mask == (1 << n) - 1`. |
| **#1879. Minimum XOR Sum of Two Arrays** | `Hard` | [https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/](https://leetcode.com/problems/minimum-xor-sum-of-two-arrays/) | Con `N <= 14`, `dfs(mask)` asigna el elemento `bit_count(mask)` de `nums1` a cualquier elemento libre en `mask` de `nums2`. |
| **#698. Partition to K Equal Sum Subsets** | `Medium` | [https://leetcode.com/problems/partition-to-k-equal-sum-subsets/](https://leetcode.com/problems/partition-to-k-equal-sum-subsets/) | Con `N <= 16`, memoiza `mask` de elementos ya colocados en cubetas. |

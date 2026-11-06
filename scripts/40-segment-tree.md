# 🎬 Episodio #40: Segment Tree (Árbol de Segmentos y Lazy Propagation)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 7 — Estructura de Datos + Patrón Algorítmico (`Expert`)  
> **Término en Inglés (Flowchart):** `Segment Tree & Lazy Propagation`  
> **Prerrequisitos Recomendados:** Fenwick Tree (BIT) → Divide & Conquer → Binary Trees

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo funciona un Segment Tree dividiendo cualquier intervalo en a lo sumo `2 log₂ N` bloques canónicos. Presenta el truco del 'Segment Tree Iterativo de tamaño 2N' (que se escribe en 20 líneas y cabe cómodamente en una entrevista) y explica conceptualmente qué es Lazy Propagation (postergar actualizaciones de un bloque entero en una nota adhesiva hasta que alguien necesite bajar a sus hijos).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Segment Tree", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Range Min/Max/Sum Query con actualizaciones dinámicas y N, Q ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Segment Tree?
La estructura de datos definitiva para consultas y actualizaciones sobre **intervalos `[L, R]`**: un árbol binario donde cada nodo representa un subsegmento del arreglo y almacena cualquier función asociativa (**Mínimo, Máximo, Suma, GCD, XOR**) en **O(log N)**.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Un gerente regional de ventas: el CEO tiene el récord del país completo `[0..7]`; debajo tiene al director de la mitad oeste `[0..3]` y la mitad este `[4..7]`, y así hasta cada tienda individual. Si pides el máximo de las tiendas `[1..6]`, no visitas las 6 tiendas: le preguntas a un par de gerentes intermedios que cubren exactamente ese bloque en `log N` llamadas.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** El Segment Tree funciona para CUALQUIER operación asociativa (`max`, `min`, `+`, `gcd`, `xor`, matriz de transición), mientras que el Fenwick Tree requiere operaciones invertibles como la suma.
2. **Idea Clave #2:** En el Segment Tree iterativo de tamaño `2N`, las hojas viven en `[N .. 2N-1]` y el padre de `k` es `k // 2`.
3. **Idea Clave #3:** Lazy Propagation permite actualizar un millón de elementos de un rango `[L, R]` en O(log N) guardando el cambio pendiente en los nodos superiores.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Segment Tree)
- ✅ Necesitas consultar el **Mínimo, Máximo, GCD o Suma de un rango `[L, R]`** mientras el arreglo sufre actualizaciones dinámicas (donde Fenwick Tree no puede hacer `min/max` general en subrangos).
- ✅ **Lazy Propagation**: Cuando las actualizaciones no son a 1 sola casilla sino a **todo un rango completo** ('suma +5 a todos los elementos entre L y R' o 'pinta de rojo el segmento `[L, R]`') en O(log N).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si solo necesitas sumas de rango con actualizaciones de 1 elemento: usa un **Fenwick Tree**, que lleva un tercio del código y menos memoria.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Range Min/Max/Sum Query con actualizaciones dinámicas y N, Q ≤ 10⁵`
- **Complejidad Temporal Promedio:** `Build: O(N) | Update: O(log N) | Range Query `[L, R]`: O(log N)`
- **Complejidad Temporal Peor Caso:** `O(log N) por operación`
- **Complejidad Espacial:** `O(N) (`2N` en versión iterativa o `4N` en versión recursiva)`
- **Nota Técnica:** La versión iterativa de Segment Tree ocupa solo `2 * N` enteros y es extremadamente rápida y concisa para entrevistas.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Colocar los elementos iniciales en la mitad derecha `tree[n .. 2n-1]`.
2. Llenar los padres de `n-1` hasta `1` combinando `tree[2*i]` y `tree[2*i + 1]`.
3. Para actualizar, cambiar la hoja `idx + n` y subir dividiendo entre 2 hasta la raíz.
4. Para consultar `[L, R]`, subir desde ambos extremos cerrando el rango en O(log N).

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En la versión recursiva de Segment Tree, reservar `2 * N` en vez de `4 * N`: cuando `N` no es potencia exacta de 2, el árbol recursivo necesita hasta `4 * N` casillas.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
class IterativeSegmentTree:
    """
    Segment Tree Iterativo Compacto (Tamaño 2N) para Range Maximum/Sum Query.
    Las hojas viven en tree[n .. 2n-1] y los padres en tree[1 .. n-1].
    Tiempo Build: O(N) | Update y Query: O(log N)
    """
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)
        # 1. Copiar hojas en la segunda mitad
        for i, x in enumerate(nums):
            self.tree[self.n + i] = x
        # 2. Construir padres hacia atrás en O(N)
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = max(self.tree[2 * i], self.tree[2 * i + 1])

    def update(self, idx: int, val: int) -> None:
        pos = idx + self.n
        self.tree[pos] = val
        while pos > 1:
            pos //= 2
            self.tree[pos] = max(self.tree[2 * pos], self.tree[2 * pos + 1])

    def range_max(self, left: int, right: int) -> int:
        """Máximo en el rango cerrado [left, right] (0-indexed)."""
        res = float("-inf")
        l = left + self.n
        r = right + self.n + 1  # Semiabierto [l, r)
        while l < r:
            if l & 1:
                res = max(res, self.tree[l])
                l += 1
            if r & 1:
                r -= 1
                res = max(res, self.tree[r])
            l //= 2
            r //= 2
        return res
```

### Plantilla en TypeScript / JavaScript
```typescript
export class SegmentTreeMax {
  private n: number;
  private tree: number[];

  constructor(nums: number[]) {
    this.n = nums.length;
    this.tree = new Array<number>(2 * this.n).fill(-Infinity);
    for (let i = 0; i < this.n; i++) this.tree[this.n + i] = nums[i];
    for (let i = this.n - 1; i > 0; i--) {
      this.tree[i] = Math.max(this.tree[2 * i], this.tree[2 * i + 1]);
    }
  }

  update(idx: number, val: number): void {
    let pos = idx + this.n;
    this.tree[pos] = val;
    while (pos > 1) {
      pos >>= 1;
      this.tree[pos] = Math.max(this.tree[2 * pos], this.tree[2 * pos + 1]);
    }
  }

  rangeMax(left: number, right: number): number {
    let res = -Infinity;
    let l = left + this.n;
    let r = right + this.n + 1;
    while (l < r) {
      if (l & 1) res = Math.max(res, this.tree[l++]);
      if (r & 1) res = Math.max(res, this.tree[--r]);
      l >>= 1;
      r >>= 1;
    }
    return res;
  }
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 02:00] Por qué el Segment Tree es el rey de las consultas de rango
- **🎬 Visual en Pantalla / Slide:** Árbol binario de intervalos cubriendo el rango `[1..6]` con solo 3 nodos sombreados.
- **🎙️ Narración / Guion:**
  > "¿Qué haces cuando necesitas el máximo o mínimo de un rango mil veces por segundo mientras los valores del arreglo cambian en vivo? El Fenwick Tree ya no basta porque el máximo no se puede restar. Aquí entra el poderoso Segment Tree."

### ⏱️ [02:00 - 05:00] Segment Tree Iterativo en 20 líneas y Lazy Propagation
- **🎬 Visual en Pantalla / Slide:** Arreglo de tamaño `2N` actualizando hojas y propagando notas 'Lazy' en rangos.
- **🎙️ Narración / Guion:**
  > "Muchos temen al Segment Tree porque la versión recursiva clásica es larga. Pero con la representación iterativa de tamaño 2N, las hojas van en la segunda mitad del arreglo y los padres en la primera mitad: limpio, rápido y libre de recursión."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#307. Range Sum Query - Mutable** | `Medium` | [https://leetcode.com/problems/range-sum-query-mutable/](https://leetcode.com/problems/range-sum-query-mutable/) | Reemplaza `max` por `+` en el Segment Tree iterativo. |
| **#715. Range Module** | `Hard` | [https://leetcode.com/problems/range-module/](https://leetcode.com/problems/range-module/) | Segment Tree dinámico con Lazy Propagation o mantenimiento de intervalos. |
| **#2407. Longest Increasing Subsequence II** | `Hard` | [https://leetcode.com/problems/longest-increasing-subsequence-ii/](https://leetcode.com/problems/longest-increasing-subsequence-ii/) | Combina DP con un Segment Tree de Máximos: `dp[x] = 1 + seg.range_max(x - k, x - 1)`. |

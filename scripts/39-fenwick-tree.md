# 🎬 Episodio #39: Fenwick Tree / Binary Indexed Tree (BIT)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 7 — Estructura de Datos + Patrón Algorítmico (`Advanced`)  
> **Término en Inglés (Flowchart):** `Fenwick Tree / Binary Indexed Tree (BIT)`  
> **Prerrequisitos Recomendados:** Prefix Sums → Binary Trees

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Presenta el Fenwick Tree como 'la joya de 15 líneas que todo entrevistado avanzado ama': mientras un Segment Tree toma 50 líneas, un Fenwick Tree se escribe en 2 minutos gracias al truco binario `i & -i` (aislar el último bit encendido). Explica por qué el índice DEBE empezar en 1 (`1-based`).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Fenwick Tree (BIT)", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Sumas de rango dinámicas con actualizaciones o conteo por orden en O(N log N)) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Fenwick Tree (BIT)?
Un Prefix Sum dinámico en apenas 15 líneas de código: utiliza el bit menos significativo (`i & -i`) para que **tanto actualizar un elemento (`update`) como consultar la suma de cualquier rango `[L, R]` (`query`) tomen tiempo O(log N)**.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** En lugar de que cada escalón guarde la suma de todos los anteriores (que obligaría a corregir todos los escalones siguientes si cambia el primero), agrupamos las sumas en potencias de 2 (escalones de 1, 2, 4, 8, 16...). Así, cualquier cambio o suma se arma saltando por a lo sumo `log₂ N` bloques.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En un Array normal: `update` es O(1) y `range_sum` es O(N). En Prefix Sum: `update` es O(N) y `range_sum` es O(1). En Fenwick Tree: **AMBOS son O(log N)**.
2. **Idea Clave #2:** La expresión `i & -i` (complemento a dos) aísla el bit menos significativo: para subir hacia los padres haces `i += i & -i`; para sumar prefijos haces `i -= i & -i`.
3. **Idea Clave #3:** Siempre suma `+1` a los índices 0-based de LeetCode antes de pasarlos al Fenwick Tree.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Fenwick Tree (BIT))
- ✅ El problema combina **actualizaciones puntuales (`nums[i] += delta`)** intercaladas con **consultas de suma en rangos (`sum(nums[L..R])`)** (`Range Sum Query - Mutable`).
- ✅ Contar inversiones o cuántos elementos menores/mayores que `x` han aparecido hasta ahora (usando los valores o sus rangos comprimidos como índices del Fenwick Tree).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si el arreglo nunca cambia (usa un simple Prefix Sum en O(1) por consulta).
- ⚠️ Si necesitas consultar el **mínimo o máximo de un rango arbitrario `[L, R]` con actualizaciones que disminuyen o aumentan libremente**: la operación `min/max` no tiene inverso como la resta `query(R) - query(L-1)`, por lo que ahí necesitas un **Segment Tree**.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Sumas de rango dinámicas con actualizaciones o conteo por orden en O(N log N)`
- **Complejidad Temporal Promedio:** `Update: O(log N) | Prefix/Range Query: O(log N)`
- **Complejidad Temporal Peor Caso:** `O(log N)`
- **Complejidad Espacial:** `O(N) un único arreglo `tree` de tamaño `N + 1``
- **Nota Técnica:** Usa índices 1-based (`1..N`) porque `0 & -0 == 0` atraparía el bucle en 0.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Crear `tree = [0] * (n + 1)`.
2. En `add(i, delta)`, mientras `i <= n`, sumar `delta` y avanzar con `i += i & -i`.
3. En `prefix_sum(i)`, mientras `i > 0`, acumular `tree[i]` y retroceder con `i -= i & -i`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Pasar el índice `0` a `add(0, delta)`: como `0 & -0` es `0`, el bucle `while i <= n: i += i & -i` nunca avanza y se queda colgado en un ciclo infinito.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
class FenwickTree:
    """
    Binary Indexed Tree (BIT / Fenwick Tree) en 15 líneas.
    IMPORTANTE: Internamente siempre es 1-indexed (índices de 1 a N).
    Truco de bit: (i & -i) extrae la mayor potencia de 2 que divide a 'i'.
    """
    def __init__(self, n: int):
        self.n = n
        self.tree = [0] * (n + 1)

    def add(self, i: int, delta: int) -> None:
        """Suma 'delta' en el índice 1-based 'i' en O(log N)."""
        while i <= self.n:
            self.tree[i] += delta
            i += i & -i

    def prefix_sum(self, i: int) -> int:
        """Retorna la suma de [1..i] en O(log N)."""
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & -i
        return s

    def range_sum(self, left: int, right: int) -> int:
        """Retorna la suma de [left..right] (1-based) en O(log N)."""
        return self.prefix_sum(right) - self.prefix_sum(left - 1)
```

### Plantilla en TypeScript / JavaScript
```typescript
export class FenwickTree {
  private tree: number[];
  private n: number;

  constructor(n: number) {
    this.n = n;
    this.tree = new Array<number>(n + 1).fill(0);
  }

  add(i: number, delta: number): void {
    for (; i <= this.n; i += i & -i) {
      this.tree[i] += delta;
    }
  }

  prefixSum(i: number): number {
    let sum = 0;
    for (; i > 0; i -= i & -i) {
      sum += this.tree[i];
    }
    return sum;
  }

  rangeSum(left: number, right: number): number {
    return this.prefixSum(right) - this.prefixSum(left - 1);
  }
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] El dilema del Prefix Sum cuando los datos cambian
- **🎬 Visual en Pantalla / Slide:** Comparación de tiempos entre Array, Prefix Sum y Fenwick Tree (O(log N) en ambos).
- **🎙️ Narración / Guion:**
  > "El Prefix Sum era perfecto hasta que alguien cambió un número del arreglo y nos obligó a recalcular toda la tabla en O(N). El Árbol de Fenwick resuelve este dilema logrando tanto actualizaciones como sumas de rango en tiempo logarítmico con apenas quince líneas de código."

### ⏱️ [01:45 - 04:30] La magia de `i & -i` y la Compresión de Coordenadas
- **🎬 Visual en Pantalla / Slide:** Escalera de potencias de 2 mostrando cómo `13 (1101₂)` salta a `12 (1100₂)` y a `8 (1000₂)`.
- **🎙️ Narración / Guion:**
  > "Todo el secreto del Fenwick Tree reside en la operación `i & -i`, que extrae la última potencia de dos de cualquier número. Restándola en cada paso, descomponemos cualquier rango en a lo sumo log(N) saltos."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#307. Range Sum Query - Mutable** | `Medium` | [https://leetcode.com/problems/range-sum-query-mutable/](https://leetcode.com/problems/range-sum-query-mutable/) | Usa `bit.add(i + 1, new_val - old_val)` para actualizar y `bit.range_sum(L + 1, R + 1)` para consultar. |
| **#315. Count of Smaller Numbers After Self** | `Hard` | [https://leetcode.com/problems/count-of-smaller-numbers-after-self/](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) | Comprime coordenadas (Rank Compression) y recorre de derecha a izquierda consultando `bit.prefix_sum(rank - 1)`. |
| **#493. Reverse Pairs** | `Hard` | [https://leetcode.com/problems/reverse-pairs/](https://leetcode.com/problems/reverse-pairs/) | Cuenta cuántos elementos previos superan `2 * nums[j]` usando Fenwick Tree con compresión de coordenadas o Merge Sort. |

# 🎬 Episodio #10: Counting & Bucket Sort (Ordenamiento por Conteo)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 2 — Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Counting Sort & Bucket Sort`  
> **Prerrequisitos Recomendados:** Arrays → Hash Table

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo es posible ordenar en O(N) sin romper las leyes de la computación (evitando comparaciones directas y usando los propios valores o frecuencias como índices de un arreglo de cubetas). Destaca el truco de Bucket Sort por Frecuencia en 'Top K Frequent Elements'.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Counting / Buckets", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Rango de valores K ≤ 10⁵ o ordenar por frecuencia (frecuencia ≤ N)) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Counting / Buckets?
Romper la barrera teórica del O(N log N) de los ordenamientos por comparación: cuando los valores o frecuencias caen en un rango acotado `[0..K]`, podemos agruparlos en cubetas (buckets) y ordenarlos en tiempo lineal O(N + K).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Ordenar un mazo de 500 monedas de 1, 5, 10 y 20 pesos. En lugar de comparar monedas de dos en dos (QuickSort/MergeSort), simplemente pones 4 cajas en la mesa, tiras cada moneda en su caja correspondiente y al final juntas las cajas en orden.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Todo algoritmo de ordenamiento basado en comparaciones (`<`, `>`) tarda al menos O(N log N), pero Counting/Bucket Sort no compara: indexa directamente.
2. **Idea Clave #2:** Aunque los números de entrada sean enormes (`-10⁹` a `10⁹`), sus FRECUENCIAS siempre están entre `1` y `N`, permitiendo usar Bucket Sort por frecuencia en O(N).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Counting / Buckets)
- ✅ El rango de valores posibles `K` es pequeño o proporcional a `N` (ej. edades `0..120`, colores `0, 1, 2`, calificaciones `0..100`).
- ✅ Quieres ordenar elementos por su FRECUENCIA de aparición (la frecuencia máxima nunca supera `N`, por lo que puedes crear `N + 1` cubetas donde el índice `f` guarda los elementos que aparecen `f` veces).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Cuando los valores pueden ser gigantescos o arbitrarios (ej. enteros de hasta `10⁹` o flotantes sin acotar), ya que crear un arreglo de tamaño `10⁹` agotaría la memoria RAM.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Rango de valores K ≤ 10⁵ o ordenar por frecuencia (frecuencia ≤ N)`
- **Complejidad Temporal Promedio:** `O(N + K) donde K es el número de cubetas`
- **Complejidad Temporal Peor Caso:** `O(N + K)`
- **Complejidad Espacial:** `O(N + K) para los contadores y cubetas`
- **Nota Técnica:** Supera a O(N log N) cuando K = O(N).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Identificar la variable acotada (el valor del elemento si es pequeño, o su frecuencia si ya contamos con un Hash Map).
2. Crear un arreglo de cubetas `buckets` cuyo índice representa esa cantidad acotada.
3. Recorrer las cubetas en orden ascendente o descendente para recolectar la respuesta en O(N).

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Inicializar cubetas en Python con `buckets = [[]] * (n + 1)`: eso crea `n + 1` referencias a la MISMA lista en memoria. Siempre usa `[[] for _ in range(n + 1)]`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def top_k_frequent_buckets(nums: list[int], k: int) -> list[int]:
    """
    Bucket Sort por Frecuencia (LeetCode 347) en O(N) puro, sin usar Heap.
    Como ningún elemento puede aparecer más de N veces, creamos N+1 cubetas.
    """
    freq_map: dict[int, int] = {}
    for x in nums:
        freq_map[x] = freq_map.get(x, 0) + 1

    # buckets[f] contiene la lista de números que aparecieron exactamente 'f' veces
    buckets: list[list[int]] = [[] for _ in range(len(nums) + 1)]
    for num, freq in freq_map.items():
        buckets[freq].append(num)

    result: list[int] = []
    # Recorremos las cubetas desde la mayor frecuencia hacia abajo
    for freq in range(len(nums), 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result
```

### Plantilla en TypeScript / JavaScript
```typescript
export function topKFrequentBuckets(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const x of nums) {
    freqMap.set(x, (freqMap.get(x) ?? 0) + 1);
  }

  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of freqMap.entries()) {
    buckets[freq].push(num);
  }

  const res: number[] = [];
  for (let f = nums.length; f >= 1; f--) {
    for (const num of buckets[f]) {
      res.push(num);
      if (res.length === k) return res;
    }
  }
  return res;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] Rompiendo el límite de O(N log N)
- **🎬 Visual en Pantalla / Slide:** Comparación de árbol de decisiones O(N log N) vs caída directa en cubetas numeradas O(N).
- **🎙️ Narración / Guion:**
  > "En la universidad nos enseñan que ordenar toma N log N. Pero eso solo aplica si ordenas comparando elementos entre sí. Si sabes que tus datos caen en un rango pequeño, puedes usar los propios números como índices de casilleros."

### ⏱️ [01:30 - 04:00] Bucket Sort por Frecuencia (El truco de Top-K en O(N))
- **🎬 Visual en Pantalla / Slide:** Arreglo de cubetas de 0 a N donde cada índice guarda los números con esa frecuencia.
- **🎙️ Narración / Guion:**
  > "Incluso si los números del arreglo son gigantescos, ¿cuántas veces puede repetirse un número en un arreglo de tamaño N? Como máximo N veces. Eso nos permite ordenar por frecuencia en tiempo 100% lineal."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#347. Top K Frequent Elements** | `Medium` | [https://leetcode.com/problems/top-k-frequent-elements/](https://leetcode.com/problems/top-k-frequent-elements/) | Usa `buckets[frecuencia]` de tamaño `N+1` para lograr O(N) en vez de O(N log K) con Heap. |
| **#451. Sort Characters By Frequency** | `Medium` | [https://leetcode.com/problems/sort-characters-by-frequency/](https://leetcode.com/problems/sort-characters-by-frequency/) | Cuenta frecuencias y reconstruye el string recorriendo las cubetas de `N` a `1`. |
| **#274. H-Index** | `Medium` | [https://leetcode.com/problems/h-index/](https://leetcode.com/problems/h-index/) | Trunca citas mayores a `N` en la cubeta `N` y acumula de derecha a izquierda en O(N). |

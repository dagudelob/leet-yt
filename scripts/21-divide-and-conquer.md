# 🎬 Episodio #21: Divide and Conquer (Divide y Vencerás)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 4 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Divide and Conquer`  
> **Prerrequisitos Recomendados:** Arrays → Binary Search

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica las 3 fases de Divide & Conquer (Dividir, Conquistar y Combinar) y visualiza el árbol de recursión de Merge Sort para demostrar por qué tiene `log₂ N` pisos y cada piso suma `N` operaciones, dando `O(N log N)`. Contrasta Divide & Conquer (subproblemas disjuntos) con Programación Dinámica (subproblemas repetidos).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Divide & Conquer", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Partición recursiva con N ≤ 10⁵ logrando O(N log N)) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Divide & Conquer?
Resolver un problema grande partiéndolo en 2 o más subproblemas independientes del mismo tipo (Divide), resolviéndolos recursivamente (Conquer) y combinando sus respuestas para formar la solución total (Combine).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Contar los votos de un país: una sola persona tardaría años, pero si divides el país en estados, cada estado en municipios y cada municipio en mesas electorales, cada mesa cuenta 200 votos en minutos y luego solo sumas los totales hacia arriba.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Todo algoritmo recursivo necesita primero un Caso Base que detenga la recursión (`if len <= 1`).
2. **Idea Clave #2:** La magia de Merge Sort ocurre en el paso 'Combine': fusionar dos listas ya ordenadas cuesta solo O(N) con dos punteros.
3. **Idea Clave #3:** Incluso puedes contar inversiones en un arreglo durante el paso Merge en O(N log N).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Divide & Conquer)
- ✅ El problema se puede partir en mitades independientes cuyas soluciones se pueden fusionar eficientemente (`Merge Sort`, `Count of Smaller Numbers After Self`, `Merge K Sorted Lists`).
- ✅ Construcción recursiva de árboles o estructuras geométricas a partir de mitades (`Convert Sorted Array to BST`, `Construct Quad Tree`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si los subproblemas NO son independientes sino que se repiten una y otra vez calculando lo mismo (subproblemas superpuestos): ahí Divide & Conquer puro se vuelve exponencial y necesitas Memoization / Dynamic Programming.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Partición recursiva con N ≤ 10⁵ logrando O(N log N)`
- **Complejidad Temporal Promedio:** `O(N log N) cuando partes en 2 mitades y combinas en O(N)`
- **Complejidad Temporal Peor Caso:** `O(N log N)`
- **Complejidad Espacial:** `O(N) auxiliar en Merge Sort + O(log N) pila de recursión`
- **Nota Técnica:** Árbol de recursión de altura `log₂ N` donde cada nivel realiza `O(N)` trabajo total.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Escribir el caso base para entradas de tamaño 0 o 1.
2. Calcular el punto medio `mid` y hacer las llamadas recursivas para `[low..mid]` y `[mid+1..high]`.
3. Combinar los resultados de los hijos en tiempo lineal respecto al tamaño del subproblema.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Olvidar el caso base o partir un rango de tamaño 2 en `(0, 2)` y `(0, 0)`, provocando `RecursionError: maximum recursion depth exceeded`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def merge_sort(nums: list[int]) -> list[int]:
    """
    Esqueleto canónico de Divide & Conquer (Merge Sort).
    1. Base case: len <= 1
    2. Divide: partir en mid
    3. Conquer: ordenar left y right recursivamente
    4. Combine: fusionar ambas mitades ordenadas en O(N)
    """
    if len(nums) <= 1:
        return nums

    mid = len(nums) // 2
    left = merge_sort(nums[:mid])
    right = merge_sort(nums[mid:])

    # Combine (Merge step con dos punteros)
    merged: list[int] = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged
```

### Plantilla en TypeScript / JavaScript
```typescript
export function mergeSort(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));

  const merged: number[] = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  while (i < left.length) merged.push(left[i++]);
  while (j < right.length) merged.push(right[j++]);
  return merged;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Divide, Conquista y Combina: La mentalidad recursiva
- **🎬 Visual en Pantalla / Slide:** Árbol dividiendo un arreglo de 8 números hasta hojas de 1 elemento y fusionándolas hacia arriba.
- **🎙️ Narración / Guion:**
  > "Antes de entrar a los Árboles Binarios, debemos entrenar el músculo de la recursión. Divide y Vencerás nos enseña a confiar en la función recursiva: divide el problema a la mitad, deja que la recursión resuelva cada mitad y concéntrate solo en cómo juntar ambas respuestas."

### ⏱️ [01:45 - 04:15] Por qué N niveles se convierten en log₂(N) niveles
- **🎬 Visual en Pantalla / Slide:** Niveles horizontales del árbol donde cada piso suma exactamente N operaciones.
- **🎙️ Narración / Guion:**
  > "Cuando partes un problema a la mitad en cada paso, solo puedes partirlo log₂(N) veces antes de llegar a tamaño 1. Si en cada piso haces trabajo lineal O(N), el costo total es O(N log N)."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#912. Sort an Array** | `Medium` | [https://leetcode.com/problems/sort-an-array/](https://leetcode.com/problems/sort-an-array/) | Implementa Merge Sort garantizando O(N log N) en el peor caso. |
| **#108. Convert Sorted Array to Binary Search Tree** | `Easy` | [https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) | El elemento central `mid` es la raíz; la mitad izquierda forma el subárbol izquierdo y la derecha el derecho. |
| **#23. Merge k Sorted Lists** | `Hard` | [https://leetcode.com/problems/merge-k-sorted-lists/](https://leetcode.com/problems/merge-k-sorted-lists/) | Divide las K listas en dos mitades recursivamente y fusiónalas de par en par en O(N log K). |

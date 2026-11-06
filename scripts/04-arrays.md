# 🎬 Episodio #04: Arrays (Arreglos Estáticos y Dinámicos)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 1 — Estructura de Datos (`Beginner`)  
> **Término en Inglés (Flowchart):** `Arrays & Dynamic Arrays`  
> **Prerrequisitos Recomendados:** Basic DSA & Big-O

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo funcionan los Arrays en memoria física (aritmética de direcciones `base + i * tamaño`) y cómo funcionan los Dynamic Arrays (`list` en Python) con duplicación de capacidad para lograr `append` en O(1) amortizado. Advierte sobre la trampa mortal de hacer `pop(0)` o `insert(0, x)` dentro de un bucle.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Arrays", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Base de todos los problemas con N ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Arrays?
La estructura de datos más importante de la computación: bloques contiguos de memoria que permiten acceso instantáneo O(1) por índice y máxima velocidad de caché en CPU.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Una fila de casilleros numerados del 0 al N-1 en un pasillo recto. Como todos miden exactamente lo mismo y están pegados uno al lado del otro, para ir al casillero #500 no tienes que contar desde el 0: calculas su posición exacta y vas directo en un instante.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Un Array guarda elementos en celdas de memoria contiguas, permitiendo calcular la dirección del índice `i` en O(1).
2. **Idea Clave #2:** Insertar o borrar al final (`append`/`pop`) es O(1) amortizado, pero hacerlo al inicio (`pop(0)`) cuesta O(N).
3. **Idea Clave #3:** Dominar manipulaciones in-place (como el truco de revertir subsegmentos) ahorra memoria O(N).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Arrays)
- ✅ Necesitas acceso aleatorio instantáneo O(1) a cualquier elemento conociendo su índice `i`.
- ✅ Quieres recorrer secuencias con máxima eficiencia de memoria y caché.
- ✅ Como bloque constructor para Two Pointers, Sliding Window, Prefix Sums, Binary Search y Heaps.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Necesitas insertar o eliminar elementos frecuentemente al inicio o en medio de la colección (cuesta O(N) porque obliga a desplazar todos los elementos siguientes).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Base de todos los problemas con N ≤ 10⁵`
- **Complejidad Temporal Promedio:** `Acceso: O(1) | Append final: O(1) amortizado`
- **Complejidad Temporal Peor Caso:** `Inserción/Borrado en medio: O(N) | Búsqueda sin orden: O(N)`
- **Complejidad Espacial:** `O(N) memoria contigua`
- **Nota Técnica:** Los arreglos dinámicos (`list` en Python, `Array` en JS) duplican su capacidad interna cuando se llenan.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Visualizar el bloque contiguo de memoria y el cálculo de offset.
2. Entender qué pasa cuando un arreglo dinámico se llena: reserva el doble de espacio y copia en O(N) una sola vez cada N inserciones.
3. Aplicar recorridos por índice de izquierda a derecha y de derecha a izquierda.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Usar `nums.pop(0)` en Python o `nums.shift()` en JS dentro de un bucle `while`: convierte un algoritmo lineal en O(N²). Para colas usa `collections.deque`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def array_operations_demo(nums: list[int]) -> list[int]:
    """
    Operaciones esenciales y sus complejidades reales en Python (list = Dynamic Array).
    """
    # 1. Acceso por índice -> O(1)
    first = nums[0] if nums else 0

    # 2. Agregar al final (append) -> O(1) amortizado
    nums.append(first + 10)

    # 3. Eliminar del final (pop) -> O(1)
    nums.pop()

    # 4. Inversión in-place sin duplicar memoria -> O(N) tiempo, O(1) espacio
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1

    return nums
```

### Plantilla en TypeScript / JavaScript
```typescript
export function arrayOperationsDemo(nums: number[]): number[] {
  // 1. Acceso aleatorio por índice -> O(1)
  const first = nums.length > 0 ? nums[0] : 0;

  // 2. Push / Pop al final -> O(1) amortizado
  nums.push(first + 10);
  nums.pop();

  // 3. Inversión in-place -> O(N) tiempo, O(1) espacio extra
  let left = 0,
    right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  return nums;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] Por qué el Array es el rey de la memoria
- **🎬 Visual en Pantalla / Slide:** Bloques de RAM contiguos iluminándose al acceder a `arr[4]` en un solo salto.
- **🎙️ Narración / Guion:**
  > "Antes de aprender algoritmos avanzados, necesitamos dominar la estructura donde vive el 70% de los problemas de entrevista: el Array. Su superpoder está en cómo se guarda físicamente en la memoria RAM."

### ⏱️ [01:30 - 04:00] Arreglos Dinámicos y el costo oculto de insertar en medio
- **🎬 Visual en Pantalla / Slide:** Animación de todos los elementos corriéndose un lugar a la derecha al insertar en el índice 0.
- **🎙️ Narración / Guion:**
  > "Cuando agregas al final con append, toma tiempo constante amortizado. Pero si borras o insertas en la posición cero, obligas a toda la fila a moverse un paso. Hacer eso en un bucle es la causa número uno de Time Limit Exceeded silencioso."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#238. Product of Array Except Self** | `Medium` | [https://leetcode.com/problems/product-of-array-except-self/](https://leetcode.com/problems/product-of-array-except-self/) | Dos pasadas sobre el arreglo (prefijos hacia adelante y sufijos hacia atrás) en O(N) y espacio O(1) extra. |
| **#189. Rotate Array** | `Medium` | [https://leetcode.com/problems/rotate-array/](https://leetcode.com/problems/rotate-array/) | El truco de las 3 reversiones in-place para rotar un arreglo en O(1) de espacio. |
| **#485. Max Consecutive Ones** | `Easy` | [https://leetcode.com/problems/max-consecutive-ones/](https://leetcode.com/problems/max-consecutive-ones/) | Recorrido lineal manteniendo un contador de racha actual. |

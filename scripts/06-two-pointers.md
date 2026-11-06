# 🎬 Episodio #06: Two Pointers (Dos Punteros)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 1 — Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Two Pointers`  
> **Prerrequisitos Recomendados:** Arrays → Strings

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica con claridad cristalina las dos modalidades de Two Pointers: 1) Extremos opuestos (`left` y `right` acercándose) y 2) Misma dirección (`write` y `read` para modificar arreglos in-place). Demuestra por qué descartar un extremo nunca pierde la respuesta correcta cuando el arreglo está ordenado.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Two Pointers", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (N ≤ 10⁵ con arreglo ordenado o modificación in-place O(1) espacio) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Two Pointers?
Utilizar dos índices coordinados que recorren una secuencia (acercándose desde los extremos `left/right` o avanzando en la misma dirección `read/write`) para reducir búsquedas de O(N²) a un solo pase lineal O(N) con espacio O(1).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Dos personas buscando un libro en un estante ordenado por precio: una empieza por el más barato a la izquierda y otra por el más caro a la derecha. Si la suma de ambos precios se pasa de tu presupuesto, quien está en el lado caro da un paso a la izquierda; si falta dinero, quien está en el lado barato da un paso a la derecha.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Two Pointers convierte problemas cuadráticos O(N²) en lineales O(N) sin usar memoria extra O(1).
2. **Idea Clave #2:** En arreglos ordenados, cada comparación te permite descartar toda una fila o columna de pares de un solo golpe.
3. **Idea Clave #3:** Para `3Sum`, fijas un elemento con un bucle externo y reduces el resto a `Two Sum II` en O(N²).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Two Pointers)
- ✅ El arreglo está ordenado (o puedes ordenarlo) y buscas pares o tripletas que cumplan una suma o condición (`Two Sum II`, `3Sum`).
- ✅ Quieres verificar palíndromos o simetría comparando extremos hacia el centro.
- ✅ Debes compactar, filtrar o eliminar duplicados de un arreglo in-place en O(1) espacio usando un puntero lector y otro escritor.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Para buscar pares con suma objetivo en un arreglo NO ordenado donde debes devolver los índices originales (ordenarlo destruiría los índices originales; ahí usa un Hash Map).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `N ≤ 10⁵ con arreglo ordenado o modificación in-place O(1) espacio`
- **Complejidad Temporal Promedio:** `O(N) (o O(N log N) si primero ordenas)`
- **Complejidad Temporal Peor Caso:** `O(N)`
- **Complejidad Espacial:** `O(1) espacio auxiliar`
- **Nota Técnica:** Cada paso mueve al menos uno de los dos punteros, haciendo como máximo N iteraciones.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Identificar si los punteros deben empezar en `(0, n-1)` (convergentes) o en `(0, 0)` (misma dirección).
2. Definir la condición invariante que decide qué puntero debe moverse en cada iteración.
3. Asegurar que en cada paso del `while (left < right)` al menos un puntero avance para evitar ciclos infinitos.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En problemas como `3Sum`, olvidar saltar valores duplicados (`while left < right and nums[left] == nums[left-1]: left += 1`), generando tripletas repetidas.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def two_pointers_converging(nums: list[int], target: int) -> list[int]:
    """
    Modalidad 1: Punteros convergentes en un arreglo ORDENADO.
    Tiempo: O(N) | Espacio: O(1)
    """
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1   # Necesitamos una suma más grande
        else:
            right -= 1  # Necesitamos una suma más pequeña
    return []


def remove_duplicates_inplace(nums: list[int]) -> int:
    """
    Modalidad 2: Punteros en la misma dirección (Write / Read).
    """
    if not nums:
        return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write
```

### Plantilla en TypeScript / JavaScript
```typescript
export function twoPointersConverging(nums: number[], target: number): number[] {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] De O(N²) a O(N) con dos índices
- **🎬 Visual en Pantalla / Slide:** Dos flechas (L y R) en los extremos de un arreglo ordenado convergiendo al centro.
- **🎙️ Narración / Guion:**
  > "Si el arreglo está ordenado, revisar todos los pares con un doble bucle es desperdiciar información. Con Dos Punteros en los extremos, cada suma fallida nos dice con certeza matemática cuál extremo debemos descartar."

### ⏱️ [01:30 - 04:30] Las 2 variantes: Convergentes vs Lector/Escritor
- **🎬 Visual en Pantalla / Slide:** Pantalla dividida mostrando Container With Most Water arriba y Remove Duplicates abajo.
- **🎙️ Narración / Guion:**
  > "No todos los Dos Punteros vienen de extremos opuestos. Cuando te piden limpiar un arreglo in-place sin crear otro nuevo, el puntero lector explora hacia adelante mientras el puntero escritor guarda solo los elementos válidos."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#167. Two Sum II - Input Array Is Sorted** | `Medium` | [https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Punteros `left` al inicio y `right` al final aprovechando el orden ascendente. |
| **#15. 3Sum** | `Medium` | [https://leetcode.com/problems/3sum/](https://leetcode.com/problems/3sum/) | Ordena el arreglo, fija `i` y ejecuta Two Pointers en `i+1 ... n-1` saltando duplicados. |
| **#11. Container With Most Water** | `Medium` | [https://leetcode.com/problems/container-with-most-water/](https://leetcode.com/problems/container-with-most-water/) | Mueve siempre el puntero que tenga la pared más baja, porque es el cuello de botella del área. |

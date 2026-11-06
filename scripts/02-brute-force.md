# 🎬 Episodio #02: Brute Force (Fuerza Bruta)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 1 — Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Brute Force & Exhaustive Search`  
> **Prerrequisitos Recomendados:** Basic DSA & Big-O

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica por qué la Fuerza Bruta NO es un 'mal algoritmo', sino el primer escalón indispensable en una entrevista técnica. Muestra cómo verbalizar la solución de fuerza bruta ante un entrevistador te da claridad para descubrir el cuello de botella.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Brute Force", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (N ≤ 200 para triple bucle | N ≤ 2000 para doble bucle) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Brute Force?
Probar sistemáticamente todas las posibilidades candidatas y verificar cuáles cumplen la condición. Es el punto de partida obligatorio en toda entrevista antes de optimizar.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Abrir un candado de combinación de 3 dígitos probando desde el 000 hasta el 999 uno por uno. No es elegante, pero garantiza al 100% que encontrarás la combinación correcta y te permite entender las reglas del candado.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En una entrevista, mencionar primero la fuerza bruta demuestra estructura mental y asegura que entendiste el problema.
2. **Idea Clave #2:** Toda optimización (Hash Map, Sliding Window, DP) nace de preguntarse: '¿qué cálculo estoy repitiendo innecesariamente en mi fuerza bruta?'

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Brute Force)
- ✅ Cuando N es muy pequeño (ej. N ≤ 100 para O(N²) o N ≤ 10 para O(N!)).
- ✅ Durante los primeros 2 minutos de una entrevista para establecer una solución base correcta (baseline) y luego identificar qué trabajo repetido puedes optimizar.
- ✅ Para generar tests pequeños y verificar que tu algoritmo optimizado da la misma respuesta.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Cuando N ≥ 10⁴ y tu fuerza bruta requiere revisar todos los pares O(N²) o subconjuntos O(2ᴺ).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `N ≤ 200 para triple bucle | N ≤ 2000 para doble bucle`
- **Complejidad Temporal Promedio:** `O(N²) o O(N³) en pares/tripletas`
- **Complejidad Temporal Peor Caso:** `O(2ᴺ) o O(N!) en combinatoria`
- **Complejidad Espacial:** `O(1) si solo iteramos con índices`
- **Nota Técnica:** Depende del tamaño del espacio de búsqueda.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Definir qué forma tiene una 'solución candidata' (un par de índices, un subarreglo, una asignación).
2. Escribir los ciclos anidados que enumeran todos los candidatos sin repetir (`j = i + 1`).
3. Validar cada candidato y actualizar la respuesta óptima.
4. Identificar el bucle más interno para optimizarlo con una estructura de datos.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Empezar `j` desde `0` en vez de `i + 1`, usando el mismo elemento dos veces o contando pares duplicados.
- 🚨 **Trampa de Entrevista:** Quedarse callado en la entrevista intentando buscar la solución O(N) mágica sin antes enunciar la O(N²).

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def two_sum_brute_force(nums: list[int], target: int) -> list[int]:
    """
    Revisa absolutamente todos los pares (i, j) con i < j.
    Tiempo: O(N^2) | Espacio: O(1)
    """
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
```

### Plantilla en TypeScript / JavaScript
```typescript
export function twoSumBruteForce(nums: number[], target: number): number[] {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:00] El mito de que Fuerza Bruta es fracasar
- **🎬 Visual en Pantalla / Slide:** Comparación entre un candidato bloqueado en silencio vs uno que plantea el baseline en 30 segundos.
- **🎙️ Narración / Guion:**
  > "Muchos creen que mencionar Fuerza Bruta en una entrevista resta puntos. En realidad, es todo lo contrario: es tu brújula para descubrir dónde está el trabajo repetido."

### ⏱️ [01:00 - 03:30] Anatomía de la enumeración de pares y tripletas
- **🎬 Visual en Pantalla / Slide:** Animación de índices i y j recorriendo una cuadrícula triangular superior.
- **🎙️ Narración / Guion:**
  > "Cuando recorremos pares con i desde 0 y j desde i+1, exploramos N*(N-1)/2 combinaciones. Al ver ese bucle interno buscando un complemento, se vuelve obvio por qué existen los Hash Maps y los Dos Punteros."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#1. Two Sum** | `Easy` | [https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/) | Empieza con el doble bucle O(N²) y nota que la búsqueda interna de `target - nums[i]` se puede acelerar. |
| **#1534. Count Good Triplets** | `Easy` | [https://leetcode.com/problems/count-good-triplets/](https://leetcode.com/problems/count-good-triplets/) | Con N ≤ 100, el triple bucle O(N³) es la solución directa esperada. |
| **#2367. Number of Arithmetic Triplets** | `Easy` | [https://leetcode.com/problems/number-of-arithmetic-triplets/](https://leetcode.com/problems/number-of-arithmetic-triplets/) | Compara fuerza bruta O(N³) contra búsqueda en conjunto. |

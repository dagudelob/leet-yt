# 🎬 Episodio #01: Basic DSA & Big-O Complexity
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 1 — Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Basic DSA & Time/Space Complexity`  
> **Prerrequisitos Recomendados:** Ninguno (Punto de partida de la serie)

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Enfoca este episodio como el Episodio #01 de la serie 'Leet-YT'. Explica con entusiasmo cómo funciona el Flowchart de Decisión de Algoritmos y revela el 'secreto de las restricciones N': cómo al mirar el tamaño del input en LeetCode puedes descartar el 80% de los algoritmos incorrectos antes de programar.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Basic DSA & Big-O", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (N ≤ 20 → O(2ᴺ) | N ≤ 10³ → O(N²) | N ≤ 10⁵ → O(N log N) o O(N) | N ≥ 10⁹ → O(log N) o O(1)) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Basic DSA & Big-O?
El mapa maestro antes de escribir una sola línea de código: cómo leer las restricciones (constraints N) de un problema de LeetCode para deducir en 5 segundos qué complejidad temporal (Big-O) y qué familia de algoritmos necesitas.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Imagina que debes entregar paquetes en una ciudad. Si son 10 paquetes (N ≤ 10), puedes ir caminando en cualquier orden (O(N!)). Si son 100,000 paquetes (N ≤ 10⁵), ir de uno en uno comparando todos contra todos (O(N²)) te tomaría meses: necesitas una ruta lineal (O(N)) o clasificada por código postal (O(N log N)). Las restricciones del problema son el presupuesto de tiempo que te da el juez.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** No memorices miles de soluciones; aprende a leer las señales del enunciado.
2. **Idea Clave #2:** La regla de 10⁸ operaciones por segundo conecta el tamaño del input N con la complejidad Big-O máxima permitida.
3. **Idea Clave #3:** La complejidad espacial incluye la pila de llamadas (call stack) cuando usas recursión.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Basic DSA & Big-O)
- ✅ Siempre como Paso 0 antes de resolver cualquier problema de entrevista o programación competitiva.
- ✅ Cuando ves el límite de N en el enunciado (ej. N ≤ 10⁵ significa que O(N²) dará Time Limit Exceeded - TLE).
- ✅ Para decidir si vale la pena gastar memoria extra O(N) a cambio de bajar el tiempo de O(N²) a O(N).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ No optimices prematuramente a O(N) complicado si N ≤ 50 y una solución limpia O(N²) o O(N³) pasa en 2 milisegundos.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `N ≤ 20 → O(2ᴺ) | N ≤ 10³ → O(N²) | N ≤ 10⁵ → O(N log N) o O(N) | N ≥ 10⁹ → O(log N) o O(1)`
- **Complejidad Temporal Promedio:** `O(1) < O(log N) < O(N) < O(N log N)`
- **Complejidad Temporal Peor Caso:** `O(N²) < O(2ᴺ) < O(N!)`
- **Complejidad Espacial:** `O(1) Auxiliar a O(N) según estructura o pila de recursión`
- **Nota Técnica:** Regla de oro: una CPU moderna ejecuta ~10⁸ operaciones simples por segundo.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Leer el enunciado e identificar el tipo de dato de entrada (Array, String, Árbol, Grafo).
2. Bajar inmediatamente a la sección 'Constraints' y mirar el valor máximo de N.
3. Cruzar el valor de N con la tabla de complejidades para fijar tu techo de Big-O.
4. Usar el Flowchart de Leet-YT para elegir la estructura de datos y el patrón exacto.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Ignorar el costo oculto de operaciones como slicing `arr[i:j]` o concatenación de strings dentro de un bucle, que convierten un O(N) aparente en O(N²).
- 🚨 **Trampa de Entrevista:** Olvidar que la recursión de profundidad N consume O(N) de memoria en el Call Stack.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def analyze_constraints(n: int) -> str:
    """
    Traductor de restricciones N -> Complejidad objetivo en LeetCode.
    Regla práctica: ~10^8 operaciones máximas por segundo.
    """
    if n <= 11:
        return "O(N!) - Permutaciones / Backtracking exhaustivo"
    elif n <= 20:
        return "O(2^N) o O(N * 2^N) - Backtracking / Bitmask DP"
    elif n <= 500:
        return "O(N^3) - Floyd-Warshall / DP de intervalos"
    elif n <= 5_000:
        return "O(N^2) - Doble bucle / DP 2D"
    elif n <= 200_000:
        return "O(N log N) o O(N) - Sorting, Heap, Two Pointers, Sliding Window, Hash"
    else:
        return "O(log N) o O(1) - Binary Search, Math / Number Theory"
```

### Plantilla en TypeScript / JavaScript
```typescript
export function analyzeConstraints(n: number): string {
  // Regla práctica: ~10^8 operaciones simples por segundo
  if (n <= 11) return "O(N!) - Permutaciones / Backtracking";
  if (n <= 20) return "O(2^N) - Subconjuntos / Bitmask DP";
  if (n <= 500) return "O(N^3) - DP Cúbica / Floyd-Warshall";
  if (n <= 5000) return "O(N^2) - Doble ciclo / DP 2D";
  if (n <= 200000) return "O(N log N) u O(N) - Sorting, Heap, Two Pointers, Hash";
  return "O(log N) u O(1) - Binary Search o Fórmula Matemática";
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:15] Gancho: Por qué fallamos en LeetCode
- **🎬 Visual en Pantalla / Slide:** Mostrar el Flowchart completo de Leet-YT iluminándose desde la raíz.
- **🎙️ Narración / Guion:**
  > "¿Alguna vez abriste un problema de entrevista, te quedaste mirando la pantalla en blanco y pensaste 'por dónde empiezo'? El error número uno es intentar adivinar el código sin antes leer las pistas que el propio problema te regala."

### ⏱️ [01:15 - 03:30] La Regla de Oro: El Truco de las Constraints (N)
- **🎬 Visual en Pantalla / Slide:** Tabla animada comparando N <= 20, N <= 10^3, N <= 10^5 y N <= 10^9 contra tiempos de ejecución.
- **🎙️ Narración / Guion:**
  > "Los servidores de evaluación ejecutan cerca de cien millones de operaciones por segundo. Eso significa que si el problema dice que N llega a cien mil (10^5), un doble ciclo anidado hará diez mil millones de operaciones y dará Time Limit Exceeded. Solo con ver N <= 10^5 ya sabes que necesitas O(N) u O(N log N)."

### ⏱️ [03:30 - 06:00] Cómo usar este Flowchart y Roadmap
- **🎬 Visual en Pantalla / Slide:** Recorrido visual por los 7 niveles del proyecto y cierre con llamada a la acción.
- **🎙️ Narración / Guion:**
  > "En esta serie recorreremos los 46 bloques fundamentales: desde Arrays y Dos Punteros hasta Programación Dinámica y Árboles de Segmentos. Cada video desbloquea un nodo del Flowchart."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#1480. Running Sum of 1d Array** | `Easy` | [https://leetcode.com/problems/running-sum-of-1d-array/](https://leetcode.com/problems/running-sum-of-1d-array/) | Compara recalcular desde cero O(N²) vs acumular en un pase O(N). |
| **#412. Fizz Buzz** | `Easy` | [https://leetcode.com/problems/fizz-buzz/](https://leetcode.com/problems/fizz-buzz/) | Recorrido lineal O(N) y uso de memoria de salida. |
| **#1342. Number of Steps to Reduce a Number to Zero** | `Easy` | [https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/](https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/) | Dividir entre 2 repetidamente introduce complejidad logarítmica O(log N). |

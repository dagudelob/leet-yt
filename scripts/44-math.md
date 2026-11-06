# 🎬 Episodio #44: Math & Geometry (Matemáticas, Combinatoria y Geometría)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 7 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Math, Combinatorics & Computational Geometry`  
> **Prerrequisitos Recomendados:** Basic DSA & Big-O → Arrays

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Enseña las herramientas matemáticas que salvan entrevistas: 1) Cómo contar pares `N*(N-1)//2` y subarreglos `L*(L+1)//2` al instante, 2) Exponenciación Binaria (`Pow(x, n)`) en O(log N), y 3) La regla de oro en Geometría Computacional: 'El punto flotante es tu enemigo; usa distancias al cuadrado y pendientes reducidas con GCD'.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Math & Geometry", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (N ≥ 10⁹ exigiendo O(1)/O(log N), conteo combinatorio o puntos en el plano 2D) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Math & Geometry?
Reemplazar simulaciones lentas por fórmulas cerradas en O(1) u O(log N): series aritméticas de Gauss, combinatoria ($nCr$), exponenciación rápida (`pow(x, n)` en O(log N)), pendientes representadas como fracciones irreducibles `(dy // g, dx // g)` y producto cruz en geometría 2D.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Cuando el profesor le pidió al niño Carl Friedrich Gauss sumar los números del 1 al 100 para mantenerlo ocupado una hora, en lugar de sumar uno por uno (O(N)), emparejó `1+100 = 101`, `2+99 = 101`... 50 parejas de 101 = `5050` en un segundo (O(1)).

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En un grupo de `K` elementos iguales, el número de pares que puedes formar es `K * (K - 1) // 2`.
2. **Idea Clave #2:** En un segmento válido de longitud `L`, el número de subarreglos contiguos contenidos es `L * (L + 1) // 2`.
3. **Idea Clave #3:** Para comparar distancias en el plano, compara `dx*dx + dy*dy` con enteros en vez de `sqrt(dx*dx + dy*dy)`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Math & Geometry)
- ✅ Sumas de series (`n * (n + 1) // 2`), conteo de pares (`n * (n - 1) // 2`) o caminos en cuadrícula con combinatoria $inom{m+n-2}{m-1}$.
- ✅ **Exponenciación Binaria**: Calcular $x^n$ en $O(\log n)$ usando que $x^{2k} = (x^2)^k$.
- ✅ **Geometría 2D**: Colinealidad de puntos (`Max Points on a Line`), orientación de giros con **Producto Cruz** y distancias euclidianas al cuadrado (`dx² + dy²` sin usar `sqrt` para evitar errores de punto flotante).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ ¡NUNCA dividas flotantes `dy / dx` para usar pendientes como llaves de un Hash Map! `0.1 + 0.2 != 0.3` en IEEE 754 y la división por cero falla en líneas verticales. Simplifica siempre por el `gcd(dy, dx)` y guarda la tupla entera `(dy // g, dx // g)`.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `N ≥ 10⁹ exigiendo O(1)/O(log N), conteo combinatorio o puntos en el plano 2D`
- **Complejidad Temporal Promedio:** `Fórmulas de Gauss: O(1) | Binary Exponentiation: O(log N)`
- **Complejidad Temporal Peor Caso:** `O(log N)`
- **Complejidad Espacial:** `O(1)`
- **Nota Técnica:** Evita `math.sqrt` y `float` siempre que puedas comparar distancias al cuadrado con enteros exactos.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Verificar si una simulación O(N) se puede colapsar en una división, módulo o suma de Gauss O(1).
2. En potencias grandes, elevar la base al cuadrado y dividir el exponente entre 2 en cada iteración.
3. En problemas de rectas y puntos, representar cada dirección como `(dy // gcd, dx // gcd)`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Usar `dy / dx` en punto flotante para agrupar puntos colineales: falla con `ZeroDivisionError` en rectas verticales y por pérdida de precisión en números grandes.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
import math

def fast_power(x: float, n: int) -> float:
    """
    1. Exponenciación Binaria (Pow(x, n)) en O(log N).
    Si n es par: x^n = (x * x)^(n // 2).
    """
    if n < 0:
        x = 1.0 / x
        n = -n
    res = 1.0
    while n > 0:
        if n & 1:
            res *= x
        x *= x
        n >>= 1
    return res


def normalized_slope(p1: list[int], p2: list[int]) -> tuple[int, int]:
    """
    2. Pendiente Exacta en Geometría sin punto flotante (para usar en Hash Map).
    Reduce (dy, dx) por su Máximo Común Divisor y normaliza el signo.
    """
    dy = p2[1] - p1[1]
    dx = p2[0] - p1[0]
    if dx == 0:
        return (1, 0)
    if dy == 0:
        return (0, 1)
    if dx < 0:
        dx, dy = -dx, -dy
    g = math.gcd(abs(dy), abs(dx))
    return (dy // g, dx // g)
```

### Plantilla en TypeScript / JavaScript
```typescript
export function fastPower(x: number, n: number): number {
  let exp = BigInt(n);
  if (exp < 0n) {
    x = 1 / x;
    exp = -exp;
  }
  let res = 1;
  while (exp > 0n) {
    if ((exp & 1n) === 1n) res *= x;
    x *= x;
    exp >>= 1n;
  }
  return res;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] El atajo de Gauss y el conteo instantáneo de pares y subarreglos
- **🎬 Visual en Pantalla / Slide:** Triángulo de pares mostrando por qué `1 + 2 + ... + (N-1) = N*(N-1)/2`.
- **🎙️ Narración / Guion:**
  > "Muchas veces ya encontraste los grupos válidos con un Hash Map o una ventana deslizante, y para rematar el problema solo necesitas contar cuántos pares o subarreglos se forman sin hacer un bucle extra. La fórmula de Gauss `N*(N-1)//2` lo resuelve en O(1)."

### ⏱️ [01:45 - 04:30] Exponenciación Binaria O(log N) y Geometría libre de punto flotante
- **🎬 Visual en Pantalla / Slide:** Cálculo de `x^1024` en solo 10 multiplicaciones y reducción de fracción `(dy, dx)` por su GCD.
- **🎙️ Narración / Guion:**
  > "En geometría para entrevistas hay un mandamiento: aléjate de los números decimales siempre que puedas. Representar una pendiente como una fracción simplificada por su Máximo Común Divisor elimina tanto la división por cero como los errores de redondeo."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#50. Pow(x, n)** | `Medium` | [https://leetcode.com/problems/powx-n/](https://leetcode.com/problems/powx-n/) | Exponenciación binaria dividiendo el exponente `n` entre 2 en cada paso en O(log N). |
| **#149. Max Points on a Line** | `Hard` | [https://leetcode.com/problems/max-points-on-a-line/](https://leetcode.com/problems/max-points-on-a-line/) | Para cada punto base, agrupa los demás en un Hash Map usando la pendiente entera reducida `(dy // gcd, dx // gcd)`. |
| **#62. Unique Paths** | `Medium` | [https://leetcode.com/problems/unique-paths/](https://leetcode.com/problems/unique-paths/) | Además de DP, es combinatoria pura: elegir dónde van los `m-1` pasos hacia abajo entre `(m-1) + (n-1)` pasos totales: `math.comb(m + n - 2, m - 1)`. |

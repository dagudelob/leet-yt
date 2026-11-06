# 🎬 Episodio #43: Bit Manipulation (Manipulación de Bits y Trucos XOR)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 7 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Bit Manipulation & XOR Tricks`  
> **Prerrequisitos Recomendados:** Basic DSA & Big-O → Arrays

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Haz un recorrido ágil y memorable por los 4 superpoderes de la manipulación de bits: 1) Las 3 leyes del XOR (`x ^ 0 = x`, `x ^ x = 0`, y que el orden no importa), 2) `n & (n - 1)` de Brian Kernighan para apagar el último 1 y detectar potencias de 2, 3) `n & -n` para aislar el último 1, y 4) Desplazamientos `1 << k` y `(n >> k) & 1`.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Bit Manipulation", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Tiempo O(N) con restricción estricta de Espacio O(1), XOR o potencias de 2) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Bit Manipulation?
Operar directamente sobre la representación binaria de los números en los registros de la CPU (`&`, `|`, `^`, `~`, `<<`, `>>`) para lograr algoritmos en O(1) espacio y máxima velocidad.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** El operador XOR (`^`) es como un interruptor de luz de escalera: si lo presionas dos veces con el mismo número (`x ^ x`), vuelve a quedar apagado (`0`). Por eso, si aplicas XOR a una lista donde todos los números vienen en pareja menos uno, todas las parejas se cancelan entre sí y queda encendido únicamente el número solitario.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** XOR (`^`) es una suma en base 2 sin acarreo: sumar dos veces lo mismo vuelve a dar cero.
2. **Idea Clave #2:** `n & (n - 1)` borra el bit `1` más a la derecha; si un número positivo era potencia de 2 (tenía un solo bit `1`), al hacer `n & (n - 1)` queda en `0`.
3. **Idea Clave #3:** En Python los enteros tienen precisión arbitraria (infinitos bits), por lo que al simular enteros de 32 bits con signo en problemas como `Sum of Two Integers` se usa una máscara `MASK = 0xFFFFFFFF`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Bit Manipulation)
- ✅ **Propiedades de XOR (`^`)**: Encontrar el único elemento que no se repite (`Single Number`: `x ^ x = 0` y `x ^ 0 = x`) o el número faltante en `0..N`.
- ✅ **Truco de Brian Kernighan (`n & (n - 1)`)**: Apagar el bit `1` más a la derecha para contar cuántos bits encendidos tiene un número (`Counting Bits`) o verificar en O(1) si `n` es potencia de 2 (`n > 0 and (n & (n - 1)) == 0`).
- ✅ **Aislar el último bit encendido (`n & -n`)**: Separar dos números únicos (`Single Number III`) o moverse en un Fenwick Tree.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ No sacrifiques legibilidad con trucos oscuros de bits si una operación aritmética normal tiene la misma complejidad y es más clara.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Tiempo O(N) con restricción estricta de Espacio O(1), XOR o potencias de 2`
- **Complejidad Temporal Promedio:** `O(1) por operación de bit | O(N) en barrido sobre arreglo`
- **Complejidad Temporal Peor Caso:** `O(1) para enteros de 32/64 bits`
- **Complejidad Espacial:** `O(1) registros de CPU`
- **Nota Técnica:** `n & (n - 1)` salta directamente entre bits encendidos sin revisar los ceros intermedios.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Para leer el bit `k`: `(n >> k) & 1`.
2. Para encender el bit `k`: `n | (1 << k)`.
3. Para apagar el bit `k`: `n & ~(1 << k)`.
4. Para invertir (toggle) el bit `k`: `n ^ (1 << k)`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En Python, aplicar `~n` o desplazamientos a negativos esperando comportamiento de 32 bits con overflow automático (como en C++/Java): en Python los enteros no desbordan a 32 bits a menos que apliques `& 0xFFFFFFFF`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def bit_manipulation_essentials(nums: list[int], n: int) -> tuple[int, bool, int]:
    """
    Los 3 Trucos Fundamentales de Bits para Entrevistas:
    """
    # 1. XOR cancela duplicados: x ^ x = 0, x ^ 0 = x
    single = 0
    for x in nums:
        single ^= x

    # 2. ¿Es 'n' una potencia exacta de 2? (Solo tiene un único bit '1' encendido)
    is_power_of_two = n > 0 and (n & (n - 1)) == 0

    # 3. Algoritmo de Brian Kernighan: contar bits '1' apagando el último bit en cada paso
    ones_count = 0
    temp = n
    while temp > 0:
        temp &= temp - 1  # Apaga el bit '1' menos significativo
        ones_count += 1

    return single, is_power_of_two, ones_count
```

### Plantilla en TypeScript / JavaScript
```typescript
export function singleNumberXor(nums: number[]): number {
  let ans = 0;
  for (const x of nums) {
    ans ^= x;
  }
  return ans;
}

export function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] La magia del XOR: Cómo encontrar una aguja en un pajar con O(1) de memoria
- **🎬 Visual en Pantalla / Slide:** Parejas de números iguales chocando con XOR y convirtiéndose en 0, dejando solo al número único.
- **🎙️ Narración / Guion:**
  > "Cuando un problema te pide encontrar el único número que no tiene pareja en tiempo lineal pero te prohíbe usar un Hash Set exigiendo memoria O(1), la respuesta está en los bits: el operador XOR cancela cualquier número repetido un número par de veces."

### ⏱️ [01:45 - 04:15] El truco de Brian Kernighan: `n & (n - 1)`
- **🎬 Visual en Pantalla / Slide:** El binario `10100` restando 1 (`10011`) y haciendo AND para apagar el último 1 (`10000`).
- **🎙️ Narración / Guion:**
  > "Restar 1 a un número binario invierte todos los bits desde el último 1 hacia la derecha. Por eso, al hacer `n & (n - 1)` apagas de un solo golpe el bit encendido más bajo."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#136. Single Number** | `Easy` | [https://leetcode.com/problems/single-number/](https://leetcode.com/problems/single-number/) | Acumula el XOR de todos los números: las parejas dan `0` y sobrevive el único solitario en O(1) espacio. |
| **#191. Number of 1 Bits** | `Easy` | [https://leetcode.com/problems/number-of-1-bits/](https://leetcode.com/problems/number-of-1-bits/) | Repite `n &= n - 1` contando cuántos pasos toma llegar a 0. |
| **#338. Counting Bits** | `Easy` | [https://leetcode.com/problems/counting-bits/](https://leetcode.com/problems/counting-bits/) | DP + Bits: `dp[i] = dp[i >> 1] + (i & 1)` o `dp[i] = dp[i & (i - 1)] + 1`. |

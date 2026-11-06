# 🎬 Episodio #07: Sliding Window (Ventana Deslizante)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 1 — Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Sliding Window (Fixed & Dynamic)`  
> **Prerrequisitos Recomendados:** Arrays → Strings → Two Pointers

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Presenta la 'Plantilla Universal de 3 Pasos de Sliding Window' (1. Expandir con `right`, 2. Contraer con `while` desde `left`, 3. Actualizar respuesta). Explica la diferencia entre buscar la ventana MÁS LARGA (actualizar fuera del while) vs la ventana MÁS CORTA (actualizar dentro del while), y por qué el `while` dentro del `for` sigue siendo O(N) y no O(N²).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Sliding Window", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Subarray/Substring contiguo óptimo con N ≤ 10⁵ (y valores no negativos si es por suma)) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Sliding Window?
Mantener un subsegmento contiguo `[left..right]` que se desliza sobre un arreglo o string como una oruga: se expande por la derecha (`right++`) y se contrae por la izquierda (`left++`) reutilizando el cálculo anterior en O(N).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Una oruga avanzando por una rama: estira la cabeza hacia adelante (`right`) para comer hojas mientras la ventana sea válida, y cuando se pasa del límite permitido, encoge la cola (`left`) hasta volver a cumplir la regla, sin volver a contar las hojas del medio.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Palabra clave en el enunciado: 'subarray contiguo' o 'substring' + 'más largo / más corto / suma máxima'.
2. **Idea Clave #2:** Complejidad O(N) amortizada: ningún elemento entra más de una vez por `right` ni sale más de una vez por `left`.
3. **Idea Clave #3:** Diferencia clave: en ventana máxima encoges cuando es INVÁLIDA; en ventana mínima encoges mientras sea VÁLIDA para exprimir su tamaño.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Sliding Window)
- ✅ El problema pide el subarreglo o substring CONTIGUO más largo, más corto o de suma máxima/mínima que cumpla cierta condición.
- ✅ Ventana de tamaño fijo `K`: 'encuentra el promedio/suma máxima de cualquier subarreglo de longitud K'.
- ✅ Ventana de tamaño dinámico: 'el substring más largo sin caracteres repetidos' o 'con a lo sumo K ceros'.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ ¡CUIDADO! Si el arreglo tiene números NEGATIVOS y buscas una suma objetivo o ventana válida por suma, agregar un elemento a la derecha puede disminuir la suma en vez de aumentarla, rompiendo la monotonía de Sliding Window (ahí usa Prefix Sum + Hash Map o Monotonic Deque).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Subarray/Substring contiguo óptimo con N ≤ 10⁵ (y valores no negativos si es por suma)`
- **Complejidad Temporal Promedio:** `O(N)`
- **Complejidad Temporal Peor Caso:** `O(N)`
- **Complejidad Espacial:** `O(1) o O(K) para el mapa de frecuencias de la ventana`
- **Nota Técnica:** Aunque hay un `while` dentro de un `for`, tanto `left` como `right` avanzan como máximo N veces en total (2N pasos = O(N)).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Inicializar `left = 0`, el estado de la ventana (suma o diccionario de conteo) y la variable de mejor respuesta.
2. Iterar `right` de `0` a `N-1` agregando el elemento `nums[right]` al estado de la ventana.
3. Usar un ciclo `while` para avanzar `left` y restar `nums[left]` cuando la ventana necesita ajustarse.
4. Calcular el tamaño de la ventana con la fórmula `right - left + 1`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Intentar usar Sliding Window de suma cuando el arreglo tiene números negativos (ej. LeetCode 560 Subarray Sum Equals K). Con negativos, usa Prefix Sum + Hash Map.
- 🚨 **Trampa de Entrevista:** Equivocarse por 1 en el tamaño de la ventana: la cantidad de elementos entre `left` y `right` inclusive es `right - left + 1`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def sliding_window_dynamic(s: str) -> int:
    """
    Plantilla Universal de Sliding Window Dinámica (ej. Longest Substring Without Repeating Chars).
    Tiempo: O(N) | Espacio: O(alfabeto)
    """
    window_counts: dict[str, int] = {}
    left = 0
    max_len = 0

    for right, ch in enumerate(s):
        # 1. Expandir la ventana incluyendo s[right]
        window_counts[ch] = window_counts.get(ch, 0) + 1

        # 2. Contraer desde 'left' mientras la ventana viole la condición
        while window_counts[ch] > 1:
            left_ch = s[left]
            window_counts[left_ch] -= 1
            left += 1

        # 3. Actualizar la mejor respuesta con la ventana válida [left..right]
        max_len = max(max_len, right - left + 1)

    return max_len
```

### Plantilla en TypeScript / JavaScript
```typescript
export function slidingWindowDynamic(s: string): number {
  const counts = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    counts.set(ch, (counts.get(ch) ?? 0) + 1);

    // Contraer mientras la condición sea inválida
    while ((counts.get(ch) ?? 0) > 1) {
      const leftCh = s[left];
      counts.set(leftCh, (counts.get(leftCh) ?? 1) - 1);
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] La Oruga: Por qué no recalcular desde cero
- **🎬 Visual en Pantalla / Slide:** Marco luminoso deslizándose sobre un arreglo: entra el elemento derecho y sale el izquierdo.
- **🎙️ Narración / Guion:**
  > "Si calculas la suma de cinco elementos y luego te mueves un paso a la derecha, ¿para qué volver a sumar los cuatro del medio? Solo suma el que entra por la derecha y resta el que sale por la izquierda. Eso es Sliding Window."

### ⏱️ [01:30 - 04:30] La Plantilla Universal de Ventana Dinámica
- **🎬 Visual en Pantalla / Slide:** Código con los 3 bloques numerados: Expandir, Contraer y Actualizar.
- **🎙️ Narración / Guion:**
  > "El 95% de los problemas de ventana deslizante caen con la misma plantilla de diez líneas: un bucle for para avanzar right, y un while interno que avanza left solo cuando rompemos la regla."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#3. Longest Substring Without Repeating Characters** | `Medium` | [https://leetcode.com/problems/longest-substring-without-repeating-characters/](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Expande `right` y encoge `left` mientras el carácter recién agregado tenga frecuencia > 1. |
| **#209. Minimum Size Subarray Sum** | `Medium` | [https://leetcode.com/problems/minimum-size-subarray-sum/](https://leetcode.com/problems/minimum-size-subarray-sum/) | Para ventana MÍNIMA, actualiza la respuesta DENTRO del `while` mientras la condición se cumpla y encoge `left`. |
| **#424. Longest Repeating Character Replacement** | `Medium` | [https://leetcode.com/problems/longest-repeating-character-replacement/](https://leetcode.com/problems/longest-repeating-character-replacement/) | La ventana es válida si `(right - left + 1) - max_frecuencia <= k`. |

# 🎬 Episodio #13: Binary Search (Búsqueda Binaria y Espacio de Respuestas)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 2 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Binary Search & Monotonic Search Space`  
> **Prerrequisitos Recomendados:** Arrays → Basic DSA & Big-O

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Revoluciona la forma en que el oyente entiende Binary Search: deja claro que NO se trata solo de buscar un número en un arreglo, sino de encontrar la frontera entre `False` y `True` en cualquier función monótona (la plantilla `first_true_idx` de AlgoMonster). Explica con el ejemplo de 'Koko Eating Bananas' cómo hacer Binary Search sobre el espacio de respuestas.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Binary Search", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Arreglo ordenado o 'Minimiza el máximo / Maximiza el mínimo' con función factible monótona) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Binary Search?
Dividir repetidamente a la mitad un espacio de búsqueda en O(log N). No solo sirve para buscar un número en un arreglo ordenado: funciona sobre CUALQUIER condición monótona `[False, False, ..., True, True]`, incluyendo buscar la respuesta óptima ('Binary Search on Answer').

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Adivinar un número del 1 al 1,000,000 cuando te dicen 'más alto' o 'más bajo', o probar a partir de qué piso de un edificio de 100 pisos se rompe un cristal: empiezas en el piso 50; si se rompe, sabes que del 51 al 100 también se romperá y buscas abajo; si resiste, buscas arriba. En solo 20 preguntas resuelves un millón de opciones.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En vez de memorizar 5 variantes distintas de `while (l < r)` vs `while (l <= r)` que dan ciclos infinitos, usa siempre la plantilla de 'guardar el mejor candidato `ans = mid` y mover `high = mid - 1`'.
2. **Idea Clave #2:** Siempre que un problema pida 'el mínimo X para lograr Y' y si funciona con X también funciona con X+1, estás ante Binary Search on Answer.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Binary Search)
- ✅ El arreglo está ordenado (o rotado) y necesitas buscar un elemento o el primer índice `>= target` (`lower_bound`).
- ✅ El problema pide 'el MÍNIMO X tal que sea posible hacer Y' o 'el MÁXIMO X tal que se cumpla Y' y existe una función `es_factible(x)` monótona (`Binary Search on Answer`).
- ✅ La restricción es enorme (`N ≤ 10⁵` con verificación `O(N)` → total `O(N log(Rango))`, o `N ≥ 10⁹` → `O(log N)`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Cuando la propiedad no es monótona (saber qué pasa en `mid` no te da ninguna certeza para descartar la mitad izquierda ni la mitad derecha).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Arreglo ordenado o 'Minimiza el máximo / Maximiza el mínimo' con función factible monótona`
- **Complejidad Temporal Promedio:** `O(log N) en arreglo | O(N log(Max - Min)) en Binary Search on Answer`
- **Complejidad Temporal Peor Caso:** `O(log N)`
- **Complejidad Espacial:** `O(1) iterativo`
- **Nota Técnica:** Para N = 1,000,000,000 (`10⁹`), `log₂(N)` son apenas ~30 iteraciones.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Definir el rango posible de respuestas `[low, high]` (en un arreglo es `[0, n-1]`; en espacio de respuestas es `[min_posible, max_posible]`).
2. Escribir la función booleana `is_feasible(mid)` que responde si con `mid` se cumple la condición.
3. Si `is_feasible(mid)` es `True`, guardar `ans = mid` y probar si se puede mejorar (`high = mid - 1`). Si es `False`, hacer `low = mid + 1`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Quedar atrapado en un bucle infinito con `mid = (l + r) // 2` y `l = mid`. Usando `ans = mid` con `low = mid + 1` y `high = mid - 1` el rango se encoge en TODAS las iteraciones sin excepción.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def binary_search_first_true(low: int, high: int, is_feasible) -> int:
    """
    Plantilla Maestra de AlgoMonster: Encontrar el PRIMER valor donde is_feasible(mid) es True.
    Patrón del dominio: [False, False, False, True, True, True]
                                              ^-- Queremos este primer True
    """
    first_true_idx = -1
    while low <= high:
        mid = low + (high - low) // 2
        if is_feasible(mid):
            first_true_idx = mid   # Guardamos candidato válido
            high = mid - 1         # Intentamos encontrar uno aún más a la izquierda (menor)
        else:
            low = mid + 1          # No alcanza, necesitamos un valor mayor
    return first_true_idx
```

### Plantilla en TypeScript / JavaScript
```typescript
export function binarySearchFirstTrue(
  low: number,
  high: number,
  isFeasible: (mid: number) => boolean
): number {
  let firstTrueIdx = -1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (isFeasible(mid)) {
      firstTrueIdx = mid; // Candidato válido encontrado
      high = mid - 1;     // Buscar si existe uno menor a la izquierda
    } else {
      low = mid + 1;      // Buscar a la derecha
    }
  }
  return firstTrueIdx;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] La verdadera esencia de Binary Search: La Frontera False → True
- **🎬 Visual en Pantalla / Slide:** Fila de interruptores rojos (False) seguidos de interruptores verdes (True), iluminando el primer verde.
- **🎙️ Narración / Guion:**
  > "Olvida la idea de que Binary Search solo sirve para buscar un número dentro de un arreglo ordenado. Su verdadero poder aparece cuando puedes formular una pregunta de Sí o No donde todos los 'No' están a la izquierda y todos los 'Sí' están a la derecha."

### ⏱️ [01:45 - 05:00] Binary Search en el Espacio de Respuestas (Koko Eating Bananas)
- **🎬 Visual en Pantalla / Slide:** Velocímetro probando velocidades entre 1 y Max, verificando en O(N) si llega a tiempo.
- **🎙️ Narración / Guion:**
  > "Cuando un problema pide la capacidad mínima de un barco o la velocidad mínima para terminar en H horas, no hacemos búsqueda binaria en el arreglo de entrada: la hacemos directamente sobre el rango de posibles respuestas."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#704. Binary Search** | `Easy` | [https://leetcode.com/problems/binary-search/](https://leetcode.com/problems/binary-search/) | Búsqueda binaria clásica en arreglo ordenado. |
| **#33. Search in Rotated Sorted Array** | `Medium` | [https://leetcode.com/problems/search-in-rotated-sorted-array/](https://leetcode.com/problems/search-in-rotated-sorted-array/) | Al partir en `mid`, al menos UNA de las dos mitades siempre está perfectamente ordenada. |
| **#875. Koko Eating Bananas** | `Medium` | [https://leetcode.com/problems/koko-eating-bananas/](https://leetcode.com/problems/koko-eating-bananas/) | Binary Search on Answer: busca la velocidad mínima `k` en `[1, max(piles)]` donde `horas(k) <= h`. |

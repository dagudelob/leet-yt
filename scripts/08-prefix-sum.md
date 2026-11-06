# 🎬 Episodio #08: Prefix Sums (Sumas de Prefijos 1D y 2D)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 2 — Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Prefix Sums`  
> **Prerrequisitos Recomendados:** Arrays

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica primero la intuición del odómetro para Prefix Sum 1D con el truco del `0` extra al inicio (`N+1` elementos), y luego dedica la mitad central al patrón favorito de las entrevistas de Google y Meta: 'Prefix Sum + Hash Map' (LeetCode 560), explicando por qué triunfa donde Sliding Window falla (cuando hay números negativos).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Prefix Sums", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Q ≤ 10⁵ consultas de rango o Subarray Sum = K con números negativos) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Prefix Sums?
Precalcular en O(N) las sumas acumuladas desde el inicio del arreglo para responder cualquier consulta de suma en un rango `[L, R]` en tiempo instantáneo O(1) mediante la resta `prefix[R+1] - prefix[L]`.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** El odómetro (cuentakilómetros) de un auto en una carretera: si en el kilómetro 0 de tu viaje marcaba 10,200 km al pasar por el pueblo A y luego marca 10,350 km al llegar al pueblo B, sabes en un instante que entre A y B hay exactamente 150 km (`10350 - 10200`), sin tener que volver a medir cada metro del tramo.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Con un cero centinela al inicio (`pref = [0] * (n+1)`), la suma de `nums[L..R]` siempre es `pref[R+1] - pref[L]` sin `if L == 0`.
2. **Idea Clave #2:** La suma de un subarreglo `nums[i..j]` es la diferencia entre dos prefijos: `pref[j+1] - pref[i]`.
3. **Idea Clave #3:** Combinar Prefix Sum con un Hash Map transforma 'buscar un subarreglo de suma K' en un problema de tipo `Two Sum` sobre prefijos.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Prefix Sums)
- ✅ Múltiples consultas de suma o XOR sobre rangos `[L, R]` de un arreglo estático.
- ✅ Contar o encontrar subarreglos que sumen exactamente `K` cuando PUEDE haber números negativos (combinando `Prefix Sum + Hash Map`).
- ✅ Consultas de suma de submatrices rectangulares en 2D en O(1) por consulta.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si el arreglo cambia constantemente entre consultas (`update(i, val)` + `rangeSum(L, R)`): actualizar un Prefix Sum cuesta O(N). Para actualizaciones dinámicas necesitas un Fenwick Tree o Segment Tree.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Q ≤ 10⁵ consultas de rango o Subarray Sum = K con números negativos`
- **Complejidad Temporal Promedio:** `Preprocesamiento: O(N) | Consulta de rango `[L, R]`: O(1)`
- **Complejidad Temporal Peor Caso:** `O(N) total`
- **Complejidad Espacial:** `O(N) para guardar el arreglo de prefijos`
- **Nota Técnica:** Agregar un cero inicial (`prefix = [0] * (n + 1)`) elimina todos los casos borde cuando L = 0.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Construir el arreglo `pref` de longitud `N + 1` inicializado en 0.
2. Para cada consulta `[L, R]`, devolver `pref[R + 1] - pref[L]` en O(1).
3. Si buscas subarreglos con suma `K`, mantén un diccionario `{suma_prefijo: frecuencia}` inicializado en `{0: 1}`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Olvidar inicializar el diccionario con `{0: 1}` en `Subarray Sum Equals K`, perdiendo todos los subarreglos que empiezan exactamente en el índice 0.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
class RangeSumQuery:
    """
    Prefix Sum 1D con padding de un 0 a la izquierda.
    pref[i] guarda la suma de los primeros i elementos: nums[0..i-1].
    """
    def __init__(self, nums: list[int]):
        self.pref = [0] * (len(nums) + 1)
        for i, x in enumerate(nums):
            self.pref[i + 1] = self.pref[i] + x

    def query(self, left: int, right: int) -> int:
        # Suma de nums[left..right] inclusive en O(1)
        return self.pref[right + 1] - self.pref[left]


def subarray_sum_equals_k(nums: list[int], k: int) -> int:
    """
    Patrón Estrella: Prefix Sum + Hash Map (funciona con números NEGATIVOS).
    Si pref_actual - pref_anterior == k -> entonces pref_anterior == pref_actual - k.
    """
    seen_prefixes = {0: 1}  # Un prefijo vacío tiene suma 0
    curr_sum = 0
    count = 0
    for x in nums:
        curr_sum += x
        count += seen_prefixes.get(curr_sum - k, 0)
        seen_prefixes[curr_sum] = seen_prefixes.get(curr_sum, 0) + 1
    return count
```

### Plantilla en TypeScript / JavaScript
```typescript
export function subarraySumEqualsK(nums: number[], k: number): number {
  const seenPrefixes = new Map<number, number>([[0, 1]]);
  let currSum = 0;
  let count = 0;

  for (const x of nums) {
    currSum += x;
    count += seenPrefixes.get(currSum - k) ?? 0;
    seenPrefixes.set(currSum, (seenPrefixes.get(currSum) ?? 0) + 1);
  }
  return count;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] La analogía del odómetro y el Cero Centinela
- **🎬 Visual en Pantalla / Slide:** Arreglo original arriba y arreglo `pref` de tamaño N+1 abajo mostrando la resta de dos casillas.
- **🎙️ Narración / Guion:**
  > "Si te preguntan mil veces cuánto suman los elementos entre el índice L y el R, sumar desde L hasta R cada vez es lentísimo. Con Prefix Sums hacemos una sola pasada inicial y luego cada pregunta se responde con una simple resta en O(1)."

### ⏱️ [01:45 - 04:45] Prefix Sum + Hash Map: El salvavidas con números negativos
- **🎬 Visual en Pantalla / Slide:** Gráfica subiendo y bajando con números negativos mostrando dos puntos cuya diferencia de altura es K.
- **🎙️ Narración / Guion:**
  > "Cuando hay números negativos, la ventana deslizante pierde su brújula. Pero si guardamos cada suma acumulada en un Hash Map, preguntar si existe un subarreglo que sume K equivale a preguntar: ¿ya vi antes un prefijo igual a `suma_actual - K`?"

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#303. Range Sum Query - Immutable** | `Easy` | [https://leetcode.com/problems/range-sum-query-immutable/](https://leetcode.com/problems/range-sum-query-immutable/) | Arreglo `pref` de tamaño `N+1` con `pref[0] = 0`. |
| **#560. Subarray Sum Equals K** | `Medium` | [https://leetcode.com/problems/subarray-sum-equals-k/](https://leetcode.com/problems/subarray-sum-equals-k/) | Guarda en un Hash Map cuántas veces ha aparecido cada `curr_sum` y busca `curr_sum - k`. |
| **#304. Range Sum Query 2D - Immutable** | `Medium` | [https://leetcode.com/problems/range-sum-query-2d-immutable/](https://leetcode.com/problems/range-sum-query-2d-immutable/) | Principio de inclusión-exclusión en 2D: `pref[r2][c2] - arriba - izquierda + esquina_diagonal`. |

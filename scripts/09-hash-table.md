# 🎬 Episodio #09: Hash Tables (Hash Map & Hash Set)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 2 — Estructura de Datos + Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Hash Table / Hash Map & Set`  
> **Prerrequisitos Recomendados:** Arrays → Strings

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo funciona una Tabla Hash por dentro (función hash -> módulo capacidad -> resolución de colisiones) y luego enseña los 3 patrones de entrevista con Hash: 1) Búsqueda de complemento (`Two Sum`), 2) Mapa de frecuencias, y 3) Detección de inicio de racha en O(N) (`Longest Consecutive Sequence`).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Hash Table", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Reemplaza búsquedas lineales internas cuando N ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Hash Table?
La herramienta número uno para acelerar algoritmos: utiliza una función hash para transformar cualquier clave inmutable en un índice de arreglo, logrando inserción, borrado y búsqueda en tiempo promedio O(1).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Un guardarropa de teatro con una regla matemática: en lugar de buscar tu abrigo revisando perchero por perchero (O(N)), la etiqueta calcula un número exacto a partir de tu nombre y el encargado va directo a ese gancho en un segundo (O(1)).

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Chiste clásico pero real de entrevistas: si te atascas, pregúntate '¿y si le meto un Hash Map?'
2. **Idea Clave #2:** En Python, las llaves de un `dict` o elementos de un `set` deben ser inmutables (`int`, `str`, `tuple`), nunca `list`.
3. **Idea Clave #3:** En `Longest Consecutive Sequence`, verificar `if (x - 1) not in num_set` evita trabajo repetido y garantiza O(N).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Hash Table)
- ✅ Necesitas saber en O(1) si un elemento ya apareció antes (`Hash Set` para duplicados o pertenencia).
- ✅ Necesitas asociar claves con valores: conteo de frecuencias, guardar el índice donde viste cada número (`Two Sum`), o agrupar elementos por una firma común.
- ✅ Quieres cambiar un bucle interno de búsqueda O(N) por una consulta instantánea O(1) (Trade-off Espacio por Tiempo).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Necesitas mantener los elementos ordenados o buscar el 'elemento más cercano mayor o igual a X' (un Hash Map no tiene orden; para eso usa Binary Search o un Ordered Set / BST).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Reemplaza búsquedas lineales internas cuando N ≤ 10⁵`
- **Complejidad Temporal Promedio:** `Insertar / Buscar / Borrar: O(1)`
- **Complejidad Temporal Peor Caso:** `O(N) si todas las claves colisionan en el mismo bucket`
- **Complejidad Espacial:** `O(N) para almacenar hasta N claves únicas`
- **Nota Técnica:** Las implementaciones modernas (`dict` en Python, `Map` en JS) redimensionan la tabla para mantener el factor de carga bajo.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Preguntarse: ¿qué información del pasado me gustaría consultar en O(1) mientras estoy en el índice `i`?
2. Definir qué es la Clave (`key`) y qué es el Valor (`value`: índice, frecuencia o lista de elementos agrupados).
3. Recorrer la entrada actualizando y consultando la tabla hash.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Intentar usar una lista mutable `[1, 2]` como llave de un diccionario en Python (`TypeError: unhashable type: 'list'`). Conviértela a `tuple([1, 2])`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def two_sum_hash(nums: list[int], target: int) -> list[int]:
    """
    Patrón Clásico: Guardar {valor_visto: indice} mientras recorres en 1 solo pase.
    Tiempo: O(N) | Espacio: O(N)
    """
    seen: dict[int, int] = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []


def longest_consecutive(nums: list[int]) -> int:
    """
    Patrón de Inicio de Secuencia con Hash Set en O(N).
    """
    num_set = set(nums)
    best = 0
    for x in num_set:
        # Solo empezamos a contar si 'x' es el INICIO de una racha
        if (x - 1) not in num_set:
            length = 1
            while (x + length) in num_set:
                length += 1
            best = max(best, length)
    return best
```

### Plantilla en TypeScript / JavaScript
```typescript
export function twoSumHash(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement)!, i];
    }
    seen.set(nums[i], i);
  }
  return [];
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Cómo funciona una Hash Table bajo el capó
- **🎬 Visual en Pantalla / Slide:** Animación de una clave pasando por `hash(key) % buckets` y manejando una colisión.
- **🎙️ Narración / Guion:**
  > "Una Tabla Hash combina la flexibilidad de buscar por cualquier llave con la velocidad instantánea de un Array. ¿Cómo lo logra? Usando una función matemática que convierte tu llave en un índice numérico."

### ⏱️ [01:45 - 04:30] Los 3 Patrones Maestros con Hash Map y Hash Set
- **🎬 Visual en Pantalla / Slide:** Tres tarjetas visuales: Complemento O(1), Contador de Frecuencias y Centinela de Secuencia.
- **🎙️ Narración / Guion:**
  > "Más allá de guardar datos, en entrevistas usarás tablas hash para tres jugadas maestras: recordar el índice de un complemento, contar frecuencias y detectar el inicio exacto de secuencias consecutivas en tiempo lineal."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#1. Two Sum** | `Easy` | [https://leetcode.com/problems/two-sum/](https://leetcode.com/problems/two-sum/) | Consulta si `target - x` ya está en el diccionario antes de insertar `x`. |
| **#128. Longest Consecutive Sequence** | `Medium` | [https://leetcode.com/problems/longest-consecutive-sequence/](https://leetcode.com/problems/longest-consecutive-sequence/) | Mete todo en un `set` y solo expande hacia adelante desde números `x` cuyo `x - 1` NO esté en el set. |
| **#217. Contains Duplicate** | `Easy` | [https://leetcode.com/problems/contains-duplicate/](https://leetcode.com/problems/contains-duplicate/) | Detección inmediata en O(N) con `set`. |

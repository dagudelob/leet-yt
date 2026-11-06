# 🎬 Episodio #12: Partitioning (QuickSelect & Dutch National Flag)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 2 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Partitioning, QuickSelect & 3-Way Partition`  
> **Prerrequisitos Recomendados:** Arrays → Two Pointers

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo la operación de Partición es el motor tanto de QuickSort como de QuickSelect (encontrar el K-ésimo elemento en O(N) porque solo exploras una mitad: N + N/2 + N/4 = 2N). Luego explica en detalle el invariante de los 3 punteros de Edsger Dijkstra ('Dutch National Flag') y por qué NO se incrementa `mid` cuando intercambias con `high`.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Partitioning", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (K-th Largest en O(N) promedio o clasificación en 3 grupos con O(1) espacio) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Partitioning?
Reorganizar un arreglo in-place alrededor de un pivote en O(N) para separar elementos menores, iguales y mayores sin tener que ordenar todo el arreglo completo.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Clasificar la ropa para lavar en tres cestos (blanca, de color y oscura) en una sola pasada, o encontrar al jugador de estatura mediana de un salón haciendo que los más bajos que un voluntario pasen a la izquierda y los más altos a la derecha: si a la izquierda quedaron muchos, solo sigues buscando en ese grupo.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** QuickSelect encuentra el K-ésimo elemento en O(N) promedio porque descarta una mitad en cada paso (`N + N/2 + N/4 ... = 2N`).
2. **Idea Clave #2:** La partición de 3 vías (Dutch National Flag) evita el peor caso O(N²) cuando el arreglo tiene muchos elementos duplicados.
3. **Idea Clave #3:** Al intercambiar `mid` con `high`, el elemento que viene desde `high` es desconocido, así que `mid` debe quedarse quieto para evaluarlo en la siguiente vuelta.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Partitioning)
- ✅ Necesitas el K-ésimo elemento más grande o más pequeño (o la mediana) en O(N) tiempo promedio sin pagar el O(N log N) de ordenar todo (`QuickSelect`).
- ✅ Debes agrupar un arreglo en exactamente 3 categorías in-place en un solo pase (`Dutch National Flag` / `Sort Colors` con punteros `low`, `mid`, `high`).
- ✅ Mover todos los ceros o pares al frente manteniendo O(1) espacio.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si necesitas que TODOS los elementos queden ordenados o vas a hacer muchas consultas de distintos K sobre el mismo arreglo (ahí ordena una sola vez en O(N log N)).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `K-th Largest en O(N) promedio o clasificación en 3 grupos con O(1) espacio`
- **Complejidad Temporal Promedio:** `O(N) (QuickSelect: N + N/2 + N/4 + ... = 2N)`
- **Complejidad Temporal Peor Caso:** `O(N²) en QuickSelect si el pivote siempre cae en un extremo (usa pivote aleatorio + 3-way partition)`
- **Complejidad Espacial:** `O(1) in-place`
- **Nota Técnica:** Dutch National Flag siempre es O(N) estricto en un solo pase.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Definir las regiones del arreglo mediante punteros frontera (`low`, `mid`, `high`).
2. Inspeccionar siempre el elemento en `nums[mid]` mientras `mid <= high`.
3. En QuickSelect, comparar el índice del pivote (o rango de iguales al pivote) contra `k` para decidir en qué subarreglo continuar.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Incrementar `mid` después de hacer swap con `high` en `Sort Colors`: te saltarías sin revisar el número que acabas de traer desde el final.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def sort_colors_dutch_flag(nums: list[int]) -> None:
    """
    Algoritmo de la Bandera Holandesa de Dijkstra (3-Way Partitioning in-place).
    Clasifica 0s (izquierda), 1s (centro) y 2s (derecha) en 1 solo pase O(N).
    Invariante:
      nums[0..low-1] == 0
      nums[low..mid-1] == 1
      nums[high+1..n-1] == 2
    """
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1  # OJO: No incrementamos mid porque el valor traído de 'high' aún no fue inspeccionado
```

### Plantilla en TypeScript / JavaScript
```typescript
export function sortColorsDutchFlag(nums: number[]): void {
  let low = 0,
    mid = 0,
    high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--; // No avanzar mid hasta evaluar el nuevo elemento traído desde high
    }
  }
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Ordenar a medias es el doble de inteligente: QuickSelect
- **🎬 Visual en Pantalla / Slide:** Árbol de QuickSort podando una rama entera en cada nivel: N + N/2 + N/4 = 2N.
- **🎙️ Narración / Guion:**
  > "Si solo te interesa saber quién quedó en el puesto número K, ¿para qué ordenar todo el salón? Al partir el grupo respecto a un pivote, sabes instantáneamente de qué lado está el puesto K y descartas la otra mitad para siempre."

### ⏱️ [01:45 - 04:30] La Bandera Holandesa de Dijkstra (3-Way Partition)
- **🎬 Visual en Pantalla / Slide:** Tres zonas de color (Rojo 0, Blanco 1, Azul 2) y la zona gris de incógnita entre mid y high.
- **🎙️ Narración / Guion:**
  > "Cuando tienes tres categorías o muchos duplicados, la partición de tres punteros de Dijkstra mantiene cuatro zonas en el arreglo y reduce la zona desconocida hasta que `mid` cruza a `high`."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#75. Sort Colors** | `Medium` | [https://leetcode.com/problems/sort-colors/](https://leetcode.com/problems/sort-colors/) | Usa los 3 punteros (`low`, `mid`, `high`) de la Bandera Nacional Holandesa. |
| **#215. Kth Largest Element in an Array** | `Medium` | [https://leetcode.com/problems/kth-largest-element-in-an-array/](https://leetcode.com/problems/kth-largest-element-in-an-array/) | QuickSelect con partición en 3 vías (`< pivot`, `== pivot`, `> pivot`) para alcanzar O(N) promedio. |
| **#283. Move Zeroes** | `Easy` | [https://leetcode.com/problems/move-zeroes/](https://leetcode.com/problems/move-zeroes/) | Partición estable de 2 vías: intercambia elementos no-cero hacia el puntero `low`. |

# 🎬 Episodio #14: Matrices & 2D Grids (Tableros y Cuadrículas)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 2 — Estructura de Datos (`Beginner`)  
> **Término en Inglés (Flowchart):** `2D Matrices & Grids`  
> **Prerrequisitos Recomendados:** Arrays → Simulation

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Presenta las Matrices 2D como el puente entre los arreglos simples y el mundo de los Grafos y la Programación Dinámica. Enseña las 3 recetas imprescindibles: 1) Mapear 1D <-> 2D con `idx = r * cols + c`, 2) Rotar 90° mediante Transponer + Reverse, y 3) Recorrer los 4 vecinos con `0 <= nr < rows and 0 <= nc < cols`.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Matrices / Grids 2D", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (R, C ≤ 1000 (total de celdas R × C ≤ 10⁶)) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Matrices / Grids 2D?
Arreglos bidimensionales `grid[r][c]` de `R` filas por `C` columnas que modelan mapas, imágenes, tableros y grafos implícitos donde cada celda se conecta con sus 4 u 8 vecinos.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Un tablero de ajedrez o una hoja de cálculo de Excel: cada casilla tiene una dirección única `(fila, columna)`. Además, cada casilla es como una habitación con 4 puertas (arriba, abajo, izquierda, derecha) que la conectan con las habitaciones vecinas.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Cualquier coordenada `(r, c)` se aplana a un índice 1D único con `id = r * C + c`, y se recupera con `r = id // C`, `c = id % C`.
2. **Idea Clave #2:** Rotar 90° horario nunca requiere fórmulas complicadas de 4 esquinas: basta Transponer (`r, c -> c, r`) e invertir cada fila.
3. **Idea Clave #3:** Todo tablero 2D es en realidad un Grafo implícito donde las celdas son nodos y las direcciones `(-1,0), (1,0), (0,-1), (0,1)` son las aristas.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Matrices / Grids 2D)
- ✅ Operaciones geométricas sobre imágenes o tablas (rotar 90 grados, transponer, poner filas/columnas en cero in-place).
- ✅ Problemas de islas, laberintos, propagación de fuego o caminos en cuadrículas (puente directo hacia BFS, DFS y DP 2D).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si la cuadrícula es gigantesca (ej. `10⁶ × 10⁶`) pero casi todas las celdas están vacías (matriz dispersa / sparse): no crees la matriz en memoria; guarda solo las coordenadas activas `(r, c)` en un `Hash Set`.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `R, C ≤ 1000 (total de celdas R × C ≤ 10⁶)`
- **Complejidad Temporal Promedio:** `Recorrido completo: O(R × C) | Acceso a celda: O(1)`
- **Complejidad Temporal Peor Caso:** `O(R × C)`
- **Complejidad Espacial:** `O(1) si modificas in-place o O(R × C) con matriz de visitados`
- **Nota Técnica:** Una cuadrícula de R×C es un grafo con V = R*C nodos y hasta 4*R*C aristas.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Extraer siempre `rows = len(grid)` y `cols = len(grid[0])` al inicio de la función.
2. Al transponer in-place, iniciar `c` desde `r + 1` para no intercambiar dos veces y dejar la matriz igual.
3. Validar siempre los límites `0 <= nr < rows and 0 <= nc < cols` antes de leer `grid[nr][nc]`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En Python, los índices negativos como `grid[-1][0]` NO lanzan error sino que leen la última fila del tablero por accidente. Siempre escribe `0 <= nr < rows`, nunca solo `nr < rows`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def grid_neighbors_and_rotate(matrix: list[list[int]]) -> None:
    """
    1. Truco Clásico: Rotar una matriz N x N 90 grados en sentido horario IN-PLACE:
       Paso A: Transponer (intercambiar matrix[r][c] con matrix[c][r])
       Paso B: Invertir cada fila
    """
    n = len(matrix)
    for r in range(n):
        for c in range(r + 1, n):
            matrix[r][c], matrix[c][r] = matrix[c][r], matrix[r][c]
    for row in matrix:
        row.reverse()


def get_valid_4_neighbors(r: int, c: int, rows: int, cols: int) -> list[tuple[int, int]]:
    """
    2. Generador limpio de los 4 vecinos ortogonales dentro de los límites del tablero.
    """
    neighbors = []
    for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            neighbors.append((nr, nc))
    return neighbors
```

### Plantilla en TypeScript / JavaScript
```typescript
export function rotateMatrix90Clockwise(matrix: number[][]): void {
  const n = matrix.length;
  // 1. Transponer sobre la diagonal principal
  for (let r = 0; r < n; r++) {
    for (let c = r + 1; c < n; c++) {
      [matrix[r][c], matrix[c][r]] = [matrix[c][r], matrix[r][c]];
    }
  }
  // 2. Invertir cada fila
  for (let r = 0; r < n; r++) {
    matrix[r].reverse();
  }
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] De 1D a 2D: Coordenadas, Diagonales y Aplanamiento
- **🎬 Visual en Pantalla / Slide:** Cuadrícula iluminando filas, columnas, diagonal principal (`r == c`) y secundaria (`r + c == n - 1`).
- **🎙️ Narración / Guion:**
  > "Una matriz 2D no es más que un arreglo de arreglos, pero esconde propiedades geométricas geniales: en una misma diagonal principal `r - c` es constante, y en la diagonal inversa `r + c` es constante."

### ⏱️ [01:45 - 04:30] La trampa de los índices negativos en Python y el puente a Grafos
- **🎬 Visual en Pantalla / Slide:** Un cursor saliendo por arriba de la fila 0 a `r = -1` y leyendo por error la última fila en Python.
- **🎙️ Narración / Guion:**
  > "Atención si programas en Python: si te sales del borde superior hacia la fila `-1`, Python no lanza IndexError: lee silenciosamente la última fila de la matriz y arruina tu búsqueda. Verificar `0 <= nr < rows` es sagrado."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#48. Rotate Image** | `Medium` | [https://leetcode.com/problems/rotate-image/](https://leetcode.com/problems/rotate-image/) | Rotar 90° en sentido horario = Transponer la matriz + Invertir cada fila in-place. |
| **#73. Set Matrix Zeroes** | `Medium` | [https://leetcode.com/problems/set-matrix-zeroes/](https://leetcode.com/problems/set-matrix-zeroes/) | Usa la primera fila y la primera columna como marcadores para lograr O(1) espacio extra. |
| **#74. Search a 2D Matrix** | `Medium` | [https://leetcode.com/problems/search-a-2d-matrix/](https://leetcode.com/problems/search-a-2d-matrix/) | Mapea un índice 1D `idx` a coordenadas 2D con `r = idx // cols` y `c = idx % cols`. |

# 🎬 Episodio #42: String Matching (Algoritmo KMP y Función Prefijo LPS)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 7 — Patrón Algorítmico (`Advanced`)  
> **Término en Inglés (Flowchart):** `String Matching (KMP, Z-Algorithm & LPS Array)`  
> **Prerrequisitos Recomendados:** Strings → Two Pointers

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica de forma muy visual qué significa la tabla `LPS` de KMP ('¿qué parte del final de lo que acabo de leer es idéntica al principio del patrón para no tener que volver a compararla?'). Revela el truco estrella para problemas Hard: concatenar `s + '#' + reverse(s)` y calcular su LPS para hallar el prefijo palindrómico más largo en O(N) (`Shortest Palindrome`).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "String Matching (KMP)", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Búsqueda exacta de patrones, periodicidad de cadenas o Shortest Palindrome en O(N)) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es String Matching (KMP)?
Buscar todas las apariciones de un patrón `P` dentro de un texto `T` en tiempo estrictamente lineal **O(|T| + |P|)** sin retroceder jamás el puntero del texto `T`. El secreto es el arreglo **LPS (Longest Proper Prefix which is also Suffix)** del algoritmo **Knuth-Morris-Pratt (KMP)**.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Si estás buscando la palabra `'ABABAC'` y tras coincidir las primeras 5 letras `'ABABA'` fallas en la sexta letra, no tienes que volver a empezar desde cero: como sabes que el final `'ABA'` que acabas de leer coincide exactamente con el inicio `'ABA'` de tu patrón, continúas directamente desde la cuarta letra.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** La búsqueda ingenua de strings empeora a O(N·M) cuando hay muchos falsos inicios como buscar `'AAAAB'` en `'AAAAAAAAAB'`. KMP nunca retrocede el índice `i` del texto.
2. **Idea Clave #2:** La línea clave de KMP es `length = lps[length - 1]`: cuando falla un carácter, reutilizamos el segundo mejor prefijo-sufijo ya calculado.
3. **Idea Clave #3:** El periodo mínimo de un string de longitud `N` es `N - lps[N - 1]`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR String Matching (KMP))
- ✅ Buscar un patrón `P` en un texto `T` garantizando O(N + M) en el peor caso (incluso en textos repetitivos como `'aaaa...ab'`).
- ✅ Detectar si un string está formado por la repetición periódica de un bloque más corto (`Repeated Substring Pattern`).
- ✅ Encontrar el **palíndromo más largo que empieza en el índice 0** concatenando `s + '#' + s[::-1]` y mirando el último valor del arreglo LPS (`Shortest Palindrome`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ En problemas sencillos donde `N` es pequeño y `s.find(p)` de la librería estándar es suficiente.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Búsqueda exacta de patrones, periodicidad de cadenas o Shortest Palindrome en O(N)`
- **Complejidad Temporal Promedio:** `Construir LPS: O(M) | Buscar en texto: O(N) → Total: O(N + M)`
- **Complejidad Temporal Peor Caso:** `O(N + M) determinista (sin casos patológicos O(N·M))`
- **Complejidad Espacial:** `O(M) para el arreglo `lps` del patrón`
- **Nota Técnica:** El arreglo `lps[i]` guarda la longitud del prefijo propio más largo de `P[0..i]` que también es sufijo de `P[0..i]`.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Preprocesar el patrón `P` de longitud `M` para llenar su arreglo `lps` en O(M).
2. Recorrer el texto `T` con índice `i` y el patrón con índice `j`.
3. Si `T[i] == P[j]`, avanzar ambos; si no coinciden y `j > 0`, saltar `j = lps[j - 1]` sin retroceder `i`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En `Shortest Palindrome` (`s + '#' + s[::-1]`), olvidar poner un carácter separador `'#'` en medio, haciendo que el prefijo-sufijo cruce la mitad y supere la longitud de `s`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def build_kmp_lps(pattern: str) -> list[int]:
    """
    Construye la tabla LPS (Longest Proper Prefix which is also Suffix) en O(M).
    lps[i] = longitud del mayor prefijo propio de pattern[0..i] que coincide con su sufijo.
    """
    m = len(pattern)
    lps = [0] * m
    length = 0  # Longitud del LPS previo
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            # Retrocedemos inteligentemente usando la propia tabla LPS
            length = lps[length - 1]
        else:
            lps[i] = 0
            i += 1
    return lps


def kmp_search(text: str, pattern: str) -> int:
    """Retorna el primer índice donde 'pattern' aparece en 'text', o -1."""
    if not pattern:
        return 0
    lps = build_kmp_lps(pattern)
    i = j = 0  # i recorre text, j recorre pattern

    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1
    return -1
```

### Plantilla en TypeScript / JavaScript
```typescript
export function buildKmpLps(pattern: string): number[] {
  const m = pattern.length;
  const lps = new Array<number>(m).fill(0);
  let len = 0;
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      lps[i++] = ++len;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i++] = 0;
    }
  }
  return lps;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 02:00] Por qué la búsqueda ingenua retrocede y cómo KMP mira solo hacia adelante
- **🎬 Visual en Pantalla / Slide:** Comparación de un puntero retrocediendo una y otra vez en `'AAAAAB'` vs KMP avanzando en línea recta.
- **🎙️ Narración / Guion:**
  > "Cuando buscas una palabra y fallas en la última letra, el algoritmo ingenuo tira a la basura todo lo que acababa de leer y retrocede en el texto. Knuth, Morris y Pratt demostraron que lo que acabas de leer ya contiene toda la información necesaria para no retroceder jamás."

### ⏱️ [02:00 - 04:45] La tabla LPS y el truco de `s + '#' + reverse(s)`
- **🎬 Visual en Pantalla / Slide:** Tabla LPS de `'ABABAC'` y aplicación directa a Shortest Palindrome.
- **🎙️ Narración / Guion:**
  > "Más allá de buscar palabras, la tabla LPS es un detector de simetrías: te dice en O(N) si una cadena está hecha de bloques repetidos y cuál es el palíndromo más largo pegado al inicio."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#28. Find the Index of the First Occurrence in a String** | `Easy` | [https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | Problema base para implementar KMP en O(N + M). |
| **#459. Repeated Substring Pattern** | `Easy` | [https://leetcode.com/problems/repeated-substring-pattern/](https://leetcode.com/problems/repeated-substring-pattern/) | Con KMP: un string de largo `N` es periódico si `lps[-1] > 0` y `N % (N - lps[-1]) == 0`. |
| **#214. Shortest Palindrome** | `Hard` | [https://leetcode.com/problems/shortest-palindrome/](https://leetcode.com/problems/shortest-palindrome/) | Construye el arreglo LPS de `s + '#' + s[::-1]`: `lps[-1]` te da el prefijo palindrómico más largo de `s` en O(N). |

# 🎬 Episodio #05: Strings (Cadenas de Caracteres)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 1 — Estructura de Datos (`Beginner`)  
> **Término en Inglés (Flowchart):** `Strings & Character Manipulation`  
> **Prerrequisitos Recomendados:** Arrays

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Destaca las 2 claves que separan a un principiante de un experto manejando Strings en entrevistas: 1) entender la inmutabilidad (por qué concatenar en bucle puede ser cuadrático y cómo resolverlo con `join`), y 2) el truco `ord(c) - ord('a')` para mapear letras a un arreglo de 26 posiciones.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Strings", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Alfabeto 'a'-'z' → Vector de frecuencia de tamaño 26 en O(1) espacio) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Strings?
Secuencias de caracteres que funcionan como arreglos de solo lectura (inmutables en Python, JS y Java). Dominar códigos ASCII, conteo de frecuencias de 26 letras y construcción con `join` es esencial antes de Sliding Window y String Matching.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Un collar de cuentas con letras grabadas donde el hilo está sellado con pegamento (inmutable). Puedes leer cualquier letra al instante, pero si quieres cambiar una sola letra o agregar una al final, no puedes abrir el collar: tienes que fabricar un collar nuevo copiando todas las cuentas.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En Python, Java y JavaScript los Strings son inmutables: modificar un carácter crea un objeto nuevo.
2. **Idea Clave #2:** El truco `ord(ch) - ord('a')` convierte cualquier letra minúscula en un índice de 0 a 25 en O(1).
3. **Idea Clave #3:** Distinción crucial: 'Substring' es contiguo (sin saltos); 'Subsequence' puede saltar caracteres manteniendo el orden relativo.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Strings)
- ✅ Procesamiento de texto, palíndromos, anagramas, subcadenas (substrings) y validación de formatos.
- ✅ Cuando el alfabeto es pequeño y fijo (ej. 26 letras minúsculas `'a'-'z'`), permitiendo usar un arreglo fijo de tamaño 26 en lugar de un Hash Map general.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Nunca concatenes strings con `s += char` dentro de un bucle grande en lenguajes con strings inmutables; usa una lista de caracteres y `''.join(chars)` al final.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Alfabeto 'a'-'z' → Vector de frecuencia de tamaño 26 en O(1) espacio`
- **Complejidad Temporal Promedio:** `Lectura `s[i]`: O(1) | Comparación/Copia/Slice: O(N)`
- **Complejidad Temporal Peor Caso:** `Concatenación repetida ingenua en bucle: O(N²)`
- **Complejidad Espacial:** `O(N) para almacenar la cadena o lista mutable de caracteres`
- **Nota Técnica:** Usar `''.join(lista)` garantiza construcción en O(N).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Verificar qué caracteres puede contener el string (solo `'a'-'z'`, alfanumérico, o ASCII completo de 128/256).
2. Si necesitas mutar caracteres in-place, convierte primero a lista `chars = list(s)` y al terminar haz `''.join(chars)`.
3. Para comparar frecuencias de ventanas o anagramas, usa un vector fijo de 26 enteros.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Confundir Substring (contiguo, se resuelve con Sliding Window) con Subsequence (no contiguo, suele requerir Two Pointers o Dynamic Programming).

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def char_frequency_signature(s: str) -> tuple[int, ...]:
    """
    Convierte un string de letras 'a'-'z' en una firma de 26 enteros en O(N).
    Dos strings son anagramas si y solo si tienen la misma firma.
    """
    counts = [0] * 26
    for ch in s:
        # ord(ch) - ord('a') mapea 'a'->0, 'b'->1, ..., 'z'->25
        counts[ord(ch) - ord('a')] += 1
    return tuple(counts)


def build_string_efficiently(parts: list[str]) -> str:
    # SIEMPRE usa ''.join() en lugar de concatenar con += en un bucle
    return "".join(parts)
```

### Plantilla en TypeScript / JavaScript
```typescript
export function charFrequencySignature(s: string): string {
  const counts = new Array<number>(26).fill(0);
  const base = "a".charCodeAt(0);
  for (let i = 0; i < s.length; i++) {
    counts[s.charCodeAt(i) - base]++;
  }
  return counts.join("#");
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] Strings: Arreglos con un secreto de inmutabilidad
- **🎬 Visual en Pantalla / Slide:** Animación de un string bloqueado con candado vs una lista mutable de caracteres.
- **🎙️ Narración / Guion:**
  > "Aunque un String se parece a un Array de letras, guarda una diferencia crítica: es inmutable. Entender qué significa esto en memoria te salvará de errores de rendimiento en entrevistas."

### ⏱️ [01:30 - 04:00] El truco de las 26 casillas (`ord(c) - ord('a')`)
- **🎬 Visual en Pantalla / Slide:** Vector de 26 casillas incrementándose mientras pasan las letras de la palabra 'anagrama'.
- **🎙️ Narración / Guion:**
  > "Cuando el problema usa letras minúsculas del inglés, no necesitas un Hash Map pesado. Restar el código ASCII de la letra 'a' te da un índice limpio del 0 al 25."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#242. Valid Anagram** | `Easy` | [https://leetcode.com/problems/valid-anagram/](https://leetcode.com/problems/valid-anagram/) | Usa un arreglo de tamaño 26 con `ord(c) - ord('a')` para contar frecuencias en O(N) tiempo y O(1) espacio. |
| **#49. Group Anagrams** | `Medium` | [https://leetcode.com/problems/group-anagrams/](https://leetcode.com/problems/group-anagrams/) | Agrupa palabras usando su tupla de conteo de 26 letras como llave de un Hash Map. |
| **#151. Reverse Words in a String** | `Medium` | [https://leetcode.com/problems/reverse-words-in-a-string/](https://leetcode.com/problems/reverse-words-in-a-string/) | Tokenización limpia e inversión de lista de palabras con `join`. |

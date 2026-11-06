# 🎬 Episodio #33: Tries / Prefix Trees (Árboles de Prefijos)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 5 — Estructura de Datos + Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Tries / Prefix Trees & Bitwise Tries`  
> **Prerrequisitos Recomendados:** Binary Trees → Hash Table → Strings

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo un Trie fusiona los prefijos repetidos de miles de palabras en un solo árbol y por qué la bandera `is_end` es indispensable para distinguir entre el prefijo `'app'` y la palabra completa `'apple'`. Muestra el caso de estudio estrella: cómo pasar de TLE a una solución rapidísima en 'Word Search II' guiando el Backtracking con un Trie.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Tries (Prefix Tree)", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Consultas de prefijos startsWith, diccionarios en tableros o Maximum XOR) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Tries (Prefix Tree)?
Un árbol especializado para diccionarios de cadenas (o bits) donde cada arista representa un carácter y los nodos comparten prefijos comunes. Permite buscar palabras o verificar si existe cualquier palabra que empiece con un prefijo `P` en tiempo $O(|P|)$, independientemente de cuántas miles de palabras haya en el diccionario.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** El autocompletado del buscador de tu celular: cuando escribes `A -> L -> G`, no revisa las 500,000 palabras del idioma español una por una; simplemente baja tres escalones por las ramas `A`, `L` y `G` del árbol, y todo lo que cuelga debajo de ese nodo son las palabras que empiezan por `ALG` (`Algoritmo`, `Álgebra`, `Alguien`).

### Ideas Clave que debes recordar
1. **Idea Clave #1:** La diferencia entre `search(word)` y `startsWith(prefix)` es únicamente verificar `node.is_end == True` al final.
2. **Idea Clave #2:** En problemas de tableros + diccionarios (`Word Search II`), invertir la perspectiva metiendo las palabras en un Trie evita buscar palabras una por una.
3. **Idea Clave #3:** Un Bitwise Trie inserta los 32 bits de un entero del bit más significativo al menos significativo para maximizar el XOR buscando siempre el bit opuesto.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Tries (Prefix Tree))
- ✅ Autocompletado, búsqueda por **prefijos** (`startsWith`), correctores ortográficos o comodines (`.`).
- ✅ Buscar simultáneamente muchas palabras de un diccionario dentro de un tablero de letras (`Word Search II`: un Trie poda de golpe miles de búsquedas en el tablero cuando un prefijo no existe).
- ✅ **Bitwise Trie (Trie de Bits 0 y 1)**: Encontrar el par de números que maximiza el XOR (`Maximum XOR of Two Numbers in an Array`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si solo necesitas buscar palabras exactas completas sin consultar prefijos (un `Hash Set` normal de strings es más simple y rápido para coincidencias exactas).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Consultas de prefijos startsWith, diccionarios en tableros o Maximum XOR`
- **Complejidad Temporal Promedio:** `Insert / Search / StartsWith: O(L) donde L es la longitud de la palabra`
- **Complejidad Temporal Peor Caso:** `O(L)`
- **Complejidad Espacial:** `O(Total de caracteres insertados) compartiendo prefijos comunes`
- **Nota Técnica:** El tiempo NO depende del número de palabras N en el diccionario, solo del largo L de la palabra consultada.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Definir `TrieNode` con un diccionario `children` y un booleano `is_end = False`.
2. Al insertar, recorrer letra por letra creando nodos si no existen y marcar `curr.is_end = True` en la última letra.
3. Extraer una función auxiliar `_find_node(prefix)` que reutilizan tanto `search` como `startsWith`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Olvidar la bandera `is_end`: si insertas `'apple'`, `search('app')` devolvería `True` por error si no distingues entre un nodo de paso y un final de palabra.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
class TrieNode:
    def __init__(self):
        self.children: dict[str, TrieNode] = {}
        self.is_end: bool = False


class Trie:
    """
    Implementación Limpia y Estándar de Trie (Prefix Tree).
    Tiempo por operación: O(L) donde L = len(word).
    """
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find_node(prefix) is not None

    def _find_node(self, prefix: str) -> TrieNode | None:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return None
            curr = curr.children[ch]
        return curr
```

### Plantilla en TypeScript / JavaScript
```typescript
class TrieNode {
  children = new Map<string, TrieNode>();
  isEnd = false;
}

export class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        curr.children.set(ch, new TrieNode());
      }
      curr = curr.children.get(ch)!;
    }
    curr.isEnd = true;
  }

  search(word: string): boolean {
    const node = this.findNode(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix: string): boolean {
    return this.findNode(prefix) !== null;
  }

  private findNode(prefix: string): TrieNode | null {
    let curr = this.root;
    for (const ch of prefix) {
      const next = curr.children.get(ch);
      if (!next) return null;
      curr = next;
    }
    return curr;
  }
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Cómo funciona el autocompletado en tiempo O(Longitud)
- **🎬 Visual en Pantalla / Slide:** Las palabras 'CASA', 'CASO', 'CAMA' compartiendo las ramas C -> A en un árbol.
- **🎙️ Narración / Guion:**
  > "Si tienes un diccionario con un millón de palabras y quieres saber cuáles empiezan con 'PRO', un Hash Set no te sirve porque solo busca palabras completas. Un Trie organiza las palabras letra por letra en un árbol donde todos los prefijos comunes comparten el mismo camino."

### ⏱️ [01:45 - 04:30] El combo Trie + Backtracking en Word Search II
- **🎬 Visual en Pantalla / Slide:** Un tablero de sopa de letras podando inmediatamente ramas que no existen en el Trie.
- **🎙️ Narración / Guion:**
  > "Cuando combinas un Trie con DFS en un tablero 2D, si en la segunda casilla se forma la combinación 'XZ' y ves que en tu Trie no hay rama 'XZ', cortas la búsqueda al instante ahorrando millones de pasos."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#208. Implement Trie (Prefix Tree)** | `Medium` | [https://leetcode.com/problems/implement-trie-prefix-tree/](https://leetcode.com/problems/implement-trie-prefix-tree/) | Estructura base con `children = {}` y bandera booleana `is_end`. |
| **#211. Design Add and Search Words Data Structure** | `Medium` | [https://leetcode.com/problems/design-add-and-search-words-data-structure/](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | Cuando el carácter buscado es `'.'`, lanza recursión sobre todos los valores de `curr.children.values()`. |
| **#212. Word Search II** | `Hard` | [https://leetcode.com/problems/word-search-ii/](https://leetcode.com/problems/word-search-ii/) | Mete las palabras en un Trie y camina simultáneamente por el tablero 2D y por los nodos del Trie. |

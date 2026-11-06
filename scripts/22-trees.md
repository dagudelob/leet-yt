# 🎬 Episodio #22: Trees (Árboles Binarios y Recorridos)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 4 — Estructura de Datos (`Beginner`)  
> **Término en Inglés (Flowchart):** `Binary Trees & Traversals (Pre/In/Post-Order)`  
> **Prerrequisitos Recomendados:** Divide & Conquer → Linked Lists

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Enseña a pensar en Árboles Binarios desde la perspectiva de UN SOLO NODO: '¿Qué información necesito pasarle a mis hijos hacia abajo (Pre-order) o qué información necesito que mis hijos me devuelvan hacia arriba (Post-order)?'. Explica con 'Diameter of Binary Tree' cómo actualizar una respuesta global mientras retornas la altura hacia el padre.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Binary Trees", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Estructuras jerárquicas TreeNode con N ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Binary Trees?
Estructura jerárquica sin ciclos donde cada nodo tiene un valor y hasta dos hijos (`left` y `right`). Como cada subárbol es a su vez un árbol binario, el 95% de sus problemas se resuelven con funciones recursivas elegantes de 5 líneas.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** El organigrama de una empresa o un árbol genealógico: el director general (Raíz / `root`) le pide un reporte a su gerente izquierdo y a su gerente derecho; cada gerente hace lo mismo con su equipo hasta llegar a los empleados sin gente a cargo (Hojas / `leaves`), y los resultados suben sumándose hasta la raíz.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** No intentes rastrear en tu cabeza toda la recursión del árbol completo: enfócate solo en la relación entre `root`, `root.left` y `root.right`.
2. **Idea Clave #2:** Pre-Order pasa información de padres a hijos (Top-Down); Post-Order agrega información de hijos a padres (Bottom-Up).
3. **Idea Clave #3:** Un árbol binario de N nodos siempre tiene exactamente `N - 1` aristas.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Binary Trees)
- ✅ Representar datos jerárquicos, expresiones sintácticas (AST), decisiones o estructuras recursivas.
- ✅ **Pre-order (`Raíz -> Izq -> Der`)**: Clonar o serializar un árbol de arriba hacia abajo.
- ✅ **In-order (`Izq -> Raíz -> Der`)**: Procesar un Árbol Binario de Búsqueda (BST) en orden ascendente.
- ✅ **Post-order (`Izq -> Der -> Raíz`)**: Calcular alturas, diámetros, sumas de subárboles o el Ancestro Común Más Bajo (LCA), donde necesitas las respuestas de ambos hijos antes de calcular la del padre.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si el árbol está completamente degenerado en una línea recta (altura `H = N`) y el lenguaje tiene límite de recursión bajo, usa recorrido iterativo con pila o cola.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Estructuras jerárquicas TreeNode con N ≤ 10⁵`
- **Complejidad Temporal Promedio:** `Recorrido completo: O(N) visitando cada nodo 1 vez`
- **Complejidad Temporal Peor Caso:** `O(N)`
- **Complejidad Espacial:** `O(H) altura del árbol en la pila de recursión`
- **Nota Técnica:** El espacio en el Call Stack es O(H), donde H es la altura del árbol (O(log N) balanceado, O(N) degenerado).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Definir qué significa el caso base `if not root:` (normalmente devuelve `0`, `None` o `True`).
2. Decidir qué valor debe retornar la función recursiva al padre.
3. Combinar `left_res` y `right_res` con `root.val`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En problemas como `Diameter of Binary Tree` o `Binary Tree Maximum Path Sum`, confundir el camino que 'hace curva en el nodo actual' (`left + right`, que actualiza el máximo global) con el camino que 'puede seguir subiendo hacia el padre' (`max(left, right)`, que solo puede elegir una rama).

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
class TreeNode:
    def __init__(self, val: int = 0, left: "TreeNode | None" = None, right: "TreeNode | None" = None):
        self.val = val
        self.left = left
        self.right = right


def max_depth_postorder(root: TreeNode | None) -> int:
    """
    Mentalidad Post-Order:
    1. Caso base: un árbol vacío tiene altura 0.
    2. Pide la altura al hijo izquierdo y al hijo derecho.
    3. Tu altura es 1 + max(izq, der).
    """
    if not root:
        return 0
    left_height = max_depth_postorder(root.left)
    right_height = max_depth_postorder(root.right)
    return 1 + max(left_height, right_height)
```

### Plantilla en TypeScript / JavaScript
```typescript
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function maxDepth(root: TreeNode | null): number {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] La definición recursiva de un Árbol Binario
- **🎬 Visual en Pantalla / Slide:** Árbol binario donde cada hijo se enmarca mostrando que es un árbol idéntico más pequeño.
- **🎙️ Narración / Guion:**
  > "Los árboles binarios parecen intimidantes hasta que descubres un secreto: no tienes que resolver todo el árbol. Solo tienes que resolver un nodo suponiendo que tus hijos izquierdo y derecho ya hicieron su trabajo."

### ⏱️ [01:45 - 04:30] Pre-Order, In-Order y Post-Order: Cuándo usar cada uno
- **🎬 Visual en Pantalla / Slide:** Un cursor rodeando el contorno del árbol marcando la primera visita (Pre), visita inferior (In) y última visita (Post).
- **🎙️ Narración / Guion:**
  > "Pre-order, In-order y Post-order no son tres algoritmos distintos: son el mismo recorrido visto en tres momentos diferentes: al llegar al nodo, al pasar entre sus dos hijos y antes de despedirte hacia arriba."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#104. Maximum Depth of Binary Tree** | `Easy` | [https://leetcode.com/problems/maximum-depth-of-binary-tree/](https://leetcode.com/problems/maximum-depth-of-binary-tree/) | Caso base `None -> 0`, paso recursivo `1 + max(depth(left), depth(right))`. |
| **#226. Invert Binary Tree** | `Easy` | [https://leetcode.com/problems/invert-binary-tree/](https://leetcode.com/problems/invert-binary-tree/) | Intercambia `root.left, root.right = invert(root.right), invert(root.left)`. |
| **#543. Diameter of Binary Tree** | `Easy` | [https://leetcode.com/problems/diameter-of-binary-tree/](https://leetcode.com/problems/diameter-of-binary-tree/) | En cada nodo, el camino más largo que pasa por él como pico es `left_height + right_height`, mientras retornas hacia arriba `1 + max(left_height, right_height)`. |

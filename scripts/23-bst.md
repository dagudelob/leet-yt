# 🎬 Episodio #23: Binary Search Trees (Árboles Binarios de Búsqueda - BST)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 4 — Estructura de Datos (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Binary Search Trees (BST)`  
> **Prerrequisitos Recomendados:** Binary Trees → Binary Search

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo un BST combina la búsqueda rápida de Binary Search con la inserción flexible de una Linked List. Haz énfasis en las 2 grandes lecciones de entrevistas sobre BST: 1) La trampa de 'Validate BST' (por qué comparar solo `node.left.val < node.val` está mal y debes propagar el rango `(low, high)`), y 2) Que el recorrido In-Order aplana cualquier BST en una lista ordenada.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "BST", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Árbol con propiedad left < node < right o búsquedas por rango en árbol) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es BST?
Un árbol binario con una ley de orden global: TODOS los nodos del subárbol izquierdo son estrictamente menores que la raíz, y TODOS los del subárbol derecho son estrictamente mayores. Permite buscar, insertar y borrar en O(log N) cuando está balanceado.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Un árbol de decisiones donde cada puerta tiene un cartel numérico: si buscas el número 42 y estás en la puerta 50, ni siquiera miras el pasillo derecho porque sabes con certeza que todo a la derecha es mayor que 50; giras a la izquierda descartando la mitad del edificio.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Invariante global del BST: TODO el subárbol izquierdo debe ser `< root.val`, no solo el hijo izquierdo directo.
2. **Idea Clave #2:** El recorrido In-Order (`Izq -> Raíz -> Der`) de un BST visita los valores en orden ascendente perfecto.
3. **Idea Clave #3:** En un BST, navegar hacia un objetivo es idéntico a Binary Search y se puede hacer en O(1) espacio con un simple bucle `while curr:`.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR BST)
- ✅ Buscar, insertar o encontrar el ancestro común (`LCA`) aprovechando la propiedad de orden `left < root < right` en O(H).
- ✅ Obtener los elementos ordenados de menor a mayor o hallar el `K-th Smallest Element` mediante un recorrido **In-Order (`Izq -> Raíz -> Der`)**.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si insertas elementos ya ordenados (`1, 2, 3, 4, 5`) en un BST simple sin auto-balanceo, se degenera en una lista enlazada con altura `O(N)`.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Árbol con propiedad left < node < right o búsquedas por rango en árbol`
- **Complejidad Temporal Promedio:** `Búsqueda / Inserción / Borrado: O(log N) en BST balanceado`
- **Complejidad Temporal Peor Caso:** `O(H) donde H es la altura (hasta O(N) si no está balanceado)`
- **Complejidad Espacial:** `O(H) pila de recursión (O(1) si se navega iterativamente)`
- **Nota Técnica:** Un recorrido In-Order de cualquier BST válido produce un arreglo estrictamente creciente.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Si necesitas buscar un valor o el LCA de dos nodos, compara con `curr.val` para elegir si bajar por `curr.left` o `curr.right`.
2. Si necesitas validar el BST, pasa `(low, high)` en la recursión actualizando el tope superior al ir a la izquierda y el inferior al ir a la derecha.
3. Si el problema habla de 'el K-ésimo menor' o 'la diferencia mínima entre valores', piensa inmediatamente en In-Order.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En `Validate BST`, verificar únicamente `root.left.val < root.val < root.right.val`: falla cuando un nieto a la izquierda de la derecha es menor que la raíz principal.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def is_valid_bst(root, low: float = float("-inf"), high: float = float("inf")) -> bool:
    """
    Validación de BST propagando el rango permitido (low, high) hacia abajo.
    ¡No basta comparar solo con el padre inmediato!
    """
    if not root:
        return True
    if not (low < root.val < high):
        return False
    return (
        is_valid_bst(root.left, low, root.val)
        and is_valid_bst(root.right, root.val, high)
    )


def search_bst_iterative(root, target: int):
    """
    Búsqueda en O(H) tiempo y O(1) espacio descartando la mitad en cada paso.
    """
    curr = root
    while curr:
        if target == curr.val:
            return curr
        curr = curr.left if target < curr.val else curr.right
    return None
```

### Plantilla en TypeScript / JavaScript
```typescript
import { TreeNode } from "./trees";

export function isValidBST(
  root: TreeNode | null,
  low = -Infinity,
  high = Infinity
): boolean {
  if (root === null) return true;
  if (root.val <= low || root.val >= high) return false;
  return (
    isValidBST(root.left, low, root.val) &&
    isValidBST(root.right, root.val, high)
  );
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Binary Search convertido en Árbol: El invariante del BST
- **🎬 Visual en Pantalla / Slide:** Un arreglo ordenado elevándose por su punto medio hasta formar un BST balanceado.
- **🎙️ Narración / Guion:**
  > "¿Qué pasaría si conviertes cada decisión de Binary Search en un nodo físico con punteros? Obtienes un Binary Search Tree. En cada nodo, todo lo menor vive a la izquierda y todo lo mayor vive a la derecha."

### ⏱️ [01:45 - 04:30] La trampa clásica de Validate BST y el poder del In-Order
- **🎬 Visual en Pantalla / Slide:** Un nodo nieto violando el límite de su abuelo, detectado por el intervalo `(low, high)`.
- **🎙️ Narración / Guion:**
  > "Cuidado con la trampa favorita de los entrevistadores: para que un árbol sea un BST válido, no basta que cada hijo cumpla con su padre directo; debe respetar el rango heredado de todos sus ancestros."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#98. Validate Binary Search Tree** | `Medium` | [https://leetcode.com/problems/validate-binary-search-tree/](https://leetcode.com/problems/validate-binary-search-tree/) | Propaga el intervalo abierto `(min_val, max_val)` hacia los hijos o verifica que el recorrido In-Order sea estrictamente creciente. |
| **#230. Kth Smallest Element in a BST** | `Medium` | [https://leetcode.com/problems/kth-smallest-element-in-a-bst/](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) | Recorrido In-Order (`Izq -> Raíz -> Der`) deteniéndote en el K-ésimo nodo visitado. |
| **#235. Lowest Common Ancestor of a Binary Search Tree** | `Medium` | [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) | Si ambos `p` y `q` son menores que `curr`, baja a la izquierda; si ambos son mayores, baja a la derecha; el primer punto donde se separan es el LCA. |

# 🎬 Episodio #15: Linked Lists (Listas Enlazadas Simples y Dobles)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 3 — Estructura de Datos (`Beginner`)  
> **Término en Inglés (Flowchart):** `Singly & Doubly Linked Lists`  
> **Prerrequisitos Recomendados:** Arrays

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Contrasta visualmente un Array (casilleros pegados en memoria) con una Linked List (nodos unidos por flechas/punteros). Enseña por qué el 'Nodo Dummy (Centinela)' es el mejor amigo del programador para evitar errores de `NullPointerException` cuando la cabeza de la lista cambia.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Linked Lists", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Manipulación de punteros in-place en O(1) memoria extra) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Linked Lists?
Nodos independientes dispersos en memoria donde cada uno guarda su valor y una flecha (`next`, y `prev` en listas dobles) al siguiente nodo. Permiten insertar o eliminar en O(1) en cualquier punto si ya tienes la referencia al nodo.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Una búsqueda del tesoro con pistas en sobres: el primer sobre no está pegado físicamente al segundo, pero adentro tiene un papel que dice 'la siguiente pista está debajo de la maceta azul'. Para llegar a la pista #5 debes abrir las pistas 1, 2, 3 y 4 en orden.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En una Linked List no existen índices automáticos: perder la referencia a `head` significa perder toda la lista.
2. **Idea Clave #2:** El orden en que reasignas punteros importa: guarda `nxt = curr.next` antes de sobrescribir `curr.next`.
3. **Idea Clave #3:** Un nodo `dummy` antes de `head` hace que todos los nodos tengan un nodo previo real.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Linked Lists)
- ✅ Necesitas insertar o eliminar elementos en O(1) en medio o en los extremos sin desplazar memoria contigua.
- ✅ Listas Doblemente Enlazadas (`prev` y `next`): cuando necesitas quitar un nodo específico de en medio de una cola en O(1) teniendo su referencia directa (pieza clave de LRU Cache).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Cuando necesitas acceso aleatorio por índice (`get(i)` cuesta O(N) porque debes caminar desde la cabeza `head`).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Manipulación de punteros in-place en O(1) memoria extra`
- **Complejidad Temporal Promedio:** `Insertar/Borrar con puntero al nodo: O(1) | Buscar por índice/valor: O(N)`
- **Complejidad Temporal Peor Caso:** `O(N)`
- **Complejidad Espacial:** `O(N) nodos y punteros`
- **Nota Técnica:** Usar un nodo centinela `dummy = ListNode(0, head)` elimina los casos especiales al borrar o cambiar la cabeza.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Dibujar siempre 3 cajitas con flechas antes de escribir código de punteros.
2. Crear `dummy = ListNode(0, head)` siempre que la cabeza original pueda cambiar o eliminarse.
3. Retornar `dummy.next` al final.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Hacer `curr.next = nuevo` antes de conectar `nuevo.next = curr.next`, cortando la cadena y perdiendo el resto de la lista en memoria.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
class ListNode:
    def __init__(self, val: int = 0, next: "ListNode | None" = None):
        self.val = val
        self.next = next


def delete_value_with_dummy(head: ListNode | None, target: int) -> ListNode | None:
    """
    El Truco del Nodo Dummy (Centinela):
    Evita tener que escribir un 'if' especial cuando el nodo a borrar es el propio 'head'.
    """
    dummy = ListNode(0, head)
    curr = dummy
    while curr.next:
        if curr.next.val == target:
            curr.next = curr.next.next  # Saltamos el nodo objetivo en O(1)
        else:
            curr = curr.next
    return dummy.next
```

### Plantilla en TypeScript / JavaScript
```typescript
export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function deleteValueWithDummy(head: ListNode | null, target: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let curr: ListNode = dummy;
  while (curr.next !== null) {
    if (curr.next.val === target) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }
  return dummy.next;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] Arrays vs Linked Lists: Cajas contiguas vs Búsqueda del tesoro
- **🎬 Visual en Pantalla / Slide:** Animación de nodos enlazados flotando en memoria conectados por flechas luminosas.
- **🎙️ Narración / Guion:**
  > "Si los Arrays son casilleros pegados en una pared, una Linked List es una cadena de pistas donde cada nodo solo sabe dónde vive el siguiente. Eso hace que buscar por posición sea lento, pero insertar o cortar eslabones sea instantáneo."

### ⏱️ [01:30 - 04:00] El superpoder del Nodo Dummy (Centinela)
- **🎬 Visual en Pantalla / Slide:** Un nodo gris 'Dummy' colocado delante de 'head' permitiendo borrar el primer elemento sin casos borde.
- **🎙️ Narración / Guion:**
  > "El 80% de los bugs en listas enlazadas ocurren cuando te toca borrar o mover el primer nodo. La solución profesional es colocar un nodo fantasma Dummy al inicio y devolver `dummy.next` al final."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#21. Merge Two Sorted Lists** | `Easy` | [https://leetcode.com/problems/merge-two-sorted-lists/](https://leetcode.com/problems/merge-two-sorted-lists/) | Crea un nodo `dummy` y ve cosiendo el menor entre `l1` y `l2`. |
| **#203. Remove Linked List Elements** | `Easy` | [https://leetcode.com/problems/remove-linked-list-elements/](https://leetcode.com/problems/remove-linked-list-elements/) | Usa `dummy.next = head` por si los primeros nodos también deben eliminarse. |
| **#707. Design Linked List** | `Medium` | [https://leetcode.com/problems/design-linked-list/](https://leetcode.com/problems/design-linked-list/) | Implementa con centinelas `head_dummy` y `tail_dummy` para simplificar inserciones. |

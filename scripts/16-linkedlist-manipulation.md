# 🎬 Episodio #16: Linked List Manipulation (Fast & Slow Pointers y Reversión)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 3 — Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Fast & Slow Pointers & In-Place Reversal`  
> **Prerrequisitos Recomendados:** Linked Lists → Two Pointers

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Haz que el oyente domine de memoria las dos coreografías más preguntadas en entrevistas: 1) El baile de 4 pasos para invertir una lista (`nxt = curr.next`, `curr.next = prev`, `prev = curr`, `curr = nxt`) y 2) El algoritmo de la Tortuga y la Liebre de Floyd, cerrando con cómo ambos se combinan en 'Reorder List' o 'Palindrome Linked List'.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "LL Manipulation", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Operaciones sobre listas o secuencias cíclicas exigiendo O(1) memoria extra) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es LL Manipulation?
Las dos técnicas quirúrgicas sobre listas enlazadas: 1) Tortuga y Liebre (`slow` avanza 1 paso, `fast` avanza 2 pasos) para hallar el nodo central o detectar ciclos en O(1) espacio, y 2) Inversión de punteros in-place con `prev, curr, nxt`.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Dos corredores en una pista: si la pista es recta, cuando el corredor que va al doble de velocidad llega a la meta, el corredor lento va exactamente por la mitad. Y si la pista es circular (hay un ciclo), el corredor rápido inevitablemente alcanzará al lento dándole una vuelta de ventaja.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Invertir una lista in-place solo requiere 3 variables (`prev`, `curr`, `nxt`) y 4 asignaciones en orden cíclico.
2. **Idea Clave #2:** Cuando `fast` llega al final, `slow` está exactamente en el medio.
3. **Idea Clave #3:** En detección de ciclos de Floyd, si tras chocar reinicias un puntero en `head` y avanzas ambos de 1 en 1, se encuentran en la entrada exacta del ciclo.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR LL Manipulation)
- ✅ Encontrar el nodo del medio de una lista en una sola pasada sin contar su longitud previamente.
- ✅ Detectar si una lista (o secuencia de estados funcionales) tiene un ciclo y hallar el nodo exacto donde empieza el ciclo (Algoritmo de Floyd).
- ✅ Invertir toda la lista o un subsegmento `[left, right]` in-place sin crear nodos nuevos.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Nunca hagas `fast.next.next` sin verificar primero `while fast and fast.next:` en la condición del bucle.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Operaciones sobre listas o secuencias cíclicas exigiendo O(1) memoria extra`
- **Complejidad Temporal Promedio:** `O(N)`
- **Complejidad Temporal Peor Caso:** `O(N)`
- **Complejidad Espacial:** `O(1) punteros in-place`
- **Nota Técnica:** Usa O(1) de memoria auxiliar frente a O(N) que usaría un Hash Set o pila recursiva.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Para hallar mitad/ciclo: inicializar `slow = fast = head` y ciclar con `while fast and fast.next:`.
2. Para invertir: inicializar `prev = None`, `curr = head`, respaldar `nxt = curr.next` en cada paso y retornar `prev`.
3. Para problemas compuestos (ej. `Reorder List`), partir la lista poniendo `slow.next = None` antes de invertir la segunda mitad.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En `Reorder List`, olvidar cortar el enlace entre la primera y la segunda mitad (`slow.next = None`), provocando un ciclo infinito al mezclar las listas.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def reverse_linked_list(head):
    """
    1. Reversión In-Place con 3 punteros: prev, curr, nxt.
    Tiempo: O(N) | Espacio: O(1)
    """
    prev = None
    curr = head
    while curr:
        nxt = curr.next      # 1. Guardar el siguiente antes de romper el enlace
        curr.next = prev     # 2. Invertir la flecha hacia atrás
        prev = curr          # 3. Avanzar prev
        curr = nxt           # 4. Avanzar curr
    return prev


def middle_and_cycle_detection(head):
    """
    2. Tortuga y Liebre (Fast & Slow Pointers de Floyd).
    """
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True  # ¡Ciclo detectado!
    return False
```

### Plantilla en TypeScript / JavaScript
```typescript
import { ListNode } from "./linked-list";

export function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;
  while (curr !== null) {
    const nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }
  return prev;
}

export function hasCycleFloyd(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 02:00] La coreografía de 4 pasos: Invertir una Linked List in-place
- **🎬 Visual en Pantalla / Slide:** Animación de las flechas girando 180 grados nodo por nodo con `prev`, `curr` y `nxt`.
- **🎙️ Narración / Guion:**
  > "Invertir una lista enlazada es una pregunta tan clásica que deberías poder escribirla con los ojos cerrados. No intentes memorizar código: memoriza el ciclo visual donde cada variable toma el lugar de la siguiente."

### ⏱️ [02:00 - 04:45] Tortuga y Liebre (Floyd) y el Combo de Reorder List
- **🎬 Visual en Pantalla / Slide:** Dos cursores a velocidad 1x y 2x hallando la mitad y luego intercalando extremos.
- **🎙️ Narración / Guion:**
  > "¿Cómo encuentras la mitad de una lista sin saber cuántos nodos tiene? Con un puntero lento y uno rápido. Y cuando combinas eso con invertir la segunda mitad, resuelves problemas Medium y Hard en O(1) de memoria."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#206. Reverse Linked List** | `Easy` | [https://leetcode.com/problems/reverse-linked-list/](https://leetcode.com/problems/reverse-linked-list/) | Baile de 4 líneas con `prev = None`, `curr = head` y `nxt = curr.next`. |
| **#141. Linked List Cycle** | `Easy` | [https://leetcode.com/problems/linked-list-cycle/](https://leetcode.com/problems/linked-list-cycle/) | Tortuga (`slow.next`) y Liebre (`fast.next.next`) en O(1) espacio. |
| **#143. Reorder List** | `Medium` | [https://leetcode.com/problems/reorder-list/](https://leetcode.com/problems/reorder-list/) | El combo definitivo: 1) Halla la mitad con Slow/Fast, 2) Invierte la 2ª mitad, 3) Intercala ambas mitades. |

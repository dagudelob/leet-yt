# 🎬 Episodio #20: Design + Supporting Data Structures (LRU Cache, O(1) Set)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 3 — Estructura de Datos + Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Data Structure Design (LRU, LFU, RandomizedSet)`  
> **Prerrequisitos Recomendados:** Hash Table → Linked Lists → Arrays → Stacks (LIFO)

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Presenta este episodio como 'Arquitectura de Estructuras Híbridas': cómo fusionar dos estructuras básicas para conseguir superpoderes O(1). Explica los 3 diseños más preguntados en la historia de las entrevistas: 1) LRU Cache (Hash Map + Doubly Linked List), 2) RandomizedSet (Array + Hash Map con el truco de intercambiar con el último elemento al borrar), y 3) Min Stack.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Design + Supporting DS", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Diseño de clases con múltiples métodos exigiendo O(1) por operación) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Design + Supporting DS?
Combinar dos o más estructuras de datos (como `Hash Map + Doubly Linked List` o `Hash Map + Dynamic Array`) para superar las debilidades individuales de cada una y lograr que TODAS las operaciones compuestas corran en O(1).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Un bibliotecario con un índice digital (Hash Map) que le dice en un segundo exactamente en qué eslabón de una cadena móvil (Doubly Linked List) está cualquier libro. Así puede encontrar el libro en O(1) con el índice y moverlo al frente de 'los más leídos recientemente' en O(1) desenganchando su eslabón.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Ninguna estructura básica lo hace todo en O(1): el Array tiene `getRandom` O(1) pero borrado O(N); el Hash Map tiene búsqueda O(1) pero no tiene índices aleatorios. ¡Juntos logran todo en O(1)!
2. **Idea Clave #2:** En LRU Cache, los dos nodos centinela `left_dummy` (LRU) y `right_dummy` (MRU) eliminan todos los errores de punteros nulos.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Design + Supporting DS)
- ✅ El problema empieza con `Design a data structure that supports...` exigiendo O(1) en múltiples operaciones aparentemente contradictorias.
- ✅ **LRU Cache** (`get` y `put` en O(1) expulsando el menos usado recientemente): `Hash Map + Doubly Linked List`.
- ✅ **Insert / Delete / GetRandom en O(1)** (`RandomizedSet`): `Hash Map {val: idx} + Dynamic Array` (intercambiando el elemento a borrar con el último del array antes de hacer `pop()`).
- ✅ **Min Stack** (`push`, `pop`, `getMin` en O(1)): Pila que guarda pares `(valor, minimo_hasta_aqui)`.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Cuando una sola estructura estándar ya cumple los requisitos de tiempo.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Diseño de clases con múltiples métodos exigiendo O(1) por operación`
- **Complejidad Temporal Promedio:** `O(1) para todas las operaciones diseñadas`
- **Complejidad Temporal Peor Caso:** `O(1)`
- **Complejidad Espacial:** `O(N) o O(Capacidad)`
- **Nota Técnica:** Cada estructura soporta la operación donde la otra sería O(N).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Listar las operaciones pedidas y qué complejidad exige cada una.
2. Elegir la estructura primaria (ej. Hash Map para búsqueda O(1)) y la estructura de soporte (ej. Doubly Linked List para orden de uso O(1)).
3. Mantener ambas estructuras sincronizadas en cada inserción o borrado.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** En `RandomizedSet.remove(val)`, borrar primero `del val_to_idx[val]` antes de actualizar `val_to_idx[last_val] = idx` falla cuando el elemento a borrar ES precisamente el último elemento del arreglo.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
import random

class RandomizedSet:
    """
    Combo Clásico: Dynamic Array + Hash Map para Insert, Remove y GetRandom en O(1).
    Truco clave: Para borrar nums[idx] en O(1), copiamos el ÚLTIMO elemento en idx y hacemos pop().
    """
    def __init__(self):
        self.nums: list[int] = []
        self.val_to_idx: dict[int, int] = {}

    def insert(self, val: int) -> bool:
        if val in self.val_to_idx:
            return False
        self.val_to_idx[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.val_to_idx:
            return False
        idx = self.val_to_idx[val]
        last_val = self.nums[-1]
        # Movemos el último elemento al hueco 'idx'
        self.nums[idx] = last_val
        self.val_to_idx[last_val] = idx
        # Eliminamos el último en O(1)
        self.nums.pop()
        del self.val_to_idx[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)
```

### Plantilla en TypeScript / JavaScript
```typescript
export class MinStack {
  private stack: Array<{ val: number; min: number }> = [];

  push(val: number): void {
    const currentMin =
      this.stack.length === 0 ? val : Math.min(val, this.stack[this.stack.length - 1].min);
    this.stack.push({ val, min: currentMin });
  }

  pop(): void {
    this.stack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1].val;
  }

  getMin(): number {
    return this.stack[this.stack.length - 1].min;
  }
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 02:00] El arte de fusionar estructuras de datos
- **🎬 Visual en Pantalla / Slide:** Diagrama uniendo un Hash Map con una Lista Doblemente Enlazada (LRU Cache).
- **🎙️ Narración / Guion:**
  > "En las entrevistas de diseño de estructuras te pedirán cosas que parecen imposibles: buscar por llave en O(1), mantener el orden de uso reciente en O(1) y borrar de en medio en O(1). El secreto es hacer que dos estructuras trabajen en equipo."

### ⏱️ [02:00 - 05:00] LRU Cache y el truco del Swap-Pop en RandomizedSet
- **🎬 Visual en Pantalla / Slide:** Animación de cómo borrar el índice 2 de un Array en O(1) copiando el último elemento encima.
- **🎙️ Narración / Guion:**
  > "¿Cómo borras un elemento en medio de un Array en tiempo O(1) si no te importa el orden? Copias el último elemento sobre el que quieres borrar, actualizas su posición en el Hash Map y haces pop al final."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#146. LRU Cache** | `Medium` | [https://leetcode.com/problems/lru-cache/](https://leetcode.com/problems/lru-cache/) | Hash Map `{key: Node}` + Lista Doblemente Enlazada con nodos centinela `head` y `tail`. |
| **#380. Insert Delete GetRandom O(1)** | `Medium` | [https://leetcode.com/problems/insert-delete-getrandom-o1/](https://leetcode.com/problems/insert-delete-getrandom-o1/) | Array + Hash Map: para borrar en O(1), haz swap con `nums[-1]`, actualiza su índice en el mapa y haz `pop()`. |
| **#155. Min Stack** | `Medium` | [https://leetcode.com/problems/min-stack/](https://leetcode.com/problems/min-stack/) | Guarda en cada piso de la pila el par `(valor, minimo_acumulado)`. |

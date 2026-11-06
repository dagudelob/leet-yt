# 🎬 Episodio #17: Stacks (Pilas LIFO y Evaluación Anidada)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 3 — Estructura de Datos + Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Stacks (LIFO)`  
> **Prerrequisitos Recomendados:** Arrays

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Explica cómo una Pila (Stack) es la máquina del tiempo para todo lo que tenga anidamiento ('lo último que se abrió debe ser lo primero en cerrarse'). Muestra por qué toda llamada recursiva en la computadora usa internamente un Call Stack y cómo usar una pila explícita resuelve paréntesis, rutas de archivos y decodificación de cadenas.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Stacks (LIFO)", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Estructuras anidadas, paréntesis, calculadoras o historial con N ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Stacks (LIFO)?
Estructura Last-In, First-Out (el último en entrar es el primero en salir) ideal para recordar el historial reciente, validar estructuras anidadas (paréntesis, HTML), deshacer acciones y simular recursión de forma iterativa.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Una torre de platos limpios en una cafetería: siempre colocas el plato nuevo arriba del todo (`push`), y cuando alguien necesita un plato, toma exactamente ese último plato que pusiste arriba (`pop`).

### Ideas Clave que debes recordar
1. **Idea Clave #1:** LIFO (Last-In, First-Out): el elemento más reciente en entrar es siempre el primero en resolverse.
2. **Idea Clave #2:** Siempre verifica `if not stack:` antes de leer `stack[-1]` o hacer `stack.pop()`.
3. **Idea Clave #3:** Al finalizar el recorrido, verifica que `len(stack) == 0` por si quedaron aperturas huérfanas sin cerrar.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Stacks (LIFO))
- ✅ Validar o emparejar símbolos que abren y cierran en orden anidado (`()`, `{}`, `[]`, etiquetas).
- ✅ Evaluar expresiones matemáticas (Notación Polaca Inversa / RPN, calculadoras con precedencia, decodificar strings `3[a2[c]]`).
- ✅ Rastrear el camino actual (historial de directorios `/a/b/../c`, botón Undo/Back).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Cuando necesitas atender elementos en el orden exacto de llegada (ahí usa una Queue FIFO).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Estructuras anidadas, paréntesis, calculadoras o historial con N ≤ 10⁵`
- **Complejidad Temporal Promedio:** `Push: O(1) | Pop: O(1) | Peek (`stack[-1]`): O(1)`
- **Complejidad Temporal Peor Caso:** `O(N) para procesar N elementos`
- **Complejidad Espacial:** `O(N) en el peor caso cuando todos los elementos se apilan`
- **Nota Técnica:** En Python, una `list` normal funciona como Stack perfecto usando `append()` y `pop()`.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Recorrer los tokens o caracteres de izquierda a derecha.
2. Si inicia un contexto nuevo (paréntesis abierto, operando), hacer `stack.append(x)`.
3. Si cierra o combina el contexto más reciente, hacer `stack.pop()` y combinar con el nuevo tope.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Retornar `True` al terminar el bucle en `Valid Parentheses` sin comprobar que la pila quedó vacía (falla en inputs como `'((('`).

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def is_valid_parentheses(s: str) -> bool:
    """
    Patrón Clásico de Emparejamiento LIFO con Stack.
    Tiempo: O(N) | Espacio: O(N)
    """
    closing_to_opening = {")": "(", "]": "[", "}": "{"}
    stack: list[str] = []

    for ch in s:
        if ch in closing_to_opening:
            # Si llega un cierre, el tope de la pila DEBE ser su apertura correspondiente
            if not stack or stack[-1] != closing_to_opening[ch]:
                return False
            stack.pop()
        else:
            stack.append(ch)

    # Al final la pila debe quedar completamente vacía
    return len(stack) == 0
```

### Plantilla en TypeScript / JavaScript
```typescript
export function isValidParentheses(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];

  for (const ch of s) {
    if (ch in pairs) {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
        return false;
      }
      stack.pop();
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] La ley del anidamiento: El último en abrir es el primero en cerrar
- **🎬 Visual en Pantalla / Slide:** Cajas rusas (matrioshkas) y paréntesis anidados apilándose y desapilándose.
- **🎙️ Narración / Guion:**
  > "Piensa en cómo funcionan los paréntesis en matemáticas o las carpetas en tu computadora: el último bloque que abriste es obligatoriamente el primero que tienes que cerrar. Esa propiedad tiene nombre: LIFO, y su estructura es el Stack."

### ⏱️ [01:30 - 04:00] De Valid Parentheses a Calculadoras y Decode String
- **🎬 Visual en Pantalla / Slide:** Animación de `3[a2[c]]` guardando el contexto previo en la pila al entrar a cada corchete.
- **🎙️ Narración / Guion:**
  > "Cuando tienes estructuras dentro de otras estructuras, como en Decode String, la pila te permite pausar lo que estabas construyendo afuera, resolver lo de adentro y luego retomar exactamente donde te quedaste."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#20. Valid Parentheses** | `Easy` | [https://leetcode.com/problems/valid-parentheses/](https://leetcode.com/problems/valid-parentheses/) | Apila aperturas y verifica el tope al encontrar un cierre. |
| **#150. Evaluate Reverse Polish Notation** | `Medium` | [https://leetcode.com/problems/evaluate-reverse-polish-notation/](https://leetcode.com/problems/evaluate-reverse-polish-notation/) | Apila números; al ver un operador, saca los 2 últimos (`b = pop()`, `a = pop()`) y apila `a op b`. |
| **#394. Decode String** | `Medium` | [https://leetcode.com/problems/decode-string/](https://leetcode.com/problems/decode-string/) | Al ver `[`, guarda `(string_previo, numero_k)` en la pila; al ver `]`, desapila y multiplica. |

# 🎬 Episodio #03: Simulation (Simulación Paso a Paso)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 1 — Patrón Algorítmico (`Beginner`)  
> **Término en Inglés (Flowchart):** `Simulation`  
> **Prerrequisitos Recomendados:** Basic DSA & Big-O

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Enfoca este video en el arte de escribir código limpio para problemas de Simulación. Enseña el truco profesional de los 'vectores de dirección' `(dx, dy)` con aritmética modular `% 4` para evitar bloques gigantes de `if/else` que producen bugs en entrevistas.

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Simulation", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Reglas directas con N o pasos ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Simulation?
Traducir fielmente las reglas de un proceso, juego o sistema físico en código limpio y libre de bugs, manteniendo el estado en cada instante de tiempo o movimiento.

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Ser el árbitro de un juego de mesa que sigue el manual de instrucciones al pie de la letra: lanzas los dados, mueves la ficha exactamente X casillas, verificas si cayó en una trampa y actualizas el marcador.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** En problemas de simulación, el reto no es algorítmico sino de ingeniería limpia y manejo de bordes.
2. **Idea Clave #2:** Usa arreglos de direcciones `dirs = [(0,1), (1,0), (0,-1), (-1,0)]` para rotar con `(d + 1) % 4`.
3. **Idea Clave #3:** Si el problema pide simular 10⁹ pasos en un estado finito, busca el ciclo y usa el operador módulo.

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Simulation)
- ✅ El enunciado describe reglas explícitas paso a paso (un robot que gira en una cuadrícula, un juego por turnos, un cajero que da cambio).
- ✅ No se pide encontrar un camino óptimo entre millones de opciones, sino calcular el resultado exacto tras aplicar las reglas dadas.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Cuando el número de pasos a simular es gigantesco (ej. K = 10¹² pasos); ahí debes detectar ciclos con aritmética modular (`K % longitud_ciclo`) en vez de simular uno por uno.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Reglas directas con N o pasos ≤ 10⁵`
- **Complejidad Temporal Promedio:** `O(Pasos × Costo por paso)`
- **Complejidad Temporal Peor Caso:** `O(N) a O(N²)`
- **Complejidad Espacial:** `O(1) o proporcional al estado del tablero`
- **Nota Técnica:** Si hay ciclos repetitivos, usa el módulo del periodo para reducir K pasos grandes.

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Identificar las variables que definen el estado completo del sistema (ej. posición x, y, dirección d).
2. Codificar las transiciones de estado en funciones pequeñas o tablas de vectores.
3. Verificar condiciones de frontera antes de aplicar cada movimiento.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Escribir 16 `if/else` anidados para giros a izquierda/derecha en lugar de usar índices circulares `% 4`.
- 🚨 **Trampa de Entrevista:** En JavaScript/TypeScript, olvidar que `-1 % 4` da `-1`, por lo que para girar a la izquierda se usa `(d + 3) % 4`.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
def robot_simulation(commands: list[str]) -> tuple[int, int]:
    """
    Simulación con vectores de dirección (Norte, Este, Sur, Oeste).
    Evita decenas de if/else usando arreglos de desplazamiento dx, dy.
    """
    # Norte, Este, Sur, Oeste (sentido horario)
    dirs = [(0, 1), (1, 0), (0, -1), (-1, 0)]
    d = 0  # Empieza mirando al Norte
    x, y = 0, 0

    for cmd in commands:
        if cmd == "R":
            d = (d + 1) % 4
        elif cmd == "L":
            d = (d - 1) % 4
        else:
            steps = int(cmd)
            dx, dy = dirs[d]
            x += dx * steps
            y += dy * steps
    return x, y
```

### Plantilla en TypeScript / JavaScript
```typescript
export function robotSimulation(commands: string[]): [number, number] {
  // Norte, Este, Sur, Oeste en sentido horario
  const dirs: [number, number][] = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  let d = 0;
  let x = 0,
    y = 0;

  for (const cmd of commands) {
    if (cmd === "R") d = (d + 1) % 4;
    else if (cmd === "L") d = (d + 3) % 4;
    else {
      const steps = Number(cmd);
      x += dirs[d][0] * steps;
      y += dirs[d][1] * steps;
    }
  }
  return [x, y];
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:30] Qué es un problema de Simulación
- **🎬 Visual en Pantalla / Slide:** Un robot moviéndose en una cuadrícula con flechas de dirección.
- **🎙️ Narración / Guion:**
  > "Hay problemas donde no necesitas inventar un algoritmo secreto: el enunciado ya te dice exactamente qué hacer en cada paso. El verdadero examen aquí es traducir esas reglas sin enredarte en tu propio código."

### ⏱️ [01:30 - 04:00] El truco de los Vectores de Dirección
- **🎬 Visual en Pantalla / Slide:** Brújula con índices 0, 1, 2, 3 mostrando `(d + 1) % 4` y `(d + 3) % 4`.
- **🎙️ Narración / Guion:**
  > "Olvídate de escribir un switch gigante para Norte, Sur, Este y Oeste. Si ordenas tus vectores en sentido horario, girar a la derecha siempre es sumar 1 módulo 4."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#657. Robot Return to Origin** | `Easy` | [https://leetcode.com/problems/robot-return-to-origin/](https://leetcode.com/problems/robot-return-to-origin/) | Rastrea coordenadas (x, y) aplicando vectores de dirección. |
| **#54. Spiral Matrix** | `Medium` | [https://leetcode.com/problems/spiral-matrix/](https://leetcode.com/problems/spiral-matrix/) | Simula los 4 bordes (top, bottom, left, right) encogiéndolos tras cada pasada. |
| **#874. Walking Robot Simulation** | `Medium` | [https://leetcode.com/problems/walking-robot-simulation/](https://leetcode.com/problems/walking-robot-simulation/) | Vectores de dirección `(d + 1) % 4` + conjunto de obstáculos. |

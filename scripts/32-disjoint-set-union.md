# 🎬 Episodio #32: Disjoint Set Union (DSU / Union-Find & Kruskal MST)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 5 — Estructura de Datos + Patrón Algorítmico (`Intermediate`)  
> **Término en Inglés (Flowchart):** `Disjoint Set Union (DSU / Union-Find) & Minimum Spanning Tree`  
> **Prerrequisitos Recomendados:** Graphs → Binary Trees

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Muestra por qué Disjoint Set Union (Union-Find) es una de las estructuras con mejor relación 'pocas líneas de código vs poder extremo'. Explica visualmente las dos optimizaciones mágicas (Path Compression y Union by Size) que aplastan la altura del árbol a casi 1, y cómo al retornar `False` cuando `root_a == root_b` detectas ciclos y construyes el Árbol de Expansión Mínima (Kruskal).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Disjoint Set (Union-Find)", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Conectividad dinámica, fusión de cuentas/grupos, ciclos no dirigidos o Kruskal MST) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Disjoint Set (Union-Find)?
Estructura de datos ultrarrápida para gestionar grupos o componentes conexas dinámicas mediante dos operaciones en tiempo casi constante $O(\alpha(N)) \approx O(1)$: **`find(x)`** (¿quién es el líder del grupo de `x`?) y **`union(x, y)`** (fusionar los grupos de `x` y `y`).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** Empresas que se van fusionando: al principio cada persona es dueña de su propia startup (`parent[i] = i`). Cuando dos empresas se fusionan (`union`), el CEO de la más pequeña pasa a reportarle al CEO de la más grande (**Union by Rank/Size**). Y cuando alguien pregunta quién es el dueño supremo de su grupo (`find`), de paso actualiza su contacto directo con el CEO supremo (**Path Compression**).

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Inicialmente cada nodo es su propio jefe (`parent[i] = i`) y hay `N` componentes conexas.
2. **Idea Clave #2:** `Path Compression` (`self.parent[x] = self.find(self.parent[x])`) aplana el árbol en una línea recursiva.
3. **Idea Clave #3:** Cada vez que `union(u, v)` tiene éxito, el número total de componentes conexas disminuye exactamente en 1 (`self.components -= 1`).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Disjoint Set (Union-Find))
- ✅ El problema agrega conexiones (`edges`) dinámicamente y pregunta si dos nodos ya están conectados, cuántos grupos independientes quedan, o qué arista crea el primer ciclo (`Redundant Connection`, `Accounts Merge`).
- ✅ **Algoritmo de Kruskal (Minimum Spanning Tree - MST)**: Ordenar todas las aristas de menor a mayor peso e ir uniéndolas con `union(u, v)` si aún no estaban en el mismo grupo (`Min Cost to Connect All Points`).

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Si necesitas **DESCONECTAR** (borrar aristas) dinámicamente: Union-Find está diseñado para unir grupos hacia adelante, no para separarlos (a menos que inviertas las consultas en el tiempo de atrás hacia adelante).

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Conectividad dinámica, fusión de cuentas/grupos, ciclos no dirigidos o Kruskal MST`
- **Complejidad Temporal Promedio:** `O(α(N)) ≈ O(1) por operación `find` o `union``
- **Complejidad Temporal Peor Caso:** `O(α(N)) donde α es la inversa de Ackermann (≤ 4 para cualquier N en el universo)`
- **Complejidad Espacial:** `O(N) para los arreglos `parent` y `size``
- **Nota Técnica:** Combinar Path Compression + Union by Size/Rank logra complejidad prácticamente O(1).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Instanciar `uf = UnionFind(n)`.
2. Por cada relación o arista `(u, v)`, llamar a `uf.union(u, v)`.
3. Si necesitas saber si `x` e `y` están conectados, compara `uf.find(x) == uf.find(y)` (nunca compares `uf.parent[x] == uf.parent[y]` directamente sin llamar a `find`).

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Comparar `uf.parent[x] == uf.parent[y]` en vez de `uf.find(x) == uf.find(y)`: `parent[x]` puede no estar actualizado hasta la raíz suprema si aún no se ejecutó `find(x)` tras la última unión.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
class UnionFind:
    """
    Plantilla Profesional de Disjoint Set Union (DSU) en ~15 líneas.
    Incluye Compresión de Caminos (Path Compression) y Unión por Tamaño (Union by Size).
    Tiempo por operación: O(alpha(N)) ≈ O(1) | Espacio: O(N)
    """
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.size = [1] * n
        self.components = n

    def find(self, x: int) -> int:
        # Path Compression: apunta directamente a la raíz suprema
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a: int, b: int) -> bool:
        root_a, root_b = self.find(a), self.find(b)
        if root_a == root_b:
            return False  # ¡Ya estaban en el mismo grupo! (Arista redundante / Ciclo)

        # Union by Size: colgar el árbol más pequeño debajo del más grande
        if self.size[root_a] < self.size[root_b]:
            root_a, root_b = root_b, root_a
        self.parent[root_b] = root_a
        self.size[root_a] += self.size[root_b]
        self.components -= 1
        return True
```

### Plantilla en TypeScript / JavaScript
```typescript
export class UnionFind {
  parent: number[];
  size: number[];
  components: number;

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array<number>(n).fill(1);
    this.components = n;
  }

  find(x: number): number {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  union(a: number, b: number): boolean {
    let rootA = this.find(a);
    let rootB = this.find(b);
    if (rootA === rootB) return false;

    if (this.size[rootA] < this.size[rootB]) {
      [rootA, rootB] = [rootB, rootA];
    }
    this.parent[rootB] = rootA;
    this.size[rootA] += this.size[rootB];
    this.components--;
    return true;
  }
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Fusiones de empresas en tiempo O(1): ¿Qué es Union-Find?
- **🎬 Visual en Pantalla / Slide:** Nodos agrupándose bajo un líder y aplanando sus flechas directamente hacia la raíz con Path Compression.
- **🎙️ Narración / Guion:**
  > "Imagina que te dan cien mil ciudades y van construyendo carreteras una por una, preguntándote en cada instante si ya se puede viajar de A a B. Lanzar un DFS cada vez sería lentísimo. Union-Find responde esa pregunta en tiempo prácticamente constante."

### ⏱️ [01:45 - 04:30] Detección de Ciclos y el Algoritmo de Kruskal (MST)
- **🎬 Visual en Pantalla / Slide:** Aristas ordenadas por peso uniéndose con Union-Find y saltando las que forman ciclo.
- **🎙️ Narración / Guion:**
  > "Si intentas unir dos nodos que ya tienen el mismo jefe supremo, acabas de descubrir un ciclo. Y si ordenas las aristas de más barata a más cara e ignoras los ciclos, acabas de programar el famoso Algoritmo de Kruskal."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#684. Redundant Connection** | `Medium` | [https://leetcode.com/problems/redundant-connection/](https://leetcode.com/problems/redundant-connection/) | La primera arista `[u, v]` donde `uf.union(u, v)` devuelve `False` es exactamente la que cierra el ciclo. |
| **#721. Accounts Merge** | `Medium` | [https://leetcode.com/problems/accounts-merge/](https://leetcode.com/problems/accounts-merge/) | Une con DSU todas las cuentas que compartan al menos un correo electrónico. |
| **#1584. Min Cost to Connect All Points** | `Medium` | [https://leetcode.com/problems/min-cost-to-connect-all-points/](https://leetcode.com/problems/min-cost-to-connect-all-points/) | Algoritmo de Kruskal: ordena las aristas por distancia Manhattan y suma las `N - 1` aristas donde `union(u, v)` sea `True`. |

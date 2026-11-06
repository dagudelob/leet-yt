import { DSATopic, LevelMetadata } from "@/types/dsa";
import { TOPICS_LEVEL_1_2 } from "./topics-level-1-2";
import { TOPICS_LEVEL_3_4 } from "./topics-level-3-4";
import { TOPICS_LEVEL_5_6 } from "./topics-level-5-6";
import { TOPICS_LEVEL_7 } from "./topics-level-7";

export const ALL_DSA_TOPICS: DSATopic[] = [
  ...TOPICS_LEVEL_1_2,
  ...TOPICS_LEVEL_3_4,
  ...TOPICS_LEVEL_5_6,
  ...TOPICS_LEVEL_7,
].sort((a, b) => a.order - b.order);

export const TOPICS_BY_ID: Record<string, DSATopic> = Object.fromEntries(
  ALL_DSA_TOPICS.map((topic) => [topic.id, topic])
);

export const LEVEL_METADATA: LevelMetadata[] = [
  {
    level: 1,
    title: "Nivel 1: Fundamentos, Complejidad y Secuencias Lineales",
    subtitle: "Big-O, Fuerza Bruta, Simulación, Arrays, Strings, Two Pointers y Sliding Window",
    colorClass: "text-cyan-400",
    badgeClass: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    borderClass: "border-cyan-500/40",
    glowClass: "shadow-cyan-500/10",
    goalDescription:
      "Aprende a deducir la complejidad objetivo leyendo N en 5 segundos y domina los patrones O(N) sobre arreglos y cadenas sin gastar memoria extra.",
  },
  {
    level: 2,
    title: "Nivel 2: Preprocesamiento, Hashing, Ordenamiento y Búsqueda",
    subtitle: "Prefix Sums, Hash Tables, Counting/Buckets, Intervalos, Partitioning, Binary Search y Matrices 2D",
    colorClass: "text-emerald-400",
    badgeClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    borderClass: "border-emerald-500/40",
    glowClass: "shadow-emerald-500/10",
    goalDescription:
      "Transforma búsquedas O(N²) en O(1) con Tablas Hash y Prefix Sums, domina intervalos y aplica Binary Search tanto en arreglos como en espacios de respuestas.",
  },
  {
    level: 3,
    title: "Nivel 3: Punteros Enlazados, Pilas, Colas y Diseño O(1)",
    subtitle: "Linked Lists, Fast & Slow Pointers, Stacks, Queues/Deques, Monotonic Stack y LRU Cache",
    colorClass: "text-fuchsia-400",
    badgeClass: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
    borderClass: "border-fuchsia-500/40",
    glowClass: "shadow-fuchsia-500/10",
    goalDescription:
      "Domina la cirugía de punteros en memoria, el orden LIFO/FIFO, las pilas monótonas para 'Next Greater Element' y la fusión de estructuras para diseño O(1).",
  },
  {
    level: 4,
    title: "Nivel 4: Recursión, Árboles, Heaps y Backtracking",
    subtitle: "Divide & Conquer, Binary Trees, BST, DFS, BFS, Backtracking y Priority Queues (Top-K / Two Heaps)",
    colorClass: "text-violet-400",
    badgeClass: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    borderClass: "border-violet-500/40",
    glowClass: "shadow-violet-500/10",
    goalDescription:
      "Desbloquea el pensamiento recursivo sobre árboles, recorridos por profundidad (DFS) y niveles (BFS), poda combinatoria y colas de prioridad.",
  },
  {
    level: 5,
    title: "Nivel 5: Grafos, DAGs, Caminos Cortos, Conectividad y Tries",
    subtitle: "Listas de Adyacencia, Topological Sort (Kahn & DAG DP), Dijkstra, Union-Find (DSU) y Prefix Trees",
    colorClass: "text-rose-400",
    badgeClass: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    borderClass: "border-rose-500/40",
    glowClass: "shadow-rose-500/10",
    goalDescription:
      "Modela cualquier red de conexiones o dependencias: resuelve prerrequisitos sobre DAGs, rutas más baratas con Dijkstra y componentes dinámicas con Union-Find.",
  },
  {
    level: 6,
    title: "Nivel 6: Optimización, Greedy y Programación Dinámica",
    subtitle: "Algoritmos Voraces, Memoization (Top-Down), DP Bottom-Up (1D/2D/Knapsack/LCS/LIS) y Bitmask DP",
    colorClass: "text-orange-400",
    badgeClass: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    borderClass: "border-orange-500/40",
    glowClass: "shadow-orange-500/10",
    goalDescription:
      "Pasa de la recursión exponencial a soluciones polinomiales recordando subproblemas superpuestos, llenando tablas iterativas y usando máscaras de bits.",
  },
  {
    level: 7,
    title: "Nivel 7: Rangos Dinámicos, Strings Avanzados, Matemáticas y Élite",
    subtitle: "Ordered Set, Fenwick Tree, Segment Tree, Rolling Hash, KMP, Bits, Math, Number Theory y Sweep Line",
    colorClass: "text-indigo-400",
    badgeClass: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
    borderClass: "border-indigo-500/40",
    glowClass: "shadow-indigo-500/10",
    goalDescription:
      "El arsenal avanzado para problemas Hard y rondas finales: estructuras logarítmicas de rango, búsqueda lineal de texto, aritmética modular y barrido de eventos.",
  },
];

/**
 * Construye el Paquete Híbrido completo en formato Markdown listo para subir a Google NotebookLM
 * o usar como teleprompter de grabación de YouTube.
 */
export function buildNotebookLMMarkdown(topic: DSATopic): string {
  const epNum = String(topic.order).padStart(2, "0");
  const kindLabel =
    topic.kind === "data-structure"
      ? "Estructura de Datos"
      : topic.kind === "algorithm"
      ? "Patrón Algorítmico"
      : "Estructura de Datos + Patrón Algorítmico";

  const prereqNames =
    topic.prerequisites.length > 0
      ? topic.prerequisites
          .map((id) => TOPICS_BY_ID[id]?.shortTitle ?? id)
          .join(" → ")
      : "Ninguno (Punto de partida de la serie)";

  const whenToUseList = topic.whenToUse.map((item) => `- ✅ ${item}`).join("\n");
  const whenNotToUseList = topic.whenNotToUse.map((item) => `- ⚠️ ${item}`).join("\n");
  const takeawaysList = topic.notebookLM.keyTakeaways
    .map((item, idx) => `${idx + 1}. **Idea Clave #${idx + 1}:** ${item}`)
    .join("\n");
  const stepsList = topic.notebookLM.stepByStepWalkthrough
    .map((item, idx) => `${idx + 1}. ${item}`)
    .join("\n");
  const trapsList = topic.notebookLM.interviewTraps
    .map((item) => `- 🚨 **Trampa de Entrevista:** ${item}`)
    .join("\n");

  const narrativeSection = topic.notebookLM.narrativeBlocks
    .map(
      (b) => `### ⏱️ [${b.timestamp}] ${b.sectionTitle}
- **🎬 Visual en Pantalla / Slide:** ${b.visualCue}
- **🎙️ Narración / Guion:**
  > "${b.narration}"`
    )
    .join("\n\n");

  const problemsSection = topic.leetcodeProblems
    .map(
      (p) =>
        `| **#${p.number}. ${p.title}** | \`${p.difficulty}\` | [https://leetcode.com/problems/${p.slug}/](https://leetcode.com/problems/${p.slug}/) | ${p.patternHint} |`
    )
    .join("\n");

  return `# 🎬 Episodio #${epNum}: ${topic.title}
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel ${topic.level} — ${kindLabel} (\`${topic.difficulty}\`)  
> **Término en Inglés (Flowchart):** \`${topic.englishTerm}\`  
> **Prerrequisitos Recomendados:** ${prereqNames}

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

\`\`\`text
${topic.notebookLM.customDirectionPrompt}

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "${topic.shortTitle}", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (${topic.constraintHint}) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
\`\`\`

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es ${topic.shortTitle}?
${topic.summary}

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** ${topic.analogy}

### Ideas Clave que debes recordar
${takeawaysList}

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR ${topic.shortTitle})
${whenToUseList}

### Cuándo NO usarlo (Falsos Positivos)
${whenNotToUseList}

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** \`${topic.constraintHint}\`
- **Complejidad Temporal Promedio:** \`${topic.timeComplexity.average}\`
- **Complejidad Temporal Peor Caso:** \`${topic.timeComplexity.worst}\`
- **Complejidad Espacial:** \`${topic.spaceComplexity}\`
- **Nota Técnica:** ${topic.timeComplexity.note}

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
${stepsList}

### Errores Comunes y Casos Borde
${trapsList}

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
\`\`\`python
${topic.pythonTemplate}
\`\`\`

### Plantilla en TypeScript / JavaScript
\`\`\`typescript
${topic.typescriptTemplate}
\`\`\`

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

${narrativeSection}

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
${problemsSection}
`;
}

# 🎬 Episodio #41: Rolling Hash (Hash Rodante y Rabin-Karp)
> **Proyecto:** Leet-YT (Flowchart Interactivo + Roadmap Progresivo de Algoritmos y Estructuras de Datos)  
> **Categoría:** Nivel 7 — Patrón Algorítmico (`Advanced`)  
> **Término en Inglés (Flowchart):** `Rolling Hash & Rabin-Karp Algorithm`  
> **Prerrequisitos Recomendados:** Strings → Sliding Window → Hash Table

---

## 🎯 1. Prompt de Dirección para Google NotebookLM (Audio / Video Overview)
> **Instrucciones de uso:** Copia el bloque de abajo y pégalo en el campo *"Customize"* (Personalizar) antes de generar el **Audio Overview** o **Video Overview** en Google NotebookLM, tras subir este archivo como fuente.

```text
Conecta el concepto de Prefix Sum y Sliding Window con las cadenas de texto: explica por qué hashear un substring de tamaño K con la función `hash()` normal dentro de una ventana cuesta O(K) por paso (total O(N·K)), mientras que tratar el string como un polinomio en base `B` permite calcular el hash de cualquier substring en O(1).

Reglas adicionales para los presentadores de NotebookLM:
1. Hablen siempre en español claro, dinámico y pedagógico, manteniendo los términos estándar de entrevistas en inglés (como "Rolling Hash", "Time Limit Exceeded", "Big-O").
2. Usen la analogía del mundo real incluida en la sección 2 para que cualquier espectador entienda la intuición antes de hablar de código.
3. Destaquen explícitamente las señales en el enunciado ("Cuándo usarlo") y la pista de restricciones (Comparación O(1) de substrings o búsqueda de subcadenas repetidas con N ≤ 10⁵) para conectar este nodo con el Flowchart de decisión de Leet-YT.
4. Cierren mencionando los 3 problemas de LeetCode recomendados para practicar este patrón hoy mismo.
```

---

## 💡 2. Resumen Ejecutivo e Intuición (Documento Fuente para NotebookLM)

### ¿Qué es Rolling Hash?
Tratar un string como un número en base `B` módulo un primo grande `MOD` para que, al deslizar una ventana un carácter a la derecha, podamos **actualizar el hash de la ventana en tiempo O(1)** (quitando la letra que sale por la izquierda y agregando la que entra por la derecha), permitiendo comparar substrings de longitud `L` en O(1).

### Analogía del Mundo Real
> 🧠 **Intuición Visual:** En base 10, si tienes el número `3456` en una ventana de 4 dígitos y te mueves un paso a la derecha donde entra un `7` (para formar `4567`), no construyes el número desde cero: le restas `3 × 1000`, multiplicas lo que queda por `10` y le sumas `7`. Rolling Hash hace exactamente eso con letras.

### Ideas Clave que debes recordar
1. **Idea Clave #1:** Rolling Hash es el equivalente exacto de Prefix Sum pero para Strings: permite obtener la huella digital de `s[L..R]` en O(1).
2. **Idea Clave #2:** Al restar en aritmética modular `(a - b) % MOD`, en lenguajes como JS/C++/Java debes sumar `(a - b % MOD + MOD) % MOD` para evitar restos negativos (en Python `%` ya devuelve positivo).

---

## 🧭 3. Conexión con el Flowchart de Decisión (¿Cómo detectarlo en una entrevista?)

### Señales en el Enunciado (Cuándo USAR Rolling Hash)
- ✅ Comparar substrings o encontrar **substrings duplicados de longitud `L`** en O(N) (`Repeated DNA Sequences`, `Longest Duplicate Substring` combinando `Binary Search + Rolling Hash`).
- ✅ Buscar múltiples patrones o encontrar el palíndromo más largo desde el inicio usando hash hacia adelante y hacia atrás.

### Cuándo NO usarlo (Falsos Positivos)
- ⚠️ Para buscar un único patrón en un texto sin necesidad de hashes numéricos, KMP es determinista sin riesgo de colisiones modulares.

### Pista de Restricciones ($N$) y Complejidad Big-O
- **Restricción típica en LeetCode:** `Comparación O(1) de substrings o búsqueda de subcadenas repetidas con N ≤ 10⁵`
- **Complejidad Temporal Promedio:** `Precalcular o deslizar ventana: O(N) | Consultar hash de substring `s[L..R]`: O(1)`
- **Complejidad Temporal Peor Caso:** `O(N) con primo grande (ej. `MOD = 10⁹ + 7` o `2⁶¹ - 1`)`
- **Complejidad Espacial:** `O(N) para hashes de prefijo y potencias de la base`
- **Nota Técnica:** Combinar Binary Search en la longitud `L` con Rolling Hash resuelve 'Longest Duplicate Substring' en O(N log N).

---

## 🛠️ 4. Receta Paso a Paso y Trampas de Entrevista

### Algoritmo Paso a Paso
1. Elegir una `base` mayor que el tamaño del alfabeto (ej. `31` o `313`) y un primo grande `MOD` (`10⁹ + 7` o `10⁹ + 9`).
2. Precalcular `pref_hash[i]` y `power[i] = base^i % MOD` en O(N).
3. Consultar cualquier rango `[L, R]` con `(pref_hash[R+1] - pref_hash[L] * power[R - L + 1]) % MOD`.

### Errores Comunes y Casos Borde
- 🚨 **Trampa de Entrevista:** Usar un módulo pequeño como `10,007`: por la Paradoja del Cumpleaños, cuando comparas $10^5$ substrings empezarás a tener colisiones con módulos menores a $\approx N^2$. Usa un primo $\ge 10^9 + 7$ o doble hash.

---

## 💻 5. Plantillas de Código (Code Templates)

### Plantilla en Python (Principal para explicación en video)
```python
class PolynomialRollingHash:
    """
    Precalcula hashes polinomiales de prefijos para consultar el hash de CUALQUIER
    substring s[left..right] (inclusive) en tiempo O(1).
    """
    def __init__(self, s: str, base: int = 313, mod: int = 1_000_000_007):
        self.mod = mod
        n = len(s)
        self.pref_hash = [0] * (n + 1)
        self.power = [1] * (n + 1)

        for i, ch in enumerate(s):
            self.pref_hash[i + 1] = (self.pref_hash[i] * base + ord(ch)) % mod
            self.power[i + 1] = (self.power[i] * base) % mod

    def get_Substring_hash(self, left: int, right: int) -> int:
        """Retorna el hash de s[left..right] inclusive en O(1)."""
        length = right - left + 1
        return (
            self.pref_hash[right + 1]
            - self.pref_hash[left] * self.power[length]
        ) % self.mod
```

### Plantilla en TypeScript / JavaScript
```typescript
export class RollingHash {
  private pref: bigint[];
  private pow: bigint[];
  private mod = 1_000_000_007n;
  private base = 313n;

  constructor(s: string) {
    const n = s.length;
    this.pref = new Array<bigint>(n + 1).fill(0n);
    this.pow = new Array<bigint>(n + 1).fill(1n);

    for (let i = 0; i < n; i++) {
      this.pref[i + 1] = (this.pref[i] * this.base + BigInt(s.charCodeAt(i))) % this.mod;
      this.pow[i + 1] = (this.pow[i] * this.base) % this.mod;
    }
  }

  getHash(left: number, right: number): bigint {
    const len = right - left + 1;
    const raw = (this.pref[right + 1] - (this.pref[left] * this.pow[len]) % this.mod) % this.mod;
    return (raw + this.mod) % this.mod;
  }
}
```

---

## 🎙️ 6. Guion Narrado por Bloques y Sugerencias Visuales (Teleprompter / Slides)

### ⏱️ [00:00 - 01:45] Convertir palabras en números: La intuición en base 10
- **🎬 Visual en Pantalla / Slide:** La ventana `3456` deslizándose a `4567` restando `3*1000`, multiplicando por `10` y sumando `7`.
- **🎙️ Narración / Guion:**
  > "Si metes un substring de diez mil letras dentro de un Hash Set en cada paso de una ventana deslizante, copiar y hashear esas diez mil letras rompe tu complejidad a O(N²). Rolling Hash actualiza el hash en O(1) con una resta y una multiplicación."

### ⏱️ [01:45 - 04:30] Hashes de Prefijos + Binary Search en Longest Duplicate Substring
- **🎬 Visual en Pantalla / Slide:** Combinación de Binary Search eligiendo longitud L y Rolling Hash detectando duplicados en O(N).
- **🎙️ Narración / Guion:**
  > "Cuando precalculas los hashes de todos los prefijos y las potencias de la base, puedes obtener la firma de cualquier subsegmento `[L, R]` en tiempo constante O(1), igual que hacíamos con Prefix Sums."

---

## 🏆 7. Problemas Clásicos de LeetCode para Practicar Hoy

| Problema | Dificultad | Link Directo | Pista de Aplicación de la Plantilla |
| :--- | :---: | :--- | :--- |
| **#187. Repeated DNA Sequences** | `Medium` | [https://leetcode.com/problems/repeated-dna-sequences/](https://leetcode.com/problems/repeated-dna-sequences/) | Ventana deslizante de longitud 10 manteniendo su representación numérica en O(1) por paso. |
| **#1044. Longest Duplicate Substring** | `Hard` | [https://leetcode.com/problems/longest-duplicate-substring/](https://leetcode.com/problems/longest-duplicate-substring/) | Binary Search sobre la longitud `L` + Rolling Hash en O(N) para verificar si algún hash de longitud `L` se repite. |
| **#718. Maximum Length of Repeated Subarray** | `Medium` | [https://leetcode.com/problems/maximum-length-of-repeated-subarray/](https://leetcode.com/problems/maximum-length-of-repeated-subarray/) | Se resuelve en O((N + M) log(min(N, M))) con Binary Search + Rolling Hash. |

# Repository Rules & Guidelines

## 1. Language Policy
* **Code & Architecture**: All source code, TypeScript types, functions, variables, file names, comments, and commit messages MUST be written strictly in **English**.
* **Educational Content & Media**: All UI copy, lesson texts, explanations, problem statements, diagrams, YouTube scripts, and video metadata MUST be produced in **English**.
* **Pair Programming / Assistant Interaction**: Conversations with the developer can be conducted in **Spanish** (the developer's preferred language for discussion), while all generated code, documentation, and project assets remain in **English**.

---

## 2. Product Vision & UX Philosophy: Brilliant-Style Learning
* **Background & Evolution**:
  * This project succeeds the previous prototype (`AlgoMostro`), which suffered from heavy UI clutter, cognitive overload, and complex layout arrangements.
  * The goal is a radical simplification inspired by **Brilliant.org**: focused, bite-sized, interactive mental models with zero unnecessary clutter.
* **Core Principles**:
  * **Minimalism & Focus**: Clean visual hierarchy, generous whitespace, deliberate typography, and dark/light polish. One concept or step at a time.
  * **Active Learning vs. Passive Reading**: Every module should favor interactive intuition-building (visualizations, step-by-step algorithms, interactive state transitions, quick-check questions) over dense walls of text.
  * **Modular Scalability**: The curriculum and platform must be architected as modular learning units, allowing frictionless additions of new algorithms, data structures, and computer science domains as the author learns and shares new concepts.

---

## 3. Engineering & Code Standards
* **Strict TypeScript**: Strongly typed schemas for all curriculum nodes, learning tracks, and visualization states. Avoid `any`.
* **Component Architecture**: Keep UI components modular, atomic, and decoupled from raw data definitions.
* **Styling**: Tailwind CSS with clean utility composition and consistent design tokens.
* **Documentation & Customizations**: Internal project strategy and learning vision are maintained in workspace skills (`.agents/skills/`), which remain untracked in Git via `.gitignore`.

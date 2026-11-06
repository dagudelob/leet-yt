export type TopicKind = "data-structure" | "algorithm" | "hybrid";

export type DifficultyTier = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export type VideoStatus = "published" | "in_production" | "planned";

export interface LeetCodeProblem {
  number: number;
  title: string;
  slug: string;
  difficulty: "Easy" | "Medium" | "Hard";
  patternHint: string;
}

export interface NarrativeBlock {
  timestamp: string;
  sectionTitle: string;
  visualCue: string;
  narration: string;
}

export interface NotebookLMPackage {
  customDirectionPrompt: string;
  keyTakeaways: string[];
  stepByStepWalkthrough: string[];
  interviewTraps: string[];
  narrativeBlocks: NarrativeBlock[];
}

export interface DSATopic {
  id: string;
  order: number; // Video #01 to #46
  title: string;
  shortTitle: string;
  englishTerm: string;
  kind: TopicKind;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  difficulty: DifficultyTier;
  branchCategory:
    | "fundamentals"
    | "arrays-strings"
    | "hashing-sorting-search"
    | "linked-stacks-queues"
    | "trees-heaps-backtracking"
    | "graphs-dag"
    | "dp-greedy"
    | "advanced-math-range";
  prerequisites: string[];
  summary: string;
  analogy: string;
  whenToUse: string[];
  whenNotToUse: string[];
  timeComplexity: {
    average: string;
    worst: string;
    note: string;
  };
  spaceComplexity: string;
  constraintHint: string;
  pythonTemplate: string;
  typescriptTemplate: string;
  leetcodeProblems: LeetCodeProblem[];
  notebookLM: NotebookLMPackage;
}

export interface YouTubeVideoEntry {
  topicId: string;
  episodeNumber: number;
  youtubeUrl: string;
  status: VideoStatus;
  durationEstimate: string;
  notes?: string;
}

export interface FlowchartQuestionNode {
  id: string;
  label: string;
  sublabel?: string;
  category: string;
  options: Array<{
    label: string;
    conditionHint?: string;
    targetNodeId: string; // either another question id ('q-...') or a topic id
    isTopic: boolean;
  }>;
}

export interface LevelMetadata {
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  title: string;
  subtitle: string;
  colorClass: string;
  badgeClass: string;
  borderClass: string;
  glowClass: string;
  goalDescription: string;
}

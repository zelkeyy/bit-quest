
export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface Question {
  question: string;
  choices: string[];
  answer: string;
}

export interface Level {
  difficulty: Difficulty;
  questions: Question[];
  unlockThreshold: number;
}

export interface Progress {
  unlockedLevels: Difficulty[];
  highScores: {
    [key in Difficulty]?: number;
  };
}

export type View = 'home' | 'level-select' | 'quiz' | 'score';

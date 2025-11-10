export type ExerciseCategory =
  | 'abdominaux'
  | 'dos'
  | 'jambes'
  | 'fessiers'
  | 'epaules-bras'
  | 'hanches'
  | 'corps-entier'
  | 'warmup'
  | 'stretch';

export interface Exercise {
  name: string;
  duration: number; // in seconds
  description: string;
  restTime: number; // in seconds
  category?: ExerciseCategory; // optional category for muscle group
}

export interface Session {
  id: string;
  name: string;
  exercises: Exercise[];
  createdAt: number;
  updatedAt: number;
}

export interface HistoryEntry {
  id: string;
  sessionId: string;
  sessionName: string;
  completedAt: number;
  totalDuration: number; // in seconds
  rating?: 'too-easy' | 'perfect' | 'too-hard';
}

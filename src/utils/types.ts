export interface Exercise {
  name: string;
  duration: number; // in seconds
  description: string;
  restTime: number; // in seconds
  type?: 'warmup' | 'exercise' | 'stretch'; // optional type, defaults to 'exercise'
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

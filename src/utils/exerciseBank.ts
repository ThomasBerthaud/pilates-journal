import { getPresetExercises, getPresetSessions } from './presets';
import { getAllSessions } from './storage';
import type { Exercise, ExerciseCategory } from './types';

const EXERCISES_BANK_KEY = 'pilates_exercises_bank';

// Keyword mapping for automatic categorization
const CATEGORY_KEYWORDS: Record<ExerciseCategory, string[]> = {
  abdominaux: ['planche', 'crunch', 'abdo', 'core', 'dead bug', 'abdominal'],
  dos: ['dos', 'spine', 'back', 'cat-cow', 'extension', 'colonne'],
  jambes: ['leg', 'jambe', 'cercles de jambes', 'leg raises', 'cuisse'],
  fessiers: ['pont', 'bridge', 'fessier', 'glute'],
  'epaules-bras': ['épaule', 'bras', 'arm', 'shoulder', 'rotation'],
  hanches: ['hanche', 'hip', 'pelvic tilt', 'mobilisation hanche'],
  'corps-entier': ['complet', 'respiration'],
  warmup: ['échauffement', 'warmup', 'warm-up'],
  stretch: ['étirement', 'stretch', 'étirements'],
};

export function categorizeExercise(exercise: Exercise): ExerciseCategory {
  // If already has a category, return it
  if (exercise.category) {
    return exercise.category;
  }

  // Search in name and description (case-insensitive)
  const searchText = `${exercise.name} ${exercise.description}`.toLowerCase();

  // Check each category's keywords
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        return category as ExerciseCategory;
      }
    }
  }

  // Default to 'corps-entier' if no match found
  return 'corps-entier';
}

export function getUniqueExercises(exercises: Exercise[]): Exercise[] {
  const seen = new Map<string, Exercise>();

  for (const exercise of exercises) {
    const key = exercise.name.toLowerCase().trim();
    if (!seen.has(key)) {
      // Categorize if not already categorized
      const categorizedExercise = {
        ...exercise,
        category: exercise.category || categorizeExercise(exercise),
      };
      seen.set(key, categorizedExercise);
    } else {
      // If we have a more complete version (with category), prefer it
      const existing = seen.get(key)!;
      if (!existing.category && exercise.category) {
        seen.set(key, exercise);
      } else if (!existing.category && !exercise.category) {
        // If neither has category, keep the one with more info
        const categorized = {
          ...exercise,
          category: categorizeExercise(exercise),
        };
        seen.set(key, categorized);
      }
    }
  }

  return Array.from(seen.values());
}

export function getAllExercisesFromBank(): Exercise[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(EXERCISES_BANK_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveExerciseToBank(exercise: Exercise): void {
  if (typeof window === 'undefined') return;
  const exercises = getAllExercisesFromBank();

  // Use name as unique identifier (case-insensitive)
  const key = exercise.name.toLowerCase().trim();
  const index = exercises.findIndex((e) => e.name.toLowerCase().trim() === key);

  // Ensure exercise has a category
  const categorizedExercise = {
    ...exercise,
    category: exercise.category || categorizeExercise(exercise),
  };

  if (index >= 0) {
    exercises[index] = categorizedExercise;
  } else {
    exercises.push(categorizedExercise);
  }

  localStorage.setItem(EXERCISES_BANK_KEY, JSON.stringify(exercises));
}

export function deleteExerciseFromBank(exerciseName: string): void {
  if (typeof window === 'undefined') return;
  const exercises = getAllExercisesFromBank();
  const key = exerciseName.toLowerCase().trim();
  const filtered = exercises.filter((e) => e.name.toLowerCase().trim() !== key);
  localStorage.setItem(EXERCISES_BANK_KEY, JSON.stringify(filtered));
}

export function getExercisesByCategory(
  exercises: Exercise[]
): Record<ExerciseCategory, Exercise[]> {
  const grouped: Record<ExerciseCategory, Exercise[]> = {
    warmup: [],
    abdominaux: [],
    dos: [],
    jambes: [],
    fessiers: [],
    'epaules-bras': [],
    hanches: [],
    stretch: [],
    'corps-entier': [],
  };

  for (const exercise of exercises) {
    const category = categorizeExercise(exercise);
    if (category in grouped) {
      grouped[category].push(exercise);
    } else {
      grouped['corps-entier'].push(exercise);
    }
  }

  return grouped;
}

export function initializeExerciseBank(): void {
  if (typeof window === 'undefined') return;

  // Check if bank already exists
  const existing = getAllExercisesFromBank();
  if (existing.length > 0) {
    return; // Already initialized
  }

  // Get all exercises from all sessions (presets + user sessions)
  const presetSessions = getPresetSessions();
  const userSessions = getAllSessions();
  const allSessions = [...presetSessions, ...userSessions];

  // Extract all exercises from sessions
  const allExercises: Exercise[] = [];
  for (const session of allSessions) {
    allExercises.push(...session.exercises);
  }

  // Add preset exercises (bodyweight exercises)
  const presetExercises = getPresetExercises();
  allExercises.push(...presetExercises);

  // Get unique exercises and categorize them
  const uniqueExercises = getUniqueExercises(allExercises);

  // Save to bank
  localStorage.setItem(EXERCISES_BANK_KEY, JSON.stringify(uniqueExercises));
}

export function resetExerciseBank(): void {
  if (typeof window === 'undefined') return;

  // Clear the bank
  localStorage.removeItem(EXERCISES_BANK_KEY);

  // Get all exercises from all sessions (presets + user sessions)
  const presetSessions = getPresetSessions();
  const userSessions = getAllSessions();
  const allSessions = [...presetSessions, ...userSessions];

  // Extract all exercises from sessions
  const allExercises: Exercise[] = [];
  for (const session of allSessions) {
    allExercises.push(...session.exercises);
  }

  // Add preset exercises (bodyweight exercises)
  const presetExercises = getPresetExercises();
  allExercises.push(...presetExercises);

  // Get unique exercises and categorize them
  const uniqueExercises = getUniqueExercises(allExercises);

  // Save to bank
  localStorage.setItem(EXERCISES_BANK_KEY, JSON.stringify(uniqueExercises));
}

import type { ExerciseCategory } from './types';

export const CATEGORY_COLORS: Record<
  ExerciseCategory,
  { bg: string; text: string; border: string; lightBg: string }
> = {
  abdominaux: {
    bg: 'bg-red-600',
    text: 'text-white',
    border: 'border-red-500',
    lightBg: 'bg-red-50',
  },
  dos: {
    bg: 'bg-blue-600',
    text: 'text-white',
    border: 'border-blue-500',
    lightBg: 'bg-blue-50',
  },
  jambes: {
    bg: 'bg-green-600',
    text: 'text-white',
    border: 'border-green-500',
    lightBg: 'bg-green-50',
  },
  fessiers: {
    bg: 'bg-purple-600',
    text: 'text-white',
    border: 'border-purple-500',
    lightBg: 'bg-purple-50',
  },
  'epaules-bras': {
    bg: 'bg-indigo-600',
    text: 'text-white',
    border: 'border-indigo-500',
    lightBg: 'bg-indigo-50',
  },
  hanches: {
    bg: 'bg-pink-600',
    text: 'text-white',
    border: 'border-pink-500',
    lightBg: 'bg-pink-50',
  },
  'corps-entier': {
    bg: 'bg-gray-600',
    text: 'text-white',
    border: 'border-gray-500',
    lightBg: 'bg-gray-50',
  },
  warmup: {
    bg: 'bg-orange-600',
    text: 'text-white',
    border: 'border-orange-500',
    lightBg: 'bg-orange-50',
  },
  stretch: {
    bg: 'bg-teal-600',
    text: 'text-white',
    border: 'border-teal-500',
    lightBg: 'bg-teal-50',
  },
};

export function getCategoryColor(category?: ExerciseCategory): string {
  if (!category || !(category in CATEGORY_COLORS)) {
    return 'bg-gray-500 text-white';
  }
  const colors = CATEGORY_COLORS[category];
  return `${colors.bg} ${colors.text}`;
}

export function getCategoryBorderColor(category?: ExerciseCategory): string {
  if (!category || !(category in CATEGORY_COLORS)) {
    return 'border-gray-300';
  }
  return CATEGORY_COLORS[category].border;
}

export function getCategoryBackgroundColor(category?: ExerciseCategory): string {
  if (!category || !(category in CATEGORY_COLORS)) {
    return 'bg-gray-50';
  }
  return CATEGORY_COLORS[category].lightBg;
}

export function getCategoryLabel(category?: ExerciseCategory): string {
  if (!category) return 'Non catégorisé';

  const labels: Record<ExerciseCategory, string> = {
    abdominaux: 'Abdominaux',
    dos: 'Dos',
    jambes: 'Jambes',
    fessiers: 'Fessiers',
    'epaules-bras': 'Épaules/Bras',
    hanches: 'Hanches',
    'corps-entier': 'Corps entier',
    warmup: 'Échauffement',
    stretch: 'Étirement',
  };

  return labels[category] || category;
}

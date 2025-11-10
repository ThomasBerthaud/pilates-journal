import { motion } from 'framer-motion';
import {
  getCategoryBackgroundColor,
  getCategoryBorderColor,
  getCategoryColor,
  getCategoryLabel,
} from '../../../utils/categoryColors';
import type { Exercise } from '../../../utils/types';
import Timer from '../../Timer';

interface ExerciseViewProps {
  exercise: Exercise;
  exerciseIndex: number;
  onComplete: () => void;
}

// Map category to timer circle color (hex)
const CATEGORY_CIRCLE_COLORS: Record<string, string> = {
  warmup: '#ea580c', // orange-600
  stretch: '#0d9488', // teal-600
  abdominaux: '#dc2626', // red-600
  dos: '#2563eb', // blue-600
  jambes: '#16a34a', // green-600
  fessiers: '#9333ea', // purple-600
  'epaules-bras': '#4f46e5', // indigo-600
  hanches: '#db2777', // pink-600
  'corps-entier': '#4b5563', // gray-600
};

// Map category to text color class
const CATEGORY_TEXT_COLORS: Record<string, string> = {
  warmup: 'text-orange-600',
  stretch: 'text-teal-600',
  abdominaux: 'text-red-600',
  dos: 'text-blue-600',
  jambes: 'text-green-600',
  fessiers: 'text-purple-600',
  'epaules-bras': 'text-indigo-600',
  hanches: 'text-pink-600',
  'corps-entier': 'text-gray-600',
};

export default function ExerciseView({ exercise, exerciseIndex, onComplete }: ExerciseViewProps) {
  const category = exercise.category || 'corps-entier';
  const badgeColor = getCategoryColor(category);
  const badgeLabel =
    exercise.category === 'warmup'
      ? 'Échauffement'
      : exercise.category === 'stretch'
        ? 'Étirement'
        : exercise.category
          ? getCategoryLabel(exercise.category)
          : 'Exercice';

  const containerBg = exercise.category
    ? `${getCategoryBackgroundColor(category)} border-2 ${getCategoryBorderColor(category)}`
    : 'bg-white';

  const timerColor = exercise.category
    ? CATEGORY_TEXT_COLORS[category] || 'text-indigo-600'
    : 'text-indigo-600';

  const circleColor = exercise.category ? CATEGORY_CIRCLE_COLORS[category] || '#6366f1' : '#6366f1';

  return (
    <motion.div
      className={`${containerBg} rounded-xl shadow-xl p-8 text-center`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
        <span className={`px-4 py-2 ${badgeColor} rounded-full text-sm font-semibold`}>
          {badgeLabel}
        </span>
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">{exercise.name}</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{exercise.description}</p>
      <Timer
        key={`exercise-${exerciseIndex}`}
        autoStart={exerciseIndex !== 0}
        seconds={exercise.duration}
        onComplete={onComplete}
        size="large"
        textColor={timerColor}
        circleColor={circleColor}
      />
    </motion.div>
  );
}

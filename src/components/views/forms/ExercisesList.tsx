import { BookOpenIcon, PlusIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import type { Exercise } from '../../../utils/types';
import EmptyExercisesView from './EmptyExercisesView';
import ExerciseListItem from './ExerciseListItem';

interface ExercisesListProps {
  exercises: Exercise[];
  onAddExercise: () => void;
  onAddExerciseFromBank: () => void;
  onEditExercise: (index: number) => void;
  onDeleteExercise: (index: number) => void;
  onMoveExercise: (index: number, direction: 'up' | 'down') => void;
}

export default function ExercisesList({
  exercises,
  onAddExercise,
  onAddExerciseFromBank,
  onEditExercise,
  onDeleteExercise,
  onMoveExercise,
}: ExercisesListProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-semibold text-gray-700">
          Exercices ({exercises.length})
        </label>
        <div className="flex gap-2">
          <motion.button
            onClick={onAddExerciseFromBank}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BookOpenIcon className="w-5 h-5" />
          </motion.button>
          <motion.button
            onClick={onAddExercise}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {exercises.length === 0 ? (
        <EmptyExercisesView />
      ) : (
        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          <AnimatePresence mode="popLayout">
            {exercises.map((exercise, index) => (
              <ExerciseListItem
                key={`${exercise.name}-${index}`}
                exercise={exercise}
                index={index}
                onEdit={onEditExercise}
                onDelete={onDeleteExercise}
                onMove={onMoveExercise}
                isFirst={index === 0}
                isLast={index === exercises.length - 1}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

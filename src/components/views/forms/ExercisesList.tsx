import { PlusIcon } from '@heroicons/react/24/solid';
import type { Exercise } from '../../../utils/types';
import EmptyExercisesView from './EmptyExercisesView';
import ExerciseListItem from './ExerciseListItem';

interface ExercisesListProps {
  exercises: Exercise[];
  onAddExercise: () => void;
  onEditExercise: (index: number) => void;
  onDeleteExercise: (index: number) => void;
  onMoveExercise: (index: number, direction: 'up' | 'down') => void;
}

export default function ExercisesList({
  exercises,
  onAddExercise,
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
        <button
          onClick={onAddExercise}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          Ajouter un exercice
        </button>
      </div>

      {exercises.length === 0 ? (
        <EmptyExercisesView />
      ) : (
        <div className="space-y-3">
          {exercises.map((exercise, index) => (
            <ExerciseListItem
              key={index}
              exercise={exercise}
              index={index}
              onEdit={onEditExercise}
              onDelete={onDeleteExercise}
              onMove={onMoveExercise}
              isFirst={index === 0}
              isLast={index === exercises.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}


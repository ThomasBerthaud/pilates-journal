import type { Exercise } from '../../../utils/types';

interface ExerciseListItemProps {
  exercise: Exercise;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onMove: (index: number, direction: 'up' | 'down') => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function ExerciseListItem({
  exercise,
  index,
  onEdit,
  onDelete,
  onMove,
  isFirst,
  isLast,
}: ExerciseListItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
          <div className="flex gap-4 mt-2 text-xs text-gray-500">
            <span>
              Durée: {Math.floor(exercise.duration / 60)}m {exercise.duration % 60}s
            </span>
            <span>Repos: {exercise.restTime}s</span>
          </div>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onMove(index, 'up')}
            disabled={isFirst}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
            title="Monter"
          >
            ↑
          </button>
          <button
            onClick={() => onMove(index, 'down')}
            disabled={isLast}
            className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
            title="Descendre"
          >
            ↓
          </button>
          <button
            onClick={() => onEdit(index)}
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
          >
            Modifier
          </button>
          <button
            onClick={() => onDelete(index)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}


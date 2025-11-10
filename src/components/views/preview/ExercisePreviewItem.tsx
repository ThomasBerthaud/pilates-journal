import { getCategoryColor, getCategoryLabel } from '../../../utils/categoryColors';
import type { Exercise } from '../../../utils/types';

interface ExercisePreviewItemProps {
  exercise: Exercise;
  index: number;
}

export default function ExercisePreviewItem({ exercise, index }: ExercisePreviewItemProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-500">
              {index + 1}. {exercise.name}
            </span>
            {exercise.category && (
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(exercise.category)}`}
              >
                {getCategoryLabel(exercise.category)}
              </span>
            )}
          </div>
          {exercise.description && (
            <p className="text-sm text-gray-600 mb-2">{exercise.description}</p>
          )}
          <div className="flex gap-4 text-xs text-gray-500">
            <span>
              Durée: {Math.floor(exercise.duration / 60)}m {exercise.duration % 60}s
            </span>
            {exercise.restTime > 0 && <span>Repos: {exercise.restTime}s</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

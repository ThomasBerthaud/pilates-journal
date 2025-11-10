import type { Exercise } from '../../../utils/types';

interface ExercisePreviewItemProps {
  exercise: Exercise;
  index: number;
}

export default function ExercisePreviewItem({ exercise, index }: ExercisePreviewItemProps) {
  const getTypeLabel = (type?: string) => {
    switch (type) {
      case 'warmup':
        return 'Échauffement';
      case 'stretch':
        return 'Étirement';
      default:
        return 'Exercice';
    }
  };

  const getTypeBadgeColor = (type?: string) => {
    switch (type) {
      case 'warmup':
        return 'bg-orange-600';
      case 'stretch':
        return 'bg-green-600';
      default:
        return 'bg-indigo-600';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-gray-500">
              {index + 1}. {exercise.name}
            </span>
            {exercise.type && (
              <span
                className={`px-2 py-1 ${getTypeBadgeColor(exercise.type)} text-white text-xs font-semibold rounded`}
              >
                {getTypeLabel(exercise.type)}
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


import type { Session } from '../utils/types';
import { calculateTotalDuration, formatDuration } from '../utils/calculations';

interface SessionPreviewProps {
  session: Session;
  onStart: () => void;
  onClose: () => void;
}

export default function SessionPreview({ session, onStart, onClose }: SessionPreviewProps) {
  const totalDuration = calculateTotalDuration(session);

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{session.name}</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  {session.exercises.length} exercice{session.exercises.length > 1 ? 's' : ''}
                </p>
                <p>Durée totale : {formatDuration(totalDuration)}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {session.exercises.map((exercise, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
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
            ))}
          </div>

          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={onStart}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Démarrer la séance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


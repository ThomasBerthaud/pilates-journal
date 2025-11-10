import { calculateTotalDuration, formatDuration } from '../../../utils/calculations';
import { isPresetSession } from '../../../utils/storage';
import type { Session } from '../../../utils/types';

interface SessionCardProps {
  session: Session;
  onEdit: (session: Session) => void;
  onStart: (session: Session) => void;
  onPreview: (session: Session) => void;
  onDelete: (id: string) => void;
}

export default function SessionCard({
  session,
  onEdit,
  onStart,
  onPreview,
  onDelete,
}: SessionCardProps) {
  const totalDuration = calculateTotalDuration(session);
  const isPreset = isPresetSession(session.id);

  return (
    <div
      className={`rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border transform hover:scale-105 animate-fade-in ${
        isPreset
          ? 'bg-linear-to-br from-purple-50 to-indigo-50 border-purple-200'
          : 'bg-white border-gray-100'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        {isPreset && (
          <span className="px-2 py-1 bg-purple-600 text-white text-xs font-semibold rounded">
            Prédéfinie
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{session.name}</h3>
      <div className="text-sm text-gray-600 mb-4 space-y-1">
        <p>
          {session.exercises.length} exercice{session.exercises.length > 1 ? 's' : ''}
        </p>
        <p>Durée totale : {formatDuration(totalDuration)}</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onPreview(session)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Voir
        </button>
        <button
          onClick={() => onStart(session)}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Démarrer
        </button>
        {!isPreset && (
          <>
            <button
              onClick={() => onEdit(session)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Modifier
            </button>
            <button
              onClick={() => onDelete(session.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Supprimer
            </button>
          </>
        )}
      </div>
    </div>
  );
}


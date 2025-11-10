import { formatDuration } from '../../../utils/calculations';
import type { HistoryEntry } from '../../../utils/types';

interface HistoryCardProps {
  entry: HistoryEntry;
  index: number;
  onDelete: (id: string) => void;
}

export default function HistoryCard({ entry, index, onDelete }: HistoryCardProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRatingLabel = (rating?: 'too-easy' | 'perfect' | 'too-hard') => {
    switch (rating) {
      case 'too-easy':
        return 'Trop facile';
      case 'perfect':
        return 'Parfait';
      case 'too-hard':
        return 'Trop dur';
      default:
        return null;
    }
  };

  const getRatingBadgeClass = (rating?: 'too-easy' | 'perfect' | 'too-hard') => {
    switch (rating) {
      case 'too-easy':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'perfect':
        return 'bg-indigo-100 text-indigo-700 border-indigo-300';
      case 'too-hard':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return '';
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-800">{entry.sessionName}</h3>
            {entry.rating && (
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRatingBadgeClass(
                  entry.rating
                )}`}
              >
                {getRatingLabel(entry.rating)}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Date : {formatDate(entry.completedAt)}</p>
            <p>Durée : {formatDuration(entry.totalDuration)}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors ml-4"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}


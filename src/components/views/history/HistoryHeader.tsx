import { TrashIcon } from '@heroicons/react/24/solid';
interface HistoryHeaderProps {
  count: number;
  onClearAll: () => void;
}

export default function HistoryHeader({ count, onClearAll }: HistoryHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Historique ({count} séance{count > 1 ? 's' : ''})
      </h2>
      <button
        onClick={onClearAll}
        className="px-4 py-2 border border-red-600 bg-transparent text-red-600 rounded-lg font-semibold hover:bg-red-600 hover:text-white transition-colors flex items-center gap-2"
      >
        Tout supprimer
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

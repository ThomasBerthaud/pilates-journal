import { TrashIcon } from '@heroicons/react/24/solid';
interface HistoryHeaderProps {
  count: number;
  onClearAll: () => void;
}

export default function HistoryHeader({ count, onClearAll }: HistoryHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">
        Historique ({count} séance{count > 1 ? 's' : ''})
      </h2>
      <button
        onClick={onClearAll}
        className="px-4 py-2 rounded-lg font-semibold flex items-center gap-2 border border-red-200 text-red-700 bg-white hover:bg-red-50 hover:border-red-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
      >
        Tout supprimer
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
}

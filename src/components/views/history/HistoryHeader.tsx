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
        className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
      >
        Tout supprimer
      </button>
    </div>
  );
}


interface EmptySessionsViewProps {
  onCreateNew: () => void;
}

export default function EmptySessionsView({ onCreateNew }: EmptySessionsViewProps) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 mb-4">Aucune séance créée pour le moment.</p>
      <button
        onClick={onCreateNew}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Créer ma première séance
      </button>
    </div>
  );
}


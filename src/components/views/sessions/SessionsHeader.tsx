interface SessionsHeaderProps {
  onCreateNew: () => void;
}

export default function SessionsHeader({ onCreateNew }: SessionsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Mes séances</h2>
      <button
        onClick={onCreateNew}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
      >
        + Nouvelle séance
      </button>
    </div>
  );
}


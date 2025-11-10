interface CompletionViewProps {
  onRatingSubmit: (rating: 'too-easy' | 'perfect' | 'too-hard') => void;
  onSkip: () => void;
}

export default function CompletionView({ onRatingSubmit, onSkip }: CompletionViewProps) {
  return (
    <div className="text-center py-12 max-w-2xl mx-auto">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Séance terminée !</h2>
      <p className="text-gray-600 mb-8">Bravo pour avoir complété cette séance !</p>
      
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Comment avez-vous trouvé cette séance ?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onRatingSubmit('too-easy')}
            className="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors border-2 border-green-300"
          >
            Trop facile
          </button>
          <button
            onClick={() => onRatingSubmit('perfect')}
            className="px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-200 transition-colors border-2 border-indigo-300"
          >
            Parfait
          </button>
          <button
            onClick={() => onRatingSubmit('too-hard')}
            className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors border-2 border-red-300"
          >
            Trop dur
          </button>
        </div>
        <button
          onClick={onSkip}
          className="mt-6 text-gray-500 hover:text-gray-700 text-sm underline"
        >
          Passer
        </button>
      </div>
    </div>
  );
}


export default function SessionNavigation() {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <button
        onClick={() => (window.location.href = '/')}
        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
      >
        Quitter
      </button>
    </div>
  );
}


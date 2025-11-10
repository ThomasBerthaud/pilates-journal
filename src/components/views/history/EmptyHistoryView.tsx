export default function EmptyHistoryView() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 mb-4">Aucune séance complétée pour le moment.</p>
      <a href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
        Retour à l&apos;accueil
      </a>
    </div>
  );
}


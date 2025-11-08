import { useState, useEffect } from 'react';
import { getAllHistory, deleteHistoryEntry, clearHistory } from '../utils/storage';
import type { HistoryEntry } from '../utils/types';
import { formatDuration } from '../utils/calculations';

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const loadHistory = () => {
    setHistory(getAllHistory());
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Supprimer cette entrée de l'historique ?")) {
      deleteHistoryEntry(id);
      loadHistory();
    }
  };

  const handleClearAll = () => {
    if (confirm('Supprimer tout l&apos;historique ? Cette action est irréversible.')) {
      clearHistory();
      loadHistory();
    }
  };

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

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Aucune séance complétée pour le moment.</p>
        <a href="/" className="text-indigo-600 hover:text-indigo-700 font-semibold">
          Retour à l&apos;accueil
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Historique ({history.length} séance{history.length > 1 ? 's' : ''})
        </h2>
        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Tout supprimer
        </button>
      </div>
      <div className="space-y-3">
        {history.map((entry, index) => (
          <div
            key={entry.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{entry.sessionName}</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Date : {formatDate(entry.completedAt)}</p>
                  <p>Durée : {formatDuration(entry.totalDuration)}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors ml-4"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

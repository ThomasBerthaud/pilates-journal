import { useState, useEffect } from 'react';
import { getAllHistory, deleteHistoryEntry, clearHistory } from '../utils/storage';
import type { HistoryEntry } from '../utils/types';
import EmptyHistoryView from './views/history/EmptyHistoryView';
import HistoryCard from './views/history/HistoryCard';
import HistoryHeader from './views/history/HistoryHeader';

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

  if (history.length === 0) {
    return <EmptyHistoryView />;
  }

  return (
    <div className="space-y-4">
      <HistoryHeader count={history.length} onClearAll={handleClearAll} />
      <div className="space-y-3">
        {history.map((entry, index) => (
          <HistoryCard
            key={entry.id}
            entry={entry}
            index={index}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

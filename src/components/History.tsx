import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { clearHistory, deleteHistoryEntry, getAllHistory } from '../utils/storage';
import type { HistoryEntry } from '../utils/types';
import EmptyHistoryView from './views/history/EmptyHistoryView';
import HistoryCard from './views/history/HistoryCard';
import HistoryCardSkeleton from './views/history/HistoryCardSkeleton';
import HistoryHeader from './views/history/HistoryHeader';

export default function History() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = () => {
    setIsLoading(true);
    // Simuler un délai de chargement pour l'animation
    setTimeout(() => {
      setHistory(getAllHistory());
      setIsLoading(false);
    }, 0);
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <HistoryHeader count={0} onClearAll={handleClearAll} />
        <motion.div
          className="space-y-3"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {[...Array(5)].map((_, index) => (
            <HistoryCardSkeleton key={index} index={index} />
          ))}
        </motion.div>
      </div>
    );
  }

  if (history.length === 0) {
    return <EmptyHistoryView />;
  }

  return (
    <div className="space-y-4">
      <HistoryHeader count={history.length} onClearAll={handleClearAll} />
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {history.map((entry) => (
            <HistoryCard key={entry.id} entry={entry} onDelete={handleDelete} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

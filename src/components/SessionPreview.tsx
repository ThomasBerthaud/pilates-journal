import { motion } from 'framer-motion';
import type { Session } from '../utils/types';
import { calculateTotalDuration, formatDuration } from '../utils/calculations';
import ExercisesPreviewList from './views/preview/ExercisesPreviewList';

interface SessionPreviewProps {
  session: Session;
  onStart: () => void;
  onClose: () => void;
}

export default function SessionPreview({ session, onStart, onClose }: SessionPreviewProps) {
  const totalDuration = calculateTotalDuration(session);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white border border-gray-300 rounded-lg md:rounded-xl shadow-2xl max-w-4xl w-full h-full md:h-auto md:max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{session.name}</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  {session.exercises.length} exercice{session.exercises.length > 1 ? 's' : ''}
                </p>
                <p>Durée totale : {formatDuration(totalDuration)}</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </div>

          <ExercisesPreviewList exercises={session.exercises} />

          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
            <motion.button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Fermer
            </motion.button>
            <motion.button
              onClick={onStart}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Démarrer la séance
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


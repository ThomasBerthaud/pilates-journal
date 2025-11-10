import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Exercise } from '../utils/types';

interface ExerciseFormProps {
  exercise?: Exercise;
  onSave: (exercise: Exercise) => void;
  onCancel: () => void;
}

export default function ExerciseForm({ exercise, onSave, onCancel }: ExerciseFormProps) {
  const [name, setName] = useState(() => exercise?.name || '');
  const [duration, setDuration] = useState(() => exercise?.duration || 60);
  const [description, setDescription] = useState(() => exercise?.description || '');
  const [restTime, setRestTime] = useState(() => exercise?.restTime || 30);
  const [type, setType] = useState<'warmup' | 'exercise' | 'stretch' | undefined>(
    () => exercise?.type || undefined
  );

  useEffect(() => {
    if (exercise) {
      setName(exercise.name);
      setDuration(exercise.duration);
      setDescription(exercise.description);
      setRestTime(exercise.restTime);
      setType(exercise.type);
    } else {
      setName('');
      setDuration(60);
      setDescription('');
      setRestTime(30);
      setType(undefined);
    }
  }, [exercise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Veuillez entrer un nom pour l'exercice");
      return;
    }

    if (duration <= 0) {
      alert('La durée doit être supérieure à 0');
      return;
    }

    onSave({
      name: name.trim(),
      duration,
      description: description.trim(),
      restTime,
      type: type || undefined,
    });
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white border border-gray-300 rounded-lg md:rounded-xl shadow-2xl max-w-2xl w-full h-full md:h-auto flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {exercise ? 'Modifier l&apos;exercice' : 'Nouvel exercice'}
            </h3>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom de l&apos;exercice *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Planche"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Durée (secondes) *
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {Math.floor(duration / 60)}m {duration % 60}s
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Temps de repos (secondes)
                </label>
                <input
                  type="number"
                  value={restTime}
                  onChange={(e) => setRestTime(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type d&apos;exercice
              </label>
              <select
                value={type || 'exercise'}
                onChange={(e) =>
                  setType(
                    e.target.value === 'exercise' ? undefined : (e.target.value as 'warmup' | 'stretch')
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white text-base"
              >
                <option value="exercise">Exercice normal</option>
                <option value="warmup">Échauffement</option>
                <option value="stretch">Étirement</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Les échauffements et étirements ont un affichage visuel distinct
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description / Instructions
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez comment effectuer cet exercice..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex gap-4 justify-end">
              <motion.button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Annuler
              </motion.button>
              <motion.button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {exercise ? 'Modifier' : 'Ajouter'}
              </motion.button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

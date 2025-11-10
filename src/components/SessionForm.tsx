import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { formatDuration } from '../utils/calculations';
import { createSession, getSessionById, saveSession } from '../utils/storage';
import type { Exercise } from '../utils/types';
import ExerciseBankSelector from './ExerciseBankSelector';
import ExerciseForm from './ExerciseForm';
import ExercisesList from './views/forms/ExercisesList';

interface SessionFormProps {
  sessionId?: string | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function SessionForm({ sessionId, onSave, onCancel }: SessionFormProps) {
  const getInitialSession = () => {
    if (sessionId) {
      const session = getSessionById(sessionId);
      return session;
    }
    return null;
  };

  const initialSession = getInitialSession();
  const [name, setName] = useState(() => initialSession?.name || '');
  const [exercises, setExercises] = useState<Exercise[]>(() => initialSession?.exercises || []);
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [showExerciseBankSelector, setShowExerciseBankSelector] = useState(false);

  useEffect(() => {
    if (sessionId) {
      const loadedSession = getSessionById(sessionId);
      if (loadedSession) {
        setName(loadedSession.name);
        setExercises(loadedSession.exercises);
      }
    } else {
      setName('');
      setExercises([]);
    }
  }, [sessionId]);

  const handleSave = () => {
    if (!name.trim()) {
      alert('Veuillez entrer un nom pour la séance');
      return;
    }

    if (exercises.length === 0) {
      alert('Veuillez ajouter au moins un exercice');
      return;
    }

    if (sessionId) {
      const session = getSessionById(sessionId);
      if (session) {
        saveSession({
          ...session,
          name,
          exercises,
          updatedAt: Date.now(),
        });
      }
    } else {
      createSession(name, exercises);
    }

    onSave();
  };

  const handleAddExercise = (exercise: Exercise) => {
    if (editingExerciseIndex !== null) {
      const newExercises = [...exercises];
      newExercises[editingExerciseIndex] = exercise;
      setExercises(newExercises);
      setEditingExerciseIndex(null);
    } else {
      setExercises([...exercises, exercise]);
    }
    setShowExerciseForm(false);
  };

  const handleEditExercise = (index: number) => {
    setEditingExerciseIndex(index);
    setShowExerciseForm(true);
  };

  const handleDeleteExercise = (index: number) => {
    if (confirm('Supprimer cet exercice ?')) {
      setExercises(exercises.filter((_, i) => i !== index));
    }
  };

  const handleMoveExercise = (index: number, direction: 'up' | 'down') => {
    const newExercises = [...exercises];
    if (direction === 'up' && index > 0) {
      [newExercises[index - 1], newExercises[index]] = [
        newExercises[index],
        newExercises[index - 1],
      ];
      setExercises(newExercises);
    } else if (direction === 'down' && index < exercises.length - 1) {
      [newExercises[index], newExercises[index + 1]] = [
        newExercises[index + 1],
        newExercises[index],
      ];
      setExercises(newExercises);
    }
  };

  const handleSelectFromBank = (selectedExercises: Exercise[]) => {
    setExercises([...exercises, ...selectedExercises]);
    setShowExerciseBankSelector(false);
  };

  const calculateSessionDuration = (): number => {
    return exercises.reduce((total, exercise) => {
      return total + exercise.duration + exercise.restTime;
    }, 0);
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 md:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="bg-white border border-gray-300 rounded-lg md:rounded-xl shadow-2xl max-w-4xl w-full h-full md:h-auto md:max-h-[90vh] flex flex-col"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {sessionId ? 'Modifier la séance' : 'Nouvelle séance'}
              </h2>
              {exercises.length > 0 && (
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold">
                  {formatDuration(calculateSessionDuration())}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom de la séance
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Séance matinale"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>

            <ExercisesList
              exercises={exercises}
              onAddExercise={() => {
                setEditingExerciseIndex(null);
                setShowExerciseForm(true);
              }}
              onAddExerciseFromBank={() => {
                setShowExerciseBankSelector(true);
              }}
              onEditExercise={handleEditExercise}
              onDeleteExercise={handleDeleteExercise}
              onMoveExercise={handleMoveExercise}
            />
          </div>

          <div className="border-t border-gray-200 p-6 bg-white">
            <div className="flex gap-4 justify-end">
              <motion.button
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Annuler
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enregistrer
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showExerciseForm && (
          <ExerciseForm
            exercise={editingExerciseIndex !== null ? exercises[editingExerciseIndex] : undefined}
            onSave={handleAddExercise}
            onCancel={() => {
              setShowExerciseForm(false);
              setEditingExerciseIndex(null);
            }}
          />
        )}
        {showExerciseBankSelector && (
          <ExerciseBankSelector
            onSelect={handleSelectFromBank}
            onCancel={() => setShowExerciseBankSelector(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

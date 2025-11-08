import { useState, useEffect } from 'react';
import { saveSession, createSession, getSessionById } from '../utils/storage';
import type { Exercise } from '../utils/types';
import ExerciseForm from './ExerciseForm';

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

  if (!sessionId && !showExerciseForm && exercises.length === 0 && !name) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {sessionId ? 'Modifier la séance' : 'Nouvelle séance'}
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nom de la séance
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Séance matinale"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Exercices ({exercises.length})
              </label>
              <button
                onClick={() => {
                  setEditingExerciseIndex(null);
                  setShowExerciseForm(true);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                + Ajouter un exercice
              </button>
            </div>

            {exercises.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucun exercice ajouté</p>
            ) : (
              <div className="space-y-3">
                {exercises.map((exercise, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{exercise.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-gray-500">
                          <span>
                            Durée: {Math.floor(exercise.duration / 60)}m {exercise.duration % 60}s
                          </span>
                          <span>Repos: {exercise.restTime}s</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleMoveExercise(index, 'up')}
                          disabled={index === 0}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
                          title="Monter"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleMoveExercise(index, 'down')}
                          disabled={index === exercises.length - 1}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-200 rounded disabled:opacity-50"
                          title="Descendre"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => handleEditExercise(index)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteExercise(index)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>

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
    </div>
  );
}

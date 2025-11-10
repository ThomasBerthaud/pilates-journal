import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  getCategoryBackgroundColor,
  getCategoryColor,
  getCategoryLabel,
} from '../utils/categoryColors';
import {
  getAllExercisesFromBank,
  getExercisesByCategory,
  initializeExerciseBank,
} from '../utils/exerciseBank';
import type { Exercise, ExerciseCategory } from '../utils/types';

interface ExerciseBankSelectorProps {
  onSelect: (exercises: Exercise[]) => void;
  onCancel: () => void;
}

export default function ExerciseBankSelector({ onSelect, onCancel }: ExerciseBankSelectorProps) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exercisesByCategory, setExercisesByCategory] = useState<
    Record<ExerciseCategory, Exercise[]>
  >({
    abdominaux: [],
    dos: [],
    jambes: [],
    fessiers: [],
    'epaules-bras': [],
    hanches: [],
    'corps-entier': [],
    warmup: [],
    stretch: [],
  });
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(new Set());
  const [collapsedCategories, setCollapsedCategories] = useState<Set<ExerciseCategory>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const loadExercises = () => {
    const allExercises = getAllExercisesFromBank();
    setExercises(allExercises);
    const grouped = getExercisesByCategory(allExercises);
    setExercisesByCategory(grouped);
  };

  useEffect(() => {
    initializeExerciseBank();
    loadExercises();
  }, []);

  const handleToggleCategory = (category: ExerciseCategory) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    setCollapsedCategories(newCollapsed);
  };

  const handleToggleExercise = (exerciseName: string) => {
    const newSelected = new Set(selectedExercises);
    if (newSelected.has(exerciseName)) {
      newSelected.delete(exerciseName);
    } else {
      newSelected.add(exerciseName);
    }
    setSelectedExercises(newSelected);
  };

  const handleAddSelected = () => {
    const selected = exercises.filter((ex) => selectedExercises.has(ex.name));
    if (selected.length === 0) {
      alert('Veuillez sélectionner au moins un exercice');
      return;
    }
    onSelect(selected);
  };

  const filteredExercisesByCategory = () => {
    if (!searchQuery.trim()) {
      return exercisesByCategory;
    }

    const query = searchQuery.toLowerCase();
    const filtered: Record<ExerciseCategory, Exercise[]> = {
      abdominaux: [],
      dos: [],
      jambes: [],
      fessiers: [],
      'epaules-bras': [],
      hanches: [],
      'corps-entier': [],
      warmup: [],
      stretch: [],
    };

    for (const [category, categoryExercises] of Object.entries(exercisesByCategory)) {
      filtered[category as ExerciseCategory] = categoryExercises.filter(
        (ex) =>
          ex.name.toLowerCase().includes(query) || ex.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const getSelectedExercisesList = () => {
    return exercises.filter((ex) => selectedExercises.has(ex.name));
  };

  const categoryOrder: ExerciseCategory[] = [
    'warmup',
    'stretch',
    'abdominaux',
    'dos',
    'jambes',
    'fessiers',
    'epaules-bras',
    'hanches',
    'corps-entier',
  ];

  const selectedCount = selectedExercises.size;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onCancel}
    >
      <motion.div
        className="bg-white border border-gray-300 rounded-lg md:rounded-xl shadow-2xl max-w-5xl w-full h-full md:h-auto md:max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Choisir des exercices</h2>
            <button
              onClick={onCancel}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Rechercher un exercice..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          {selectedCount > 0 && (
            <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-indigo-800">
                  {selectedCount} exercice{selectedCount > 1 ? 's' : ''} sélectionné
                  {selectedCount > 1 ? 's' : ''}
                </span>
                <button
                  onClick={() => setSelectedExercises(new Set())}
                  className="text-xs text-indigo-600 hover:text-indigo-800 underline"
                >
                  Tout désélectionner
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {getSelectedExercisesList().map((exercise) => (
                  <span
                    key={exercise.name}
                    className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-xs font-medium"
                  >
                    {exercise.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {exercises.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>Aucun exercice dans la banque.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categoryOrder.map((category) => {
                const categoryExercises = filteredExercisesByCategory()[category];
                if (categoryExercises.length === 0) return null;

                const isCollapsed = collapsedCategories.has(category);

                return (
                  <motion.div
                    key={category}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <button
                      onClick={() => handleToggleCategory(category)}
                      className={`w-full px-6 py-4 flex items-center justify-between ${getCategoryBackgroundColor(category)} hover:opacity-90 transition-opacity`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${getCategoryColor(category)}`}
                        >
                          {getCategoryLabel(category)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {categoryExercises.length} exercice
                          {categoryExercises.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      {isCollapsed ? (
                        <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                      ) : (
                        <ChevronUpIcon className="w-5 h-5 text-gray-600" />
                      )}
                    </button>

                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 space-y-2">
                            {categoryExercises.map((exercise, index) => {
                              const isSelected = selectedExercises.has(exercise.name);
                              return (
                                <motion.label
                                  key={`${exercise.name}-${index}`}
                                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleToggleExercise(exercise.name)}
                                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold text-gray-800">
                                        {exercise.name}
                                      </span>
                                      <span
                                        className={`px-2 py-0.5 rounded text-xs font-semibold ${getCategoryColor(exercise.category)}`}
                                      >
                                        {getCategoryLabel(exercise.category)}
                                      </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-1">
                                      {exercise.description}
                                    </p>
                                    <div className="flex gap-4 text-xs text-gray-500">
                                      <span>
                                        Durée: {Math.floor(exercise.duration / 60)}m{' '}
                                        {exercise.duration % 60}s
                                      </span>
                                      <span>Repos: {exercise.restTime}s</span>
                                    </div>
                                  </div>
                                </motion.label>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
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
              onClick={handleAddSelected}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: selectedCount > 0 ? 1.05 : 1 }}
              whileTap={{ scale: selectedCount > 0 ? 0.95 : 1 }}
              disabled={selectedCount === 0}
            >
              Ajouter {selectedCount > 0 ? `(${selectedCount})` : ''}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

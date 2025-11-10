import {
  ArrowPathIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  getCategoryBackgroundColor,
  getCategoryColor,
  getCategoryLabel,
} from '../utils/categoryColors';
import {
  deleteExerciseFromBank,
  getAllExercisesFromBank,
  getExercisesByCategory,
  initializeExerciseBank,
  resetExerciseBank,
  saveExerciseToBank,
} from '../utils/exerciseBank';
import type { Exercise, ExerciseCategory } from '../utils/types';
import ExerciseForm from './ExerciseForm';

export default function ExerciseBank() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exercisesByCategory, setExercisesByCategory] = useState<
    Record<ExerciseCategory, Exercise[]>
  >({
    warmup: [],
    stretch: [],
    abdominaux: [],
    dos: [],
    jambes: [],
    fessiers: [],
    'epaules-bras': [],
    hanches: [],
    'corps-entier': [],
  });
  const [collapsedCategories, setCollapsedCategories] = useState<Set<ExerciseCategory>>(new Set());
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadExercises = () => {
    const allExercises = getAllExercisesFromBank();
    setExercises(allExercises);

    // Grouper tous les exercices par catégorie (y compris warmup et stretch)
    const grouped = getExercisesByCategory(allExercises);
    setExercisesByCategory(grouped);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      // Use setTimeout to allow UI to render loading state
      await new Promise((resolve) => setTimeout(resolve, 0));

      // Initialize bank if empty
      initializeExerciseBank();
      loadExercises();

      setIsLoading(false);
    };

    loadData();
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

  const handleAddExercise = () => {
    setEditingExercise(undefined);
    setShowExerciseForm(true);
  };

  const handleEditExercise = (exercise: Exercise) => {
    setEditingExercise(exercise);
    setShowExerciseForm(true);
  };

  const handleDeleteExercise = (exercise: Exercise) => {
    if (confirm(`Supprimer l'exercice "${exercise.name}" de la banque ?`)) {
      deleteExerciseFromBank(exercise.name);
      loadExercises();
    }
  };

  const handleSaveExercise = (exercise: Exercise) => {
    saveExerciseToBank(exercise);
    loadExercises();
    setShowExerciseForm(false);
    setEditingExercise(undefined);
  };

  const handleCancelForm = () => {
    setShowExerciseForm(false);
    setEditingExercise(undefined);
  };

  const handleReset = async () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir réinitialiser la banque d'exercices ? Tous les exercices personnalisés seront supprimés et remplacés par les exercices des presets."
      )
    ) {
      setIsLoading(true);

      // Use setTimeout to allow UI to render loading state
      await new Promise((resolve) => setTimeout(resolve, 0));

      resetExerciseBank();
      loadExercises();

      setIsLoading(false);
    }
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

  const renderExerciseCard = (exercise: Exercise, index: number) => (
    <motion.div
      key={`${exercise.name}-${index}`}
      className="border border-gray-200 rounded-lg p-3 md:p-4 bg-white hover:bg-gray-50 transition-colors"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-gray-800 text-sm sm:text-base wrap-break-word">
              {exercise.name}
            </h4>
            <div className="flex gap-1 sm:gap-2 shrink-0">
              <motion.button
                onClick={() => handleEditExercise(exercise)}
                className="p-1.5 sm:p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                title="Modifier"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button
                onClick={() => handleDeleteExercise(exercise)}
                className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded"
                title="Supprimer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-3 sm:line-clamp-none">
            {exercise.description}
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-500">
            <span className="whitespace-nowrap">
              Durée: {Math.floor(exercise.duration / 60)}m {exercise.duration % 60}s
            </span>
            <span className="whitespace-nowrap">Repos: {exercise.restTime}s</span>
            {exercise.category && (
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap ${getCategoryColor(exercise.category)}`}
              >
                {getCategoryLabel(exercise.category)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Banque d'exercices</h2>
        <div className="flex gap-2">
          <motion.button
            onClick={handleReset}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            title="Réinitialiser la banque d'exercices"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Réinitialiser
          </motion.button>
          <motion.button
            onClick={handleAddExercise}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
          >
            <PlusIcon className="w-5 h-5" />
            Ajouter un exercice
          </motion.button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un exercice..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 bg-white"
          disabled={isLoading}
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
          />
          <p className="mt-4 text-gray-600 font-medium">Chargement des exercices...</p>
        </div>
      ) : exercises.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p>Aucun exercice dans la banque.</p>
          <p className="mt-2">Ajoutez votre premier exercice pour commencer !</p>
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
                      {categoryExercises.length} exercice{categoryExercises.length > 1 ? 's' : ''}
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
                      <div className="p-4 space-y-3">
                        {categoryExercises.map((exercise, index) =>
                          renderExerciseCard(exercise, index)
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {showExerciseForm && (
          <ExerciseForm
            exercise={editingExercise}
            onSave={handleSaveExercise}
            onCancel={handleCancelForm}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

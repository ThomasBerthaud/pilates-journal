import { useState } from 'react';
import { addHistoryEntry } from '../utils/storage';
import type { Exercise, Session } from '../utils/types';
import Timer from './Timer';

interface SessionTimerProps {
  session: Session;
  onComplete: () => void;
}

type Phase = 'exercise' | 'rest' | 'completed';

export default function SessionTimer({ session, onComplete }: SessionTimerProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<Phase>('exercise');
  const [startTime] = useState<number>(() => Date.now());

  const currentExercise: Exercise | null = session.exercises[currentExerciseIndex] || null;
  const isLastExercise = currentExerciseIndex === session.exercises.length - 1;
  const exerciseType = currentExercise?.type || 'exercise';

  const handleExerciseComplete = () => {
    if (currentExercise && currentExercise.restTime > 0 && !isLastExercise) {
      setCurrentPhase('rest');
    } else {
      moveToNextExercise();
    }
  };

  const handleRestComplete = () => {
    moveToNextExercise();
  };

  const moveToNextExercise = () => {
    if (isLastExercise && currentPhase === 'rest') {
      // Session completed
      handleSessionComplete();
    } else if (isLastExercise) {
      // Last exercise, but need to do rest
      if (currentExercise && currentExercise.restTime > 0) {
        setCurrentPhase('rest');
      } else {
        handleSessionComplete();
      }
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentPhase('exercise');
    }
  };

  const handleSessionComplete = () => {
    const endTime = Date.now();
    const totalDuration = Math.floor((endTime - startTime) / 1000);

    addHistoryEntry({
      sessionId: session.id,
      sessionName: session.name,
      completedAt: endTime,
      totalDuration,
    });

    setCurrentPhase('completed');
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (currentPhase === 'completed') {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Séance terminée !</h2>
        <p className="text-gray-600">Bravo pour avoir complété cette séance !</p>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Aucun exercice disponible</p>
      </div>
    );
  }

  const progress =
    ((currentExerciseIndex + (currentPhase === 'rest' ? 1 : 0)) / (session.exercises.length * 2)) *
    100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Exercice {currentExerciseIndex + 1} sur {session.exercises.length}
          </span>
          <span>{Math.round(progress)}% complété</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current phase */}
      {currentPhase === 'exercise' ? (
        (() => {
          const getTypeStyles = () => {
            switch (exerciseType) {
              case 'warmup':
                return {
                  container:
                    'bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200',
                  badge: 'bg-orange-600 text-white',
                  badgeText: 'Échauffement',
                  timerColor: 'text-orange-600',
                  circleColor: '#ea580c',
                };
              case 'stretch':
                return {
                  container:
                    'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200',
                  badge: 'bg-green-600 text-white',
                  badgeText: 'Étirement',
                  timerColor: 'text-green-600',
                  circleColor: '#16a34a',
                };
              default:
                return {
                  container: 'bg-white',
                  badge: 'bg-indigo-600 text-white animate-pulse-slow',
                  badgeText: 'Exercice',
                  timerColor: 'text-indigo-600',
                  circleColor: '#6366f1',
                };
            }
          };

          const styles = getTypeStyles();

          return (
            <div
              className={`${styles.container} rounded-xl shadow-xl p-8 text-center animate-slide-up`}
            >
              <div className="mb-6">
                <span className={`px-4 py-2 ${styles.badge} rounded-full text-sm font-semibold`}>
                  {styles.badgeText}
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{currentExercise.name}</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                {currentExercise.description}
              </p>
              <Timer
                seconds={currentExercise.duration}
                onComplete={handleExerciseComplete}
                size="large"
                textColor={styles.timerColor}
                circleColor={styles.circleColor}
              />
            </div>
          );
        })()
      ) : (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-xl p-8 text-center border-2 border-purple-200 animate-slide-up">
          <div className="mb-6">
            <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold">
              Repos
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Temps de repos</h2>
          <p className="text-lg text-gray-600 mb-8">Profitez de ce moment pour récupérer</p>
          <Timer seconds={currentExercise.restTime} onComplete={handleRestComplete} size="large" />
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => (window.location.href = '/')}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
        >
          Quitter
        </button>
      </div>
    </div>
  );
}

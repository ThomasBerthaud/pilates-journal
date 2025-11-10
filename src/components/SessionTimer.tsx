import { useState } from 'react';
import { addHistoryEntry } from '../utils/storage';
import type { Exercise, Session } from '../utils/types';
import CompletionView from './views/timer/CompletionView';
import ExerciseView from './views/timer/ExerciseView';
import ProgressBar from './views/timer/ProgressBar';
import RestView from './views/timer/RestView';
import SessionNavigation from './views/timer/SessionNavigation';

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
    return <CompletionView />;
  }

  if (!currentExercise) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Aucun exercice disponible</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProgressBar currentIndex={currentExerciseIndex + 1} total={session.exercises.length} />

      {currentPhase === 'exercise' ? (
        <ExerciseView
          exercise={currentExercise}
          exerciseIndex={currentExerciseIndex}
          onComplete={handleExerciseComplete}
        />
      ) : (
        <RestView
          restTime={currentExercise.restTime}
          exerciseIndex={currentExerciseIndex}
          onComplete={handleRestComplete}
        />
      )}

      <SessionNavigation />
    </div>
  );
}

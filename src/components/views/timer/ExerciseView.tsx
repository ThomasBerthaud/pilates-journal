import type { Exercise } from '../../../utils/types';
import Timer from '../../Timer';

interface ExerciseViewProps {
  exercise: Exercise;
  exerciseIndex: number;
  onComplete: () => void;
}

export default function ExerciseView({ exercise, exerciseIndex, onComplete }: ExerciseViewProps) {
  const exerciseType = exercise.type || 'exercise';

  const getTypeStyles = () => {
    switch (exerciseType) {
      case 'warmup':
        return {
          container: 'bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200',
          badge: 'bg-orange-600 text-white',
          badgeText: 'Échauffement',
          timerColor: 'text-orange-600',
          circleColor: '#ea580c',
        };
      case 'stretch':
        return {
          container: 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200',
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
    <div className={`${styles.container} rounded-xl shadow-xl p-8 text-center animate-slide-up`}>
      <div className="mb-6">
        <span className={`px-4 py-2 ${styles.badge} rounded-full text-sm font-semibold`}>
          {styles.badgeText}
        </span>
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">{exercise.name}</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">{exercise.description}</p>
      <Timer
        key={`exercise-${exerciseIndex}`}
        autoStart={exerciseIndex !== 0}
        seconds={exercise.duration}
        onComplete={onComplete}
        size="large"
        textColor={styles.timerColor}
        circleColor={styles.circleColor}
      />
    </div>
  );
}


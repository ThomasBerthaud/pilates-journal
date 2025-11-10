import type { Exercise } from '../../../utils/types';
import ExercisePreviewItem from './ExercisePreviewItem';

interface ExercisesPreviewListProps {
  exercises: Exercise[];
}

export default function ExercisesPreviewList({ exercises }: ExercisesPreviewListProps) {
  return (
    <div className="space-y-4 mb-6">
      {exercises.map((exercise, index) => (
        <ExercisePreviewItem key={index} exercise={exercise} index={index} />
      ))}
    </div>
  );
}


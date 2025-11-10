interface ProgressBarProps {
  currentIndex: number;
  total: number;
}

export default function ProgressBar({ currentIndex, total }: ProgressBarProps) {
  const progress = ((currentIndex - 1) / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          Exercice {currentIndex} sur {total}
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
  );
}

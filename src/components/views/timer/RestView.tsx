import Timer from '../../Timer';

interface RestViewProps {
  restTime: number;
  exerciseIndex: number;
  onComplete: () => void;
}

export default function RestView({ restTime, exerciseIndex, onComplete }: RestViewProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-xl p-8 text-center border-2 border-purple-200 animate-slide-up">
      <div className="mb-6">
        <span className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm font-semibold">
          Repos
        </span>
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Temps de repos</h2>
      <p className="text-lg text-gray-600 mb-8">Profitez de ce moment pour récupérer</p>
      <Timer
        key={`rest-${exerciseIndex}`}
        autoStart={true}
        seconds={restTime}
        onComplete={onComplete}
        size="large"
      />
    </div>
  );
}


import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TimerProps {
  seconds: number;
  autoStart?: boolean;
  onComplete?: () => void;
  size?: 'small' | 'medium' | 'large';
  label?: string;
  textColor?: string;
  circleColor?: string;
}

export default function Timer({
  seconds,
  autoStart = false,
  onComplete,
  size = 'large',
  label,
  textColor = 'text-indigo-600',
  circleColor = '#6366f1',
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    setTimeLeft(seconds);
    if (autoStart) {
      setIsRunning(true);
    }
  }, [seconds, autoStart]);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) {
      if (timeLeft === 0 && onComplete) {
        onComplete();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const percentage = (timeLeft / seconds) * 100;

  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-5xl md:text-7xl',
  };

  const circleSize = {
    small: 120,
    medium: 180,
    large: 240,
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {label && <p className="text-lg font-semibold text-gray-700 mb-4">{label}</p>}
      <div className="relative" style={{ width: circleSize[size], height: circleSize[size] }}>
        <svg className="transform -rotate-90" width={circleSize[size]} height={circleSize[size]}>
          <circle
            cx={circleSize[size] / 2}
            cy={circleSize[size] / 2}
            r={circleSize[size] / 2 - 10}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <motion.circle
            cx={circleSize[size] / 2}
            cy={circleSize[size] / 2}
            r={circleSize[size] / 2 - 10}
            fill="none"
            stroke={circleColor}
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * (circleSize[size] / 2 - 10)}
            strokeDashoffset={2 * Math.PI * (circleSize[size] / 2 - 10) * (1 - percentage / 100)}
            initial={{ strokeDashoffset: 2 * Math.PI * (circleSize[size] / 2 - 10) }}
            animate={{
              strokeDashoffset: 2 * Math.PI * (circleSize[size] / 2 - 10) * (1 - percentage / 100),
            }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <motion.span
            key={timeLeft}
            initial={{ scale: 0.95, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`font-bold ${textColor} ${sizeClasses[size]} leading-none`}
          >
            {formatTime(timeLeft)}
          </motion.span>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <motion.button
          onClick={() => setIsRunning(!isRunning)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRunning ? 'Pause' : 'Démarrer'}
        </motion.button>
        <motion.button
          onClick={() => {
            setTimeLeft(seconds);
            setIsRunning(false);
          }}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Réinitialiser
        </motion.button>
      </div>
    </div>
  );
}

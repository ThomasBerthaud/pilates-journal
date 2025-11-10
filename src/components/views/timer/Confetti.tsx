import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPieceProps {
  x: number;
  delay: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
}

function ConfettiPiece({ x, delay, color, shape }: ConfettiPieceProps) {
  const getShape = () => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-sm';
      case 'triangle':
        return 'w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent';
      default:
        return 'rounded-full';
    }
  };

  const getSize = () => {
    if (shape === 'triangle') return '';
    return Math.random() > 0.5 ? 'w-3 h-3' : 'w-2 h-2';
  };

  const rotation = Math.random() * 360;
  const duration = 2 + Math.random() * 2;
  const yDistance = 800 + Math.random() * 400;

  return (
    <motion.div
      className={`absolute ${getSize()} ${getShape()}`}
      style={{
        left: `${x}%`,
        backgroundColor: shape === 'triangle' ? 'transparent' : color,
        borderBottomColor: shape === 'triangle' ? color : undefined,
        top: '-10px',
      }}
      initial={{
        y: 0,
        rotate: rotation,
        opacity: 1,
      }}
      animate={{
        y: yDistance,
        rotate: rotation + 360 * (Math.random() > 0.5 ? 1 : -1),
        opacity: [1, 1, 0],
        x: (Math.random() - 0.5) * 200,
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    />
  );
}

export default function Confetti() {
  const [confettiPieces, setConfettiPieces] = useState<
    Array<{
      x: number;
      delay: number;
      color: string;
      shape: 'circle' | 'square' | 'triangle';
    }>
  >([]);

  const colors = [
    '#FF6B6B', // Rouge
    '#4ECDC4', // Turquoise
    '#45B7D1', // Bleu
    '#FFA07A', // Saumon
    '#98D8C8', // Vert menthe
    '#F7DC6F', // Jaune
    '#BB8FCE', // Violet
    '#85C1E2', // Bleu clair
    '#F8B739', // Orange
    '#52BE80', // Vert
  ];

  useEffect(() => {
    const pieces: Array<{
      x: number;
      delay: number;
      color: string;
      shape: 'circle' | 'square' | 'triangle';
    }> = [];

    // Générer 50 confettis
    for (let i = 0; i < 50; i++) {
      pieces.push({
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: (['circle', 'square', 'triangle'] as const)[Math.floor(Math.random() * 3)],
      });
    }

    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece, index) => (
        <ConfettiPiece key={index} {...piece} />
      ))}
    </div>
  );
}

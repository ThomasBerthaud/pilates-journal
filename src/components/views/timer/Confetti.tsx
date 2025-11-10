import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiPieceProps {
  x: number;
  delay: number;
  color: string;
  shape: 'circle' | 'square' | 'triangle';
  size: string;
  rotation: number;
  duration: number;
  yDistance: number;
  rotateDirection: number;
  xOffset: number;
}

function ConfettiPiece({
  x,
  delay,
  color,
  shape,
  size,
  rotation,
  duration,
  yDistance,
  rotateDirection,
  xOffset,
}: ConfettiPieceProps) {
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

  return (
    <motion.div
      className={`absolute ${size} ${getShape()}`}
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
        rotate: rotation + 360 * rotateDirection,
        opacity: [1, 1, 0],
        x: xOffset,
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
      size: string;
      rotation: number;
      duration: number;
      yDistance: number;
      rotateDirection: number;
      xOffset: number;
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
      size: string;
      rotation: number;
      duration: number;
      yDistance: number;
      rotateDirection: number;
      xOffset: number;
    }> = [];

    // Générer 50 confettis
    for (let i = 0; i < 50; i++) {
      const sizeRandom = Math.random();
      const rotationRandom = Math.random();
      const durationRandom = Math.random();
      const yDistanceRandom = Math.random();
      const rotateDirectionRandom = Math.random();
      const xRandom = Math.random();
      const shape = (['circle', 'square', 'triangle'] as const)[Math.floor(Math.random() * 3)];

      pieces.push({
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape,
        size: shape === 'triangle' ? '' : sizeRandom > 0.5 ? 'w-3 h-3' : 'w-2 h-2',
        rotation: rotationRandom * 360,
        duration: 2 + durationRandom * 2,
        yDistance: 800 + yDistanceRandom * 400,
        rotateDirection: rotateDirectionRandom > 0.5 ? 1 : -1,
        xOffset: (xRandom - 0.5) * 200,
      });
    }

    setConfettiPieces(pieces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece, index) => (
        <ConfettiPiece key={index} {...piece} />
      ))}
    </div>
  );
}

import { motion, type Variants } from 'framer-motion';

interface CompletionViewProps {
  onRatingSubmit: (rating: 'too-easy' | 'perfect' | 'too-hard') => void;
  onSkip: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const,
    },
  },
};

const emojiVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 10,
    },
  },
};

const titleVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 150,
      damping: 12,
    },
  },
};

const buttonVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.95,
  },
};

export default function CompletionView({ onRatingSubmit, onSkip }: CompletionViewProps) {
  return (
    <motion.div
      className="text-center py-12 max-w-2xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-6xl mb-4"
        variants={emojiVariants}
        animate={{
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: {
            delay: 0.6,
            duration: 0.6,
            ease: 'easeInOut',
          },
          scale: {
            delay: 0.6,
            duration: 0.6,
            ease: 'easeInOut',
          },
        }}
      >
        🎉
      </motion.div>
      <motion.h2 className="text-3xl font-bold text-gray-800 mb-2" variants={titleVariants}>
        Séance terminée !
      </motion.h2>
      <motion.p className="text-gray-600 mb-8" variants={itemVariants}>
        Bravo pour avoir complété cette séance !
      </motion.p>

      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 border border-gray-200"
        variants={itemVariants}
      >
        <motion.h3 className="text-xl font-semibold text-gray-800 mb-6" variants={itemVariants}>
          Comment avez-vous trouvé cette séance ?
        </motion.h3>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={containerVariants}
        >
          <motion.button
            onClick={() => onRatingSubmit('too-easy')}
            className="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-colors border-2 border-green-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Trop facile
          </motion.button>
          <motion.button
            onClick={() => onRatingSubmit('perfect')}
            className="px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-200 transition-colors border-2 border-indigo-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Parfait
          </motion.button>
          <motion.button
            onClick={() => onRatingSubmit('too-hard')}
            className="px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition-colors border-2 border-red-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Trop dur
          </motion.button>
        </motion.div>
        <motion.button
          onClick={onSkip}
          className="mt-6 text-gray-500 hover:text-gray-700 text-sm underline"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Passer
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

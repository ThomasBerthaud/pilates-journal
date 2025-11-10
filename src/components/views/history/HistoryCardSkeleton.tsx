import { motion } from 'framer-motion';

interface HistoryCardSkeletonProps {
  index?: number;
}

export default function HistoryCardSkeleton({ index = 0 }: HistoryCardSkeletonProps) {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          {/* Title and badge skeleton */}
          <div className="flex items-center gap-3 mb-2">
            <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Info skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-56 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse ml-4" />
      </div>

      {/* Shimmer effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </motion.div>
  );
}


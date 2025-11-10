import { motion } from 'framer-motion';

interface SessionCardSkeletonProps {
  index?: number;
}

export default function SessionCardSkeleton({ index = 0 }: SessionCardSkeletonProps) {
  return (
    <motion.div
      className="rounded-xl shadow-md p-6 border bg-white border-gray-100 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* Badge skeleton */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Title skeleton */}
      <div className="h-7 w-3/4 bg-gray-200 rounded mb-2 animate-pulse" />

      {/* Info skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Buttons skeleton */}
      <div className="flex gap-2 flex-wrap">
        <div className="h-10 w-16 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-10 flex-1 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse" />
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


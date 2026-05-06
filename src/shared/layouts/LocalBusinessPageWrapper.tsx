import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils';

interface LocalBusinessPageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.1, 0.25, 1] // Modern smooth easing
    } 
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: 0.4 } 
  }
};

export const LocalBusinessPageWrapper: React.FC<LocalBusinessPageWrapperProps> = ({
  children,
  className
}) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className={cn("min-h-[calc(100vh-180px)]", className)}
    >
      {children}
    </motion.div>
  );
};
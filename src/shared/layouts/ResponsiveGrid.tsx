import React from 'react';
import { cn } from '@/shared/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function ResponsiveGrid({ children, className }: ResponsiveGridProps) {
  return (
    <div className={cn("app-responsive-grid", className)}>
      {children}
    </div>
  );
}
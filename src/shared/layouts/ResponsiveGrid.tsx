import React from 'react';
import { cn } from '@/shared/lib/utils';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  /** Number of columns at different breakpoints */
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: number | string;
}

const defaultCols = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 4,
  '2xl': 5,
};

export default function ResponsiveGrid({
  children,
  className,
  cols = defaultCols,
  gap = 6,
}: ResponsiveGridProps) {
  const gridCols = { ...defaultCols, ...cols };

  return (
    <div
      className={cn(
        "grid w-full",
        `grid-cols-${gridCols.xs}`,
        `sm:grid-cols-${gridCols.sm}`,
        `md:grid-cols-${gridCols.md}`,
        `lg:grid-cols-${gridCols.lg}`,
        `xl:grid-cols-${gridCols.xl}`,
        `2xl:grid-cols-${gridCols['2xl']}`,
        typeof gap === 'number' ? `gap-${gap}` : gap,
        className
      )}
    >
      {children}
    </div>
  );
}

import { cn } from "@/shared/lib/utils";
import  { type ReactNode, useState, useRef } from "react";

type ShineBorderProps = {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  gradient?: string;
};

export const ShineBorder = ({
  children,
  className,
  borderWidth = 2,
  gradient = "from-blue-500 via-red-500 to-teal-400",
}: ShineBorderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn("relative rounded-2xl overflow-hidden", className)}
      style={{ padding: borderWidth }}
    >
      {/* Shine layer */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 bg-linear-to-r",
          gradient
        )}
        style={{
          opacity,
          maskImage: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, black 10%, transparent 60%)`,
          WebkitMaskImage: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, black 10%, transparent 60%)`,
        }}
      />

      {/* Fallback border */}
      <div className="absolute inset-0 rounded-2xl border border-border pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 rounded-2xl bg-card h-full">
        {children}
      </div>
    </div>
  );
};
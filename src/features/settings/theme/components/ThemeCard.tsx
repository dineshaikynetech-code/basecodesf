import { Check, Trash2 } from "lucide-react";
import type { ThemeCardProps } from "../theme.types";
import { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shared/components/ui/tooltip";
import { useIsTruncated } from "../hooks/useIsTruncated";


export function ThemeCard({ themeData: t, isActive, onSelect, onRemove, description }: ThemeCardProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const isTruncated = useIsTruncated(textRef);
  return (
  <TooltipProvider>
    <button
      onClick={() => onSelect(t)}
      className={`relative rounded-xl border transition-all overflow-hidden group h-full flex flex-col
        ${isActive ? "border-primary ring-2 ring-primary" : "hover:border-primary/50"}
      `}
    >
      {/* PREVIEW STRIP */}
      <div className="h-24 p-4 flex gap-2 items-start border-b  border-b-amber-100" style={{ background: t.tokens.background }}>
        <div className="w-6 h-6 rounded-full shadow-sm" style={{ background: t.tokens.primary }} />
        <div className="w-6 h-6 rounded-full shadow-sm" style={{ background: t.tokens.card }} />
        <div className="w-6 h-6 rounded-full shadow-sm border" style={{ background: t.tokens.text }} />
      </div>

      {/* CONTENT */}
      <div className="p-4 text-left flex-1 bg-card">
        <h3 className="font-medium truncate">{t.name || "Untitled Theme"}</h3>
        <Tooltip open={isTruncated ? undefined : false}>
          <TooltipTrigger asChild>
            <p
              ref={textRef}
              className="text-xs opacity-70 mt-1 truncate"
            >
              {description}
            </p>
          </TooltipTrigger>

        
          <TooltipContent side="bottom" className="max-w-[200px] text-xs">
            {description}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* ACTIVE INDICATOR */}
      {isActive && (
        <div className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
          <Check size={14} />
        </div>
      )}

      {/* DELETE ACTION */}
      {t.isCustom && onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(t.id);
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-destructive/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-destructive hover:text-white"
        >
          <Trash2 size={14} />
        </button>
      )}
    </button>
    </TooltipProvider>
  );
}
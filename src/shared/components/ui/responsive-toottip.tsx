import React, { useState, useRef, useEffect } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

interface ResponsiveTooltipProps {
    text: string;
    /** * Object mapping breakpoints to max-widths 
     * Example: { base: 'max-w-[100px]', md: 'max-w-[150px]', lg: 'max-w-[200px]' }
     */
    breakpoints?: {
        base?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
    };
    className?: string;
}

export const ResponsiveTooltipText: React.FC<ResponsiveTooltipProps> = ({ 
    text, 
    breakpoints, 
    className 
}) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef<HTMLSpanElement>(null);

    // Construct tailwind classes from breakpoints object
    const breakpointClasses = breakpoints ? cn(
        breakpoints.base || "max-w-full",
        breakpoints.sm && `sm:${breakpoints.sm}`,
        breakpoints.md && `md:${breakpoints.md}`,
        breakpoints.lg && `lg:${breakpoints.lg}`,
        breakpoints.xl && `xl:${breakpoints.xl}`,
    ) : "max-w-full";

    const checkOverflow = () => {
        if (textRef.current) {
            // Check if actual content width is greater than visible width
            setIsOverflowing(textRef.current.scrollWidth > textRef.current.clientWidth);
        }
    };

    useEffect(() => {
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [text, breakpoints]);

    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span
                        ref={textRef}
                        className={cn(
                            "block truncate text-sm",
                            breakpointClasses,
                            className
                        )}
                    >
                        {text}
                    </span>
                </TooltipTrigger>

                {isOverflowing && (
                    <TooltipContent 
                        side="top" 
                        className="bg-slate-900 text-white border-none text-xs px-2 py-1 shadow-md"
                    >
                        <p>{text}</p>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
};
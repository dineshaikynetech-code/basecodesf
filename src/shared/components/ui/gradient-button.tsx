import type React from "react";
import { Button } from "./button";
import type { ComponentProps } from "react";

type GradientButtonProps = {
    children: React.ReactNode;
    isLoading?: boolean;
    className?: string;
} & ComponentProps<typeof Button>;

export const GradientButton = ({
    children,
    isLoading = false,
    className,
    ...props
}: GradientButtonProps) => {
    return (
        <Button
            className={`
        ${className ?? ""}
        h-12 text-base text-white font-medium cursor-pointer
        bg-brandaction hover:bg-brandaction-hover
        transition-all duration-300 rounded-md shadow-lg
        active:scale-[0.98] border-none
      `}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? "Signing in..." : children}
        </Button>
    );
};
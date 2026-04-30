import { ShineBorder } from "@/shared/components/ui/shimmer-border-card";
import type { BUSINESS_TYPES } from "../constants";
import { Card, CardContent } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";

export function BusinessCard({
  item,
  selected,
  onClick,
}: {
  item: (typeof BUSINESS_TYPES)[0];
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className="w-full text-left focus:outline-none"
    >
      <ShineBorder
        gradient={item.gradient}
        className={cn(
          "transition-all duration-300 rounded-2xl",
          selected && "scale-[1.02]"
        )}
      >
        <Card
          className={cn(
            "rounded-2xl border bg-card/80 backdrop-blur-sm",
            "transition-all duration-300",
            "hover:shadow-md hover:-translate-y-0.5",
            item.bg,
            selected ? item.border : "border-border"
          )}
        >
          <CardContent className="flex items-start gap-4 p-6">
            {/* Icon */}
            {/* <div
              className={cn(
                "size-11 flex items-center justify-center rounded-lg bg-background",
                item.iconColor
              )}
            > */}
              <Icon className={cn(
                "size-20 flex items-center justify-center ",
                item.iconColor
              )} />
            {/* </div> */}

            {/* Text */}
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </ShineBorder>
    </button>
  );
}
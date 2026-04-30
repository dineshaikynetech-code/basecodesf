import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import Lottie from 'lottie-react';


interface EmptyPageProps {
  title?: string;
  description?: string;
  animationData: any;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyPage({
  title = "Nothing here yet",
  description = "This section is ready for content. Check back later or create something new.",
  animationData,
  actionLabel,
  onAction,
  className,
}: EmptyPageProps) {
  if (!animationData) {
    console.error("Lottie animationData missing");
    return null;
  }

  console.log(animationData,"chekcing...")
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-16 px-6 text-center",
      className
    )}>

      <div className="w-72 h-72 mb-8">
        {/* <Lottie options={defaultOptions}
          height={400}
          width={400} /> */}
      </div>

      {/* Content */}
      <div className="max-w-md">
        <h3 className="text-2xl font-semibold tracking-tight mb-3 text-foreground">
          {title}
        </h3>

        <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
          {description}
        </p>

        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            size="lg"
            className="rounded-3xl px-8"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { cn } from '@/shared/lib/utils';

interface FeatureSectionProps {
    category: string;
    title: string;
    description: string;
    image: string;
    isReversed?: boolean;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
    category,
    title,
    description,
    image,
    isReversed = false
}) => {
    return (
        <div className={cn(
            "flex flex-col items-center gap-8 md:gap-20 lg:gap-32",
            isReversed ? "md:flex-row-reverse" : "md:flex-row"
        )}>
            {/* Content Area */}
            <div className="flex-1 space-y-3 md:space-y-4 text-center md:text-left">
                <span className="ext-xs md:text-sm font-bold tracking-[0.15em] text-[#34C759] uppercase">
                    {category}
                </span>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827]">
                    {title}
                </h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                    {description}
                </p>
            </div>

            {/* Image Area */}
            <div className="flex-1 w-full flex justify-center items-center">
                {/* <img 
          src={image} 
          alt={title} 
          className="w-full max-w-[280px] md:max-w-md h-auto object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105" 
        /> */}
            </div>
        </div>
    );
};

export default FeatureSection;
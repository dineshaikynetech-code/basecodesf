// src/shared/components/ui/AppSelect.tsx
// (Place this in your shared UI components folder for app-wide reuse)

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface AppSelectProps {
  /** Controlled value (parent manages this) */
  value: string;
  /** Callback when selection changes (parent handles all logic) */
  onValueChange: (value: string) => void;
  /** Array of options — fully flexible for any dropdown use case */
  options: SelectOption[];
  /** Optional placeholder when nothing is selected */
  placeholder?: string;
  /** Optional Lucide/React icon shown before the value (e.g. Languages) */
  icon?: React.ReactNode;
  /** Additional classes for the trigger (override width, height, etc. when needed) */
  className?: string;
}

export function AppSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Select an option',
  icon,
  className = '',
}: AppSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={`
          w-[172px] h-9 
          bg-card border border-border 
          hover:border-border/80 
          focus:border-primary/30 focus:ring-1 focus:ring-primary/20 
          rounded-2xl 
          text-caption font-medium shadow-sm 
          transition-all
          ${className}
        `.trim()}
      >
        {icon}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="min-w-[172px] rounded-2xl">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className={
              option.disabled
                ? 'cursor-not-allowed opacity-60'
                : 'cursor-pointer'
            }
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
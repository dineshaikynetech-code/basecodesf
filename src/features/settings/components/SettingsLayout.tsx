import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';

interface SettingsLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-8", className)}>
      {/* Common Header - Settings + Deactivate */}
      <div className="flex items-center justify-between pb-2 border-b border-border mb-4">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        
        <Button
          variant="ghost"
          className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 font-medium px-4"
        >
          Deactivate your account
        </Button>
      </div>

      {/* Page Content */}
      {children}
    </div>
  );
};
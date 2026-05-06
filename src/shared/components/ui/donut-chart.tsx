import React, { memo } from 'react';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from '@/shared/lib/utils';

interface DonutChartProps {
  data: Array<{ 
    name: string; 
    value: number; 
    fill: string;     // ← Use 'fill' directly in data
  }>;
  centerText?: string;
  centerSubtext?: string;
  className?: string;
}

export const DonutChart = memo<DonutChartProps>(({
  data,
  centerText = "77.8%",
  centerSubtext = "Positive",
  className
}) => {
  return (
    <div className={cn("relative w-full h-[260px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={72}
            outerRadius={92}
            dataKey="value"
            paddingAngle={3}
            // No Cell children needed anymore
          >
            {/* Colors are now handled via fill in data */}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              padding: '8px 12px',
            }}
            wrapperStyle={{
              zIndex: 100,
            }}
            allowEscapeViewBox={{ x: true, y: true }}   // Allows tooltip to go outside chart
            position={{ y: -20 }}                      // Helps position tooltip above
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-4xl font-bold text-foreground tracking-tighter">{centerText}</div>
        <div className="text-sm text-muted-foreground mt-1">{centerSubtext}</div>
      </div>
    </div>
  );
});
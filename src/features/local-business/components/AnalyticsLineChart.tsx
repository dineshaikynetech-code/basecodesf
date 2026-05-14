import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface AnalyticsLineChartProps {
  data: any[];
  dataKey: string;
  label: string;
}

export const AnalyticsLineChart = ({ data, dataKey, label }: AnalyticsLineChartProps) => {
  // We use a custom dot to match the white-bordered blue circle in the screenshot
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    // Only show the dot for the last data point to match the "0" state UI
    if (props.index === data.length - 1) {
      return (
        <svg x={cx - 6} y={cy - 6} width={100} height={40} className="overflow-visible">
          <circle cx="6" cy="6" r="5" fill="#1a73e8" stroke="white" strokeWidth="2" />
          <text x="16" y="2" className="text-[11px] font-bold fill-slate-700">{label}</text>
          <text x="16" y="14" className="text-[11px] font-bold fill-slate-900">{payload[dataKey]}</text>
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="h-[220px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 90, left: 0, bottom: 0 }}>
          <CartesianGrid 
            vertical={false} 
            stroke="#f1f5f9" // Matches the light gray lines in image_e25155.png
          />
          <XAxis dataKey="name" hide />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            domain={[-0.04, 0.04]}
            ticks={[-0.04, -0.02, 0, 0.02, 0.04]}
          />
          <Tooltip cursor={false} content={() => null} />
          
          {/* This creates the distinct blue line specifically for the 0 axis */}
          <ReferenceLine y={0} stroke="#4285f4" strokeWidth={1.5} />
          
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#4285f4"
            strokeWidth={2}
            dot={<CustomDot />}
            activeDot={false}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
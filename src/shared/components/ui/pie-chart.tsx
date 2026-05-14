import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
interface ChartData {
    label: string;
    value: number;
    color: string;
}
export const ReusablePieChart = ({ data }: { data: ChartData[] }) => {
    return (
        <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={80}
                        paddingAngle={0}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};
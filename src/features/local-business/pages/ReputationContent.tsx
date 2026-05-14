import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select';
import { DonutChart } from '@/shared/components/ui/donut-chart';
import { LocalBusinessPageWrapper } from '@/shared/layouts/LocalBusinessPageWrapper';
import { withModuleTabs } from '../components/withLocationTabs';
import { LOCATION_TABS } from '@/config/routeConfig';

const reviewComparison = [
    { label: "New Reviews", value: "24", emoji: "🤩", bgColor: "bg-amber-100", change: "No change compared to last 30 days" },
    { label: "Postive Reviews", value: "09", emoji: "😊", bgColor: "bg-emerald-100", change: "No change compared to last 30 days" },
    { label: "Negative Reviews", value: "02", emoji: "☹️", bgColor: "bg-rose-100", change: "No change compared to last 30 days" },
    { label: "Neutral Reviews", value: "13", emoji: "😐", bgColor: "bg-orange-100", change: "No change compared to last 30 days" },
];

const sentimentData = [
  { name: "Positive", value: 14, fill: "#22c55e" },
  { name: "Negative", value: 3,  fill: "#ef4444" },
  { name: "Neutral",  value: 1,  fill: "#eab308" },
];

const ReputationContent: React.FC = () => {
    return (
        <LocalBusinessPageWrapper>
            <div className="space-y-6">
                {/* Header */}
                <div className='space-y-8 bg-slate-50/50 p-6 rounded-sm'>
                    <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 ">
                        <div>
                            <h2 className="text-h3 font-semibold text-foreground">Review comparison</h2>
                        </div>
                        <Select defaultValue="30">
                            <SelectTrigger className="w-40 rounded-md">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent className="w-40 rounded-md">
                                <SelectItem value="30">30 days</SelectItem>
                                <SelectItem value="60">60 days</SelectItem>
                                <SelectItem value="90">90 days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>


                    {/* Review Comparison Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reviewComparison.map((item, idx) => (
                            <Card key={idx} className="border-border hover:shadow-lg shadow transition-all rounded-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">

                                        <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center text-xl`}>
                                            {item.emoji}
                                        </div>
                                        <span className="text-lg text-muted-foreground">{item.label}</span>

                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-5xl font-bold text-foreground">{item.value}</div>
                                        <p className="text-caption text-muted-foreground">{item.change}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sentiment Summary */}
                    <Card className="border-border shadow-sm rounded-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Sentiment Summary</CardTitle>
                            <p className="text-caption text-muted-foreground">The summary of customers emotional tone</p>
                        </CardHeader>
                        <CardContent>
                            <DonutChart
                                data={sentimentData}
                                centerText="77.8%"
                                centerSubtext="Positive"
                            />
                            <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
                                {sentimentData.map((item, i) => (
                                    <div key={i} className="flex justify-center items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }} />
                                        <span className="text-muted-foreground">{item.name}</span>
                                        <span className="font-medium">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Average Response Time */}
                    <Card className="border-none shadow-sm rounded-sm">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg font-bold">Average response time</CardTitle>
                            <p className="text-caption text-muted-foreground font-normal">How quickly you are responding to reviews</p>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center py-10 space-y-8">
                            <div className="flex gap-3">
                                {[
                                    { value: "223", unit: "Days" },
                                    { value: "04", unit: "Hrs" },
                                    { value: "08", unit: "Min" },
                                    { value: "20", unit: "Sec" },
                                ].map((item, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center w-16 h-20 border border-slate-200 rounded-lg bg-white shadow-sm">
                                        <div className="text-xl font-bold text-foreground">{item.value}</div>
                                        <div className="text-caption text-muted-foreground font-medium">{item.unit}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center space-y-2">
                                <div className="font-bold text-foreground">Slow!</div>
                                <p className="text-caption text-muted-foreground max-w-[240px]">
                                    Your response time to reviews is excessively slow.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </LocalBusinessPageWrapper>
    );
};



export default withModuleTabs({
  WrappedComponent: ReputationContent,
  tabs: LOCATION_TABS,
  moduleKey: "location-hub",
  defaultTab: "reputation",
});
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import {
  MoreVertical,
  PieChart as PieIcon,
  List,
  TrendingUp
} from "lucide-react";
import { withModuleTabs } from '../components/withLocationTabs';
import { motion } from 'framer-motion';
import { ReusablePieChart } from '@/shared/components/ui/pie-chart';
import { AnalyticsLineChart } from '../components/AnalyticsLineChart';
import { LOCATION_TABS } from '@/config/routeConfig';

// --- Mock Data ---
const impressionsData = [
  { label: "From Desktop Map", value: 34, color: "#2563eb" },
  { label: "From Desktop Search", value: 25, color: "#f59e0b" },
  { label: "From Mobile Map", value: 61, color: "#a855f7" },
  { label: "From Mobile Search", value: 52, color: "#2dd4bf" },
];

const keywordData = [
  { keyword: "akshaya hq detaile address", impressions: 15 },
  { keyword: "akshaya hq, padur, tamil nadu", impressions: 15 },
  { keyword: "akshaya padur", impressions: 15 },
  { keyword: "akshaya sammancheri", impressions: 15 },
];

const phoneCallData = [
  { name: 'Mon', calls: 0 },
  { name: 'Tue', calls: 0 },
  { name: 'Wed', calls: 0 },
  { name: 'Thu', calls: 0 },
  { name: 'Fri', calls: 0 },
  { name: 'Sat', calls: 0 },
  { name: 'Sun', calls: 0 },
];
const websiteClickData = [
  { name: 'Mon', clicks: 0 },
  { name: 'Tue', clicks: 0 },
  { name: 'Wed', clicks: 0 },
  { name: 'Thu', clicks: 0 },
  { name: 'Fri', clicks: 0 },
  { name: 'Sat', clicks: 0 },
  { name: 'Sun', clicks: 0 },
];




const AnalyticsCard = ({
  title,
  subtitle,
  totalValue,
  totalLabel,
  filterValue,
  displayType,
  children
}: any) => (
  <Card className="border-none shadow-sm rounded-xl bg-white overflow-hidden">
    <CardHeader className="flex flex-row items-start justify-between p-5 pb-2">
      <div className="space-y-0.5">
        <h3 className="text-[15px] font-semibold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
      </div>
      <MoreVertical className="w-4 h-4 text-slate-300 cursor-pointer" />
    </CardHeader>
    <CardContent className="p-5 pt-0">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-50 pb-4">
        {/* Timeframe Selector */}
        <Select defaultValue={filterValue}>
          <SelectTrigger className="w-fit h-auto p-0 border-none shadow-none text-xs text-slate-500 font-semibold focus:ring-0 gap-1 bg-transparent">
            <span className="text-slate-400 font-normal">Showing for</span>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="last-quarter">Last Quarter</SelectItem>
            <SelectItem value="last-week">Last Week</SelectItem>
          </SelectContent>
        </Select>

        {/* Aggregate Value */}
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-slate-800">{totalValue}</span>
          <span className="text-[11px] font-semibold text-slate-400">{totalLabel}</span>
        </div>

        {/* Display Type Selector */}
        <Select defaultValue={displayType}>
          <SelectTrigger className="w-fit h-8 px-2 border rounded-md text-xs text-slate-500 font-medium gap-1.5 hover:bg-slate-50 transition-colors">
            {displayType === 'pie' && <PieIcon className="w-3.5 h-3.5" />}
            {displayType === 'list' && <List className="w-3.5 h-3.5" />}
            {displayType === 'line' && <TrendingUp className="w-3.5 h-3.5" />}
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">Pie</SelectItem>
            <SelectItem value="list">List</SelectItem>
            <SelectItem value="line">Line</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {children}
    </CardContent>
  </Card>
);

export const AnalyticsContent = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 md:p-6 bg-[#f9fafb] min-h-screen">

      {/* 1. Impressions Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <AnalyticsCard
          title="Impressions"
          subtitle="Location Impressions"
          totalValue="172"
          totalLabel="Impressions"
          filterValue="last-month"
          displayType="pie"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-1/2">
              <ReusablePieChart data={impressionsData} />
            </div>
            <div className="w-full sm:w-1/2 space-y-2.5">
              {impressionsData.map((item, i) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] font-medium text-slate-500">{item.label}</span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-700">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </AnalyticsCard>
      </motion.div>

      {/* 2. Search Keywords Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <AnalyticsCard
          title="Search Keywords Impressions"
          subtitle="How customers search for your business"
          totalValue="150"
          totalLabel="Keyword Impressions"
          filterValue="last-quarter"
          displayType="list"
        >
          <div className="border border-slate-100 rounded-lg overflow-hidden">
            <table className="w-full text-[11px]">
              <thead className="bg-white border-b border-slate-100">
                <tr className="text-slate-400">
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Keyword</th>
                  <th className="px-4 py-3 text-right font-semibold uppercase tracking-wider">No.of Impressions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {keywordData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#f8faff]" : "bg-white"}>
                    <td className="px-4 py-3.5 text-slate-700 font-medium">{row.keyword}</td>
                    <td className="px-4 py-3.5 text-right font-bold text-slate-900">{row.impressions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnalyticsCard>
      </motion.div>

      {/* 3. Phone Calls Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <AnalyticsCard
          title="Phone calls"
          subtitle="When and how many times customers call your business"
          totalValue="0"
          totalLabel="Calls"
          filterValue="last-week"
          displayType="line"
        >
          <AnalyticsLineChart
            data={phoneCallData}
            dataKey="calls"
            label="Call Clicks"
          />
        </AnalyticsCard>
      </motion.div>

      {/* 4. Website Clicks Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <AnalyticsCard
          title="Website Clicks"
          subtitle="When and how many times customers clicked website link of your business"
          totalValue="0"
          totalLabel="Website Clicks"
          filterValue="last-month"
          displayType="line"
        >
          <AnalyticsLineChart
            data={websiteClickData}
            dataKey="clicks"
            label="Website Clicks"
          />
        </AnalyticsCard>
      </motion.div>

    </div>
  );
};

export default withModuleTabs({
  WrappedComponent: AnalyticsContent,
  tabs: LOCATION_TABS,
  moduleKey: "location-hub",
  defaultTab: "analytics",
});
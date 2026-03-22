import { 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Download, TrendingUp, Users, Calendar, Filter, Activity } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const patientData = [
  { name: 'Jan', patients: 2100, admissions: 400, discharges: 380 },
  { name: 'Feb', patients: 2356, admissions: 450, discharges: 410 },
  { name: 'Mar', patients: 2847, admissions: 520, discharges: 480 },
  { name: 'Apr', patients: 2600, admissions: 480, discharges: 500 },
  { name: 'May', patients: 2900, admissions: 550, discharges: 510 },
  { name: 'Jun', patients: 3200, admissions: 600, discharges: 550 },
];

const deptData = [
  { name: 'Cardiology', count: 120, color: '#06b6d4' },
  { name: 'Pulmonology', count: 98, color: '#3b82f6' },
  { name: 'Neurology', count: 82, color: '#8b5cf6' },
  { name: 'Surgery', count: 145, color: '#ef4444' },
  { name: 'Orthopedics', count: 64, color: '#f59e0b' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-xl">
        <p className="text-xs font-bold text-zinc-100 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <p className="text-[11px] text-zinc-400 capitalize">
              {entry.name}: <span className="text-zinc-100 font-semibold">{entry.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AnalyticsPage() {
  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-50 tracking-tight">System Analytics</h1>
          <p className="text-sm text-zinc-500 mt-1">Deep insights into patient flow and department performance.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
             This Month
           </Button>
           <Button variant="secondary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
             Export JSON
           </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <Card className="!p-4 bg-zinc-900/40 border-zinc-800/60">
            <div className="flex items-center justify-between">
               <p className="text-xs font-medium text-zinc-500">Average Stay</p>
               <TrendingUp className="w-3.5 h-3.5 text-success" />
            </div>
            <p className="text-xl font-bold text-zinc-100 mt-1">4.2 Days</p>
            <p className="text-[10px] text-success mt-1 font-medium">↑ 12% vs last month</p>
         </Card>
         <Card className="!p-4 bg-zinc-900/40 border-zinc-800/60">
            <div className="flex items-center justify-between">
               <p className="text-xs font-medium text-zinc-500">Emergency Ratio</p>
               <Activity className="w-3.5 h-3.5 text-danger" />
            </div>
            <p className="text-xl font-bold text-zinc-100 mt-1">24.8%</p>
            <p className="text-[10px] text-danger mt-1 font-medium">↓ 2.1% improvement</p>
         </Card>
         <Card className="!p-4 bg-zinc-900/40 border-zinc-800/60">
            <div className="flex items-center justify-between">
               <p className="text-xs font-medium text-zinc-500">Peak Load Hour</p>
               <Calendar className="w-3.5 h-3.5 text-primary-500" />
            </div>
            <p className="text-xl font-bold text-zinc-100 mt-1">11:00 AM</p>
            <p className="text-[10px] text-zinc-500 mt-1 font-medium">Tuesday usually busier</p>
         </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Patient Volume Trend */}
        <Card className="flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-500" />
              Patient Volume Trend
            </h2>
            <Badge variant="info">Real-time Data</Badge>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#52525b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                <Area
                  name="Total Patients"
                  type="monotone"
                  dataKey="patients"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPatients)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Admissions vs Discharges */}
        <Card className="flex flex-col">
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-info" />
               Admissions vs Discharges
             </h2>
           </div>
           <div className="h-[350px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={patientData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                 <XAxis 
                   dataKey="name" 
                   stroke="#52525b" 
                   fontSize={11} 
                   tickLine={false} 
                   axisLine={false} 
                   dy={10}
                 />
                 <YAxis 
                   stroke="#52525b" 
                   fontSize={11} 
                   tickLine={false} 
                   axisLine={false}
                 />
                 <Tooltip content={<CustomTooltip />} />
                 <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                 <Line 
                    name="Admissions"
                    type="monotone" 
                    dataKey="admissions" 
                    stroke="#06b6d4" 
                    strokeWidth={2} 
                    dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                 />
                 <Line 
                    name="Discharges"
                    type="monotone" 
                    dataKey="discharges" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </Card>

        {/* Department Resource Allocation */}
        <Card className="xl:col-span-2 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-danger" />
              Department Patient Load
            </h2>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} layout="vertical" margin={{ top: 0, right: 30, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#d4d4d8" 
                  fontSize={12} 
                  width={100} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

import { memo } from 'react';
import {
  Users,
  UserCheck,
  DollarSign,
  TrendingUp,
  Activity,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const kpiData = [
  {
    title: 'Total Patients',
    value: '2,847',
    change: 12.5,
    icon: Users,
    color: 'text-primary-500',
    bg: 'bg-primary-500/10',
  },
  {
    title: 'Active Cases',
    value: '384',
    change: -3.2,
    icon: UserCheck,
    color: 'text-info',
    bg: 'bg-info/10',
  },
  {
    title: 'Revenue',
    value: '$48.2K',
    change: 8.1,
    icon: DollarSign,
    color: 'text-warning',
    bg: 'bg-warning/10',
  },
  {
    title: 'Satisfaction',
    value: '94.2%',
    change: 2.4,
    icon: TrendingUp,
    color: 'text-success',
    bg: 'bg-success/10',
  },
];

const recentActivities = [
  { id: 1, text: 'New patient Sarah Johnson admitted to Pulmonology', time: '2 hours ago', icon: Activity },
  { id: 2, text: 'Lab results for Michael Chen updated', time: '4 hours ago', icon: Activity },
  { id: 3, text: 'Dr. Patel scheduled surgery for Robert Kumar', time: '6 hours ago', icon: Calendar },
  { id: 4, text: 'Emily Watson discharged from Surgery ward', time: '8 hours ago', icon: UserCheck },
];

const KPICard = memo(function KPICard({
  item,
}: {
  item: (typeof kpiData)[0];
}) {
  const Icon = item.icon;
  const isPositive = item.change >= 0;

  return (
    <Card
      hoverable
      className="group !p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${item.color}`} />
        </div>
        <Badge variant={isPositive ? 'success' : 'danger'} className="gap-1">
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {Math.abs(item.change)}%
        </Badge>
      </div>
      <div>
        <p className="text-2xl font-bold text-zinc-50 tracking-tight">{item.value}</p>
        <p className="text-xs font-medium text-zinc-500 mt-0.5">{item.title}</p>
      </div>
    </Card>
  );
});

export function DashboardPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-50 tracking-tight">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Real-time overview of your facility performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" size="sm">Download Report</Button>
           <Button size="icon" variant="ghost">
             <MoreVertical className="w-4 h-4" />
           </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((item) => (
          <KPICard key={item.title} item={item} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="xl:col-span-2 !p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-zinc-800/40 flex items-center justify-between">
            <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary-500" />
              Facility Activity
            </h2>
            <Button variant="ghost" size="sm" className="text-zinc-500 text-xs">View all</Button>
          </div>
          <div className="divide-y divide-zinc-800/20">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-5 hover:bg-zinc-800/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 mt-0.5 border border-zinc-800">
                  <activity.icon className="w-4 h-4 text-zinc-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-zinc-200 font-medium">
                    {activity.text}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1.5 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                    {activity.time}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="w-8 h-8 opacity-0 group-hover:opacity-100">
                   <MoreVertical className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Department Health */}
        <Card className="flex flex-col !p-0 overflow-hidden">
          <div className="p-6 border-b border-zinc-800/40">
            <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" />
              Department Load
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {[
              { name: 'Cardiology', load: 85, color: 'bg-danger/80' },
              { name: 'Pulmonology', load: 62, color: 'bg-primary-500/80' },
              { name: 'Neurology', load: 38, color: 'bg-success/80' },
              { name: 'Orthopedics', load: 48, color: 'bg-warning/80' },
              { name: 'Surgery', load: 93, color: 'bg-danger' },
            ].map((dept) => (
              <div key={dept.name}>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2">
                  <span className="text-zinc-400">{dept.name}</span>
                  <span className={dept.load > 85 ? 'text-danger' : 'text-zinc-300'}>
                    {dept.load}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${dept.color} transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(255,255,255,0.05)]`}
                    style={{ width: `${dept.load}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto p-4 bg-zinc-900/40 border-t border-zinc-800/40">
             <Button variant="outline" className="w-full text-xs !h-8 border-zinc-800">
               Manage Capacities
             </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

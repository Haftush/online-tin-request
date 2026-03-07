import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, FileText, Clock, CheckCircle2, XCircle, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { month: "Sep", applications: 12 },
  { month: "Oct", applications: 19 },
  { month: "Nov", applications: 15 },
  { month: "Dec", applications: 22 },
  { month: "Jan", applications: 28 },
  { month: "Feb", applications: 18 },
];

const pieData = [
  { name: "Approved", value: 42, color: "hsl(142, 71%, 45%)" },
  { name: "Pending", value: 8, color: "hsl(44, 95%, 58%)" },
  { name: "Rejected", value: 5, color: "hsl(0, 72%, 51%)" },
];

const recentActivity = [
  { action: "Approved", ref: "MOR-NR-2026-00130", time: "2 hours ago", icon: CheckCircle2, color: "text-success" },
  { action: "Submitted", ref: "MOR-NR-2026-00142", time: "5 hours ago", icon: FileText, color: "text-primary" },
  { action: "Rejected", ref: "MOR-NR-2026-00125", time: "1 day ago", icon: XCircle, color: "text-destructive" },
  { action: "Submitted", ref: "MOR-NR-2026-00138", time: "2 days ago", icon: FileText, color: "text-primary" },
];

export default function BODashboardPage() {
  const stats = [
    { label: "Total Applications", value: "55", change: "+12%", icon: FileText, gradient: "gradient-primary" },
    { label: "Pending Review", value: "8", change: "-3", icon: Clock, gradient: "gradient-gold" },
    { label: "Approved", value: "42", change: "+5", icon: CheckCircle2, gradient: "bg-success" },
    { label: "Registered Taxpayers", value: "42", change: "+5", icon: Users, gradient: "gradient-primary" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.gradient}`}>
                <s.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-success">
                <ArrowUpRight className="h-3 w-3" /> {s.change}
              </span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-bold text-foreground">Monthly Applications</h3>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
              <YAxis axisLine={false} tickLine={false} className="text-xs" />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid hsl(210, 20%, 90%)", fontSize: 12 }}
              />
              <Bar dataKey="applications" fill="hsl(207, 97%, 38%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card p-5 shadow-card"
        >
          <h3 className="font-display text-base font-bold text-foreground mb-4">Status Breakdown</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {pieData.map((d, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                {d.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl border border-border bg-card p-5 shadow-card"
      >
        <h3 className="font-display text-base font-bold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted/50 transition-colors">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-muted ${a.color}`}>
                <a.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{a.action} — <span className="text-primary">{a.ref}</span></p>
                <p className="text-xs text-muted-foreground">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

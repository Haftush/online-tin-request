import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, FileBarChart, Calendar, TrendingUp, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

const revenueData = [
  { month: "Sep", revenue: 120000 },
  { month: "Oct", revenue: 185000 },
  { month: "Nov", revenue: 150000 },
  { month: "Dec", revenue: 220000 },
  { month: "Jan", revenue: 310000 },
  { month: "Feb", revenue: 260000 },
];

const reports = [
  { title: "Monthly Registration Summary", desc: "Overview of all applications processed this month", icon: Calendar, date: "Feb 2026" },
  { title: "Tax Revenue Forecast", desc: "Projected DST and VAT collections from registered entities", icon: TrendingUp, date: "Q1 2026" },
  { title: "Compliance Status Report", desc: "Filing and payment status of registered non-residents", icon: DollarSign, date: "Feb 2026" },
  { title: "Document Verification Audit", desc: "Audit trail of document reviews and verifications", icon: FileBarChart, date: "Feb 2026" },
];

export default function BOReportsPage() {
  return (
    <div className="space-y-6">
      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-border bg-card p-5 shadow-card"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-base font-bold text-foreground">Estimated Tax Revenue (ETB)</h3>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => toast.success("Report downloaded!")}>
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(207, 97%, 38%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(207, 97%, 38%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" axisLine={false} tickLine={false} className="text-xs" />
            <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
            <Tooltip contentStyle={{ borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`ETB ${v.toLocaleString()}`, "Revenue"]} />
            <Area type="monotone" dataKey="revenue" stroke="hsl(207, 97%, 38%)" fill="url(#revGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Available Reports */}
      <div>
        <h3 className="font-display text-base font-bold text-foreground mb-4">Available Reports</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {reports.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow group cursor-pointer"
              onClick={() => toast.success(`Generating ${r.title}...`)}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-gold group-hover:scale-110 transition-transform">
                  <r.icon className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-display text-sm font-bold text-foreground mb-1">{r.title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.desc}</p>
                  <p className="text-[10px] text-muted-foreground mt-2 font-semibold uppercase tracking-wider">{r.date}</p>
                </div>
                <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

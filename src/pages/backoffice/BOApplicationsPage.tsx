import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2, XCircle, Clock, Search, Eye, FileText, ChevronRight, Copy
} from "lucide-react";
import { toast } from "sonner";

type AppStatus = "pending" | "approved" | "rejected";

interface MockApp {
  id: string;
  ref: string;
  business: string;
  country: string;
  submitted: string;
  status: AppStatus;
  tin?: string;
  comment?: string;
}

const INITIAL_APPS: MockApp[] = [
  { id: "1", ref: "MOR-NR-2026-00142", business: "ACME DIGITAL SERVICES LTD", country: "United States", submitted: "2026-02-28", status: "pending" },
  { id: "2", ref: "MOR-NR-2026-00138", business: "TECHSTREAM GLOBAL INC", country: "United Kingdom", submitted: "2026-02-25", status: "pending" },
  { id: "3", ref: "MOR-NR-2026-00130", business: "CLOUDPAY SOLUTIONS GMBH", country: "Germany", submitted: "2026-02-20", status: "approved", tin: "TIN-NR-ET-0003" },
  { id: "4", ref: "MOR-NR-2026-00125", business: "DIGIMART ASIA PTE LTD", country: "Japan", submitted: "2026-02-18", status: "rejected", comment: "Incomplete incorporation certificate." },
  { id: "5", ref: "MOR-NR-2026-00119", business: "STREAMFLIX INTERNATIONAL", country: "Canada", submitted: "2026-02-15", status: "approved", tin: "TIN-NR-ET-0001" },
];

const statusConfig: Record<AppStatus, { label: string; icon: any; className: string }> = {
  pending: { label: "Pending", icon: Clock, className: "bg-secondary/20 text-secondary-foreground" },
  approved: { label: "Approved", icon: CheckCircle2, className: "bg-success/15 text-success" },
  rejected: { label: "Rejected", icon: XCircle, className: "bg-destructive/15 text-destructive" },
};

export default function BOApplicationsPage() {
  const [apps, setApps] = useState<MockApp[]>(INITIAL_APPS);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [filter, setFilter] = useState<AppStatus | "all">("all");
  const [search, setSearch] = useState("");

  const selectedApp = apps.find(a => a.id === selectedAppId) || null;

  const filtered = apps.filter(a => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search && !a.business.toLowerCase().includes(search.toLowerCase()) && !a.ref.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleApprove = (appId: string, comment: string) => {
    const tin = `TIN-NR-ET-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setApps(prev => prev.map(a => a.id === appId ? { ...a, status: "approved" as AppStatus, tin, comment: comment || undefined } : a));
    setSelectedAppId(null);
    toast.success(`Application approved! TIN: ${tin}`);
  };

  const handleReject = (appId: string, comment: string) => {
    if (!comment.trim()) { toast.error("Please add comments before rejecting."); return; }
    setApps(prev => prev.map(a => a.id === appId ? { ...a, status: "rejected" as AppStatus, comment } : a));
    setSelectedAppId(null);
    toast.success("Application rejected.");
  };

  if (selectedApp) {
    return <AppDetail app={selectedApp} onBack={() => setSelectedAppId(null)} onApprove={handleApprove} onReject={handleReject} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or reference..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "approved", "rejected"] as const).map(f => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize">
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="hidden md:grid grid-cols-[1fr_1fr_120px_120px_100px_40px] gap-4 px-5 py-3 border-b border-border bg-muted/50 text-xs font-semibold font-display text-muted-foreground uppercase tracking-wider">
          <span>Reference</span><span>Business Name</span><span>Country</span><span>Date</span><span>Status</span><span></span>
        </div>
        {filtered.map((app, i) => {
          const sc = statusConfig[app.status];
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_120px_100px_40px] gap-2 md:gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-accent/30 transition-colors cursor-pointer"
              onClick={() => setSelectedAppId(app.id)}
            >
              <div>
                <p className="text-sm font-bold font-display text-foreground">{app.ref}</p>
                <p className="md:hidden text-xs text-muted-foreground">{app.business}</p>
              </div>
              <p className="hidden md:block text-sm text-foreground truncate">{app.business}</p>
              <p className="hidden md:block text-sm text-muted-foreground">{app.country}</p>
              <p className="hidden md:block text-sm text-muted-foreground">{app.submitted}</p>
              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold w-fit ${sc.className}`}>
                <sc.icon className="h-3 w-3" /> {sc.label}
              </span>
              <div className="hidden md:flex justify-end">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="p-10 text-center text-muted-foreground text-sm">No applications found.</div>
        )}
      </div>
    </div>
  );
}

function AppDetail({ app, onBack, onApprove, onReject }: { app: any; onBack: () => void; onApprove: (id: string, c: string) => void; onReject: (id: string, c: string) => void }) {
  const [comment, setComment] = useState("");
  const sc = statusConfig[app.status as AppStatus];

  return (
    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
      <Button variant="ghost" onClick={onBack} className="mb-4 gap-2 text-muted-foreground">← Back to List</Button>
      <div className="rounded-xl border border-border bg-card p-5 md:p-8 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <p className="font-display text-xl font-bold text-foreground">{app.business}</p>
            <p className="text-sm text-primary font-medium">{app.ref}</p>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${sc.className}`}>
            <sc.icon className="h-3.5 w-3.5" /> {sc.label}
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[{ label: "Country", value: app.country }, { label: "Submitted", value: app.submitted }, { label: "ID", value: app.id }].map((item, i) => (
            <div key={i} className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-sm font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        {app.status === "approved" && app.tin && (
          <div className="mb-6 rounded-lg border-2 border-success/30 bg-success/5 p-5">
            <p className="text-xs text-success font-semibold mb-1">Generated TIN</p>
            <div className="flex items-center gap-3">
              <p className="font-display text-xl font-bold text-success">{app.tin}</p>
              <button onClick={() => { navigator.clipboard.writeText(app.tin!); toast.success("TIN copied!"); }} className="text-success/60 hover:text-success"><Copy className="h-4 w-4" /></button>
            </div>
          </div>
        )}

        {app.status === "rejected" && app.comment && (
          <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-5">
            <p className="text-xs text-destructive font-semibold mb-1">Rejection Reason</p>
            <p className="text-sm text-foreground">{app.comment}</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-display text-base font-bold text-foreground mb-3">Documents</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {["Memorandum of Association", "TIN Certificate", "Certificate of Incorporation", "GM Appointment Letter"].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <FileText className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{doc}</p>
                  <p className="text-xs text-muted-foreground">PDF • 2.4 MB</p>
                </div>
                <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>

        {app.status === "pending" && (
          <div className="border-t border-border pt-6">
            <h3 className="font-display text-base font-bold text-foreground mb-3">Officer Action</h3>
            <Textarea placeholder="Add comments..." rows={3} value={comment} onChange={e => setComment(e.target.value)} className="mb-4" />
            <div className="flex gap-3 flex-wrap">
              <Button variant="hero" className="gap-2" onClick={() => onApprove(app.id, comment)}>
                <CheckCircle2 className="h-4 w-4" /> Approve & Generate TIN
              </Button>
              <Button variant="destructive" className="gap-2" onClick={() => onReject(app.id, comment)}>
                <XCircle className="h-4 w-4" /> Reject
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

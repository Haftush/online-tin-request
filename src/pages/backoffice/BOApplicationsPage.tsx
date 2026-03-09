import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2, XCircle, Clock, Search, Eye, FileText, ChevronRight, Copy, Bell, BellDot, MailOpen, Mail
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
  isNew?: boolean;
}

const INITIAL_APPS: MockApp[] = [
  { id: "1", ref: "MOR-NR-2026-00142", business: "ACME DIGITAL SERVICES LTD", country: "United States", submitted: "2026-03-09", status: "pending", isNew: true },
  { id: "2", ref: "MOR-NR-2026-00138", business: "TECHSTREAM GLOBAL INC", country: "United Kingdom", submitted: "2026-03-08", status: "pending", isNew: true },
  { id: "6", ref: "MOR-NR-2026-00145", business: "NILETECH SOLUTIONS PLC", country: "Ethiopia", submitted: "2026-03-09", status: "pending", isNew: true },
  { id: "3", ref: "MOR-NR-2026-00130", business: "CLOUDPAY SOLUTIONS GMBH", country: "Germany", submitted: "2026-02-20", status: "approved", tin: "TIN-NR-ET-0003" },
  { id: "4", ref: "MOR-NR-2026-00125", business: "DIGIMART ASIA PTE LTD", country: "Japan", submitted: "2026-02-18", status: "rejected", comment: "Incomplete incorporation certificate." },
  { id: "5", ref: "MOR-NR-2026-00119", business: "STREAMFLIX INTERNATIONAL", country: "Canada", submitted: "2026-02-15", status: "approved", tin: "TIN-NR-ET-0001" },
];

const statusConfig: Record<AppStatus, { label: string; icon: any; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pending", icon: Clock, variant: "secondary" },
  approved: { label: "Approved", icon: CheckCircle2, variant: "default" },
  rejected: { label: "Rejected", icon: XCircle, variant: "destructive" },
};

export default function BOApplicationsPage() {
  const [apps, setApps] = useState<MockApp[]>(INITIAL_APPS);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [filter, setFilter] = useState<AppStatus | "all">("all");
  const [search, setSearch] = useState("");

  const selectedApp = apps.find(a => a.id === selectedAppId) || null;
  const newCount = apps.filter(a => a.isNew).length;

  const filtered = apps.filter(a => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search && !a.business.toLowerCase().includes(search.toLowerCase()) && !a.ref.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const markAsRead = (appId: string) => {
    setApps(prev => prev.map(a => a.id === appId ? { ...a, isNew: false } : a));
  };

  const markAllRead = () => {
    setApps(prev => prev.map(a => ({ ...a, isNew: false })));
    toast.success("All marked as read");
  };

  const handleApprove = (appId: string, comment: string) => {
    const tin = `TIN-NR-ET-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setApps(prev => prev.map(a => a.id === appId ? { ...a, status: "approved" as AppStatus, tin, comment: comment || undefined, isNew: false } : a));
    setSelectedAppId(null);
    toast.success(`Application approved! TIN: ${tin}`);
  };

  const handleReject = (appId: string, comment: string) => {
    if (!comment.trim()) { toast.error("Please add comments before rejecting."); return; }
    setApps(prev => prev.map(a => a.id === appId ? { ...a, status: "rejected" as AppStatus, comment, isNew: false } : a));
    setSelectedAppId(null);
    toast.success("Application rejected.");
  };

  const openApp = (app: MockApp) => {
    markAsRead(app.id);
    setSelectedAppId(app.id);
  };

  if (selectedApp) {
    return <AppDetail app={selectedApp} onBack={() => setSelectedAppId(null)} onApprove={handleApprove} onReject={handleReject} />;
  }

  return (
    <div className="space-y-5">
      {/* Notification banner */}
      <AnimatePresence>
        {newCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <BellDot className="h-4.5 w-4.5 text-primary animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  {newCount} new application{newCount > 1 ? "s" : ""} received
                </p>
                <p className="text-xs text-muted-foreground">Requires your review and action</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1.5 text-xs shrink-0">
              <MailOpen className="h-3.5 w-3.5" /> Mark all read
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or reference..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "pending", "approved", "rejected"] as const).map(f => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize gap-1.5">
              {f === "pending" && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" /></span>}
              {f}
              {f === "pending" && <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1 text-[10px]">{apps.filter(a => a.status === "pending").length}</Badge>}
            </Button>
          ))}
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="grid grid-cols-[32px_1.2fr_1fr_100px_100px_90px_36px] gap-3 px-5 py-3 border-b border-border bg-muted/50 text-xs font-semibold font-display text-muted-foreground uppercase tracking-wider">
          <span></span><span>Reference</span><span>Business</span><span>Country</span><span>Date</span><span>Status</span><span></span>
        </div>
        {filtered.map((app, i) => {
          const sc = statusConfig[app.status];
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className={`grid grid-cols-[32px_1.2fr_1fr_100px_100px_90px_36px] gap-3 px-5 py-3.5 border-b border-border last:border-0 hover:bg-accent/30 transition-colors cursor-pointer items-center ${app.isNew ? "bg-primary/[0.03]" : ""}`}
              onClick={() => openApp(app)}
            >
              <div className="flex justify-center">
                {app.isNew ? <Mail className="h-4 w-4 text-primary" /> : <MailOpen className="h-4 w-4 text-muted-foreground/40" />}
              </div>
              <div>
                <p className={`text-sm font-display ${app.isNew ? "font-bold text-foreground" : "font-medium text-foreground/80"}`}>{app.ref}</p>
              </div>
              <p className={`text-sm truncate ${app.isNew ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{app.business}</p>
              <p className="text-sm text-muted-foreground">{app.country}</p>
              <p className="text-sm text-muted-foreground">{app.submitted}</p>
              <Badge variant={sc.variant} className="text-[10px] gap-1 w-fit">
                <sc.icon className="h-3 w-3" /> {sc.label}
              </Badge>
              <div className="flex justify-end">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="p-10 text-center text-muted-foreground text-sm">No applications found.</div>
        )}
      </div>

      {/* Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map((app, i) => {
          const sc = statusConfig[app.status];
          return (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`rounded-xl border border-border bg-card p-4 shadow-card cursor-pointer active:scale-[0.98] transition-all ${app.isNew ? "border-primary/30 bg-primary/[0.02]" : ""}`}
              onClick={() => openApp(app)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {app.isNew && <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />}
                  <p className={`text-sm font-display ${app.isNew ? "font-bold" : "font-medium"} text-foreground`}>{app.ref}</p>
                </div>
                <Badge variant={sc.variant} className="text-[10px] gap-1">
                  <sc.icon className="h-3 w-3" /> {sc.label}
                </Badge>
              </div>
              <p className="text-sm text-foreground mb-1 truncate">{app.business}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{app.country}</span>
                <span>{app.submitted}</span>
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground text-sm">No applications found.</div>
        )}
      </div>
    </div>
  );
}

function AppDetail({ app, onBack, onApprove, onReject }: { app: MockApp; onBack: () => void; onApprove: (id: string, c: string) => void; onReject: (id: string, c: string) => void }) {
  const [comment, setComment] = useState("");
  const sc = statusConfig[app.status];

  return (
    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
      <Button variant="ghost" onClick={onBack} className="mb-4 gap-2 text-muted-foreground">← Back to List</Button>
      <div className="rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
          <div>
            <p className="font-display text-lg sm:text-xl font-bold text-foreground">{app.business}</p>
            <p className="text-sm text-primary font-medium">{app.ref}</p>
          </div>
          <Badge variant={sc.variant} className="gap-1.5 text-xs w-fit">
            <sc.icon className="h-3.5 w-3.5" /> {sc.label}
          </Badge>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {[{ label: "Country", value: app.country }, { label: "Submitted", value: app.submitted }, { label: "ID", value: app.id }].map((item, i) => (
            <div key={i} className="rounded-lg bg-muted/50 p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-xs sm:text-sm font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        {app.status === "approved" && app.tin && (
          <div className="mb-6 rounded-lg border-2 border-primary/30 bg-primary/5 p-4 sm:p-5">
            <p className="text-xs text-primary font-semibold mb-1">Generated TIN</p>
            <div className="flex items-center gap-3">
              <p className="font-display text-lg sm:text-xl font-bold text-primary">{app.tin}</p>
              <button onClick={() => { navigator.clipboard.writeText(app.tin!); toast.success("TIN copied!"); }} className="text-primary/60 hover:text-primary"><Copy className="h-4 w-4" /></button>
            </div>
          </div>
        )}

        {app.status === "rejected" && app.comment && (
          <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-4 sm:p-5">
            <p className="text-xs text-destructive font-semibold mb-1">Rejection Reason</p>
            <p className="text-sm text-foreground">{app.comment}</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground mb-3">Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {["Memorandum of Association", "TIN Certificate", "Certificate of Incorporation", "GM Appointment Letter"].map((doc, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-3">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">{doc}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">PDF • 2.4 MB</p>
                </div>
                <Button variant="ghost" size="sm" className="shrink-0"><Eye className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </div>

        {app.status === "pending" && (
          <div className="border-t border-border pt-5">
            <h3 className="font-display text-sm sm:text-base font-bold text-foreground mb-3">Officer Action</h3>
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

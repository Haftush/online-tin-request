import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield, LayoutDashboard, FileText, CheckCircle2, XCircle, Clock,
  Search, Eye, LogOut, Users, BarChart3, ChevronRight, Menu, X, Copy
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
  pending: { label: "Pending Review", icon: Clock, className: "bg-secondary/20 text-secondary-foreground" },
  approved: { label: "Approved", icon: CheckCircle2, className: "bg-success/15 text-success" },
  rejected: { label: "Rejected", icon: XCircle, className: "bg-destructive/15 text-destructive" },
};

export default function BackofficePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [apps, setApps] = useState<MockApp[]>(INITIAL_APPS);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [filter, setFilter] = useState<AppStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not logged in as officer
  if (!user || user.role !== "officer") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary-foreground/50 mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-primary-foreground mb-2">Access Restricted</h1>
          <p className="text-sm text-primary-foreground/60 mb-6">You must sign in as a registration officer.</p>
          <Link to="/login?role=officer">
            <Button variant="gold">Officer Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const selectedApp = apps.find(a => a.id === selectedAppId) || null;

  const filtered = apps.filter(a => {
    if (filter !== "all" && a.status !== filter) return false;
    if (search && !a.business.toLowerCase().includes(search.toLowerCase()) && !a.ref.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: apps.length,
    pending: apps.filter(a => a.status === "pending").length,
    approved: apps.filter(a => a.status === "approved").length,
    rejected: apps.filter(a => a.status === "rejected").length,
  };

  const handleApprove = (appId: string, comment: string) => {
    const tin = `TIN-NR-ET-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setApps(prev => prev.map(a => a.id === appId ? { ...a, status: "approved" as AppStatus, tin, comment: comment || undefined } : a));
    setSelectedAppId(null);
    toast.success(`Application approved! TIN Generated: ${tin}`);
  };

  const handleReject = (appId: string, comment: string) => {
    if (!comment.trim()) {
      toast.error("Please add comments before rejecting.");
      return;
    }
    setApps(prev => prev.map(a => a.id === appId ? { ...a, status: "rejected" as AppStatus, comment } : a));
    setSelectedAppId(null);
    toast.success("Application rejected with comments.");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 gradient-hero border-r border-sidebar-border transform transition-transform duration-200 lg:relative lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-gold">
              <Shield className="h-4 w-4 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-sidebar-foreground">MOR Backoffice</p>
              <p className="text-[10px] text-sidebar-foreground/60">Registration Review</p>
            </div>
          </div>
          <button className="lg:hidden text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {[
            { icon: LayoutDashboard, label: "Dashboard", active: true },
            { icon: FileText, label: "Applications" },
            { icon: Users, label: "Taxpayers" },
            { icon: BarChart3, label: "Reports" },
          ].map((item, i) => (
            <button
              key={i}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-display text-lg font-bold text-foreground">Registration Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full bg-accent px-3 py-1.5">
              <div className="h-6 w-6 rounded-full gradient-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">RO</div>
              <span className="text-xs font-medium text-foreground">{user.name}</span>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total", value: stats.total, color: "gradient-primary" },
              { label: "Pending", value: stats.pending, color: "gradient-gold" },
              { label: "Approved", value: stats.approved, color: "bg-success" },
              { label: "Rejected", value: stats.rejected, color: "bg-destructive" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <p className="text-xs text-muted-foreground font-medium mb-1">{s.label}</p>
                <div className="flex items-end justify-between">
                  <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
                  <div className={`h-8 w-8 rounded-lg ${s.color} opacity-80`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or reference..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-2">
              {(["all", "pending", "approved", "rejected"] as const).map(f => (
                <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize">
                  {f}
                </Button>
              ))}
            </div>
          </div>

          {/* List or Detail */}
          {!selectedApp ? (
            <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
              <div className="hidden md:grid grid-cols-[1fr_1fr_120px_120px_120px_50px] gap-4 px-5 py-3 border-b border-border bg-muted/50 text-xs font-semibold font-display text-muted-foreground uppercase tracking-wider">
                <span>Reference</span><span>Business Name</span><span>Country</span><span>Submitted</span><span>Status</span><span></span>
              </div>
              {filtered.map((app, i) => {
                const sc = statusConfig[app.status];
                return (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px_120px_120px_50px] gap-2 md:gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-accent/30 transition-colors cursor-pointer"
                    onClick={() => setSelectedAppId(app.id)}
                  >
                    <div>
                      <p className="text-sm font-bold font-display text-primary md:text-foreground">{app.ref}</p>
                      <p className="md:hidden text-xs text-muted-foreground">{app.business}</p>
                    </div>
                    <p className="hidden md:block text-sm text-foreground">{app.business}</p>
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
          ) : (
            <AppDetail app={selectedApp} onBack={() => setSelectedAppId(null)} onApprove={handleApprove} onReject={handleReject} />
          )}
        </div>
      </main>
    </div>
  );
}

function AppDetail({ app, onBack, onApprove, onReject }: { app: MockApp; onBack: () => void; onApprove: (id: string, comment: string) => void; onReject: (id: string, comment: string) => void }) {
  const [comment, setComment] = useState("");
  const sc = statusConfig[app.status];

  return (
    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
      <Button variant="ghost" onClick={onBack} className="mb-4 gap-2 text-muted-foreground">
        ← Back to List
      </Button>
      <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-card">
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
          {[
            { label: "Country", value: app.country },
            { label: "Submitted", value: app.submitted },
            { label: "Application ID", value: app.id },
          ].map((item, i) => (
            <div key={i} className="rounded-lg bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-sm font-semibold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        {/* TIN display for approved */}
        {app.status === "approved" && app.tin && (
          <div className="mb-6 rounded-lg border-2 border-success/30 bg-success/5 p-5">
            <p className="text-xs text-success font-semibold mb-1">Generated TIN Number</p>
            <div className="flex items-center gap-3">
              <p className="font-display text-xl font-bold text-success">{app.tin}</p>
              <button
                onClick={() => { navigator.clipboard.writeText(app.tin!); toast.success("TIN copied!"); }}
                className="text-success/60 hover:text-success transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Rejection comment */}
        {app.status === "rejected" && app.comment && (
          <div className="mb-6 rounded-lg border border-destructive/20 bg-destructive/5 p-5">
            <p className="text-xs text-destructive font-semibold mb-1">Rejection Reason</p>
            <p className="text-sm text-foreground">{app.comment}</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-display text-base font-bold text-foreground mb-3">Uploaded Documents</h3>
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
            <Textarea
              placeholder="Add comments or remarks..."
              rows={3}
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="mb-4"
            />
            <div className="flex gap-3">
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

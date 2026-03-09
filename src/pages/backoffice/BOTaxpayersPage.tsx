import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Copy, ChevronLeft, ChevronRight, ArrowUpDown, Building2, Globe } from "lucide-react";
import { toast } from "sonner";

const TAXPAYERS = [
  { id: "1", tin: "TIN-NR-ET-0003", business: "CLOUDPAY SOLUTIONS GMBH", country: "Germany", registered: "2026-02-20", status: "Active", sector: "Fintech" },
  { id: "2", tin: "TIN-NR-ET-0001", business: "STREAMFLIX INTERNATIONAL", country: "Canada", registered: "2026-02-15", status: "Active", sector: "Entertainment" },
  { id: "3", tin: "TIN-NR-ET-0005", business: "PAYGATE AFRICA LTD", country: "South Africa", registered: "2026-01-10", status: "Active", sector: "Payments" },
  { id: "4", tin: "TIN-NR-ET-0002", business: "EDUTECH GLOBAL INC", country: "India", registered: "2025-12-20", status: "Suspended", sector: "Education" },
  { id: "5", tin: "TIN-NR-ET-0006", business: "GREENLOGIX SOLUTIONS", country: "Kenya", registered: "2025-11-05", status: "Active", sector: "Logistics" },
  { id: "6", tin: "TIN-NR-ET-0007", business: "AFRIMED HEALTH CORP", country: "Nigeria", registered: "2025-10-12", status: "Active", sector: "Healthcare" },
  { id: "7", tin: "TIN-NR-ET-0008", business: "SOLARWAVE ENERGY PLC", country: "UAE", registered: "2025-09-28", status: "Suspended", sector: "Energy" },
  { id: "8", tin: "TIN-NR-ET-0009", business: "DATAPRIME ANALYTICS", country: "United States", registered: "2025-08-15", status: "Active", sector: "Technology" },
];

const PAGE_SIZE = 5;

type SortKey = "business" | "country" | "registered" | "status";

export default function BOTaxpayersPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("registered");
  const [sortAsc, setSortAsc] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Suspended">("all");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const filtered = TAXPAYERS
    .filter(t => {
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      if (!search) return true;
      const q = search.toLowerCase();
      return t.business.toLowerCase().includes(q) || t.tin.toLowerCase().includes(q) || t.country.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      const cmp = av.localeCompare(bv);
      return sortAsc ? cmp : -cmp;
    });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortHeader = ({ label, col }: { label: string; col: SortKey }) => (
    <button onClick={() => handleSort(col)} className="flex items-center gap-1 text-xs font-semibold font-display text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors">
      {label}
      <ArrowUpDown className={`h-3 w-3 ${sortKey === col ? "text-primary" : "text-muted-foreground/40"}`} />
    </button>
  );

  return (
    <div className="space-y-5">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">Total Taxpayers</p>
          <p className="text-lg sm:text-xl font-bold font-display text-foreground">{TAXPAYERS.length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 sm:p-4">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">Active</p>
          <p className="text-lg sm:text-xl font-bold font-display text-primary">{TAXPAYERS.filter(t => t.status === "Active").length}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 sm:p-4 col-span-2 sm:col-span-1">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5">Suspended</p>
          <p className="text-lg sm:text-xl font-bold font-display text-destructive">{TAXPAYERS.filter(t => t.status === "Suspended").length}</p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name, TIN, or country..." className="pl-9" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        <div className="flex gap-2">
          {(["all", "Active", "Suspended"] as const).map(f => (
            <Button key={f} variant={statusFilter === f ? "default" : "outline"} size="sm" onClick={() => { setStatusFilter(f); setPage(1); }} className="capitalize text-xs">
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* Unified responsive table for all devices */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left"><SortHeader label="Business" col="business" /></th>
                <th className="px-4 py-3 text-left text-xs font-semibold font-display text-muted-foreground uppercase tracking-wider">TIN</th>
                <th className="px-4 py-3 text-left"><SortHeader label="Country" col="country" /></th>
                <th className="px-4 py-3 text-left text-xs font-semibold font-display text-muted-foreground uppercase tracking-wider">Sector</th>
                <th className="px-4 py-3 text-left"><SortHeader label="Registered" col="registered" /></th>
                <th className="px-4 py-3 text-left"><SortHeader label="Status" col="status" /></th>
                <th className="px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((tp, i) => (
                <motion.tr
                  key={tp.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-semibold text-foreground">{tp.business}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => { navigator.clipboard.writeText(tp.tin); toast.success("TIN copied!"); }} className="flex items-center gap-1.5 font-mono text-primary hover:underline">
                      {tp.tin} <Copy className="h-3 w-3 text-primary/50" />
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Globe className="h-3 w-3" /> {tp.country}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{tp.sector}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{tp.registered}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant={tp.status === "Active" ? "default" : "destructive"} className="text-[10px]">{tp.status}</Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button onClick={() => { navigator.clipboard.writeText(tp.tin); toast.success("TIN copied!"); }} className="text-muted-foreground hover:text-foreground transition-colors" title="Copy TIN">
                      <Copy className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {paginated.length === 0 && (
            <div className="p-10 text-center text-muted-foreground text-sm">No taxpayers found.</div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)} className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i} variant={page === i + 1 ? "default" : "outline"} size="sm" onClick={() => setPage(i + 1)} className="h-8 w-8 p-0 text-xs">
                {i + 1}
              </Button>
            ))}
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="h-8 w-8 p-0">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

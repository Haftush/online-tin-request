import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Building2, Globe, Copy } from "lucide-react";
import { toast } from "sonner";

const TAXPAYERS = [
  { id: "1", tin: "TIN-NR-ET-0003", business: "CLOUDPAY SOLUTIONS GMBH", country: "Germany", registered: "2026-02-20", status: "Active" },
  { id: "2", tin: "TIN-NR-ET-0001", business: "STREAMFLIX INTERNATIONAL", country: "Canada", registered: "2026-02-15", status: "Active" },
  { id: "3", tin: "TIN-NR-ET-0005", business: "PAYGATE AFRICA LTD", country: "South Africa", registered: "2026-01-10", status: "Active" },
  { id: "4", tin: "TIN-NR-ET-0002", business: "EDUTECH GLOBAL INC", country: "India", registered: "2025-12-20", status: "Suspended" },
];

export default function BOTaxpayersPage() {
  const [search, setSearch] = useState("");

  const filtered = TAXPAYERS.filter(t =>
    !search || t.business.toLowerCase().includes(search.toLowerCase()) || t.tin.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search by name or TIN..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((tp, i) => (
          <motion.div
            key={tp.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border border-border bg-card p-5 shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                  <Building2 className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-foreground">{tp.business}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <Globe className="h-3 w-3" /> {tp.country}
                  </div>
                </div>
              </div>
              <Badge variant={tp.status === "Active" ? "default" : "destructive"} className="text-[10px]">
                {tp.status}
              </Badge>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">TIN Number</p>
                <p className="font-display text-sm font-bold text-primary">{tp.tin}</p>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(tp.tin); toast.success("TIN copied!"); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Registered: {tp.registered}</p>
          </motion.div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">No taxpayers found.</div>
      )}
    </div>
  );
}

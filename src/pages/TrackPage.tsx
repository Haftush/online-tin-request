import { useState } from "react";
import { motion } from "framer-motion";
import { ClientHeader } from "@/components/ClientHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Clock, CheckCircle2, XCircle, FileText } from "lucide-react";

const MOCK_RESULT = {
  ref: "MOR-NR-2026-00142",
  status: "under_review" as const,
  business: "ACME DIGITAL SERVICES LTD",
  submitted: "2026-02-28",
  steps: [
    { label: "Application Submitted", date: "Feb 28, 2026", done: true },
    { label: "Under Officer Review", date: "In Progress", done: false },
    { label: "Approval / TIN Issuance", date: "Pending", done: false },
  ],
};

export default function TrackPage() {
  const [ref, setRef] = useState("");
  const [result, setResult] = useState<typeof MOCK_RESULT | null>(null);

  const handleSearch = () => {
    if (ref.trim()) setResult(MOCK_RESULT);
  };

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />
      <div className="container max-w-2xl py-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Track Your Application</h1>
          <p className="text-muted-foreground mb-8">Enter your application reference number to check status.</p>

          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="e.g. MOR-NR-2026-00142"
                className="uppercase"
                value={ref}
                onChange={e => setRef(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button variant="hero" onClick={handleSearch} className="gap-2">
              <Search className="h-4 w-4" /> Search
            </Button>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Reference</p>
                  <p className="font-display text-lg font-bold text-primary">{result.ref}</p>
                  <p className="text-sm text-foreground mt-1">{result.business}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold font-display text-secondary-foreground">
                  <Clock className="h-3 w-3" /> Under Review
                </span>
              </div>

              <div className="space-y-4">
                {result.steps.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${s.done ? 'gradient-primary' : 'bg-muted'}`}>
                      {s.done ? <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" /> : <span className="text-[10px] font-bold text-muted-foreground">{i + 1}</span>}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${s.done ? 'text-foreground' : 'text-muted-foreground'}`}>{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

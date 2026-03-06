import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup } from "./FieldGroup";
import { CheckCircle2, Building2, Users, FileText, AlertCircle } from "lucide-react";

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between py-1.5 text-sm border-b border-border/50 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}

export function StepReview({ formData, update }: any) {
  const docsUploaded = ["memo", "tinCert", "incorporation", "gmLetter"].filter(k => formData.documents[k]).length;
  const totalOwnership = formData.owners.reduce((sum: number, o: any) => sum + (parseFloat(o.percentage) || 0), 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-accent/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold font-display text-muted-foreground uppercase">Business</span>
          </div>
          <ReviewRow label="Legal Name" value={formData.legalName} />
          <ReviewRow label="Country" value={formData.country} />
          <ReviewRow label="TIN" value={formData.foreignTin} />
          <ReviewRow label="Contact" value={`${formData.contactFirstName} ${formData.contactLastName}`} />
        </div>
        <div className="rounded-lg border border-border bg-accent/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold font-display text-muted-foreground uppercase">Ownership</span>
          </div>
          <ReviewRow label="Owners" value={`${formData.owners.length}`} />
          <ReviewRow label="Total %" value={`${totalOwnership}%`} />
          <ReviewRow label="Bank Accounts" value={`${formData.localBanks.length}`} />
          {totalOwnership !== 100 && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-warning">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Ownership must total 100%</span>
            </div>
          )}
        </div>
        <div className="rounded-lg border border-border bg-accent/20 p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold font-display text-muted-foreground uppercase">Documents</span>
          </div>
          <ReviewRow label="Uploaded" value={`${docsUploaded} / 4`} />
          <ReviewRow label="Year End" value={formData.financialYearEnd || "—"} />
          <ReviewRow label="DST" value="Yes" />
          <ReviewRow label="VAT" value={formData.vatOnForeignSupplies ? "Yes" : "No"} />
          {docsUploaded < 4 && (
            <div className="flex items-center gap-1.5 mt-2 text-xs text-warning">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>All 4 documents required</span>
            </div>
          )}
        </div>
      </div>

      {/* Certifier */}
      <div className="grid md:grid-cols-2 gap-4">
        <FieldGroup label="Full Name (Certifying Person)" required>
          <Input placeholder="Full name" className="uppercase" value={formData.certifierName} onChange={e => update("certifierName", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="Position / Title" required>
          <Input placeholder="Position" className="uppercase" value={formData.certifierPosition} onChange={e => update("certifierPosition", e.target.value.toUpperCase())} />
        </FieldGroup>
      </div>

      {/* Declaration */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={formData.certified}
            onCheckedChange={v => update("certified", v)}
            className="mt-0.5"
          />
          <div>
            <p className="text-sm font-bold font-display text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary" /> Declaration
            </p>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              I certify that the information provided is true, complete, and correct. I understand that providing false information may result in penalties under Ethiopian tax law.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

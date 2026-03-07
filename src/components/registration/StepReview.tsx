import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup } from "./FieldGroup";
import { CheckCircle2, Building2, Users, FileText, AlertCircle, Calendar } from "lucide-react";

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between py-1 sm:py-1.5 text-xs sm:text-sm border-b border-border/50 last:border-0 gap-2">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-foreground text-right truncate">{value}</span>
    </div>
  );
}

export function StepReview({ formData, update }: any) {
  const requiredDocKeys = ["memo", "tinCert", "incorporation", "gmLetter", "passport"];
  const docsUploaded = requiredDocKeys.filter(k => formData.documents[k]).length;
  const totalOwnership = formData.owners.reduce((sum: number, o: any) => sum + (parseFloat(o.percentage) || 0), 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="rounded-lg border border-border bg-accent/20 p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-[10px] sm:text-xs font-bold font-display text-muted-foreground uppercase">Business</span>
          </div>
          <ReviewRow label="Legal Name" value={formData.legalName} />
          <ReviewRow label="Country" value={formData.country} />
          <ReviewRow label="TIN" value={formData.foreignTin} />
          <ReviewRow label="Type" value={formData.businessType || "—"} />
          <ReviewRow label="Website" value={formData.website} />
          <ReviewRow label="Contact" value={`${formData.contactFirstName} ${formData.contactLastName}`} />
          <ReviewRow label="Email" value={formData.contactEmail} />
          <ReviewRow label="Phone" value={formData.contactPhone} />
        </div>
        <div className="rounded-lg border border-border bg-accent/20 p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-[10px] sm:text-xs font-bold font-display text-muted-foreground uppercase">Ownership & Bank</span>
          </div>
          <ReviewRow label="Owners" value={`${formData.owners.length}`} />
          <ReviewRow label="Total %" value={`${totalOwnership}%`} />
          <ReviewRow label="Bank Accounts" value={`${formData.localBanks.length}`} />
          {formData.localBanks[0]?.bank && <ReviewRow label="Primary Bank" value={formData.localBanks[0].bank} />}
          {totalOwnership !== 100 && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px] sm:text-xs text-warning">
              <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Ownership must total 100%</span>
            </div>
          )}
        </div>
        <div className="rounded-lg border border-border bg-accent/20 p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            <span className="text-[10px] sm:text-xs font-bold font-display text-muted-foreground uppercase">Tax & Documents</span>
          </div>
          <ReviewRow label="Uploaded" value={`${docsUploaded} / ${requiredDocKeys.length} required`} />
          <ReviewRow label="ESIC" value={formData.esicCode || "—"} />
          <ReviewRow label="Year End" value={formData.financialYearEnd || "—"} />
          <ReviewRow label="DST" value="Yes (mandatory)" />
          <ReviewRow label="VAT" value={formData.vatOnForeignSupplies ? "Yes" : "No"} />
          <ReviewRow label="WHT" value={formData.withholdingTax ? "Yes" : "No"} />
          {docsUploaded < requiredDocKeys.length && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px] sm:text-xs text-warning">
              <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>All {requiredDocKeys.length} required documents needed</span>
            </div>
          )}
        </div>
      </div>

      {/* Certifier */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FieldGroup label="Full Name (Certifying Person)" required>
          <Input placeholder="Full name" className="uppercase" value={formData.certifierName} onChange={e => update("certifierName", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="Position / Title" required>
          <Input placeholder="Position" className="uppercase" value={formData.certifierPosition} onChange={e => update("certifierPosition", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="Date" required>
          <Input type="date" value={formData.certifierDate || ""} onChange={e => update("certifierDate", e.target.value)} />
        </FieldGroup>
      </div>

      {/* Declaration */}
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 sm:p-5">
        <div className="flex items-start gap-2 sm:gap-3">
          <Checkbox
            checked={formData.certified}
            onCheckedChange={v => update("certified", v)}
            className="mt-0.5"
          />
          <div>
            <p className="text-xs sm:text-sm font-bold font-display text-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" /> Declaration
            </p>
            <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 leading-relaxed">
              I hereby certify that all information provided in this application is true, complete, and correct to the best of my knowledge. I understand that providing false or misleading information may result in penalties under Ethiopian tax law, including but not limited to fines, rejection of registration, or prosecution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

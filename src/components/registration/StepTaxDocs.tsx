import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldGroup } from "./FieldGroup";
import { FileText, Upload, CheckCircle2, Briefcase } from "lucide-react";

const DOCS = [
  { key: "memo", label: "Memorandum of Association" },
  { key: "tinCert", label: "TIN Certificate (foreign jurisdiction)" },
  { key: "incorporation", label: "Certificate of Incorporation" },
  { key: "gmLetter", label: "GM Appointment Letter & Personal TIN" },
];

export function StepTaxDocs({ formData, update }: any) {
  const uploadedCount = DOCS.filter(d => formData.documents[d.key]).length;

  return (
    <div className="space-y-8">
      {/* Activity */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Briefcase className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display text-base font-bold text-foreground">Business Activity</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <FieldGroup label="Description of Digital Services" required hint="Describe the services you provide to Ethiopian customers">
              <Textarea
                rows={3}
                placeholder="e.g. Online streaming platform providing video content..."
                className="uppercase text-sm"
                value={formData.activityDescription}
                onChange={e => update("activityDescription", e.target.value.toUpperCase())}
              />
            </FieldGroup>
          </div>
          <FieldGroup label="ESIC Code" hint="Ethiopian Standard Industrial Classification">
            <Select>
              <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="J">J - Information & Communication</SelectItem>
                <SelectItem value="K">K - Financial & Insurance</SelectItem>
                <SelectItem value="M">M - Professional & Technical</SelectItem>
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup label="Financial Year End" required>
            <Select value={formData.financialYearEnd} onValueChange={v => update("financialYearEnd", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="jul7">July 7 (Ethiopian calendar)</SelectItem>
                <SelectItem value="dec31">December 31 (Gregorian)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FieldGroup>
        </div>
      </div>

      {/* Tax Obligations */}
      <div className="rounded-lg border border-border bg-accent/30 p-4">
        <p className="text-sm font-bold font-display text-foreground mb-3">Tax Obligations</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Checkbox checked={formData.digitalServicesTax} disabled />
            <Label className="text-sm">Digital Services Tax <span className="text-xs text-muted-foreground">(mandatory)</span></Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={formData.vatOnForeignSupplies} onCheckedChange={v => update("vatOnForeignSupplies", v)} />
            <Label className="text-sm">VAT on Foreign Supplies</Label>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-foreground">Documents</h3>
              <p className="text-xs text-muted-foreground">PDF, JPEG, or PNG (max 10MB)</p>
            </div>
          </div>
          <div className={`text-xs font-bold font-display px-2.5 py-1 rounded-full ${uploadedCount === DOCS.length ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
            {uploadedCount}/{DOCS.length}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {DOCS.map(d => {
            const uploaded = !!formData.documents[d.key];
            return (
              <label key={d.key} className="cursor-pointer group">
                <input
                  type="file"
                  accept=".pdf,.jpeg,.jpg,.png"
                  className="hidden"
                  onChange={e => {
                    const file = e.target.files?.[0] || null;
                    update("documents", { ...formData.documents, [d.key]: file });
                  }}
                />
                <div className={`flex items-center gap-3 rounded-lg border p-3.5 transition-all ${uploaded ? 'border-success/40 bg-success/5' : 'border-border bg-card hover:border-primary/30 hover:bg-accent/30'}`}>
                  {uploaded ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
                  ) : (
                    <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{d.label} <span className="text-destructive">*</span></p>
                    {uploaded && (
                      <p className="text-xs text-success truncate">{formData.documents[d.key].name}</p>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

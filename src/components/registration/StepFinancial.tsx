import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "./FieldGroup";
import { Users, Landmark, Plus, Trash2 } from "lucide-react";

const COUNTRIES = ["United States", "United Kingdom", "China", "India", "Germany", "France", "Japan", "Canada", "Australia", "South Korea", "Brazil", "Kenya", "Nigeria", "South Africa", "UAE", "Other"];

export function StepFinancial({ formData, update }: any) {
  const addOwner = () => {
    update("owners", [...formData.owners, { tin: "", country: "", lastName: "", otherNames: "", percentage: "", type: "" }]);
  };
  const removeOwner = (i: number) => {
    if (formData.owners.length > 1) update("owners", formData.owners.filter((_: any, idx: number) => idx !== i));
  };
  const updateOwner = (i: number, field: string, value: string) => {
    const updated = [...formData.owners];
    updated[i] = { ...updated[i], [field]: value };
    update("owners", updated);
  };

  const addBank = () => {
    update("localBanks", [...formData.localBanks, { name: "", number: "", bank: "", branch: "", currency: "ETB" }]);
  };
  const updateBank = (i: number, field: string, value: string) => {
    const updated = [...formData.localBanks];
    updated[i] = { ...updated[i], [field]: value };
    update("localBanks", updated);
  };

  const totalOwnership = formData.owners.reduce((sum: number, o: any) => sum + (parseFloat(o.percentage) || 0), 0);

  return (
    <div className="space-y-8">
      {/* Ownership */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-foreground">Ownership</h3>
              <p className="text-xs text-muted-foreground">Must total 100%</p>
            </div>
          </div>
          <div className={`text-sm font-bold font-display px-3 py-1 rounded-full ${totalOwnership === 100 ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
            {totalOwnership}%
          </div>
        </div>

        <div className="space-y-3">
          {formData.owners.map((owner: any, i: number) => (
            <div key={i} className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold font-display text-muted-foreground uppercase tracking-wider">Owner {i + 1}</span>
                {formData.owners.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeOwner(i)} className="h-7 w-7 p-0">
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <FieldGroup label="Last Name" required>
                  <Input placeholder="Last name" className="uppercase h-9 text-sm" value={owner.lastName} onChange={e => updateOwner(i, "lastName", e.target.value.toUpperCase())} />
                </FieldGroup>
                <FieldGroup label="Other Names">
                  <Input placeholder="Other names" className="uppercase h-9 text-sm" value={owner.otherNames} onChange={e => updateOwner(i, "otherNames", e.target.value.toUpperCase())} />
                </FieldGroup>
                <FieldGroup label="Country" required>
                  <Select value={owner.country} onValueChange={v => updateOwner(i, "country", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Country" /></SelectTrigger>
                    <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="TIN">
                  <Input placeholder="TIN" className="uppercase h-9 text-sm" value={owner.tin} onChange={e => updateOwner(i, "tin", e.target.value.toUpperCase())} />
                </FieldGroup>
                <FieldGroup label="Ownership %" required>
                  <Input type="number" placeholder="%" min="0" max="100" className="h-9 text-sm" value={owner.percentage} onChange={e => updateOwner(i, "percentage", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Type">
                  <Select value={owner.type} onValueChange={v => updateOwner(i, "type", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Shareholder">Shareholder</SelectItem>
                      <SelectItem value="Partner">Partner</SelectItem>
                      <SelectItem value="Director">Director</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={addOwner} className="gap-1.5 mt-3">
          <Plus className="h-3.5 w-3.5" /> Add Owner
        </Button>
      </div>

      {/* Bank Details */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Landmark className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display text-base font-bold text-foreground">Bank Account</h3>
        </div>

        <div className="space-y-3">
          {formData.localBanks.map((bank: any, i: number) => (
            <div key={i} className="rounded-lg border border-border bg-muted/20 p-4">
              <span className="text-xs font-bold font-display text-muted-foreground uppercase tracking-wider mb-3 block">Account {i + 1}</span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <FieldGroup label="Account Name" required>
                  <Input placeholder="Account name" className="uppercase h-9 text-sm" value={bank.name} onChange={e => updateBank(i, "name", e.target.value.toUpperCase())} />
                </FieldGroup>
                <FieldGroup label="Account Number" required>
                  <Input placeholder="Account number" className="h-9 text-sm" value={bank.number} onChange={e => updateBank(i, "number", e.target.value)} />
                </FieldGroup>
                <FieldGroup label="Bank Name" required>
                  <Input placeholder="Bank name" className="uppercase h-9 text-sm" value={bank.bank} onChange={e => updateBank(i, "bank", e.target.value.toUpperCase())} />
                </FieldGroup>
                <FieldGroup label="Branch">
                  <Input placeholder="Branch" className="uppercase h-9 text-sm" value={bank.branch} onChange={e => updateBank(i, "branch", e.target.value.toUpperCase())} />
                </FieldGroup>
                <FieldGroup label="Currency" required>
                  <Select value={bank.currency} onValueChange={v => updateBank(i, "currency", v)}>
                    <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETB">ETB</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={addBank} className="gap-1.5 mt-3">
          <Plus className="h-3.5 w-3.5" /> Add Account
        </Button>
      </div>
    </div>
  );
}

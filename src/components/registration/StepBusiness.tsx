import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FieldGroup } from "./FieldGroup";
import { Building2, User, Globe } from "lucide-react";

const COUNTRIES = ["United States", "United Kingdom", "China", "India", "Germany", "France", "Japan", "Canada", "Australia", "South Korea", "Brazil", "Kenya", "Nigeria", "South Africa", "UAE", "Other"];

export function StepBusiness({ formData, update }: any) {
  return (
    <div className="space-y-8">
      {/* Business Identity */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display text-base font-bold text-foreground">Business Identity</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldGroup label="Foreign Jurisdiction / Country" required hint="The country where your business is legally registered">
            <Select value={formData.country} onValueChange={v => update("country", v)}>
              <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
              <SelectContent>
                {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup label="TIN / Identifier" required hint="Your tax identification number in your home country">
            <Input placeholder="e.g. 12-3456789" className="uppercase" value={formData.foreignTin} onChange={e => update("foreignTin", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Legal Name" required>
            <Input placeholder="Legal business name" className="uppercase" value={formData.legalName} onChange={e => update("legalName", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Trading Name" hint="Leave blank if same as legal name">
            <Input placeholder="Trading name (optional)" className="uppercase" value={formData.tradingName} onChange={e => update("tradingName", e.target.value.toUpperCase())} />
          </FieldGroup>
        </div>
      </div>

      {/* Address */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display text-base font-bold text-foreground">Business Address & Website</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldGroup label="Address" required>
            <Input placeholder="Street address" className="uppercase" value={formData.addressLine1} onChange={e => update("addressLine1", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="City" required>
            <Input placeholder="City" className="uppercase" value={formData.city} onChange={e => update("city", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Postcode">
            <Input placeholder="Postcode (optional)" value={formData.postcode} onChange={e => update("postcode", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Website" required hint="Your main business website URL">
            <Input type="url" placeholder="https://www.example.com" value={formData.website} onChange={e => update("website", e.target.value)} />
          </FieldGroup>
        </div>
      </div>

      {/* Contact Person */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-4 w-4 text-primary" />
          </div>
          <h3 className="font-display text-base font-bold text-foreground">Contact Person</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <FieldGroup label="First Name" required>
            <Input placeholder="First name" className="uppercase" value={formData.contactFirstName} onChange={e => update("contactFirstName", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Last Name" required>
            <Input placeholder="Last name" className="uppercase" value={formData.contactLastName} onChange={e => update("contactLastName", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Email" required>
            <Input type="email" placeholder="email@example.com" value={formData.contactEmail} onChange={e => update("contactEmail", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Phone" required>
            <Input placeholder="+1 234 567 8900" value={formData.contactPhone} onChange={e => update("contactPhone", e.target.value)} />
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}

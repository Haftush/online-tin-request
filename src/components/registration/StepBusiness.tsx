import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FieldGroup } from "./FieldGroup";
import { Building2, User, Globe, MapPin } from "lucide-react";

const COUNTRIES = ["United States", "United Kingdom", "China", "India", "Germany", "France", "Japan", "Canada", "Australia", "South Korea", "Brazil", "Kenya", "Nigeria", "South Africa", "UAE", "Saudi Arabia", "Turkey", "Russia", "Italy", "Spain", "Netherlands", "Sweden", "Singapore", "Malaysia", "Other"];

const REPRESENTATION_TYPES = [
  { value: "self", label: "Self-representation" },
  { value: "agent", label: "Tax Agent / Representative" },
  { value: "legal", label: "Legal Representative" },
];

export function StepBusiness({ formData, update }: any) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Business Identity */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground">Business Identity</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup label="Foreign Jurisdiction / Country" required hint="Country where your business is legally registered">
            <Select value={formData.country} onValueChange={v => update("country", v)}>
              <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
              <SelectContent>
                {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup label="TIN / Tax Identifier (Foreign)" required hint="Your tax identification number in your home country">
            <Input placeholder="e.g. 12-3456789" className="uppercase" value={formData.foreignTin} onChange={e => update("foreignTin", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Legal Name" required>
            <Input placeholder="Full legal business name" className="uppercase" value={formData.legalName} onChange={e => update("legalName", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Trading Name" hint="Leave blank if same as legal name">
            <div className="space-y-1.5">
              <Input placeholder="Trading name (optional)" className="uppercase" value={formData.tradingName} onChange={e => update("tradingName", e.target.value.toUpperCase())} disabled={formData.tradingNameNA} />
              <div className="flex items-center gap-2">
                <Checkbox checked={formData.tradingNameNA || false} onCheckedChange={v => { update("tradingNameNA", v); if (v) update("tradingName", ""); }} id="tradingNA" />
                <Label htmlFor="tradingNA" className="text-xs text-muted-foreground">N/A — Same as legal name</Label>
              </div>
            </div>
          </FieldGroup>
          <FieldGroup label="Business Type" required>
            <Select value={formData.businessType || ""} onValueChange={v => update("businessType", v)}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Corporation">Corporation</SelectItem>
                <SelectItem value="LLC">Limited Liability Company (LLC)</SelectItem>
                <SelectItem value="Partnership">Partnership</SelectItem>
                <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup label="Date of Incorporation" required>
            <Input type="date" value={formData.incorporationDate || ""} onChange={e => update("incorporationDate", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Representation Type" required hint="How will you interact with Ethiopian tax authority?">
            <Select value={formData.representationType} onValueChange={v => update("representationType", v)}>
              <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
              <SelectContent>
                {REPRESENTATION_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldGroup>
        </div>
      </div>

      {/* Address */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground">Registered Address</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="sm:col-span-2">
            <FieldGroup label="Address Line 1" required>
              <Input placeholder="Street address" className="uppercase" value={formData.addressLine1} onChange={e => update("addressLine1", e.target.value.toUpperCase())} />
            </FieldGroup>
          </div>
          <div className="sm:col-span-2">
            <FieldGroup label="Address Line 2">
              <div className="space-y-1.5">
                <Input placeholder="Apt, suite, unit, etc. (optional)" className="uppercase" value={formData.addressLine2 || ""} onChange={e => update("addressLine2", e.target.value.toUpperCase())} disabled={formData.addressLine2NA} />
                <div className="flex items-center gap-2">
                  <Checkbox checked={formData.addressLine2NA || false} onCheckedChange={v => { update("addressLine2NA", v); if (v) update("addressLine2", ""); }} id="addr2NA" />
                  <Label htmlFor="addr2NA" className="text-xs text-muted-foreground">N/A</Label>
                </div>
              </div>
            </FieldGroup>
          </div>
          <FieldGroup label="City" required>
            <Input placeholder="City" className="uppercase" value={formData.city} onChange={e => update("city", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="State / Province">
            <div className="space-y-1.5">
              <Input placeholder="State / Province" className="uppercase" value={formData.stateProvince || ""} onChange={e => update("stateProvince", e.target.value.toUpperCase())} disabled={formData.stateProvinceNA} />
              <div className="flex items-center gap-2">
                <Checkbox checked={formData.stateProvinceNA || false} onCheckedChange={v => { update("stateProvinceNA", v); if (v) update("stateProvince", ""); }} id="stateNA" />
                <Label htmlFor="stateNA" className="text-xs text-muted-foreground">N/A</Label>
              </div>
            </div>
          </FieldGroup>
          <FieldGroup label="Postcode / ZIP">
            <div className="space-y-1.5">
              <Input placeholder="Postcode" value={formData.postcode} onChange={e => update("postcode", e.target.value)} disabled={formData.postcodeNA} />
              <div className="flex items-center gap-2">
                <Checkbox checked={formData.postcodeNA || false} onCheckedChange={v => { update("postcodeNA", v); if (v) update("postcode", ""); }} id="postcodeNA" />
                <Label htmlFor="postcodeNA" className="text-xs text-muted-foreground">N/A</Label>
              </div>
            </div>
          </FieldGroup>
        </div>
      </div>

      {/* Website & Social Media */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground">Online Presence</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup label="Website" required hint="Your main business website URL">
            <Input type="url" placeholder="https://www.example.com" value={formData.website} onChange={e => update("website", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="App Store / Play Store URL" hint="URL of your app if applicable">
            <div className="space-y-1.5">
              <Input placeholder="https://play.google.com/..." value={formData.appStoreUrl || ""} onChange={e => update("appStoreUrl", e.target.value)} disabled={formData.appStoreNA} />
              <div className="flex items-center gap-2">
                <Checkbox checked={formData.appStoreNA || false} onCheckedChange={v => { update("appStoreNA", v); if (v) update("appStoreUrl", ""); }} id="appNA" />
                <Label htmlFor="appNA" className="text-xs text-muted-foreground">N/A</Label>
              </div>
            </div>
          </FieldGroup>
          <FieldGroup label="Social Media (Facebook, LinkedIn, etc.)">
            <div className="space-y-1.5">
              <Input placeholder="https://facebook.com/..." value={formData.socialMediaUrl || ""} onChange={e => update("socialMediaUrl", e.target.value)} disabled={formData.socialMediaNA} />
              <div className="flex items-center gap-2">
                <Checkbox checked={formData.socialMediaNA || false} onCheckedChange={v => { update("socialMediaNA", v); if (v) update("socialMediaUrl", ""); }} id="socialNA" />
                <Label htmlFor="socialNA" className="text-xs text-muted-foreground">N/A</Label>
              </div>
            </div>
          </FieldGroup>
        </div>
      </div>

      {/* Contact Person */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground">Contact Person / Authorized Representative</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup label="First Name" required>
            <Input placeholder="First name" className="uppercase" value={formData.contactFirstName} onChange={e => update("contactFirstName", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Last Name" required>
            <Input placeholder="Last name" className="uppercase" value={formData.contactLastName} onChange={e => update("contactLastName", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Email" required>
            <Input type="email" placeholder="email@example.com" value={formData.contactEmail} onChange={e => update("contactEmail", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Phone (with country code)" required>
            <Input placeholder="+1 234 567 8900" value={formData.contactPhone} onChange={e => update("contactPhone", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Position / Title" required>
            <Input placeholder="e.g. Tax Manager" className="uppercase" value={formData.contactPosition || ""} onChange={e => update("contactPosition", e.target.value.toUpperCase())} />
          </FieldGroup>
          <FieldGroup label="Passport / ID Number" required hint="For identity verification">
            <Input placeholder="Passport or ID number" className="uppercase" value={formData.contactIdNumber || ""} onChange={e => update("contactIdNumber", e.target.value.toUpperCase())} />
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}

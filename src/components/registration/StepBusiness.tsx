import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldGroup } from "./FieldGroup";
import {
  Building2,
  User,
  Globe,
  MapPin,
  Phone,
  Mail,
  Link as LinkIcon,
} from "lucide-react";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "China",
  "India",
  "Germany",
  "France",
  "Japan",
  "Canada",
  "Australia",
  "South Korea",
  "Brazil",
  "Kenya",
  "Nigeria",
  "South Africa",
  "UAE",
  "Saudi Arabia",
  "Turkey",
  "Russia",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Singapore",
  "Malaysia",
  "Other",
];

const REPRESENTATION_TYPES = [
  { value: "self", label: "Self-representation" },
  { value: "agent", label: "Tax Agent / Representative" },
  { value: "legal", label: "Legal Representative" },
];

interface StepBusinessProps {
  formData: any;
  update: (field: string, value: any) => void;
}

export function StepBusiness({ formData, update }: StepBusinessProps) {
  const handleInputChange = (
    field: string,
    value: string,
    uppercase = true,
  ) => {
    update(field, uppercase ? value.toUpperCase() : value);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Business Identity */}
      <Section icon={Building2} title="Business Identity">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup
            label="Foreign Jurisdiction / Country"
            required
            hint="Country where your business is legally registered"
          >
            <Select
              value={formData.country || ""}
              onValueChange={(v) => update("country", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldGroup>

          <FieldGroup
            label="TIN / Tax Identifier (Foreign)"
            required
            hint="Your tax identification number in your home country"
          >
            <Input
              placeholder="e.g. 12-3456789"
              className="uppercase"
              value={formData.foreignTin || ""}
              onChange={(e) => handleInputChange("foreignTin", e.target.value)}
            />
          </FieldGroup>

          <FieldGroup label="Legal Name in Foreign Jurisdiction" required>
            <Input
              placeholder="Full legal business name"
              className="uppercase"
              value={formData.legalName || ""}
              onChange={(e) => handleInputChange("legalName", e.target.value)}
            />
          </FieldGroup>

          <FieldGroup label="Trading Name (Optional)">
            <Input
              placeholder="Trading name if different from legal name"
              className="uppercase"
              value={formData.tradingName || ""}
              onChange={(e) => handleInputChange("tradingName", e.target.value)}
            />
          </FieldGroup>

          <FieldGroup label="Date of Incorporation" required>
            <Input
              type="date"
              value={formData.incorporationDate || ""}
              onChange={(e) => update("incorporationDate", e.target.value)}
            />
          </FieldGroup>
        </div>
      </Section>

      {/* Business Address */}
      <Section icon={MapPin} title="Business Address">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup label="Street Address" className="sm:col-span-2">
            <Input
              placeholder="Street name and number"
              className="uppercase"
              value={formData.streetAddress || ""}
              onChange={(e) =>
                handleInputChange("streetAddress", e.target.value)
              }
            />
          </FieldGroup>

          <FieldGroup label="Building / Office (Optional)">
            <Input
              placeholder="Building name, floor, suite, etc."
              className="uppercase"
              value={formData.buildingInfo || ""}
              onChange={(e) =>
                handleInputChange("buildingInfo", e.target.value)
              }
            />
          </FieldGroup>

          <FieldGroup label="City" required>
            <Input
              placeholder="City"
              className="uppercase"
              value={formData.city || ""}
              onChange={(e) => handleInputChange("city", e.target.value)}
            />
          </FieldGroup>

          <FieldGroup label="State / Province (Optional)">
            <Input
              placeholder="State / Province"
              className="uppercase"
              value={formData.stateProvince || ""}
              onChange={(e) =>
                handleInputChange("stateProvince", e.target.value)
              }
            />
          </FieldGroup>

          <FieldGroup label="Postcode / ZIP (Optional)">
            <Input
              placeholder="Postcode"
              value={formData.postcode || ""}
              onChange={(e) =>
                handleInputChange("postcode", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup label="Country" required>
            <Select
              value={formData.addressCountry || formData.country || ""}
              onValueChange={(v) => update("addressCountry", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldGroup>
        </div>
      </Section>

      {/* Contact Information */}
      <Section icon={Phone} title="Contact Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup label="Office Phone" required>
            <Input
              placeholder="+1 234 567 8900"
              value={formData.officePhone || ""}
              onChange={(e) =>
                handleInputChange("officePhone", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup label="Alternative Phone (Optional)">
            <Input
              placeholder="+1 234 567 8900"
              value={formData.alternativePhone || ""}
              onChange={(e) =>
                handleInputChange("alternativePhone", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup label="Email Address" required>
            <Input
              type="email"
              placeholder="email@example.com"
              value={formData.businessEmail || ""}
              onChange={(e) =>
                handleInputChange("businessEmail", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup label="Alternative Email (Optional)">
            <Input
              type="email"
              placeholder="alternative@example.com"
              value={formData.alternativeEmail || ""}
              onChange={(e) =>
                handleInputChange("alternativeEmail", e.target.value, false)
              }
            />
          </FieldGroup>
        </div>
      </Section>

      {/* Online Presence */}
      <Section icon={Globe} title="Online Presence">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup label="Website (Optional)">
            <Input
              type="url"
              placeholder="https://www.example.com"
              value={formData.website || ""}
              onChange={(e) =>
                handleInputChange("website", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup label="LinkedIn (Optional)">
            <Input
              type="url"
              placeholder="https://www.linkedin.com/company/..."
              value={formData.linkedin || ""}
              onChange={(e) =>
                handleInputChange("linkedin", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup label="Instagram (Optional)">
            <Input
              type="url"
              placeholder="https://www.instagram.com/..."
              value={formData.instagram || ""}
              onChange={(e) =>
                handleInputChange("instagram", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup label="Twitter/X (Optional)">
            <Input
              type="url"
              placeholder="https://twitter.com/..."
              value={formData.twitter || ""}
              onChange={(e) =>
                handleInputChange("twitter", e.target.value, false)
              }
            />
          </FieldGroup>
        </div>
      </Section>

      {/* Contact Person */}
      <Section icon={User} title="Contact Person / Authorized Representative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <FieldGroup label="First Name" required>
            <Input
              placeholder="First name"
              className="uppercase"
              value={formData.contactFirstName || ""}
              onChange={(e) =>
                handleInputChange("contactFirstName", e.target.value)
              }
            />
          </FieldGroup>

          <FieldGroup label="Middle Name (Optional)">
            <Input
              placeholder="Middle name"
              className="uppercase"
              value={formData.contactMiddleName || ""}
              onChange={(e) =>
                handleInputChange("contactMiddleName", e.target.value)
              }
            />
          </FieldGroup>

          <FieldGroup label="Last Name" required>
            <Input
              placeholder="Last name"
              className="uppercase"
              value={formData.contactLastName || ""}
              onChange={(e) =>
                handleInputChange("contactLastName", e.target.value)
              }
            />
          </FieldGroup>

          <FieldGroup label="Country of Residence" required>
            <Select
              value={formData.contactCountry || ""}
              onValueChange={(v) => update("contactCountry", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldGroup>

          <FieldGroup label="TIN / Tax ID (Optional)">
            <Input
              placeholder="Tax identification number"
              className="uppercase"
              value={formData.contactTin || ""}
              onChange={(e) => handleInputChange("contactTin", e.target.value)}
            />
          </FieldGroup>

          <FieldGroup label="Home Phone (Optional)">
            <Input
              placeholder="+1 234 567 8900"
              value={formData.contactHomePhone || ""}
              onChange={(e) =>
                handleInputChange("contactHomePhone", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup label="Mobile Phone" required>
            <Input
              placeholder="+1 234 567 8900"
              value={formData.contactMobile || ""}
              onChange={(e) =>
                handleInputChange("contactMobile", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup label="Email" required>
            <Input
              type="email"
              placeholder="email@example.com"
              value={formData.contactEmail || ""}
              onChange={(e) =>
                handleInputChange("contactEmail", e.target.value, false)
              }
            />
          </FieldGroup>

          <FieldGroup
            label="Representation Type"
            required
            hint="Select how you will interact with Ethiopian tax authority"
          >
            <Select
              value={formData.representationType || ""}
              onValueChange={(v) => update("representationType", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select representation type" />
              </SelectTrigger>
              <SelectContent>
                {REPRESENTATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldGroup>
        </div>
      </Section>
    </div>
  );
}

// Helper component for sections
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        </div>
        <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

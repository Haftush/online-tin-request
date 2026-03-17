import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "./FieldGroup";
import {
  FileText,
  Upload,
  CheckCircle2,
  Briefcase,
  Calendar,
  Building2,
  Plus,
  Trash2,
} from "lucide-react";

const DOCS = [
  {
    key: "memo",
    label: "Memorandum / Articles of Association",
    required: true,
  },
  {
    key: "tinCert",
    label: "TIN Certificate (foreign jurisdiction)",
    required: true,
  },
  {
    key: "incorporation",
    label: "Certificate of Incorporation",
    required: true,
  },
  {
    key: "gmLetter",
    label: "GM Appointment Letter & Personal TIN",
    required: true,
  },
  {
    key: "passport",
    label: "Passport / ID of Authorized Representative",
    required: true,
  },
  {
    key: "powerOfAttorney",
    label: "Power of Attorney (if applicable)",
    required: false,
  },
  { key: "bankLetter", label: "Bank Confirmation Letter", required: false },
];

const ESIC_CODES = [
  { value: "J61", label: "J61 - Telecommunications" },
  { value: "J62", label: "J62 - Computer Programming & Consultancy" },
  { value: "J63", label: "J63 - Information Service Activities" },
  { value: "J58", label: "J58 - Publishing (Digital)" },
  { value: "J59", label: "J59 - Film/Video/Music Production" },
  { value: "J60", label: "J60 - Broadcasting" },
  { value: "K64", label: "K64 - Financial Services" },
  { value: "K65", label: "K65 - Insurance & Pension" },
  { value: "M70", label: "M70 - Management Consultancy" },
  { value: "M73", label: "M73 - Advertising & Market Research" },
  { value: "G47", label: "G47 - Retail Trade (E-commerce)" },
  { value: "Other", label: "Other" },
];

export function StepTaxDocs({ formData, update }: any) {
  // Business Activities
  const addBusinessActivity = () => {
    update("businessActivities", [
      ...formData.businessActivities,
      {
        activities: "",
        sector: "",
        activity: "",
        startDate: "",
        formattedDate: "",
        subgroup: "",
        group: "",
        majorGroup: "",
        division: "",
        majorDivision: "",
      },
    ]);
  };

  const removeBusinessActivity = (i: number) => {
    if (formData.businessActivities.length > 1)
      update(
        "businessActivities",
        formData.businessActivities.filter((_: any, idx: number) => idx !== i),
      );
  };

  const updateBusinessActivity = (i: number, field: string, value: string) => {
    const updated = [...formData.businessActivities];
    updated[i] = { ...updated[i], [field]: value };
    update("businessActivities", updated);
  };

  // Tax Obligations
  const updateTaxObligation = (field: string, value: any) => {
    update("taxObligations", { ...formData.taxObligations, [field]: value });
  };

  const requiredDocs = DOCS.filter((d) => d.required);
  const uploadedRequired = requiredDocs.filter(
    (d) => formData.documents[d.key],
  ).length;
  const totalUploaded = DOCS.filter((d) => formData.documents[d.key]).length;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Business Activity Details */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
            Business Activity Details
          </h3>
        </div>

        <div className="space-y-3">
          {formData.businessActivities?.map((activity: any, i: number) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-muted/20 p-3 sm:p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] sm:text-xs font-bold font-display text-muted-foreground uppercase tracking-wider">
                  Activity {i + 1}
                </span>
                {formData.businessActivities.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBusinessActivity(i)}
                    className="h-7 w-7 p-0"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <FieldGroup label="Business Activities" required>
                  <Input
                    placeholder="Business activities"
                    className="uppercase h-9 text-sm"
                    value={activity.activities}
                    onChange={(e) =>
                      updateBusinessActivity(
                        i,
                        "activities",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Sector" required>
                  <Input
                    placeholder="Sector"
                    className="uppercase h-9 text-sm"
                    value={activity.sector || ""}
                    onChange={(e) =>
                      updateBusinessActivity(
                        i,
                        "sector",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Activity" required>
                  <Input
                    placeholder="Activity"
                    className="uppercase h-9 text-sm"
                    value={activity.activity || ""}
                    onChange={(e) =>
                      updateBusinessActivity(
                        i,
                        "activity",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Start Date" required>
                  <Input
                    type="date"
                    className="h-9 text-sm"
                    value={activity.startDate || ""}
                    onChange={(e) =>
                      updateBusinessActivity(i, "startDate", e.target.value)
                    }
                  />
                </FieldGroup>

                <FieldGroup label="Subgroup">
                  <Input
                    placeholder="Subgroup"
                    className="uppercase h-9 text-sm"
                    value={activity.subgroup || ""}
                    onChange={(e) =>
                      updateBusinessActivity(
                        i,
                        "subgroup",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Group">
                  <Input
                    placeholder="Group"
                    className="uppercase h-9 text-sm"
                    value={activity.group || ""}
                    onChange={(e) =>
                      updateBusinessActivity(
                        i,
                        "group",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Major Group">
                  <Input
                    placeholder="Major group"
                    className="uppercase h-9 text-sm"
                    value={activity.majorGroup || ""}
                    onChange={(e) =>
                      updateBusinessActivity(
                        i,
                        "majorGroup",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Division">
                  <Input
                    placeholder="Division"
                    className="uppercase h-9 text-sm"
                    value={activity.division || ""}
                    onChange={(e) =>
                      updateBusinessActivity(
                        i,
                        "division",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Major Division">
                  <Input
                    placeholder="Major division"
                    className="uppercase h-9 text-sm"
                    value={activity.majorDivision || ""}
                    onChange={(e) =>
                      updateBusinessActivity(
                        i,
                        "majorDivision",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={addBusinessActivity}
          className="gap-1.5 mt-3"
        >
          <Plus className="h-3.5 w-3.5" /> Add Business Activity
        </Button>
      </div>

      {/* Tax Obligations */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
            Tax Obligations
          </h3>
        </div>

        <div className="rounded-lg border border-border bg-muted/20 p-4 space-y-4">
          {/* Fiscal Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FieldGroup label="Fiscal Year" required>
              <Input
                placeholder="e.g., 2024"
                className="h-9 text-sm"
                value={formData.taxObligations?.fiscalYear || ""}
                onChange={(e) =>
                  updateTaxObligation("fiscalYear", e.target.value)
                }
              />
            </FieldGroup>
            <FieldGroup label="Fiscal Year Start (DMM or DDMM)" required>
              <Input
                placeholder="e.g., 0107 or 0107"
                className="h-9 text-sm"
                value={formData.taxObligations?.fiscalYearStart || ""}
                onChange={(e) =>
                  updateTaxObligation("fiscalYearStart", e.target.value)
                }
              />
            </FieldGroup>
            <FieldGroup label="Fiscal Year End (DMM or DDMM)" required>
              <Input
                placeholder="e.g., 3006 or 3006"
                className="h-9 text-sm"
                value={formData.taxObligations?.fiscalYearEnd || ""}
                onChange={(e) =>
                  updateTaxObligation("fiscalYearEnd", e.target.value)
                }
              />
            </FieldGroup>
          </div>

          {/* Digital Services Tax */}
          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-bold font-display text-foreground mb-3">
              Digital Services Tax
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FieldGroup label="Digital Service Tax Start Date" required>
                <Input
                  type="date"
                  className="h-9 text-sm"
                  value={
                    formData.taxObligations?.digitalServiceTaxStartDate || ""
                  }
                  onChange={(e) =>
                    updateTaxObligation(
                      "digitalServiceTaxStartDate",
                      e.target.value,
                    )
                  }
                />
              </FieldGroup>

              <FieldGroup label="VAT on Foreign Supplies Start Date">
                <Input
                  type="date"
                  className="h-9 text-sm"
                  value={formData.taxObligations?.vatStartDate || ""}
                  onChange={(e) =>
                    updateTaxObligation("vatStartDate", e.target.value)
                  }
                />
              </FieldGroup>
              <FieldGroup label="VAT Start Date (if different)">
                <Input
                  type="date"
                  className="h-9 text-sm"
                  value={formData.taxObligations?.vatActualStartDate || ""}
                  onChange={(e) =>
                    updateTaxObligation("vatActualStartDate", e.target.value)
                  }
                />
              </FieldGroup>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Services Description */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
            Digital Services Information
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="sm:col-span-2">
            <FieldGroup
              label="Description of Digital Services Provided in Ethiopia"
              required
              hint="Describe the specific digital services you provide to Ethiopian customers"
            >
              <Textarea
                rows={3}
                placeholder="e.g. Online streaming platform providing video content, SaaS platform for business management..."
                className="uppercase text-sm"
                value={formData.activityDescription}
                onChange={(e) =>
                  update("activityDescription", e.target.value.toUpperCase())
                }
              />
            </FieldGroup>
          </div>
          <FieldGroup
            label="ESIC Code"
            required
            hint="Ethiopian Standard Industrial Classification"
          >
            <Select
              value={formData.esicCode || ""}
              onValueChange={(v) => update("esicCode", v)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {ESIC_CODES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup
            label="Estimated Annual Revenue from Ethiopia (USD)"
            required
          >
            <Input
              type="number"
              placeholder="e.g. 500000"
              value={formData.estimatedRevenue || ""}
              onChange={(e) => update("estimatedRevenue", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Date Services Commenced in Ethiopia" required>
            <Input
              type="date"
              value={formData.serviceCommenceDate || ""}
              onChange={(e) => update("serviceCommenceDate", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Number of Ethiopian Customers (approx.)">
            <Input
              type="number"
              placeholder="e.g. 10000"
              value={formData.customerCount || ""}
              onChange={(e) => update("customerCount", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Financial Year End" required>
            <Select
              value={formData.financialYearEnd}
              onValueChange={(v) => update("financialYearEnd", v)}
            >
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hamle7">
                  Hamle 7 (Ethiopian calendar — July 14)
                </SelectItem>
                <SelectItem value="dec31">December 31 (Gregorian)</SelectItem>
                <SelectItem value="mar31">March 31 (Gregorian)</SelectItem>
                <SelectItem value="jun30">June 30 (Gregorian)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </FieldGroup>
        </div>

        <div className="rounded-lg border border-border bg-accent/30 p-3 sm:p-4 mt-4">
          <p className="text-xs sm:text-sm font-bold font-display text-foreground mb-3">
            Tax Obligations Selection
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Checkbox checked={formData.digitalServicesTax} disabled />
              <Label className="text-xs sm:text-sm">
                Digital Services Tax (DST){" "}
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  (mandatory — auto-selected)
                </span>
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.vatOnForeignSupplies}
                onCheckedChange={(v) => update("vatOnForeignSupplies", v)}
              />
              <Label className="text-xs sm:text-sm">
                VAT on Foreign Digital Supplies
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.withholdingTax || false}
                onCheckedChange={(v) => update("withholdingTax", v)}
              />
              <Label className="text-xs sm:text-sm">Withholding Tax</Label>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                Supporting Documents
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                PDF, JPEG, or PNG (max 10MB each)
              </p>
            </div>
          </div>
          <div
            className={`text-[10px] sm:text-xs font-bold font-display px-2 sm:px-2.5 py-1 rounded-full ${uploadedRequired === requiredDocs.length ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}
          >
            {totalUploaded}/{DOCS.length}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {DOCS.map((d) => {
            const uploaded = !!formData.documents[d.key];
            return (
              <label key={d.key} className="cursor-pointer group">
                <input
                  type="file"
                  accept=".pdf,.jpeg,.jpg,.png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    update("documents", {
                      ...formData.documents,
                      [d.key]: file,
                    });
                  }}
                />
                <div
                  className={`flex items-center gap-2 sm:gap-3 rounded-lg border p-2.5 sm:p-3.5 transition-all ${uploaded ? "border-success/40 bg-success/5" : "border-border bg-card hover:border-primary/30 hover:bg-accent/30"}`}
                >
                  {uploaded ? (
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0" />
                  ) : (
                    <Upload className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                      {d.label}{" "}
                      {d.required && (
                        <span className="text-destructive">*</span>
                      )}
                    </p>
                    {uploaded && (
                      <p className="text-[10px] sm:text-xs text-success truncate">
                        {formData.documents[d.key].name}
                      </p>
                    )}
                    {!uploaded && !d.required && (
                      <p className="text-[10px] text-muted-foreground">
                        Optional
                      </p>
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

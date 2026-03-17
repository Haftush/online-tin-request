import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup } from "./FieldGroup";
import {
  CheckCircle2,
  Building2,
  Users,
  FileText,
  AlertCircle,
  Calendar,
  Landmark,
  Repeat,
  UserCircle,
} from "lucide-react";

function ReviewRow({ label, value }: { label: string; value: string }) {
  if (!value || value === "") return null;
  return (
    <div className="flex justify-between py-1 sm:py-1.5 text-xs sm:text-sm border-b border-border/50 last:border-0 gap-2">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="font-medium text-foreground text-right truncate">
        {value}
      </span>
    </div>
  );
}

function ReviewSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-accent/20 p-3 sm:p-4">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
        <span className="text-[10px] sm:text-xs font-bold font-display text-muted-foreground uppercase">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

export function StepReview({ formData, update }: any) {
  // Safe access helpers
  const owners = formData.owners || [];
  const bankDetails = formData.bankDetails || [];
  const associatedBusinesses = formData.associatedBusinesses || [];
  const businessActivities = formData.businessActivities || [];
  const documents = formData.documents || {};
  const taxObligations = formData.taxObligations || {};
  const taxAuditor = formData.taxAuditor || {};
  const taxAgent = formData.taxAgent || {};

  // Calculate totals
  const totalOwnership = owners.reduce(
    (sum: number, o: any) => sum + (parseFloat(o.percentage) || 0),
    0,
  );

  // Document counts
  const requiredDocKeys = [
    "memo",
    "tinCert",
    "incorporation",
    "gmLetter",
    "passport",
  ];
  const docsUploaded = requiredDocKeys.filter((k) => documents[k]).length;

  // Find main bank account
  const mainBank =
    bankDetails.find((b: any) => b.mainAccount) || bankDetails[0];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Cards - Top Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Business Summary */}
        <ReviewSection title="Business" icon={Building2}>
          <ReviewRow label="Legal Name" value={formData.legalName} />
          <ReviewRow label="Trading Name" value={formData.tradingName} />
          <ReviewRow label="Country" value={formData.country} />
          <ReviewRow label="TIN" value={formData.foreignTin} />
          <ReviewRow label="Business Type" value={formData.businessType} />
          <ReviewRow
            label="Incorporation Date"
            value={formData.incorporationDate}
          />
          <ReviewRow
            label="Contact Person"
            value={`${formData.contactFirstName} ${formData.contactLastName}`}
          />
          <ReviewRow label="Email" value={formData.contactEmail} />
          <ReviewRow label="Phone" value={formData.contactPhone} />
        </ReviewSection>

        {/* Tax Representatives Summary */}
        <ReviewSection title="Tax Representatives" icon={UserCircle}>
          <div className="mb-2 pb-1 border-b border-border/50">
            <span className="text-[10px] font-semibold text-muted-foreground">
              TAX AUDITOR
            </span>
          </div>
          <ReviewRow label="Auditor TIN" value={taxAuditor.tin} />
          <ReviewRow label="Auditor Name" value={taxAuditor.registeredName} />
          <ReviewRow
            label="AABE Reg No"
            value={taxAuditor.aabeRegistrationNo}
          />

          <div className="mt-2 mb-1 pb-1 border-b border-border/50">
            <span className="text-[10px] font-semibold text-muted-foreground">
              TAX AGENT
            </span>
          </div>
          <ReviewRow label="Agent TIN" value={taxAgent.tin} />
          <ReviewRow label="Agent Name" value={taxAgent.registeredName} />
          <ReviewRow label="License No" value={taxAgent.licenseNo} />
        </ReviewSection>

        {/* Ownership Summary */}
        <ReviewSection title="Ownership" icon={Users}>
          <ReviewRow
            label="Number of Owners"
            value={owners.length.toString()}
          />
          <ReviewRow label="Total Ownership" value={`${totalOwnership}%`} />
          {owners.map((owner: any, idx: number) => (
            <div
              key={idx}
              className="text-[10px] sm:text-xs text-muted-foreground mt-1"
            >
              {owner.lastName}: {owner.percentage}%
            </div>
          ))}
          {totalOwnership !== 100 && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px] sm:text-xs text-warning">
              <AlertCircle className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Ownership must total 100%</span>
            </div>
          )}
        </ReviewSection>
      </div>

      {/* Second Row - Bank & Associated Businesses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Bank Details Summary */}
        <ReviewSection title="Bank Accounts" icon={Landmark}>
          <ReviewRow
            label="Total Accounts"
            value={bankDetails.length.toString()}
          />
          {mainBank && (
            <>
              <div className="mt-1 mb-1 text-[10px] font-semibold text-primary">
                MAIN ACCOUNT
              </div>
              <ReviewRow label="Bank" value={mainBank.localBankName} />
              <ReviewRow
                label="Account Holder"
                value={mainBank.accountHolder}
              />
              <ReviewRow
                label="Account Number"
                value={mainBank.accountNumber}
              />
              <ReviewRow label="Account Type" value={mainBank.accountType} />
              <ReviewRow label="Currency" value={mainBank.currency} />
            </>
          )}
          {bankDetails.length > 1 && (
            <div className="text-[10px] text-muted-foreground mt-1">
              +{bankDetails.length - 1} additional account(s)
            </div>
          )}
        </ReviewSection>

        {/* Associated Businesses Summary */}
        <ReviewSection title="Associated Businesses" icon={Repeat}>
          <ReviewRow
            label="Total Associated"
            value={associatedBusinesses.length.toString()}
          />
          {associatedBusinesses
            .slice(0, 2)
            .map((business: any, idx: number) => (
              <div key={idx} className="mt-2">
                <div className="text-[10px] font-semibold text-muted-foreground">
                  {business.legalName || `Business ${idx + 1}`}
                </div>
                <ReviewRow label="TIN" value={business.tin} />
                <ReviewRow label="Type" value={business.associationType} />
                <ReviewRow label="Country" value={business.country} />
              </div>
            ))}
          {associatedBusinesses.length > 2 && (
            <div className="text-[10px] text-muted-foreground mt-1">
              +{associatedBusinesses.length - 2} more
            </div>
          )}
        </ReviewSection>
      </div>

      {/* Third Row - Business Activities & Tax Obligations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Business Activities Summary */}
        <ReviewSection title="Business Activities" icon={Building2}>
          <ReviewRow
            label="Total Activities"
            value={businessActivities.length.toString()}
          />
          {businessActivities.slice(0, 2).map((activity: any, idx: number) => (
            <div key={idx} className="mt-2">
              <div className="text-[10px] font-semibold text-muted-foreground">
                {activity.activities || `Activity ${idx + 1}`}
              </div>
              <ReviewRow label="Sector" value={activity.sector} />
              <ReviewRow label="Start Date" value={activity.startDate} />
              {activity.formattedDate && (
                <ReviewRow label="Formatted" value={activity.formattedDate} />
              )}
            </div>
          ))}
          {businessActivities.length > 2 && (
            <div className="text-[10px] text-muted-foreground mt-1">
              +{businessActivities.length - 2} more
            </div>
          )}
        </ReviewSection>

        {/* Tax Obligations Summary */}
        <ReviewSection title="Tax Obligations" icon={Calendar}>
          <div className="mb-2 pb-1 border-b border-border/50">
            <span className="text-[10px] font-semibold text-muted-foreground">
              FISCAL YEAR
            </span>
          </div>
          <ReviewRow label="Fiscal Year" value={taxObligations.fiscalYear} />
          <ReviewRow
            label="Start (DMM)"
            value={taxObligations.fiscalYearStart}
          />
          <ReviewRow label="End (DMM)" value={taxObligations.fiscalYearEnd} />

          <div className="mt-2 mb-1 pb-1 border-b border-border/50">
            <span className="text-[10px] font-semibold text-muted-foreground">
              DIGITAL SERVICES
            </span>
          </div>
          <ReviewRow
            label="DST Start"
            value={taxObligations.digitalServiceTaxStartDate}
          />
          <ReviewRow label="VAT Start" value={taxObligations.vatStartDate} />

          <ReviewRow label="ESIC Code" value={formData.esicCode} />
          <ReviewRow
            label="Est. Revenue"
            value={
              formData.estimatedRevenue ? `$${formData.estimatedRevenue}` : ""
            }
          />
          <ReviewRow
            label="Commencement"
            value={formData.serviceCommenceDate}
          />
        </ReviewSection>
      </div>

      {/* Documents Summary */}
      <div className="grid grid-cols-1 gap-3">
        <ReviewSection title="Documents" icon={FileText}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium">Uploaded Documents</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                docsUploaded === requiredDocKeys.length
                  ? "bg-success/10 text-success"
                  : "bg-warning/10 text-warning"
              }`}
            >
              {docsUploaded}/{requiredDocKeys.length} Required
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {requiredDocKeys.map((key) => {
              const doc = documents[key];
              const docLabel =
                {
                  memo: "Memorandum",
                  tinCert: "TIN Certificate",
                  incorporation: "Incorporation",
                  gmLetter: "GM Letter",
                  passport: "Passport/ID",
                }[key] || key;

              return (
                <div
                  key={key}
                  className="flex items-center gap-1 text-[10px] sm:text-xs"
                >
                  {doc ? (
                    <CheckCircle2 className="h-3 w-3 text-success shrink-0" />
                  ) : (
                    <AlertCircle className="h-3 w-3 text-warning shrink-0" />
                  )}
                  <span
                    className={doc ? "text-success" : "text-muted-foreground"}
                  >
                    {docLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </ReviewSection>
      </div>

      {/* Certifier Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FieldGroup label="Full Name (Certifying Person)" required>
          <Input
            placeholder="Full name"
            className="uppercase"
            value={formData.certifierName || ""}
            onChange={(e) =>
              update("certifierName", e.target.value.toUpperCase())
            }
          />
        </FieldGroup>
        <FieldGroup label="Position / Title" required>
          <Input
            placeholder="Position"
            className="uppercase"
            value={formData.certifierPosition || ""}
            onChange={(e) =>
              update("certifierPosition", e.target.value.toUpperCase())
            }
          />
        </FieldGroup>
        <FieldGroup label="Date" required>
          <Input
            type="date"
            value={formData.certifierDate || ""}
            onChange={(e) => update("certifierDate", e.target.value)}
          />
        </FieldGroup>
      </div>

      {/* Declaration and Confirmation */}
      <div className="space-y-4">
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 sm:p-5">
          <h4 className="text-sm sm:text-base font-bold font-display text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Declaration of Confirmation
          </h4>
          <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
            I hereby declare that all the information and documents I have
            provided in this taxpayer registration application are true,
            correct, and complete to the best of my knowledge and belief. I
            understand that providing false, misleading, or incomplete
            information may result in the rejection of this application,
            cancellation of registration, penalties, or other actions in
            accordance with the applicable tax laws and regulations. I confirm
            that I am authorized to submit this application and that the
            information provided accurately represents the taxpayer being
            registered. By confirming below, I acknowledge that I have reviewed
            all the information submitted in this application and agree that it
            may be used by the tax administration for the purposes of taxpayer
            registration, verification, and administration in accordance with
            the law.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <Checkbox
              id="confirmation"
              checked={formData.certified || false}
              onCheckedChange={(v) => update("certified", v)}
              className="mt-0.5"
            />
            <div>
              <label
                htmlFor="confirmation"
                className="text-xs sm:text-sm font-bold font-display text-foreground cursor-pointer"
              >
                Confirmation
              </label>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                I confirm that the above declaration is true and that I agree to
                submit this application.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

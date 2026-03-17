import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClientHeader } from "@/components/ClientHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { StepBusiness } from "@/components/registration/StepBusiness";
import { StepFinancial } from "@/components/registration/StepFinancial";
import { StepTaxDocs } from "@/components/registration/StepTaxDocs";
import { StepReview } from "@/components/registration/StepReview";

const STEPS = [
  { label: "Business & Contact", icon: Building2 },
  { label: "Ownership & Bank", icon: Users },
  { label: "Tax & Documents", icon: FileText },
  { label: "Review & Submit", icon: ShieldCheck },
];

// Case Number Display Component
function CaseNumberDisplay({ caseNumber }: { caseNumber: string }) {
  const appDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="px-4 py-2 rounded-lg bg-muted/30 border border-border">
        <span className="text-muted-foreground">Date: </span>
        <span className="font-medium text-foreground">{appDate}</span>
      </div>
      <div className="px-4 py-2 rounded-lg bg-primary/5 border border-primary/20">
        <span className="text-muted-foreground">Application No: </span>
        <span className="font-bold text-primary">MOR-{caseNumber}</span>
      </div>
    </div>
  );
}

export default function RegistrationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Generate case number (format: MOR-NR-YYYY-XXXXX)
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "0");
  const caseNumber = `${year}-${randomNum}`;

  const [formData, setFormData] = useState({
    // Business & Contact (Step 1)
    country: "",
    foreignTin: "",
    legalName: "",
    tradingName: "",
    tradingNameNA: false,
    businessType: "",
    incorporationDate: "",
    representationType: "",
    addressLine1: "",
    addressLine2: "",
    addressLine2NA: false,
    city: "",
    stateProvince: "",
    stateProvinceNA: false,
    postcode: "",
    postcodeNA: false,
    website: "",
    appStoreUrl: "",
    appStoreNA: false,
    socialMediaUrl: "",
    socialMediaNA: false,
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    contactPosition: "",
    contactIdNumber: "",

    // Tax Auditor Details (New)
    taxAuditor: {
      tin: "",
      registeredName: "",
      aabeRegistrationNo: "",
      professionalNo: "",
    },

    // Tax Agent Details (New)
    taxAgent: {
      tin: "",
      registeredName: "",
      licenseNo: "",
      professionalNo: "",
    },

    // Ownership & Management (Updated)
    owners: [
      {
        tin: "",
        designation: "",
        lastName: "",
        otherNames: "",
        country: "",
        percentage: "",
        startDate: "",
        nationality: "",
        idNumber: "",
      },
    ],

    // Associated/Related Businesses (New)
    associatedBusinesses: [
      {
        tin: "",
        associationType: "",
        startDate: "",
        legalName: "",
        tradeName: "",
        country: "",
      },
    ],

    // Bank Details (Updated)
    bankDetails: [
      {
        accountType: "",
        localBankName: "",
        internationalBankName: "",
        internationalBankCountry: "",
        bankAddress: "",
        accountHolder: "",
        accountNumber: "",
        mainAccount: false,
        currency: "ETB",
      },
    ],

    // Business Activity Details (New)
    businessActivities: [
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
    ],

    // Tax Obligations (New)
    taxObligations: {
      fiscalYear: "",
      fiscalYearStart: "",
      fiscalYearEnd: "",
      digitalServiceTaxStartDate: "",
      digitalServiceTaxFormattedDate: "",
      vatStartDate: "",
      vatActualStartDate: "",
    },

    // Tax & Documents (Step 3 - keeping existing)
    activityDescription: "",
    esicCode: "",
    estimatedRevenue: "",
    serviceCommenceDate: "",
    customerCount: "",
    financialYearEnd: "",
    digitalServicesTax: true,
    vatOnForeignSupplies: false,
    withholdingTax: false,

    // Review & Submit (Step 4)
    certifierName: "",
    certifierPosition: "",
    certifierDate: "",
    certified: false,
    documents: {} as Record<string, File | null>,
  });

  const update = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Validation checks
    if (!formData.certified) {
      toast.error("Please certify the declaration before submitting.");
      return;
    }

    // Check ownership total
    const totalOwnership = formData.owners.reduce(
      (sum: number, o: any) => sum + (parseFloat(o.percentage) || 0),
      0,
    );
    if (totalOwnership !== 100) {
      toast.error("Ownership percentage must total 100%");
      return;
    }

    // Check required documents
    const requiredDocKeys = [
      "memo",
      "tinCert",
      "incorporation",
      "gmLetter",
      "passport",
    ];
    const docsUploaded = requiredDocKeys.filter(
      (k) => formData.documents[k],
    ).length;
    if (docsUploaded < requiredDocKeys.length) {
      toast.error("Please upload all required documents");
      return;
    }

    setSubmitted(true);
    toast.success("Application submitted successfully!");
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <ClientHeader />
        <div className="container max-w-lg py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full gradient-primary">
              <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              Application Submitted!
            </h1>
            <p className="text-muted-foreground mb-2">Your reference number:</p>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-8 border border-primary/20">
              <p className="font-mono text-3xl font-bold text-primary mb-2">
                MOR-NR-{caseNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                Save this number to track your application status
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-8">
              You will receive a confirmation email. Our officers will review
              your application and notify you of the outcome.
            </p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Home
              </Button>
              <Button variant="hero" onClick={() => navigate("/track")}>
                Track Application
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Calculate step completion for visual feedback
  const stepCompletions = [
    // Step 1: Business & Contact
    !!(
      formData.legalName &&
      formData.country &&
      formData.contactFirstName &&
      formData.contactEmail
    ),

    // Step 2: Ownership & Bank (check if at least basic info is filled)
    !!(
      formData.owners[0]?.lastName &&
      formData.bankDetails[0]?.accountHolder &&
      formData.taxAuditor?.tin &&
      formData.taxAgent?.tin
    ),

    // Step 3: Tax & Documents
    !!(
      formData.activityDescription &&
      formData.financialYearEnd &&
      formData.esicCode
    ),

    // Step 4: Review & Submit
    !!(formData.certifierName && formData.certified),
  ];

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />
      <div className="container max-w-4xl py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        {/* Header with Date and Case Number */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                Digital Services Registration
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Complete all sections to register for tax obligations in
                Ethiopia.
              </p>
            </div>
            <CaseNumberDisplay caseNumber={caseNumber} />
          </div>
        </div>

        {/* Step indicator with completion status */}
        <div className="mb-4 sm:mb-6">
          <StepIndicator
            steps={STEPS.map((s) => s.label)}
            currentStep={step}
            completions={stepCompletions}
          />
        </div>

        {/* Step content */}
        <div className="rounded-xl border border-border bg-card p-3 sm:p-5 md:p-8 shadow-card">
          <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-border">
            {(() => {
              const Icon = STEPS[step].icon;
              return (
                <>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
                    <Icon className="h-4.5 w-4.5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-foreground">
                      {STEPS[step].label}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Step {step + 1} of {STEPS.length}
                      {stepCompletions[step] && " ✓ Completed"}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 && (
                <StepBusiness formData={formData} update={update} />
              )}
              {step === 1 && (
                <StepFinancial formData={formData} update={update} />
              )}
              {step === 2 && (
                <StepTaxDocs formData={formData} update={update} />
              )}
              {step === 3 && <StepReview formData={formData} update={update} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-5">
          <Button
            variant="outline"
            onClick={prev}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>

          {step < STEPS.length - 1 ? (
            <Button variant="hero" onClick={next} className="gap-2">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="gold"
              onClick={handleSubmit}
              size="lg"
              className="gap-2"
              disabled={!stepCompletions[step]}
            >
              Submit Application <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Help text for disabled continue button */}
        {step < STEPS.length - 1 && !stepCompletions[step] && (
          <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-3">
            Please complete all required fields in this section to continue.
          </p>
        )}
      </div>
    </div>
  );
}

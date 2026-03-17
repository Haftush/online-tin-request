import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClientHeader } from "@/components/ClientHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup } from "@/components/registration/FieldGroup";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Building2,
  Users,
  MapPin,
  Briefcase,
  UserCheck,
  Shield,
  FileText,
  ClipboardCheck,
  Upload,
  X,
  File,
  Eye,
  CheckCircle,
  Calendar,
  Percent,
  Repeat,
  Landmark,
  UserCircle,
  Plus,
  Trash2,
  Globe,
  Phone,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ========== Constants ==========
const COUNTRIES = [
  "Ethiopia",
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

const ETHIOPIAN_BANKS = [
  "Commercial Bank of Ethiopia",
  "Awash Bank",
  "Dashen Bank",
  "Bank of Abyssinia",
  "Wegagen Bank",
  "United Bank",
  "Nib International Bank",
  "Cooperative Bank of Oromia",
  "Lion International Bank",
  "Zemen Bank",
  "Oromia International Bank",
  "Bunna International Bank",
  "Berhan International Bank",
  "Abay Bank",
  "Enat Bank",
  "Debub Global Bank",
  "Other",
];

const ACCOUNT_TYPES = ["Savings", "Current", "Fixed Deposit", "Transaction"];

const SECTORS = [
  "IT",
  "Manufacturing",
  "Finance",
  "Agriculture",
  "Construction",
  "Retail",
  "Telecom",
  "Education",
  "Health",
  "Transport",
  "Hospitality",
  "Other",
];

const STEPS = [
  {
    label: "Organization / ድርጅት",
    icon: Building2,
    description: "Type & Basic Details",
  },
  {
    label: "Address & Contact / አድራሻ",
    icon: MapPin,
    description: "Location & Contact Info",
  },
  {
    label: "Business & Tax / ንግድ እና ግብር",
    icon: Briefcase,
    description: "Activities & Obligations",
  },
  {
    label: "Review & Submit / ማረጋገጥ",
    icon: ClipboardCheck,
    description: "Final Review",
  },
];

const ORG_TYPES = [
  "Governmental Agency / የመንግስት ተቋም",
  "NGO / መንግስታዊ ያልሆነ ድርጅት",
  "Embassy / ኤምባሲ",
  "Religious Organization / ሃይማኖታዊ ድርጅት",
  "Private Company / የግል ድርጅት",
  "Sole Proprietorship / የግል ንግድ",
  "Partnership / ሽርክና",
  "Other / ሌላ",
];

const REGIONS = [
  "Addis Ababa / አዲስ አበባ",
  "Afar / አፋር",
  "Amhara / አማራ",
  "Benishangul-Gumuz / ቤኒሻንጉል ጉሙዝ",
  "Dire Dawa / ድሬ ዳዋ",
  "Gambella / ጋምቤላ",
  "Harari / ሐረሪ",
  "Oromia / ኦሮሚያ",
  "Sidama / ሲዳማ",
  "Somali / ሶማሌ",
  "SNNPR / ደቡብ ብሔሮች",
  "South West Ethiopia / ደቡብ ምዕራብ",
  "Tigray / ትግራይ",
];

const RESIDENCY_STATUS = [
  "Resident / ነዋሪ",
  "Non-Resident / ነዋሪ ያልሆነ",
  "Foreign / የውጭ",
];

// ========== Reusable Components ==========

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
        <span className="text-muted-foreground">Applicaion No/ የጉዳይ ቁጥር: </span>
        <span className="font-bold text-primary">MOR-{caseNumber}</span>
      </div>
    </div>
  );
}

// Document Upload Component
function DocumentUpload({
  label,
  onFileChange,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5,
}: {
  label: string;
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`);
      return;
    }
    setFile(file);
    onFileChange(file);
    toast.success(`${label} uploaded successfully`);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-foreground/80">{label}</Label>
      <div
        className={cn(
          "relative border-2 border-dashed rounded-xl transition-all duration-200",
          dragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/40",
          file ? "bg-muted/20" : "bg-muted/5",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {file ? (
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <File className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(URL.createObjectURL(file), "_blank");
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground mb-1">
              Drop your file here or{" "}
              <span className="text-primary">browse</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Supports: PDF, JPG, PNG (Max {maxSize}MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Section Header
function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle?: string;
}) {
  return (
    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      {title}
      {subtitle && (
        <span className="text-xs text-muted-foreground font-normal">
          ({subtitle})
        </span>
      )}
    </h3>
  );
}

// Yes/No Radio Group
function YesNoRadio({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (val: boolean) => void;
  label: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-foreground/80">{label}</Label>
      <div className="flex gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={value === true}
            onChange={() => onChange(true)}
            className="h-4 w-4 text-primary"
          />
          <span className="text-sm">Yes / አዎ</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={value === false}
            onChange={() => onChange(false)}
            className="h-4 w-4 text-primary"
          />
          <span className="text-sm">No / አይ</span>
        </label>
      </div>
    </div>
  );
}

// ========== Main Component ==========
export default function DomesticRegistrationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Generate case number (format: MOR-DOM-YYYY-XXXXX)
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(5, "0");
  const caseNumber = `${year}-${randomNum}`;

  const [form, setForm] = useState({
    // Organization Details
    orgType: "",
    subType: "",
    registeredName: "",
    registeredNameAm: "",
    registrationNumber: "",
    registrationDate: "",

    // Enterprise Details (New)
    fiscalYearStart: "",
    fiscalYearEnd: "",
    numberOfEmployees: "",
    initialCapital: "",
    residencyStatus: "",

    // Parent Details (New)
    parentTin: "",
    parentName: "",
    parentCountry: "",
    parentAddress: "",
    parentPhone: "",
    parentEmail: "",

    // Address
    region: "",
    city: "",
    subCity: "",
    woreda: "",
    kebele: "",
    houseNo: "",
    landmark: "",
    poBox: "",

    // Contact
    phone1: "",
    phone2: "",
    email: "",
    email2: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",

    // Business Activities (New - Array)
    businessActivities: [
      {
        activities: "",
        sector: "",
        subgroup: "",
        startDate: "",
        group: "",
        majorGroup: "",
        division: "",
        majorDivision: "",
      },
    ],

    // Bank Account Details (New - Array)
    bankDetails: [
      {
        accountType: "",
        localBank: "",
        internationalBankName: "",
        bankCountry: "",
        bankAddress: "",
        accountNumber: "",
        accountHolder: "",
        mainAccount: false,
        currency: "ETB",
      },
    ],

    // Tax Agent (New)
    hasTaxAgent: false,
    taxAgent: {
      tin: "",
      name: "",
      startDate: "",
      formattedStartDate: "",
      licenseNo: "",
      professionalNo: "",
    },

    // Tax Auditor (New)
    hasTaxAuditor: false,
    taxAuditor: {
      tin: "",
      name: "",
      startDate: "",
      formattedStartDate: "",
      aabeRegistrationNo: "",
      professionalNo: "",
    },

    // Management - Managers (New)
    managers: [
      {
        tin: "",
        name: "",
        startDate: "",
      },
    ],

    // Directors (New)
    directors: [
      {
        tin: "",
        name: "",
        startDate: "",
      },
    ],

    // Tax Obligations
    incomeTax: false,
    vat: false,
    tot: false,
    withholdingTax: false,
    exciseTax: false,
    pensionContribution: false,

    // Certification
    certifierName: "",
    certifierPosition: "",
    certifiedDate: "",
    certified: false,

    // Documents
    documents: {} as Record<string, File | null>,
  });

  const update = (field: string, value: any) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const updateNested = (parent: string, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [parent]: { ...prev[parent as keyof typeof prev], [field]: value },
    }));
  };

  const updateArray = (
    arrayName: string,
    index: number,
    field: string,
    value: any,
  ) => {
    setForm((prev) => {
      const array = [...(prev[arrayName as keyof typeof prev] as any[])];
      array[index] = { ...array[index], [field]: value };
      return { ...prev, [arrayName]: array };
    });
  };

  const addArrayItem = (arrayName: string, newItem: any) => {
    setForm((prev) => ({
      ...prev,
      [arrayName]: [
        ...(prev[arrayName as keyof typeof prev] as any[]),
        newItem,
      ],
    }));
  };

  const removeArrayItem = (arrayName: string, index: number) => {
    setForm((prev) => {
      const array = [...(prev[arrayName as keyof typeof prev] as any[])];
      if (array.length > 1) {
        array.splice(index, 1);
        return { ...prev, [arrayName]: array };
      }
      return prev;
    });
  };

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!form.certified) {
      toast.error("Please certify the declaration before submitting.");
      return;
    }
    setSubmitted(true);
    toast.success("Application submitted successfully!");
  };

  const handleDocumentUpload = (docName: string, file: File | null) => {
    update("documents", { ...form.documents, [docName]: file });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <ClientHeader />
        <div className="container max-w-lg py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">
              ማመልከቻ ቀርቧል!
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Application Submitted!
            </p>
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-8 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-3">
                Your application tracking number / የጉዳይ ቁጥር
              </p>
              <p className="font-mono text-3xl font-bold text-primary mb-2">
                MOR-{caseNumber}
              </p>
              <p className="text-xs text-muted-foreground">
                Save this number to track your application status
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="min-w-[140px]"
              >
                Back to Home
              </Button>
              <Button
                variant="hero"
                onClick={() => navigate("/track")}
                className="min-w-[140px]"
              >
                Track Application
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <ClientHeader />
      <div className="container max-w-5xl py-6 sm:py-8 md:py-10 px-4 sm:px-6">
        {/* Header with Case Number */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Taxpayer Registration
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                የግብር ከፋይ ምዝገባ
              </p>
            </div>
            <CaseNumberDisplay caseNumber={caseNumber} />
          </div>
        </div>

        {/* Step Indicator */}
        <div className="mb-8">
          <StepIndicator steps={STEPS.map((s) => s.label)} currentStep={step} />
        </div>

        {/* Main Form Card */}
        <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl">
          {/* Step Header */}
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
              {(() => {
                const Icon = STEPS[step].icon;
                return <Icon className="h-6 w-6 text-primary-foreground" />;
              })()}
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                {STEPS[step].label}
              </h2>
              <p className="text-sm text-muted-foreground">
                {STEPS[step].description} • Step {step + 1} of {STEPS.length}
              </p>
            </div>
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="min-h-[400px]"
            >
              {step === 0 && (
                <Step1Organization
                  form={form}
                  update={update}
                  updateNested={updateNested}
                  onDocumentUpload={handleDocumentUpload}
                />
              )}
              {step === 1 && (
                <Step2AddressContact form={form} update={update} />
              )}
              {step === 2 && (
                <Step3BusinessTax
                  form={form}
                  update={update}
                  updateNested={updateNested}
                  updateArray={updateArray}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                />
              )}
              {step === 3 && (
                <Step4ReviewSubmit
                  form={form}
                  update={update}
                  caseNumber={caseNumber}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={prev}
              disabled={step === 0}
              className="gap-2 min-w-[120px]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>

            {step < STEPS.length - 1 ? (
              <Button
                variant="hero"
                onClick={next}
                className="gap-2 min-w-[120px] group"
              >
                Continue
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            ) : (
              <Button
                variant="gold"
                onClick={handleSubmit}
                className="gap-2 min-w-[160px]"
                size="lg"
              >
                Submit Application <CheckCircle2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Complete all steps to submit your registration
          </p>
        </div>
      </div>
    </div>
  );
}

// ========== Step 1: Organization ==========
function Step1Organization({
  form,
  update,
  updateNested,
  onDocumentUpload,
}: any) {
  return (
    <div className="space-y-8">
      {/* Taxpayer Type */}
      <div className="space-y-4">
        <SectionHeader icon={Building2} title="Taxpayer Type / የግብር ከፋይ አይነት" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldGroup label="Organization Type *" hint="የድርጅት አይነት">
            <Select
              value={form.orgType}
              onValueChange={(v) => update("orgType", v)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                {ORG_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup label="Sub Type" hint="ንዑስ አይነት">
            <Input
              placeholder="e.g., PLC, Share Company"
              value={form.subType}
              onChange={(e) => update("subType", e.target.value)}
              className="h-11"
            />
          </FieldGroup>
        </div>
      </div>

      {/* Basic Details */}
      <div className="space-y-4">
        <SectionHeader icon={FileText} title="Basic Details / መሰረታዊ መረጃዎች" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldGroup label="Registered Name *" hint="ህጋዊ ስም">
            <Input
              placeholder="Official registered name"
              className="h-11 uppercase"
              value={form.registeredName}
              onChange={(e) =>
                update("registeredName", e.target.value.toUpperCase())
              }
            />
          </FieldGroup>
          <FieldGroup label="የድርጅቱ ህጋዊ ስም" hint="Name in Amharic">
            <Input
              placeholder="በአማርኛ ስም"
              className="h-11"
              value={form.registeredNameAm}
              onChange={(e) => update("registeredNameAm", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Registration Number *" hint="የምዝገባ ቁጥር">
            <Input
              placeholder="e.g., BBF-12345"
              className="h-11"
              value={form.registrationNumber}
              onChange={(e) => update("registrationNumber", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Registration Date *" hint="የምዝገባ ቀን">
            <Input
              type="date"
              className="h-11"
              value={form.registrationDate}
              onChange={(e) => update("registrationDate", e.target.value)}
            />
          </FieldGroup>
        </div>
      </div>

      {/* Document Uploads */}
      <div className="space-y-4">
        <SectionHeader icon={Upload} title="Required Documents / አስፈላጊ ሰነዶች" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DocumentUpload
            label="Registration Certificate"
            onFileChange={(file) => onDocumentUpload("certificate", file)}
          />
          <DocumentUpload
            label="Memorandum of Association"
            onFileChange={(file) => onDocumentUpload("memorandum", file)}
          />
          <DocumentUpload
            label="Other Documents"
            onFileChange={(file) => onDocumentUpload("other", file)}
          />
        </div>
      </div>
    </div>
  );
}

// ========== Step 2: Address & Contact ==========
function Step2AddressContact({ form, update }: any) {
  return (
    <div className="space-y-8">
      {/* Physical Address */}
      <div className="space-y-4">
        <SectionHeader icon={MapPin} title="Physical Address / አድራሻ" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FieldGroup label="Region *" hint="ክልል">
            <Select
              value={form.region}
              onValueChange={(v) => update("region", v)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup label="City *" hint="ከተማ">
            <Input
              placeholder="City name"
              className="h-11"
              value={form.city}
              onChange={(e) => update("city", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Sub City" hint="ክፍለ ከተማ">
            <Input
              placeholder="Sub city"
              className="h-11"
              value={form.subCity}
              onChange={(e) => update("subCity", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Woreda" hint="ወረዳ">
            <Input
              placeholder="Woreda"
              className="h-11"
              value={form.woreda}
              onChange={(e) => update("woreda", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Kebele" hint="ቀበሌ">
            <Input
              placeholder="Kebele"
              className="h-11"
              value={form.kebele}
              onChange={(e) => update("kebele", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="House/Building No" hint="ቤት ቁጥር">
            <Input
              placeholder="House number"
              className="h-11"
              value={form.houseNo}
              onChange={(e) => update("houseNo", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Landmark Building" hint="ምልክት">
            <Input
              placeholder="Commonly known building"
              className="h-11"
              value={form.landmark}
              onChange={(e) => update("landmark", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="P.O. Box" hint="ፖ.ሣ.ቁ">
            <Input
              placeholder="P.O. Box"
              className="h-11"
              value={form.poBox}
              onChange={(e) => update("poBox", e.target.value)}
            />
          </FieldGroup>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <SectionHeader icon={Phone} title="Contact Details / የመገኛ መረጃ" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FieldGroup label="Primary Phone *" hint="ስልክ">
            <Input
              placeholder="+251 91 234 5678"
              className="h-11"
              value={form.phone1}
              onChange={(e) => update("phone1", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Alternative Phone" hint="ስልክ 2">
            <Input
              placeholder="+251 91 234 5678"
              className="h-11"
              value={form.phone2}
              onChange={(e) => update("phone2", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Primary Email *" hint="ኢሜይል">
            <Input
              type="email"
              placeholder="email@example.com"
              className="h-11"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Alternative Email" hint="ኢሜይል 2">
            <Input
              type="email"
              placeholder="email@example.com"
              className="h-11"
              value={form.email2}
              onChange={(e) => update("email2", e.target.value)}
            />
          </FieldGroup>
        </div>
      </div>

      {/* Electronic Address */}
      <div className="space-y-4">
        <SectionHeader icon={Globe} title="Electronic Address / ኤሌክትሮኒክ አድራሻ" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FieldGroup label="Website">
            <Input
              placeholder="https://example.com"
              className="h-11"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Facebook">
            <Input
              placeholder="Facebook URL"
              className="h-11"
              value={form.facebook}
              onChange={(e) => update("facebook", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="LinkedIn">
            <Input
              placeholder="LinkedIn URL"
              className="h-11"
              value={form.linkedin}
              onChange={(e) => update("linkedin", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Instagram">
            <Input
              placeholder="Instagram URL"
              className="h-11"
              value={form.instagram}
              onChange={(e) => update("instagram", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Twitter/X">
            <Input
              placeholder="Twitter URL"
              className="h-11"
              value={form.twitter}
              onChange={(e) => update("twitter", e.target.value)}
            />
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}

// ========== Step 3: Business & Tax ==========
function Step3BusinessTax({
  form,
  update,
  updateNested,
  updateArray,
  addArrayItem,
  removeArrayItem,
}: any) {
  return (
    <div className="space-y-8">
      {/* Enterprise Details */}
      <div className="space-y-4">
        <SectionHeader
          icon={Building2}
          title="Enterprise Details / የድርጅት ዝርዝሮች"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FieldGroup
            label="Fiscal Year Start (DMM or DDMM)"
            hint="የግብር አመት መጀመሪያ"
          >
            <Input
              placeholder="e.g., 0107"
              className="h-11"
              value={form.fiscalYearStart}
              onChange={(e) => update("fiscalYearStart", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup
            label="Fiscal Year End (DMM or DDMM)"
            hint="የግብር አመት መጨረሻ"
          >
            <Input
              placeholder="e.g., 3006"
              className="h-11"
              value={form.fiscalYearEnd}
              onChange={(e) => update("fiscalYearEnd", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Number of Employees" hint="የሰራተኞች ብዛት">
            <Input
              type="number"
              placeholder="e.g., 50"
              className="h-11"
              value={form.numberOfEmployees}
              onChange={(e) => update("numberOfEmployees", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Initial Capital" hint="የመነሻ ካፒታል">
            <Input
              type="number"
              placeholder="e.g., 1000000"
              className="h-11"
              value={form.initialCapital}
              onChange={(e) => update("initialCapital", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Residency Status" hint="ነዋሪነት">
            <Select
              value={form.residencyStatus}
              onValueChange={(v) => update("residencyStatus", v)}
            >
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {RESIDENCY_STATUS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldGroup>
        </div>
      </div>

      {/* Parent Details */}
      <div className="space-y-4">
        <SectionHeader icon={Repeat} title="Parent Details / የወላጅ ድርጅት ዝርዝሮች" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FieldGroup label="Parent TIN/PIN" hint="የወላጅ ቲን">
            <Input
              placeholder="Parent TIN"
              className="h-11 uppercase"
              value={form.parentTin}
              onChange={(e) =>
                update("parentTin", e.target.value.toUpperCase())
              }
            />
          </FieldGroup>
          <FieldGroup label="Parent Name" hint="የወላጅ ስም">
            <Input
              placeholder="Parent company name"
              className="h-11 uppercase"
              value={form.parentName}
              onChange={(e) =>
                update("parentName", e.target.value.toUpperCase())
              }
            />
          </FieldGroup>
          <FieldGroup label="Country/Jurisdiction" hint="ሀገር">
            <Select
              value={form.parentCountry}
              onValueChange={(v) => update("parentCountry", v)}
            >
              <SelectTrigger className="h-11">
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
          <FieldGroup label="Parent Address" hint="አድራሻ">
            <Input
              placeholder="Full address"
              className="h-11 uppercase"
              value={form.parentAddress}
              onChange={(e) =>
                update("parentAddress", e.target.value.toUpperCase())
              }
            />
          </FieldGroup>
          <FieldGroup label="Parent Telephone No." hint="ስልክ ቁጥር">
            <Input
              placeholder="+251 91 234 5678"
              className="h-11"
              value={form.parentPhone}
              onChange={(e) => update("parentPhone", e.target.value)}
            />
          </FieldGroup>
          <FieldGroup label="Parent Email" hint="ፓርንት ኢሜል">
            <Input
              type="email"
              placeholder="parent@example.com"
              className="h-11"
              value={form.parentEmail}
              onChange={(e) => update("parentEmail", e.target.value)}
            />
          </FieldGroup>
        </div>
      </div>

      {/* Business Activities */}
      <div className="space-y-4">
        <SectionHeader
          icon={Briefcase}
          title="Business Activities / የስራ ወይም ንግድ"
        />
        <div className="space-y-3">
          {form.businessActivities.map((activity: any, i: number) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-muted/20 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase">
                  Activity {i + 1}
                </span>
                {form.businessActivities.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem("businessActivities", i)}
                    className="h-7 w-7 p-0"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FieldGroup label="Business Activities" required>
                  <Input
                    placeholder="Describe activity"
                    className="h-11 uppercase"
                    value={activity.activities}
                    onChange={(e) =>
                      updateArray(
                        "businessActivities",
                        i,
                        "activities",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Sector">
                  <Select
                    value={activity.sector}
                    onValueChange={(v) =>
                      updateArray("businessActivities", i, "sector", v)
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {SECTORS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Subgroup">
                  <Input
                    placeholder="Subgroup"
                    className="h-11 uppercase"
                    value={activity.subgroup}
                    onChange={(e) =>
                      updateArray(
                        "businessActivities",
                        i,
                        "subgroup",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Start Date">
                  <Input
                    type="date"
                    className="h-11"
                    value={activity.startDate}
                    onChange={(e) =>
                      updateArray(
                        "businessActivities",
                        i,
                        "startDate",
                        e.target.value,
                      )
                    }
                  />
                </FieldGroup>

                <FieldGroup label="Group">
                  <Input
                    placeholder="Group"
                    className="h-11 uppercase"
                    value={activity.group}
                    onChange={(e) =>
                      updateArray(
                        "businessActivities",
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
                    className="h-11 uppercase"
                    value={activity.majorGroup}
                    onChange={(e) =>
                      updateArray(
                        "businessActivities",
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
                    className="h-11 uppercase"
                    value={activity.division}
                    onChange={(e) =>
                      updateArray(
                        "businessActivities",
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
                    className="h-11 uppercase"
                    value={activity.majorDivision}
                    onChange={(e) =>
                      updateArray(
                        "businessActivities",
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
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              addArrayItem("businessActivities", {
                activities: "",
                sector: "",
                subgroup: "",
                startDate: "",
                formattedDate: "",
                group: "",
                majorGroup: "",
                division: "",
                majorDivision: "",
              })
            }
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Business Activity
          </Button>
        </div>
      </div>

      {/* Bank Account Details */}
      <div className="space-y-4">
        <SectionHeader
          icon={Landmark}
          title="Bank Account Details / የባንክ አካውንት ዝርዝሮች"
        />
        <div className="space-y-3">
          {form.bankDetails.map((bank: any, i: number) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-muted/20 p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-muted-foreground uppercase">
                  Account {i + 1}
                </span>
                {form.bankDetails.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem("bankDetails", i)}
                    className="h-7 w-7 p-0"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FieldGroup label="Account Type" required>
                  <Select
                    value={bank.accountType}
                    onValueChange={(v) =>
                      updateArray("bankDetails", i, "accountType", v)
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACCOUNT_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Local Bank" required>
                  <Select
                    value={bank.localBank}
                    onValueChange={(v) =>
                      updateArray("bankDetails", i, "localBank", v)
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {ETHIOPIAN_BANKS.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="International Bank Name">
                  <Input
                    placeholder="International bank"
                    className="h-11 uppercase"
                    value={bank.internationalBankName}
                    onChange={(e) =>
                      updateArray(
                        "bankDetails",
                        i,
                        "internationalBankName",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Bank Country">
                  <Select
                    value={bank.bankCountry}
                    onValueChange={(v) =>
                      updateArray("bankDetails", i, "bankCountry", v)
                    }
                  >
                    <SelectTrigger className="h-11">
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
                <FieldGroup label="Bank Address" required>
                  <Input
                    placeholder="Bank address"
                    className="h-11 uppercase"
                    value={bank.bankAddress}
                    onChange={(e) =>
                      updateArray(
                        "bankDetails",
                        i,
                        "bankAddress",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Account Number" required>
                  <Input
                    placeholder="Account number"
                    className="h-11"
                    value={bank.accountNumber}
                    onChange={(e) =>
                      updateArray(
                        "bankDetails",
                        i,
                        "accountNumber",
                        e.target.value,
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Account Holder" required>
                  <Input
                    placeholder="Account holder name"
                    className="h-11 uppercase"
                    value={bank.accountHolder}
                    onChange={(e) =>
                      updateArray(
                        "bankDetails",
                        i,
                        "accountHolder",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Main Account?">
                  <div className="flex items-center h-11">
                    <Checkbox
                      checked={bank.mainAccount}
                      onCheckedChange={(v) =>
                        updateArray("bankDetails", i, "mainAccount", v)
                      }
                    />
                  </div>
                </FieldGroup>
                <FieldGroup label="Currency" required>
                  <Select
                    value={bank.currency}
                    onValueChange={(v) =>
                      updateArray("bankDetails", i, "currency", v)
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ETB">ETB - Ethiopian Birr</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              addArrayItem("bankDetails", {
                accountType: "",
                localBank: "",
                internationalBankName: "",
                bankCountry: "",
                bankAddress: "",
                accountNumber: "",
                accountHolder: "",
                mainAccount: false,
                currency: "ETB",
              })
            }
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Bank Account
          </Button>
        </div>
      </div>

      {/* Agent & Auditor */}
      <div className="space-y-4">
        <SectionHeader
          icon={UserCircle}
          title="Agent & Auditor / የታክስ ወኪል እና ኦዲተር"
        />

        {/* Tax Agent */}
        <div className="rounded-lg border border-border p-4">
          <YesNoRadio
            label="Do you have tax agents? / የታክስ ወኪል አለዎት?"
            value={form.hasTaxAgent}
            onChange={(v) => update("hasTaxAgent", v)}
          />

          {form.hasTaxAgent && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldGroup label="Agent TIN" required>
                <Input
                  placeholder="TIN"
                  className="h-11 uppercase"
                  value={form.taxAgent.tin}
                  onChange={(e) =>
                    updateNested(
                      "taxAgent",
                      "tin",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              </FieldGroup>
              <FieldGroup label="Agent Name" required>
                <Input
                  placeholder="Full name"
                  className="h-11 uppercase"
                  value={form.taxAgent.name}
                  onChange={(e) =>
                    updateNested(
                      "taxAgent",
                      "name",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              </FieldGroup>
              <FieldGroup label="Start Date" required>
                <Input
                  type="date"
                  className="h-11"
                  value={form.taxAgent.startDate}
                  onChange={(e) =>
                    updateNested("taxAgent", "startDate", e.target.value)
                  }
                />
              </FieldGroup>

              <FieldGroup
                label="Ministry of Revenue Tax Agent License No"
                required
              >
                <Input
                  placeholder="License number"
                  className="h-11 uppercase"
                  value={form.taxAgent.licenseNo}
                  onChange={(e) =>
                    updateNested(
                      "taxAgent",
                      "licenseNo",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              </FieldGroup>
              <FieldGroup label="Professional Association / Professional No">
                <Input
                  placeholder="Professional number"
                  className="h-11 uppercase"
                  value={form.taxAgent.professionalNo}
                  onChange={(e) =>
                    updateNested(
                      "taxAgent",
                      "professionalNo",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              </FieldGroup>
            </div>
          )}
        </div>

        {/* Tax Auditor */}
        <div className="rounded-lg border border-border p-4">
          <YesNoRadio
            label="Do you have tax auditors? / የታክስ ኦዲተር አለዎት?"
            value={form.hasTaxAuditor}
            onChange={(v) => update("hasTaxAuditor", v)}
          />

          {form.hasTaxAuditor && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FieldGroup label="Auditor TIN" required>
                <Input
                  placeholder="TIN"
                  className="h-11 uppercase"
                  value={form.taxAuditor.tin}
                  onChange={(e) =>
                    updateNested(
                      "taxAuditor",
                      "tin",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              </FieldGroup>
              <FieldGroup label="Auditor Name" required>
                <Input
                  placeholder="Full name"
                  className="h-11 uppercase"
                  value={form.taxAuditor.name}
                  onChange={(e) =>
                    updateNested(
                      "taxAuditor",
                      "name",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              </FieldGroup>
              <FieldGroup label="Start Date" required>
                <Input
                  type="date"
                  className="h-11"
                  value={form.taxAuditor.startDate}
                  onChange={(e) =>
                    updateNested("taxAuditor", "startDate", e.target.value)
                  }
                />
              </FieldGroup>

              <FieldGroup
                label="Accounting and Auditing Board of Ethiopia Registration No"
                required
              >
                <Input
                  placeholder="AABE registration number"
                  className="h-11 uppercase"
                  value={form.taxAuditor.aabeRegistrationNo}
                  onChange={(e) =>
                    updateNested(
                      "taxAuditor",
                      "aabeRegistrationNo",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              </FieldGroup>
              <FieldGroup label="Professional Association / Professional No">
                <Input
                  placeholder="Professional number"
                  className="h-11 uppercase"
                  value={form.taxAuditor.professionalNo}
                  onChange={(e) =>
                    updateNested(
                      "taxAuditor",
                      "professionalNo",
                      e.target.value.toUpperCase(),
                    )
                  }
                />
              </FieldGroup>
            </div>
          )}
        </div>
      </div>

      {/* Management */}
      <div className="space-y-4">
        <SectionHeader icon={Users} title="Management / የድርጅት አስተዳደር" />

        {/* Managers */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            Manager Details
          </h4>
          {form.managers.map((manager: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-muted/20 border border-border"
            >
              <FieldGroup label="Manager TIN">
                <Input
                  placeholder="TIN"
                  value={manager.tin}
                  onChange={(e) => {
                    const updated = [...form.managers];
                    updated[i] = { ...updated[i], tin: e.target.value };
                    update("managers", updated);
                  }}
                  className="h-10 uppercase"
                />
              </FieldGroup>
              <FieldGroup label="Manager Name">
                <Input
                  placeholder="Full name"
                  value={manager.name}
                  onChange={(e) => {
                    const updated = [...form.managers];
                    updated[i] = { ...updated[i], name: e.target.value };
                    update("managers", updated);
                  }}
                  className="h-10 uppercase"
                />
              </FieldGroup>
              <FieldGroup label="Start Date">
                <Input
                  type="date"
                  value={manager.startDate}
                  onChange={(e) => {
                    const updated = [...form.managers];
                    updated[i] = { ...updated[i], startDate: e.target.value };
                    update("managers", updated);
                  }}
                  className="h-10"
                />
              </FieldGroup>
            </div>
          ))}
        </div>

        {/* Directors */}
        <div className="space-y-3 mt-4">
          <h4 className="text-sm font-medium text-foreground">
            Directors Details
          </h4>
          {form.directors.map((director: any, i: number) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-muted/20 border border-border"
            >
              <FieldGroup label="Director TIN">
                <Input
                  placeholder="TIN"
                  value={director.tin}
                  onChange={(e) => {
                    const updated = [...form.directors];
                    updated[i] = { ...updated[i], tin: e.target.value };
                    update("directors", updated);
                  }}
                  className="h-10 uppercase"
                />
              </FieldGroup>
              <FieldGroup label="Director Name">
                <Input
                  placeholder="Full name"
                  value={director.name}
                  onChange={(e) => {
                    const updated = [...form.directors];
                    updated[i] = { ...updated[i], name: e.target.value };
                    update("directors", updated);
                  }}
                  className="h-10 uppercase"
                />
              </FieldGroup>
              <FieldGroup label="Start Date">
                <Input
                  type="date"
                  value={director.startDate}
                  onChange={(e) => {
                    const updated = [...form.directors];
                    updated[i] = { ...updated[i], startDate: e.target.value };
                    update("directors", updated);
                  }}
                  className="h-10"
                />
              </FieldGroup>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              update("directors", [
                ...form.directors,
                { tin: "", name: "", startDate: "" },
              ])
            }
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Add Director
          </Button>
        </div>
      </div>

      {/* Tax Obligations */}
      <div className="space-y-4">
        <SectionHeader icon={Shield} title="Tax Obligations / የግብር ግዴታዎች" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { key: "incomeTax", label: "Income Tax / የገቢ ግብር" },
            { key: "vat", label: "VAT / ተ.ታ.ግ" },
            { key: "tot", label: "Turnover Tax / ተርን ኦቨር ታክስ" },
            { key: "withholdingTax", label: "Withholding Tax / ቅድመ ግብር" },
            { key: "exciseTax", label: "Excise Tax / ኤክሳይዝ ታክስ" },
            { key: "pensionContribution", label: "Pension / ጡረታ" },
          ].map((o) => (
            <label
              key={o.key}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer",
                form[o.key]
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 bg-muted/10",
              )}
            >
              <Checkbox
                checked={form[o.key] || false}
                onCheckedChange={(v) => update(o.key, v)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm font-medium text-foreground">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== Step 4: Review & Submit ==========
function Step4ReviewSubmit({ form, update, caseNumber }: any) {
  const sections = [
    {
      title: "Organization Details",
      icon: Building2,
      items: [
        { label: "Type", value: form.orgType },
        { label: "Name", value: form.registeredName },
        { label: "Registration No", value: form.registrationNumber },
        { label: "Registration Date", value: form.registrationDate },
      ],
    },
    {
      title: "Address & Contact",
      icon: MapPin,
      items: [
        { label: "Region", value: form.region },
        { label: "City", value: form.city },
        { label: "Phone", value: form.phone1 },
        { label: "Email", value: form.email },
      ],
    },
    {
      title: "Enterprise Details",
      icon: Building2,
      items: [
        { label: "Fiscal Year Start", value: form.fiscalYearStart },
        { label: "Fiscal Year End", value: form.fiscalYearEnd },
        { label: "Employees", value: form.numberOfEmployees },
        { label: "Residency", value: form.residencyStatus },
      ],
    },
    {
      title: "Parent Details",
      icon: Repeat,
      items: [
        { label: "Parent Name", value: form.parentName },
        { label: "Parent TIN", value: form.parentTin },
        { label: "Parent Country", value: form.parentCountry },
        form.parentEmail
          ? { label: "Parent Email", value: form.parentEmail }
          : null,
      ].filter(Boolean),
    },
    {
      title: "Business Activities",
      icon: Briefcase,
      items: form.businessActivities.map((a: any, i: number) => ({
        label: `Activity ${i + 1}`,
        value: a.activities || "Not specified",
      })),
    },
    {
      title: "Bank Accounts",
      icon: Landmark,
      items: form.bankDetails.map((b: any, i: number) => ({
        label: `Account ${i + 1}`,
        value: `${b.localBank || "Bank"} - ${b.accountNumber || "No number"} ${b.mainAccount ? "(Main)" : ""}`,
      })),
    },
    {
      title: "Agent & Auditor",
      icon: UserCircle,
      items: [
        form.hasTaxAgent
          ? { label: "Tax Agent", value: form.taxAgent.name || "Selected" }
          : null,
        form.hasTaxAuditor
          ? { label: "Tax Auditor", value: form.taxAuditor.name || "Selected" }
          : null,
      ].filter(Boolean),
    },
    {
      title: "Management",
      icon: Users,
      items: [
        { label: "Managers", value: `${form.managers.length}` },
        { label: "Directors", value: `${form.directors.length}` },
      ],
    },
    {
      title: "Tax Obligations",
      icon: Shield,
      items: [
        {
          label: "Selected",
          value:
            Object.entries(form).filter(
              ([k, v]) =>
                [
                  "incomeTax",
                  "vat",
                  "tot",
                  "withholdingTax",
                  "exciseTax",
                  "pensionContribution",
                ].includes(k) && v,
            ).length + " obligations",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Case Number Display */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20">
        <p className="text-sm text-muted-foreground mb-1">
          Application No / የጉዳይ ቁጥር
        </p>
        <p className="font-mono text-2xl font-bold text-primary">
          MOR-{caseNumber}
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-muted/10 p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <section.icon className="h-4 w-4 text-primary" />
              </div>
              <h4 className="font-medium text-sm text-foreground">
                {section.title}
              </h4>
            </div>
            <div className="space-y-2">
              {section.items.map(
                (item: any, j: number) =>
                  item && (
                    <div key={j} className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        {item.label}:
                      </span>
                      <span className="font-medium text-foreground truncate max-w-[120px]">
                        {item.value || "—"}
                      </span>
                    </div>
                  ),
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Declaration */}
      <div className="rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 space-y-4">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Declaration / ማረጋገጫ
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FieldGroup label="Certifier Full Name *" hint="ሙሉ ስም">
            <Input
              placeholder="Enter your full name"
              className="h-11 uppercase"
              value={form.certifierName}
              onChange={(e) =>
                update("certifierName", e.target.value.toUpperCase())
              }
            />
          </FieldGroup>
          <FieldGroup label="Position *" hint="ስልጣን">
            <Input
              placeholder="Your position in organization"
              className="h-11 uppercase"
              value={form.certifierPosition}
              onChange={(e) =>
                update("certifierPosition", e.target.value.toUpperCase())
              }
            />
          </FieldGroup>
          <FieldGroup label="Date *" hint="ቀን">
            <Input
              type="date"
              className="h-11"
              value={form.certifiedDate}
              onChange={(e) => update("certifiedDate", e.target.value)}
            />
          </FieldGroup>
        </div>

        <label className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-black/20 cursor-pointer">
          <Checkbox
            checked={form.certified}
            onCheckedChange={(v) => update("certified", v)}
            className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <div className="space-y-1">
            <span className="text-sm font-medium text-foreground">
              I certify that all information provided is true and correct
            </span>
            <p className="text-xs text-muted-foreground">
              የሰጠሁት መረጃ ትክክለኛ እና ሙሉ መሆኑን አረጋግጣለሁ።
            </p>
          </div>
        </label>

        {!form.certified && (
          <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
            <span>⚠</span> You must certify the declaration before submitting
          </p>
        )}
      </div>

      {/* Document Status */}
      <div className="rounded-xl bg-muted/20 p-4">
        <h4 className="text-xs font-medium text-foreground mb-3">
          Uploaded Documents / የተሰቀሉ ሰነዶች
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(form.documents).map(([key, file]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              {file ? (
                <>
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-foreground capitalize">{key}</span>
                </>
              ) : (
                <>
                  <X className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground capitalize">
                    {key} (pending)
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

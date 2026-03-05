import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClientHeader } from "@/components/ClientHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Upload, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const STEPS = ["Business Info", "Contact", "Ownership", "Bank Details", "Activity", "Tax & Docs", "Certify"];

const COUNTRIES = ["United States", "United Kingdom", "China", "India", "Germany", "France", "Japan", "Canada", "Australia", "South Korea", "Brazil", "Kenya", "Nigeria", "South Africa", "UAE", "Other"];

const SOCIAL_PLATFORMS = ["LinkedIn", "Instagram", "X (Twitter)", "TikTok", "Facebook", "Pinterest", "Telegram", "Snapchat", "WeChat"];

export default function RegistrationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Form state (simplified for UI demo)
  const [formData, setFormData] = useState({
    country: "",
    foreignTin: "",
    legalName: "",
    tradingName: "",
    addressLine1: "",
    city: "",
    postcode: "",
    website: "",
    socialMedia: {} as Record<string, string>,
    contactFirstName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
    representationType: "",
    owners: [{ tin: "", country: "", lastName: "", otherNames: "", percentage: "", type: "" }],
    localBanks: [{ name: "", number: "", bank: "", branch: "", currency: "ETB" }],
    activityDescription: "",
    financialYearEnd: "",
    digitalServicesTax: true,
    vatOnForeignSupplies: false,
    certifierName: "",
    certifierPosition: "",
    certified: false,
    documents: {} as Record<string, File | null>,
  });

  const update = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };
  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!formData.certified) {
      toast.error("Please certify the declaration before submitting.");
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
            <h1 className="font-display text-3xl font-bold text-foreground mb-3">Application Submitted!</h1>
            <p className="text-muted-foreground mb-2">Your reference number:</p>
            <p className="font-display text-2xl font-bold text-primary mb-6">MOR-NR-2026-00142</p>
            <p className="text-sm text-muted-foreground mb-8">You will receive a confirmation email with further details. Our officers will review your application and notify you of the outcome.</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={() => navigate("/")}>Back to Home</Button>
              <Button variant="hero" onClick={() => navigate("/track")}>Track Application</Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />
      <div className="container max-w-4xl py-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">Non-Resident Digital Services Registration</h1>
          <p className="text-sm text-muted-foreground">Complete all sections to register for Digital Services Tax and/or VAT in Ethiopia.</p>
        </div>

        <div className="mb-8">
          <StepIndicator steps={STEPS} currentStep={step} />
        </div>

        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 0 && <StepBusiness formData={formData} update={update} />}
              {step === 1 && <StepContact formData={formData} update={update} />}
              {step === 2 && <StepOwnership formData={formData} update={update} />}
              {step === 3 && <StepBank formData={formData} update={update} />}
              {step === 4 && <StepActivity formData={formData} update={update} />}
              {step === 5 && <StepTaxDocs formData={formData} update={update} />}
              {step === 6 && <StepCertify formData={formData} update={update} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={prev} disabled={step === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="hero" onClick={next} className="gap-2">
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="gold" onClick={handleSubmit} size="lg" className="gap-2">
              Submit Application <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Step Components ---

function FieldGroup({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold font-display">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
    </div>
  );
}

function StepBusiness({ formData, update }: any) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Section A: Business Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <FieldGroup label="Foreign Jurisdiction / Country" required>
          <Select value={formData.country} onValueChange={v => update("country", v)}>
            <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
            <SelectContent>
              {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </FieldGroup>
        <FieldGroup label="TIN / Identifier in Foreign Jurisdiction" required>
          <Input placeholder="Enter TIN or Identifier" className="uppercase" value={formData.foreignTin} onChange={e => update("foreignTin", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="Legal Name in Foreign Jurisdiction" required>
          <Input placeholder="Legal business name" className="uppercase" value={formData.legalName} onChange={e => update("legalName", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="Trading Name (Optional)">
          <Input placeholder="Trading name" className="uppercase" value={formData.tradingName} onChange={e => update("tradingName", e.target.value.toUpperCase())} />
        </FieldGroup>
      </div>

      <h3 className="font-display text-base font-bold text-foreground pt-2">Business Address</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <FieldGroup label="Address Line 1" required>
          <Input placeholder="Street address" className="uppercase" value={formData.addressLine1} onChange={e => update("addressLine1", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="City" required>
          <Input placeholder="City" className="uppercase" value={formData.city} onChange={e => update("city", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="Postcode (Optional)">
          <Input placeholder="Postcode" value={formData.postcode} onChange={e => update("postcode", e.target.value)} />
        </FieldGroup>
      </div>

      <h3 className="font-display text-base font-bold text-foreground pt-2">Digital Presence</h3>
      <FieldGroup label="Website" required>
        <Input type="url" placeholder="https://www.example.com" value={formData.website} onChange={e => update("website", e.target.value)} />
      </FieldGroup>
      <div className="grid md:grid-cols-3 gap-3">
        {SOCIAL_PLATFORMS.map(p => (
          <FieldGroup key={p} label={p}>
            <Input
              placeholder={`${p} URL`}
              value={formData.socialMedia[p] || ""}
              onChange={e => update("socialMedia", { ...formData.socialMedia, [p]: e.target.value })}
            />
          </FieldGroup>
        ))}
      </div>
    </div>
  );
}

function StepContact({ formData, update }: any) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Section B: Contact Details</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <FieldGroup label="First Name" required>
          <Input placeholder="First name" className="uppercase" value={formData.contactFirstName} onChange={e => update("contactFirstName", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="Last Name" required>
          <Input placeholder="Last name" className="uppercase" value={formData.contactLastName} onChange={e => update("contactLastName", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="Email Address" required>
          <Input type="email" placeholder="email@example.com" value={formData.contactEmail} onChange={e => update("contactEmail", e.target.value)} />
        </FieldGroup>
        <FieldGroup label="Mobile Phone" required>
          <Input placeholder="+1 234 567 8900" value={formData.contactPhone} onChange={e => update("contactPhone", e.target.value)} />
        </FieldGroup>
        <FieldGroup label="Representation Type">
          <Input placeholder='e.g. "Tax Agent", "Self"' className="uppercase" value={formData.representationType} onChange={e => update("representationType", e.target.value.toUpperCase())} />
        </FieldGroup>
      </div>
    </div>
  );
}

function StepOwnership({ formData, update }: any) {
  const addOwner = () => {
    update("owners", [...formData.owners, { tin: "", country: "", lastName: "", otherNames: "", percentage: "", type: "" }]);
  };
  const removeOwner = (i: number) => {
    if (formData.owners.length > 1) {
      update("owners", formData.owners.filter((_: any, idx: number) => idx !== i));
    }
  };
  const updateOwner = (i: number, field: string, value: string) => {
    const updated = [...formData.owners];
    updated[i] = { ...updated[i], [field]: value };
    update("owners", updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Section F: Ownership / Management Details</h2>
      <p className="text-sm text-muted-foreground">Total ownership percentage must equal 100%.</p>

      <div className="space-y-4">
        {formData.owners.map((owner: any, i: number) => (
          <div key={i} className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold font-display text-foreground">Owner {i + 1}</span>
              {formData.owners.length > 1 && (
                <Button variant="ghost" size="sm" onClick={() => removeOwner(i)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              <FieldGroup label="TIN">
                <Input placeholder="TIN" className="uppercase" value={owner.tin} onChange={e => updateOwner(i, "tin", e.target.value.toUpperCase())} />
              </FieldGroup>
              <FieldGroup label="Country" required>
                <Select value={owner.country} onValueChange={v => updateOwner(i, "country", v)}>
                  <SelectTrigger><SelectValue placeholder="Country" /></SelectTrigger>
                  <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </FieldGroup>
              <FieldGroup label="Last Name" required>
                <Input placeholder="Last name" className="uppercase" value={owner.lastName} onChange={e => updateOwner(i, "lastName", e.target.value.toUpperCase())} />
              </FieldGroup>
              <FieldGroup label="Other Names">
                <Input placeholder="Other names" className="uppercase" value={owner.otherNames} onChange={e => updateOwner(i, "otherNames", e.target.value.toUpperCase())} />
              </FieldGroup>
              <FieldGroup label="Ownership %" required>
                <Input type="number" placeholder="%" min="0" max="100" value={owner.percentage} onChange={e => updateOwner(i, "percentage", e.target.value)} />
              </FieldGroup>
              <FieldGroup label="Type">
                <Select value={owner.type} onValueChange={v => updateOwner(i, "type", v)}>
                  <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
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

      <Button variant="outline" onClick={addOwner} className="gap-2">
        <Plus className="h-4 w-4" /> Add Owner
      </Button>
    </div>
  );
}

function StepBank({ formData, update }: any) {
  const addBank = () => {
    update("localBanks", [...formData.localBanks, { name: "", number: "", bank: "", branch: "", currency: "ETB" }]);
  };
  const updateBank = (i: number, field: string, value: string) => {
    const updated = [...formData.localBanks];
    updated[i] = { ...updated[i], [field]: value };
    update("localBanks", updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Bank Details</h2>
      {formData.localBanks.map((bank: any, i: number) => (
        <div key={i} className="rounded-lg border border-border bg-muted/30 p-4">
          <span className="text-sm font-bold font-display text-foreground mb-3 block">Account {i + 1}</span>
          <div className="grid md:grid-cols-3 gap-3">
            <FieldGroup label="Account Name" required>
              <Input placeholder="Account name" className="uppercase" value={bank.name} onChange={e => updateBank(i, "name", e.target.value.toUpperCase())} />
            </FieldGroup>
            <FieldGroup label="Account Number" required>
              <Input placeholder="Account number" value={bank.number} onChange={e => updateBank(i, "number", e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Bank Name" required>
              <Input placeholder="Bank name" className="uppercase" value={bank.bank} onChange={e => updateBank(i, "bank", e.target.value.toUpperCase())} />
            </FieldGroup>
            <FieldGroup label="Branch">
              <Input placeholder="Branch" className="uppercase" value={bank.branch} onChange={e => updateBank(i, "branch", e.target.value.toUpperCase())} />
            </FieldGroup>
            <FieldGroup label="Currency" required>
              <Select value={bank.currency} onValueChange={v => updateBank(i, "currency", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
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
      <Button variant="outline" onClick={addBank} className="gap-2">
        <Plus className="h-4 w-4" /> Add Bank Account
      </Button>
    </div>
  );
}

function StepActivity({ formData, update }: any) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Business Activity Details</h2>
      <FieldGroup label="Description of Business Activity" required>
        <Textarea
          rows={5}
          placeholder="Describe the digital services you provide to customers in Ethiopia..."
          className="uppercase"
          value={formData.activityDescription}
          onChange={e => update("activityDescription", e.target.value.toUpperCase())}
        />
      </FieldGroup>
      <FieldGroup label="ESIC Code (Ethiopian Standard Industrial Classification)">
        <Select>
          <SelectTrigger><SelectValue placeholder="Select ESIC Section" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="J">J - Information and Communication</SelectItem>
            <SelectItem value="K">K - Financial and Insurance Activities</SelectItem>
            <SelectItem value="M">M - Professional, Scientific and Technical</SelectItem>
          </SelectContent>
        </Select>
      </FieldGroup>
    </div>
  );
}

function StepTaxDocs({ formData, update }: any) {
  const docs = [
    { key: "memo", label: "Memorandum of Association (from country of origin)" },
    { key: "tinCert", label: "TIN or TIN equivalent certificate (foreign jurisdiction)" },
    { key: "incorporation", label: "Certificate of Incorporation / Good Standing" },
    { key: "gmLetter", label: "General Manager's Appointment Letter & Personal TIN" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Tax Obligations & Document Upload</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <FieldGroup label="Financial Year End" required>
          <Select value={formData.financialYearEnd} onValueChange={v => update("financialYearEnd", v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="jul7">July 8 – June 7 (EC) / July 7 (GC)</SelectItem>
              <SelectItem value="dec31">December 31 (GC)</SelectItem>
              <SelectItem value="other">Others (specify)</SelectItem>
            </SelectContent>
          </Select>
        </FieldGroup>
      </div>

      <div className="flex items-center gap-6 py-2">
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.digitalServicesTax} disabled />
          <Label className="text-sm font-medium">Digital Services Tax</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.vatOnForeignSupplies} onCheckedChange={v => update("vatOnForeignSupplies", v)} />
          <Label className="text-sm font-medium">VAT on Foreign Supplies</Label>
        </div>
      </div>

      <h3 className="font-display text-base font-bold text-foreground pt-2">Required Documents</h3>
      <p className="text-xs text-muted-foreground">Upload PDF, JPEG, or PNG files (max 10MB each). All documents are mandatory.</p>
      <div className="space-y-3">
        {docs.map(d => (
          <div key={d.key} className="flex items-center gap-4 rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{d.label} <span className="text-destructive">*</span></p>
              {formData.documents[d.key] && (
                <p className="text-xs text-success mt-1">✓ {formData.documents[d.key].name}</p>
              )}
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.jpeg,.jpg,.png"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0] || null;
                  update("documents", { ...formData.documents, [d.key]: file });
                }}
              />
              <div className="flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-2 text-xs font-medium text-foreground hover:bg-accent transition-colors">
                <Upload className="h-3.5 w-3.5" />
                {formData.documents[d.key] ? "Replace" : "Upload"}
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepCertify({ formData, update }: any) {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-xl font-bold text-foreground">Certification & Submission</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <FieldGroup label="Full Name (Person Certifying)" required>
          <Input placeholder="Full name" className="uppercase" value={formData.certifierName} onChange={e => update("certifierName", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="Position" required>
          <Input placeholder="Position / Title" className="uppercase" value={formData.certifierPosition} onChange={e => update("certifierPosition", e.target.value.toUpperCase())} />
        </FieldGroup>
      </div>

      <div className="rounded-lg border border-border bg-accent/50 p-5">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={formData.certified}
            onCheckedChange={v => update("certified", v)}
            className="mt-0.5"
          />
          <div>
            <p className="text-sm font-medium text-foreground">Declaration</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              I hereby certify that the information provided in this application is true, complete, and correct to the best of my knowledge. I understand that providing false or misleading information may result in penalties under Ethiopian tax law.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

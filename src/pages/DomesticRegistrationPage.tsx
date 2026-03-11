import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClientHeader } from "@/components/ClientHeader";
import { StepIndicator } from "@/components/StepIndicator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup } from "@/components/registration/FieldGroup";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Building2, Users, MapPin,
  Briefcase, UserCheck, Shield, FileText, ClipboardCheck, Upload
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const STEPS = [
  { label: "Taxpayer Type / የግብር ከፋይ አይነት", icon: Building2 },
  { label: "Basic Details / መሰረታዊ መረጃዎች", icon: FileText },
  { label: "Address / አድራሻ", icon: MapPin },
  { label: "Activities / ስራ ወይም ንግድ", icon: Briefcase },
  { label: "Agent & Auditor / የታክስ ወኪል እና ኦዲተር", icon: UserCheck },
  { label: "Management / የድርጅት አስተዳደር", icon: Users },
  { label: "Tax Obligations / የግብር ግዴታዎች", icon: Shield },
  { label: "Review & Submit / ማረጋገጥ", icon: ClipboardCheck },
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

export default function DomesticRegistrationPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const caseNumber = "235";
  const appDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

  const [form, setForm] = useState({
    orgType: "",
    subType: "",
    registeredName: "",
    registeredNameAm: "",
    registrationNumber: "",
    registrationDate: "",
    region: "",
    city: "",
    subCity: "",
    woreda: "",
    kebele: "",
    houseNo: "",
    poBox: "",
    phone1: "",
    phone2: "",
    email: "",
    website: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    activityDescription: "",
    activityDescriptionAm: "",
    sectorCode: "",
    agentName: "",
    agentTin: "",
    agentLicense: "",
    auditorName: "",
    auditorTin: "",
    auditorLicense: "",
    managers: [{ name: "", position: "", tin: "", phone: "" }],
    incomeTax: false,
    vat: false,
    tot: false,
    withholdingTax: false,
    exciseTax: false,
    pensionContribution: false,
    certifierName: "",
    certifierPosition: "",
    certifiedDate: "",
    certified: false,
    documents: {} as Record<string, File | null>,
  });

  const update = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));
  const next = () => { if (step < STEPS.length - 1) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const handleSubmit = () => {
    if (!form.certified) {
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
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full gradient-primary">
              <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-3">ማመልከቻ ቀርቧል! / Application Submitted!</h1>
            <p className="text-muted-foreground mb-2">Your case tracking number / የጉዳይ ቁጥር:</p>
            <p className="font-display text-2xl font-bold text-primary mb-6">MOR-DOM-2026-{caseNumber.padStart(5, "0")}</p>
            <p className="text-sm text-muted-foreground mb-8">Save this number to track your application status.</p>
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
      <div className="container max-w-4xl py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                Taxpayer Registration / የግብር ከፋይ ምዝገባ
              </h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Application Date: {appDate} &nbsp;|&nbsp; Case No: {caseNumber}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <StepIndicator steps={STEPS.map(s => s.label.split(" / ")[0])} currentStep={step} />
        </div>

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
                    <h2 className="font-display text-base sm:text-lg font-bold text-foreground">{STEPS[step].label}</h2>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Step {step + 1} of {STEPS.length}</p>
                  </div>
                </>
              );
            })()}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
              {step === 0 && <Step1TaxpayerType form={form} update={update} />}
              {step === 1 && <Step2BasicDetails form={form} update={update} />}
              {step === 2 && <Step3Address form={form} update={update} />}
              {step === 3 && <Step4Activities form={form} update={update} />}
              {step === 4 && <Step5AgentAuditor form={form} update={update} />}
              {step === 5 && <Step6Management form={form} update={update} />}
              {step === 6 && <Step7TaxObligations form={form} update={update} />}
              {step === 7 && <Step8Review form={form} update={update} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-5">
          <Button variant="outline" onClick={prev} disabled={step === 0} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Previous
          </Button>
          {step < STEPS.length - 1 ? (
            <Button variant="hero" onClick={next} className="gap-2">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="gold" onClick={handleSubmit} size="lg" className="gap-2">
              Submit / ማስገባት <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========== Step Components ========== */

function Step1TaxpayerType({ form, update }: any) {
  return (
    <div className="space-y-4">
      <FieldGroup label="Organization Type / የድርጅት አይነት" required>
        <Select value={form.orgType} onValueChange={v => update("orgType", v)}>
          <SelectTrigger><SelectValue placeholder="Select organization type / የድርጅት አይነት ይምረጡ" /></SelectTrigger>
          <SelectContent>
            {ORG_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </FieldGroup>
      <FieldGroup label="Taxpayer Sub Type / የግብር ከፋይ ንዑስ አይነት">
        <Input placeholder="Sub type (if applicable)" value={form.subType} onChange={e => update("subType", e.target.value)} />
      </FieldGroup>
    </div>
  );
}

function Step2BasicDetails({ form, update }: any) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <FieldGroup label="Registered Name / የድርጅት ህጋዊ ስም" required>
          <Input placeholder="Official registered name" className="uppercase" value={form.registeredName} onChange={e => update("registeredName", e.target.value.toUpperCase())} />
        </FieldGroup>
        <FieldGroup label="ስም (አማርኛ)" hint="Name in Amharic">
          <Input placeholder="በአማርኛ ስም" value={form.registeredNameAm} onChange={e => update("registeredNameAm", e.target.value)} />
        </FieldGroup>
        <FieldGroup label="Registration Number / የምዝገባ ቁጥር" required>
          <Input placeholder="Registration number" value={form.registrationNumber} onChange={e => update("registrationNumber", e.target.value)} />
        </FieldGroup>
        <FieldGroup label="Registration Date / የምዝገባ ቀን" required hint="DD-MON-YYYY">
          <Input type="date" value={form.registrationDate} onChange={e => update("registrationDate", e.target.value)} />
        </FieldGroup>
      </div>

      <div className="mt-4">
        <h4 className="font-display text-xs font-bold text-foreground mb-3 flex items-center gap-2">
          <Upload className="h-3.5 w-3.5 text-primary" /> Documents / ሰነዶች
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {["Registration Certificate", "Memorandum of Association", "Other Documents"].map(doc => (
            <FieldGroup key={doc} label={doc}>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/40 transition-colors cursor-pointer">
                <Upload className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-[10px] text-muted-foreground">Drag & drop or click</p>
                <input type="file" className="hidden" onChange={e => update("documents", { ...form.documents, [doc]: e.target.files?.[0] || null })} />
              </div>
            </FieldGroup>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step3Address({ form, update }: any) {
  return (
    <div className="space-y-6">
      {/* Physical Address */}
      <div>
        <h4 className="font-display text-xs font-bold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 text-primary" /> Physical Address / አድራሻ
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup label="Region / ክልል" required>
            <Select value={form.region} onValueChange={v => update("region", v)}>
              <SelectTrigger><SelectValue placeholder="Select region / ክልል ይምረጡ" /></SelectTrigger>
              <SelectContent>
                {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup label="City / ከተማ" required>
            <Input placeholder="City name" value={form.city} onChange={e => update("city", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Sub City / ክፍለ ከተማ">
            <Input placeholder="Sub city" value={form.subCity} onChange={e => update("subCity", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Woreda / ወረዳ">
            <Input placeholder="Woreda" value={form.woreda} onChange={e => update("woreda", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Kebele / ቀበሌ">
            <Input placeholder="Kebele" value={form.kebele} onChange={e => update("kebele", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="House No / ቤት ቁጥር">
            <Input placeholder="House number" value={form.houseNo} onChange={e => update("houseNo", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="P.O. Box / ፖ.ሣ.ቁ">
            <Input placeholder="P.O. Box" value={form.poBox} onChange={e => update("poBox", e.target.value)} />
          </FieldGroup>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-display text-xs font-bold text-foreground mb-3">Contact Details / የመገኛ መረጃ</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup label="Phone 1 / ስልክ" required>
            <Input placeholder="+251 ..." value={form.phone1} onChange={e => update("phone1", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Phone 2 / ስልክ 2">
            <Input placeholder="+251 ..." value={form.phone2} onChange={e => update("phone2", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Email / ኢሜይል" required>
            <Input type="email" placeholder="email@example.com" value={form.email} onChange={e => update("email", e.target.value)} />
          </FieldGroup>
        </div>
      </div>

      {/* Electronic Address */}
      <div>
        <h4 className="font-display text-xs font-bold text-foreground mb-3">Electronic Address / ኤሌክትሮኒክ አድራሻ</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FieldGroup label="Website">
            <Input placeholder="https://..." value={form.website} onChange={e => update("website", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Facebook">
            <Input placeholder="Facebook URL" value={form.facebook} onChange={e => update("facebook", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Twitter / X">
            <Input placeholder="Twitter/X URL" value={form.twitter} onChange={e => update("twitter", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Instagram">
            <Input placeholder="Instagram URL" value={form.instagram} onChange={e => update("instagram", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="LinkedIn">
            <Input placeholder="LinkedIn URL" value={form.linkedin} onChange={e => update("linkedin", e.target.value)} />
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}

function Step4Activities({ form, update }: any) {
  return (
    <div className="space-y-4">
      <FieldGroup label="Activity Description / የስራ ወይም ንግድ ዝርዝር" required>
        <Textarea placeholder="Describe the main business activities / ዋና የስራ ዝርዝር ይጻፉ" rows={3} value={form.activityDescription} onChange={e => update("activityDescription", e.target.value)} />
      </FieldGroup>
      <FieldGroup label="Activity Description (Amharic) / በአማርኛ">
        <Textarea placeholder="በአማርኛ ይግለጹ" rows={3} value={form.activityDescriptionAm} onChange={e => update("activityDescriptionAm", e.target.value)} />
      </FieldGroup>
      <FieldGroup label="Sector / ISIC Code">
        <Input placeholder="e.g. 6201" value={form.sectorCode} onChange={e => update("sectorCode", e.target.value)} />
      </FieldGroup>
    </div>
  );
}

function Step5AgentAuditor({ form, update }: any) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-display text-xs font-bold text-foreground mb-3">Tax Agent / የታክስ ወኪል</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <FieldGroup label="Agent Name / ስም">
            <Input placeholder="Agent full name" value={form.agentName} onChange={e => update("agentName", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Agent TIN / የወኪል ቲን">
            <Input placeholder="TIN" value={form.agentTin} onChange={e => update("agentTin", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="License No / ፍቃድ ቁጥር">
            <Input placeholder="License number" value={form.agentLicense} onChange={e => update("agentLicense", e.target.value)} />
          </FieldGroup>
        </div>
      </div>
      <div>
        <h4 className="font-display text-xs font-bold text-foreground mb-3">Auditor / ኦዲተር</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <FieldGroup label="Auditor Name / ስም">
            <Input placeholder="Auditor full name" value={form.auditorName} onChange={e => update("auditorName", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Auditor TIN / ቲን">
            <Input placeholder="TIN" value={form.auditorTin} onChange={e => update("auditorTin", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="License No / ፍቃድ ቁጥር">
            <Input placeholder="License number" value={form.auditorLicense} onChange={e => update("auditorLicense", e.target.value)} />
          </FieldGroup>
        </div>
      </div>
    </div>
  );
}

function Step6Management({ form, update }: any) {
  const managers = form.managers || [{ name: "", position: "", tin: "", phone: "" }];
  const updateManager = (i: number, field: string, value: string) => {
    const updated = [...managers];
    updated[i] = { ...updated[i], [field]: value };
    update("managers", updated);
  };
  const addManager = () => update("managers", [...managers, { name: "", position: "", tin: "", phone: "" }]);

  return (
    <div className="space-y-4">
      <h4 className="font-display text-xs font-bold text-foreground">Management / የድርጅት አስተዳደር</h4>
      {managers.map((m: any, i: number) => (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 rounded-lg bg-muted/40 border border-border">
          <FieldGroup label="Name / ስም">
            <Input placeholder="Full name" value={m.name} onChange={e => updateManager(i, "name", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Position / ስልጣን">
            <Input placeholder="e.g. CEO" value={m.position} onChange={e => updateManager(i, "position", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="TIN / ቲን">
            <Input placeholder="TIN" value={m.tin} onChange={e => updateManager(i, "tin", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Phone / ስልክ">
            <Input placeholder="+251..." value={m.phone} onChange={e => updateManager(i, "phone", e.target.value)} />
          </FieldGroup>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addManager} className="text-xs">
        + Add Manager / አስተዳዳሪ ጨምር
      </Button>
    </div>
  );
}

function Step7TaxObligations({ form, update }: any) {
  const obligations = [
    { key: "incomeTax", label: "Income Tax / የገቢ ግብር" },
    { key: "vat", label: "VAT / ተ.ታ.ግ" },
    { key: "tot", label: "Turnover Tax / ተርን ኦቨር ታክስ" },
    { key: "withholdingTax", label: "Withholding Tax / ቅድመ ግብር" },
    { key: "exciseTax", label: "Excise Tax / ኤክሳይዝ ታክስ" },
    { key: "pensionContribution", label: "Pension Contribution / የጡረታ መዋጮ" },
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground mb-2">Select applicable tax obligations / የሚመለከቱ የግብር ግዴታዎች ይምረጡ</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {obligations.map(o => (
          <label key={o.key} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors">
            <Checkbox checked={form[o.key] || false} onCheckedChange={v => update(o.key, v)} />
            <span className="text-xs font-medium text-foreground">{o.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Step8Review({ form, update }: any) {
  const sections = [
    { title: "Organization / ድርጅት", items: [
      ["Type", form.orgType], ["Name", form.registeredName], ["Reg. No", form.registrationNumber],
    ]},
    { title: "Address / አድራሻ", items: [
      ["Region", form.region], ["City", form.city], ["Phone", form.phone1], ["Email", form.email],
    ]},
    { title: "Activities / ስራ", items: [
      ["Description", form.activityDescription], ["Sector", form.sectorCode],
    ]},
    { title: "Tax Obligations / ግዴታዎች", items: [
      ["Income Tax", form.incomeTax ? "Yes" : "No"], ["VAT", form.vat ? "Yes" : "No"],
      ["TOT", form.tot ? "Yes" : "No"], ["Withholding", form.withholdingTax ? "Yes" : "No"],
    ]},
  ];

  return (
    <div className="space-y-5">
      {sections.map((s, i) => (
        <div key={i} className="rounded-lg border border-border p-3 sm:p-4">
          <h4 className="font-display text-xs font-bold text-foreground mb-2">{s.title}</h4>
          <div className="grid grid-cols-2 gap-2">
            {s.items.map(([label, value], j) => (
              <div key={j}>
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="text-xs font-medium text-foreground truncate">{value || "—"}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Declaration */}
      <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 space-y-3">
        <h4 className="font-display text-xs font-bold text-foreground">Declaration / ማረጋገጫ</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FieldGroup label="Certifier Name / ስም">
            <Input placeholder="Full name" value={form.certifierName} onChange={e => update("certifierName", e.target.value)} />
          </FieldGroup>
          <FieldGroup label="Position / ስልጣን">
            <Input placeholder="Position" value={form.certifierPosition} onChange={e => update("certifierPosition", e.target.value)} />
          </FieldGroup>
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <Checkbox checked={form.certified} onCheckedChange={v => update("certified", v)} className="mt-0.5" />
          <span className="text-[10px] text-foreground leading-relaxed">
            I certify that the information provided is true and correct to the best of my knowledge. /
            የሰጠሁት መረጃ ትክክለኛ እና ሙሉ መሆኑን አረጋግጣለሁ።
          </span>
        </label>
      </div>
    </div>
  );
}

import { Input } from "@/components/ui/input";
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
  Users,
  Landmark,
  Plus,
  Trash2,
  UserCircle,
  Repeat,
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

export function StepFinancial({ formData, update }: any) {
  // Tax Auditor and Agent
  const updateTaxAuditor = (field: string, value: string) => {
    update("taxAuditor", { ...formData.taxAuditor, [field]: value });
  };

  const updateTaxAgent = (field: string, value: string) => {
    update("taxAgent", { ...formData.taxAgent, [field]: value });
  };

  // Owners
  const addOwner = () => {
    update("owners", [
      ...formData.owners,
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
    ]);
  };

  const removeOwner = (i: number) => {
    if (formData.owners.length > 1)
      update(
        "owners",
        formData.owners.filter((_: any, idx: number) => idx !== i),
      );
  };

  const updateOwner = (i: number, field: string, value: string) => {
    const updated = [...formData.owners];
    updated[i] = { ...updated[i], [field]: value };
    update("owners", updated);
  };

  // Banks
  const addBank = () => {
    update("bankDetails", [
      ...formData.bankDetails,
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
    ]);
  };

  const removeBank = (i: number) => {
    if (formData.bankDetails.length > 1)
      update(
        "bankDetails",
        formData.bankDetails.filter((_: any, idx: number) => idx !== i),
      );
  };

  const updateBank = (i: number, field: string, value: any) => {
    const updated = [...formData.bankDetails];
    updated[i] = { ...updated[i], [field]: value };
    update("bankDetails", updated);
  };

  // Associated Businesses
  const addAssociatedBusiness = () => {
    update("associatedBusinesses", [
      ...formData.associatedBusinesses,
      {
        tin: "",
        associationType: "",
        startDate: "",
        legalName: "",
        tradeName: "",
        country: "",
      },
    ]);
  };

  const removeAssociatedBusiness = (i: number) => {
    if (formData.associatedBusinesses.length > 1)
      update(
        "associatedBusinesses",
        formData.associatedBusinesses.filter(
          (_: any, idx: number) => idx !== i,
        ),
      );
  };

  const updateAssociatedBusiness = (
    i: number,
    field: string,
    value: string,
  ) => {
    const updated = [...formData.associatedBusinesses];
    updated[i] = { ...updated[i], [field]: value };
    update("associatedBusinesses", updated);
  };

  const totalOwnership = formData.owners.reduce(
    (sum: number, o: any) => sum + (parseFloat(o.percentage) || 0),
    0,
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Tax Auditor and Tax Agent Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tax Auditor */}
        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <UserCircle className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-display text-sm font-bold text-foreground">
              Tax Auditor Details
            </h3>
          </div>
          <div className="space-y-3">
            <FieldGroup label="Auditor TIN" required>
              <Input
                placeholder="Auditor TIN"
                className="uppercase h-9 text-sm"
                value={formData.taxAuditor?.tin || ""}
                onChange={(e) =>
                  updateTaxAuditor("tin", e.target.value.toUpperCase())
                }
              />
            </FieldGroup>
            <FieldGroup label="Auditor Registered Name" required>
              <Input
                placeholder="Registered name"
                className="uppercase h-9 text-sm"
                value={formData.taxAuditor?.registeredName || ""}
                onChange={(e) =>
                  updateTaxAuditor(
                    "registeredName",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </FieldGroup>
            <FieldGroup
              label="Accounting and Auditing Board of Ethiopia Registration No"
              required
            >
              <Input
                placeholder="Registration number"
                className="uppercase h-9 text-sm"
                value={formData.taxAuditor?.aabeRegistrationNo || ""}
                onChange={(e) =>
                  updateTaxAuditor(
                    "aabeRegistrationNo",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </FieldGroup>
            <FieldGroup label="Professional Association / Professional No">
              <Input
                placeholder="Professional number"
                className="uppercase h-9 text-sm"
                value={formData.taxAuditor?.professionalNo || ""}
                onChange={(e) =>
                  updateTaxAuditor(
                    "professionalNo",
                    e.target.value.toUpperCase(),
                  )
                }
              />
            </FieldGroup>
          </div>
        </div>

        {/* Tax Agent */}
        <div className="rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <UserCircle className="h-4 w-4 text-primary" />
            </div>
            <h3 className="font-display text-sm font-bold text-foreground">
              Tax Agent Details
            </h3>
          </div>
          <div className="space-y-3">
            <FieldGroup label="TIN" required>
              <Input
                placeholder="Agent TIN"
                className="uppercase h-9 text-sm"
                value={formData.taxAgent?.tin || ""}
                onChange={(e) =>
                  updateTaxAgent("tin", e.target.value.toUpperCase())
                }
              />
            </FieldGroup>
            <FieldGroup label="Agent Registered Name" required>
              <Input
                placeholder="Registered name"
                className="uppercase h-9 text-sm"
                value={formData.taxAgent?.registeredName || ""}
                onChange={(e) =>
                  updateTaxAgent("registeredName", e.target.value.toUpperCase())
                }
              />
            </FieldGroup>
            <FieldGroup
              label="Ministry of Revenue Tax Agent License No"
              required
            >
              <Input
                placeholder="License number"
                className="uppercase h-9 text-sm"
                value={formData.taxAgent?.licenseNo || ""}
                onChange={(e) =>
                  updateTaxAgent("licenseNo", e.target.value.toUpperCase())
                }
              />
            </FieldGroup>
            <FieldGroup label="Professional Association / Professional No">
              <Input
                placeholder="Professional number"
                className="uppercase h-9 text-sm"
                value={formData.taxAgent?.professionalNo || ""}
                onChange={(e) =>
                  updateTaxAgent("professionalNo", e.target.value.toUpperCase())
                }
              />
            </FieldGroup>
          </div>
        </div>
      </div>

      {/* Ownership and Management */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                Ownership and Management
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground">
                Must total 100%
              </p>
            </div>
          </div>
          <div
            className={`text-xs sm:text-sm font-bold font-display px-2.5 sm:px-3 py-1 rounded-full ${totalOwnership === 100 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}
          >
            {totalOwnership}%
          </div>
        </div>

        <div className="space-y-3">
          {formData.owners.map((owner: any, i: number) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-muted/20 p-3 sm:p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] sm:text-xs font-bold font-display text-muted-foreground uppercase tracking-wider">
                  Shareholder {i + 1}
                </span>
                {formData.owners.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOwner(i)}
                    className="h-7 w-7 p-0"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <FieldGroup label="Owner/Shareholder TIN" required>
                  <Input
                    placeholder="TIN"
                    className="uppercase h-9 text-sm"
                    value={owner.tin}
                    onChange={(e) =>
                      updateOwner(i, "tin", e.target.value.toUpperCase())
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Designation" required>
                  <Select
                    value={owner.designation || ""}
                    onValueChange={(v) => updateOwner(i, "designation", v)}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Director">Director</SelectItem>
                      <SelectItem value="Shareholder">Shareholder</SelectItem>
                      <SelectItem value="Partner">Partner</SelectItem>
                      <SelectItem value="CEO">CEO</SelectItem>
                      <SelectItem value="CFO">CFO</SelectItem>
                      <SelectItem value="Secretary">Secretary</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Last Name" required>
                  <Input
                    placeholder="Last name"
                    className="uppercase h-9 text-sm"
                    value={owner.lastName}
                    onChange={(e) =>
                      updateOwner(i, "lastName", e.target.value.toUpperCase())
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Other Names">
                  <Input
                    placeholder="Other names"
                    className="uppercase h-9 text-sm"
                    value={owner.otherNames}
                    onChange={(e) =>
                      updateOwner(i, "otherNames", e.target.value.toUpperCase())
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Owner/Shareholder Country" required>
                  <Select
                    value={owner.country}
                    onValueChange={(v) => updateOwner(i, "country", v)}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Country" />
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
                <FieldGroup label="Percentage Share" required>
                  <Input
                    type="number"
                    placeholder="%"
                    min="0"
                    max="100"
                    className="h-9 text-sm"
                    value={owner.percentage}
                    onChange={(e) =>
                      updateOwner(i, "percentage", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Start Date" required>
                  <Input
                    type="date"
                    className="h-9 text-sm"
                    value={owner.startDate || ""}
                    onChange={(e) =>
                      updateOwner(i, "startDate", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Nationality">
                  <Select
                    value={owner.nationality || ""}
                    onValueChange={(v) => updateOwner(i, "nationality", v)}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Nationality" />
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
                <FieldGroup label="ID Number">
                  <Input
                    placeholder="ID number"
                    className="uppercase h-9 text-sm"
                    value={owner.idNumber || ""}
                    onChange={(e) =>
                      updateOwner(i, "idNumber", e.target.value.toUpperCase())
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
          onClick={addOwner}
          className="gap-1.5 mt-3"
        >
          <Plus className="h-3.5 w-3.5" /> Add Shareholder
        </Button>
      </div>

      {/* Associated/Related Businesses */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <Repeat className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
            Associated/Related Businesses
          </h3>
        </div>

        <div className="space-y-3">
          {formData.associatedBusinesses?.map((business: any, i: number) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-muted/20 p-3 sm:p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] sm:text-xs font-bold font-display text-muted-foreground uppercase tracking-wider">
                  Associated Business {i + 1}
                </span>
                {formData.associatedBusinesses.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAssociatedBusiness(i)}
                    className="h-7 w-7 p-0"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <FieldGroup label="Associated TIN" required>
                  <Input
                    placeholder="TIN"
                    className="uppercase h-9 text-sm"
                    value={business.tin}
                    onChange={(e) =>
                      updateAssociatedBusiness(
                        i,
                        "tin",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Association Type" required>
                  <Select
                    value={business.associationType || ""}
                    onValueChange={(v) =>
                      updateAssociatedBusiness(i, "associationType", v)
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Subsidiary">Subsidiary</SelectItem>
                      <SelectItem value="Holding Company">
                        Holding Company
                      </SelectItem>
                      <SelectItem value="Affiliate">Affiliate</SelectItem>
                      <SelectItem value="Joint Venture">
                        Joint Venture
                      </SelectItem>
                      <SelectItem value="Parent Company">
                        Parent Company
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FieldGroup>
                <FieldGroup label="Association Start Date" required>
                  <Input
                    type="date"
                    className="h-9 text-sm"
                    value={business.startDate || ""}
                    onChange={(e) =>
                      updateAssociatedBusiness(i, "startDate", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Legal Name" required>
                  <Input
                    placeholder="Legal name"
                    className="uppercase h-9 text-sm"
                    value={business.legalName}
                    onChange={(e) =>
                      updateAssociatedBusiness(
                        i,
                        "legalName",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Trade Name">
                  <Input
                    placeholder="Trade name"
                    className="uppercase h-9 text-sm"
                    value={business.tradeName}
                    onChange={(e) =>
                      updateAssociatedBusiness(
                        i,
                        "tradeName",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Associated Country" required>
                  <Select
                    value={business.country}
                    onValueChange={(v) =>
                      updateAssociatedBusiness(i, "country", v)
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Country" />
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
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={addAssociatedBusiness}
          className="gap-1.5 mt-3"
        >
          <Plus className="h-3.5 w-3.5" /> Add Associated Business
        </Button>
      </div>

      {/* Bank Details */}
      <div>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary/10">
            <Landmark className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </div>
          <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
            Bank Details
          </h3>
        </div>

        <div className="space-y-3">
          {formData.bankDetails?.map((bank: any, i: number) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-muted/20 p-3 sm:p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] sm:text-xs font-bold font-display text-muted-foreground uppercase tracking-wider">
                  Account {i + 1}
                </span>
                {formData.bankDetails.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBank(i)}
                    className="h-7 w-7 p-0"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <FieldGroup label="Account Type" required>
                  <Select
                    value={bank.accountType}
                    onValueChange={(v) => updateBank(i, "accountType", v)}
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Select" />
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
                <FieldGroup label="Local Bank Name" required>
                  <Select
                    value={bank.localBankName}
                    onValueChange={(v) => updateBank(i, "localBankName", v)}
                  >
                    <SelectTrigger className="h-9 text-sm">
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
                    className="uppercase h-9 text-sm"
                    value={bank.internationalBankName || ""}
                    onChange={(e) =>
                      updateBank(
                        i,
                        "internationalBankName",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="International Bank Country">
                  <Select
                    value={bank.internationalBankCountry || ""}
                    onValueChange={(v) =>
                      updateBank(i, "internationalBankCountry", v)
                    }
                  >
                    <SelectTrigger className="h-9 text-sm">
                      <SelectValue placeholder="Country" />
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
                    className="uppercase h-9 text-sm"
                    value={bank.bankAddress || ""}
                    onChange={(e) =>
                      updateBank(i, "bankAddress", e.target.value.toUpperCase())
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Account Holder" required>
                  <Input
                    placeholder="Account holder name"
                    className="uppercase h-9 text-sm"
                    value={bank.accountHolder}
                    onChange={(e) =>
                      updateBank(
                        i,
                        "accountHolder",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Bank Account No" required>
                  <Input
                    placeholder="Account number"
                    className="h-9 text-sm"
                    value={bank.accountNumber}
                    onChange={(e) =>
                      updateBank(i, "accountNumber", e.target.value)
                    }
                  />
                </FieldGroup>
                <FieldGroup label="Main Account?">
                  <div className="flex items-center h-9">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={bank.mainAccount || false}
                      onChange={(e) =>
                        updateBank(i, "mainAccount", e.target.checked)
                      }
                    />
                  </div>
                </FieldGroup>
                <FieldGroup label="Currency" required>
                  <Select
                    value={bank.currency}
                    onValueChange={(v) => updateBank(i, "currency", v)}
                  >
                    <SelectTrigger className="h-9 text-sm">
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
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={addBank}
          className="gap-1.5 mt-3"
        >
          <Plus className="h-3.5 w-3.5" /> Add Bank Account
        </Button>
      </div>
    </div>
  );
}

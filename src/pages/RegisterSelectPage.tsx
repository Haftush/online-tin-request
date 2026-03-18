import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ClientHeader } from "@/components/ClientHeader";
import { Globe, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const options = [
  {
    icon: Building2,
    title: "Resident Non-Business Taxpayer",
    titleAm: "የሀገር ውስጥ ግብር ከፋይ",
    desc: "For organizations operating within Ethiopia — governmental agencies, NGOs, embassies, religious organizations, and more.",
    to: "/register/domestic",
    variant: "hero" as const,
  },
  {
    icon: Globe,
    title: "Non-Resident Digital Service Provider",
    titleAm: "ነዋሪ ያልሆነ አገልግሎት ሰጪ",
    desc: "For foreign digital service providers registering for Digital Services Tax and VAT obligations in Ethiopia.",
    to: "/register/non-resident",
    variant: "gold" as const,
  },
];

export default function RegisterSelectPage() {
  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />
      <div className="container max-w-3xl py-8 sm:py-16 px-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
          <h1 className="font-display text-xl sm:text-3xl font-bold text-foreground mb-2">
            Select Registration Type
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Choose the registration category that applies to your organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {options.map((opt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={opt.to} className="block h-full">
                <div className="group h-full rounded-xl border border-border bg-card p-5 sm:p-8 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary group-hover:scale-110 transition-transform">
                    <opt.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-sm sm:text-lg font-bold text-foreground mb-1">{opt.title}</h2>
                  <p className="text-xs text-primary/70 font-medium mb-2">{opt.titleAm}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{opt.desc}</p>
                  <Button variant={opt.variant} size="sm" className="w-full gap-2 mt-auto">
                    Start Registration <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

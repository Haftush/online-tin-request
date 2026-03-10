import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClientHeader } from "@/components/ClientHeader";
import { Shield, FileCheck, Clock, Globe, ArrowRight, CheckCircle2, Building2, FileText, Sparkles, Zap, Lock } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "100% Online",
    description: "Register from anywhere in the world — no physical presence required.",
  },
  {
    icon: FileCheck,
    title: "Digital Documents",
    description: "Securely upload all required legal documents in PDF, JPEG, or PNG.",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Receive your TIN electronically with real-time tracking.",
  },
  {
    icon: Lock,
    title: "Secure & Encrypted",
    description: "Enterprise-grade HTTPS encryption for all data transfers.",
  },
];

const steps = [
  { icon: Building2, title: "Start Registration", desc: "No account needed" },
  { icon: FileText, title: "Complete Form", desc: "Fill in business & tax details" },
  { icon: FileCheck, title: "Upload Docs", desc: "Submit required documents" },
  { icon: CheckCircle2, title: "Get Your TIN", desc: "Receive TIN upon approval" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />

      {/* Hero — enhanced */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-[10%] w-80 h-80 rounded-full bg-secondary/20 blur-[120px]" />
          <div className="absolute bottom-0 right-[5%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-primary-foreground/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-primary-foreground/5" />
        </div>
        <div className="container relative py-16 sm:py-24 md:py-36 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full gradient-gold px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 shadow-elevated"
            >
              <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-secondary-foreground" />
              <span className="text-[10px] sm:text-xs font-bold font-display text-secondary-foreground uppercase tracking-wider">
                Ministry of Revenues — Ethiopia
              </span>
            </motion.div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.12] mb-4 sm:mb-6">
              Digital Tax Registration for{" "}
              <span className="relative inline-block">
                <span className="text-secondary">Non-Resident</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-0.5 sm:bottom-1 left-0 h-0.5 sm:h-1 rounded-full bg-secondary/40"
                />
              </span>{" "}
              Service Providers
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/75 mb-6 sm:mb-10 max-w-lg mx-auto leading-relaxed px-2">
              Register for Digital Services Tax and VAT obligations in Ethiopia entirely online — fast, secure, and paperless.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/register">
                <Button variant="gold" size="lg" className="gap-2 text-sm sm:text-base w-full sm:w-auto">
                  Register Here <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
              </Link>
              <Link to="/track">
                <Button variant="outline" size="lg" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20 hover:text-primary-foreground w-full sm:w-auto">
                  Track Application
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative -mt-6 sm:-mt-8 z-10 px-4">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-elevated grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {[
              { value: "100%", label: "Online Process" },
              { value: "24/7", label: "Available" },
              { value: "< 48h", label: "Processing Time" },
              { value: "Secure", label: "Data Encrypted" },
            ].map((s, i) => (
              <div key={i} className="text-center">
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">{s.value}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-12 sm:py-16 md:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Why Register Digitally?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Streamlined, secure, and efficient tax registration for the digital economy.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl gradient-primary group-hover:scale-110 transition-transform duration-300">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/40 py-12 sm:py-16 md:py-24 px-4">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground">Four simple steps to complete your registration.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                <div className="relative mx-auto mb-5">
                  <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl gradient-gold shadow-card">
                    <s.icon className="h-7 w-7 text-secondary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full gradient-primary text-[11px] font-bold text-primary-foreground shadow-card">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-12 sm:py-16 md:py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl gradient-hero p-6 sm:p-10 md:p-16 text-center shadow-elevated"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Register Your Business?
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
            Start your Digital Services Tax and VAT registration today — the entire process takes less than 15 minutes.
          </p>
          <Link to="/register">
            <Button variant="gold" size="lg" className="gap-2 text-base">
              Start Registration <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Shield className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-sm font-bold text-foreground">Ministry of Revenues — Ethiopia</span>
            </div>
            <p className="text-xs text-muted-foreground">© 2026 Ministry of Revenues. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

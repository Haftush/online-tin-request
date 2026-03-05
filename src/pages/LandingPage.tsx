import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClientHeader } from "@/components/ClientHeader";
import { Shield, FileCheck, Clock, Globe, ArrowRight, CheckCircle2, Building2, FileText } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "100% Online Registration",
    description: "Complete your tax registration from anywhere in the world without physical presence in Ethiopia.",
  },
  {
    icon: FileCheck,
    title: "Digital Document Upload",
    description: "Securely upload all required legal documents in PDF, JPEG, or PNG format.",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Receive your TIN electronically upon approval with real-time application tracking.",
  },
  {
    icon: Shield,
    title: "Secure & Encrypted",
    description: "All data is transmitted over HTTPS with enterprise-grade security protocols.",
  },
];

const steps = [
  { icon: Building2, title: "Create Account", desc: "Register with your email address" },
  { icon: FileText, title: "Complete Form", desc: "Fill in business & tax details" },
  { icon: FileCheck, title: "Upload Documents", desc: "Submit required legal documents" },
  { icon: CheckCircle2, title: "Receive TIN", desc: "Get your TIN upon approval" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-secondary blur-[100px]" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-primary blur-[120px]" />
        </div>
        <div className="container relative py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full gradient-gold px-4 py-1.5 mb-6">
              <span className="text-xs font-bold font-display text-secondary-foreground uppercase tracking-wider">
                Ministry of Revenues — Ethiopia
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.1] mb-6">
              Digital Tax Registration for{" "}
              <span className="text-secondary">Non-Resident</span> Service Providers
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg leading-relaxed">
              Register for Digital Services Tax and VAT obligations in Ethiopia entirely online — no physical presence required.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/register">
                <Button variant="gold" size="lg" className="gap-2">
                  Start Registration <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/track">
                <Button variant="outline" size="lg" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20 hover:text-primary-foreground">
                  Track Application
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl font-bold text-foreground mb-3">Why Register Digitally?</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Streamlined, secure, and efficient tax registration for the digital economy.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg gradient-primary">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/50 py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground">Four simple steps to complete your registration.</p>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-gold shadow-card">
                  <s.icon className="h-7 w-7 text-secondary-foreground" />
                </div>
                <div className="absolute top-2 left-0 w-full flex justify-center">
                  <span className="font-display text-[64px] font-extrabold text-muted/80 leading-none select-none">
                    {i + 1}
                  </span>
                </div>
                <h3 className="relative font-display text-base font-bold text-foreground mb-1">{s.title}</h3>
                <p className="relative text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
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
            <p className="text-xs text-muted-foreground">© 2026 Ministry of Revenues. All rights reserved. Digital Tax Registration Portal.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ClientHeader } from "@/components/ClientHeader";
import {
  Shield,
  FileCheck,
  Clock,
  Globe,
  ArrowRight,
  CheckCircle2,
  Building2,
  FileText,
  Sparkles,
  Zap,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "100% Online",
    description: "Register from anywhere — no physical presence required.",
  },
  {
    icon: FileCheck,
    title: "Digital Documents",
    description:
      "Securely upload all required legal documents in PDF, JPEG, or PNG.",
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
  { icon: Building2, title: "Create Account", desc: "Sign up or sign in" },
  {
    icon: FileText,
    title: "Complete Form",
    desc: "Fill in business & tax details",
  },
  { icon: FileCheck, title: "Upload Docs", desc: "Submit required documents" },
  {
    icon: CheckCircle2,
    title: "Get Your TIN",
    desc: "Receive TIN upon approval",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <ClientHeader />

      {/* Hero */}
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
           
            <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-[1.12] mb-4 sm:mb-6">
               Taxpayer Registration{" "}
              <span className="relative inline-block">
                <span className="text-secondary">Portal</span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute bottom-0.5 sm:bottom-1 left-0 h-0.5 sm:h-1 rounded-full bg-secondary/40"
                />
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-primary-foreground/75 mb-6 sm:mb-10 max-w-lg mx-auto leading-relaxed px-2">
              Register for tax obligations in Ethiopia — for both domestic and
              non-resident service providers. Fast, secure, and paperless.
            </p>
            <div className="flex flex-row gap-2 sm:gap-3 justify-center">
              <Link to="/register">
                <Button
                  variant="gold"
                  size="default"
                  className="gap-1.5 text-xs sm:text-base h-9 px-3 sm:h-12 sm:px-8"
                >
                  Register Here{" "}
                  <ArrowRight className="h-3.5 sm:h-5 w-3.5 sm:w-5" />
                </Button>
              </Link>
              <Link to="/track">
                <Button
                  variant="outline"
                  size="default"
                  className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20 hover:text-primary-foreground text-xs sm:text-base h-9 px-3 sm:h-12 sm:px-8"
                >
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
                <p className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-primary">
                  {s.value}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-1">
                  {s.label}
                </p>
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Why Register Digitally?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Streamlined, secure, and efficient tax registration for the digital
            economy.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl sm:rounded-2xl border border-border bg-card p-3 sm:p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-2 sm:mb-4 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl gradient-primary group-hover:scale-110 transition-transform duration-300">
                <f.icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xs sm:text-base font-bold text-foreground mb-1 sm:mb-2">
                {f.title}
              </h3>
              <p className="text-[10px] sm:text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              Four simple steps to complete your registration.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="text-center"
              >
                <div className="relative mx-auto mb-3 sm:mb-5">
                  <div className="flex h-11 w-11 sm:h-16 sm:w-16 mx-auto items-center justify-center rounded-xl sm:rounded-2xl gradient-gold shadow-card relative">
                    <s.icon className="h-5 w-5 sm:h-7 sm:w-7 text-secondary-foreground" />
                    <span className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full gradient-primary text-[9px] sm:text-[10px] font-bold text-primary-foreground shadow-card">
                      {i + 1}
                    </span>
                  </div>
                </div>
                <h3 className="font-display text-xs sm:text-base font-bold text-foreground mb-0.5 sm:mb-1">
                  {s.title}
                </h3>
                <p className="text-[10px] sm:text-sm text-muted-foreground">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-hero py-10 sm:py-14">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10 border border-primary-foreground/20">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-sm font-bold text-primary-foreground leading-tight">
                    MOR
                  </span>
                  <span className="text-[10px] text-primary-foreground/50 leading-tight">
                    Digital Tax Registration
                  </span>
                </div>
              </div>
              <p className="text-xs text-primary-foreground/60 leading-relaxed max-w-xs">
                Ministry of Revenues — Ethiopia. Providing secure, efficient
                digital tax services for all taxpayers.
              </p>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-secondary uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  to="/register"
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  Register
                </Link>
                <Link
                  to="/track"
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  Track Application
                </Link>
                <Link
                  to="/login"
                  className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                >
                  Sign In
                </Link>
              </nav>
            </div>

            <div>
              <h4 className="font-display text-xs font-bold text-secondary uppercase tracking-wider mb-3">
                Get Started
              </h4>
              <p className="text-xs text-primary-foreground/60 mb-4">
                Register for your tax obligations — takes less than 15 minutes.
              </p>
              <Link to="/register">
                <Button variant="gold" size="sm" className="gap-2">
                  Register Here <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-primary-foreground/40">
              © {new Date().getFullYear()} Ministry of Revenues. All rights
              reserved.
            </p>{" "}
            <div className="flex items-center gap-1.5 text-[11px] text-primary-foreground/40">
              <Lock className="h-3 w-3" />
              <span>Secured & Encrypted</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

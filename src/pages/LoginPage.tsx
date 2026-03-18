import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogIn, Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Tab = "login" | "signup";

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  // If already logged in, redirect
  if (user) {
    if (user.role === "officer") {
      navigate("/backoffice", { replace: true });
    } else {
      navigate(redirect, { replace: true });
    }
    return null;
  }

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setName("");
    setShowPassword(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password, "taxpayer")) {
      toast.success("Welcome back!");
      navigate(redirect);
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signup(email, name, password)) {
      toast.success("Account created successfully!");
      navigate(redirect);
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "login", label: "Sign In" },
    { key: "signup", label: "Create Account" },
  ];

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-gold shadow-elevated">
              <Shield className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-display text-sm font-bold text-primary-foreground">Taxpayer Registration Portal</p>
             
            </div>
          </Link>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-primary-foreground">
            {tab === "login" ? "Sign In to Your Account" : "Create Your Account"}
          </h1>
          <p className="text-xs text-primary-foreground/60 mt-1">
            Register or track your tax application
          </p>
        </div>

        <div className="rounded-2xl border border-border/10 bg-card p-5 sm:p-6 shadow-elevated">
          {/* Tabs */}
          <div className="flex rounded-lg bg-muted p-1 mb-5 gap-0.5">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); resetFields(); }}
                className={`flex-1 rounded-md py-2 text-xs font-display font-semibold transition-all ${
                  tab === t.key
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Login Form */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Email Address</Label>
                <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Password</Label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" variant="hero" className="w-full gap-2" size="lg">
                <LogIn className="h-4 w-4" /> Sign In
              </Button>
            </form>
          )}

          {/* Signup Form */}
          {tab === "signup" && (
            <form onSubmit={handleSignup} className="space-y-3.5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Full Name</Label>
                <Input placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Email Address</Label>
                <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Password</Label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} required />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" variant="gold" className="w-full gap-2" size="lg">
                <UserPlus className="h-4 w-4" /> Create Account
              </Button>
            </form>
          )}
        </div>

        <div className="text-center mt-5">
          <Link to="/" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back to Portal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

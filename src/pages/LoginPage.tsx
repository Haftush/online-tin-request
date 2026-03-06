import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const isOfficer = searchParams.get("role") === "officer";
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    if (user.role === "officer") {
      navigate("/backoffice", { replace: true });
    } else {
      navigate("/register", { replace: true });
    }
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      if (signup(email, name, password)) {
        toast.success("Account created successfully!");
        navigate("/register");
      } else {
        toast.error("Please fill in all fields.");
      }
    } else {
      const role = isOfficer ? "officer" : "taxpayer";
      if (login(email, password, role)) {
        toast.success(`Welcome back!`);
        navigate(isOfficer ? "/backoffice" : "/");
      } else {
        toast.error(isOfficer ? "Invalid officer credentials." : "Invalid email or password.");
      }
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-gold shadow-elevated">
              <Shield className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-display text-sm font-bold text-primary-foreground">MOR Digital Portal</p>
              <p className="text-[10px] text-primary-foreground/60">Tax Registration System</p>
            </div>
          </Link>
          <h1 className="font-display text-2xl font-bold text-primary-foreground">
            {isOfficer ? "Officer Sign In" : isSignup ? "Create Account" : "Sign In"}
          </h1>
          <p className="text-sm text-primary-foreground/60 mt-1">
            {isOfficer ? "Access the registration review portal" : isSignup ? "Register to start your tax application" : "Access your tax registration portal"}
          </p>
        </div>

        <div className="rounded-2xl border border-border/10 bg-card p-6 shadow-elevated">
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-1.5">
                <Label className="text-sm font-semibold">Full Name</Label>
                <Input placeholder="Your full name" className="uppercase" value={name} onChange={e => setName(e.target.value.toUpperCase())} />
              </div>
            )}
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Email Address</Label>
              <Input type="email" placeholder={isOfficer ? "admin@mor.gov.et" : "your@email.com"} value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-semibold">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full gap-2" size="lg">
              {isSignup ? <><UserPlus className="h-4 w-4" /> Create Account</> : <><LogIn className="h-4 w-4" /> Sign In</>}
            </Button>
          </form>

          {!isOfficer && (
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-sm text-primary hover:underline font-medium"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Already have an account? Sign in" : "Don't have an account? Create one"}
              </button>
            </div>
          )}

          {isOfficer && (
            <p className="mt-4 text-xs text-center text-muted-foreground">
              Demo credentials: admin@mor.gov.et / admin123
            </p>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors">
            ← Back to Portal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

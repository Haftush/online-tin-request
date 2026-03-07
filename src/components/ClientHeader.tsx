import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, Shield, Menu, X, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function ClientHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-bold text-foreground leading-tight">MOR</span>
            <span className="text-[10px] text-muted-foreground leading-tight">Digital Tax Registration</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            Home
          </Link>
          <Link to="/register" className={`text-sm font-medium transition-colors ${location.pathname.startsWith('/register') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            Register
          </Link>
          <Link to="/track" className={`text-sm font-medium transition-colors ${location.pathname === '/track' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
            Track Application
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            <span>EN</span>
          </div>
          <Link to="/register">
            <Button variant="hero" size="sm">Start Registration</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-card px-4 pb-4"
        >
          <nav className="flex flex-col gap-3 pt-3">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Home</Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Register</Link>
            <Link to="/track" onClick={() => setMenuOpen(false)} className="text-sm font-medium py-2">Track Application</Link>
            {user ? (
              <Button variant="outline" onClick={() => { handleLogout(); setMenuOpen(false); }} className="w-full gap-2">
                <LogOut className="h-4 w-4" /> Sign Out
              </Button>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="hero" className="w-full gap-2">
                  <LogIn className="h-4 w-4" /> Sign In
                </Button>
              </Link>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
}

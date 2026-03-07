import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield, LayoutDashboard, FileText, Users, BarChart3, LogOut, Menu, X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import BODashboardPage from "./backoffice/BODashboardPage";
import BOApplicationsPage from "./backoffice/BOApplicationsPage";
import BOTaxpayersPage from "./backoffice/BOTaxpayersPage";
import BOReportsPage from "./backoffice/BOReportsPage";

const NAV_ITEMS = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "applications", icon: FileText, label: "Applications" },
  { id: "taxpayers", icon: Users, label: "Taxpayers" },
  { id: "reports", icon: BarChart3, label: "Reports" },
];

export default function BackofficePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user || user.role !== "officer") {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary-foreground/50 mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-primary-foreground mb-2">Access Restricted</h1>
          <p className="text-sm text-primary-foreground/60 mb-6">You must sign in as a registration officer.</p>
          <Link to="/login">
            <Button variant="gold">Officer Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => { logout(); navigate("/"); };
  const handleNavClick = (id: string) => { setActiveTab(id); setSidebarOpen(false); };

  const renderPage = () => {
    switch (activeTab) {
      case "applications": return <BOApplicationsPage />;
      case "taxpayers": return <BOTaxpayersPage />;
      case "reports": return <BOReportsPage />;
      default: return <BODashboardPage />;
    }
  };

  const activeLabel = NAV_ITEMS.find(n => n.id === activeTab)?.label || "Dashboard";

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 gradient-hero border-r border-sidebar-border transform transition-transform duration-200 lg:relative lg:translate-x-0 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center justify-between px-5 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-gold">
              <Shield className="h-4 w-4 text-secondary-foreground" />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-sidebar-foreground">MOR Backoffice</p>
              <p className="text-[10px] text-sidebar-foreground/60">Registration Portal</p>
            </div>
          </div>
          <button className="lg:hidden text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1 flex-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                activeTab === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border shrink-0">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2 mb-2">
            <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center text-[10px] font-bold text-secondary-foreground">RO</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-[10px] text-sidebar-foreground/50 truncate">{user.email}</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-foreground/30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-card/80 backdrop-blur-md px-4 md:px-8">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-bold text-foreground">{activeLabel}</h1>
        </header>
        <div className="p-4 md:p-8">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

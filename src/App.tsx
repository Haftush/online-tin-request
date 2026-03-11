import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import RegisterSelectPage from "./pages/RegisterSelectPage";
import RegistrationPage from "./pages/RegistrationPage";
import DomesticRegistrationPage from "./pages/DomesticRegistrationPage";
import TrackPage from "./pages/TrackPage";
import BackofficePage from "./pages/BackofficePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<ProtectedRoute><RegisterSelectPage /></ProtectedRoute>} />
            <Route path="/register/non-resident" element={<ProtectedRoute><RegistrationPage /></ProtectedRoute>} />
            <Route path="/register/domestic" element={<ProtectedRoute><DomesticRegistrationPage /></ProtectedRoute>} />
            <Route path="/track" element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/backoffice" element={<BackofficePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

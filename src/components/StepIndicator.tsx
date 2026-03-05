import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold font-display transition-all duration-300",
                  i < currentStep && "gradient-primary text-primary-foreground",
                  i === currentStep && "gradient-gold text-secondary-foreground ring-4 ring-secondary/30",
                  i > currentStep && "bg-muted text-muted-foreground"
                )}
              >
                {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn(
                "text-[11px] font-medium text-center max-w-[80px] leading-tight",
                i <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 mx-2 mt-[-18px] rounded-full transition-all duration-500",
                i < currentStep ? "gradient-primary" : "bg-muted"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-primary font-display">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-xs font-medium text-foreground font-display">
            {steps[currentStep]}
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full gradient-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FieldGroupProps {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

export function FieldGroup({ label, required, hint, children }: FieldGroupProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-semibold font-display flex items-center gap-1.5">
        {label} {required && <span className="text-destructive">*</span>}
        {hint && (
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-[220px] text-xs">
              {hint}
            </TooltipContent>
          </Tooltip>
        )}
      </Label>
      {children}
    </div>
  );
}

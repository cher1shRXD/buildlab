import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

interface Props extends ComponentProps<"div"> {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: React.ReactNode;
  children: React.ReactNode;
}

export const FormField = ({ label, required, optional, hint, className, children, ...props }: Props) => (
  <div {...props} className={cn("space-y-2", className)}>
    <p className="text-[13px] font-medium text-foreground leading-none">
      {label}
      {required && <span className="text-destructive ml-0.5"> *</span>}
      {optional && (
        <span className="text-muted-foreground font-normal ml-1.5 text-[11px]">
          (선택)
        </span>
      )}
    </p>
    {children}
    {hint && (
      <p className="text-xs text-muted-foreground leading-relaxed">{hint}</p>
    )}
  </div>
);

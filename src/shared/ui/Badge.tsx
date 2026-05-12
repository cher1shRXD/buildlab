import { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

interface BadgeProps extends ComponentProps<"span"> {
  variant?: "default" | "secondary" | "outline";
}

const variants = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  outline: "border border-border text-foreground",
};

export const Badge = ({ className, variant = "secondary", ...props }: BadgeProps) => (
  <span
    className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium", variants[variant], className)}
    {...props}
  />
);

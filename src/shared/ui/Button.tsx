import { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "icon" | "icon-sm";
}

const variants = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border bg-background hover:bg-muted",
  ghost: "hover:bg-muted hover:text-foreground",
  destructive: "bg-destructive text-white hover:bg-destructive/90",
};

const sizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 text-xs",
  icon: "size-9",
  "icon-sm": "size-7",
};

export const Button = ({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      variants[variant],
      sizes[size],
      className,
    )}
    {...props}
  />
);

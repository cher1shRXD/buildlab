import { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

interface CardProps extends ComponentProps<"div"> {
  size?: "sm" | "default";
}

export const Card = ({ className, size = "default", ...props }: CardProps) => (
  <div
    data-slot="card"
    data-size={size}
    className={cn("rounded-lg border border-border bg-card text-card-foreground shadow-xs", className)}
    {...props}
  />
);

import { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

interface SeparatorProps extends ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
}

export const Separator = ({ className, orientation = "horizontal", ...props }: SeparatorProps) => (
  <div
    role="separator"
    aria-orientation={orientation}
    className={cn(orientation === "vertical" ? "h-full w-px" : "h-px w-full", "bg-border", className)}
    {...props}
  />
);

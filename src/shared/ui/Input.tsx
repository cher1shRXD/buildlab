import { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

interface InputProps extends ComponentProps<"input"> {}

export const Input = ({ className, ...props }: InputProps) => (
  <input
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors",
      "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
);

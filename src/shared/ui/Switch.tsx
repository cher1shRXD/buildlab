import { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";

interface SwitchProps extends Omit<ComponentProps<"button">, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = ({ checked = false, onCheckedChange, className, ...props }: SwitchProps) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    className={cn(
      "inline-flex h-5 w-9 items-center rounded-full border border-transparent transition-colors",
      checked ? "bg-primary" : "bg-muted",
      className,
    )}
    onClick={() => onCheckedChange?.(!checked)}
    {...props}
  >
    <span
      className={cn("size-4 rounded-full bg-background transition-transform", checked && "translate-x-4")}
    />
  </button>
);

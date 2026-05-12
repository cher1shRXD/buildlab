import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props extends ComponentProps<"button"> {
  Icon: LucideIcon;
  label: string;
  selected: boolean;
}

export const ModeButton = ({ Icon, label, selected, className, ...props }: Props) => (
  <button
    type="button"
    {...props}
    className={cn(
      "flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border transition-all flex-1",
      "text-xs font-medium",
      selected
        ? "border-primary/60 bg-primary/10 text-primary shadow-sm"
        : "border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground hover:border-border",
      className
    )}
  >
    <Icon size={16} strokeWidth={1.75} />
    <span className="leading-tight text-center">{label}</span>
  </button>
);

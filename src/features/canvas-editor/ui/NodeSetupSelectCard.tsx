"use client";

import { cn } from "@/shared/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

const NodeSetupSelectCard = ({ icon: Icon, label, description, selected, onClick }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "relative flex flex-col items-start gap-2.5 p-3.5 rounded-xl border-2 text-left transition-all",
      selected
        ? "border-primary/60 bg-primary/6 shadow-sm"
        : "border-border/60 bg-card hover:border-border hover:bg-muted/40"
    )}
  >
    {selected && (
      <div className="absolute top-2.5 right-2.5 size-4 rounded-full bg-primary flex items-center justify-center">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
          <path d="M1.5 4L3 5.5L6.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    )}
    <div className={cn("flex size-8 items-center justify-center rounded-lg", selected ? "bg-primary/10 text-primary" : "bg-muted/80 text-muted-foreground")}>
      <Icon size={15} />
    </div>
    <div>
      <span className={cn("text-xs font-semibold block", selected ? "text-primary" : "text-foreground")}>{label}</span>
      <span className="text-[10px] text-muted-foreground leading-relaxed mt-0.5 block">{description}</span>
    </div>
  </button>
);

export default NodeSetupSelectCard;

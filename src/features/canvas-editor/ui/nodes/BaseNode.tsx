"use client";

import { AlertCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Props {
  selected: boolean;
  label: string;
  color: string;
  bgColor?: string;
  Icon?: LucideIcon;
  kindLabel: string;
  hasError?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const BaseNode = ({
  selected,
  label,
  color,
  kindLabel,
  hasError,
  children,
  onClick,
}: Props) => (
  <div
    onClick={onClick}
    className="min-w-[110px] max-w-[160px] rounded-lg bg-card cursor-pointer transition-colors duration-100 border overflow-hidden"
    style={{
      borderColor: hasError
        ? "#e57373"
        : selected
          ? `${color}90`
          : "var(--border)",
    }}
  >
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border/60 bg-muted/50">
      <span
        className="size-1.5 rounded-full shrink-0"
        style={{ backgroundColor: color }}
      />
      <span className="text-[9px] font-medium text-muted-foreground tracking-wide leading-none">
        {kindLabel}
      </span>
      {hasError && (
        <AlertCircle size={9} className="ml-auto text-destructive/70" />
      )}
    </div>
    <div className="px-2.5 py-2">
      <p className="text-[11px] font-medium text-foreground truncate leading-none">
        {label}
      </p>
      {children}
    </div>
  </div>
);

export default BaseNode;

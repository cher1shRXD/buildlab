import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

export const ModeGroup = ({ label, hint, children, ...props }: Props) => (
  <div {...props} className="space-y-2.5">
    <p className="text-[13px] font-medium text-foreground leading-none">
      {label}
    </p>
    <div className="flex gap-2">{children}</div>
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

"use client";

import type { ComponentProps } from "react";
import { Variable } from "lucide-react";
import { Input } from "@/shared/ui/Input";

interface Props extends Omit<ComponentProps<"div">, "onChange"> {
  prefix?: string;
  value: string;
  onChange: (v: string) => void;
}

export const OutputVarRow = ({ prefix = "결과는", value, onChange, ...props }: Props) => (
  <div {...props} className="rounded-xl bg-muted/40 border border-border/50 overflow-hidden">
    <div className="flex items-center gap-2 px-3 py-2 border-b border-border/40 bg-muted/30">
      <Variable size={12} className="text-muted-foreground shrink-0" />
      <p className="text-xs font-medium text-muted-foreground">결과 변수</p>
    </div>
    <div className="flex items-center gap-3 px-3 py-2.5">
      <p className="text-xs text-muted-foreground flex-1">
        {prefix}{" "}
        <code className="bg-background border border-border/40 px-1.5 py-0.5 rounded-md font-mono text-foreground">
          {`{{${value || "result"}}}`}
        </code>{" "}
        에 저장
      </p>
      <Input
        className="h-7 w-28 text-xs font-mono"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

"use client";

import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";

interface Props {
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

const InputPhase = ({ draft, update }: Props) => {
  const value = (draft.outputVariable as string) ?? "user_input";

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <Label className="text-xs">
          변수명 <span className="text-destructive">*</span>
        </Label>
        <Input
          className="h-9 text-sm font-mono"
          placeholder="예: user_input"
          value={value}
          onChange={(e) => update({ outputVariable: e.target.value })}
          autoFocus
        />
      </div>
      <div className="rounded-xl bg-muted/40 border border-border/50 px-4 py-3 space-y-1">
        <p className="text-xs font-medium text-muted-foreground">사용 방법</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          LLM 노드의 프롬프트에서{" "}
          <code className="bg-background border border-border/40 px-1.5 py-0.5 rounded-md font-mono text-foreground text-[11px]">
            {`{{${value || "user_input"}}}`}
          </code>{" "}
          으로 사용자 입력값을 참조할 수 있어요.
        </p>
      </div>
    </div>
  );
};

export default InputPhase;

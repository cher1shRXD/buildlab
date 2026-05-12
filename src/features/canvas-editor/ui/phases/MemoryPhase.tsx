"use client";

import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import NodeSetupSelectCard from "../NodeSetupSelectCard";
import { Download, Upload, Plus, Trash2 } from "lucide-react";

interface Props {
  phase: number;
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

const MEMORY_OPTS = [
  { kind: "read",   icon: Download, label: "읽기", description: "저장된 값을 불러옵니다" },
  { kind: "write",  icon: Upload,   label: "저장", description: "값을 새로 저장합니다 (덮어씀)" },
  { kind: "append", icon: Plus,     label: "추가", description: "기존 값에 새 내용을 이어 붙입니다" },
  { kind: "clear",  icon: Trash2,   label: "삭제", description: "저장된 값을 완전히 지웁니다" },
];

const MemoryPhase = ({ phase, draft, update }: Props) => {
  if (phase === 0) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {MEMORY_OPTS.map((o) => (
          <NodeSetupSelectCard key={o.kind} icon={o.icon} label={o.label} description={o.description} selected={draft.operation === o.kind} onClick={() => update({ operation: o.kind })} />
        ))}
      </div>
    );
  }

  const op = draft.operation as string;
  const varName = (draft.outputVariable as string) || "memory_value";

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs">저장소 이름 (키) <span className="text-destructive">*</span></Label>
        <Input className="h-9 text-sm font-mono" placeholder="예: user_history, last_result" value={(draft.key as string) || ""} onChange={(e) => update({ key: e.target.value })} autoFocus />
        <p className="text-[10px] text-muted-foreground">같은 이름으로 다른 노드에서 읽고 쓸 수 있어요</p>
      </div>
      {(op === "write" || op === "append") && (
        <div className="space-y-1.5">
          <Label className="text-xs">저장할 값</Label>
          <Input className="h-8 text-xs font-mono" placeholder="예: {{llm_result}}" value={(draft.valueExpression as string) || ""} onChange={(e) => update({ valueExpression: e.target.value })} />
        </div>
      )}
      {op === "read" && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/40">
          <span className="text-[10px] text-muted-foreground flex-1">읽은 값을 <code className="bg-background px-1 rounded font-mono">{`{{${varName}}}`}</code>에 저장</span>
          <Input className="h-6 w-24 text-[10px] font-mono" value={(draft.outputVariable as string) || ""} onChange={(e) => update({ outputVariable: e.target.value })} />
        </div>
      )}
    </div>
  );
};

export default MemoryPhase;

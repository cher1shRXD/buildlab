"use client";

import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import NodeSetupSelectCard from "../NodeSetupSelectCard";
import { Plus, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import type { LogicCondition } from "@/entities/flow/types";

interface Props {
  phase: number;
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

import { LOGIC_PHASE_OPTIONS } from "../../constants/logic-phase";

const LogicPhase = ({ phase, draft, update }: Props) => {
  if (phase === 0) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {LOGIC_PHASE_OPTIONS.map((o) => (
          <NodeSetupSelectCard key={o.kind} icon={o.icon} label={o.label} description={o.description} selected={draft.logicKind === o.kind} onClick={() => update({ logicKind: o.kind })} />
        ))}
      </div>
    );
  }

  const lKind = draft.logicKind as string;

  if (lKind === "loop") {
    return (
      <div className="space-y-1.5">
        <Label className="text-xs">반복할 목록 변수</Label>
        <Input className="h-9 text-sm font-mono" placeholder="예: {{items}}" value={(draft.loopOver as string) || ""} onChange={(e) => update({ loopOver: e.target.value })} autoFocus />
        <p className="text-[10px] text-muted-foreground">이 변수의 각 항목마다 아래 노드들이 실행됩니다</p>
      </div>
    );
  }

  if (lKind === "parallel") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
        <p className="text-sm font-semibold">동시 실행 노드</p>
        <p className="text-xs text-muted-foreground leading-relaxed">이 노드에서 연결된 모든 경로를 동시에 실행합니다.<br />추가 설정이 필요 없어요.</p>
      </div>
    );
  }

  const conditions = (draft.conditions as LogicCondition[]) || [];
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-xs">분기 조건</Label>
        <button type="button" onClick={() => update({ conditions: [...conditions, { id: nanoid(), expression: "", label: `분기 ${conditions.length + 1}` }] })} className="flex items-center gap-1 text-[10px] text-primary hover:underline">
          <Plus size={10} /> 조건 추가
        </button>
      </div>
      {conditions.map((c, i) => (
        <div key={c.id} className="rounded-lg border border-border/60 overflow-hidden">
          <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-border/40 bg-muted/30">
            <span className="text-[10px] text-muted-foreground shrink-0">분기 {i + 1}</span>
            <Input className="h-6 text-[10px] flex-1 border-0 bg-transparent p-0 focus-visible:ring-0" placeholder="이름 (예: 성공, 실패)" value={c.label} onChange={(e) => { const next = [...conditions]; next[i] = { ...next[i], label: e.target.value }; update({ conditions: next }); }} />
            <button type="button" onClick={() => update({ conditions: conditions.filter((_, idx) => idx !== i) })} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={11} /></button>
          </div>
          <div className="px-2.5 py-2">
            <Input className="h-7 text-[10px] font-mono" placeholder={i === 0 ? '예: {{result}} === "ok"' : '예: {{result}} !== "ok"'} value={c.expression} onChange={(e) => { const next = [...conditions]; next[i] = { ...next[i], expression: e.target.value }; update({ conditions: next }); }} />
          </div>
        </div>
      ))}
      {conditions.length === 0 && <p className="text-[11px] text-muted-foreground text-center py-4 border border-dashed rounded-lg">조건을 추가하세요</p>}
    </div>
  );
};

export default LogicPhase;

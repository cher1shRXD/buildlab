"use client";

import { useNodeEditor } from "@/features/node-editor/hooks/useNodeEditor";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Trash2, Plus } from "lucide-react";
import { ModeButton, ModeGroup } from "@/shared/ui/mode";
import { FormField } from "@/shared/ui/FormField";
import { nanoid } from "nanoid";
import type { LogicNodeData } from "@/entities/flow/types";
import { LOGIC_MODES } from "../constants/logic-modes";

interface Props {
  nodeId: string;
  data: LogicNodeData;
}

const LogicNodeForm = ({ nodeId, data }: Props) => {
  const { updateNodeData } = useNodeEditor();
  const u = (field: string, value: unknown) => updateNodeData(nodeId, { [field]: value });
  const conditions = data.conditions ?? [];
  const currentMode = LOGIC_MODES.find((m) => m.kind === data.logicKind) ?? LOGIC_MODES[0];

  const addCondition = () => {
    u("conditions", [
      ...conditions,
      { id: nanoid(), expression: "", label: `branch${conditions.length + 1}` },
    ]);
  };

  const updateCondition = (index: number, field: string, value: string) => {
    const next = [...conditions];
    next[index] = { ...next[index], [field]: value };
    u("conditions", next);
  };

  const removeCondition = (index: number) => {
    u("conditions", conditions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <FormField label="노드 이름">
        <Input className="h-9 text-sm" value={data.label} onChange={(e) => u("label", e.target.value)} />
      </FormField>

      <div className="h-px bg-border/40" />

      <ModeGroup label="어떻게 분기할까요?" hint={currentMode.hint}>
        {LOGIC_MODES.map((m) => (
          <ModeButton
            key={m.kind}
            Icon={m.Icon}
            label={m.label}
            selected={data.logicKind === m.kind}
            onClick={() => u("logicKind", m.kind)}
          />
        ))}
      </ModeGroup>

      <div className="h-px bg-border/40" />

      {data.logicKind === "loop" && (
        <FormField label="어떤 목록을 반복할까요?" hint="이 변수의 각 항목마다 아래 노드들이 실행됩니다">
          <Input
            className="h-9 text-sm font-mono"
            placeholder="예: {{items}}"
            value={data.loopOver ?? ""}
            onChange={(e) => u("loopOver", e.target.value)}
          />
        </FormField>
      )}

      {(data.logicKind === "if" || data.logicKind === "switch") && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-foreground leading-none">분기 조건</p>
            <Button size="sm" variant="outline" onClick={addCondition} className="h-7 text-xs gap-1.5">
              <Plus size={12} /> 조건 추가
            </Button>
          </div>

          {conditions.map((c, i) => (
            <div key={c.id} className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden">
              <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/40 bg-card">
                <span className="text-xs text-muted-foreground">분기 {i + 1}</span>
                <Input
                  className="h-7 text-sm flex-1 border-0 bg-transparent px-1 py-0 focus-visible:ring-0"
                  placeholder="이름 (예: 성공, 실패)"
                  value={c.label}
                  onChange={(e) => updateCondition(i, "label", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeCondition(i)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="px-3 py-3 space-y-2">
                <Input
                  className="h-9 text-sm font-mono"
                  placeholder={i === 0 ? "예: {{result}} === \"ok\"" : "예: {{result}} !== \"ok\""}
                  value={c.expression}
                  onChange={(e) => updateCondition(i, "expression", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">이 조건이 참이면 이 분기로 흐릅니다</p>
              </div>
            </div>
          ))}

          {conditions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-5 border border-dashed rounded-xl">
              조건을 추가하세요
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LogicNodeForm;

"use client";

import { useNodeEditor } from "@/features/node-editor/hooks/useNodeEditor";
import { Input } from "@/shared/ui/Input";
import { ModeButton, ModeGroup } from "@/shared/ui/mode";
import { FormField } from "@/shared/ui/FormField";
import { OutputVarRow } from "@/shared/ui/OutputVarRow";
import type { MemoryNodeData } from "@/entities/flow/types";
import { OPERATION_MODES } from "../constants/operation-modes";
import { SCOPE_MODES } from "../constants/scope-modes";

interface Props {
  nodeId: string;
  data: MemoryNodeData;
}

const MemoryNodeForm = ({ nodeId, data }: Props) => {
  const { updateNodeData } = useNodeEditor();
  const u = (field: string, value: unknown) => updateNodeData(nodeId, { [field]: value });

  const currentOp = OPERATION_MODES.find((m) => m.op === data.operation) ?? OPERATION_MODES[0];
  const currentScope = SCOPE_MODES.find((m) => m.scope === data.scope) ?? SCOPE_MODES[0];

  return (
    <div className="space-y-6">
      <FormField label="노드 이름">
        <Input className="h-9 text-sm" value={data.label} onChange={(e) => u("label", e.target.value)} />
      </FormField>

      <div className="h-px bg-border/40" />

      <ModeGroup label="무엇을 할까요?" hint={currentOp.hint}>
        {OPERATION_MODES.map((m) => (
          <ModeButton
            key={m.op}
            Icon={m.Icon}
            label={m.label}
            selected={data.operation === m.op}
            onClick={() => u("operation", m.op)}
          />
        ))}
      </ModeGroup>

      {data.operation !== "clear" && (
        <ModeGroup label="얼마나 오래 저장할까요?" hint={currentScope.hint}>
          {SCOPE_MODES.map((m) => (
            <ModeButton
              key={m.scope}
              Icon={m.Icon}
              label={m.label}
              selected={data.scope === m.scope}
              onClick={() => u("scope", m.scope)}
            />
          ))}
        </ModeGroup>
      )}

      <div className="h-px bg-border/40" />

      <FormField label="저장소 이름 (키)" hint="같은 이름으로 다른 노드에서 읽고 쓸 수 있어요">
        <Input
          className="h-9 text-sm font-mono"
          placeholder="예: user_history, last_result"
          value={data.key}
          onChange={(e) => u("key", e.target.value)}
        />
      </FormField>

      {(data.operation === "write" || data.operation === "append") && (
        <FormField
          label="저장할 값"
          hint={<><code className="bg-muted px-1.5 py-0.5 rounded-md text-[11px]">{"{{변수명}}"}</code> 으로 이전 노드 결과를 저장할 수 있어요</>}
        >
          <Input
            className="h-9 text-sm font-mono"
            placeholder="예: {{llm_result}}"
            value={data.valueExpression ?? ""}
            onChange={(e) => u("valueExpression", e.target.value)}
          />
        </FormField>
      )}

      {data.operation === "read" && (
        <>
          <div className="h-px bg-border/40" />
          <OutputVarRow prefix="읽은 값을" value={data.outputVariable ?? ""} onChange={(v) => u("outputVariable", v)} />
        </>
      )}
    </div>
  );
};

export default MemoryNodeForm;

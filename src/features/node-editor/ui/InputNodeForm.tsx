"use client";

import { useNodeEditor } from "@/features/node-editor/hooks/useNodeEditor";
import { Input } from "@/shared/ui/Input";
import { FormField } from "@/shared/ui/FormField";
import { OutputVarRow } from "@/shared/ui/OutputVarRow";
import type { InputNodeData } from "@/entities/flow/types";

interface Props {
  nodeId: string;
  data: InputNodeData;
}

const InputNodeForm = ({ nodeId, data }: Props) => {
  const { updateNodeData } = useNodeEditor();
  const u = (field: string, value: unknown) => updateNodeData(nodeId, { [field]: value });

  return (
    <div className="space-y-6">
      <FormField label="노드 이름">
        <Input
          className="h-9 text-sm"
          value={data.label}
          onChange={(e) => u("label", e.target.value)}
        />
      </FormField>

      <div className="h-px bg-border/40" />

      <OutputVarRow
        prefix="사용자 입력은"
        value={data.outputVariable ?? ""}
        onChange={(v) => u("outputVariable", v)}
      />

      <div className="rounded-xl bg-muted/40 border border-border/50 px-4 py-3 space-y-1">
        <p className="text-xs font-medium text-muted-foreground">사용 방법</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          LLM 노드의 프롬프트에서{" "}
          <code className="bg-background border border-border/40 px-1.5 py-0.5 rounded-md font-mono text-foreground text-[11px]">
            {`{{${data.outputVariable || "user_input"}}}`}
          </code>{" "}
          으로 참조하세요.
        </p>
      </div>
    </div>
  );
};

export default InputNodeForm;

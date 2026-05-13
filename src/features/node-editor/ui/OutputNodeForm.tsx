"use client";

import { useNodeEditor } from "@/features/node-editor/hooks/useNodeEditor";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Switch } from "@/shared/ui/Switch";
import { ModeButton, ModeGroup } from "@/shared/ui/mode";
import { FormField } from "@/shared/ui/FormField";
import type { OutputNodeData } from "@/entities/flow/types";
import { FORMAT_MODES } from "../constants/format-modes";

interface Props {
  nodeId: string;
  data: OutputNodeData;
}

const OutputNodeForm = ({ nodeId, data }: Props) => {
  const { updateNodeData } = useNodeEditor();
  const u = (field: string, value: unknown) => updateNodeData(nodeId, { [field]: value });

  return (
    <div className="space-y-6">
      <FormField label="노드 이름">
        <Input className="h-9 text-sm" value={data.label} onChange={(e) => u("label", e.target.value)} />
      </FormField>

      <div className="h-px bg-border/40" />

      <ModeGroup label="어떻게 보여줄까요?">
        {FORMAT_MODES.map((m) => (
          <ModeButton
            key={m.value}
            Icon={m.Icon}
            label={m.label}
            selected={data.format === m.value}
            onClick={() => u("format", m.value)}
          />
        ))}
      </ModeGroup>

      {data.format === "code" && (
        <FormField label="언어">
          <Input
            className="h-9 text-sm"
            placeholder="예: python, javascript"
            value={data.codeLanguage ?? ""}
            onChange={(e) => u("codeLanguage", e.target.value)}
          />
        </FormField>
      )}

      <div className="h-px bg-border/40" />

      <FormField
        label="출력할 내용"
        hint={<><code className="bg-muted px-1.5 py-0.5 rounded-md text-[11px]">{"{{변수명}}"}</code> 으로 이전 노드 결과 삽입</>}
      >
        <div className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden focus-within:border-primary/40 transition-colors">
          <Textarea
            rows={6}
            className="text-sm border-0 bg-transparent px-4 py-3 resize-none focus-visible:ring-0 font-mono placeholder:text-muted-foreground/50 leading-relaxed"
            placeholder={"예:\n## 결과\n\n{{llm_result}}"}
            value={data.template}
            onChange={(e) => u("template", e.target.value)}
          />
        </div>
      </FormField>

      <div className="h-px bg-border/40" />

      <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-muted/20 border border-border/40">
        <div>
          <p className="text-sm font-medium">실시간으로 전송</p>
          <p className="text-xs text-muted-foreground mt-0.5">생성되는 즉시 사용자에게 보여줌</p>
        </div>
        <Switch checked={data.streamToUser} onCheckedChange={(v) => u("streamToUser", v)} />
      </div>
    </div>
  );
};

export default OutputNodeForm;

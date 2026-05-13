"use client";

import { nanoid } from "nanoid";
import { Trash2, Plus } from "lucide-react";
import { useNodeEditor } from "@/features/node-editor/hooks/useNodeEditor";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Switch } from "@/shared/ui/Switch";
import { FormField } from "@/shared/ui/FormField";
import type { InputNodeData, InputField, InputFieldType } from "@/entities/flow/types";

interface Props {
  nodeId: string;
  data: InputNodeData;
}

const FIELD_TYPES: { value: InputFieldType; label: string }[] = [
  { value: "string", label: "텍스트" },
  { value: "number", label: "숫자" },
  { value: "boolean", label: "참/거짓" },
  { value: "array", label: "목록" },
  { value: "object", label: "객체" },
];

const InputNodeForm = ({ nodeId, data }: Props) => {
  const { updateNodeData } = useNodeEditor();
  const fields = data.fields ?? [];

  const addField = () => {
    updateNodeData(nodeId, {
      fields: [...fields, { id: nanoid(6), name: "", type: "string" as const, required: true }],
    });
  };

  const updateField = (id: string, patch: Partial<InputField>) => {
    updateNodeData(nodeId, {
      fields: fields.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    });
  };

  const removeField = (id: string) => {
    updateNodeData(nodeId, { fields: fields.filter((f) => f.id !== id) });
  };

  return (
    <div className="space-y-6">
      <FormField label="노드 이름">
        <Input
          className="h-9 text-sm"
          value={data.label}
          onChange={(e) => updateNodeData(nodeId, { label: e.target.value })}
        />
      </FormField>

      <div className="h-px bg-border/40" />

      <div className="space-y-3">
        <p className="text-[13px] font-medium text-foreground leading-none">입력 필드</p>

        {fields.length === 0 && (
          <p className="text-xs text-muted-foreground py-1">
            아직 필드가 없어요. 아래 버튼으로 추가하세요.
          </p>
        )}

        {fields.map((f) => (
          <div key={f.id} className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 bg-card">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">필수</span>
                <Switch
                  checked={f.required}
                  onCheckedChange={(v) => updateField(f.id, { required: v })}
                />
              </div>
              <button
                type="button"
                onClick={() => removeField(f.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
            <div className="px-3 py-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <FormField label="이름">
                  <Input
                    className="h-8 text-sm"
                    placeholder="변수명"
                    value={f.name}
                    onChange={(e) => updateField(f.id, { name: e.target.value })}
                  />
                </FormField>
                <FormField label="타입">
                  <select
                    className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
                    value={f.type}
                    onChange={(e) => updateField(f.id, { type: e.target.value as InputFieldType })}
                  >
                    {FIELD_TYPES.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
              <FormField label="설명 (선택)">
                <Input
                  className="h-8 text-sm"
                  placeholder="이 필드가 무엇인지 설명해요"
                  value={f.description ?? ""}
                  onChange={(e) => updateField(f.id, { description: e.target.value })}
                />
              </FormField>
            </div>
          </div>
        ))}

        <Button variant="outline" size="sm" className="w-full gap-1.5" onClick={addField}>
          <Plus size={13} />
          필드 추가
        </Button>
      </div>
    </div>
  );
};

export default InputNodeForm;

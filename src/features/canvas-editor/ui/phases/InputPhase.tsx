"use client";

import { nanoid } from "nanoid";
import { Trash2, Plus } from "lucide-react";
import { Input } from "@/shared/ui/Input";
import { Switch } from "@/shared/ui/Switch";
import { Button } from "@/shared/ui/Button";
import type { InputField, InputFieldType } from "@/entities/flow/types";

interface Props {
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

const FIELD_TYPES: { value: InputFieldType; label: string }[] = [
  { value: "string",  label: "텍스트" },
  { value: "number",  label: "숫자" },
  { value: "boolean", label: "참/거짓" },
  { value: "array",   label: "목록" },
  { value: "object",  label: "객체" },
];

const InputPhase = ({ draft, update }: Props) => {
  const fields = (draft.fields as InputField[]) ?? [];

  const addField = () => {
    update({ fields: [...fields, { id: nanoid(6), name: "", type: "string" as const, required: true }] });
  };

  const updateField = (id: string, patch: Partial<InputField>) => {
    update({ fields: fields.map((f) => (f.id === id ? { ...f, ...patch } : f)) });
  };

  const removeField = (id: string) => {
    update({ fields: fields.filter((f) => f.id !== id) });
  };

  return (
    <div className="space-y-3">
      {fields.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-4">
          아직 필드가 없어요. 추가 버튼으로 시작하세요.
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
          <div className="px-3 py-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">이름</p>
                <Input
                  className="h-8 text-sm"
                  placeholder="변수명"
                  value={f.name}
                  onChange={(e) => updateField(f.id, { name: e.target.value })}
                  autoFocus={fields.indexOf(f) === fields.length - 1 && f.name === ""}
                />
              </div>
              <div className="space-y-1">
                <p className="text-[11px] text-muted-foreground">타입</p>
                <select
                  className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm"
                  value={f.type}
                  onChange={(e) => updateField(f.id, { type: e.target.value as InputFieldType })}
                >
                  {FIELD_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" size="sm" className="w-full gap-1.5" onClick={addField}>
        <Plus size={13} />
        필드 추가
      </Button>
    </div>
  );
};

export default InputPhase;

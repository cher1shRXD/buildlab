"use client";

import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { Input } from "@/shared/ui/Input";
import { Trash2, Hash, MessageCircle, Play, Globe } from "lucide-react";
import { ModeButton } from "@/shared/ui/ModeButton";
import { FormField } from "@/shared/ui/FormField";
import type { TriggerNodeData, TriggerItem } from "@/entities/flow/types";
import type { LucideIcon } from "lucide-react";

interface Props {
  nodeId: string;
  data: TriggerNodeData;
}

const TRIGGER_MODES: { kind: TriggerItem["kind"]; Icon: LucideIcon; label: string; placeholder: string; hint: string }[] = [
  { kind: "keyword", Icon: Hash,          label: "단어/명령어", placeholder: "예: /배포",         hint: "이 단어가 입력되면 실행" },
  { kind: "context", Icon: MessageCircle, label: "문맥 감지",   placeholder: "예: 코드 리뷰해줘", hint: "비슷한 의도의 메시지가 오면 실행" },
  { kind: "manual",  Icon: Play,          label: "수동 호출",   placeholder: "",                  hint: "다른 도구에서 직접 호출" },
  { kind: "webhook", Icon: Globe,         label: "외부 연동",   placeholder: "웹훅 경로",         hint: "HTTP 요청으로 외부에서 트리거" },
];

const TriggerNodeForm = ({ nodeId, data }: Props) => {
  const updateNodeData = useFlowStore((s) => s.updateNodeData);
  const triggers = data.triggers ?? [];

  function addTrigger(kind: TriggerItem["kind"]) {
    updateNodeData(nodeId, {
      triggers: [...triggers, { kind, value: "", matchMode: "exact" as const }],
    });
  }

  function updateValue(index: number, value: string) {
    const next = [...triggers];
    next[index] = { ...next[index], value };
    updateNodeData(nodeId, { triggers: next });
  }

  function changeKind(index: number, kind: TriggerItem["kind"]) {
    const next = [...triggers];
    next[index] = { ...next[index], kind, value: "" };
    updateNodeData(nodeId, { triggers: next });
  }

  function removeTrigger(index: number) {
    updateNodeData(nodeId, { triggers: triggers.filter((_, i) => i !== index) });
  }

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
        <p className="text-[13px] font-medium text-foreground leading-none">이 스킬은 언제 실행되나요?</p>

        {triggers.map((t, i) => {
          const mode = TRIGGER_MODES.find((m) => m.kind === t.kind) ?? TRIGGER_MODES[0];
          return (
            <div key={i} className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden">
              <div className="flex gap-1 p-2 border-b border-border/40 bg-card">
                {TRIGGER_MODES.map((m) => (
                  <button
                    key={m.kind}
                    type="button"
                    onClick={() => changeKind(i, m.kind)}
                    className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-xs ${
                      t.kind === m.kind
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <m.Icon size={12} />
                    <span className="hidden sm:inline">{m.label.split("/")[0]}</span>
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => removeTrigger(i)}
                  className="px-2.5 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="px-4 py-3 space-y-2">
                <p className="text-sm font-medium">{mode.label}</p>
                {t.kind !== "manual" && (
                  <Input
                    className="h-9 text-sm"
                    placeholder={mode.placeholder}
                    value={t.value}
                    onChange={(e) => updateValue(i, e.target.value)}
                  />
                )}
                <p className="text-xs text-muted-foreground">{mode.hint}</p>
              </div>
            </div>
          );
        })}

        <div className="grid grid-cols-2 gap-2">
          {TRIGGER_MODES.slice(0, 2).map((m) => (
            <ModeButton
              key={m.kind}
              Icon={m.Icon}
              label={`+ ${m.label}`}
              selected={false}
              onClick={() => addTrigger(m.kind)}
            />
          ))}
          <ModeButton Icon={Play} label="+ 수동" selected={false} onClick={() => addTrigger("manual")} />
          <ModeButton Icon={Globe} label="+ 웹훅" selected={false} onClick={() => addTrigger("webhook")} />
        </div>
      </div>
    </div>
  );
};

export default TriggerNodeForm;

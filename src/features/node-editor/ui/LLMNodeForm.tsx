"use client";

import { useState } from "react";
import { useNodeEditor } from "@/features/node-editor/hooks/useNodeEditor";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Switch } from "@/shared/ui/Switch";
import { ChevronDown, ChevronRight, Sparkles, Bot, Gem, Server } from "lucide-react";
import { ModeButton, ModeGroup } from "@/shared/ui/mode";
import { FormField } from "@/shared/ui/FormField";
import { OutputVarRow } from "@/shared/ui/OutputVarRow";
import type { LLMNodeData } from "@/entities/flow/types";
import type { LucideIcon } from "lucide-react";

interface Props {
  nodeId: string;
  data: LLMNodeData;
}

const AI_MODELS: { provider: string; model: string; Icon: LucideIcon; label: string; sub: string }[] = [
  { provider: "anthropic", model: "claude-sonnet-4-6", Icon: Sparkles, label: "Claude",  sub: "추천" },
  { provider: "openai",    model: "gpt-4o",            Icon: Bot,      label: "GPT-4o",  sub: "OpenAI" },
  { provider: "gemini",    model: "gemini-2.0-flash",  Icon: Gem,      label: "Gemini",  sub: "Google" },
  { provider: "ollama",    model: "llama3.2",          Icon: Server,   label: "Llama",   sub: "로컬" },
];

const LLMNodeForm = ({ nodeId, data }: Props) => {
  const { updateNodeData } = useNodeEditor();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const u = (field: string, value: unknown) => updateNodeData(nodeId, { [field]: value });

  const currentAI = AI_MODELS.find(
    (m) => m.provider === data.provider && m.model === data.model
  ) ?? AI_MODELS[0];

  return (
    <div className="space-y-6">
      <FormField label="노드 이름">
        <Input className="h-9 text-sm" value={data.label} onChange={(e) => u("label", e.target.value)} />
      </FormField>

      <div className="h-px bg-border/40" />

      <ModeGroup label="어떤 AI를 쓸까요?" hint={`${currentAI.sub} · ${currentAI.model}`}>
        {AI_MODELS.map((m) => (
          <ModeButton
            key={m.model}
            Icon={m.Icon}
            label={m.label}
            selected={data.provider === m.provider && data.model === m.model}
            onClick={() => updateNodeData(nodeId, { provider: m.provider, model: m.model })}
          />
        ))}
      </ModeGroup>

      <div className="h-px bg-border/40" />

      <FormField
        label="AI에게 시킬 일을 써주세요"
        hint={<><code className="bg-muted px-1.5 py-0.5 rounded-md text-[11px]">{"{{변수명}}"}</code> 으로 이전 노드 결과 참조</>}
      >
        <div className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden focus-within:border-primary/40 transition-colors">
          <div className="px-4 py-3 border-b border-border/40">
            <p className="text-xs text-muted-foreground mb-2">역할 설정 (선택)</p>
            <Input
              className="h-8 text-sm border-0 bg-transparent px-1 py-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
              placeholder="예: 당신은 친절한 번역가입니다"
              value={data.systemPrompt}
              onChange={(e) => u("systemPrompt", e.target.value)}
            />
          </div>
          <div className="px-4 py-3">
            <p className="text-xs text-muted-foreground mb-2">
              지시사항 <span className="text-destructive">*</span>
            </p>
            <Textarea
              rows={5}
              className="text-sm border-0 bg-transparent px-1 py-0 resize-none focus-visible:ring-0 placeholder:text-muted-foreground/50 leading-relaxed"
              placeholder={"예:\n다음 텍스트를 한국어로 번역해줘:\n\n{{user_message}}"}
              value={data.userPromptTemplate}
              onChange={(e) => u("userPromptTemplate", e.target.value)}
            />
          </div>
        </div>
      </FormField>

      <div className="h-px bg-border/40" />

      <OutputVarRow value={data.outputVariable} onChange={(v) => u("outputVariable", v)} />

      <button
        type="button"
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-full py-1"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        {showAdvanced ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        고급 설정 (Temperature · 최대 토큰 · 스트리밍)
      </button>

      {showAdvanced && (
        <div className="space-y-4 px-4 py-4 rounded-xl bg-muted/20 border border-border/40">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="창의성 (0→1)">
              <Input type="number" min={0} max={1} step={0.1} value={data.temperature}
                onChange={(e) => u("temperature", parseFloat(e.target.value))}
                className="h-9 text-sm" />
            </FormField>
            <FormField label="최대 길이">
              <Input type="number" min={1} max={32000} value={data.maxTokens}
                onChange={(e) => u("maxTokens", parseInt(e.target.value))}
                className="h-9 text-sm" />
            </FormField>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm">실시간 스트리밍</p>
            <Switch checked={data.streamOutput} onCheckedChange={(v) => u("streamOutput", v)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LLMNodeForm;

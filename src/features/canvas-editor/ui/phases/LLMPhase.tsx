"use client";

import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Label } from "@/shared/ui/Label";
import NodeSetupSelectCard from "../NodeSetupSelectCard";
import { Sparkles, Bot, Gem, Server } from "lucide-react";

interface Props {
  phase: number;
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

const MODELS = [
  { provider: "anthropic", model: "claude-sonnet-4-6", icon: Sparkles, label: "Claude",  description: "Anthropic · 추천, 최고의 한국어 이해" },
  { provider: "openai",    model: "gpt-4o",            icon: Bot,      label: "GPT-4o",  description: "OpenAI · 강력한 범용 모델" },
  { provider: "gemini",    model: "gemini-2.0-flash",  icon: Gem,      label: "Gemini",  description: "Google · 빠른 응답, 저렴한 비용" },
  { provider: "ollama",    model: "llama3.2",          icon: Server,   label: "Llama",   description: "로컬 실행 · 인터넷 없이 사용 가능" },
];

const LLMPhase = ({ phase, draft, update }: Props) => {
  if (phase === 0) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {MODELS.map((m) => (
          <NodeSetupSelectCard
            key={m.model}
            icon={m.icon}
            label={m.label}
            description={m.description}
            selected={draft.provider === m.provider && draft.model === m.model}
            onClick={() => update({ provider: m.provider, model: m.model })}
          />
        ))}
      </div>
    );
  }

  const varName = (draft.outputVariable as string) || "llm_result";
  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs">역할 설정 <span className="text-muted-foreground">(선택)</span></Label>
        <Input className="h-8 text-xs" placeholder="예: 당신은 친절한 번역가입니다" value={(draft.systemPrompt as string) || ""} onChange={(e) => update({ systemPrompt: e.target.value })} />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">지시사항 <span className="text-destructive">*</span></Label>
        <Textarea rows={5} className="text-xs font-mono resize-none" placeholder={"예:\n다음 텍스트를 한국어로 번역해줘:\n\n{{user_message}}"} value={(draft.userPromptTemplate as string) || ""} onChange={(e) => update({ userPromptTemplate: e.target.value })} autoFocus />
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/40">
        <span className="text-[10px] text-muted-foreground flex-1">결과 변수: <code className="bg-background px-1 rounded font-mono">{`{{${varName}}}`}</code></span>
        <Input className="h-6 w-24 text-[10px] font-mono" value={(draft.outputVariable as string) || ""} onChange={(e) => update({ outputVariable: e.target.value })} />
      </div>
    </div>
  );
};

export default LLMPhase;

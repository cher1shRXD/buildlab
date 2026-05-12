"use client";

import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import NodeSetupSelectCard from "../NodeSetupSelectCard";
import { Hash, MessageCircle, Play, Clock } from "lucide-react";

interface Props {
  phase: number;
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

const TRIGGER_OPTS = [
  { kind: "keyword",  icon: Hash,          label: "키워드로",   description: "정확한 명령어를 입력하면 실행 (예: /번역)" },
  { kind: "context",  icon: MessageCircle, label: "자연어로",   description: "AI가 대화 맥락을 파악해 자동 실행" },
  { kind: "manual",   icon: Play,          label: "수동 실행",  description: "사용자가 직접 버튼을 눌러 실행" },
  { kind: "schedule", icon: Clock,         label: "스케줄",     description: "Cron 표현식으로 정해진 시간에 실행" },
];

const TriggerPhase = ({ phase, draft, update }: Props) => {
  if (phase === 0) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {TRIGGER_OPTS.map((o) => (
          <NodeSetupSelectCard
            key={o.kind}
            icon={o.icon}
            label={o.label}
            description={o.description}
            selected={draft.triggerKind === o.kind}
            onClick={() => update({ triggerKind: o.kind })}
          />
        ))}
      </div>
    );
  }

  const tKind = draft.triggerKind as string;
  if (tKind === "manual") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
        <p className="text-sm font-semibold">수동 실행 노드</p>
        <p className="text-xs text-muted-foreground leading-relaxed">사용자가 직접 실행 버튼을 눌러 스킬을 시작합니다.<br />추가 설정이 필요 없어요.</p>
      </div>
    );
  }

  const fieldLabel = tKind === "keyword" ? "활성화 키워드" : tKind === "context" ? "컨텍스트 설명" : "Cron 표현식";
  const placeholder = tKind === "keyword" ? "예: /번역, /요약" : tKind === "context" ? "예: 사용자가 번역을 요청할 때" : "예: 0 9 * * 1";

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label className="text-xs">{fieldLabel} <span className="text-destructive">*</span></Label>
        <Input className="h-9 text-sm font-mono" placeholder={placeholder} value={(draft.triggerValue as string) || ""} onChange={(e) => update({ triggerValue: e.target.value })} autoFocus />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">노드 이름 <span className="text-muted-foreground">(선택)</span></Label>
        <Input className="h-8 text-xs" placeholder="예: 번역 시작" value={(draft.label as string) || ""} onChange={(e) => update({ label: e.target.value })} />
      </div>
    </div>
  );
};

export default TriggerPhase;

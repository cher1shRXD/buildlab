"use client";

import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";

interface Props {
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

const TemplatePhase = ({ draft, update }: Props) => (
  <div className="space-y-3">
    <div className="space-y-1.5">
      <Label className="text-xs">참조할 스킬 ID</Label>
      <Input className="h-9 text-sm font-mono" placeholder="skill-id-here" value={(draft.referencedSkillId as string) || ""} onChange={(e) => update({ referencedSkillId: e.target.value })} autoFocus />
      <p className="text-[10px] text-muted-foreground">대시보드의 스킬 URL에서 ID를 확인할 수 있어요</p>
    </div>
    <div className="space-y-1.5">
      <Label className="text-xs">노드 이름 <span className="text-muted-foreground">(선택)</span></Label>
      <Input className="h-8 text-xs" placeholder="예: 번역 서브플로우" value={(draft.label as string) || ""} onChange={(e) => update({ label: e.target.value })} />
    </div>
  </div>
);

export default TemplatePhase;

"use client";

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { Textarea } from "@/shared/ui/Textarea";
import { DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { ArrowLeft } from "lucide-react";
import type { SkillTemplate } from "@/shared/config/skill-templates";

interface Props {
  selected: SkillTemplate;
  name: string;
  description: string;
  isPending: boolean;
  onNameChange: (v: string) => void;
  onDescriptionChange: (v: string) => void;
  onBack: () => void;
  onCreate: () => void;
  onClose: () => void;
}

const CreateSkillNameStep = ({ selected, name, description, isPending, onNameChange, onDescriptionChange, onBack, onCreate, onClose }: Props) => (
  <>
    <DialogHeader className="px-6 pt-6 pb-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="size-7" onClick={onBack}>
          <ArrowLeft size={15} />
        </Button>
        <div>
          <DialogTitle className="flex items-center gap-2">
            <selected.Icon size={15} style={{ color: selected.iconColor }} />
            <span>{selected.label}</span>
          </DialogTitle>
          <p className="text-xs text-muted-foreground mt-0.5 ml-7">스킬 이름을 정해주세요</p>
        </div>
      </div>
    </DialogHeader>
    <div className="px-6 pb-6 space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="skill-name">스킬 이름 <span className="text-destructive">*</span></Label>
        <Input id="skill-name" placeholder="예: my-deploy-helper" value={name} onChange={(e) => onNameChange(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onCreate()} autoFocus />
        <p className="text-xs text-muted-foreground">영문·숫자·하이픈만 사용하면 SKILL.md name 필드로 그대로 쓰입니다</p>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="skill-desc">설명 (선택)</Label>
        <Textarea id="skill-desc" placeholder="이 스킬이 무엇을 하는지 간단히 설명하세요..." value={description} onChange={(e) => onDescriptionChange(e.target.value)} rows={2} />
      </div>
      <div className="flex gap-2 pt-1">
        <Button variant="outline" className="flex-1" onClick={onClose}>취소</Button>
        <Button className="flex-1" onClick={onCreate} disabled={isPending || !name.trim()}>
          {isPending ? "생성 중..." : "만들기 →"}
        </Button>
      </div>
    </div>
  </>
);

export default CreateSkillNameStep;

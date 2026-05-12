"use client";

import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Label } from "@/shared/ui/Label";
import NodeSetupSelectCard from "../NodeSetupSelectCard";
import { FileText, AlignLeft, Code2, Braces } from "lucide-react";

interface Props {
  phase: number;
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

const OUTPUT_OPTS = [
  { kind: "markdown", icon: FileText,  label: "마크다운",   description: "제목, 목록, 코드 블록 등을 렌더링합니다" },
  { kind: "plain",    icon: AlignLeft, label: "일반 텍스트", description: "포맷 없이 텍스트 그대로 표시합니다" },
  { kind: "code",     icon: Code2,     label: "코드",        description: "코드 블록으로 보여줍니다" },
  { kind: "json",     icon: Braces,    label: "JSON",        description: "구조화된 데이터를 JSON으로 출력합니다" },
];

const OutputPhase = ({ phase, draft, update }: Props) => {
  if (phase === 0) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {OUTPUT_OPTS.map((o) => (
          <NodeSetupSelectCard key={o.kind} icon={o.icon} label={o.label} description={o.description} selected={draft.format === o.kind} onClick={() => update({ format: o.kind })} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label className="text-xs">출력할 내용</Label>
        <Textarea rows={6} className="text-xs font-mono resize-none" placeholder={"예:\n## 번역 결과\n\n{{llm_result}}"} value={(draft.template as string) || ""} onChange={(e) => update({ template: e.target.value })} autoFocus />
        <p className="text-[10px] text-muted-foreground"><code className="bg-muted px-1 rounded">{"{{변수명}}"}</code> 으로 이전 노드 결과를 삽입할 수 있어요</p>
      </div>
      {draft.format === "code" && (
        <div className="space-y-1.5">
          <Label className="text-xs">언어 <span className="text-muted-foreground">(선택)</span></Label>
          <Input className="h-8 text-xs" placeholder="예: python, javascript" value={(draft.codeLanguage as string) || ""} onChange={(e) => update({ codeLanguage: e.target.value })} />
        </div>
      )}
    </div>
  );
};

export default OutputPhase;

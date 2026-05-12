"use client";

import { Dialog } from "@/shared/ui/Dialog";
import { DialogContent } from "@/shared/ui/DialogContent";
import { Button } from "@/shared/ui/Button";
import { Download, Loader2, X } from "lucide-react";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { flowToSkillMd } from "../utils/flow-to-skill";
import { validateFlow } from "@/features/flow-validation/utils/validators";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import ExportValidationPanel from "./ExportValidationPanel";
import type { SkillMeta } from "@/entities/skill/types";
import type { NodeKind } from "@/entities/flow/types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  skill: SkillMeta;
  onExport: () => void;
  isExporting: boolean;
}

const ExportModal = ({ open, onOpenChange, skill, onExport, isExporting }: Props) => {
  const { nodes, edges } = useFlowStore();
  const validation = validateFlow(nodes, edges);
  const preview = validation.isValid ? flowToSkillMd(skill, nodes, edges).skillMd : "";

  const nodeCounts: Record<string, number> = {};
  for (const n of nodes) {
    if (n.type) nodeCounts[n.type] = (nodeCounts[n.type] ?? 0) + 1;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-4xl sm:max-w-4xl h-[78vh] flex flex-col p-0 gap-0 ring-0">
        <div className="flex items-center gap-3 px-5 py-3.5 border-b shrink-0">
          <div>
            <h2 className="text-sm font-semibold leading-none">SKILL.md 내보내기</h2>
            <p className="text-[11px] text-muted-foreground mt-0.5">{skill.name}</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              {Object.entries(nodeCounts).map(([type, count]) => {
                const def = NODE_DEFINITION_MAP[type as NodeKind];
                return (
                  <span key={type} className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-medium" style={{ color: def?.color, borderColor: `${def?.color}35`, backgroundColor: `${def?.color}12` }}>
                    {def?.label ?? type} {count}
                  </span>
                );
              })}
            </div>
            <button type="button" onClick={() => onOpenChange(false)} className="flex items-center justify-center size-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <X size={15} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden min-h-0">
          <ExportValidationPanel validation={validation} skill={skill} nodeCount={nodes.length} edgeCount={edges.length} />
          <div className="flex-1 overflow-auto bg-muted/20">
            {validation.isValid ? (
              <pre className="text-[11px] font-mono leading-relaxed p-5 whitespace-pre-wrap break-words text-foreground/75 min-h-full">{preview}</pre>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center text-muted-foreground">
                  <div className="size-12 rounded-xl border-2 border-dashed border-border mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground/70">미리보기 생성 불가</p>
                  <p className="text-xs mt-1.5 leading-relaxed">왼쪽의 오류를 모두 수정하면<br />SKILL.md 내용이 여기에 표시됩니다</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-3 border-t shrink-0">
          <p className="text-[11px] text-muted-foreground">ZIP 파일 (SKILL.md + 스크립트)로 저장됩니다</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>닫기</Button>
            <Button size="sm" onClick={onExport} disabled={isExporting || !validation.isValid} className="gap-1.5">
              {isExporting ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
              다운로드
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;

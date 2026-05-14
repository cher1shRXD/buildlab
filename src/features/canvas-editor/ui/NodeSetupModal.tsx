"use client";

import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/Button";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import { canAdvance } from "@/features/canvas-editor/utils/node-draft";
import NodeSetupPhaseContent from "./NodeSetupPhaseContent";
import type { NodeKind } from "@/entities/flow/types";
import { Check, X } from "lucide-react";
import { useNodeSetupModal } from "../hooks/useNodeSetupModal";

type PhaseDef = { title: string; hint?: string };

interface Props {
  nodeKind: NodeKind | null;
  onComplete: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}

const NodeSetupModal = ({ nodeKind, onComplete, onCancel }: Props) => {
  const {
    phase,
    draft,
    update,
    handleCancel,
    handleNext,
    handleBack,
  } = useNodeSetupModal(nodeKind, onComplete, onCancel);

  const PHASE_DEFS: Record<NodeKind, PhaseDef[]> = {
    input:    [{ title: "입력 필드를 정의해주세요", hint: "스킬이 호출될 때 받을 파라미터를 추가하세요" }],
    trigger:  [{ title: "이 스킬은 어떻게 활성화될까요?", hint: "사용자 입력 방식이나 실행 조건을 선택하세요" }, { title: "활성화 값을 설정해주세요" }],
    llm:      [{ title: "어떤 AI 모델을 쓸까요?", hint: "모델마다 성능, 속도, 비용이 달라요" }, { title: "AI에게 무엇을 시킬까요?", hint: "{{변수명}} 으로 이전 노드 결과를 참조할 수 있어요" }],
    tool:     [{ title: "어떤 도구를 쓸까요?", hint: "외부 API나 스크립트, 빌트인 기능 중 선택하세요" }, { title: "도구를 설정해주세요" }],
    logic:    [{ title: "어떻게 분기할까요?", hint: "플로우를 나누거나 반복시킬 수 있어요" }, { title: "분기 조건을 설정해주세요" }],
    memory:   [{ title: "메모리에 무엇을 할까요?", hint: "대화 중 데이터를 기억하거나 꺼낼 수 있어요" }, { title: "저장소를 설정해주세요" }],
    output:   [{ title: "결과를 어떻게 보여줄까요?", hint: "형식에 따라 사용자에게 다르게 표시돼요" }, { title: "출력 내용을 작성해주세요", hint: "{{변수명}} 으로 이전 결과를 삽입할 수 있어요" }],
    template: [{ title: "참조할 스킬을 설정해주세요", hint: "다른 스킬을 서브플로우로 불러올 수 있어요" }],
  };
  const def = nodeKind ? NODE_DEFINITION_MAP[nodeKind] : null;
  if (!def || !nodeKind) return null;

  const phases = PHASE_DEFS[nodeKind];
  const isLastPhase = phase === phases.length - 1;
  const currentPhase = phases[phase];
  const advance = canAdvance(nodeKind, phase, draft);

  return (
    <Dialog open onOpenChange={(v) => { if (!v) handleCancel(); }}>
      <DialogContent showCloseButton={false} className="max-w-xl sm:max-w-xl p-0 gap-0 overflow-hidden ring-0">
        <div className="px-5 py-4 border-b" style={{ backgroundColor: `${def.color}10`, borderBottomColor: `${def.color}20` }}>
          <div className="flex items-center gap-2.5 mb-3">
            <def.Icon size={15} style={{ color: def.color }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: def.color }}>{def.label} 노드 설정</span>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-1">
                {phases.map((_, i) => (
                  <div key={i} className="h-1.5 rounded-full transition-all" style={{ width: i === phase ? "20px" : "6px", backgroundColor: i <= phase ? def.color : `${def.color}30` }} />
                ))}
              </div>
              <button type="button" onClick={handleCancel} className="flex items-center justify-center size-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-black/8 transition-colors">
                <X size={13} />
              </button>
            </div>
          </div>
          <h2 className="text-sm font-semibold text-foreground">{currentPhase.title}</h2>
          {currentPhase.hint && <p className="text-[11px] text-muted-foreground mt-0.5">{currentPhase.hint}</p>}
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <NodeSetupPhaseContent kind={nodeKind} phase={phase} draft={draft} update={update} />
        </div>

        <div className="flex items-center justify-between px-5 py-3.5 border-t bg-muted/20">
          <Button variant="ghost" size="sm" onClick={phase === 0 ? handleCancel : handleBack} className="text-muted-foreground">
            {phase === 0 ? "취소" : "← 뒤로"}
          </Button>
          <Button size="sm" onClick={() => handleNext(isLastPhase)} disabled={!advance} className="gap-1.5" style={advance ? { backgroundColor: def.color, color: "#fff" } : undefined}>
            {isLastPhase ? <><Check size={13} />완료</> : "다음 →"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeSetupModal;

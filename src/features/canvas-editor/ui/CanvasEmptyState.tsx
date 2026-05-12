"use client";

import { Panel } from "@xyflow/react";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import type { NodeKind } from "@/entities/flow/types";

const QUICK_START: NodeKind[] = ["trigger", "llm", "output"];

const CanvasEmptyState = () => {
  const setPendingAddNodeKind = useFlowStore((s) => s.setPendingAddNodeKind);

  return (
    <Panel position="top-center">
      <div className="mt-20 flex flex-col items-center gap-5 select-none">
        <div className="text-center">
          <p className="text-base font-semibold text-foreground/80">어떤 스킬을 만들어볼까요?</p>
          <p className="text-xs text-muted-foreground mt-1">단계를 추가해서 AI가 어떻게 동작할지 알려주세요</p>
        </div>
        <div className="flex items-center gap-2">
          {QUICK_START.map((kind, i) => {
            const def = NODE_DEFINITION_MAP[kind];
            return (
              <div key={kind} className="flex items-center gap-2">
                {i > 0 && <span className="text-muted-foreground/30 text-sm">→</span>}
                <button
                  type="button"
                  onClick={() => setPendingAddNodeKind(kind)}
                  className="flex flex-col items-center gap-2 px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  <def.Icon size={16} style={{ color: def.color }} />
                  <span className="text-xs font-medium text-foreground/70">{def.label}</span>
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-muted-foreground/60">또는 왼쪽에서 단계를 드래그하거나 클릭해서 추가하세요</p>
      </div>
    </Panel>
  );
};

export default CanvasEmptyState;

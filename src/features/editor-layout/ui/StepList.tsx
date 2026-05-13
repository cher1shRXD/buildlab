"use client";

import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import type { NodeKind } from "@/entities/flow/types";

const StepList = () => {
  const { nodes, selectedNodeId, setSelectedNodeId } = useFlowStore();

  if (nodes.length === 0) return null;

  return (
    <div className="border-b pb-2">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-3 pb-1.5">현재 단계</p>
      <div className="space-y-0.5 px-2">
        {nodes.map((node, i) => {
          const def = NODE_DEFINITION_MAP[node.type as NodeKind];
          const label = (node.data as Record<string, unknown>).label as string | undefined;
          const isSelected = selectedNodeId === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNodeId(node.id)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors"
              style={{ backgroundColor: isSelected ? `${def?.color}15` : undefined }}
              onMouseEnter={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--muted)"; }}
              onMouseLeave={(e) => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.backgroundColor = ""; }}
            >
              <span className="shrink-0 size-4 rounded flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: def?.color ?? "#9ca3af", color: "#fff" }}>
                {i + 1}
              </span>
              <span className="text-[12px] truncate flex-1" style={{ color: isSelected ? def?.color : undefined }}>
                {label ?? def?.label ?? node.type}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StepList;

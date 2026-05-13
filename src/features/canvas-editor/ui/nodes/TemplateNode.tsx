"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import BaseNode from "./BaseNode";
import type { TemplateNodeData } from "@/entities/flow/types";

const TemplateNode = ({ id, data, selected }: NodeProps) => {
  const d = data as unknown as TemplateNodeData;
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const def = NODE_DEFINITION_MAP["template"];

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: def.color }}
      />
      <BaseNode
        selected={!!selected}
        label={d.label}
        color={def.color}
        kindLabel="스킬 연결"
        hasError={d.hasError as string | undefined}
        onClick={() => setSelectedNodeId(id)}
      >
        <p className="text-[9px] text-muted-foreground mt-1">
          {d.referencedSkillId
            ? `→ ${d.referencedSkillId.slice(0, 12)}...`
            : "참조 스킬 없음"}
        </p>
      </BaseNode>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: def.color }}
      />
    </>
  );
};

export default TemplateNode;

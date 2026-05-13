"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/shared/ui/Badge";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import BaseNode from "./BaseNode";
import type { MemoryNodeData } from "@/entities/flow/types";

const MemoryNode = ({ id, data, selected }: NodeProps) => {
  const d = data as unknown as MemoryNodeData;
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const def = NODE_DEFINITION_MAP["memory"];

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
        kindLabel="기억하기"
        hasError={d.hasError as string | undefined}
        onClick={() => setSelectedNodeId(id)}
      >
        <div className="flex items-center gap-1 mt-1">
          <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3.5">
            {d.operation}
          </Badge>
          {d.key && (
            <span className="text-[9px] text-muted-foreground truncate font-mono">
              {d.key}
            </span>
          )}
        </div>
      </BaseNode>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: def.color }}
      />
    </>
  );
};

export default MemoryNode;

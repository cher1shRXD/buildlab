"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/shared/ui/Badge";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import BaseNode from "./BaseNode";
import type { ToolNodeData } from "@/entities/flow/types";

const def = NODE_DEFINITION_MAP["tool"];

const ToolNode = ({ id, data, selected }: NodeProps) => {
  const d = data as unknown as ToolNodeData;
  const selectNode = useFlowStore((s) => s.selectNode);

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
        kindLabel="외부 기능"
        hasError={d.hasError as string | undefined}
        onClick={() => selectNode(id)}
      >
        <div className="flex items-center gap-1 mt-1">
          <Badge
            variant="secondary"
            className="text-[9px] px-1 py-0 h-3.5 uppercase"
          >
            {d.toolKind}
          </Badge>
          {d.toolKind === "http" && d.url && (
            <span className="text-[9px] text-muted-foreground truncate">
              {d.url}
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

export default ToolNode;

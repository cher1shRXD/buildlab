"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import BaseNode from "./BaseNode";
import type { OutputNodeData } from "@/entities/flow/types";

const def = NODE_DEFINITION_MAP["output"];

const OutputNode = ({ id, data, selected }: NodeProps) => {
  const d = data as unknown as OutputNodeData;
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
        kindLabel="답변 출력"
        hasError={d.hasError as string | undefined}
        onClick={() => selectNode(id)}
      >
        <p className="text-[9px] text-muted-foreground mt-1 truncate">
          {d.format}
          {d.template ? ` · ${d.template.slice(0, 18)}` : ""}
        </p>
      </BaseNode>
    </>
  );
};

export default OutputNode;

"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import BaseNode from "./BaseNode";
import type { InputNodeData } from "@/entities/flow/types";

const InputNode = ({ id, data, selected }: NodeProps) => {
  const d = data as unknown as InputNodeData;
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const def = NODE_DEFINITION_MAP["input"];

  return (
    <>
      <Handle type="target" position={Position.Left} style={{ background: def.color }} />
      <BaseNode
        selected={!!selected}
        label={d.label}
        color={def.color}
        kindLabel="입력 받기"
        hasError={d.hasError as string | undefined}
        onClick={() => setSelectedNodeId(id)}
      >
        {d.outputVariable && (
          <p className="text-[9px] font-mono text-muted-foreground mt-1 truncate">
            {`{{${d.outputVariable}}}`}
          </p>
        )}
      </BaseNode>
      <Handle type="source" position={Position.Right} style={{ background: def.color }} />
    </>
  );
};

export default InputNode;

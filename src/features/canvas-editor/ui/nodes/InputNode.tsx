"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/shared/ui/Badge";
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
      <BaseNode
        selected={!!selected}
        label={d.label}
        color={def.color}
        kindLabel="입력 받기"
        hasError={d.hasError as string | undefined}
        onClick={() => setSelectedNodeId(id)}
      >
        <div className="flex flex-wrap gap-0.5 mt-1">
          {(d.fields ?? []).slice(0, 3).map((f, i) => (
            <Badge key={i} variant="secondary" className="text-[9px] px-1 py-0 h-3.5">
              {f.name || "미설정"}
            </Badge>
          ))}
        </div>
      </BaseNode>
      <Handle type="source" position={Position.Right} style={{ background: def.color }} />
    </>
  );
};

export default InputNode;

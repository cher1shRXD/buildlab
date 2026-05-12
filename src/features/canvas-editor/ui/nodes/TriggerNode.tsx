"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/shared/ui/Badge";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import BaseNode from "./BaseNode";
import type { TriggerNodeData } from "@/entities/flow/types";

const def = NODE_DEFINITION_MAP["trigger"];

const TriggerNode = ({ id, data, selected }: NodeProps) => {
  const d = data as unknown as TriggerNodeData;
  const selectNode = useFlowStore((s) => s.selectNode);

  return (
    <>
      <BaseNode
        selected={!!selected}
        label={d.label}
        color={def.color}
        kindLabel="시작 조건"
        hasError={d.hasError as string | undefined}
        onClick={() => selectNode(id)}
      >
        <div className="flex flex-wrap gap-0.5 mt-1">
          {(d.triggers ?? []).slice(0, 2).map((t, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="text-[9px] px-1 py-0 h-3.5"
            >
              {t.value || "미설정"}
            </Badge>
          ))}
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

export default TriggerNode;

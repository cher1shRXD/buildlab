"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/shared/ui/Badge";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import BaseNode from "./BaseNode";
import type { LogicNodeData } from "@/entities/flow/types";

const LogicNode = ({ id, data, selected }: NodeProps) => {
  const d = data as unknown as LogicNodeData;
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const def = NODE_DEFINITION_MAP["logic"];
  const conditions = d.conditions ?? [];

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
        kindLabel="조건 분기"
        hasError={d.hasError as string | undefined}
        onClick={() => setSelectedNodeId(id)}
      >
        <div className="flex items-center gap-1 mt-1">
          <Badge
            variant="secondary"
            className="text-[9px] px-1 py-0 h-3.5 uppercase"
          >
            {d.logicKind}
          </Badge>
          <span className="text-[9px] text-muted-foreground">
            {conditions.length}개 분기
          </span>
        </div>
      </BaseNode>
      {conditions.length > 0 ? (
        conditions.map((c, i) => (
          <Handle
            key={c.id}
            type="source"
            position={Position.Right}
            id={c.id}
            style={{
              background: def.color,
              top: `${((i + 1) / (conditions.length + 1)) * 100}%`,
            }}
          />
        ))
      ) : (
        <Handle
          type="source"
          position={Position.Right}
          style={{ background: def.color }}
        />
      )}
    </>
  );
};

export default LogicNode;

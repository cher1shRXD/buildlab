"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Badge } from "@/shared/ui/Badge";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import BaseNode from "./BaseNode";
import type { LLMNodeData } from "@/entities/flow/types";

const LLMNode = ({ id, data, selected }: NodeProps) => {
  const d = data as unknown as LLMNodeData;
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const def = NODE_DEFINITION_MAP["llm"];
  const providerLabel: Record<string, string> = {
    anthropic: "Claude",
    openai: "GPT",
    gemini: "Gemini",
    ollama: "Ollama",
  };

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
        kindLabel="AI 생각"
        hasError={d.hasError as string | undefined}
        onClick={() => setSelectedNodeId(id)}
      >
        <div className="flex items-center gap-1 mt-1">
          <Badge variant="secondary" className="text-[9px] px-1 py-0 h-3.5">
            {providerLabel[d.provider] ?? d.provider}
          </Badge>
          <span className="text-[9px] text-muted-foreground truncate">
            {d.model}
          </span>
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

export default LLMNode;

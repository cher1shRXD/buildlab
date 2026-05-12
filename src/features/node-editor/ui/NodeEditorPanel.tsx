"use client";

import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import { Button } from "@/shared/ui/Button";
import { X, Trash2 } from "lucide-react";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import TriggerNodeForm from "./TriggerNodeForm";
import LLMNodeForm from "./LLMNodeForm";
import ToolNodeForm from "./ToolNodeForm";
import LogicNodeForm from "./LogicNodeForm";
import MemoryNodeForm from "./MemoryNodeForm";
import OutputNodeForm from "./OutputNodeForm";
import type { NodeKind } from "@/entities/flow/types";

const NODE_HINTS: Record<NodeKind, string> = {
  trigger: "이 스킬이 언제 실행될지 설정해요",
  llm: "AI가 무엇을 할지 지시해요",
  tool: "외부 서비스나 기능을 실행해요",
  logic: "상황에 따라 다른 경로로 분기해요",
  memory: "대화 정보나 데이터를 기억해요",
  output: "사용자에게 결과를 보내요",
  template: "다른 스킬을 호출해요",
};

const NodeEditorPanel = () => {
  const { nodes, selectedNodeId, selectNode, deleteNode } = useFlowStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) return null;

  const def = NODE_DEFINITION_MAP[selectedNode.type as NodeKind];
  const hint = NODE_HINTS[selectedNode.type as NodeKind];

  function renderForm() {
    const nodeId = selectedNode!.id;
    const d = selectedNode!.data;
    switch (selectedNode!.type as NodeKind) {
      case "trigger":
        return <TriggerNodeForm nodeId={nodeId} data={d as never} />;
      case "llm":
        return <LLMNodeForm nodeId={nodeId} data={d as never} />;
      case "tool":
        return <ToolNodeForm nodeId={nodeId} data={d as never} />;
      case "logic":
        return <LogicNodeForm nodeId={nodeId} data={d as never} />;
      case "memory":
        return <MemoryNodeForm nodeId={nodeId} data={d as never} />;
      case "output":
        return <OutputNodeForm nodeId={nodeId} data={d as never} />;
      case "template":
        return <p className="text-sm text-muted-foreground">다른 스킬 연결 설정</p>;
    }
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div
        className="px-5 pt-4 pb-4 border-b shrink-0"
        style={{ borderBottomColor: `${def?.color}25` }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {def && (
              <div
                className="flex size-10 items-center justify-center rounded-xl shrink-0"
                style={{ backgroundColor: `${def.color}18` }}
              >
                <def.Icon size={18} style={{ color: def.color }} />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[15px] font-semibold leading-tight" style={{ color: def?.color }}>
                {def?.label ?? selectedNode.type}
              </p>
              {hint && (
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{hint}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
            <Button
              size="icon"
              variant="ghost"
              className="size-8 text-destructive/50 hover:text-destructive hover:bg-destructive/8"
              onClick={() => deleteNode(selectedNode.id)}
            >
              <Trash2 size={14} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-8"
              onClick={() => selectNode(null)}
            >
              <X size={14} />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-5 py-5 space-y-6">
          {renderForm()}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NodeEditorPanel;

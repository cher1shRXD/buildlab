"use client";

import { ReactFlow, Background, Controls, MiniMap, BackgroundVariant } from "@xyflow/react";
import type { Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeTypes } from "./nodes";
import type { NodeKind } from "@/entities/flow/types";
import NodeSetupModal from "./NodeSetupModal";
import CanvasEmptyState from "./CanvasEmptyState";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import { useCanvas } from "../hooks/useCanvas";

interface Props {}

const Canvas = ({}: Props) => {
  const {
    wrapperRef,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setSelectedNodeId,
    addNodeWithData,
    setViewport,
    pendingDrop,
    setPendingDrop,
    screenToFlowPosition,
  } = useCanvas();

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={(e) => {
          e.preventDefault();
          const type = e.dataTransfer.getData("application/reactflow-nodetype") as NodeKind;
          if (!type) return;
          setPendingDrop({ type, position: screenToFlowPosition({ x: e.clientX, y: e.clientY }) });
        }}
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
        onNodeClick={(_e, node: Node) => setSelectedNodeId(node.id)}
        onPaneClick={() => setSelectedNodeId(null)}
        onMoveEnd={(_, vp) => setViewport(vp)}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={["Delete", "Backspace"]}
        multiSelectionKeyCode="Shift"
        className="bg-background"
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--border)" />
        <Controls showInteractive={false} className="rounded-lg border border-border bg-card shadow-none" />
        <MiniMap nodeColor={(n) => NODE_DEFINITION_MAP[n.type as NodeKind]?.color ?? "#a0a8b0"} zoomable pannable className="rounded-lg border border-border bg-card shadow-none" />
        {nodes.length === 0 && <CanvasEmptyState />}
      </ReactFlow>

      <NodeSetupModal
        nodeKind={pendingDrop?.type ?? null}
        onComplete={(data) => { if (pendingDrop) { addNodeWithData(pendingDrop.type, pendingDrop.position, data); setPendingDrop(null); } }}
        onCancel={() => setPendingDrop(null)}
      />
    </div>
  );
};

export default Canvas;

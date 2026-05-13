import { useEffect, useRef, useState } from "react";
import { useReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import type { NodeChange, EdgeChange, Connection } from "@xyflow/react";
import { nanoid } from "nanoid";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { getDefaultNodeData } from "@/shared/config/node-definitions";
import type { NodeKind } from "@/entities/flow/types";
import type { PendingDrop } from "@/features/canvas-editor/types";

export const useCanvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    setIsDirty,
    setSelectedNodeId,
    setViewport,
    pendingAddNodeKind,
    setPendingAddNodeKind,
  } = useFlowStore();

  const [pendingDrop, setPendingDrop] = useState<PendingDrop | null>(null);

  const onNodesChange = (changes: NodeChange[]) => {
    setNodes(applyNodeChanges(changes, nodes));
    setIsDirty(true);
  };

  const onEdgesChange = (changes: EdgeChange[]) => {
    setEdges(applyEdgeChanges(changes, edges));
    setIsDirty(true);
  };

  const onConnect = (connection: Connection) => {
    setEdges(addEdge({ ...connection, animated: true }, edges));
    setIsDirty(true);
  };

  const addNodeWithData = (
    type: NodeKind,
    position: { x: number; y: number },
    overrideData: Record<string, unknown>
  ) => {
    const newNode = {
      id: nanoid(),
      type,
      position,
      data: { ...getDefaultNodeData(type), ...overrideData },
    };
    setNodes([...nodes, newNode]);
    setSelectedNodeId(newNode.id);
    setIsDirty(true);
  };

  useEffect(() => {
    if (!pendingAddNodeKind) return;
    const container = wrapperRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const pos = screenToFlowPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setPendingDrop({ type: pendingAddNodeKind, position: pos });
    setPendingAddNodeKind(null);
  }, [pendingAddNodeKind, setPendingAddNodeKind, screenToFlowPosition]);

  return {
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
  };
};

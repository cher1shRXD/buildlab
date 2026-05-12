"use client";

import { useEffect, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import type { NodeKind } from "@/entities/flow/types";

export const useCanvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onConnect,
    selectNode,
    addNodeWithData,
    setViewport,
    pendingAddNodeKind,
    setPendingAddNodeKind,
  } = useFlowStore();

  const [pendingDrop, setPendingDrop] = useState<{
    type: NodeKind;
    position: { x: number; y: number };
  } | null>(null);

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
    setNodes,
    setEdges,
    onConnect,
    selectNode,
    addNodeWithData,
    setViewport,
    pendingDrop,
    setPendingDrop,
    screenToFlowPosition,
  };
};

import type { Node, Edge, Viewport, NodeChange, EdgeChange, Connection } from "@xyflow/react";
import type { NodeKind } from "@/entities/flow/types";

export interface FlowState {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  selectedNodeId: string | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;
  pendingAddNodeKind: NodeKind | null;
}

export interface FlowActions {
  setPendingAddNodeKind: (kind: NodeKind | null) => void;
  setNodes: (changes: NodeChange[]) => void;
  setEdges: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  selectNode: (id: string | null) => void;
  addNode: (type: NodeKind, position: { x: number; y: number }) => void;
  addNodeWithData: (type: NodeKind, position: { x: number; y: number }, overrideData: Record<string, unknown>) => void;
  updateNodeData: (id: string, data: Partial<Record<string, unknown>>) => void;
  deleteNode: (id: string) => void;
  setViewport: (viewport: Viewport) => void;
  loadFlow: (nodes: Node[], edges: Edge[], viewport: Viewport) => void;
  markSaved: () => void;
  setIsSaving: (v: boolean) => void;
}

export type FlowStore = FlowState & FlowActions;

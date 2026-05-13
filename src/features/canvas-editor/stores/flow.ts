import { create } from "zustand";
import { temporal } from "zundo";
import type { Node, Edge, Viewport } from "@xyflow/react";
import type { NodeKind } from "@/entities/flow/types";

interface State {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  selectedNodeId: string | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: Date | null;
  pendingAddNodeKind: NodeKind | null;

  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setViewport: (viewport: Viewport) => void;
  setSelectedNodeId: (id: string | null) => void;
  setIsDirty: (dirty: boolean) => void;
  setIsSaving: (saving: boolean) => void;
  setPendingAddNodeKind: (kind: NodeKind | null) => void;
  loadFlow: (nodes: Node[], edges: Edge[], viewport: Viewport) => void;
  markSaved: () => void;
  reset: () => void;
}

const initialState = {
  nodes: [] as Node[],
  edges: [] as Edge[],
  viewport: { x: 0, y: 0, zoom: 1 } as Viewport,
  selectedNodeId: null,
  isDirty: false,
  isSaving: false,
  lastSavedAt: null,
  pendingAddNodeKind: null,
};

export const useFlowStore = create<State>()(
  temporal(
    (set) => ({
      ...initialState,

      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      setViewport: (viewport) => set({ viewport }),
      setSelectedNodeId: (id) => set({ selectedNodeId: id }),
      setIsDirty: (dirty) => set({ isDirty: dirty }),
      setIsSaving: (saving) => set({ isSaving: saving }),
      setPendingAddNodeKind: (kind) => set({ pendingAddNodeKind: kind }),

      loadFlow: (nodes, edges, viewport) =>
        set({ nodes, edges, viewport, isDirty: false, lastSavedAt: new Date() }),

      markSaved: () => set({ isDirty: false, isSaving: false, lastSavedAt: new Date() }),

      reset: () => set(initialState),
    }),
    {
      limit: 50,
      partialize: ({ nodes, edges }) => ({ nodes, edges }),
    }
  )
);

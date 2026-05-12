import { create } from "zustand";
import { temporal } from "zundo";
import { applyNodeChanges, applyEdgeChanges, addEdge, type Node } from "@xyflow/react";
import { nanoid } from "nanoid";
import { getDefaultNodeData } from "@/shared/config/node-definitions";
import type { FlowStore } from "./flow-types";

export { type FlowStore, type FlowState, type FlowActions } from "./flow-types";

export const useFlowStore = create<FlowStore>()(
  temporal(
    (set) => ({
      nodes: [],
      edges: [],
      viewport: { x: 0, y: 0, zoom: 1 },
      selectedNodeId: null,
      isDirty: false,
      isSaving: false,
      lastSavedAt: null,
      pendingAddNodeKind: null,

      setPendingAddNodeKind: (kind) => set({ pendingAddNodeKind: kind }),

      setNodes: (changes) =>
        set((state) => ({ nodes: applyNodeChanges(changes, state.nodes), isDirty: true })),

      setEdges: (changes) =>
        set((state) => ({ edges: applyEdgeChanges(changes, state.edges), isDirty: true })),

      onConnect: (connection) =>
        set((state) => ({ edges: addEdge({ ...connection, animated: true }, state.edges), isDirty: true })),

      selectNode: (id) => set({ selectedNodeId: id }),

      addNode: (type, position) => {
        const newNode: Node = { id: nanoid(), type, position, data: getDefaultNodeData(type) };
        set((state) => ({ nodes: [...state.nodes, newNode], selectedNodeId: newNode.id, isDirty: true }));
      },

      addNodeWithData: (type, position, overrideData) => {
        const newNode: Node = { id: nanoid(), type, position, data: { ...getDefaultNodeData(type), ...overrideData } };
        set((state) => ({ nodes: [...state.nodes, newNode], selectedNodeId: newNode.id, isDirty: true }));
      },

      updateNodeData: (id, data) =>
        set((state) => ({
          nodes: state.nodes.map((n) => n.id === id ? { ...n, data: { ...n.data, ...data } } : n),
          isDirty: true,
        })),

      deleteNode: (id) =>
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== id),
          edges: state.edges.filter((e) => e.source !== id && e.target !== id),
          selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
          isDirty: true,
        })),

      setViewport: (viewport) => set({ viewport }),

      loadFlow: (nodes, edges, viewport) =>
        set({ nodes, edges, viewport, isDirty: false, lastSavedAt: new Date() }),

      markSaved: () => set({ isDirty: false, isSaving: false, lastSavedAt: new Date() }),

      setIsSaving: (isSaving) => set({ isSaving }),
    }),
    {
      limit: 50,
      partialize: ({ nodes, edges }) => ({ nodes, edges }),
    }
  )
);

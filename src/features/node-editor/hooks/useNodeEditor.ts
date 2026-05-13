import { useFlowStore } from "@/features/canvas-editor/stores/flow";

export const useNodeEditor = () => {
  const { nodes, edges, setNodes, setEdges, setSelectedNodeId, setIsDirty } = useFlowStore();

  const updateNodeData = (id: string, data: Partial<Record<string, unknown>>) => {
    setNodes(nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n)));
    setIsDirty(true);
  };

  const deleteNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
    setEdges(edges.filter((e) => e.source !== id && e.target !== id));
    setSelectedNodeId(null);
    setIsDirty(true);
  };

  return { updateNodeData, deleteNode };
};

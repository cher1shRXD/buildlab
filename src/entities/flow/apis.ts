import { apiClient } from "@/shared/api";
import type { Edge, Node, Viewport } from "@xyflow/react";
import { FlowData } from "./types";

const FlowApi = {
  async getById(flowId: string) {
    return await apiClient.get<FlowData>(`/flows/${flowId}`);
  },

  async update(
    flowId: string,
    payload: {
      nodes: Node[];
      edges: Edge[];
      viewport: Viewport;
    },
  ) {
    await apiClient.put<FlowData>(`/flows/${flowId}`, payload);
  },
};

export { FlowApi };

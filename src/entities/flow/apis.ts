import { apiClient } from "@/shared/api";
import type { Edge, Node, Viewport } from "@xyflow/react";

export interface FlowData {
  id: string;
  skillId: string;
  version: number;
  nodesJson: string;
  edgesJson: string;
  viewportJson: string;
  updatedAt: string;
}

export interface UpdateFlowPayload {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
}

const FlowApi = {
  async getById(flowId: string) {
    return await apiClient.get<FlowData>(`/flows/${flowId}`);
  },

  async update(flowId: string, payload: UpdateFlowPayload) {
    return await apiClient.put<FlowData>(`/flows/${flowId}`, payload);
  },
};

export { FlowApi };

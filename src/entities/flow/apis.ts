import { getServerClient, toFlowData } from "@/db";
import type { FlowData } from "./types";
import type { Node, Edge, Viewport } from "@xyflow/react";

export const FlowApi = {
  async getBySkillId(skillId: string): Promise<FlowData | null> {
    const db = await getServerClient();
    const { data } = await db.from("flows").select("*").eq("skill_id", skillId).single();
    return data ? toFlowData(data) : null;
  },

  async getById(id: string): Promise<FlowData | null> {
    const db = await getServerClient();
    const { data } = await db.from("flows").select("*").eq("id", id).single();
    return data ? toFlowData(data) : null;
  },

  async create(payload: {
    id: string;
    skillId: string;
    initialNodes?: unknown[];
    initialEdges?: unknown[];
  }): Promise<void> {
    const db = await getServerClient();
    await db.from("flows").insert({
      id: payload.id,
      skill_id: payload.skillId,
      version: 1,
      nodes_json: JSON.stringify(payload.initialNodes ?? []),
      edges_json: JSON.stringify(payload.initialEdges ?? []),
      viewport_json: JSON.stringify({ x: 0, y: 0, zoom: 1 }),
    });
  },

  async update(id: string, payload: {
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
    version: number;
  }): Promise<void> {
    const db = await getServerClient();
    await db.from("flows").update({
      nodes_json: JSON.stringify(payload.nodes),
      edges_json: JSON.stringify(payload.edges),
      viewport_json: JSON.stringify(payload.viewport),
      version: payload.version + 1,
    }).eq("id", id);
  },
};

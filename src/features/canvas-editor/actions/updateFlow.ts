"use server";

import { auth } from "@/shared/lib/auth";
import { FlowApi } from "@/entities/flow/apis";
import { SkillApi } from "@/entities/skill/apis";
import type { Node, Edge, Viewport } from "@xyflow/react";

export async function updateFlow(
  flowId: string,
  payload: { nodes: Node[]; edges: Edge[]; viewport: Viewport }
) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const flow = await FlowApi.getById(flowId);
  if (!flow) throw new Error("Not found");

  const skill = await SkillApi.getById(flow.skillId);
  if (!skill) throw new Error("Forbidden");

  await FlowApi.update(flowId, { ...payload, version: flow.version });
}

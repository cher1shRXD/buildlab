"use server";

import { auth } from "@/shared/lib/auth";
import { createSupabaseServerClient } from "@/db";
import type { Node, Edge, Viewport } from "@xyflow/react";

export async function updateFlow(
  flowId: string,
  payload: { nodes: Node[]; edges: Edge[]; viewport: Viewport }
) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const supabase = await createSupabaseServerClient();

  const { data: flow } = await supabase.from("flows").select("*").eq("id", flowId).single();
  if (!flow) throw new Error("Not found");

  const { data: skill } = await supabase
    .from("skills")
    .select("id")
    .eq("id", flow.skill_id)
    .eq("user_id", session.user.id)
    .single();
  if (!skill) throw new Error("Forbidden");

  await supabase
    .from("flows")
    .update({
      nodes_json: JSON.stringify(payload.nodes),
      edges_json: JSON.stringify(payload.edges),
      viewport_json: JSON.stringify(payload.viewport),
      version: flow.version + 1,
    })
    .eq("id", flowId);
}

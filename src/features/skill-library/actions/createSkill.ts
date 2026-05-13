"use server";

import { auth } from "@/shared/lib/auth";
import { createSupabaseServerClient, toSkillMeta } from "@/db";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import type { CreateSkillInput } from "@/entities/skill/types";

export async function createSkill(payload: CreateSkillInput) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const supabase = await createSupabaseServerClient();
  const skillId = nanoid();
  const flowId = nanoid();

  const { error } = await supabase.from("skills").insert({
    id: skillId,
    user_id: session.user.id,
    name: payload.name,
    description: payload.description ?? null,
    version: "1.0.0",
    user_invocable: true,
    tags: "[]",
    compatible_platforms: "[]",
    is_published: false,
  });
  if (error) throw new Error(error.message);

  await supabase.from("flows").insert({
    id: flowId,
    skill_id: skillId,
    version: 1,
    nodes_json: payload.initialNodes ? JSON.stringify(payload.initialNodes) : "[]",
    edges_json: payload.initialEdges ? JSON.stringify(payload.initialEdges) : "[]",
    viewport_json: JSON.stringify({ x: 0, y: 0, zoom: 1 }),
  });

  revalidatePath("/dashboard");

  const { data } = await supabase.from("skills").select("*").eq("id", skillId).single();
  return toSkillMeta(data);
}

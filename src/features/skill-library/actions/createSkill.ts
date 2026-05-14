"use server";

import { auth } from "@/shared/lib/auth";
import { SkillApi } from "@/entities/skill/apis";
import { FlowApi } from "@/entities/flow/apis";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import type { CreateSkillInput } from "@/entities/skill/types";

export async function createSkill(payload: CreateSkillInput) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const skillId = nanoid();
  const flowId = nanoid();

  await SkillApi.create({
    id: skillId,
    userId: session.user.id,
    name: payload.name,
    description: payload.description ?? null,
  });

  await FlowApi.create({
    id: flowId,
    skillId,
    initialNodes: payload.initialNodes,
    initialEdges: payload.initialEdges,
  });

  revalidatePath("/dashboard");

  const skill = await SkillApi.getById(skillId);
  if (!skill) throw new Error("Failed to create skill");
  return skill;
}

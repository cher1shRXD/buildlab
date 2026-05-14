"use server";

import { auth } from "@/shared/lib/auth";
import { SkillApi } from "@/entities/skill/apis";
import { revalidatePath } from "next/cache";

export async function deleteSkill(skillId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const skill = await SkillApi.getById(skillId);
  if (!skill) throw new Error("Not found");

  await SkillApi.delete(skillId);
  revalidatePath("/dashboard");
}

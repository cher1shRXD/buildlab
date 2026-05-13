"use server";

import { auth } from "@/shared/lib/auth";
import { createSupabaseServerClient } from "@/db";
import { revalidatePath } from "next/cache";

export async function deleteSkill(skillId: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const supabase = await createSupabaseServerClient();

  const { data: existing } = await supabase
    .from("skills")
    .select("id")
    .eq("id", skillId)
    .eq("user_id", session.user.id)
    .single();
  if (!existing) throw new Error("Not found");

  await supabase.from("skills").delete().eq("id", skillId);
  revalidatePath("/dashboard");
}

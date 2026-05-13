import { notFound, redirect } from "next/navigation";
import { auth } from "@/shared/lib/auth";
import { createSupabaseServerClient, toSkillMeta, toFlowData } from "@/db";
import EditorShell from "@/widgets/editor-shell/ui/EditorShell";
import type { PageUrlProps } from "@/shared/types";

export default async function EditorPage({ params }: PageUrlProps<{ skillId: string }>) {
  const { skillId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const supabase = await createSupabaseServerClient();

  const [{ data: skill }, { data: flow }] = await Promise.all([
    supabase.from("skills").select("*").eq("id", skillId).eq("user_id", session.user.id).single(),
    supabase.from("flows").select("*").eq("skill_id", skillId).single(),
  ]);

  if (!skill) notFound();

  return <EditorShell skill={toSkillMeta(skill)} flow={flow ? toFlowData(flow) : null} />;
}

import { notFound, redirect } from "next/navigation";
import { auth } from "@/shared/lib/auth";
import { SkillApi } from "@/entities/skill/apis";
import { FlowApi } from "@/entities/flow/apis";
import EditorShell from "@/widgets/editor-shell/ui/EditorShell";
import type { PageUrlProps } from "@/shared/types";

export default async function EditorPage({ params }: PageUrlProps<{ skillId: string }>) {
  const { skillId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const [skill, flow] = await Promise.all([
    SkillApi.getById(skillId),
    FlowApi.getBySkillId(skillId),
  ]);

  if (!skill) notFound();

  return <EditorShell skill={skill} flow={flow} />;
}

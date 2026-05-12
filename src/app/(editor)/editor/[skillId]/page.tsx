import { notFound, redirect } from "next/navigation";
import { auth } from "@/shared/lib/auth";
import { db } from "@/db";
import { skills, flows } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import EditorShell from "@/widgets/editor-shell/ui/EditorShell";
import type { SkillMeta } from "@/entities/skill/types";
import type { PageUrlProps } from "@/shared/types";

export default async function EditorPage({ params }: PageUrlProps<{ skillId: string }>) {
  const { skillId } = await params;
  const session = await auth();
  if (!session?.user) redirect("/login");

  const skill = await db.query.skills.findFirst({
    where: and(eq(skills.id, skillId), eq(skills.userId, session.user.id)),
  });
  if (!skill) notFound();

  const flow = await db.query.flows.findFirst({
    where: eq(flows.skillId, skillId),
  });

  const skillMeta: SkillMeta = {
    ...skill,
    tags: JSON.parse(skill.tags ?? "[]"),
    compatiblePlatforms: JSON.parse(skill.compatiblePlatforms ?? "[]"),
    createdAt: skill.createdAt.toISOString(),
    updatedAt: skill.updatedAt.toISOString(),
  };

  const flowData = flow
    ? {
        ...flow,
        updatedAt: flow.updatedAt.toISOString(),
      }
    : null;

  return <EditorShell skill={skillMeta} flow={flowData as never} />;
}

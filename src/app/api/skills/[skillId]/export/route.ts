import { NextResponse } from "next/server";
import { auth } from "@/shared/lib/auth";
import { db } from "@/db";
import { skills, flows, skillExports } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import JSZip from "jszip";
import { flowToSkillMd } from "@/features/skill-export/utils/flow-to-skill";
import type { SkillMeta } from "@/entities/skill/types";
import type { RouteHandlerProps } from "@/shared/types";

export async function POST(req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const skill = await db.query.skills.findFirst({
    where: and(eq(skills.id, skillId), eq(skills.userId, session.user.id)),
  });
  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const flow = await db.query.flows.findFirst({
    where: eq(flows.skillId, skillId),
  });
  if (!flow) return NextResponse.json({ error: "Flow not found" }, { status: 404 });

  const skillMeta: SkillMeta = {
    ...skill,
    tags: JSON.parse(skill.tags ?? "[]"),
    compatiblePlatforms: JSON.parse(skill.compatiblePlatforms ?? "[]"),
    createdAt: skill.createdAt.toISOString(),
    updatedAt: skill.updatedAt.toISOString(),
  };

  const nodes = JSON.parse(flow.nodesJson);
  const edges = JSON.parse(flow.edgesJson);

  const { skillMd, auxiliaryFiles } = flowToSkillMd(skillMeta, nodes, edges);

  await db.insert(skillExports).values({
    id: nanoid(),
    skillId,
    flowVersion: flow.version,
    skillMdContent: skillMd,
  });

  const zip = new JSZip();
  zip.file("SKILL.md", skillMd);
  for (const [filename, content] of Object.entries(auxiliaryFiles)) {
    zip.file(filename, content);
  }
  const zipArrayBuffer = await zip.generateAsync({ type: "arraybuffer" });

  return new Response(zipArrayBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${skill.name}.zip"`,
    },
  });
}

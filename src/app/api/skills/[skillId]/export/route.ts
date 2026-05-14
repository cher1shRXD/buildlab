import { NextResponse } from "next/server";
import { auth } from "@/shared/lib/auth";
import { SkillApi } from "@/entities/skill/apis";
import { FlowApi } from "@/entities/flow/apis";
import { nanoid } from "nanoid";
import JSZip from "jszip";
import { flowToSkillMd } from "@/features/skill-export/utils/flow-to-skill";
import type { RouteHandlerProps } from "@/shared/types";

export async function POST(_req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;

  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [skill, flow] = await Promise.all([
    SkillApi.getById(skillId),
    FlowApi.getBySkillId(skillId),
  ]);

  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!flow) return NextResponse.json({ error: "Flow not found" }, { status: 404 });

  const nodes = JSON.parse(flow.nodesJson);
  const edges = JSON.parse(flow.edgesJson);
  const { skillMd, auxiliaryFiles } = flowToSkillMd(skill, nodes, edges);

  await SkillApi.saveExport({
    id: nanoid(),
    skillId,
    flowVersion: flow.version,
    content: skillMd,
  });

  const zip = new JSZip();
  zip.file("SKILL.md", skillMd);
  for (const [filename, content] of Object.entries(auxiliaryFiles)) {
    zip.file(filename, content);
  }
  const zipArrayBuffer = await zip.generateAsync({ type: "arraybuffer" });

  const encodedName = encodeURIComponent(`${skill.name}.zip`);
  return new Response(zipArrayBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="skill.zip"; filename*=UTF-8''${encodedName}`,
    },
  });
}

import { NextResponse } from "next/server";
import { createSupabaseServerClient, toSkillMeta } from "@/db";
import { nanoid } from "nanoid";
import JSZip from "jszip";
import { flowToSkillMd } from "@/features/skill-export/utils/flow-to-skill";
import type { RouteHandlerProps } from "@/shared/types";

export async function POST(req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [{ data: skill }, { data: flow }] = await Promise.all([
    supabase.from("skills").select("*").eq("id", skillId).eq("user_id", user.id).single(),
    supabase.from("flows").select("*").eq("skill_id", skillId).single(),
  ]);

  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (!flow) return NextResponse.json({ error: "Flow not found" }, { status: 404 });

  const skillMeta = toSkillMeta(skill);
  const nodes = JSON.parse(flow.nodes_json);
  const edges = JSON.parse(flow.edges_json);

  const { skillMd, auxiliaryFiles } = flowToSkillMd(skillMeta, nodes, edges);

  await supabase.from("skill_exports").insert({
    id: nanoid(),
    skill_id: skillId,
    flow_version: flow.version,
    skill_md_content: skillMd,
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

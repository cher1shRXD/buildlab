import { NextResponse } from "next/server";
import { createSupabaseServerClient, toSkillMeta } from "@/db";
import { nanoid } from "nanoid";
import { z } from "zod";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: skills, error } = await supabase
    .from("skills")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json((skills ?? []).map(toSkillMeta));
}

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const schema = z.object({
    name: z.string().min(1).max(64),
    description: z.string().optional(),
    initialNodes: z.array(z.unknown()).optional(),
    initialEdges: z.array(z.unknown()).optional(),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const skillId = nanoid();
  const flowId = nanoid();

  const { error: skillError } = await supabase.from("skills").insert({
    id: skillId,
    user_id: user.id,
    name: parsed.data.name,
    description: parsed.data.description ?? null,
    version: "1.0.0",
    user_invocable: true,
    tags: "[]",
    compatible_platforms: "[]",
    is_published: false,
  });
  if (skillError) return NextResponse.json({ error: skillError.message }, { status: 500 });

  const { initialNodes, initialEdges } = parsed.data;
  await supabase.from("flows").insert({
    id: flowId,
    skill_id: skillId,
    version: 1,
    nodes_json: initialNodes ? JSON.stringify(initialNodes) : "[]",
    edges_json: initialEdges ? JSON.stringify(initialEdges) : "[]",
    viewport_json: JSON.stringify({ x: 0, y: 0, zoom: 1 }),
  });

  const { data: skill } = await supabase.from("skills").select("*").eq("id", skillId).single();

  return NextResponse.json(toSkillMeta(skill), { status: 201 });
}

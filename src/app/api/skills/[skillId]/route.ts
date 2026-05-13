import { NextResponse } from "next/server";
import { createSupabaseServerClient, toSkillMeta } from "@/db";
import { z } from "zod";
import type { RouteHandlerProps } from "@/shared/types";

export async function GET(req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: skill } = await supabase
    .from("skills")
    .select("*")
    .eq("id", skillId)
    .eq("user_id", user.id)
    .single();
  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(toSkillMeta(skill));
}

export async function PUT(req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: existing } = await supabase
    .from("skills")
    .select("id")
    .eq("id", skillId)
    .eq("user_id", user.id)
    .single();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const schema = z.object({
    name: z.string().min(1).max(64).optional(),
    description: z.string().nullable().optional(),
    version: z.string().optional(),
    userInvocable: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
    compatiblePlatforms: z.array(z.string()).optional(),
  });
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (parsed.data.name !== undefined) updates.name = parsed.data.name;
  if (parsed.data.description !== undefined) updates.description = parsed.data.description;
  if (parsed.data.version !== undefined) updates.version = parsed.data.version;
  if (parsed.data.userInvocable !== undefined) updates.user_invocable = parsed.data.userInvocable;
  if (parsed.data.tags !== undefined) updates.tags = JSON.stringify(parsed.data.tags);
  if (parsed.data.compatiblePlatforms !== undefined)
    updates.compatible_platforms = JSON.stringify(parsed.data.compatiblePlatforms);

  await supabase.from("skills").update(updates).eq("id", skillId);

  const { data: updated } = await supabase.from("skills").select("*").eq("id", skillId).single();
  return NextResponse.json(toSkillMeta(updated!));
}

export async function DELETE(req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: existing } = await supabase
    .from("skills")
    .select("id")
    .eq("id", skillId)
    .eq("user_id", user.id)
    .single();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await supabase.from("skills").delete().eq("id", skillId);
  return NextResponse.json({ success: true });
}

import { NextResponse } from "next/server";
import { createSupabaseServerClient, toFlowData } from "@/db";
import type { RouteHandlerProps } from "@/shared/types";

export async function GET(req: Request, { params }: RouteHandlerProps<{ flowId: string }>) {
  const { flowId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: flow } = await supabase.from("flows").select("*").eq("id", flowId).single();
  if (!flow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: skill } = await supabase
    .from("skills")
    .select("id")
    .eq("id", flow.skill_id)
    .eq("user_id", user.id)
    .single();
  if (!skill) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json(toFlowData(flow));
}

export async function PUT(req: Request, { params }: RouteHandlerProps<{ flowId: string }>) {
  const { flowId } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: flow } = await supabase.from("flows").select("*").eq("id", flowId).single();
  if (!flow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { data: skill } = await supabase
    .from("skills")
    .select("id")
    .eq("id", flow.skill_id)
    .eq("user_id", user.id)
    .single();
  if (!skill) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  await supabase
    .from("flows")
    .update({
      nodes_json: JSON.stringify(body.nodes ?? []),
      edges_json: JSON.stringify(body.edges ?? []),
      viewport_json: JSON.stringify(body.viewport ?? { x: 0, y: 0, zoom: 1 }),
      version: flow.version + 1,
    })
    .eq("id", flowId);

  const { data: updated } = await supabase.from("flows").select("*").eq("id", flowId).single();
  return NextResponse.json(toFlowData(updated!));
}

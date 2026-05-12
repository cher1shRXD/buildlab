import { NextResponse } from "next/server";
import { auth } from "@/shared/lib/auth";
import { db } from "@/db";
import { flows, skills } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { RouteHandlerProps } from "@/shared/types";

export async function GET(req: Request, { params }: RouteHandlerProps<{ flowId: string }>) {
  const { flowId } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const flow = await db.query.flows.findFirst({ where: eq(flows.id, flowId) });
  if (!flow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const skill = await db.query.skills.findFirst({
    where: and(eq(skills.id, flow.skillId), eq(skills.userId, session.user.id)),
  });
  if (!skill) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  return NextResponse.json({ ...flow, updatedAt: flow.updatedAt.toISOString() });
}

export async function PUT(req: Request, { params }: RouteHandlerProps<{ flowId: string }>) {
  const { flowId } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const flow = await db.query.flows.findFirst({ where: eq(flows.id, flowId) });
  if (!flow) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const skill = await db.query.skills.findFirst({
    where: and(eq(skills.id, flow.skillId), eq(skills.userId, session.user.id)),
  });
  if (!skill) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  await db
    .update(flows)
    .set({
      nodesJson: JSON.stringify(body.nodes ?? []),
      edgesJson: JSON.stringify(body.edges ?? []),
      viewportJson: JSON.stringify(body.viewport ?? { x: 0, y: 0, zoom: 1 }),
      version: flow.version + 1,
    })
    .where(eq(flows.id, flowId));

  const updated = await db.query.flows.findFirst({ where: eq(flows.id, flowId) });
  return NextResponse.json({ ...updated, updatedAt: updated!.updatedAt.toISOString() });
}

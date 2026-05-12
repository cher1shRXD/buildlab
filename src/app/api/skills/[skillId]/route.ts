import { NextResponse } from "next/server";
import { auth } from "@/shared/lib/auth";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import type { RouteHandlerProps } from "@/shared/types";

const updateSchema = z.object({
  name: z.string().min(1).max(64).optional(),
  description: z.string().optional(),
  version: z.string().optional(),
  userInvocable: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  compatiblePlatforms: z.array(z.string()).optional(),
});

async function getAuthorizedSkill(skillId: string, userId: string) {
  return db.query.skills.findFirst({
    where: and(eq(skills.id, skillId), eq(skills.userId, userId)),
  });
}

export async function GET(req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const skill = await getAuthorizedSkill(skillId, session.user.id);
  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({
    ...skill,
    tags: JSON.parse(skill.tags ?? "[]"),
    compatiblePlatforms: JSON.parse(skill.compatiblePlatforms ?? "[]"),
    createdAt: skill.createdAt.toISOString(),
    updatedAt: skill.updatedAt.toISOString(),
  });
}

export async function PUT(req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const skill = await getAuthorizedSkill(skillId, session.user.id);
  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (parsed.data.name !== undefined) updates.name = parsed.data.name;
  if (parsed.data.description !== undefined) updates.description = parsed.data.description;
  if (parsed.data.version !== undefined) updates.version = parsed.data.version;
  if (parsed.data.userInvocable !== undefined) updates.userInvocable = parsed.data.userInvocable;
  if (parsed.data.tags !== undefined) updates.tags = JSON.stringify(parsed.data.tags);
  if (parsed.data.compatiblePlatforms !== undefined)
    updates.compatiblePlatforms = JSON.stringify(parsed.data.compatiblePlatforms);

  await db.update(skills).set(updates).where(eq(skills.id, skillId));

  const updated = await getAuthorizedSkill(skillId, session.user.id);
  return NextResponse.json({
    ...updated,
    tags: JSON.parse(updated!.tags ?? "[]"),
    compatiblePlatforms: JSON.parse(updated!.compatiblePlatforms ?? "[]"),
    createdAt: updated!.createdAt.toISOString(),
    updatedAt: updated!.updatedAt.toISOString(),
  });
}

export async function DELETE(req: Request, { params }: RouteHandlerProps<{ skillId: string }>) {
  const { skillId } = await params;
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const skill = await getAuthorizedSkill(skillId, session.user.id);
  if (!skill) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await db.delete(skills).where(eq(skills.id, skillId));
  return NextResponse.json({ success: true });
}

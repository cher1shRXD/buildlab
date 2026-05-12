import { NextResponse } from "next/server";
import { auth } from "@/shared/lib/auth";
import { db } from "@/db";
import { skills, flows } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1).max(64),
  description: z.string().optional(),
  initialNodes: z.array(z.unknown()).optional(),
  initialEdges: z.array(z.unknown()).optional(),
});

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userSkills = await db.query.skills.findMany({
    where: eq(skills.userId, session.user.id),
    orderBy: (s, { desc }) => [desc(s.updatedAt)],
  });

  return NextResponse.json(
    userSkills.map((s) => ({
      ...s,
      tags: JSON.parse(s.tags ?? "[]"),
      compatiblePlatforms: JSON.parse(s.compatiblePlatforms ?? "[]"),
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }))
  );
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const skillId = nanoid();
  const flowId = nanoid();

  await db.insert(skills).values({
    id: skillId,
    userId: session.user.id,
    name: parsed.data.name,
    description: parsed.data.description ?? null,
  });

  const { initialNodes, initialEdges } = parsed.data;
  await db.insert(flows).values({
    id: flowId,
    skillId,
    nodesJson: initialNodes ? JSON.stringify(initialNodes) : "[]",
    edgesJson: initialEdges ? JSON.stringify(initialEdges) : "[]",
  });

  const skill = await db.query.skills.findFirst({ where: eq(skills.id, skillId) });

  return NextResponse.json(
    {
      ...skill,
      tags: [],
      compatiblePlatforms: [],
      createdAt: skill!.createdAt.toISOString(),
      updatedAt: skill!.updatedAt.toISOString(),
    },
    { status: 201 }
  );
}

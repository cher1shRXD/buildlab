import { getServerClient, toSkillMeta } from "@/db";
import type { SkillMeta } from "./types";

export const SkillApi = {
  async getList(): Promise<SkillMeta[]> {
    const db = await getServerClient();
    const { data } = await db
      .from("skills")
      .select("*")
      .order("updated_at", { ascending: false });
    return (data ?? []).map(toSkillMeta);
  },

  async getById(id: string): Promise<SkillMeta | null> {
    const db = await getServerClient();
    const { data } = await db.from("skills").select("*").eq("id", id).single();
    return data ? toSkillMeta(data) : null;
  },

  async create(payload: {
    id: string;
    userId: string;
    name: string;
    description: string | null;
  }): Promise<void> {
    const db = await getServerClient();
    const { error } = await db.from("skills").insert({
      id: payload.id,
      user_id: payload.userId,
      name: payload.name,
      description: payload.description,
      version: "1.0.0",
      user_invocable: true,
      tags: "[]",
      compatible_platforms: "[]",
      is_published: false,
    });
    if (error) throw new Error(error.message);
  },

  async delete(id: string): Promise<void> {
    const db = await getServerClient();
    await db.from("skills").delete().eq("id", id);
  },

  async saveExport(payload: {
    id: string;
    skillId: string;
    flowVersion: number;
    content: string;
  }): Promise<void> {
    const db = await getServerClient();
    await db.from("skill_exports").insert({
      id: payload.id,
      skill_id: payload.skillId,
      flow_version: payload.flowVersion,
      skill_md_content: payload.content,
    });
  },
};

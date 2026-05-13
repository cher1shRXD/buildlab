export interface User {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  created_at: string;
}

export interface Skill {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  version: string;
  user_invocable: boolean;
  tags: string;
  compatible_platforms: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Flow {
  id: string;
  skill_id: string;
  version: number;
  nodes_json: string;
  edges_json: string;
  viewport_json: string;
  updated_at: string;
}

export interface SkillExport {
  id: string;
  skill_id: string;
  flow_version: number;
  skill_md_content: string;
  generated_at: string;
}

// Supabase returns untyped data — these mappers centralise the snake_case → camelCase transform
// so API routes and server pages don't duplicate the logic.

export function toSkillMeta(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    name: row.name as string,
    description: (row.description ?? null) as string | null,
    version: row.version as string,
    userInvocable: row.user_invocable as boolean,
    tags: JSON.parse((row.tags as string) ?? "[]") as string[],
    compatiblePlatforms: JSON.parse((row.compatible_platforms as string) ?? "[]") as string[],
    isPublished: row.is_published as boolean,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export function toFlowData(row: Record<string, unknown>) {
  return {
    id: row.id as string,
    skillId: row.skill_id as string,
    version: row.version as number,
    nodesJson: row.nodes_json as string,
    edgesJson: row.edges_json as string,
    viewportJson: row.viewport_json as string,
    updatedAt: row.updated_at as string,
  };
}

export interface SkillMeta {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  version: string;
  userInvocable: boolean;
  tags: string[];
  compatiblePlatforms: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateSkillInput = Pick<SkillMeta, "name"> & {
  description?: string;
  initialNodes?: unknown[];
  initialEdges?: unknown[];
};

export type UpdateSkillInput = Partial<
  Pick<SkillMeta, "name" | "description" | "version" | "userInvocable" | "tags" | "compatiblePlatforms">
>;

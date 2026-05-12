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

export interface CreateSkillInput {
  name: string;
  description?: string;
  initialNodes?: unknown[];
  initialEdges?: unknown[];
}

export interface UpdateSkillInput {
  name?: string;
  description?: string;
  version?: string;
  userInvocable?: boolean;
  tags?: string[];
  compatiblePlatforms?: string[];
}

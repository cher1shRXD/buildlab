import { apiClient } from "@/shared/api";
import type { SkillMeta, CreateSkillInput, UpdateSkillInput } from "./types";

const SkillApi = {
  async getList() {
    return await apiClient.get<SkillMeta[]>("/skills");
  },

  async getById(id: string) {
    return await apiClient.get<SkillMeta>(`/skills/${id}`);
  },

  async create(payload: CreateSkillInput) {
    return await apiClient.post<SkillMeta>("/skills", payload);
  },

  async update(id: string, payload: UpdateSkillInput) {
    return await apiClient.put<SkillMeta>(`/skills/${id}`, payload);
  },

  async delete(id: string) {
    return await apiClient.delete(`/skills/${id}`);
  },

  async export(id: string) {
    return await apiClient.postBlob(`/skills/${id}/export`);
  },
};

export { SkillApi };

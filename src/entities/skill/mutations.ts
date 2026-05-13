"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { SkillApi } from "./apis";
import { skillKeys } from "./queries";
import type { CreateSkillInput, UpdateSkillInput } from "./types";
import type { ErrorResponse } from "@/shared/types";

export const useCreateSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSkillInput) => SkillApi.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: skillKeys.list() }),
    onError: (err: ErrorResponse) =>
      toast.error(err.message ?? "스킬 생성에 실패했습니다."),
  });
};

export const useUpdateSkillMutation = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSkillInput) => SkillApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: skillKeys.list() });
      queryClient.invalidateQueries({ queryKey: skillKeys.detail(id) });
    },
    onError: (err: ErrorResponse) =>
      toast.error(err.message ?? "스킬 수정에 실패했습니다."),
  });
};

export const useDeleteSkillMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => SkillApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: skillKeys.list() }),
    onError: (err: ErrorResponse) =>
      toast.error(err.message ?? "삭제에 실패했습니다."),
  });
};

export const useExportSkillMutation = () =>
  useMutation({
    mutationFn: (id: string) => SkillApi.export(id),
    onSuccess: () => toast.success("스킬이 성공적으로 내보내졌습니다."),
    onError: (err: ErrorResponse) =>
      toast.error(err.message ?? "스킬 내보내기에 실패했습니다."),
  });

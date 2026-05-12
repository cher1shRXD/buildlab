"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { SkillApi } from "./apis";

export const skillKeys = {
  all: ["skills"] as const,
  list: () => [...skillKeys.all, "list"] as const,
  detail: (id: string) => [...skillKeys.all, "detail", id] as const,
};

export const useGetSkillListQuery = () =>
  useSuspenseQuery({
    queryKey: skillKeys.list(),
    queryFn: SkillApi.getList,
  });

export const useGetSkillDetailQuery = (id: string) =>
  useSuspenseQuery({
    queryKey: skillKeys.detail(id),
    queryFn: () => SkillApi.getById(id),
  });

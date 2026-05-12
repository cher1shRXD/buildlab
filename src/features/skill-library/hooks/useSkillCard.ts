"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteSkillMutation } from "@/entities/skill/mutations";
import type { SkillMeta } from "@/entities/skill/types";

export const useSkillCard = (skill: SkillMeta) => {
  const router = useRouter();
  const { mutateAsync: deleteSkill, isPending } = useDeleteSkillMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    await deleteSkill(skill.id);
    setConfirmDelete(false);
  };

  const handleNavigate = () => {
    router.push(`/editor/${skill.id}`);
  };

  return {
    isPending,
    confirmDelete,
    setConfirmDelete,
    handleDelete,
    handleNavigate,
  };
};

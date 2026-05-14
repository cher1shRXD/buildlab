import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteSkill } from "@/features/skill-library/actions/deleteSkill";
import type { SkillMeta } from "@/entities/skill/types";

export const useSkillCard = (skill: SkillMeta) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    startTransition(async () => {
      try {
        await deleteSkill(skill.id);
        toast.success(`'${skill.name}' 스킬이 삭제되었습니다.`);
      } catch {
        toast.error("삭제에 실패했습니다.");
      }
      setConfirmDelete(false);
    });
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

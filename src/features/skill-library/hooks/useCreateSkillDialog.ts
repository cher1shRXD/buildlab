import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSkill } from "@/features/skill-library/actions/createSkill";
import type { SkillTemplate } from "@/shared/config/skill-templates";

export const useCreateSkillDialog = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"template" | "name">("template");
  const [selected, setSelected] = useState<SkillTemplate | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleTemplateSelect = (tpl: SkillTemplate) => {
    setSelected(tpl);
    setName(tpl.defaultName);
    setDescription("");
    setStep("name");
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("template");
      setSelected(null);
      setName("");
      setDescription("");
    }, 200);
  };

  const handleCreate = () => {
    if (!name.trim() || !selected) return;
    startTransition(async () => {
      try {
        const skill = await createSkill({
          name: name.trim(),
          description: description.trim() || undefined,
          initialNodes: selected.nodes.length > 0 ? selected.nodes : undefined,
          initialEdges: selected.edges.length > 0 ? selected.edges : undefined,
        });
        handleClose();
        router.push(`/editor/${skill.id}`);
      } catch {
        toast.error("스킬 생성에 실패했습니다.");
      }
    });
  };

  return {
    open,
    setOpen,
    step,
    setStep,
    selected,
    setSelected,
    name,
    setName,
    description,
    setDescription,
    isPending,
    handleTemplateSelect,
    handleClose,
    handleCreate,
  };
};

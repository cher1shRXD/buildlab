import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateSkillMutation } from "@/entities/skill/mutations";
import { SkillTemplate } from "@/shared/config/skill-templates";

export const useCreateSkillDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"template" | "name">("template");
  const [selected, setSelected] = useState<SkillTemplate | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { mutateAsync: createSkill, isPending } = useCreateSkillMutation();

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

  const handleCreate = async () => {
    if (!name.trim() || !selected) return;
    const skill = await createSkill({
      name: name.trim(),
      description: description.trim() || undefined,
      initialNodes: selected.nodes.length > 0 ? selected.nodes : undefined,
      initialEdges: selected.edges.length > 0 ? selected.edges : undefined,
    });
    handleClose();
    router.push(`/editor/${skill.id}`);
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

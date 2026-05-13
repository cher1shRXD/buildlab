"use client";

import { useCreateSkillDialog } from "../hooks/useCreateSkillDialog";
import { SKILL_TEMPLATES } from "@/shared/config/skill-templates";
import { Button } from "@/shared/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import CreateSkillNameStep from "./CreateSkillNameStep";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const CreateSkillDialog = () => {
  const {
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
  } = useCreateSkillDialog();

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
      <DialogTrigger render={<Button className="gap-2" />}>
        <Plus size={16} />
        새 스킬 만들기
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {step === "template" ? (
          <>
            <DialogHeader className="px-6 pt-6 pb-4">
              <DialogTitle>어떤 스킬을 만들까요?</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">템플릿을 선택하면 기본 플로우가 자동으로 설정됩니다</p>
            </DialogHeader>
            <div className="px-6 pb-6 grid grid-cols-2 gap-2.5">
              {SKILL_TEMPLATES.map((tpl) => (
                <button key={tpl.id} onClick={() => handleTemplateSelect(tpl)} className={cn("flex flex-col items-start gap-2 p-4 rounded-lg border text-left hover:border-primary/60 hover:bg-accent transition-colors", tpl.id === "blank" ? "border-dashed" : "border-border")}>
                  <tpl.Icon size={18} style={{ color: tpl.iconColor }} />
                  <div>
                    <p className="text-sm font-semibold leading-tight">{tpl.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{tpl.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : selected ? (
          <CreateSkillNameStep selected={selected} name={name} description={description} isPending={isPending} onNameChange={setName} onDescriptionChange={setDescription} onBack={() => { setStep("template"); setSelected(null); }} onCreate={handleCreate} onClose={handleClose} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default CreateSkillDialog;

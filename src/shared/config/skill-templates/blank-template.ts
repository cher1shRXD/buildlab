import { Plus } from "lucide-react";
import type { SkillTemplate } from "./types";

export const blankTemplate: SkillTemplate = {
  id: "blank",
  Icon: Plus,
  iconColor: "#6e7880",
  label: "직접 만들기",
  description: "빈 캔버스에서 자유롭게 스킬을 설계합니다",
  defaultName: "my-skill",
  nodes: [],
  edges: [],
};

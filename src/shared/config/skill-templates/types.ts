import type { LucideIcon } from "lucide-react";
import type { Node, Edge } from "@xyflow/react";

export interface SkillTemplate {
  id: string;
  Icon: LucideIcon;
  iconColor: string;
  label: string;
  description: string;
  defaultName: string;
  nodes: Node[];
  edges: Edge[];
}

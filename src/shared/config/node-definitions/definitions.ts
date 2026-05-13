import {
  Zap,
  Brain,
  Wrench,
  GitBranch,
  Database,
  MessageSquare,
  Layers,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";

export type NodeKind =
  | "input"
  | "trigger"
  | "llm"
  | "tool"
  | "logic"
  | "memory"
  | "output"
  | "template";

export interface NodeDefinition {
  type: NodeKind;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  Icon: LucideIcon;
}

export const NODE_DEFINITIONS: NodeDefinition[] = [
  {
    type: "input",
    label: "입력 받기",
    description: "스킬이 받을 입력값을 정의해요",
    color: "#a06090",
    bgColor: "#f6f3f5",
    Icon: ClipboardList,
  },
  {
    type: "trigger",
    label: "시작 조건",
    description: "언제 실행될지 정해요",
    color: "#5a8a6c",
    bgColor: "#f2f5f3",
    Icon: Zap,
  },
  {
    type: "llm",
    label: "AI 생각하기",
    description: "AI가 분석하거나 글을 써요",
    color: "#7a6aa8",
    bgColor: "#f3f2f6",
    Icon: Brain,
  },
  {
    type: "tool",
    label: "외부 기능",
    description: "검색, API 호출, 코드 실행",
    color: "#9a7248",
    bgColor: "#f6f4f1",
    Icon: Wrench,
  },
  {
    type: "logic",
    label: "조건 분기",
    description: "상황에 따라 다른 경로로",
    color: "#907a30",
    bgColor: "#f6f5ee",
    Icon: GitBranch,
  },
  {
    type: "memory",
    label: "기억하기",
    description: "데이터를 저장하거나 꺼내요",
    color: "#5878a8",
    bgColor: "#f2f4f7",
    Icon: Database,
  },
  {
    type: "output",
    label: "답변 보내기",
    description: "사용자에게 결과를 전달해요",
    color: "#3d7870",
    bgColor: "#f1f5f4",
    Icon: MessageSquare,
  },
  {
    type: "template",
    label: "스킬 불러오기",
    description: "다른 스킬을 연결해요",
    color: "#6e7880",
    bgColor: "#f4f5f5",
    Icon: Layers,
  },
];

import { GitBranch, LayoutGrid, Repeat, Zap } from "lucide-react";

export const LOGIC_PHASE_OPTIONS = [
  { kind: "if",       icon: GitBranch,  label: "조건 분기", description: "조건에 따라 다른 경로로 분기합니다" },
  { kind: "switch",   icon: LayoutGrid, label: "다중 분기", description: "여러 값에 따라 각각 다른 경로로" },
  { kind: "loop",     icon: Repeat,     label: "반복 실행", description: "목록의 각 항목마다 반복 실행합니다" },
  { kind: "parallel", icon: Zap,        label: "동시 실행", description: "여러 경로를 동시에 병렬로 실행합니다" },
];

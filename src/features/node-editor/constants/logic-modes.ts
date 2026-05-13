import { GitBranch, LayoutGrid, Repeat, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const LOGIC_MODES: { kind: string; Icon: LucideIcon; label: string; hint: string }[] = [
  { kind: "if",       Icon: GitBranch,  label: "조건 분기", hint: "조건에 따라 다른 경로로 분기합니다" },
  { kind: "switch",   Icon: LayoutGrid, label: "다중 분기", hint: "여러 값에 따라 각각 다른 경로로 분기합니다" },
  { kind: "loop",     Icon: Repeat,     label: "반복",      hint: "목록의 각 항목마다 반복 실행합니다" },
  { kind: "parallel", Icon: Zap,        label: "동시 실행", hint: "여러 경로를 동시에 병렬로 실행합니다" },
];

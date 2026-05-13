import type { NodeKind } from "@/entities/flow/types";

export const NODE_PALETTE_CATEGORIES: { title: string; kinds: NodeKind[] }[] = [
  {
    title: "핵심 단계",
    kinds: ["input", "trigger", "llm", "output"],
  },
  {
    title: "추가 기능",
    kinds: ["tool", "memory", "logic", "template"],
  },
];

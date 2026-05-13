import type { NodeKind } from "@/entities/flow/types";

export function canAdvance(kind: NodeKind, phase: number, draft: Record<string, unknown>): boolean {
  switch (kind) {
    case "trigger":
      if (phase === 0) return true;
      return draft.triggerKind === "manual" || !!(draft.triggerValue as string)?.trim();
    case "llm":
      if (phase === 0) return true;
      return !!(draft.userPromptTemplate as string)?.trim();
    case "tool":
      if (phase === 0) return true;
      if (draft.toolKind === "http") return !!(draft.url as string)?.trim();
      if (draft.toolKind === "script") return !!(draft.code as string)?.trim();
      if (draft.toolKind === "builtin") return !!draft.builtinTool;
      if (draft.toolKind === "mcp") return !!(draft.mcpServer as string)?.trim() && !!(draft.mcpTool as string)?.trim();
      return true;
    case "logic":
    case "output":
    case "template":
      return true;
    case "memory":
      if (phase === 0) return true;
      return !!(draft.key as string)?.trim();
  }
}

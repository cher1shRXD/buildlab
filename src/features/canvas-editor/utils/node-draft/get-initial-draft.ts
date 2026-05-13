import { nanoid } from "nanoid";
import type { NodeKind } from "@/entities/flow/types";

export function getInitialDraft(kind: NodeKind): Record<string, unknown> {
  switch (kind) {
    case "trigger":
      return { triggerKind: "keyword", triggerValue: "", triggerMatchMode: "exact" };
    case "llm":
      return { provider: "anthropic", model: "claude-sonnet-4-6", systemPrompt: "", userPromptTemplate: "", outputVariable: "llm_result" };
    case "tool":
      return { toolKind: "http", method: "GET", url: "", outputVariable: "tool_result" };
    case "logic":
      return { logicKind: "if", conditions: [{ id: nanoid(), expression: "", label: "참" }] };
    case "memory":
      return { operation: "read", scope: "session", key: "", outputVariable: "memory_value" };
    case "output":
      return { format: "markdown", template: "", streamToUser: true };
    case "template":
      return { referencedSkillId: "" };
  }
}

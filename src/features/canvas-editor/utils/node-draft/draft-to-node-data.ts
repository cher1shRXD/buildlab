import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import type { NodeKind } from "@/entities/flow/types";

export function draftToNodeData(kind: NodeKind, draft: Record<string, unknown>): Record<string, unknown> {
  const defLabel = NODE_DEFINITION_MAP[kind].label;
  const label = (draft.label as string)?.trim() || defLabel;

  switch (kind) {
    case "input":
      return { label, fields: [], hasError: undefined };
    case "trigger":
      return {
        label,
        triggers: [{ kind: draft.triggerKind || "keyword", value: draft.triggerValue || "", matchMode: draft.triggerMatchMode || "exact" }],
        hasError: undefined,
      };
    case "llm":
      return {
        label,
        provider: draft.provider || "anthropic",
        model: draft.model || "claude-sonnet-4-6",
        systemPrompt: draft.systemPrompt || "",
        userPromptTemplate: draft.userPromptTemplate || "",
        outputVariable: (draft.outputVariable as string)?.trim() || "llm_result",
        temperature: 0.7,
        maxTokens: 4096,
        streamOutput: true,
        hasError: undefined,
      };
    case "tool":
      return {
        label,
        toolKind: draft.toolKind || "http",
        method: draft.method || "GET",
        url: draft.url || "",
        body: draft.body || "",
        code: draft.code || "",
        language: draft.language || "javascript",
        builtinTool: draft.builtinTool || "",
        mcpServer: draft.mcpServer || "",
        mcpTool: draft.mcpTool || "",
        outputVariable: (draft.outputVariable as string)?.trim() || "tool_result",
        hasError: undefined,
      };
    case "logic":
      return {
        label,
        logicKind: draft.logicKind || "if",
        conditions: draft.conditions || [],
        loopOver: draft.loopOver || "",
        hasError: undefined,
      };
    case "memory":
      return {
        label,
        operation: draft.operation || "read",
        scope: draft.scope || "session",
        key: draft.key || "",
        valueExpression: draft.valueExpression || "",
        outputVariable: (draft.outputVariable as string)?.trim() || "memory_value",
        hasError: undefined,
      };
    case "output":
      return {
        label,
        format: draft.format || "markdown",
        template: draft.template || "",
        codeLanguage: draft.codeLanguage || "",
        streamToUser: draft.streamToUser ?? true,
        hasError: undefined,
      };
    case "template":
      return {
        label,
        referencedSkillId: draft.referencedSkillId || "",
        hasError: undefined,
      };
  }
}

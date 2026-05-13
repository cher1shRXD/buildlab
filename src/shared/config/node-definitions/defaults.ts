import { NODE_DEFINITIONS } from "./definitions";
import type { NodeKind } from "./definitions";

export function getDefaultNodeData(type: NodeKind): Record<string, unknown> {
  const label = NODE_DEFINITIONS.find((d) => d.type === type)?.label ?? type;
  const base = { label, isValid: false };

  switch (type) {
    case "trigger":
      return {
        ...base,
        triggers: [{ kind: "keyword", value: "", matchMode: "exact" }],
      };
    case "llm":
      return {
        ...base,
        provider: "anthropic",
        model: "claude-opus-4-5",
        systemPrompt: "",
        userPromptTemplate: "",
        temperature: 0.7,
        maxTokens: 1024,
        outputVariable: "llm_result",
        streamOutput: false,
      };
    case "tool":
      return {
        ...base,
        toolKind: "http",
        method: "GET",
        url: "",
        inputMapping: {},
        outputVariable: "tool_result",
      };
    case "logic":
      return {
        ...base,
        logicKind: "if",
        conditions: [{ id: "c1", expression: "", label: "true" }],
      };
    case "memory":
      return { ...base, operation: "read", scope: "session", key: "" };
    case "output":
      return { ...base, format: "markdown", template: "", streamToUser: true };
    case "template":
      return {
        ...base,
        referencedSkillId: "",
        inputMapping: {},
        outputMapping: {},
      };
  }
}

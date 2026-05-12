import type { TriggerNodeData, LLMNodeData, ToolNodeData, LogicNodeData, MemoryNodeData, OutputNodeData, TemplateNodeData } from "@/entities/flow/types";
import type { Node } from "@xyflow/react";
import { compileLLM, compileTool, compileLogic, compileMemory } from "./compile-node-fn";

export interface CompilerContext {
  variables: Set<string>;
  auxiliaryFiles: Record<string, string>;
}

function compileTrigger(data: TriggerNodeData): string {
  const lines = data.triggers
    .filter((t) => t.value.trim())
    .map((t) => {
      if (t.kind === "keyword") return `- Activate when the user says: \`${t.value}\``;
      if (t.kind === "context") return `- Activate when context matches: ${t.value}`;
      if (t.kind === "webhook") return `- Activate on webhook: \`${t.value}\``;
      return `- Activate on: ${t.kind}`;
    });
  if (lines.length === 0) return "";
  return `## When to Activate\n\n${lines.join("\n")}`;
}

function compileOutput(data: OutputNodeData): string {
  const lines: string[] = [`## ${data.label}`];
  lines.push(`\nFormat and return the final response as ${data.format}:`);
  if (data.template) {
    const fence = data.format === "code" ? `\`\`\`${data.codeLanguage ?? ""}` : "```";
    lines.push(`\n${fence}\n${data.template}\n\`\`\``);
  }
  return lines.join("\n");
}

function compileTemplate(data: TemplateNodeData): string {
  return `## ${data.label}\n\nDelegate to skill \`${data.referencedSkillId}\`.`;
}

export function compileNode(node: Node, ctx: CompilerContext): string {
  const data = node.data as Record<string, unknown>;
  switch (node.type) {
    case "trigger":  return compileTrigger(data as unknown as TriggerNodeData);
    case "llm":      return compileLLM(data as unknown as LLMNodeData, ctx);
    case "tool":     return compileTool(data as unknown as ToolNodeData, ctx, node.id);
    case "logic":    return compileLogic(data as unknown as LogicNodeData);
    case "memory":   return compileMemory(data as unknown as MemoryNodeData, ctx);
    case "output":   return compileOutput(data as unknown as OutputNodeData);
    case "template": return compileTemplate(data as unknown as TemplateNodeData);
    default:         return "";
  }
}

import type { LLMNodeData } from "@/entities/flow/types";
import type { CompilerContext } from "../types/complier-context";

export function compileLLM(data: LLMNodeData, ctx: CompilerContext): string {
  if (data.outputVariable) ctx.variables.add(data.outputVariable);

  const providerMap: Record<string, string> = {
    anthropic: "Anthropic (Claude)",
    openai: "OpenAI",
    gemini: "Google Gemini",
    ollama: "Ollama (local)",
  };

  const lines: string[] = [`## ${data.label}`];
  if (data.systemPrompt) lines.push(`\n**System context:** ${data.systemPrompt}`);
  lines.push(`\nCall ${providerMap[data.provider] ?? data.provider} model \`${data.model}\` with:`);
  if (data.userPromptTemplate) lines.push(`\n\`\`\`\n${data.userPromptTemplate}\n\`\`\``);
  lines.push(`\nStore the response as \`{{${data.outputVariable}}}\`.`);
  return lines.join("\n");
}

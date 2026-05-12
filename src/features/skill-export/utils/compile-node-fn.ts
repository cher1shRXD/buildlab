import type { LLMNodeData, ToolNodeData, LogicNodeData, MemoryNodeData } from "@/entities/flow/types";
import type { CompilerContext } from "./instruction-compiler";

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

export function compileTool(data: ToolNodeData, ctx: CompilerContext, nodeId: string): string {
  if (data.outputVariable) ctx.variables.add(data.outputVariable);
  const lines: string[] = [`## ${data.label}`];

  if (data.toolKind === "http") {
    lines.push(`\nMake an HTTP \`${data.method ?? "GET"}\` request to \`${data.url ?? "<url>"}\`.`);
    if (data.body) lines.push(`\nRequest body:\n\`\`\`json\n${data.body}\n\`\`\``);
  } else if (data.toolKind === "script" && data.code) {
    const ext = data.language === "python" ? "py" : data.language === "bash" ? "sh" : "js";
    const filename = `scripts/${nodeId}.${ext}`;
    ctx.auxiliaryFiles[filename] = data.code;
    lines.push(`\nRun the script at \`${filename}\`.`);
  } else if (data.toolKind === "mcp") {
    lines.push(`\nUse MCP tool \`${data.mcpTool ?? "<tool>"}\` from server \`${data.mcpServer ?? "<server>"}\`.`);
  } else if (data.toolKind === "builtin") {
    const builtinMap: Record<string, string> = {
      "web-search": "Use the built-in web search tool",
      "file-read": "Use the built-in file read tool",
      "file-write": "Use the built-in file write tool",
      shell: "Use the built-in shell execution tool",
    };
    lines.push(`\n${builtinMap[data.builtinTool ?? ""] ?? "Use built-in tool"}.`);
  }

  lines.push(`\nStore the result as \`{{${data.outputVariable}}}\`.`);
  return lines.join("\n");
}

export function compileLogic(data: LogicNodeData): string {
  const lines: string[] = [`## ${data.label}`];

  if (data.logicKind === "if" || data.logicKind === "switch") {
    lines.push("\nEvaluate the following conditions and branch accordingly:");
    data.conditions.forEach((c) => {
      if (c.expression) lines.push(`\n- If \`${c.expression}\` → follow branch **"${c.label}"**`);
    });
  } else if (data.logicKind === "loop") {
    lines.push(`\nFor each item in \`{{${data.loopOver ?? "items"}}}\`, execute the following steps.`);
    if (data.maxIterations) lines.push(`Maximum ${data.maxIterations} iterations.`);
  } else if (data.logicKind === "parallel") {
    lines.push("\nExecute the following branches in parallel and wait for all to complete.");
  }

  return lines.join("\n");
}

export function compileMemory(data: MemoryNodeData, ctx: CompilerContext): string {
  if (data.operation === "read" && data.outputVariable) ctx.variables.add(data.outputVariable);
  const lines: string[] = [`## ${data.label}`];

  if (data.operation === "read") {
    lines.push(
      `\nRead the value stored at key \`${data.key}\` from ${data.scope} memory.`,
      `Store it as \`{{${data.outputVariable ?? "memory_value"}}}\`.`
    );
  } else if (data.operation === "write") {
    lines.push(`\nWrite \`${data.valueExpression ?? "<value>"}\` to key \`${data.key}\` in ${data.scope} memory.`);
  } else if (data.operation === "append") {
    lines.push(`\nAppend \`${data.valueExpression ?? "<value>"}\` to key \`${data.key}\` in ${data.scope} memory.`);
  } else if (data.operation === "clear") {
    lines.push(`\nClear the value at key \`${data.key}\` in ${data.scope} memory.`);
  }

  return lines.join("\n");
}

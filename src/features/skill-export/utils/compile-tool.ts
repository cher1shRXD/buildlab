import type { ToolNodeData } from "@/entities/flow/types";
import type { CompilerContext } from "../types/complier-context";

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

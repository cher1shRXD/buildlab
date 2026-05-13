import type { MemoryNodeData } from "@/entities/flow/types";
import type { CompilerContext } from "../types/complier-context";

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

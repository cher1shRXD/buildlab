import type { LogicNodeData } from "@/entities/flow/types";

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

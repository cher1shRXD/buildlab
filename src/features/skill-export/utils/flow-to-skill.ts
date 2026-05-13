import type { Node, Edge } from "@xyflow/react";
import type { SkillMeta } from "@/entities/skill/types";
import { buildFrontmatter } from "./yaml-builder";
import { compileNode, type CompilerContext } from "./instruction-compiler";
import { topologicalSort } from "./topological-sort";

export interface SkillExportResult {
  skillMd: string;
  auxiliaryFiles: Record<string, string>;
}

export function flowToSkillMd(
  skill: SkillMeta,
  nodes: Node[],
  edges: Edge[]
): SkillExportResult {
  const sorted = topologicalSort(nodes, edges);
  const ctx: CompilerContext = { variables: new Set(), auxiliaryFiles: {} };

  const sections = sorted.map((node) => compileNode(node, ctx)).filter(Boolean);

  const variablesSection =
    ctx.variables.size > 0
      ? `## Available Variables\n\n${[...ctx.variables]
          .map((v) => `- \`{{${v}}}\``)
          .join("\n")}`
      : "";

  const skillMd = [
    buildFrontmatter(skill),
    "",
    sections.join("\n\n"),
    variablesSection,
  ]
    .filter(Boolean)
    .join("\n");

  return { skillMd, auxiliaryFiles: ctx.auxiliaryFiles };
}

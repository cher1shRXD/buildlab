import type { SkillMeta } from "@/entities/skill/types";

export function buildFrontmatter(skill: SkillMeta): string {
  const lines: string[] = ["---"];

  lines.push(`name: "${skill.name}"`);

  if (skill.description) {
    lines.push(`description: "${skill.description.replace(/"/g, '\\"')}"`);
  }

  lines.push(`version: "${skill.version}"`);
  lines.push(`user-invocable: ${skill.userInvocable}`);

  if (skill.tags.length > 0) {
    lines.push("tags:");
    skill.tags.forEach((t) => lines.push(`  - ${t}`));
  }

  if (skill.compatiblePlatforms.length > 0) {
    lines.push("platforms:");
    skill.compatiblePlatforms.forEach((p) => lines.push(`  - ${p}`));
  }

  lines.push("---");
  return lines.join("\n");
}

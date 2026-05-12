export type { SkillTemplate } from "./types";
export { aiChatTemplate, commandSkillTemplate } from "./basic";
export { textTransformTemplate, blankTemplate } from "./advanced";

import { aiChatTemplate, commandSkillTemplate } from "./basic";
import { textTransformTemplate, blankTemplate } from "./advanced";

export const SKILL_TEMPLATES = [aiChatTemplate, commandSkillTemplate, textTransformTemplate, blankTemplate];

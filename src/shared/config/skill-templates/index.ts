export type { SkillTemplate } from "./types";
export { aiChatTemplate } from "./ai-chat-template";
export { commandSkillTemplate } from "./command-skill-template";
export { textTransformTemplate } from "./text-transform-template";
export { blankTemplate } from "./blank-template";

import { aiChatTemplate } from "./ai-chat-template";
import { commandSkillTemplate } from "./command-skill-template";
import { textTransformTemplate } from "./text-transform-template";
import { blankTemplate } from "./blank-template";

export const SKILL_TEMPLATES = [aiChatTemplate, commandSkillTemplate, textTransformTemplate, blankTemplate];

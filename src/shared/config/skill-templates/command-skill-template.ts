import { Zap } from "lucide-react";
import type { SkillTemplate } from "./types";

export const commandSkillTemplate: SkillTemplate = {
  id: "command-skill",
  Icon: Zap,
  iconColor: "#5a8a6c",
  label: "명령어 스킬",
  description: "/명령어를 입력하면 특정 작업을 실행합니다",
  defaultName: "my-command-skill",
  nodes: [
    { id: "t1", type: "trigger", position: { x: 60, y: 200 }, data: { label: "명령어 감지", triggers: [{ kind: "keyword", value: "/실행", matchMode: "exact" }] } },
    { id: "l1", type: "llm", position: { x: 320, y: 200 }, data: { label: "작업 처리", provider: "anthropic", model: "claude-sonnet-4-6", systemPrompt: "주어진 명령을 정확하게 수행하는 어시스턴트입니다.", userPromptTemplate: "다음 요청을 처리해 주세요: {{user_message}}", temperature: 0.3, maxTokens: 2048, outputVariable: "result", streamOutput: false } },
    { id: "o1", type: "output", position: { x: 580, y: 200 }, data: { label: "결과 출력", format: "markdown", template: "## 실행 결과\n\n{{result}}", streamToUser: true } },
  ],
  edges: [
    { id: "e1", source: "t1", target: "l1", animated: true },
    { id: "e2", source: "l1", target: "o1", animated: true },
  ],
};

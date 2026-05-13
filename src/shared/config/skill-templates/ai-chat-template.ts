import { MessageCircle } from "lucide-react";
import type { SkillTemplate } from "./types";

export const aiChatTemplate: SkillTemplate = {
  id: "ai-chat",
  Icon: MessageCircle,
  iconColor: "#3d7870",
  label: "AI 채팅 도우미",
  description: "사용자 메시지에 AI가 자연스럽게 답변합니다",
  defaultName: "ai-chat-assistant",
  nodes: [
    { id: "t1", type: "trigger", position: { x: 60, y: 200 }, data: { label: "채팅 시작", triggers: [{ kind: "manual", value: "", matchMode: "exact" }] } },
    { id: "l1", type: "llm", position: { x: 320, y: 200 }, data: { label: "AI 답변 생성", provider: "anthropic", model: "claude-sonnet-4-6", systemPrompt: "당신은 친절하고 유용한 AI 도우미입니다.", userPromptTemplate: "{{user_message}}", temperature: 0.7, maxTokens: 1024, outputVariable: "answer", streamOutput: true } },
    { id: "o1", type: "output", position: { x: 580, y: 200 }, data: { label: "답변 출력", format: "markdown", template: "{{answer}}", streamToUser: true } },
  ],
  edges: [
    { id: "e1", source: "t1", target: "l1", animated: true },
    { id: "e2", source: "l1", target: "o1", animated: true },
  ],
};

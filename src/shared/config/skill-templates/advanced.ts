import { Type, Plus } from "lucide-react";
import type { SkillTemplate } from "./types";

const X0 = 60;
const DX = 260;
const CY = 200;

export const textTransformTemplate: SkillTemplate = {
  id: "text-transform",
  Icon: Type,
  iconColor: "#7a6aa8",
  label: "텍스트 변환",
  description: "번역, 요약, 교정 등 텍스트 가공 작업을 처리합니다",
  defaultName: "text-transformer",
  nodes: [
    { id: "t1", type: "trigger", position: { x: X0, y: CY }, data: { label: "텍스트 입력 감지", triggers: [{ kind: "context", value: "텍스트를 변환해줘", matchMode: "fuzzy" }] } },
    {
      id: "l1",
      type: "llm",
      position: { x: X0 + DX, y: CY },
      data: {
        label: "텍스트 변환",
        provider: "anthropic",
        model: "claude-sonnet-4-6",
        systemPrompt: "텍스트 변환 전문가입니다. 번역, 요약, 교정, 형식 변환을 정확하게 수행합니다.",
        userPromptTemplate: "다음 텍스트를 변환해 주세요.\n\n요청: {{user_message}}",
        temperature: 0.4,
        maxTokens: 2048,
        outputVariable: "transformed",
        streamOutput: true,
      },
    },
    { id: "o1", type: "output", position: { x: X0 + DX * 2, y: CY }, data: { label: "변환 결과", format: "markdown", template: "{{transformed}}", streamToUser: true } },
  ],
  edges: [
    { id: "e1", source: "t1", target: "l1", animated: true },
    { id: "e2", source: "l1", target: "o1", animated: true },
  ],
};

export const blankTemplate: SkillTemplate = {
  id: "blank",
  Icon: Plus,
  iconColor: "#6e7880",
  label: "직접 만들기",
  description: "빈 캔버스에서 자유롭게 스킬을 설계합니다",
  defaultName: "my-skill",
  nodes: [],
  edges: [],
};

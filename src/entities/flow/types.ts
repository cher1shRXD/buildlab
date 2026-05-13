export type { NodeKind } from "@/shared/config/node-definitions";

export interface BaseNodeData {
  label: string;
  description?: string;
  isValid?: boolean;
  hasError?: string;
  [key: string]: unknown;
}

export type InputFieldType = "string" | "number" | "boolean" | "array" | "object";

export interface InputField {
  id: string;
  name: string;
  type: InputFieldType;
  description?: string;
  required: boolean;
  defaultValue?: string;
}

export interface InputNodeData extends BaseNodeData {
  fields: InputField[];
}

export interface TriggerItem {
  kind: "keyword" | "context" | "manual" | "schedule" | "webhook";
  value: string;
  matchMode: "exact" | "fuzzy" | "regex";
}

export interface TriggerNodeData extends BaseNodeData {
  triggers: TriggerItem[];
}

export interface LLMNodeData extends BaseNodeData {
  provider: "anthropic" | "openai" | "gemini" | "ollama";
  model: string;
  systemPrompt: string;
  userPromptTemplate: string;
  temperature: number;
  maxTokens: number;
  outputVariable: string;
  streamOutput: boolean;
}

export type ToolKind = "http" | "script" | "mcp" | "builtin";

export interface ToolNodeData extends BaseNodeData {
  toolKind: ToolKind;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url?: string;
  headers?: Record<string, string>;
  body?: string;
  language?: "javascript" | "python" | "bash";
  code?: string;
  mcpServer?: string;
  mcpTool?: string;
  builtinTool?: "file-read" | "file-write" | "web-search" | "shell";
  inputMapping: Record<string, string>;
  outputVariable: string;
}

export type LogicKind = "if" | "switch" | "loop" | "parallel";

export interface LogicCondition {
  id: string;
  expression: string;
  label: string;
}

export interface LogicNodeData extends BaseNodeData {
  logicKind: LogicKind;
  conditions: LogicCondition[];
  loopOver?: string;
  maxIterations?: number;
}

export interface MemoryNodeData extends BaseNodeData {
  operation: "read" | "write" | "append" | "clear";
  scope: "session" | "persistent" | "context-window";
  key: string;
  valueExpression?: string;
  outputVariable?: string;
  ttlSeconds?: number;
}

export interface OutputNodeData extends BaseNodeData {
  format: "markdown" | "plain" | "json" | "code";
  template: string;
  codeLanguage?: string;
  streamToUser: boolean;
}

export interface TemplateNodeData extends BaseNodeData {
  referencedSkillId: string;
  inputMapping: Record<string, string>;
  outputMapping: Record<string, string>;
}

export type NodeDataVariant =
  | InputNodeData
  | TriggerNodeData
  | LLMNodeData
  | ToolNodeData
  | LogicNodeData
  | MemoryNodeData
  | OutputNodeData
  | TemplateNodeData;

export interface FlowData {
  id: string;
  skillId: string;
  version: number;
  nodesJson: string;
  edgesJson: string;
  viewportJson: string;
  updatedAt: string;
}
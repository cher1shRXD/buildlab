import InputNode from "./InputNode";
import TriggerNode from "./TriggerNode";
import LLMNode from "./LLMNode";
import ToolNode from "./ToolNode";
import LogicNode from "./LogicNode";
import MemoryNode from "./MemoryNode";
import OutputNode from "./OutputNode";
import TemplateNode from "./TemplateNode";

export const nodeTypes = {
  input: InputNode,
  trigger: TriggerNode,
  llm: LLMNode,
  tool: ToolNode,
  logic: LogicNode,
  memory: MemoryNode,
  output: OutputNode,
  template: TemplateNode,
} as const;

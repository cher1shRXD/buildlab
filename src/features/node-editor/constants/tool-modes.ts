import { Globe, Code2, Wrench, Plug, LucideIcon } from "lucide-react";

export const TOOL_MODES: { kind: string; Icon: LucideIcon; label: string }[] = [
  { kind: "http",    Icon: Globe,  label: "HTTP API" },
  { kind: "script",  Icon: Code2,  label: "스크립트" },
  { kind: "builtin", Icon: Wrench, label: "빌트인" },
  { kind: "mcp",     Icon: Plug,   label: "MCP" },
];
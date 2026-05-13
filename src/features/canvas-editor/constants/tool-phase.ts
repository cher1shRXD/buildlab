import { Globe, Code2, Wrench, Plug } from "lucide-react";

export const TOOL_PHASE_OPTIONS = [
  { kind: "http",    icon: Globe,  label: "HTTP API",    description: "외부 REST API를 호출합니다" },
  { kind: "script",  icon: Code2,  label: "스크립트",    description: "JS / Python / Bash 코드를 실행합니다" },
  { kind: "builtin", icon: Wrench, label: "빌트인 도구", description: "웹 검색, 파일 읽기/쓰기 등 내장 기능" },
  { kind: "mcp",     icon: Plug,   label: "MCP 서버",    description: "Model Context Protocol 서버 도구 호출" },
];

export const TOOL_LANGUAGES = [{ v: "javascript", l: "JS" }, { v: "python", l: "Python" }, { v: "bash", l: "Bash" }];
export const TOOL_BUILTINS = [
  { v: "web-search", l: "웹 검색" },
  { v: "file-read", l: "파일 읽기" },
  { v: "file-write", l: "파일 쓰기" },
  { v: "shell", l: "쉘 실행" },
];
export const TOOL_HTTP_METHODS = ["GET", "POST", "PUT", "DELETE"] as const;

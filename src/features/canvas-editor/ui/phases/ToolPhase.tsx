"use client";

import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Label } from "@/shared/ui/Label";
import NodeSetupSelectCard from "../NodeSetupSelectCard";
import { cn } from "@/shared/lib/utils";
import { Globe, Code2, Wrench, Plug } from "lucide-react";

interface Props {
  phase: number;
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

const TOOL_OPTS = [
  { kind: "http",    icon: Globe,  label: "HTTP API",    description: "외부 REST API를 호출합니다" },
  { kind: "script",  icon: Code2,  label: "스크립트",    description: "JS / Python / Bash 코드를 실행합니다" },
  { kind: "builtin", icon: Wrench, label: "빌트인 도구", description: "웹 검색, 파일 읽기/쓰기 등 내장 기능" },
  { kind: "mcp",     icon: Plug,   label: "MCP 서버",    description: "Model Context Protocol 서버 도구 호출" },
];

const LANGS = [{ v: "javascript", l: "JS" }, { v: "python", l: "Python" }, { v: "bash", l: "Bash" }];
const BUILTINS = [{ v: "web-search", l: "웹 검색" }, { v: "file-read", l: "파일 읽기" }, { v: "file-write", l: "파일 쓰기" }, { v: "shell", l: "쉘 실행" }];
const METHODS = ["GET", "POST", "PUT", "DELETE"] as const;

const ToolPhase = ({ phase, draft, update }: Props) => {
  if (phase === 0) {
    return (
      <div className="grid grid-cols-2 gap-2.5">
        {TOOL_OPTS.map((o) => (
          <NodeSetupSelectCard key={o.kind} icon={o.icon} label={o.label} description={o.description} selected={draft.toolKind === o.kind} onClick={() => update({ toolKind: o.kind })} />
        ))}
      </div>
    );
  }

  const tKind = draft.toolKind as string;
  const varName = (draft.outputVariable as string) || "tool_result";

  if (tKind === "http") {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">HTTP 메서드 + URL <span className="text-destructive">*</span></Label>
          <div className="flex gap-2">
            <div className="flex gap-0.5">
              {METHODS.map((m) => (
                <button key={m} type="button" onClick={() => update({ method: m })} className={cn("px-2 py-1.5 rounded text-[10px] font-mono font-semibold transition-colors", draft.method === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}>{m}</button>
              ))}
            </div>
            <Input className="h-8 text-xs font-mono flex-1" placeholder="https://api.example.com/endpoint" value={(draft.url as string) || ""} onChange={(e) => update({ url: e.target.value })} autoFocus />
          </div>
        </div>
        {draft.method !== "GET" && (
          <div className="space-y-1.5">
            <Label className="text-xs">요청 데이터 <span className="text-muted-foreground">(선택)</span></Label>
            <Textarea rows={3} className="text-xs font-mono resize-none" placeholder={'{"key": "{{variable}}"}'} value={(draft.body as string) || ""} onChange={(e) => update({ body: e.target.value })} />
          </div>
        )}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/40 border border-border/40">
          <span className="text-[10px] text-muted-foreground flex-1">결과 변수: <code className="bg-background px-1 rounded font-mono">{`{{${varName}}}`}</code></span>
          <Input className="h-6 w-24 text-[10px] font-mono" value={(draft.outputVariable as string) || ""} onChange={(e) => update({ outputVariable: e.target.value })} />
        </div>
      </div>
    );
  }

  if (tKind === "script") {
    const lang = (draft.language as string) || "javascript";
    return (
      <div className="space-y-3">
        <div className="flex gap-1">
          {LANGS.map((l) => (
            <button key={l.v} type="button" onClick={() => update({ language: l.v })} className={cn("px-3 py-1 rounded text-xs font-medium transition-colors", lang === l.v ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}>{l.l}</button>
          ))}
        </div>
        <Textarea rows={6} className="text-xs font-mono resize-none" placeholder={"// {{변수명}} 으로 이전 결과 참조 가능\n\nreturn { result: \"hello\" };"} value={(draft.code as string) || ""} onChange={(e) => update({ code: e.target.value })} autoFocus />
      </div>
    );
  }

  if (tKind === "builtin") {
    return (
      <div className="grid grid-cols-2 gap-2">
        {BUILTINS.map((b) => (
          <button key={b.v} type="button" onClick={() => update({ builtinTool: b.v })} className={cn("p-3 rounded-lg border text-xs font-medium text-left transition-colors", draft.builtinTool === b.v ? "border-primary/50 bg-primary/8 text-primary" : "border-border/50 hover:bg-muted text-muted-foreground hover:text-foreground")}>{b.l}</button>
        ))}
      </div>
    );
  }

  if (tKind === "mcp") {
    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs">MCP 서버 이름 <span className="text-destructive">*</span></Label>
          <Input className="h-8 text-xs font-mono" placeholder="server-name" value={(draft.mcpServer as string) || ""} onChange={(e) => update({ mcpServer: e.target.value })} autoFocus />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">도구 이름 <span className="text-destructive">*</span></Label>
          <Input className="h-8 text-xs font-mono" placeholder="tool-name" value={(draft.mcpTool as string) || ""} onChange={(e) => update({ mcpTool: e.target.value })} />
        </div>
      </div>
    );
  }

  return null;
};

export default ToolPhase;

"use client";

import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { Input } from "@/shared/ui/Input";
import { Globe, Code2, Wrench, Plug } from "lucide-react";
import { ModeButton } from "@/shared/ui/ModeButton";
import { ModeGroup } from "@/shared/ui/ModeGroup";
import { FormField } from "@/shared/ui/FormField";
import { OutputVarRow } from "@/shared/ui/OutputVarRow";
import ToolHttpFields from "./ToolHttpFields";
import ToolScriptFields from "./ToolScriptFields";
import type { ToolNodeData } from "@/entities/flow/types";
import type { LucideIcon } from "lucide-react";

interface Props {
  nodeId: string;
  data: ToolNodeData;
}

const TOOL_MODES: { kind: string; Icon: LucideIcon; label: string }[] = [
  { kind: "http",    Icon: Globe,  label: "HTTP API" },
  { kind: "script",  Icon: Code2,  label: "스크립트" },
  { kind: "builtin", Icon: Wrench, label: "빌트인" },
  { kind: "mcp",     Icon: Plug,   label: "MCP" },
];

const BUILTIN_OPTIONS = [
  { value: "web-search", label: "웹 검색" },
  { value: "file-read",  label: "파일 읽기" },
  { value: "file-write", label: "파일 쓰기" },
  { value: "shell",      label: "쉘 실행" },
];

const ToolNodeForm = ({ nodeId, data }: Props) => {
  const updateNodeData = useFlowStore((s) => s.updateNodeData);
  const u = (field: string, value: unknown) => updateNodeData(nodeId, { [field]: value });

  return (
    <div className="space-y-6">
      <FormField label="노드 이름">
        <Input className="h-9 text-sm" value={data.label} onChange={(e) => u("label", e.target.value)} />
      </FormField>

      <div className="h-px bg-border/40" />

      <ModeGroup label="어떤 도구를 쓸까요?">
        {TOOL_MODES.map((m) => (
          <ModeButton key={m.kind} Icon={m.Icon} label={m.label} selected={data.toolKind === m.kind} onClick={() => u("toolKind", m.kind)} />
        ))}
      </ModeGroup>

      <div className="h-px bg-border/40" />

      {data.toolKind === "http" && <FormField label="URL"><ToolHttpFields data={data} u={u} /></FormField>}

      {data.toolKind === "script" && <FormField label="코드"><ToolScriptFields data={data} u={u} /></FormField>}

      {data.toolKind === "builtin" && (
        <FormField label="어떤 기능을 쓸까요?">
          <div className="grid grid-cols-2 gap-2">
            {BUILTIN_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" onClick={() => u("builtinTool", opt.value)} className={`px-3 py-3 rounded-xl border text-sm font-medium text-left transition-colors ${data.builtinTool === opt.value ? "border-primary/50 bg-primary/10 text-primary" : "border-border/50 hover:bg-muted text-muted-foreground hover:text-foreground"}`}>
                {opt.label}
              </button>
            ))}
          </div>
        </FormField>
      )}

      {data.toolKind === "mcp" && (
        <div className="space-y-4">
          <FormField label="MCP 서버">
            <Input className="h-9 text-sm font-mono" placeholder="server-name" value={data.mcpServer ?? ""} onChange={(e) => u("mcpServer", e.target.value)} />
          </FormField>
          <FormField label="도구 이름">
            <Input className="h-9 text-sm font-mono" placeholder="tool-name" value={data.mcpTool ?? ""} onChange={(e) => u("mcpTool", e.target.value)} />
          </FormField>
        </div>
      )}

      <div className="h-px bg-border/40" />
      <OutputVarRow value={data.outputVariable} onChange={(v) => u("outputVariable", v)} />
    </div>
  );
};

export default ToolNodeForm;

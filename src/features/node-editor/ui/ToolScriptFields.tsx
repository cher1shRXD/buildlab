"use client";

import { Textarea } from "@/shared/ui/Textarea";
import type { ToolNodeData } from "@/entities/flow/types";

interface Props {
  data: ToolNodeData;
  u: (field: string, value: unknown) => void;
}

const SCRIPT_LANGS = [
  { value: "javascript", label: "JavaScript" },
  { value: "python",     label: "Python" },
  { value: "bash",       label: "Bash" },
];

const ToolScriptFields = ({ data, u }: Props) => {
  const lang = data.language ?? "javascript";
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-card">
        <p className="text-xs text-muted-foreground">언어</p>
        <div className="flex gap-1.5 ml-auto">
          {SCRIPT_LANGS.map((l) => (
            <button
              key={l.value}
              type="button"
              onClick={() => u("language", l.value)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${lang === l.value ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
      <Textarea
        rows={8}
        className="text-sm border-0 bg-transparent px-4 py-3 resize-none focus-visible:ring-0 font-mono placeholder:text-muted-foreground/50 leading-relaxed"
        placeholder={"// 여기에 코드를 작성하세요\n// {{변수명}} 으로 이전 결과를 참조할 수 있어요\n\nreturn { result: \"hello\" };"}
        value={data.code ?? ""}
        onChange={(e) => u("code", e.target.value)}
      />
    </div>
  );
};

export default ToolScriptFields;

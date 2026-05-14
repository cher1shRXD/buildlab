"use client";

import { Monitor } from "lucide-react";
import type { Node } from "@xyflow/react";
import { NODE_DEFINITION_MAP } from "@/shared/config/node-definitions";
import type { NodeDefinition, NodeKind } from "@/shared/config/node-definitions";

interface Props {
  nodes: Node[];
}

function getNodePreview(node: Node): string {
  const d = node.data as Record<string, unknown>;
  switch (node.type) {
    case "input":
      return d.outputVariable ? `{{${d.outputVariable}}}` : "";
    case "trigger": {
      const triggers = d.triggers as Array<{ value: string }> | undefined;
      return triggers?.[0]?.value || "";
    }
    case "llm":
      return [d.provider, d.model].filter(Boolean).join(" · ");
    case "tool": {
      if (d.toolKind === "http") return `${d.method ?? ""} ${d.url ?? ""}`.trim();
      if (d.toolKind === "mcp") return [d.mcpServer, d.mcpTool].filter(Boolean).join(" · ");
      return String(d.toolKind ?? "");
    }
    case "logic":
      return String(d.logicKind ?? "");
    case "memory":
      return [d.operation, d.key].filter(Boolean).join(" · ");
    case "output":
      return String(d.format ?? "");
    case "template":
      return String(d.referencedSkillId ?? "");
    default:
      return "";
  }
}

interface NodeCardProps {
  node: Node;
  def: NodeDefinition;
}

const NodeCard = ({ node, def }: NodeCardProps) => {
  const { Icon, color, label } = def;
  const nodeLabel = (node.data.label as string) || label;
  const preview = getNodePreview(node);

  return (
    <div className="rounded-xl border bg-card p-4 flex items-start gap-3">
      <div className="rounded-lg p-2 shrink-0" style={{ background: `${color}18` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-[11px] font-medium" style={{ color }}>{label}</span>
        <p className="text-sm font-medium mt-0.5 truncate">{nodeLabel}</p>
        {preview && (
          <p className="text-xs text-muted-foreground mt-1 truncate font-mono">{preview}</p>
        )}
      </div>
    </div>
  );
};

const MobileEditorView = ({ nodes }: Props) => {
  const sorted = [...nodes].sort((a, b) => a.position.x - b.position.x);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-4 py-3 flex items-center gap-2.5">
        <Monitor size={14} className="text-amber-600 dark:text-amber-400 shrink-0" />
        <p className="text-xs text-amber-700 dark:text-amber-300">
          모바일에서는 읽기 전용입니다. 편집하려면 데스크톱에서 열어주세요.
        </p>
      </div>

      {sorted.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-12">노드가 없습니다.</p>
      ) : (
        sorted.map((node) => {
          const def = NODE_DEFINITION_MAP[node.type as NodeKind];
          if (!def) return null;
          return <NodeCard key={node.id} node={node} def={def} />;
        })
      )}
    </div>
  );
};

export default MobileEditorView;

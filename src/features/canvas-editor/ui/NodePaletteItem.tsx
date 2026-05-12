"use client";

import { NODE_DEFINITIONS } from "@/shared/config/node-definitions";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";

interface Props {
  def: (typeof NODE_DEFINITIONS)[number];
}

const NodePaletteItem = ({ def }: Props) => {
  const setPendingAddNodeKind = useFlowStore((s) => s.setPendingAddNodeKind);

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("application/reactflow-nodetype", def.type);
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={() => setPendingAddNodeKind(def.type)}
      className="group flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all select-none border border-transparent"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = `${def.color}10`;
        (e.currentTarget as HTMLDivElement).style.borderColor = `${def.color}30`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.backgroundColor = "";
        (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
      }}
    >
      <div
        className="flex size-7 items-center justify-center rounded-lg shrink-0"
        style={{ backgroundColor: `${def.color}18` }}
      >
        <def.Icon size={14} style={{ color: def.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium leading-none text-foreground/90">
          {def.label}
        </p>
        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
          {def.description}
        </p>
      </div>
      <div
        className="shrink-0 size-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: def.color }}
      />
    </div>
  );
};

export default NodePaletteItem;

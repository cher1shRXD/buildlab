"use client";

import { NODE_DEFINITIONS } from "@/shared/config/node-definitions";
import { ScrollArea } from "@/shared/ui/ScrollArea";
import type { NodeKind } from "@/entities/flow/types";
import NodePaletteItem from "./NodePaletteItem";

const CORE_KINDS: NodeKind[] = ["trigger", "llm", "output"];
const EXTRA_KINDS: NodeKind[] = ["tool", "memory", "logic", "template"];

const NodePalette = () => {
  const coreDefs = NODE_DEFINITIONS.filter((d) => CORE_KINDS.includes(d.type));
  const extraDefs = NODE_DEFINITIONS.filter((d) => EXTRA_KINDS.includes(d.type));

  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-4">
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-1.5">
            핵심 단계
          </p>
          <div className="space-y-0.5">
            {coreDefs.map((def) => (
              <NodePaletteItem key={def.type} def={def} />
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-1.5">
            추가 기능
          </p>
          <div className="space-y-0.5">
            {extraDefs.map((def) => (
              <NodePaletteItem key={def.type} def={def} />
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default NodePalette;

"use client";

import { NODE_DEFINITIONS } from "@/shared/config/node-definitions";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { NODE_PALETTE_CATEGORIES } from "../constants/node-palette";
import NodePaletteItem from "./NodePaletteItem";

const NodePalette = () => {
  return (
    <ScrollArea className="h-full">
      <div className="p-2 space-y-4">
        {NODE_PALETTE_CATEGORIES.map((category) => (
          <div key={category.title}>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-1.5">
              {category.title}
            </p>
            <div className="space-y-0.5">
              {category.kinds.map((kind) => {
                const def = NODE_DEFINITIONS.find((d) => d.type === kind);
                return def ? <NodePaletteItem key={def.type} def={def} /> : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NodePalette;

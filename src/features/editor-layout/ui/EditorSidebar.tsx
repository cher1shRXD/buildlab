"use client";

import { useStore } from "zustand";
import NodePalette from "@/features/canvas-editor/ui/NodePalette";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { Button } from "@/shared/ui/Button";
import { Tooltip } from "@/shared/ui/Tooltip";
import { TooltipContent } from "@/shared/ui/TooltipContent";
import { TooltipTrigger } from "@/shared/ui/TooltipTrigger";
import { Undo2, Redo2 } from "lucide-react";
import StepList from "./StepList";

const EditorSidebar = () => {
  const { undo, redo, pastStates, futureStates } = useStore(useFlowStore.temporal);

  return (
    <aside className="w-52 border-r bg-background flex flex-col">
      <StepList />

      <div className="flex-1 overflow-hidden flex flex-col">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 pt-3 pb-0 shrink-0">단계 추가</p>
        <div className="flex-1 overflow-hidden">
          <NodePalette />
        </div>
      </div>

      <div className="flex items-center gap-1 px-3 py-2 border-t">
        <Tooltip>
          <TooltipTrigger render={<Button size="icon" variant="ghost" className="size-7" disabled={pastStates.length === 0} onClick={() => undo()} />}>
            <Undo2 size={14} />
          </TooltipTrigger>
          <TooltipContent side="top">실행 취소 (Ctrl+Z)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button size="icon" variant="ghost" className="size-7" disabled={futureStates.length === 0} onClick={() => redo()} />}>
            <Redo2 size={14} />
          </TooltipTrigger>
          <TooltipContent side="top">다시 실행 (Ctrl+Y)</TooltipContent>
        </Tooltip>
        <span className="ml-auto text-[10px] text-muted-foreground/50">
          {pastStates.length > 0 ? `${pastStates.length}단계` : ""}
        </span>
      </div>
    </aside>
  );
};

export default EditorSidebar;

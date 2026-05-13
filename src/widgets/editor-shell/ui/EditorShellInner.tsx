"use client";

import { useEffect, useState } from "react";
import Canvas from "@/features/canvas-editor/ui/Canvas";
import EditorHeader from "@/features/editor-layout/ui/EditorHeader";
import EditorSidebar from "@/features/editor-layout/ui/EditorSidebar";
import NodeEditorPanel from "@/features/node-editor/ui/NodeEditorPanel";
import ExportModal from "@/features/skill-export/ui/ExportModal";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { useAutoSave } from "@/features/canvas-editor/hooks/useAutoSave";
import { useExportSkillMutation } from "@/entities/skill/mutations";
import type { SkillMeta } from "@/entities/skill/types";
import type { Flow } from "@/db";

interface Props {
  skill: SkillMeta;
  flow: Flow | null;
}

const EditorShellInner = ({ skill, flow }: Props) => {
  const panelWidth = 420;
  const loadFlow = useFlowStore((s) => s.loadFlow);
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
  const [exportOpen, setExportOpen] = useState(false);
  const { mutateAsync: exportSkill, isPending: isExporting } = useExportSkillMutation();

  useEffect(() => {
    if (flow) {
      loadFlow(JSON.parse(flow.nodesJson), JSON.parse(flow.edgesJson), JSON.parse(flow.viewportJson));
    }
  }, [flow, loadFlow]);

  useAutoSave(flow?.id ?? "");

  async function handleExport() {
    const blob = await exportSkill(skill.id);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${skill.name}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    setExportOpen(false);
  }

  const isOpen = !!selectedNodeId;

  return (
    <>
      <div className="flex flex-col h-dvh overflow-hidden bg-background">
        <EditorHeader skill={skill} onExport={() => setExportOpen(true)} isExporting={isExporting} />
        <div className="flex flex-1 overflow-hidden">
          <EditorSidebar />
          <main className="flex-1 relative overflow-hidden">
            <Canvas />
          </main>
          <div className="overflow-hidden transition-[width] duration-300 ease-in-out border-l border-border shrink-0" style={{ width: isOpen ? panelWidth : 0, borderLeftWidth: isOpen ? 1 : 0 }}>
            <div style={{ width: panelWidth }} className="h-full">
              <NodeEditorPanel />
            </div>
          </div>
        </div>
      </div>
      <ExportModal open={exportOpen} onOpenChange={setExportOpen} skill={skill} onExport={handleExport} isExporting={isExporting} />
    </>
  );
};

export default EditorShellInner;

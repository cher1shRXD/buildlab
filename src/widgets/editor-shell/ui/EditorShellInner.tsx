"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import Canvas from "@/features/canvas-editor/ui/Canvas";
import EditorHeader from "@/features/editor-layout/ui/EditorHeader";
import EditorSidebar from "@/features/editor-layout/ui/EditorSidebar";
import NodeEditorPanel from "@/features/node-editor/ui/NodeEditorPanel";
import MobileEditorView from "@/features/editor-layout/ui/MobileEditorView";
import ExportModal from "@/features/skill-export/ui/ExportModal";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { useAutoSave } from "@/features/canvas-editor/hooks/useAutoSave";
import type { SkillMeta } from "@/entities/skill/types";
import type { FlowData } from "@/entities/flow/types";

interface Props {
  skill: SkillMeta;
  flow: FlowData | null;
}

const EditorShellInner = ({ skill, flow }: Props) => {
  const panelWidth = 420;
  const loadFlow = useFlowStore((s) => s.loadFlow);
  const selectedNodeId = useFlowStore((s) => s.selectedNodeId);
  const [exportOpen, setExportOpen] = useState(false);
  const [isExporting, startExport] = useTransition();

  useEffect(() => {
    if (flow) {
      loadFlow(JSON.parse(flow.nodesJson), JSON.parse(flow.edgesJson), JSON.parse(flow.viewportJson));
    }
  }, [flow, loadFlow]);

  useAutoSave(flow?.id ?? "");

  const handleExport = () => {
    startExport(async () => {
      try {
        const res = await fetch(`/api/skills/${skill.id}/export`, { method: "POST" });
        if (!res.ok) throw new Error();
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${skill.name}.zip`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("스킬이 성공적으로 내보내졌습니다.");
        setExportOpen(false);
      } catch {
        toast.error("스킬 내보내기에 실패했습니다.");
      }
    });
  };

  const isOpen = !!selectedNodeId;
  const nodes = useFlowStore((s) => s.nodes);

  return (
    <>
      {/* 모바일: 읽기 전용 */}
      <div className="lg:hidden flex flex-col h-dvh overflow-hidden bg-background">
        <EditorHeader skill={skill} onExport={() => setExportOpen(true)} isExporting={isExporting} />
        <MobileEditorView nodes={nodes} />
      </div>

      {/* 데스크톱: 전체 에디터 */}
      <div className="hidden lg:flex flex-col h-dvh overflow-hidden bg-background">
        <EditorHeader skill={skill} onExport={() => setExportOpen(true)} isExporting={isExporting} />
        <div className="flex flex-1 overflow-hidden">
          <EditorSidebar />
          <main className="flex-1 relative overflow-hidden">
            <Canvas />
          </main>
          <div
            className="overflow-hidden transition-[width] duration-300 ease-in-out border-l border-border shrink-0"
            style={{ width: isOpen ? panelWidth : 0, borderLeftWidth: isOpen ? 1 : 0 }}
          >
            <div style={{ width: panelWidth }} className="h-full">
              <NodeEditorPanel />
            </div>
          </div>
        </div>
      </div>

      <ExportModal
        open={exportOpen}
        onOpenChange={setExportOpen}
        skill={skill}
        onExport={handleExport}
        isExporting={isExporting}
      />
    </>
  );
};

export default EditorShellInner;

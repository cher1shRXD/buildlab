"use client";

import Link from "next/link";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { Button } from "@/shared/ui/Button";
import { Badge } from "@/shared/ui/Badge";
import { ThemeToggle } from "@/shared/ui/ThemeToggle";
import { ArrowLeft, Download, Loader2 } from "lucide-react";
import type { SkillMeta } from "@/entities/skill/types";

interface Props {
  skill: SkillMeta;
  onExport: () => void;
  isExporting: boolean;
}

const EditorHeader = ({ skill, onExport, isExporting }: Props) => {
  const { isDirty, isSaving, lastSavedAt } = useFlowStore();

  return (
    <header className="flex items-center gap-3 px-4 h-12 border-b bg-background shrink-0">
      <Link href="/dashboard">
        <Button variant="ghost" size="icon" className="size-8">
          <ArrowLeft size={16} />
        </Button>
      </Link>

      <div className="h-4 w-px bg-border" />

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="font-medium text-sm truncate">{skill.name}</span>
        <Badge variant="outline" className="text-xs shrink-0">v{skill.version}</Badge>
      </div>

      <div className="flex items-center gap-2.5">
        {isSaving ? (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
            저장 중
          </div>
        ) : isDirty ? (
          <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
            <span className="size-1.5 rounded-full bg-amber-400" />
            미저장
          </div>
        ) : lastSavedAt ? (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-green-400" />
            저장됨
          </div>
        ) : null}

        <ThemeToggle className="size-8" />

        <Button size="sm" className="gap-1.5 h-8" onClick={onExport} disabled={isExporting}>
          {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          스킬 내보내기
        </Button>
      </div>
    </header>
  );
};

export default EditorHeader;

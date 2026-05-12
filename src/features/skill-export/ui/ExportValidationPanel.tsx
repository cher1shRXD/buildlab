"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import type { SkillMeta } from "@/entities/skill/types";

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

interface Props {
  validation: ValidationResult;
  skill: SkillMeta;
  nodeCount: number;
  edgeCount: number;
}

const ExportValidationPanel = ({ validation, skill, nodeCount, edgeCount }: Props) => (
  <div className="w-60 shrink-0 border-r flex flex-col overflow-y-auto">
    <div className="p-4 space-y-3 flex-1">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">유효성 검사</p>
      {validation.isValid ? (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-800/40">
          <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">모든 조건을 통과했습니다</span>
        </div>
      ) : (
        <div className="space-y-2">
          {validation.errors.map((err, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-destructive/6 border border-destructive/20">
              <XCircle size={12} className="mt-0.5 shrink-0 text-destructive" />
              <span className="text-[11px] text-destructive leading-relaxed">{err}</span>
            </div>
          ))}
        </div>
      )}
    </div>
    <div className="p-4 border-t space-y-2">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">플로우 정보</p>
      {[{ label: "노드 수", value: `${nodeCount}개` }, { label: "연결 수", value: `${edgeCount}개` }, { label: "버전", value: skill.version ?? "1.0.0" }].map(({ label, value }) => (
        <div key={label} className="flex items-center justify-between">
          <span className="text-[11px] text-muted-foreground">{label}</span>
          <span className="text-[11px] font-mono font-medium">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

export default ExportValidationPanel;

"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { useUpdateFlowMutation } from "@/entities/flow/mutations";

export function useAutoSave(flowId: string, debounceMs = 1500) {
  const { nodes, edges, viewport, isDirty, markSaved, setIsSaving } =
    useFlowStore();
  const { mutateAsync: updateFlow } = useUpdateFlowMutation(flowId);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!isDirty || !flowId) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setIsSaving(true);
      try {
        await updateFlow({ nodes, edges, viewport });
        markSaved();
      } catch {
        setIsSaving(false);
        toast.error("자동 저장에 실패했습니다. 네트워크 연결을 확인하세요.");
      }
    }, debounceMs);

    return () => clearTimeout(timerRef.current);
  }, [
    nodes,
    edges,
    viewport,
    isDirty,
    flowId,
    debounceMs,
    markSaved,
    setIsSaving,
    updateFlow,
  ]);
}

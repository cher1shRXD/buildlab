import { useEffect, useRef } from "react";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { updateFlow } from "@/features/canvas-editor/actions/updateFlow";

export function useAutoSave(flowId: string, debounceMs = 1500) {
  const { nodes, edges, viewport, isDirty, markSaved, setIsSaving } = useFlowStore();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!isDirty || !flowId) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      setIsSaving(true);
      try {
        await updateFlow(flowId, { nodes, edges, viewport });
        markSaved();
      } catch {
        setIsSaving(false);
      }
    }, debounceMs);

    return () => clearTimeout(timerRef.current);
  }, [nodes, edges, viewport, isDirty, flowId, debounceMs, markSaved, setIsSaving]);
}

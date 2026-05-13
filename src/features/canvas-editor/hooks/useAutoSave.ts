import { useEffect, useRef } from "react";
import { useFlowStore } from "@/features/canvas-editor/stores/flow";
import { useUpdateFlowMutation } from "@/entities/flow/mutations";

export function useAutoSave(flowId: string, debounceMs = 1500) {
  const { nodes, edges, viewport, isDirty, markSaved, setIsSaving } =
    useFlowStore();
  const { mutate: updateFlow } = useUpdateFlowMutation(flowId);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!isDirty || !flowId) return;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsSaving(true);
      updateFlow(
        { nodes, edges, viewport },
        {
          onSuccess: () => markSaved(),
          onError: () => setIsSaving(false),
        }
      );
    }, debounceMs);

    return () => clearTimeout(timerRef.current);
  }, [nodes, edges, viewport, isDirty, flowId, debounceMs, markSaved, setIsSaving, updateFlow]);
}

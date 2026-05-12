"use client";

import { useState } from "react";
import type { NodeKind } from "@/entities/flow/types";
import { getInitialDraft, draftToNodeData } from "@/features/canvas-editor/utils/node-draft";

export const useNodeSetupModal = (
  nodeKind: NodeKind | null,
  onComplete: (data: Record<string, unknown>) => void,
  onCancel: () => void
) => {
  const [phase, setPhase] = useState(0);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [prevKind, setPrevKind] = useState<NodeKind | null>(null);

  if (nodeKind !== prevKind) {
    setPrevKind(nodeKind);
    if (nodeKind) {
      setPhase(0);
      setDraft(getInitialDraft(nodeKind));
    }
  }

  const update = (partial: Record<string, unknown>) => {
    setDraft((prev) => ({ ...prev, ...partial }));
  };

  const handleCancel = () => {
    setPhase(0);
    setDraft({});
    onCancel();
  };

  const handleNext = (isLastPhase: boolean) => {
    if (!nodeKind) return;
    if (isLastPhase) {
      onComplete(draftToNodeData(nodeKind, draft));
      setPhase(0);
      setDraft({});
    } else {
      setPhase((p) => p + 1);
    }
  };

  const handleBack = () => {
    setPhase((p) => Math.max(0, p - 1));
  };

  return {
    phase,
    setPhase,
    draft,
    update,
    handleCancel,
    handleNext,
    handleBack,
  };
};

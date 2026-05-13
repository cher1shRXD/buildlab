"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FlowApi } from "./apis";
import type { ErrorResponse } from "@/shared/types";
import type { Edge, Node, Viewport } from "@xyflow/react";

export const useUpdateFlowMutation = (flowId: string) =>
  useMutation({
    mutationFn: (payload: {
      nodes: Node[];
      edges: Edge[];
      viewport: Viewport;
    }) => FlowApi.update(flowId, payload),
    onError: (err: ErrorResponse) =>
      toast.error(err.message ?? "자동 저장에 실패했습니다."),
  });

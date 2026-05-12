"use client";

import { useMutation } from "@tanstack/react-query";
import { FlowApi, type UpdateFlowPayload } from "./apis";

export const useUpdateFlowMutation = (flowId: string) =>
  useMutation({
    mutationFn: (payload: UpdateFlowPayload) => FlowApi.update(flowId, payload),
  });

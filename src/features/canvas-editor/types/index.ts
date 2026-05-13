import type { NodeKind } from "@/entities/flow/types";

export interface PendingDrop {
  type: NodeKind;
  position: { x: number; y: number };
}

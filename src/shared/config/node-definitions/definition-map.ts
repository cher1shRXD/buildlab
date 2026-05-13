import { NODE_DEFINITIONS } from "./definitions";
import type { NodeKind, NodeDefinition } from "./definitions";

export const NODE_DEFINITION_MAP: Record<NodeKind, NodeDefinition> =
  Object.fromEntries(
    NODE_DEFINITIONS.map((d) => [d.type, d])
  ) as Record<NodeKind, NodeDefinition>;

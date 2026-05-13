"use client";

import { ReactFlowProvider } from "@xyflow/react";
import EditorShellInner from "./EditorShellInner";
import type { SkillMeta } from "@/entities/skill/types";
import type { FlowData } from "@/entities/flow/types";

interface Props {
  skill: SkillMeta;
  flow: FlowData | null;
}

const EditorShell = ({ skill, flow }: Props) => (
  <ReactFlowProvider>
    <EditorShellInner skill={skill} flow={flow} />
  </ReactFlowProvider>
);

export default EditorShell;

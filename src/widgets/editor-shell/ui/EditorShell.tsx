"use client";

import { ReactFlowProvider } from "@xyflow/react";
import EditorShellInner from "./EditorShellInner";
import type { SkillMeta } from "@/entities/skill/types";

interface Flow {
  id: string;
  nodesJson: string;
  edgesJson: string;
  viewportJson: string;
}

interface Props {
  skill: SkillMeta;
  flow: Flow | null;
}

const EditorShell = ({ skill, flow }: Props) => (
  <ReactFlowProvider>
    <EditorShellInner skill={skill} flow={flow} />
  </ReactFlowProvider>
);

export default EditorShell;

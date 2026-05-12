"use client";

import type { NodeKind } from "@/entities/flow/types";
import TriggerPhase from "./phases/TriggerPhase";
import LLMPhase from "./phases/LLMPhase";
import ToolPhase from "./phases/ToolPhase";
import LogicPhase from "./phases/LogicPhase";
import MemoryPhase from "./phases/MemoryPhase";
import OutputPhase from "./phases/OutputPhase";
import TemplatePhase from "./phases/TemplatePhase";

interface Props {
  kind: NodeKind;
  phase: number;
  draft: Record<string, unknown>;
  update: (partial: Record<string, unknown>) => void;
}

const NodeSetupPhaseContent = ({ kind, phase, draft, update }: Props) => {
  switch (kind) {
    case "trigger":
      return <TriggerPhase phase={phase} draft={draft} update={update} />;
    case "llm":
      return <LLMPhase phase={phase} draft={draft} update={update} />;
    case "tool":
      return <ToolPhase phase={phase} draft={draft} update={update} />;
    case "logic":
      return <LogicPhase phase={phase} draft={draft} update={update} />;
    case "memory":
      return <MemoryPhase phase={phase} draft={draft} update={update} />;
    case "output":
      return <OutputPhase phase={phase} draft={draft} update={update} />;
    case "template":
      return <TemplatePhase draft={draft} update={update} />;
  }
};

export default NodeSetupPhaseContent;

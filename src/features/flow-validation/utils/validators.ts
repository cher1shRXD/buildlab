import type { Node, Edge } from "@xyflow/react";

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateFlow(nodes: Node[], edges: Edge[]): ValidationResult {
  const errors: string[] = [];

  if (nodes.length === 0) {
    errors.push(
      "플로우에 노드가 없습니다. 최소 1개의 Trigger 노드를 추가하세요."
    );
    return { isValid: false, errors };
  }

  const triggerNodes = nodes.filter((n) => n.type === "trigger");
  if (triggerNodes.length === 0) {
    errors.push(
      "Trigger 노드가 없습니다. 스킬 활성화 조건을 정의하는 Trigger 노드가 필요합니다."
    );
  }

  for (const t of triggerNodes) {
    const triggers = (t.data as Record<string, unknown>).triggers as
      | Array<{ value: string }>
      | undefined;
    if (!triggers || triggers.every((tr) => !tr.value.trim())) {
      errors.push(
        `Trigger 노드 "${(t.data as Record<string, unknown>).label}"에 활성화 조건이 설정되지 않았습니다.`
      );
    }
  }

  const connectedNodeIds = new Set<string>();
  for (const edge of edges) {
    connectedNodeIds.add(edge.source);
    connectedNodeIds.add(edge.target);
  }

  const orphanNodes = nodes.filter(
    (n) =>
      !connectedNodeIds.has(n.id) && n.type !== "trigger" && nodes.length > 1
  );
  if (orphanNodes.length > 0) {
    const names = orphanNodes
      .map((n) => `"${(n.data as Record<string, unknown>).label}"`)
      .join(", ");
    errors.push(`연결되지 않은 노드가 있습니다: ${names}`);
  }

  const llmNodes = nodes.filter((n) => n.type === "llm");
  for (const node of llmNodes) {
    const d = node.data as Record<string, unknown>;
    if (!d.userPromptTemplate) {
      errors.push(`LLM 노드 "${d.label}"에 프롬프트 템플릿이 비어 있습니다.`);
    }
    if (!d.outputVariable) {
      errors.push(
        `LLM 노드 "${d.label}"의 출력 변수명이 설정되지 않았습니다.`
      );
    }
  }

  const toolNodes = nodes.filter((n) => n.type === "tool");
  for (const node of toolNodes) {
    const d = node.data as Record<string, unknown>;
    if (d.toolKind === "http" && !d.url) {
      errors.push(`Tool 노드 "${d.label}"의 URL이 비어 있습니다.`);
    }
    if (d.toolKind === "script" && !d.code) {
      errors.push(`Tool 노드 "${d.label}"의 코드가 비어 있습니다.`);
    }
  }

  const outputNodes = nodes.filter((n) => n.type === "output");
  if (nodes.length > 1 && outputNodes.length === 0) {
    errors.push(
      "Output 노드가 없습니다. 스킬 실행 결과를 반환하는 Output 노드를 추가하세요."
    );
  }

  return { isValid: errors.length === 0, errors };
}

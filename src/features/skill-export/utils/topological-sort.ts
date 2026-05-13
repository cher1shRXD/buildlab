import type { Node, Edge } from "@xyflow/react";

export function topologicalSort(nodes: Node[], edges: Edge[]): Node[] {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const inDegree = new Map<string, number>(nodes.map((n) => [n.id, 0]));
  const adj = new Map<string, string[]>(nodes.map((n) => [n.id, []]));

  for (const edge of edges) {
    adj.get(edge.source)?.push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) ?? 0) + 1);
  }

  const queue: Node[] = nodes.filter((n) => (inDegree.get(n.id) ?? 0) === 0);
  const result: Node[] = [];

  while (queue.length > 0) {
    queue.sort((a, b) => {
      if (a.type === "trigger") return -1;
      if (b.type === "trigger") return 1;
      return 0;
    });

    const node = queue.shift()!;
    result.push(node);

    for (const neighborId of adj.get(node.id) ?? []) {
      const newDegree = (inDegree.get(neighborId) ?? 0) - 1;
      inDegree.set(neighborId, newDegree);
      if (newDegree === 0) {
        const neighborNode = nodeMap.get(neighborId);
        if (neighborNode) queue.push(neighborNode);
      }
    }
  }

  const resultIds = new Set(result.map((n) => n.id));
  for (const node of nodes) {
    if (!resultIds.has(node.id)) result.push(node);
  }

  return result;
}

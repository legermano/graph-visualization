import type { Edges, Nodes } from "v-network-graph";

export default class Search {
  map: Map<string, string[]>;
  nodes: Nodes;
  edges: Edges;

  constructor(nodes: Nodes, edges: Edges) {
    this.map = new Map();
    this.nodes = nodes;
    this.edges = edges;

    Object.entries(nodes).forEach(([nodeId]) => this._addNode(nodeId));

    Object.entries(edges).forEach(([, edge]) => {
      this._addEdge(edge.source, edge.target);
    });

    console.log(this.map);
  }

  _addNode(node: string) {
    this.map.set(node, []);
  }

  _addEdge(source: string, target: string) {
    this.map.get(source)?.push(target);
    this.map.get(target)?.push(source);
  }

  dfs(start: string, visited = new Set()) {
    console.log(this.nodes[start]);
    visited.add(start);
    const children = this.map.get(start);

    children?.forEach((child) => {
      if (!visited.has(child)) {
        this.dfs(child, visited);
      }
    });
  }
}

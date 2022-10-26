import { useNotificationStore } from "@/stores";
import type { Edges, Nodes } from "v-network-graph";

export default class Search {
  map: Map<string, string[]>;
  nodes: Nodes;
  edges: Edges;
  directed: boolean;
  visitedNodes: string[];

  constructor(nodes: Nodes, edges: Edges, directed: boolean) {
    this.map = new Map();
    this.nodes = nodes;
    this.edges = edges;
    this.directed = directed;
    this.visitedNodes = [];

    Object.entries(nodes).forEach(([nodeId]) => this._addNode(nodeId));

    Object.entries(edges).forEach(([, edge]) => {
      this._addEdge(edge.source, edge.target);
    });
  }

  _addNode(node: string) {
    this.map.set(node, []);
  }

  _addEdge(source: string, target: string) {
    this.map.get(source)?.push(target);
    if (!this.directed) {
      this.map.get(target)?.push(source);
    }
  }

  // Deep-firts search
  dfs(start: string) {
    this.visitedNodes = [];
    this._dfs(start);
    useNotificationStore().notificate(
      "DFS",
      `From node ${this.nodes[start].name}: ` + this.visitedNodes.join(", ")
    );
  }

  _dfs(start: string, visited = new Set()) {
    this.visitedNodes.push(this.nodes[start].name ?? "Unnamed node");
    visited.add(start);
    const children = this.map.get(start);

    children?.forEach((child) => {
      if (!visited.has(child)) {
        this._dfs(child, visited);
      }
    });
  }

  // Breadth-first search
  bfs(start: string) {
    this.visitedNodes = [];
    this._bfs(start);
    useNotificationStore().notificate(
      "BFS",
      `From node ${this.nodes[start].name}: ` + this.visitedNodes.join(", ")
    );
  }

  _bfs(start: string) {
    const visited = new Set();
    const queue = [];

    queue.push(start);
    visited.add(start);

    while (queue.length > 0) {
      const node = queue.shift();

      if (node == undefined) return;

      this.visitedNodes.push(this.nodes[node].name ?? "Unnamed node");

      const children = this.map.get(node);

      children?.forEach((child) => {
        if (!visited.has(child)) {
          visited.add(child);
          queue.push(child);
        }
      });
    }
  }

  topologicalSort() {
    this.visitedNodes = [];
    this._topologicalSort();
    console.log("Topological Sort");
    useNotificationStore().notificate(
      "Topological Sort",
      "Order: " + this.visitedNodes.join(", ")
    );
  }

  _topologicalSort() {
    const stack = new Array<string>();
    const visited = new Set<string>();

    this.map.forEach((_children, node) => {
      if (!visited.has(node)) {
        this._topologicalSortUtils(node, visited, stack);
      }
    });

    while (stack.length != 0) {
      const node = stack.pop();

      if (node != undefined) {
        this.visitedNodes.push(this.nodes[node].name ?? "Unnamed node");
      }
    }
  }

  _topologicalSortUtils(
    node: string,
    visited: Set<string>,
    stack: Array<string>
  ) {
    visited.add(node);

    const children = this.map.get(node);

    children?.forEach((child) => {
      if (!visited.has(child)) {
        this._topologicalSortUtils(child, visited, stack);
      }
    });

    stack.push(node);
  }
}

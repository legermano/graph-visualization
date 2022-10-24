import type { Edges } from "v-network-graph";

type GraphMap = { [key: string]: { [key: string]: number } };
type EdgeMap = { [key: string]: { [key: string]: string } };

export default class DijkstraAlgorithm {
  map: GraphMap;
  edgeMap: EdgeMap;

  // Custom sorter
  _sorter = function (a: string, b: string) {
    return parseFloat(a) - parseFloat(b);
  };

  // Initialize class converting visual nodes and edged to matrix
  constructor(edges: Edges) {
    const map: GraphMap = {};
    const edgeMap: EdgeMap = {};

    Object.entries(edges).forEach(([edgeId, edge]) => {
      const source = edge.source;
      const target = edge.target;
      const cost = edge?.cost ?? 1;
      if (!map[source]) map[source] = {};
      if (!map[target]) map[target] = {};
      if (!edgeMap[source]) edgeMap[source] = {};
      if (!edgeMap[target]) edgeMap[target] = {};

      if (
        (map[source][target] && map[source][target] > cost) ||
        !map[source][target]
      ) {
        map[source][target] = cost;
        map[target][source] = cost;
        edgeMap[source][target] = edgeId;
        edgeMap[target][source] = edgeId;
      }
    });

    this.map = map;
    this.edgeMap = edgeMap;
  }

  findShortestPath(viaNodes: string[]) {
    return this._findShortestPath(this.map, viaNodes);
  }

  // Get the nodes and convert it to its edges
  convertNodesToEdges(nodes: string[]): string[] {
    if (nodes.length === 0) {
      return [];
    }

    const edges: string[] = [];
    let prev = nodes[0];

    for (let i = 1; i < nodes.length; i++) {
      const next = nodes[i];
      edges.push(this.edgeMap[prev][next]);
      prev = next;
    }

    return edges;
  }

  // Extracts keys from object
  _extractKeys(obj: object) {
    const keys = [];
    let key;

    for (key in obj) {
      Object.prototype.hasOwnProperty.call(obj, key) && keys.push(key);
    }

    return keys;
  }

  _findPaths(map: GraphMap, start: string, end: string) {
    const costs: { [key: string]: number } = {};
    const open: { [key: string]: string[] } = { 0: [start] };
    const predecessors: { [key: string]: string } = {};
    let keys;

    const addToOpen = function (cost: number, vertex: string) {
      const key = "" + cost;
      if (!open[key]) {
        open[key] = [];
      }
      open[key].push(vertex);
    };

    costs[start] = 0;

    while (open) {
      if (!(keys = this._extractKeys(open)).length) {
        break;
      }

      keys.sort(this._sorter);

      const key = keys[0];
      const bucket = open[key];
      const node = bucket.shift() || "";
      const currentCost = parseFloat(key);
      const adjacentNodes = map[node] || {};

      if (!bucket.length) {
        delete open[key];
      }

      for (const vertex in adjacentNodes) {
        if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
          const cost = adjacentNodes[vertex];
          const totalCost = cost + currentCost;
          const vertexCost = costs[vertex];

          if (vertexCost === undefined || vertexCost > totalCost) {
            costs[vertex] = totalCost;
            addToOpen(totalCost, vertex);
            predecessors[vertex] = node;
          }
        }
      }
    }

    if (costs[end] === undefined) {
      return null;
    } else {
      return predecessors;
    }
  }

  _extractShortest(predecessors: { [key: string]: string }, end: string) {
    const nodes = [];
    let u = end;

    while (u !== undefined) {
      nodes.push(u);
      u = predecessors[u];
    }

    nodes.reverse();
    return nodes;
  }

  _findShortestPath(map: GraphMap, nodes: string[]) {
    nodes = [...nodes]; // copy
    let start = nodes.shift() || "";
    let end: string;
    let predecessors;
    const path: string[] = [];
    let shortest;

    while (nodes.length) {
      end = nodes.shift() || "";
      predecessors = this._findPaths(map, start, end);

      if (predecessors) {
        shortest = this._extractShortest(predecessors, end);
        if (nodes.length) {
          path.push(...shortest.slice(0, -1));
        } else {
          return path.concat(shortest);
        }
      } else {
        return null;
      }

      start = end;
    }
  }
}

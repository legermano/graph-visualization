import { ref } from "vue";
import { defineStore } from "pinia";
import { defineConfigs } from "v-network-graph";
import type { Node, Nodes, Edges, Paths, Layouts } from "v-network-graph";

export const useGraphStore = defineStore("graph", () => {
  const isDirected = ref(false);
  const nodes = ref({} as Nodes);
  const edges = ref({} as Edges);
  const paths = ref({} as Paths);
  const layouts = ref({} as Layouts);
  const selectedNodes = ref<string[]>([]);
  const selectedEdges = ref<string[]>([]);
  const nextNodeIndex = ref(Object.keys(nodes.value).length + 1);
  const nextEdgeIndex = ref(Object.keys(edges.value).length + 1);

  const configs = ref(
    defineConfigs({
      view: {
        panEnabled: true,
      },
      node: {
        selectable: 2,
      },
      edge: {
        selectable: true,
        normal: {
          width: 3,
        },
        type: "curve",
        gap: 40,
        marker: {
          target: {},
        },
        selfLoop: {
          radius: 14,
          offset: 16,
          angle: 180,
          isClockwise: true,
        },
      },
      path: {
        visible: true,
        curveInNode: true,
        path: {
          width: 14,
          color: "#ff000088",
        },
      },
    })
  );

  function clearAll() {
    nodes.value = {};
    edges.value = {};
    paths.value = {};
    selectedNodes.value = [];
    selectedEdges.value = [];
  }

  function dijkstraSample() {
    nodes.value = {
      node1: { name: "Lajeado" },
      node2: { name: "Estrela" },
      node3: { name: "Arroio do Meio" },
      node4: { name: "Teotônia" },
      node5: { name: "Colinas" },
      node6: { name: "Roca Sales" },
      node7: { name: "Paverama" },
      node8: { name: "Westfália" },
      node9: { name: "Encantado" },
      node10: { name: "Poço das Antas" },
      node11: { name: "Imigrante" },
      node12: { name: "Boa Vista do Sul" },
    };

    edges.value = {
      edge1: { source: "node1", target: "node2", cost: 10 },
      edge2: { source: "node1", target: "node3", cost: 5 },
      edge3: { source: "node2", target: "node4", cost: 10 },
      edge4: { source: "node2", target: "node5", cost: 10 },
      edge5: { source: "node3", target: "node5", cost: 5 },
      edge6: { source: "node3", target: "node6", cost: 10 },
      edge7: { source: "node4", target: "node7", cost: 10 },
      edge8: { source: "node5", target: "node8", cost: 5 },
      edge9: { source: "node6", target: "node9", cost: 10 },
      edge10: { source: "node7", target: "node10", cost: 5 },
      edge11: { source: "node8", target: "node10", cost: 5 },
      edge12: { source: "node8", target: "node11", cost: 10 },
      edge13: { source: "node9", target: "node11", cost: 10 },
      edge14: { source: "node10", target: "node12", cost: 10 },
      edge15: { source: "node11", target: "node12", cost: 10 },
    };

    layouts.value = {
      nodes: {
        node1: { x: 0, y: 100 },
        node2: { x: 75, y: 50 },
        node3: { x: 75, y: 150 },
        node4: { x: 150, y: 0 },
        node5: { x: 150, y: 100 },
        node6: { x: 150, y: 200 },
        node7: { x: 250, y: 0 },
        node8: { x: 250, y: 100 },
        node9: { x: 250, y: 200 },
        node10: { x: 325, y: 50 },
        node11: { x: 325, y: 150 },
        node12: { x: 400, y: 100 },
      },
    };
  }

  function addNode(node: Node) {
    const nodeId = `node${nextNodeIndex.value}`;
    nodes.value[nodeId] = node;
    nextNodeIndex.value++;
  }

  function removeNode() {
    for (const nodeId of selectedNodes.value) {
      delete nodes.value[nodeId];
    }
  }

  function addEdge(name: string) {
    if (selectedNodes.value.length !== 1 && selectedNodes.value.length !== 2) {
      return;
    }

    const edgeId = `edge${nextEdgeIndex.value}`;

    let source = null;
    let target = null;
    if (selectedNodes.value.length === 1) {
      source = selectedNodes.value[0];
      target = selectedNodes.value[0];
    } else {
      [source, target] = selectedNodes.value;
    }

    edges.value[edgeId] = { source, target, cost: name };
    nextEdgeIndex.value++;
  }

  function removeEdge() {
    for (const edgeId of selectedEdges.value) {
      delete edges.value[edgeId];
    }
  }

  function toogleDirection() {
    isDirected.value = !isDirected.value;
    configs.value.edge!.marker!.target!.type = isDirected.value
      ? "arrow"
      : "none";
  }

  return {
    nodes,
    edges,
    paths,
    layouts,
    selectedNodes,
    selectedEdges,
    configs,
    isDirected,
    addNode,
    removeNode,
    addEdge,
    removeEdge,
    toogleDirection,
    clearAll,
    dijkstraSample,
  };
});

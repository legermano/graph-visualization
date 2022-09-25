import { ref } from "vue";
import { defineStore } from "pinia";
import { defineConfigs } from "v-network-graph";
import type { Node, Nodes, Edges } from "v-network-graph";

export const useGraphStore = defineStore("graph", () => {
  const nodes = ref({} as Nodes);
  const edges = ref({} as Edges);
  const selectedNodes = ref<string[]>([]);
  const selectedEdges = ref<string[]>([]);
  const nextNodeIndex = ref(Object.keys(nodes.value).length + 1);
  const nextEdgeIndex = ref(Object.keys(edges.value).length + 1);

  const configs = ref(
    defineConfigs({
      view: {
        panEnabled: false,
      },
      node: {
        selectable: 2,
      },
      edge: {
        selectable: true,
        normal: {
          width: 3,
        },
        gap: 5,
        marker: {
          target: {
            type: "none",
          },
        },
      },
    })
  );

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
    if (selectedNodes.value.length !== 2) return;
    const [source, target] = selectedNodes.value;
    const edgeId = `edge${nextEdgeIndex.value}`;
    edges.value[edgeId] = { source, target, label: name };
    nextEdgeIndex.value++;
  }

  function removeEdge() {
    for (const edgeId of selectedEdges.value) {
      delete edges.value[edgeId];
    }
  }

  return {
    nodes,
    edges,
    selectedNodes,
    selectedEdges,
    configs,
    addNode,
    removeNode,
    addEdge,
    removeEdge,
  };
});

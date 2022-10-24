<script setup lang="ts">
import { ref } from "vue";
import { useGraphStore } from "@/stores/graph";
import { storeToRefs } from "pinia";
import { NodeModal, EdgeModal } from "@/components";
import { Search, DijkstraAlgorithm } from "@/modules";

const graphStore = useGraphStore();
const { selectedNodes, selectedEdges, isDirected, nodes, edges, paths } =
  storeToRefs(graphStore);
const { removeNode, removeEdge, toogleDirection, clearAll, dijkstraSample } =
  graphStore;
const nodeModal = ref();
const edgeModal = ref();

const dfs = () => {
  const s = new Search(nodes.value, edges.value, isDirected.value);
  s.dfs(selectedNodes.value[0]);
};
const bfs = () => {
  const s = new Search(nodes.value, edges.value, isDirected.value);
  s.bfs(selectedNodes.value[0]);
};
const dijkstra = () => {
  const [source, target] = selectedNodes.value;
  const dijkstra = new DijkstraAlgorithm(edges.value);
  const routeOfNodes = dijkstra.findShortestPath([source, target]);

  if (routeOfNodes) {
    const routeOfEdges = dijkstra.convertNodesToEdges(routeOfNodes);
    paths.value = { shortestPath: { edges: routeOfEdges } };
  }
};
</script>

<template>
  <nav class="panel is-info">
    <p class="panel-heading has-text-centered">Network Graph Controls</p>
    <div class="panel-block btn-actions">
      <label>Node:</label>
      <button class="button" @click="nodeModal.openModal()">Add</button>
      <button
        class="button"
        @click="removeNode()"
        :disabled="selectedNodes.length == 0"
      >
        Remove
      </button>
      <NodeModal ref="nodeModal" />
      <label>Edge:</label>
      <button
        class="button"
        @click="edgeModal.openModal()"
        :disabled="selectedNodes.length != 1 && selectedNodes.length != 2"
      >
        Add
      </button>
      <button
        class="button"
        @click="removeEdge()"
        :disabled="selectedEdges.length == 0"
      >
        Remove
      </button>
      <EdgeModal ref="edgeModal" />
      <label class="checkbox">
        <input
          type="checkbox"
          :checked="isDirected"
          @click="toogleDirection()"
        />
        Directed
      </label>
      <label>Searchs:</label>
      <button class="button" @click="dfs" :disabled="selectedNodes.length != 1">
        DFS
      </button>
      <button class="button" @click="bfs" :disabled="selectedNodes.length != 1">
        BFS
      </button>
      <button
        class="button"
        @click="dijkstra"
        :disabled="selectedNodes.length != 2"
      >
        Dijkstra
      </button>
      <label>Controls</label>
      <button class="button" @click="clearAll">Clear all</button>
      <button class="button" @click="dijkstraSample">
        Dijkstra Sample (Cities)
      </button>
    </div>
  </nav>
</template>

<style scoped>
.btn-actions *:not(.modal) {
  margin-right: 1rem;
}
</style>

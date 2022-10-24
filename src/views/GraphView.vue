<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ControlPanel, SearchNotification } from "@/components";
import { useGraphStore } from "@/stores";

const graphStore = useGraphStore();
const { nodes, edges, paths, selectedNodes, selectedEdges, configs, layouts } =
  storeToRefs(graphStore);
</script>

<template>
  <SearchNotification />
  <div class="container">
    <ControlPanel />
    <nav class="panel graph-panel">
      <v-network-graph
        class="graph"
        v-model:selected-nodes="selectedNodes"
        v-model:selected-edges="selectedEdges"
        :nodes="nodes"
        :edges="edges"
        :paths="paths"
        :layouts="layouts"
        :configs="configs"
      >
        <template #override-node-label="{ scale, text }">
          <text
            x="0"
            y="0"
            :font-size="10 * scale"
            font-weight="bold"
            text-anchor="middle"
            dominant-baseline="central"
            fill="#000000"
            >{{ text }}</text
          >
        </template>
        <template #edge-label="{ edge, ...slotProps }">
          <v-edge-label
            :text="edge.cost"
            align="center"
            vertical-align="above"
            v-bind="slotProps"
          />
        </template>
      </v-network-graph>
      <span class="icon-text mt-2">
        <span class="icon">
          <i class="fa-solid fa-arrow-pointer"></i>
        </span>
        <span
          >To select multiple nodes/edges, Shift+click or hold down the selected
          node/edge and tap another node/edge.
        </span>
      </span>
    </nav>
  </div>
</template>

<style scoped>
.container {
  padding-top: 1rem;
  height: calc(100vh - 1rem);
}
.graph-panel {
  height: 75%;
}
</style>

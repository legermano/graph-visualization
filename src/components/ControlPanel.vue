<script setup lang="ts">
import { ref } from "vue";
import { useGraphStore } from "@/stores/graph";
import { storeToRefs } from "pinia";
import NodeModal from "@/components/NodeModal.vue";
import EdgeModal from "@/components/EdgeModal.vue";

const graphStore = useGraphStore();
const { selectedNodes, selectedEdges } = storeToRefs(graphStore);
const { removeNode, removeEdge } = graphStore;
const nodeModal = ref();
const edgeModal = ref();
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
        :disabled="selectedNodes.length != 2"
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
    </div>
  </nav>
</template>

<style scoped>
.btn-actions * {
  margin-right: 1rem;
}
</style>

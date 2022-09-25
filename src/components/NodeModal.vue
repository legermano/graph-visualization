<script setup lang="ts">
import { ref } from "vue";
import { useGraphStore } from "@/stores/graph";
import BaseModal from "./BaseModal.vue";

const { addNode } = useGraphStore();
const name = ref("Node");
const modal = ref();
const openModal = () => {
  modal.value.open();
};
const addFunction = () => {
  addNode({ name: name.value || "Node" });
  name.value = "Node";
};

defineExpose({
  openModal,
});
</script>

<template>
  <BaseModal ref="modal" title="Node" :add-function="addFunction">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Name</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded">
            <input
              class="input"
              type="text"
              placeholder="Node"
              v-model="name"
            />
          </p>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

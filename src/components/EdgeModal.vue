<script setup lang="ts">
import { ref } from "vue";
import { useGraphStore } from "@/stores";
import BaseModal from "./BaseModal.vue";

const { addEdge } = useGraphStore();
const name = ref("");
const modal = ref();
const openModal = () => {
  modal.value.open();
};
const addFunction = () => {
  addEdge(name.value);
  name.value = "";
};

defineExpose({
  openModal,
});
</script>

<template>
  <BaseModal ref="modal" title="Edge" :add-function="addFunction">
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
              placeholder="Edge"
              v-model="name"
            />
          </p>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

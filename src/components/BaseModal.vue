<script setup lang="ts">
import { ref } from "vue";

const prop = defineProps({
  title: {
    type: String,
    default: "Title",
  },
  addFunction: {
    type: Function,
    default: null,
  },
});

const active = ref(false);
const open = () => (active.value = true);
const close = () => (active.value = false);
const add = () => {
  prop.addFunction();
  close();
};

defineExpose({
  open,
});
</script>

<template>
  <div class="modal" :class="{ 'is-active': active }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-info" @click="add">Add</button>
        <button class="button" @click="close">Cancel</button>
      </footer>
    </div>
  </div>
</template>

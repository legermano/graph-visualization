<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNotificationStore } from "@/stores";

const store = useNotificationStore();
const { clearSearch } = store;
const { searchNotifications } = storeToRefs(store);
</script>

<template>
  <div class="notifications">
    <article
      class="message is-info"
      v-for="notification in searchNotifications"
      :key="notification.id"
    >
      <div class="message-header">
        <p>{{ notification.title }}</p>
        <button
          class="delete"
          aria-label="delete"
          @click="clearSearch(notification.id)"
        ></button>
      </div>
      <div class="message-body">{{ notification.text }}</div>
    </article>
  </div>
</template>

<style scoped>
.notifications {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 1;
}
</style>

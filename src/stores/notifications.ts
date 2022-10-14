import { ref } from "vue";
import { defineStore } from "pinia";
import type { INotification } from "@/interface";

export const useNotificationStore = defineStore("notification", () => {
  const searchNotifications = ref([] as INotification[]);

  function notificateSearch(title: string, text: string): void {
    const id = new Date().getTime();

    searchNotifications.value.push({
      id,
      title,
      text,
    });

    setTimeout(() => clearSearch(id), 10000);
  }

  function clearSearch(id: number): void {
    searchNotifications.value = searchNotifications.value.filter(
      (notification) => notification.id != id
    );
  }

  return {
    searchNotifications,
    notificateSearch,
    clearSearch,
  };
});

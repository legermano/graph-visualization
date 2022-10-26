import { ref } from "vue";
import { defineStore } from "pinia";
import type { INotification } from "@/interface";

export const useNotificationStore = defineStore("notification", () => {
  const notifications = ref([] as INotification[]);

  function notificate(title: string, text: string): void {
    const id = new Date().getTime();

    notifications.value.push({
      id,
      title,
      text,
    });

    setTimeout(() => clear(id), 10000);
  }

  function clear(id: number): void {
    notifications.value = notifications.value.filter(
      (notification) => notification.id != id
    );
  }

  return {
    notifications,
    notificate,
    clear,
  };
});

import { createRouter, createWebHistory } from "vue-router";
import GraphVue from "@/views/GraphView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "graph",
      component: GraphVue,
    },
  ],
});

export default router;

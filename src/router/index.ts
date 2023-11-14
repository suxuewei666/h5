import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/views/Index.vue")
    },
    {
      path: "/candidateVolunteer",
      name: "candidateVolunteer",
      component: () => import("@/views/wish/candidateVolunteer/Index.vue")
    }
  ]
});
export default router;

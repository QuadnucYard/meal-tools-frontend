import { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "index",
    component: () => import("@/layouts/MainLayout.vue"),
    meta: { keepalive: false },
    children: [
      {
        path: "weigh",
        name: "weigh",
        component: () => import("@/views/Weigh.vue"),
        meta: { keepalive: false },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    name: "404",
    component: () => import("@/views/Error404.vue"),
  },
];

export default routes;

import { type RouteRecordRaw, type Router, createRouter, createWebHistory } from "vue-router";

import routes from "./routes";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

// Router guard
router.beforeEach(async (to, from, next) => {
  console.log("beforeEach", from, to, to.meta);
  next();
});

export default router;

export const createDefaultRouter: (routes: Array<RouteRecordRaw>) => Router = (routes) =>
  createRouter({
    history: createWebHistory(),
    routes,
  });

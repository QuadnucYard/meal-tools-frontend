import { RouteRecordRaw, Router, createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("beforeEach", from, to, to.meta);
  if (to.path === "/") {
    next("weigh");
    return;
  }
  next();
});

export default router;

export const createDefaultRouter: (routes: Array<RouteRecordRaw>) => Router = (routes) =>
  createRouter({
    history: createWebHistory(),
    routes,
  });

export function redirectLogin() {
  router.push({ name: "login", query: { redirect: router.currentRoute.value.fullPath } });
}

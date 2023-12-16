export function redirectLogin() {
  const router = useRouter();
  router.push({ name: "login", query: { redirect: router.currentRoute.value.fullPath } });
}

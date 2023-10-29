import api from "./request";

export interface AccessToken {
  access_token: string;
  token_type: string;
}

export async function register(card_id: string, stu_id: string, name: string, password: string) {
  return (await api.postForm("/auth/register", { card_id, stu_id, name, password })).data;
}

export async function login(username: string, password: string) {
  return (await api.postForm<AccessToken>("/auth/login", { username, password })).data;
}

export async function logout() {
  return (await api.post("/auth/logout")).data;
}

export async function auth(admin?: boolean, perm?: string) {
  return (await api.post("/auth", { admin, perm })).data;
}

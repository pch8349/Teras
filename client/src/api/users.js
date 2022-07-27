import { apiInstance } from "./index";

const api = apiInstance();

export async function doLogin(user, success, fail) {
  await api.post(`/auth/login`, JSON.stringify(user)).then(success).catch(fail);
}

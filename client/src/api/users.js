import { apiInstance } from "./index";
import axios from "axios";

const api = apiInstance();

export async function doLogin(user, success, fail) {
  await api.post(`/auth/login`, JSON.stringify(user)).then(success).catch(fail);
}

export async function signUp(user, success, fail) {
  await api.post("/users", JSON.stringify(user)).then(success).catch(fail);
}

export async function userCheck(userId, success, fail){
  return api.get(`/users/idcheck?id=${userId}`).then(success).catch(fail);
}

export const getSchool = async (params, success, fail) => {
  return await axios
    .get("/school?schoolName=", { params })
    .then(success)
    .catch(fail);
};

export async function classCreate(user, success, fail) {
  await api.post("/school", JSON.stringify(user)).then(success).catch(fail);
}

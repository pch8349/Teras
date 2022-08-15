import { apiInstance, authApiInstance } from "./index";
import axios from "axios";

const api = apiInstance();
const authApi = authApiInstance();

export const doLogin = async (user, success, fail) => {
  await api.post(`/auth/login`, user).then(success).catch(fail);
};

export async function signUp(user, success, fail) {
  await api.post("/users", JSON.stringify(user)).then(success).catch(fail);
}

export async function userCheck(userId, success, fail) {
  return api.get(`/users/idcheck?id=${userId}`).then(success).catch(fail);
}

export async function getUser(success, fail) {
<<<<<<< HEAD
  console.log("겟유저 내부", sessionStorage.getItem("accessToken"));
  await autApi
    .get("/users", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(success)
    .catch(fail);
=======
  await authApi.get("/users").then(success).catch(fail);
}

export async function getTimetable(success, fail) {
  await authApi.get("/timetable").then(success).catch(fail);
>>>>>>> 3777c5c ([FE] openvidu host update)
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

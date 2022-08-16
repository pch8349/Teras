import { apiInstance, authApiInstance } from "./index";

const api = apiInstance();
const tokenApi = authApiInstance();

export const registerAssign = async (content, success, fail) => {
  return await tokenApi.post("/assign", content).then(success).catch(fail);
};

export const getAssignList = async (subjectCode, pageNo, success, fail) => {
  return await tokenApi
    .get(`/assign/${subjectCode}/${pageNo}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(success)
    .catch(fail);
};

export const getAssignDetail = async (assignNo, success, fail) => {
  return await tokenApi
    .get(`/assign/detail/${assignNo}`)
    .then(success)
    .catch(fail);
};

export const submitAssign = async (content, success, fail) => {
  return await tokenApi.post("/assign/comment", content).then(success).catch(fail);
};

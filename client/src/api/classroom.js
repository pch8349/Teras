import { apiInstance, authApiInstance } from "./index";

const api = apiInstance();
const authApi = authApiInstance();

export async function openSession(session, success, fail) {
  await api
    .post(`/api/openvidu`, JSON.stringify(session), {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(success)
    .catch(fail);
}

export async function getSession(sessionId, success, fail) {
  await api.get(`/api/openvidu/${sessionId}`).then(success).catch(fail);
}

export async function deleteSession(sessionId, success, fail) {
  await api
    .delete(`/api/openvidu/del/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(success)
    .catch(fail);
}

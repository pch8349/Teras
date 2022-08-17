import { apiInstance, authApiInstance, openviduApiInstance } from "./index";

const api = apiInstance();
const authApi = authApiInstance();
const openviduApi = openviduApiInstance();

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
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE",
      },
    })
    .then(success)
    .catch(fail);
}

export async function openSessionApi(data, success, fail) {
  await openviduApi
    .post("/openvidu/api/sessions", data)
    .then(success)
    .catch(fail);
}

export async function getTokenApi(sessionId, data, success, fail) {
  await openviduApi
    .post(`/openvidu/api/sessions/${sessionId}/connection`, data)
    .then(success)
    .catch(fail);
}

export async function deleteSessionApi(sessionId, success, fail) {
  await openviduApi
    .delete(`/openvidu/api/sessions/${sessionId}`)
    .then(success)
    .catch(fail);
}

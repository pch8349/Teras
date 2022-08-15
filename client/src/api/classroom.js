import { apiInstance, authApiInstance } from "./index";

const api = apiInstance();
const authApi = authApiInstance();

export async function openSession(session, success, fail) {
  await api
    .post(`/api/openvidu`, JSON.stringify(session))
    .then(success)
    .catch(fail);
}

export async function getSession(sessionId, success, fail) {
  await api.get(`/api/openvidu/${sessionId}`).then(success).catch(fail);
}

import { apiInstance, authApiInstance, fileApi } from "./index";

const api = apiInstance();
const tokenApi = authApiInstance();

export const registerNotice = async (content, success, fail) => {
  return await tokenApi.post("/notice", content).then(success).catch(fail);
};

export const modifyNotice = async (content, success, fail) => {
  return await fileApi.put("/notice", content).then(success).catch(fail);
};

export const getNoticeList = async (pageNo, success, fail) => {
  return await tokenApi
    .get(`/notice/page/${pageNo}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(success)
    .catch(fail);
};

export const deleteNotice = async (noticeNo, success, fail) => {
  return await api.put(`/notice/delete/${noticeNo}`).then(success).catch(fail);
};

export const getNoticeDetail = async (noticeNo, success, fail) => {
  return await api.get(`/notice/${noticeNo}`).then(success).catch(fail);
};

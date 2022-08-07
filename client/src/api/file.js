import { apiInstance, fileApi } from "./index";

const api = apiInstance();

export const registerFile = async(content, success, fail) => {
    return await fileApi.post("/file/upload", content).then(success).catch(fail);
  };
  
export const getDownloadFile = async(uuid, success, fail) => {
  return await fileApi.get(`file/download?uuid=${uuid}`).then(success).catch(fail);
}; 
  
export const postDownloadFile = async(content, success, fail) => {
  return await api.post("/file/download", content).then(success).catch(fail);
};

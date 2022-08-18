import { apiInstance, fileApi } from "./index";

const api = apiInstance();

export const uploadFile = async(content, success, fail) => {
    return await fileApi.post("/file/upload", content).then(success).catch(fail);
  };
  
export const getDownloadFile = async(uuid, success, fail) => {
  return await api.get(`file/download?uuid=${uuid}`,{
    responseType:'blob'
  }).then(success).catch(fail);
}; 

export const getFileName = async(uuid, success, fail) => {
  return await fileApi.get(`file?uuid=${uuid}`).then(success).catch(fail);
}; 
  
export const postDownloadFile = async(uuid, success, fail) => {
  return await api.post("/file/download", uuid).then(success).catch(fail);
};

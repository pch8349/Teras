import { authApiInstance } from "./index";

const tokenApi = authApiInstance();

export const getMyClass = async (success, fail) => {
    return await tokenApi.get("/users/classMates").then(success).catch(fail);
  };
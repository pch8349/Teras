import { apiInstance } from "./index";

const tokenApi = apiInstance();

export const getMyClass = async (success, fail) => {
  return await tokenApi
    .get("/users/classMates", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    })
    .then(success)
    .catch(fail);
};

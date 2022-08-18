import axios from "axios";

const OPENVIDU_SERVER_SECRET = "MY_SECRET";

// axios 객체 생성
export function apiInstance() {
  const instance = axios.create({
    baseURL: "https://i7a706.p.ssafy.io:8080/",
    headers: {
      "Content-type": "application/json",
    },
  });

  return instance;
}

// axios 객체 생성
// export function authApiInstance() {
//   const instance = axios.create({
//     baseURL: "http://i7a706.p.ssafy.io:8080/",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//     },
//   });

//   return instance;
// }

// axios 헤더 포함
export function authApiInstance() {
  console.log("apiinstance");
  const authApiInstance = axios.create({
    baseURL: "https://i7a706.p.ssafy.io:8080/",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  return authApiInstance;
}

// export const setAuthApiHeaders = () => {
//   console.log("axios 인터셉터 호출");
//   authApiInstance.interceptors.response.use(
//     async function (config) {
//       console.log("axios 인터셉터 발동");
//       config.headers.Authorization = `Bearer ${
//         sessionStorage.getItem("access-token") ||
//         localStorage.getItem("access-token")
//       }`;
//       return config;
//     },
//     function (error) {
//       console.log("인터셉터 에러");
//       return Promise.reject(error);
//     }
//   );
// };

export const fileApi = axios.create({
  baseURL: "https://i7a706.p.ssafy.io:8080/",
  headers: {
    "Content-Type": `multipart/form-data`,
  },
});

export function openviduApiInstance() {
  const instance = axios.create({
    baseURL: "https://i7a706.p.ssafy.io:8443/",
    headers: {
      Authorization: "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,DELETE",
    },
  });

  return instance;
}

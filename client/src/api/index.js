import axios from "axios";

// axios 객체 생성
export function apiInstance() {
  const instance = axios.create({
    baseURL: "http://i7a706.p.ssafy.io:8080/",
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

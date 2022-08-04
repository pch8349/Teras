import axios from "axios";

// axios 사용자 정의 구성을 사용하는 axios 인스턴스 생성
export function apiInstance() {
  const instance = axios.create({
    baseURL: "http://i7a706.p.ssafy.io:8080/",
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}
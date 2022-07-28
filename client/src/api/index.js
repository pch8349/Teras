import axios from "axios";

// axios 객체 생성
export function apiInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
      "Content-type": "application/json",
    },
  });
  return instance;
}

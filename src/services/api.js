
import axios from "axios";
import { API_URL } from "../utils/constants";

const API = axios.create({
  baseURL: API_URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    alert(err.response?.data?.msg || "Error");
    return Promise.reject(err);
  }
);

export default API;

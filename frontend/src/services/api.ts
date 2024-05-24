import axios from "axios";
import { baseApiUrl } from "../utils/constants";

const api = axios.create({
  baseURL: baseApiUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

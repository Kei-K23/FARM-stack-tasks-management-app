import axios from "axios";
import Cookie from "js-cookie";
import constant from "./constant";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_APP_API_URL || "http://localhost:8000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = Cookie.get(constant.ACCESS_TOKEN_KEY);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default api;

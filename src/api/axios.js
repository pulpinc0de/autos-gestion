import axios from "axios";


const api = axios.create({
  baseURL:"https://api-autos-wrnb.onrender.com" || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_user");
    }
    return Promise.reject(error);
  }
);

export default api;


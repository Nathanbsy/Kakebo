import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// criando uma instancia do axios para configurar a baseURL e os headers comuns
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// adicionando o token de autenticacao em cada requisicao
api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }    
  return config;
});

// erros de autenticacao global
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // caso o token de acesso tenha expirado
    if (error.response?.status === 401 && !error.config._retry) {

      originalRequest._retry = true;
    try {
      const refreshToken = Cookies.get("refresh_token");
      if (refreshToken) {
        // caso o token de refresh seja valido, tenta obter um novo token de acesso e refazer a requisicao original
        return api.get("/auth/refresh").then((res) => {
          const { token } = res.data.data;
          
          error.config.headers.Authorization = `Bearer ${token}`
          
          // refaz a requisicao original com o novo token de acesso
          return api.request(error.config);
        });
      }

    } catch (err) {
      
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      window.location.href = "/login";

      return Promise.reject(err);
    }
    return Promise.reject(error);
  }
});

export default api;

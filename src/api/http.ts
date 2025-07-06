import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig
} from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5631/api";

function createClient(baseURL: string): AxiosInstance {
  const client = axios.create({ baseURL, timeout: 10_000 });

  client.interceptors.request.use((cfg: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // when headers is AxiosHeaders → call .set
      if (typeof cfg.headers?.set === "function") {
        cfg.headers.set("Authorization", `Bearer ${token}`);
      } else {
        // fall back to plain object shape
        cfg.headers = {
          ...(cfg.headers || {}),
          Authorization: `Bearer ${token}`
        } as any; ;
      }
    }
    return cfg;
  });

  return client;
}

export const http       = createClient(API_BASE_URL);             // /api
export const httpReact  = createClient(`${API_BASE_URL}/react`);  // /api/react

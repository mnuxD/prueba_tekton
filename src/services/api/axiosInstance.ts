import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { getSession } from "next-auth/react";
import { ApiError } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const session = await getSession();
        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }
      } catch (error) {
        console.warn("Error getting session:", error);
      }
      return config;
    },
    Promise.reject
  );

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const apiError: ApiError = {
        message: "Error en la petición",
        status: error.response?.status || 500,
      };

      if (error.response) {
        apiError.message =
          (error.response.data as any)?.message || error.message;
        apiError.status = error.response.status;

        if (error.response.status === 401) {
          if (
            typeof window !== "undefined" &&
            !window.location.pathname.includes("/login")
          ) {
            window.location.href = "/login";
          }
        }
      } else if (error.request) {
        apiError.message = "No se pudo conectar con el servidor";
      } else {
        apiError.message = error.message;
      }

      return Promise.reject(apiError);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();
export default axiosInstance;

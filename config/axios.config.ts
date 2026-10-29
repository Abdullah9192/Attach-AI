import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error(
    "[axios.config] Missing required environment variable NEXT_PUBLIC_API_URL. Please set it in .env.local or your deployment environment."
  );
}

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically (client-side only)
axiosInstance.interceptors.request.use((config) => {
  try {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && config && config.headers) config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // Ignore storage errors (e.g. blocked storage)
  }
  return config;
});

export default axiosInstance;

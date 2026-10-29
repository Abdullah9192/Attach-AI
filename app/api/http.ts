import { axiosInstance } from "@/config/axios.config";

function getAxios() {
  if (!axiosInstance || typeof axiosInstance.post !== "function") {
    // Provide a clear, actionable error for debugging interop/import issues.
    throw new Error(
      "[http] axiosInstance is not initialized or is not an axios instance. Check `config/axios.config.ts` exports and that `NEXT_PUBLIC_API_URL` is configured correctly."
    );
  }
  return axiosInstance;
}

export const GET = async <T>(url: string, params?: object) => {
  const client = getAxios();
  const res = await client.get<T>(url, { params });
  return res.data;
};

export const POST = async <T>(url: string, data?: object) => {
  const client = getAxios();
  const res = await client.post<T>(url, data);
  return res.data;
};

export const PUT = async <T>(url: string, data?: object) => {
  const client = getAxios();
  const res = await client.put<T>(url, data);
  return res.data;
};

export const DELETE_REQ = async <T>(url: string) => {
  const client = getAxios();
  const res = await client.delete<T>(url);
  return res.data;
};
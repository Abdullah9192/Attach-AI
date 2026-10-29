import { POST } from "../api/http";
import { API } from "../api/endpoints";

export default {
  login: async (payload: { email: string; password: string }) => {
    return POST(API.AUTH.LOGIN, payload);
  },
};

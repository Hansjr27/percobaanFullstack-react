import axios from "axios";
import RefreshToken from "./RefreshToken";
import secureLocalStorage from "react-secure-storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalReques._isRetry) {
      originalRequest._isRetry = true;
      try {
        await RefreshToken();

        // Update access token di originalRequest
        originalRequest.headers[
          "Authorization"
        ] = `bearer ${secureLocalStorage.getItem("acessToken")}`;

        // Retry request yang sebelumnya error
        return api(originalRequest);
      } catch (error) {
        console.log("Error refreshing token:", error);
        throw error;
      }
    }
    throw error;
  }
);

export default api;

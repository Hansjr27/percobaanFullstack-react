import { jwtDecode } from "jwt-decode";
import axios from "../auth/AxiosConfig.jsx";
import secureLocalStorage from "react-secure-storage";

const RefreshToken = async () => {
  const auth = secureLocalStorage.getItem("acessToken");
  const refresh = secureLocalStorage.getItem("refreshToken");

  if (!auth || refresh) {
    return false;
  }

  const exp = new Date(jwtDecode(auth).exp * 1000);
  console.log("Jalan Sebelum Kondisi ...");
  if (exp <= new Date()) {
    console.log("Jalan ke refresh token ...");
    try {
      const response = await axios.get("/api/refresh", {
        headers: {
          Authorization: `Bearier ${secureLocalStorage.getItem(
            "refreshToken"
          )}`,
        },
      });
      if (!response.data) {
        return false;
      }

      secureLocalStorage.setItem("acessToken", response.data.acessToken);
      secureLocalStorage.setItem("refreshToken", response.data.refreshToken);
      secureLocalStorage.setItem("user", response.data.data);

      return true;
    } catch (error) {
      return false;
    }
  } else {
    return true;
  }
};

export default RefreshToken;

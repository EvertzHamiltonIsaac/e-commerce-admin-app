import axios from "axios";
import { URL } from "../../utils/BaseURL";

const signIn = async (userData) => {
  try {
    const res = await axios.post(`${URL}auth/login/admin/`, userData);
    if (res.data) {
      localStorage.setItem("message", res.data[`message`]);
      localStorage.setItem("user", JSON.stringify(res.data[`data`]));
      localStorage.setItem("sessionToken", res.data[`sessionToken`]);
    }
    return res.data;
  } catch (error) {
    throw error.response.data.fields.message
  }
};

const authService = {
  signIn,
};

export default authService;

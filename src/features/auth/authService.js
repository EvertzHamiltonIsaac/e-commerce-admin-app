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
    throw error.response.data.fields.message;
  }
};

const forgotPassword = async (email) => {
  try {
    const res = await axios.post(`${URL}user/forgotPassword`, email);
    return res.data;
  } catch (error) {
    throw error.response.data.fields.message;
  }
};

const resetPassword = async ({ token, password }) => {
  try {
    const res = await axios.put(`${URL}user/resetPassword/${token}`, password);
    return res.data;
  } catch (error) {
    throw error.response.data.fields.message;
  }
};



const authService = {
  signIn,
  resetPassword,
  forgotPassword
};

export default authService;

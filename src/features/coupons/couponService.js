import axios from "axios";
import { URL } from "../../utils/BaseURL";

const getCoupons = async () => {
  try {
    const res = await axios.get(`${URL}coupon/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const createCoupons = async (data) => {
  try {
    const res = await axios.post(`${URL}coupon/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const couponService = {
  getCoupons,
  createCoupons,
};

export default couponService;

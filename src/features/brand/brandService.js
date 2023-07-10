import axios from "axios";
import { URL } from "../../utils/BaseURL";

const getBrands = async () => {
  try {
    const res = await axios.get(`${URL}brand/`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const createBrands = async (data) => {
  try {
  
    const res = await axios.post(`${URL}brand/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;

  } catch (error) {

    throw error;
  }
};

const brandService = {
  getBrands,
  createBrands,
};

export default brandService;

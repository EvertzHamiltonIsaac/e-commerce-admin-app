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

const updateBrand = async ({data, id}) => {
  try {
    const res = await axios.put(`${URL}brand/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;

  } catch (error) {

    throw error;
    
  }
};

const deleteBrand = async (id) => {
  console.log(id);
  try {
    const res = await axios.delete(`${URL}brand/delete/${id}`, {
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
  updateBrand,
  deleteBrand
};

export default brandService;

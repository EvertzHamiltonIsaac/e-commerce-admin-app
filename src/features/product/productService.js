import axios from "axios";
import {URL} from "../../utils/BaseURL"

const getProducts = async () => {
    const res = await axios.get(`${URL}product/`);

    return res.data
};

const createProducts = async (data) => {
    const res = await axios.post(`${URL}product/create`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        },
      });
    return res.data
};

const updateProducts = async ({ data, id }) => {
  try {
    const res = await axios.put(`${URL}product/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteProducts = async (id) => {
  try {
    const res = await axios.delete(`${URL}product/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const productService = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
};

export default productService
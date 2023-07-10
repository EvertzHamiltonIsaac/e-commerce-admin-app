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

const productService = {
    getProducts,
    createProducts
};

export default productService
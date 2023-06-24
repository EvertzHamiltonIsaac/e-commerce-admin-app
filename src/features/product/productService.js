import axios from "axios";
import {URL} from "../../utils/BaseURL"

const getProducts = async () => {
    const res = await axios.get(`${URL}product/`);
    return res.data
};

const productService = {
    getProducts,
};

export default productService
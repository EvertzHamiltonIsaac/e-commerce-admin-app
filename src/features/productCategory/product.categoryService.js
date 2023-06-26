import axios from "axios";
import {URL} from "../../utils/BaseURL";

const getProductCategories = async () => {
    try {
        const res = await axios.get(`${URL}prodCategory/getAllCategories/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("sessionToken")}`
            }
        });
        return res.data
    } catch (error) {
        console.log(error.message);
        return
    }
};

const productCategoryService = {
    getProductCategories,
};

export default productCategoryService
import axios from "axios";
import {URL} from "../../utils/BaseURL";

const getBlogCategories = async () => {
    try {
        const res = await axios.get(`${URL}blogCategory/getAllCategories`, {
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

const BlogCategoryService = {
    getBlogCategories,
};

export default BlogCategoryService
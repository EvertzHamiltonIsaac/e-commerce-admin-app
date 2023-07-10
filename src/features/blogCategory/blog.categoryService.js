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
        throw error
    }
};

const createBlogCategories = async (data) => {
    try {
      
      const res = await axios.post(`${URL}blogCategory/createCategory`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        },
      });
  
      return res.data;
  
    } catch (error) {
  
      throw error;
    }
  }

const BlogCategoryService = {
    getBlogCategories,
    createBlogCategories
};

export default BlogCategoryService
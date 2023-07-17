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
        throw error
    }
};

const createProductCategories = async (data) => {
    try {
      
      const res = await axios.post(`${URL}prodCategory/createCategory`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        },
      });
  
      return res.data;
  
    } catch (error) {
  
      throw error;
    }
  };

  const updateProductCategory = async ({data, id}) => {
    try {
      const res = await axios.put(`${URL}prodCategory/updateCategory/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        },
      });
  
      return res.data;
  
    } catch (error) {
  
      throw error;
      
    }
  };
  
  const deleteProductCategory = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(`${URL}prodCategory/deleteCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        },
      });
  
      return res.data;
  
    } catch (error) {
  
      throw error;
    }
  };

const productCategoryService = {
    getProductCategories,
    createProductCategories,
    updateProductCategory,
    deleteProductCategory
};

export default productCategoryService
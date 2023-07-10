import axios from "axios";
import {URL} from "../../utils/BaseURL"

const getColors = async () => {
    try {
        const res = await axios.get(`${URL}color/`);
        return res.data;
      } catch (error) {
        throw error;
      }
};

const createColors = async (data) => {
    try {
      
      const res = await axios.post(`${URL}color/create`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        },
      });
  
      return res.data;
  
    } catch (error) {
  
      throw error;
    }
  };

const colorService = {
    getColors,
    createColors
};

export default colorService
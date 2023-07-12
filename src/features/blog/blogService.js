import axios from "axios";
import {URL} from "../../utils/BaseURL";

const getBlogs = async () => {
    try {
        const res = await axios.get(`${URL}blog/`);
        return res.data
    } catch (error) {
        console.log(error.message);
        return
    }
};

const createBlogs = async (data) => {
    const res = await axios.post(`${URL}blog/create`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        },
      });
    return res.data
};

const blogsService = {
    getBlogs,
    createBlogs
};

export default blogsService
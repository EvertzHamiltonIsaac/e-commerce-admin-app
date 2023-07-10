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

const blogsService = {
    getBlogs,
};

export default blogsService
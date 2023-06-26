import axios from "axios";
import {URL} from "../../utils/BaseURL";

const getBrands = async () => {
    try {
        const res = await axios.get(`${URL}brand/`);
        return res.data
    } catch (error) {
        console.log(error.message);
        return
    }
};

const brandService = {
    getBrands,
};

export default brandService
import axios from "axios";
import {URL} from "../../utils/BaseURL"

const getBrands = async () => {
    const res = await axios.get(`${URL}brand/`);
    return res.data
};

const brandService = {
    getBrands,
};

export default brandService
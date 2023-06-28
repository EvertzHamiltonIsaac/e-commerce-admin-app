import axios from "axios";
import {URL} from "../../utils/BaseURL"

const getColors = async () => {
    const res = await axios.get(`${URL}color/`);
    // console.log(res);
    return res.data
};

const colorService = {
    getColors,
};

export default colorService
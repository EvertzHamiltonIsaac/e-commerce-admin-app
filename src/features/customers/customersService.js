import axios from "axios";
import {URL} from "../../utils/BaseURL"

const getCustomers = async () => {
    const res = await axios.get(`${URL}user/`);
    // console.log(res);
    return res.data
};

const customersService = {
    getCustomers,
};

export default customersService
import axios from "axios";
import {URL} from "../../utils/BaseURL"

const getOrders = async () => {
    const res = await axios.get(`${URL}user/cart/get-all-orders`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionToken")}`
        }
    });
    return res.data
};

const orderService = {
    getOrders,
};

export default orderService
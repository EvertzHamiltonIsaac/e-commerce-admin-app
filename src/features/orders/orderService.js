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

const getMonthlyOrders = async () => {
    const res = await axios.get(`${URL}order/get-month-wise-order-income`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionToken")}`
        }
    });
    return res.data
};

const getYearlyOrdersStats = async () => {
    const res = await axios.get(`${URL}order/get-yearly-total-orders`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionToken")}`
        }
    });
    return res.data
};

const getAllOrders = async () => {
    const res = await axios.get(`${URL}order/get-all-orders`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionToken")}`
        }
    });
    return res.data
};


const orderService = {
    getOrders,
    getMonthlyOrders,
    getYearlyOrdersStats,
    getAllOrders
};

export default orderService
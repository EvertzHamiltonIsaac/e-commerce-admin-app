import axios from "axios";
import {URL} from "../../utils/BaseURL"

const getEnquiries = async () => {
    const res = await axios.get(`${URL}enquiry/`);
    return res.data
};

const enquiryService = {
    getEnquiries,
};

export default enquiryService
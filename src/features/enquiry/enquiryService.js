import axios from "axios";
import { URL } from "../../utils/BaseURL";

const getEnquiries = async () => {
  const res = await axios.get(`${URL}enquiry/`);
  return res.data;
};

const updateEnquiry = async (data, id) => {
  try {
    const res = await axios.put(`${URL}enquiry/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteEnquiry = async (id) => {
  try {
    const res = await axios.delete(`${URL}enquiry/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const enquiryService = {
  getEnquiries,
  updateEnquiry,
  deleteEnquiry,
};

export default enquiryService;

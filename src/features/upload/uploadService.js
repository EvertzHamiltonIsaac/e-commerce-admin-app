import axios from "axios";
import { URL } from "../../utils/BaseURL";

const uploadImg = async (data) => {
  const res = await axios.post(`${URL}image/upload`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
    });
  return res.data;
};

const deleteImg = async (id) => {
  const res = await axios.delete(`${URL}image/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  return res.data;
};

const uploadService = {
  uploadImg,
  deleteImg
};

export default uploadService;

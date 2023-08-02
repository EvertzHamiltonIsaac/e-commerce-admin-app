import axios from "axios";
import { URL } from "../../utils/BaseURL";

const getColors = async () => {
  try {
    const res = await axios.get(`${URL}color/`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getColorById = async (id) => {
  try {
    const res = await axios.get(`${URL}color/:id`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const createColors = async (data) => {
  try {
    const res = await axios.post(`${URL}color/create`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateColor = async ({ data, id }) => {
  try {
    const res = await axios.put(`${URL}color/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteColor = async (id) => {
  try {
    const res = await axios.delete(`${URL}color/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const colorService = {
  getColors,
  getColorById,
  createColors,
  updateColor,
  deleteColor,
};

export default colorService;

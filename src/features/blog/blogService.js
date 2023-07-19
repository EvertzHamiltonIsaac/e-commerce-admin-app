import axios from "axios";
import { URL } from "../../utils/BaseURL";

const getBlogs = async () => {
  try {
    const res = await axios.get(`${URL}blog/`);
    return res.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

const createBlogs = async (data) => {
  const res = await axios.post(`${URL}blog/create`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
    },
  });
  return res.data;
};

const updateBlog = async ({ data, id }) => {
  try {
    const res = await axios.put(`${URL}blog/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteBlog = async (id) => {
  try {
    const res = await axios.delete(`${URL}blog/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const blogsService = {
  getBlogs,
  createBlogs,
  updateBlog,
  deleteBlog,
};

export default blogsService;

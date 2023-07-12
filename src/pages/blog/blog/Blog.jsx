import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faFileArrowUp,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "antd/es/modal/Modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/app/input/Input";
import Select from "../../../components/app/select/Select";
import TableComponent from "../../../components/app/table/Table";
import { getBlogs, createBlogs, resetBlogState } from "../../../features/blog/blogSlice";
import { getBlogCategories } from "../../../features/blogCategory/blog.categorySlice";
import { uploadImg } from "../../../features/upload/uploadSlice";
import { Button } from "antd";
// import 'react-quill/dist/quill.snow.css';
const BlogsColumns = [
  {
    title: "Title",
    dataIndex: "title",
    width: 150,
    fixed: "left",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Dislikes",
    dataIndex: "dislikes",
  },
  {
    title: "Likes",
    dataIndex: "likes",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 90,
    fixed: "right",
  },
];

const schemaForValidations = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Email is required"),
  brand: Yup.string().required("Email is required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is required"),
  quantity: Yup.string().required("Email is required"),
  price: Yup.string().required("Email is required"),
  images: Yup.string().required("Email is required"),
});

const Blog = () => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { isLoading, blogs, isSuccess, isError, BlogCreated } = useSelector(
    (state) => state.blogs
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: [],
    },
    onSubmit: (values) => {
      dispatch(createBlogs(values))
      formik.resetForm();
      handleCancelModal();
    },
    // validationSchema: schemaForValidations,
  });

  //? Images Selector
  const imgState = useSelector((state) => state.images.img.data);
  const imgArray = [];
  if (imgState instanceof Array) {
    imgState?.forEach((element) => {
      imgArray.push({
        public_id: element?.public_id,
        url: element?.url,
      });
    });
  }

  //? BlogCategory Selector
  const BlogCategoryState = useSelector(
    (state) => state.blogCategories.blogCategories.data
  );

  const blogsData = [];
  for (let i = 0; i < blogs.data?.length; i++) {
    blogsData.push({
      key: i + 1,
      title: blogs.data[i]?.title,
      description: blogs.data[i]?.description,
      category: blogs.data[i]?.category,
      dislikes: blogs.data[i]?.dislikes.length,
      likes: blogs.data[i]?.likes.length,
      actions: (
        <React.Fragment>
          <div
            className="fs-5 d-flex gap-2"
            style={{ cursor: "pointer", color: "var(--color-blue-main)" }}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="icons-hover-update"
            />
            <FontAwesomeIcon icon={faTrash} className="icons-hover-delete" />
          </div>
        </React.Fragment>
      ),
    });
  }

  const handleCancelModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    if (BlogCreated && isSuccess) {
      toast.success("Blog Added Succesfully!");
      dispatch(resetBlogState());
      dispatch(getBlogs());
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    formik.values.images = imgArray;
  }, [imgArray]);

  useEffect(() => {
    // dispatch(getBrands());
    dispatch(getBlogCategories());
  }, [isOpenModal]);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  return (
    <section className="blog-list">
      <article>
        <h3>Blogs</h3>
        <div>
          <div className="d-flex justify-content-end mb-2">
            <Button
              type="primary"
              size={"large"}
              icon={<FontAwesomeIcon icon={faPlus} />}
              className="add-btn"
              onClick={() => setIsOpenModal(true)}
            >
              Create New Blog
            </Button>
          </div>
          <TableComponent
            data={blogsData}
            columns={BlogsColumns}
            loading={isLoading}
          />
        </div>
      </article>
      {/* Esto es el Modal */}
      <Modal open={isOpenModal} onCancel={handleCancelModal} footer={null}>
        <article>
          <h3>Add Blog</h3>
          <div>
            <form
              className="d-flex flex-column gap-3"
              onSubmit={formik.handleSubmit}
            >
              <div style={{ width: "70%" }}>
                <span>Title</span>
                <Input
                  Id="title"
                  labelValue="Enter Product Title"
                  name="title"
                  onChange={formik.handleChange("title")}
                  value={formik.values.title}
                  onBlur={formik.handleBlur("title")}
                />
              </div>
              <div style={{ width: "50%" }}>
                <span>Select a Category</span>
                <Select
                  value={formik.values.category}
                  id="category"
                  name="category"
                  className="form-select"
                  options={BlogCategoryState}
                  placeholder="Choose a Category"
                  onChange={formik.handleChange("category")}
                />
              </div>
              <div>
                <span>Description</span>
                <ReactQuill
                  style={{ height: "100px" }}
                  theme="snow"
                  name="description"
                  id="description"
                  placeholder="Enter Product Description"
                  onChange={formik.handleChange("description")}
                  value={formik?.values?.description}
                />
              </div>
              <div className="dropzone_container">
                <Dropzone
                  onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section className="dropzone" {...getRootProps()}>
                      <div className="">
                        <FontAwesomeIcon
                          icon={faFileArrowUp}
                          style={{ height: "40px", padding: "15px" }}
                        />
                        <input {...getInputProps()} />
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </div>
              <div className="showImages d-flex flex-wrap gap-3">
                {imgArray.map((item, index) => (
                  <div className="position-relative" key={index}>
                    <button
                      type="button"
                      onClick={() => dispatch(deleteImg(item?.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={item?.url} alt="" width={100} height={100} />
                  </div>
                ))}
              </div>

              <div
                style={{ marginTop: "3.2em" }}
                className="d-flex justify-content-end gap-2"
              >
                <button
                  onClick={handleCancelModal}
                  type="button"
                  className="btn btn-secondary"
                  style={{ backgroundColor: "var(--color-gray-main)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "var(--color-blue-main)" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </article>
      </Modal>
    </section>
  );
};

export default Blog;

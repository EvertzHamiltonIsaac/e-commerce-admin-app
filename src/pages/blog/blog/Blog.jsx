import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faFileArrowUp,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Upload } from "antd";
import Modal from "antd/es/modal/Modal";
import DOMPurify from "dompurify";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as Yup from "yup";
import Input from "../../../components/app/input/Input";
import Select from "../../../components/app/select/Select";
import TableComponent from "../../../components/app/table/Table";
import {
  createBlogs,
  deleteBlogs,
  getBlogs,
  resetBlogState,
} from "../../../features/blog/blogSlice";
import { getBlogCategories } from "../../../features/blogCategory/blog.categorySlice";
import { uploadImg, deleteImg } from "../../../features/upload/uploadSlice";
import { BlogsTableColumns } from "../../../utils/TableColums";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import "./BlogStyles.css";
const { confirm } = Modal;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
  const navigate = useNavigate();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdateOpenModal, setIsUpdateOpenModal] = useState(false);
  const [blogId, setBlogId] = useState("");

  const {
    isLoading,
    blogs,
    isSuccess,
    isError,
    BlogCreated,
    BlogUpdated,
    BlogDeleted,
    message,
  } = useSelector((state) => state.blogs);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: [],
    },
    onSubmit: (values) => {
      if (isOpenModal) {
        dispatch(createBlogs(values));
        formik.resetForm();
        handleCancelModal();
      }
      if (isUpdateOpenModal) {
        dispatch(updateBrands({ data: values, id: blogId }));
        formik.resetForm();
        handleCancelModal();
      }
    },
    // validationSchema: schemaForValidations,
  });

  const showDeleteConfirm = (item) => {
    confirm({
      title: "Are you sure delete this brand?",
      content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteBlogs(item._id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  //? Images Selector
  const imgState = useSelector((state) => state.images.img.data);
  const imgArray = [];
  if (fileList instanceof Array) {
    fileList?.forEach((element) => {
      imgArray.push({
        public_id: element?.response?.data[0]?.public_id,
        url: element?.response?.data[0]?.url,
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
      title: (
        <div className="title_container">
          <div className="img_title_container rounded">
            <img
              className="w-100"
              src={`${blogs?.data[i]?.images[0]?.url}`}
              alt=""
            />
          </div>
          {blogs.data[i]?.title}
        </div>
      ),
      description: (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(blogs?.data[i]?.description),
          }}
        ></div>
      ),
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
              onClick={() => handleOnEditButtonClick(blogs.data[i])}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="icons-hover-delete"
              onClick={() => showDeleteConfirm(blogs.data[i])}
            />
          </div>
        </React.Fragment>
      ),
    });
  }

  const handleCancelModal = () => {
    setIsOpenModal(false);
    setIsUpdateOpenModal(false);
    setFileList([]);
    formik.values.title = "";
    formik.values.description = "";
    formik.values.category = "";
    formik.values.images = [];
  };

  const handleOnEditButtonClick = (item) => {
    console.log(item.images);
    setIsUpdateOpenModal(true);
    setBlogId(item._id);
    formik.values.title = item.title;
    formik.values.description = item.description;
    formik.values.category = item.category;
    formik.values.images = item.images;
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <FontAwesomeIcon icon={faPlus} />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  useEffect(() => {
    if (BlogCreated && isSuccess) {
      toast.success("Blog Added Succesfully!");
      dispatch(resetBlogState());
      dispatch(getBlogs());
    }
    if (BlogUpdated && isSuccess) {
      toast.success("Blog Added Succesfully!");
      dispatch(resetBlogState());
      dispatch(getBlogs());
    }
    if (BlogDeleted && isSuccess) {
      toast.success("Blog Added Succesfully!");
      dispatch(resetBlogState());
      dispatch(getBlogs());
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (
      (typeof message === "string" && isError) ||
      (typeof message === "string" && isError)
    ) {
      if (
        message.includes("token") ||
        message.includes("expired") ||
        message.includes("log again")
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${message}`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(resetBlogState());
            localStorage.clear();
            navigate("/auth/sign-in");
          }
        });
      }
    }
  }, [isError, message]);

  useEffect(() => {
    formik.values.images = imgArray;
  }, [imgArray]);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [isOpenModal]);

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  return (
    <section className="blog-list">
      <article>
        {/* Header */}
        <div className="mb-4">
          <h1>Blogs</h1>
          <h6 className="text-muted">{`On this page you can view all the blogs created in the project. In General there are a number of ${blogs?.data?.length} blogs.`}</h6>
        </div>

        {/* Create Button */}
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
            columns={BlogsTableColumns}
            loading={isLoading}
          />
        </div>
      </article>

      {/* This is the Create Modal */}
      <Modal open={isOpenModal} onCancel={handleCancelModal} footer={null}>
        <article>
          <h3 className="d-flex justify-content-center mb-3">Add Blog</h3>
          <div>
            <form
              className="d-flex flex-column gap-3"
              onSubmit={formik.handleSubmit}
            >
              <div style={{ width: "100%" }}>
                <span>Title</span>
                <Input
                  Id="title"
                  labelValue="Enter the blog title"
                  name="title"
                  onChange={formik.handleChange("title")}
                  value={formik.values.title}
                  onBlur={formik.handleBlur("title")}
                />
              </div>
              <div style={{ width: "100%" }}>
                <span>Select a Blog Category</span>
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
                {/* <Dropzone
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
                </Dropzone> */}
                <Upload
                  action="https://ginger-final-project.onrender.com/api/v1/image/upload"
                  headers={{
                    Authorization: `Bearer ${localStorage.getItem(
                      "sessionToken"
                    )}`,
                  }}
                  onRemove={(file) => dispatch(deleteImg(file?.response?.data[0]?.public_id))}
                  // onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </div>
              {/* <div className="showImages d-flex flex-wrap gap-3">
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
              </div> */}

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

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
      {/* <Modal
        open={isUpdateOpenModal}
        onCancel={handleCancelModal}
        footer={null}
      >
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
      </Modal> */}
    </section>
  );
};

export default Blog;

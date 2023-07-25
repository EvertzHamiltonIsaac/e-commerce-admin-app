import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image, Upload } from "antd";
import Modal from "antd/es/modal/Modal";
import DOMPurify from "dompurify";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  updateBlogs,
} from "../../../features/blog/blogSlice";
import { getBlogCategories } from "../../../features/blogCategory/blog.categorySlice";
import { deleteImg } from "../../../features/upload/uploadSlice";
import { BlogsTableColumns } from "../../../utils/TableColums";
import "./BlogStyles.css";
import { Input as AntdInput } from "antd";

const { confirm } = Modal;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const schemaForValidations = Yup.object().shape({
  title: Yup.string().required("Title of Blog is required."),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
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
  const [imagesOfBlog, setImagesOfBlog] = useState([]);
  const [searchText, setSearchText] = useState("");

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
        dispatch(
          updateBlogs({
            data: { ...values, images: [...imagesOfBlog, ...values.images] },
            id: blogId,
          })
        );
        formik.resetForm();
        handleCancelModal();
      }
    },
    // validationSchema: schemaForValidations,
  });

  const showDeleteConfirm = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlogs(item._id));
      }
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
              src={
                blogs?.data[i]?.images[0]?.url
                  ? `${blogs?.data[i]?.images[0]?.url}`
                  : "/no-photo.jpg"
              }
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

  const handleDeleteImages = (imageId) => {
    dispatch(deleteImg(imageId));
    const result = imagesOfBlog.filter((image) => image.public_id != imageId);
    setImagesOfBlog(result);
  };

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
    setIsUpdateOpenModal(true);
    setImagesOfBlog(item?.images);
    console.log(item?.images);
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
      toast.success("Blog Updated Succesfully!");
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
  }, [isOpenModal, isUpdateOpenModal]);

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
          <div className="d-flex mb-1" style={{justifyContent: 'space-between', alignItems: 'center'}}>
          <AntdInput.Search
            placeholder="Search here..."
            style={{ marginBottom: 8, width: "300px" }}
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
          />
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
            columns={BlogsTableColumns(searchText)}
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
                <span className="mb-5">Upload Images</span>
                <Upload
                  action="https://ginger-final-project.onrender.com/api/v1/image/upload"
                  headers={{
                    Authorization: `Bearer ${localStorage.getItem(
                      "sessionToken"
                    )}`,
                  }}
                  onRemove={(file) =>
                    dispatch(deleteImg(file?.response?.data[0]?.public_id))
                  }
                  // onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
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

      <Modal
        open={isUpdateOpenModal}
        onCancel={handleCancelModal}
        footer={null}
      >
        <article>
          <h3 className="d-flex justify-content-center mb-3">Update Blog</h3>
          <div>
            <form
              className="d-flex flex-column gap-3"
              onSubmit={formik.handleSubmit}
            >
              <div className="modal_title_category">
                <div style={{ width: "60%" }}>
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
                <div>
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

              <div className="images_blog_container">
                <span>Images of Blog</span>
                <div className="images_blog rounded">
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) =>
                        console.log(
                          `current index: ${current}, prev index: ${prev}`
                        ),
                    }}
                  >
                    {imagesOfBlog?.map((images, index) => (
                      <div
                        key={index}
                        className="rounded images_card"
                        style={{
                          width: "80px",
                          height: "80px",
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <div
                          className="button_delete_img_update rounded"
                          onClick={() => handleDeleteImages(images.public_id)}
                        >
                          <FontAwesomeIcon
                            style={{ padding: "5px 5px 1px 5px" }}
                            icon={faX}
                          />
                        </div>
                        <Image
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          src={images?.url}
                        />
                      </div>
                    ))}
                  </Image.PreviewGroup>
                </div>
              </div>

              <div className="upload_container">
                <span className="mb-5">Upload More Images</span>
                <Upload
                  action="https://ginger-final-project.onrender.com/api/v1/image/upload"
                  headers={{
                    Authorization: `Bearer ${localStorage.getItem(
                      "sessionToken"
                    )}`,
                  }}
                  onRemove={(file) =>
                    dispatch(deleteImg(file?.response?.data[0]?.public_id))
                  }
                  // onDrop={(acceptedFiles) => console.log(acceptedFiles)}
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
              </div>

              <div
                style={{ marginTop: "1.2em" }}
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

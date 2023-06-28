import { InboxOutlined } from "@ant-design/icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Upload, message } from "antd";
import Modal from "antd/es/modal/Modal";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/app/input/Input";
import Select from "../../../components/app/select/Select";
import TableComponent from "../../../components/app/table/Table";
import { getBlogs } from "../../../features/blog/blogSlice";
// import 'react-quill/dist/quill.snow.css';
const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

//! Options of Select HardCode.
const OptionSelect = [
  {
    title: "1",
  },
  {
    title: "2",
  },
  {
    title: "3",
  },
  {
    title: "4",
  },
  {
    title: "5",
  },
];
const BlogsColumns = [
  {
    title: "Title",
    dataIndex: "title",
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
  },
];

const Blog = () => {
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const blogState = useSelector((state) => state.blogs.blogs.data);

  const blogsData = [];
  for (let i = 0; i < blogState?.length; i++) {
    blogsData.push({
      key: i + 1,
      title: blogState[i]?.title,
      description: blogState[i]?.description,
      category: blogState[i]?.category,
      dislikes: blogState[i]?.dislikes.length,
      likes: blogState[i]?.likes.length,
      actions: (
        <React.Fragment>
          <div className="fs-5 d-flex gap-2" style={{cursor: 'pointer', color: 'var(--color-blue-main)'}}>
            <FontAwesomeIcon icon={faPenToSquare} className="icons-hover-update"/>
            <FontAwesomeIcon icon={faTrash} className="icons-hover-delete"/>
          </div>
        </React.Fragment>
      ),
    });
  }

  const handleOnChange = (e) => {
    console.log(e.target.value);
  };
  const handleCancelModal = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  return (
    <section className="blog-list">
      <article>
        <h3>Blogs</h3>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setIsOpenModal(true)}
        >
          Right
        </button>
        <div>
          <TableComponent data={blogsData} columns={BlogsColumns} />
        </div>
      </article>
      {/* Esto es el Modal */}
      <Modal open={isOpenModal} onCancel={handleCancelModal}>
        <article>
          <h3>Add Blog</h3>
          <div>
            <form>
              {/* Type color para la vista de agregar algun color */}
              <Input type="color" />

              {/**/}
              <Select
                className="form-select"
                options={OptionSelect}
                placeholder=""
                onChange={handleOnChange}
              />

              <ReactQuill theme="snow" />

              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger>
            </form>
          </div>
        </article>
      </Modal>
    </section>
  );
};

export default Blog;

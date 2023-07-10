import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/app/table/Table";
import {
  getProductCategories,
  resetProductState,
  createProductCategories,
} from "../../../features/productCategory/product.categorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogCategories,
  createBlogCategories,
  resetBlogState,
} from "../../../features/blogCategory/blog.categorySlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import Input from "../../../components/app/input/Input";
import { toast } from "react-toastify";

const CategoryColumns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 150,
  },
];
const schemaForProductValidations = Yup.object().shape({
  name: Yup.string().required("name is required"),
});

const schemaForBlogValidations = Yup.object().shape({
  name: Yup.string().required("name is required"),
});

const Category = () => {
  const [isBOpenModal, setIsBOpenModal] = useState(false);
  const [isPOpenModal, setIsPOpenModal] = useState(false);

  const ProductCategoryData = [];
  const BlogCategoryData = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Pformik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(createProductCategories({ title: values.name }));
      Pformik.resetForm();
      handleCancelPModal();
    },
    // validationSchema: schemaForValidations,
  });

  const Bformik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      // console.log(values);
      dispatch(createBlogCategories({ title: values.name }));
      Bformik.resetForm();
      handleCancelBModal();
    },
    // validationSchema: schemaForValidations,
  });

  const PCategory = useSelector((state) => state.productCategories);
  const BCategory = useSelector((state) => state.blogCategories);

  const productCategoryState = useSelector(
    (state) => state.productCategories.productCategories.data
  );
  const blogCategoryState = useSelector(
    (state) => state.blogCategories.blogCategories.data
  );

  for (let i = 0; i < productCategoryState?.length; i++) {
    ProductCategoryData.push({
      key: i + 1,
      name: productCategoryState[i]?.title,
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

  for (let i = 0; i < blogCategoryState?.length; i++) {
    BlogCategoryData.push({
      key: i + 1,
      name: blogCategoryState[i]?.title,
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

  //? Functions
  const handleCancelPModal = () => {
    setIsPOpenModal(false);
  };
  const handleCancelBModal = () => {
    setIsBOpenModal(false);
  };

  //! UseEffect Needing Refactoring.
  useEffect(() => {
    if (
      (typeof PCategory.message === "string" && PCategory.isError) ||
      (typeof BCategory.message === "string" && BCategory.isError)
    ) {
      if (
        PCategory.message.includes("token") ||
        PCategory.message.includes("expired") ||
        PCategory.message.includes("log again")
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${PCategory.message}`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(resetBlogState());
            dispatch(resetProductState());
            localStorage.clear();
            navigate("/auth/sign-in");
          }
        });
      }
    }
  });

  useEffect(() => {
    if (BCategory.BlogCategoryCreated && BCategory.isSuccess) {
      toast.success("Blog Category Succesfully!");
      dispatch(resetBlogState());
      dispatch(getBlogCategories());
    }
    if (BCategory.isError) {
      toast.error("Something Went Wrong!");
      dispatch(resetBlogState());
    }
  }, [BCategory.isSuccess, BCategory.isError, BCategory.isLoading]);

  useEffect(() => {
    if (PCategory.ProductCategoryCreated && PCategory.isSuccess) {
      toast.success("Product Category Succesfully!");
      dispatch(resetProductState());
      dispatch(getProductCategories());
    }
    if (PCategory.isError) {
      toast.error("Something Went Wrong!");
      dispatch(resetProductState());
    }
  }, [PCategory.isSuccess, PCategory.isError, PCategory.isLoading]);

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  return (
    <section className="category-list">
      <h2 className="mt-4 mb-5">Categories</h2>
        <h3>Product</h3>
        <article>
          <div className="d-flex justify-content-end mb-2">
            <Button
              type="primary"
              size={"large"}
              icon={<FontAwesomeIcon icon={faPlus} />}
              className="add-btn"
              onClick={() => setIsPOpenModal(true)}
            >
              Create New Product Category
            </Button>
          </div>
          <TableComponent
            data={ProductCategoryData}
            columns={CategoryColumns}
            loading={PCategory.isLoading}
          />
        </article>
        <h3>Blog</h3>
        <article>
          <div className="d-flex justify-content-end mb-2">
            <Button
              type="primary"
              size={"large"}
              icon={<FontAwesomeIcon icon={faPlus} />}
              className="add-btn"
              onClick={() => setIsBOpenModal(true)}
            >
              Create New Blog Category
            </Button>
          </div>
          <TableComponent
            data={BlogCategoryData}
            columns={CategoryColumns}
            loading={BCategory.isLoading}
          />
        </article>
      <Modal open={isPOpenModal} onCancel={handleCancelPModal} footer={null}>
        <h3 className="text-center mb-3">Add New Product Category</h3>

        <form
          className="d-flex flex-column gap-3"
          onSubmit={Pformik.handleSubmit}
        >
          <div>
            <span>Name</span>
            <Input
              Id="name"
              labelValue="Enter Product Category Name"
              name="name"
              onChange={Pformik.handleChange("name")}
              value={Pformik.values.name}
              onBlur={Pformik.handleBlur("name")}
            />
          </div>
          <div
            style={{ marginTop: "1em" }}
            className="d-flex justify-content-end gap-2"
          >
            <button
              onClick={handleCancelPModal}
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
      </Modal>
      <Modal open={isBOpenModal} onCancel={handleCancelBModal} footer={null}>
        <h3 className="text-center mb-3">Add New Blog Category</h3>
        <form
          className="d-flex flex-column gap-3"
          onSubmit={Bformik.handleSubmit}
        >
          <div>
            <span>Name</span>
            <Input
              Id="name"
              labelValue="Enter Blog Category Name"
              name="name"
              onChange={Bformik.handleChange("name")}
              value={Bformik.values.name}
              onBlur={Bformik.handleBlur("name")}
            />
          </div>
          <div
            style={{ marginTop: "1em" }}
            className="d-flex justify-content-end gap-2"
          >
            <button
              onClick={handleCancelBModal}
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
      </Modal>
    </section>
  );
};

export default Category;

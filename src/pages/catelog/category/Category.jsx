import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/app/table/Table";
import {
  getProductCategories,
  resetProductCategoryState,
  createProductCategories,
  updateProductCategory,
  deleteProductCategory,
} from "../../../features/productCategory/product.categorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogCategories,
  createBlogCategories,
  resetBlogCategoryState,
  updateBlogCategory,
  deleteBlogCategory,
} from "../../../features/blogCategory/blog.categorySlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import Input from "../../../components/app/input/Input";
import { toast } from "react-toastify";
import {
  ProductCategoryTableColumns,
  BlogCategoryTableColumns,
} from "../../../utils/TableColums";
import { Input as antdInput } from "antd";
import { useTokenExpired } from "../../../hooks/useTokenExpired";

const schemaForProductValidations = Yup.object().shape({
  name: Yup.string().required("name is required"),
});
1;
const schemaForBlogValidations = Yup.object().shape({
  name: Yup.string().required("name is required"),
});

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //* Blog
  const [isBOpenModal, setIsBOpenModal] = useState(false);
  const [isBUpdateOpenModal, setIsBUpdateOpenModal] = useState(false);
  const [itemId, setItemId] = useState("");
  const [BsearchText, setBsearchText] = useState("");

  //* Product
  const [isPOpenModal, setIsPOpenModal] = useState(false);
  const [isPUpdateOpenModal, setIsPUpdateOpenModal] = useState(false);
  const [PsearchText, setPsearchText] = useState("");

  const showDeleteProductConfirm = (item) => {
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
        dispatch(deleteProductCategory(item._id));
      }
    });
  };

  const showDeleteBlogConfirm = (item) => {
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
        dispatch(deleteBlogCategory(item._id));
      }
    });
  };

  const BlogCategoryData = [];

  const Bformik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      if (isBOpenModal) {
        dispatch(createBlogCategories({ title: values.name }));
        Bformik.resetForm();
        handleCancelBModal();
        setItemId("");
      }
      if (isBUpdateOpenModal) {
        dispatch(
          updateBlogCategory({ data: { title: values.name }, id: itemId })
        );
        Bformik.resetForm();
        handleCancelBModal();
        setItemId("");
      }
    },
    // validationSchema: schemaForValidations,
  });

  const BCategory = useSelector((state) => state.blogCategories);

  const blogCategoryState = useSelector(
    (state) => state.blogCategories.blogCategories.data
  );

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
              onClick={() => handleOnClickButtonEdit(blogCategoryState[i])}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="icons-hover-delete"
              onClick={() => showDeleteBlogConfirm(blogCategoryState[i])}
            />
          </div>
        </React.Fragment>
      ),
    });
  }

  const ProductCategoryData = [];

  const Pformik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      if (isPOpenModal) {
        dispatch(createProductCategories({ title: values.name }));
        Bformik.resetForm();
        handleCancelPModal();
        setItemId("");
      }
      if (isPUpdateOpenModal) {
        dispatch(
          updateProductCategory({ data: { title: values.name }, id: itemId })
        );
        Bformik.resetForm();
        handleCancelPModal();
        setItemId("");
      }
    },
    // validationSchema: schemaForValidations,
  });

  const PCategory = useSelector((state) => state.productCategories);

  const productCategoryState = useSelector(
    (state) => state.productCategories.productCategories.data
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
              onClick={() =>
                handleOnClickButtonEditProduct(productCategoryState[i])
              }
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="icons-hover-delete"
              onClick={() => showDeleteProductConfirm(productCategoryState[i])}
            />
          </div>
        </React.Fragment>
      ),
    });
  }

  //? Functions

  const handleOnClickButtonEditProduct = (item) => {
    setIsPUpdateOpenModal(true);
    setItemId(item._id);
    Pformik.values.name = item.title;
  };

  const handleOnClickButtonEdit = (item) => {
    setIsBUpdateOpenModal(true);
    setItemId(item._id);
    Bformik.values.name = item.title;
  };

  const handleCancelPModal = () => {
    setIsPOpenModal(false);
    setIsPUpdateOpenModal(false);
    Pformik.values.name = "";
  };

  const handleCancelBModal = () => {
    setIsBOpenModal(false);
    setIsBUpdateOpenModal(false);
    Bformik.values.name = "";
  };

  //! UseEffect Needing Refactoring.
  const isTokenPExpired = useTokenExpired(PCategory.message, PCategory.isError);
  const isTokenBExpired = useTokenExpired(BCategory.message, BCategory.isError);


  // useEffect(() => {
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
            dispatch(resetBlogCategoryState());
            dispatch(resetProductCategoryState());
            localStorage.clear();
            navigate("/auth/sign-in");
          }
        });
      }
    }
  // }, [PCategory.isError, BCategory.isError, PCategory.message, BCategory.message]);

  useEffect(() => {
    if (BCategory.BlogCategoryCreated && BCategory.isSuccess) {
      toast.success("Blog Category Succesfully!");
      dispatch(resetBlogCategoryState());
      dispatch(getBlogCategories());
    }

    if (BCategory.BlogCategoryUpdated && BCategory.isSuccess) {
      toast.success("Blog Category Updated Succesfully!");
      dispatch(resetBlogCategoryState());
      dispatch(getBlogCategories());
    }

    if (BCategory.BlogCategoryDeleted && BCategory.isSuccess) {
      toast.success("Blog Category Deleted Succesfully!");
      dispatch(resetBlogCategoryState());
      dispatch(getBlogCategories());
    }

    if (BCategory.isError) {
      toast.error("Something Went Wrong!");
      dispatch(resetBlogCategoryState());
    }
  }, [BCategory.isSuccess, BCategory.isError, BCategory.isLoading]);

  useEffect(() => {
    if (PCategory.ProductCategoryCreated && PCategory.isSuccess) {
      toast.success("Product Category Succesfully!");
      dispatch(resetProductCategoryState());
      dispatch(getProductCategories());
    }

    if (PCategory.ProductCategoryUpdated && PCategory.isSuccess) {
      toast.success("Product Category Updated Succesfully!");
      dispatch(resetProductCategoryState());
      dispatch(getProductCategories());
    }

    if (PCategory.ProductCategoryDeleted && PCategory.isSuccess) {
      toast.success("Product Category Deleted Succesfully!");
      dispatch(resetProductCategoryState());
      dispatch(getProductCategories());
    }

    if (PCategory.isError) {
      toast.error("Something Went Wrong!");
      dispatch(resetProductCategoryState());
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
      <div className="mb-4">
        <h1>Product Categories</h1>
        <h6 className="text-muted">{`These are the categories that belong to the products. In General there are ${productCategoryState?.length} Product Categories.`}</h6>
      </div>
      <article>
        <div
          className="d-flex mb-1 flex-wrap"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <antdInput.Search
            placeholder="Search here..."
            style={{ marginBottom: 8, width: "300px" }}
            onSearch={(value) => setPsearchText(value.trim())}
            onChange={(e) => setPsearchText(e.target.value.trim())}
          />
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
          columns={ProductCategoryTableColumns(PsearchText)}
          loading={PCategory.isLoading}
          width={900}
        />
      </article>

      <div className="mb-4">
        <h1>Blog Categories</h1>
        <h6 className="text-muted">{`On the other hand the Blog Categories are the categories that pertain to blogs only. In General there are a number of ${blogCategoryState?.length} Blog Categories`}</h6>
      </div>
      <article>
        <div
          className="d-flex mb-1 flex-wrap"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <antdInput.Search
            placeholder="Search here..."
            style={{ marginBottom: 8, width: "300px" }}
            onSearch={(value) => setBsearchText(value.trim())}
            onChange={(e) => setBsearchText(e.target.value.trim())}
          />
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
          columns={BlogCategoryTableColumns(BsearchText)}
          loading={BCategory.isLoading}
          width={900}
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

      <Modal
        open={isPUpdateOpenModal}
        onCancel={handleCancelPModal}
        footer={null}
      >
        <h3 className="text-center mb-3">Update Product Category</h3>

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

      <Modal
        open={isBUpdateOpenModal}
        onCancel={handleCancelBModal}
        footer={null}
      >
        <h3 className="text-center mb-3">Update Blog Category</h3>

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

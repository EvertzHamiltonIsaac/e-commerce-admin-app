import React, { useEffect } from "react";
import TableComponent from "../../../components/app/table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getBrands,
  createBrands,
  resetBrandState,
  updateBrands,
  deleteBrands,
} from "../../../features/brand/brandSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import Input from "../../../components/app/input/Input";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Input as antdInput } from "antd";
import { BrandTableColumns } from "../../../utils/TableColums";

const schemaForValidations = Yup.object().shape({
  name: Yup.string().required("Title is required"),
});

const Brand = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdateOpenModal, setIsUpdateOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [brandId, setBrandId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      if (isOpenModal) {
        dispatch(createBrands({ title: values.name }));
        formik.resetForm();
        handleCancelModal();
      }
      if (isUpdateOpenModal) {
        dispatch(updateBrands({ data: { title: values.name }, id: brandId }));
        formik.resetForm();
        handleCancelUpdateModal();
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
        dispatch(deleteBrands(item._id));
      }
    });
  };

  const {
    isSuccess,
    isError,
    brandCreated,
    brandUpdated,
    brandDeleted,
    message,
    isLoading,
    brands,
  } = useSelector((state) => state.brands);

  //? Get All Brands Selector
  const brandsData = [];
  for (let i = 0; i < brands.data?.length; i++) {
    brandsData.push({
      key: i + 1,
      name: brands.data[i].title,
      actions: (
        <div>
          <div
            className="fs-5 d-flex gap-2"
            style={{ cursor: "pointer", color: "var(--color-blue-main)" }}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="icons-hover-update"
              onClick={() => handleOnEditButtonClick(brands.data[i])}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="icons-hover-delete"
              onClick={() => showDeleteConfirm(brands.data[i])}
            />
          </div>
        </div>
      ),
    });
  }

  //? Functions
  const handleCancelModal = () => {
    setIsOpenModal(false);
    setBrandId("");
    formik.values.name = "";
  };

  const handleCancelUpdateModal = () => {
    setIsUpdateOpenModal(false);
    setBrandId("");
    formik.values.name = "";
  };

  //!This can be Refactored.
  const handleOnEditButtonClick = (item) => {
    setIsUpdateOpenModal(true);
    setBrandId(item._id);
    formik.values.name = item.title;
  };

  //? useEffects
  useEffect(() => {
    dispatch(getBrands());
  }, []);

  useEffect(() => {
    if (brandCreated && isSuccess) {
      toast.success("Brand Added Succesfully!");
      dispatch(resetBrandState());
      dispatch(getBrands());
    }
    if (brandUpdated && isSuccess) {
      toast.success("Brand Updated Succesfully!");
      dispatch(resetBrandState());
      dispatch(getBrands());
    }

    if (brandDeleted && isSuccess) {
      toast.success("Brand Deleted Succesfully!");
      dispatch(resetBrandState());
      dispatch(getBrands());
    }

    if (isError) {
      toast.error("Something Went Wrong!");
      dispatch(resetBrandState());
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (typeof message === "string" && isError) {
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
            dispatch(resetBrandState());
            localStorage.clear();
            navigate("/auth/sign-in");
          }
        });
      }
    }
  });

  return (
    <section className="brand-list">
      <div className="mb-4">
        <h1>Brands</h1>
        <h6 className="text-muted">{`On this page you can view all the brands created in the project. In General there are a number of ${brands?.data?.length} brands.`}</h6>
      </div>
      <article>
        <div
          className="d-flex mb-1"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <antdInput.Search
            placeholder="Search here..."
            style={{ marginBottom: 8, width: "300px" }}
            onSearch={(value) => setSearchText(value.trim())}
            onChange={(e) => setSearchText(e.target.value.trim())}
          />
          <Button
            type="primary"
            size={"large"}
            icon={<FontAwesomeIcon icon={faPlus} />}
            className="add-btn"
            onClick={() => setIsOpenModal(true)}
          >
            Create New Brand
          </Button>
        </div>
        <TableComponent
          data={brandsData}
          columns={BrandTableColumns(searchText)}
          loading={isLoading}
          width={900}
        />
      </article>

      <Modal open={isOpenModal} onCancel={handleCancelModal} footer={null}>
        <h3 className="text-center mb-3">Add New Brand</h3>

        <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <span>Name</span>
            <Input
              Id="name"
              labelValue="Enter Brand Name"
              name="name"
              onChange={formik.handleChange("name")}
              value={formik.values.name}
              onBlur={formik.handleBlur("name")}
            />
          </div>
          <div
            style={{ marginTop: "1em" }}
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
      </Modal>

      <Modal
        open={isUpdateOpenModal}
        onCancel={handleCancelUpdateModal}
        footer={null}
      >
        <h3 className="text-center mb-3">Update Brand</h3>
        <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <span>Name</span>
            <Input
              Id="name"
              labelValue="Enter Brand Name"
              name="name"
              onChange={formik.handleChange("name")}
              value={formik.values.name}
              onBlur={formik.handleBlur("name")}
            />
          </div>
          <div
            style={{ marginTop: "1em" }}
            className="d-flex justify-content-end gap-2"
          >
            <button
              onClick={handleCancelUpdateModal}
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
              Update
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
};

export default Brand;

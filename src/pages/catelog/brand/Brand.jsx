import React, { useEffect } from "react";
import TableComponent from "../../../components/app/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, createBrands, resetBrandState } from "../../../features/brand/brandSlice";
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
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Actions",
    dataIndex: "actions",
    width: 150,
    key: "actions",
    fixed: "right",
  },
];

const schemaForValidations = Yup.object().shape({
  name: Yup.string().required("Title is required"),
});

const Brand = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      dispatch(createBrands({title: values.name}));
      formik.resetForm();
      handleCancelModal();
    },
    // validationSchema: schemaForValidations,
  });

  const { isSuccess, isError, brandCreated, message, isLoading, brands } = useSelector(
    (state) => state.brands
  );

  //? Get All Brands Selector
  const brandsData = [];
  for (let i = 0; i < brands.data?.length; i++) {
    brandsData.push({
      key: i + 1,
      name: brands.data[i].title,
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
  const handleCancelModal = () => {
    setIsOpenModal(false);
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
          icon: 'error',
          title: 'Oops...',
          text: `${message}`,
        }).then((result) => {
          if(result.isConfirmed){
            dispatch(resetBrandState())
            localStorage.clear();
            navigate('/auth/sign-in')
          }
        })
      }
    }
  });

  return (
    <section className="brand-list">
      <h3>Brands</h3>
      <article>
        <div className="d-flex justify-content-end mb-2">
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
          columns={columns}
          loading={isLoading}
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
    </section>
  );
};

export default Brand;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoupons,
  createCoupons,
  resetCouponState,
} from "../../features/coupons/couponSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { Button, DatePicker } from "antd";
import Modal from "antd/es/modal/Modal";
import Input from "../../components/app/input/Input";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/app/table/Table";
import moment from "moment/moment";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Discount",
    dataIndex: "discount",
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

const Coupons = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //? Functions
  const handleCancelModal = () => {
    setIsOpenModal(false);
  };

  const handleFormatDateTime = (dateTimeIsoFormat) => {
    const momentObj = moment(dateTimeIsoFormat);
    const formattedTimestamp = momentObj.format("DD-MM-YYYY");
    return formattedTimestamp;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: 0,
    },
    onSubmit: (values) => {
      dispatch(createCoupons(values));
      console.log(values);
      formik.resetForm();
      handleCancelModal();
    },
    // validationSchema: schemaForValidations,
  });

  const { isSuccess, isError, CouponCreated, message, isLoading, coupons } =
    useSelector((state) => state.coupons);

  //? Get All Brands Selector
  const couponsData = [];
  for (let i = 0; i < coupons.data?.length; i++) {
    couponsData.push({
      key: i + 1,
      name: coupons.data[i].name,
      expiry: handleFormatDateTime(coupons?.data[i].expiry),
      discount: coupons?.data[i].discount,
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

  //? useEffects
  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  useEffect(() => {
    if (CouponCreated && isSuccess) {
      toast.success("Brand Added Succesfully!");
      dispatch(resetCouponState());
      dispatch(getCoupons());
    }
    if (isError) {
      toast.error("Something Went Wrong!");
      dispatch(resetCouponState());
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
            dispatch(resetCouponState());
            localStorage.clear();
            navigate("/auth/sign-in");
          }
        });
      }
    }
  }, [message, isError]);

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
          data={couponsData}
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

          <div>
            {/* <DatePicker
              Id="expiry"
              name="expiry"
              onChange={formik.handleChange("expiry")}
              value={formik.values.expiry}
              allowClear
            //   onBlur={formik.handleBlur("expiry")}
            /> */}
            <span>Name</span>
            <Input
              Id="expiry"
              labelValue="Enter Brand Name"
              type="date"
              name="expiry"
              onChange={formik.handleChange("expiry")}
              value={formik.values.expiry}
            //   onBlur={formik.handleBlur("expiry")}
            />
          </div>

          <div>
            <span>Name</span>
            <Input
              Id="discount"
              labelValue="Enter Brand Name"
              name="discount"
              type="number"
              onChange={formik.handleChange("discount")}
              value={formik.values.discount}
              onBlur={formik.handleBlur("discount")}
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

export default Coupons;

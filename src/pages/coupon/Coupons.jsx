import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCoupons,
  createCoupons,
  resetCouponState,
  deleteCoupons,
  updateCoupons,
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
import { CouponsTableColumns } from "../../utils/TableColums";
const { confirm } = Modal;


const schemaForValidations = Yup.object().shape({
  name: Yup.string().required("Title is required"),
});

const Coupons = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdateOpenModal, setIsUpdateOpenModal] = useState(false);
  const [couponId, setCouponId] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //? Functions
  const handleCancelModal = () => {
    setIsOpenModal(false);
    setIsUpdateOpenModal(false)
    formik.values.name = "";
    formik.values.expiry = "";
    formik.values.discount = "";
  };

  const handleOnClickEditCoupon = (item) => {
    setIsUpdateOpenModal(true);
    setCouponId(item._id);
    formik.values.name = item.name;
    formik.values.expiry = handleFormatDateTime(item.expiry, 'YYYY-MM-DD');
    console.log(formik.values.expiry);
    formik.values.discount = item.discount
  }

  const handleFormatDateTime = (dateTimeIsoFormat, format) => {
    const momentObj = moment(dateTimeIsoFormat);
    momentObj.utcOffset(0);
    const formattedTimestamp = momentObj.format(format);
    return formattedTimestamp;
  };

  const showDeleteConfirm = (item) => {
    confirm({
      title: "Are you sure delete this coupon?",
      content: "Once it's deleted it can't be restored",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteCoupons(item._id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      expiry: "",
      discount: 0,
    },
    onSubmit: (values) => {
      if (isOpenModal) {
        dispatch(createCoupons(values));
        formik.resetForm();
        handleCancelModal();
      }
      if (isUpdateOpenModal) {
        dispatch(updateCoupons({ data: values, id: couponId }));
        formik.resetForm();
        handleCancelModal();
      }
    },
    // validationSchema: schemaForValidations,
  });

  const { isSuccess, isError, CouponCreated, CouponDeleted, CouponUpdated, message, isLoading, coupons } =
    useSelector((state) => state.coupons);

  //? Get All Brands Selector
  const couponsData = [];
  for (let i = 0; i < coupons.data?.length; i++) {
    couponsData.push({
      key: i + 1,
      name: coupons.data[i].name,
      expiry: handleFormatDateTime(coupons?.data[i].expiry, 'MMMM Do YYYY'),
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
              onClick={() => handleOnClickEditCoupon(coupons.data[i])}
            />
            <FontAwesomeIcon icon={faTrash} className="icons-hover-delete" onClick={() => showDeleteConfirm(coupons.data[i])}/>
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
      toast.success("Coupon Added Succesfully!");
      dispatch(resetCouponState());
      dispatch(getCoupons());
    }

    if (CouponUpdated && isSuccess) {
      toast.success("Coupon Updated Succesfully!");
      dispatch(resetCouponState());
      dispatch(getCoupons());
    }

    if (CouponDeleted && isSuccess) {
      toast.success("Coupon Deleted Succesfully!");
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
      <div className="mb-4">
        <h1>Coupons</h1>
        <h6 className="text-muted">{`These are all the coupons that can be used in the project. There is a number of ${coupons.data?.length} coupons created.`}</h6>
      </div>
      <article>
        <div className="d-flex justify-content-end mb-2">
          <Button
            type="primary"
            size={"large"}
            icon={<FontAwesomeIcon icon={faPlus} />}
            className="add-btn"
            onClick={() => setIsOpenModal(true)}
          >
            Create New Coupon
          </Button>
        </div>
        <TableComponent
          data={couponsData}
          columns={CouponsTableColumns}
          loading={isLoading}
        />
      </article>

      <Modal open={isOpenModal} onCancel={handleCancelModal} footer={null}>
        <h3 className="text-center mb-3">Add New Coupon</h3>

        <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <span>Name</span>
            <Input
              Id="name"
              labelValue="Enter Coupon Name"
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
            <span>Expiry Date</span>
            <Input
              Id="expiry"
              labelValue="Choose an expiry date"
              type="date"
              name="expiry"
              onChange={formik.handleChange("expiry")}
              value={formik.values.expiry}
            //   onBlur={formik.handleBlur("expiry")}
            />
          </div>

          <div>
            <span>Discount</span>
            <Input
              Id="discount"
              labelValue="Enter Discount Amount"
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

      <Modal open={isUpdateOpenModal} onCancel={handleCancelModal} footer={null}>
        <h3 className="text-center mb-3">Update Coupon</h3>

        <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <span>Name</span>
            <Input
              Id="name"
              labelValue="Enter Coupon Name"
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
            <span>Expiry Date</span>
            <Input
              Id="expiry"
              labelValue="Choose an expiry date"
              type="date"
              name="expiry"
              onChange={formik.handleChange("expiry")}
              value={formik.values.expiry}
            //   onBlur={formik.handleBlur("expiry")}
            />
          </div>

          <div>
            <span>Discount</span>
            <Input
              Id="discount"
              labelValue="Enter Discount Amount"
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

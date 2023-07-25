import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/app/table/Table";
import Modal from "antd/es/modal/Modal";
import Input from "../../../components/app/input/Input";
import {
  getColors,
  resetColorState,
  createColors,
  deleteColors,
  updateColors,
} from "../../../features/color/colorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button } from "antd";
import { ColorsTableColumns } from "../../../utils/TableColums";
import Swal from "sweetalert2";
import { Input as antdInput } from "antd";

const schemaForValidations = Yup.object().shape({
  name: Yup.string().required("Title is required"),
});

const Color = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdateOpenModal, setIsUpdateOpenModal] = useState(false);
  const [colorId, setColorId] = useState("");
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

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
        dispatch(deleteColors(item._id));
      }
    });
  };

  const {
    colors,
    message,
    ColorCreated,
    ColorUpdated,
    ColorDeleted,
    isLoading,
    isError,
    isSuccess,
  } = useSelector((state) => state.colors);

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "#000000",
    },
    onSubmit: (values) => {
      if (isOpenModal) {
        dispatch(createColors({ name: values.name, code: values.color }));
        formik.resetForm();
        handleCancelModal();
      }
      if (isUpdateOpenModal) {
        dispatch(
          updateColors({
            data: { name: values.name, code: values.color },
            id: colorId,
          })
        );
        formik.resetForm();
        handleCancelModal();
      }
    },
    // validationSchema: schemaForValidations,
  });

  const getBrightness = (color) => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);

    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const handleChangeTextColor = (backgroundColor) => {
    return getBrightness(backgroundColor) > 128 ? "black" : "white";
  };

  const colorData = [];
  for (let i = 0; i < colors.data?.length; i++) {
    colorData.push({
      key: i + 1,
      name: colors.data[i]?.name,
      code: (
        <div
          className="text-center"
          style={{
            color: `${handleChangeTextColor(
              colors.data[i]?.code.toUpperCase()
            )}`,
            border: `${
              colors.data[i]?.code.toUpperCase() === "#FFFFFF"
                ? "solid 1px black"
                : ""
            }`,
            borderRadius: "5px",
            width: "150px",
            backgroundColor: `${colors.data[i]?.code.toUpperCase()}`,
          }}
        >
          {colors.data[i]?.code.toUpperCase()}
        </div>
      ),
      actions: (
        <React.Fragment>
          <div
            className="fs-5 d-flex gap-2"
            style={{ cursor: "pointer", color: "var(--color-blue-main)" }}
          >
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="icons-hover-update"
              onClick={() => handleOnClickEditColor(colors.data[i])}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="icons-hover-delete"
              onClick={() => showDeleteConfirm(colors.data[i])}
            />
          </div>
        </React.Fragment>
      ),
    });
  }

  const handleOnClickEditColor = (item) => {
    console.log(item);
    setIsUpdateOpenModal(true);
    setColorId(item._id);
    formik.values.name = item.name;
    formik.values.color = item.code.includes("#") ? item.code : `#${item.code}`;
  };

  const handleCancelModal = () => {
    setIsOpenModal(false);
    setIsUpdateOpenModal(false);
    formik.values.name = "";
    formik.values.color = "#000000";
  };

  useEffect(() => {
    dispatch(getColors());
  }, []);

  useEffect(() => {
    if (ColorCreated && isSuccess) {
      toast.success("Brand Added Succesfully!");
      dispatch(resetColorState());
      dispatch(getColors());
    }

    if (ColorUpdated && isSuccess) {
      toast.success("Color Updated Succesfully!");
      dispatch(resetColorState());
      dispatch(getColors());
    }

    if (ColorDeleted && isSuccess) {
      toast.success("Color Deleted Succesfully!");
      dispatch(resetColorState());
      dispatch(getColors());
    }

    if (isError) {
      toast.error("Something Went Wrong!");
      dispatch(resetColorState());
      dispatch(getColors());
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <section className="color-list">
      <div className="mb-4">
        <h1>Colors</h1>
        <h6 className="text-muted">{`On this page you will find all the available colors of the project, more can be added and the existing ones can be edited and deleted. In General there is a quantity of ${colors?.data?.length} colors.`}</h6>
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
            Create New Color
          </Button>
        </div>
        <TableComponent
          data={colorData}
          columns={ColorsTableColumns(searchText)}
          loading={isLoading}
          width={900}
        />
      </article>

      <Modal open={isOpenModal} onCancel={handleCancelModal} footer={null}>
        <h3>Create a New Color</h3>
        <form onSubmit={formik.handleSubmit}>
          <section className="d-flex gap-2">
            <div style={{ width: "85%" }}>
              <span>Name</span>
              <Input
                Id="name"
                labelValue="Enter Product Category Name"
                name="name"
                onChange={formik.handleChange("name")}
                value={formik.values.name}
                onBlur={formik.handleBlur("name")}
              />
            </div>
            <div style={{ width: "15%" }}>
              <span>Color</span>
              <Input
                Id="color"
                // labelValue="Enter Color"
                type="color"
                name="color"
                onChange={formik.handleChange("color")}
                value={formik.values.color}
                onBlur={formik.handleBlur("color")}
              />
            </div>
          </section>
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
        onCancel={handleCancelModal}
        footer={null}
      >
        <h3>Update Color</h3>
        <form onSubmit={formik.handleSubmit}>
          <section className="d-flex gap-2">
            <div style={{ width: "85%" }}>
              <span>Name</span>
              <Input
                Id="name"
                labelValue="Enter Product Category Name"
                name="name"
                onChange={formik.handleChange("name")}
                value={formik.values.name}
                onBlur={formik.handleBlur("name")}
              />
            </div>
            <div style={{ width: "15%" }}>
              <span>Color</span>
              <Input
                Id="color"
                // labelValue="Enter Color"
                type="color"
                name="color"
                onChange={formik.handleChange("color")}
                value={formik.values.color}
                onBlur={formik.handleBlur("color")}
              />
            </div>
          </section>
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

export default Color;

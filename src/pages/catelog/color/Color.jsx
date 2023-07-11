import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/app/table/Table";
import Select from "../../../components/app/select/Select";
import Modal from "antd/es/modal/Modal";
import Input from "../../../components/app/input/Input";
import { getColors, resetColorState, createColors } from "../../../features/color/colorSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Button } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Code HEX",
    dataIndex: "code",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 150,
  },
];

const schemaForValidations = Yup.object().shape({
  name: Yup.string().required("Title is required"),
});

const Color = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const { colors, message, ColorCreated, isLoading, isError, isSuccess } =
    useSelector((state) => state.colors);

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "#000000",
    },
    onSubmit: (values) => {
      // dispatch(createBrands({title: values.name}));
      dispatch(createColors({name: values.name, code: values.color}))
      console.log(values);
      formik.resetForm();
      handleCancelModal();
    },
    // validationSchema: schemaForValidations,
  });

  const colorData = [];
  for (let i = 0; i < colors.data?.length; i++) {
    colorData.push({
      key: i + 1,
      name: colors.data[i]?.name,
      code: colors.data[i]?.code.toUpperCase(),
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

  const handleCancelModal = () => {
    setIsOpenModal(false);
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
    if (isError) {
      toast.error("Something Went Wrong!");
      dispatch(resetColorState());
      dispatch(getColors());
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <section className="color-list">
      <h3>Colors</h3>
      <article>
        <div className="d-flex justify-content-end mb-2">
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
          columns={columns}
          loading={isLoading}
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
    </section>
  );
};

export default Color;

import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/app/table/Table";
import Select from "../../../components/app/select/Select";
import Modal from "antd/es/modal/Modal";
import Input from "../../../components/app/input/Input";
import { getColors } from "../../../features/color/colorSlice";
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
    },
    onSubmit: (values) => {
      // dispatch(createBrands({title: values.name}));
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
      code: colors.data[i]?.code,
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
      dispatch(resetBrandState());
      dispatch(getBrands());
    }
    if (isError) {
      toast.error("Something Went Wrong!");
      dispatch(resetBrandState());
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
            Create New Brand
          </Button>
        </div>
        <TableComponent
          data={colorData}
          columns={columns}
          loading={isLoading}
        />
      </article>

      <Modal open={isOpenModal} onCancel={handleCancelModal}>
        <h3>Create a New Color</h3>
        <form>
          <Input type="color" />
        </form>
      </Modal>
    </section>
  );
};

export default Color;

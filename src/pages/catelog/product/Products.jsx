import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faFileArrowUp,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Upload } from "antd";
import Modal from "antd/es/modal/Modal";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { Select as SelectAntd } from "antd";
import * as Yup from "yup";
import Input from "../../../components/app/input/Input";
import Select from "../../../components/app/select/Select";
import TableComponent from "../../../components/app/table/Table";
import { getBrands } from "../../../features/brand/brandSlice";
import { getColors } from "../../../features/color/colorSlice";
import {
  getProducts,
  createProducts,
  resetProductState,
} from "../../../features/product/productSlice";
import { getProductCategories } from "../../../features/productCategory/product.categorySlice";
import { deleteImg, uploadImg } from "../../../features/upload/uploadSlice";
import { ProductTableColumns } from "../../../utils/TableColums";
import "./productStyles.css";
import { Input as antdInput } from "antd";
import DOMPurify from "dompurify";
import Swal from "sweetalert2";

const TagOptions = [
  {
    title: "Featured",
    value: "featured",
  },
  {
    title: "Popular",
    value: "popular",
  },
  {
    title: "Special",
    value: "special",
  },
];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const schemaForValidations = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Email is required"),
  brand: Yup.string().required("Email is required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is required"),
  quantity: Yup.string().required("Email is required"),
  price: Yup.string().required("Email is required"),
  images: Yup.string().required("Email is required"),
});

const Products = () => {
  //TODO: Statement
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();

  //TODO: Configurations
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      tags: "",
      brand: "",
      color: [],
      quantity: "",
      price: "",
      images: [],
    },
    onSubmit: (values) => {
      if (isOpenModal) {
        dispatch(createProducts(values));
        formik.resetForm();
        handleCancelModal();
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
        console.log(item._id);
        // dispatch(deleteBlogs(item._id));
      }
    });
  };

  //TODO: Selectors

  //? States of Create Product Selector
  const { isSuccess, isError, isLoading, productCreated } = useSelector(
    (state) => state.products
  );

  const getBrightness = (color) => {
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);

    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const handleChangeTextColor = (backgroundColor) => {
    return getBrightness(backgroundColor) > 128 ? "black" : "white";
  };

  //? Product Selector
  const productState = useSelector((state) => state.products.products.data);
  const productsData = [];
  for (let i = 0; i < productState?.length; i++) {
    productsData.push({
      key: productState[i]?._id,
      title: (
        <div className="title_container">
          <div className="img_title_container rounded">
            <img
              className=""
              src={
                productState[i]?.images[0]?.url
                  ? `${productState[i]?.images[0]?.url}`
                  : "/no-photo.jpg"
              }
              alt=""
            />
          </div>
          {productState[i]?.title}
        </div>),
      description: (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(productState[i]?.description),
          }}
        ></div>
      ),
      category: productState[i]?.category,
      brand: productState[i]?.brand,
      color: (
        <div className="d-flex gap-1 flex-column p-0">
          {productState[i]?.color.map((item, index) => (
            <div
              key={index}
              className="text-center"
              style={{
                color: `${handleChangeTextColor(item?.code.toUpperCase())}`,
                border: `${
                  item?.code.toUpperCase() === "#FFFFFF"
                    ? "solid 1px black"
                    : ""
                }`,
                borderRadius: "5px",
                width: "90px",
                backgroundColor: `${item?.code.toUpperCase()}`,
              }}
            >
              {item?.code.toUpperCase()}
            </div>
          ))}
        </div>
      ),
      quantity: productState[i]?.quantity,
      price: productState[i]?.price,
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
            <FontAwesomeIcon
              icon={faTrash}
              className="icons-hover-delete"
              onClick={() => showDeleteConfirm(productState[i])}
            />
          </div>
        </React.Fragment>
      ),
    });
  }

  //? Brand Selector
  const brandState = useSelector((state) => state.brands.brands.data);

  const productCategoryState = useSelector(
    (state) => state.productCategories.productCategories.data
  );

  //? Color Selector
  const colorState = useSelector((state) => state.colors.colors.data);
  const colors = [];
  colorState?.forEach((element) => {
    colors.push({
      value: element?._id,
      label: element?.name,
      code: element?.code,
    });
  });

  //? Images Selector
  // const imgState = useSelector((state) => state.images.img.data);
  const imgArray = [];
  if (fileList instanceof Array) {
    fileList?.forEach((element) => {
      imgArray.push({
        public_id: element?.response?.data[0]?.public_id,
        url: element?.response?.data[0]?.url,
      });
    });
  }

  //TODO: Functions
  const handleCancelModal = () => {
    setIsOpenModal(false);
    // setIsUpdateOpenModal(false);
    setFileList([]);
    formik.values.title = "";
    formik.values.description = "";
    formik.values.category = "";
    formik.values.brand = "";
    formik.values.color = [];
    formik.values.quantity = "";
    formik.values.price = "";
    formik.values.images = [];
  };

  const handleColors = (e) => {
    setColor(e);
  };

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <FontAwesomeIcon icon={faPlus} />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  //TODO: UseEffects
  useEffect(() => {
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, [isOpenModal]);

  useEffect(() => {
    dispatch(resetProductState());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    formik.values.images = imgArray;
    formik.values.color = color ? color : " ";
  }, [color, imgArray]);

  useEffect(() => {
    if (productCreated && isSuccess) {
      toast.success("Product Added Succesfully!");
      dispatch(resetProductState());
      dispatch(getProducts());
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  return (
    <section className="product-list">
      <div className="mb-4">
        <h1>Products</h1>
        <h6 className="text-muted">{`The following records refer to all the products of the project. In general there is a quantity of ${productState?.length} products.`}</h6>
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
            Create New Product
          </Button>
        </div>
        <div className="table-container">
          <TableComponent
            data={productsData}
            columns={ProductTableColumns(searchText)}
            loading={isLoading}
          />
        </div>
      </article>

      <Modal open={isOpenModal} onCancel={handleCancelModal} footer={null}>
        <h3 className="text-center mb-3">Add New Product</h3>
        <form
          className="d-flex flex-column gap-2"
          onSubmit={formik.handleSubmit}
        >
          <div className="d-flex gap-2">
            <div style={{ width: "70%" }}>
              <span>Title</span>
              <Input
                Id="title"
                labelValue="Enter Product Title"
                name="title"
                onChange={formik.handleChange("title")}
                value={formik.values.title}
                onBlur={formik.handleBlur("title")}
              />
            </div>
            <div>
              <span>Price</span>
              <Input
                Id="price"
                labelValue="Enter Product Price"
                name="price"
                onChange={formik.handleChange("price")}
                value={formik.values.price}
                onBlur={formik.handleBlur("price")}
              />
            </div>
          </div>
          <div className="d-flex gap-2">
            <div style={{ width: "35%" }}>
              <span>Select a Brand</span>
              <Select
                value={formik.values.brand}
                id="brand"
                name="brand"
                className="form-select"
                options={brandState}
                placeholder="Choose a Brand"
                onChange={formik.handleChange("brand")}
              />
            </div>
            <div style={{ width: "40%" }}>
              <span>Select a Category</span>
              <Select
                value={formik.values.category}
                id="category"
                name="category"
                className="form-select"
                options={productCategoryState}
                placeholder="Choose a Category"
                onChange={formik.handleChange("category")}
              />
            </div>
            <div style={{ width: "25%" }}>
              <span>Select a Tag</span>
              <Select
                value={formik.values.tags}
                id="tags"
                name="tags"
                className="form-select"
                options={TagOptions}
                placeholder="Choose a Tag"
                onChange={formik.handleChange("tags")}
              />
            </div>
          </div>
          <div className="d-flex gap-2 align-items-center">
            <div style={{ width: "70%" }}>
              <span>Select Colors</span>
              <SelectAntd
                mode="multiple"
                allowClear
                className="w-100"
                placeholder="Select colors"
                defaultValue={color}
                onChange={(item) => handleColors(item)}
                options={colors}
              />
            </div>
            <div style={{ width: "30%" }}>
              <span>Quantity</span>
              <Input
                Id="quantity"
                labelValue="Enter Quantity"
                name="quantity"
                onChange={formik.handleChange("quantity")}
                value={formik.values.quantity}
                onBlur={formik.handleBlur("quantity")}
              />
            </div>
          </div>
          <div>
            <span>Description</span>
            <ReactQuill
              style={{ height: "100px" }}
              theme="snow"
              name="description"
              id="description"
              placeholder="Enter Product Description"
              onChange={formik.handleChange("description")}
              value={formik?.values?.description}
            />
          </div>
          <div className="dropzone_container">
            <span className="mb-5">Upload Images</span>
            <Upload
              action="https://ginger-final-project.onrender.com/api/v1/image/upload"
              headers={{
                Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
              }}
              onRemove={(file) =>
                dispatch(deleteImg(file?.response?.data[0]?.public_id))
              }
              // onDrop={(acceptedFiles) => console.log(acceptedFiles)}
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </div>
          <div
            style={{ marginTop: "3.2em" }}
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
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </section>
  );
};

export default Products;

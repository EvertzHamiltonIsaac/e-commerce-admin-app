import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faFileArrowUp, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import * as Yup from "yup";
import Input from "../../../components/app/input/Input";
import Select from "../../../components/app/select/Select";
import TableComponent from "../../../components/app/table/Table";
import { getBrands } from "../../../features/brand/brandSlice";
import { getColors } from "../../../features/color/colorSlice";
import { getProducts, createProducts } from "../../../features/product/productSlice";
import { getProductCategories } from "../../../features/productCategory/product.categorySlice";
import "./productStyles.css";
import { deleteImg, uploadImg } from "../../../features/upload/uploadSlice";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Color",
    dataIndex: "color",
    sorter: (a, b) => a.color.length - b.color.length,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const schemaForValidations = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Email is required"),
  brand: Yup.string().required("Email is required"),
  color: Yup.array().required("Email is required"),
  quantity: Yup.string().required("Email is required"),
  price: Yup.string().required("Email is required"),
  images: Yup.string().required("Email is required"),
});


const Products = () => {

  //TODO: Statement
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [color, setColor] = useState([]);
  // const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  //TODO: Configurations
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      brand: "",
      color: [],
      quantity: "",
      price: "",
      images: []
    },
    onSubmit: (values) => {
      dispatch(createProducts(values));
      console.log(values);
      formik.resetForm();
      handleCancelModal();
    },
    // validationSchema: schemaForValidations,
  });

  //TODO: Selectors

  //? Product Selector
  const productState = useSelector((state) => state.products.products.data);
  console.log(productState);
  const productsData = [];
  for (let i = 0; i < productState?.length; i++) {
    productsData.push({
      key: productState[i]?._id,
      title: productState[i]?.title,
      description: productState[i]?.description,
      category: productState[i]?.category,
      brand: productState[i]?.category,
      color: productState[i]?.color?.map((item, index) => {return [...item.color]}),
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
            <FontAwesomeIcon icon={faTrash} className="icons-hover-delete" />
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
      _id: element?._id,
      color: element?.name,
      code: element?.code,
    });
  });

  //? Images Selector
  const imgState = useSelector((state) => state.images.img.data)
  const imgArray = [];
  if(imgState instanceof Array){
    imgState?.forEach((element) => {
      imgArray.push({
        public_id: element?.public_id,
        url: element?.url
      });
    })
  }

  //TODO: Functions
  const handleOnChange = (e) => {
    console.log(e);
  };
  const handleCancelModal = () => {
    setIsOpenModal(false);
  };

  //TODO: UseEffects
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getProductCategories());
    dispatch(getColors());
  }, []);

  useEffect(() => {
    formik.values.images = imgArray;
    formik.values.color = color
  }, [color, imgArray])

  return (
    <section className="product-list">
      <h1>Products Page</h1>
      <article>
        <div className="d-flex justify-content-end mb-2">
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
          <TableComponent data={productsData} columns={columns} />
        </div>
      </article>

      <Modal open={isOpenModal} onCancel={handleCancelModal} footer={null}>
        <h3 className="text-center mb-3">Add New Product</h3>
        <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div className="d-flex gap-3">
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

          <div className="d-flex gap-3">
            <div style={{ width: "50%" }}>
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
            <div style={{ width: "50%" }}>
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
          </div>

          <div className="d-flex gap-2 align-items-center">
            <div style={{ width: "70%" }}>
              <span>Select Colors</span>
              <Multiselect
                style={{ width: "100%" }}
                dataKey="_id"
                textField="color"
                defaultValue={[]}
                data={colors}
                onChange={(e) => setColor(e)}
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
              style={{ height: "100px"}}
              theme="snow"
              name="description"
              id="description"
              placeholder="Enter Product Description"
              onChange={formik.handleChange("description")}
              value={formik?.values?.description}
            />
          </div>

          <div className="dropzone_container">
            <Dropzone  onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
              {({ getRootProps, getInputProps }) => (
                <section className='dropzone' {...getRootProps()}>
                  <div className="">
                    <FontAwesomeIcon icon={faFileArrowUp} style={{height: '40px', padding: '15px'}}/>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>

          <div className="showImages d-flex flex-wrap gap-3">
            {
              imgArray.map((item, index) => (
                <div className="position-relative" key={index}>
                  <button type="button" onClick={() => dispatch(deleteImg(item?.public_id))} className="btn-close position-absolute" style={{top: "10px", right: '10px'}}></button>
                  <img src={item?.url} alt="" width={100} height={100}/>
                </div>
              ))
            }
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
    </section>
  );
};

export default Products;

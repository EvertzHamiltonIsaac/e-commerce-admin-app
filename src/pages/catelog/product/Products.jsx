import React from "react";
import TableComponent from "../../../components/app/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../features/product/productSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import './productStyles.css'
const columns = [
  // {
  //   title: 'No.',
  //   dataIndex: 'key',
  // },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length
  },
  {
    title: "Color",
    dataIndex: "color",
    sorter: (a, b) => a.color.length - b.color.length
  },
  // {
  //   title: 'Tags',
  //   dataIndex: 'tags',
  // },
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

const dataTable = [];
for (let i = 0; i < 46; i++) {
  dataTable.push({
    key: i,
    name: `Edward King ${i}`,
    product: `product ${i}`,
    status: `London, Park Lane no. ${i}`,
  });
}

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.products.products.data);
  // console.log(productState);

  const productsData = [];
  for (let i = 0; i < productState?.length; i++) {
    productsData.push({
      key: productState[i]?._id,
      title: productState[i]?.title,
      description: productState[i]?.description,
      category: productState[i]?.category,
      brand: productState[i]?.category, 
      color: productState[i]?.color,
      quantity: productState[i]?.quantity,
      price: productState[i]?.price,
      actions: (
        <React.Fragment>
          <div className="fs-5 d-flex gap-2" style={{cursor: 'pointer', color: 'var(--color-blue-main)'}}>
            <FontAwesomeIcon icon={faPenToSquare} className="icons-hover-update"/>
            <FontAwesomeIcon icon={faTrash} className="icons-hover-delete"/>
          </div>
        </React.Fragment>
      ),
    });
  }
  return (
    <section className="product-list">
      <h3>Products</h3>
      <article>
        <TableComponent data={productsData} columns={columns} />
      </article>
    </section>
  );
};

export default Products;

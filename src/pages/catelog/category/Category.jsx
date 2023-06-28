import React, { useEffect } from "react";
import TableComponent from "../../../components/app/table/Table";
import { getProductCategories } from "../../../features/productCategory/product.categorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories } from "../../../features/blogCategory/blog.categorySlice";

const CategoryColumns = [
  // {
  //   title: 'No.',
  //   dataIndex: 'key',
  // },
  {
    title: "Name",
    dataIndex: "name",
  },
  // {
  //   title: 'Product',
  //   dataIndex: 'product',
  // },
  // {
  //   title: 'Status',
  //   dataIndex: 'status',
  // },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Category = () => {
  const ProductCategoryData = [];
  const BlogCategoryData = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, [])

  const productCategoryState = useSelector(
    (state) => state.productCategories.productCategories.data
  );
  const blogCategoryState = useSelector((state) => state.blogCategories.blogCategories.data);
  
  for (let i = 0; i < productCategoryState?.length; i++) {
    ProductCategoryData.push({
      key: i + 1,
      name: productCategoryState[i]?.title,
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

  for (let i = 0; i < blogCategoryState?.length; i++) {
    BlogCategoryData.push({
      key: i + 1,
      name: blogCategoryState[i]?.title,
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

  return (
    <section className="category-list">
      <h3>Product Categories</h3>
      <article>
        <TableComponent data={ProductCategoryData} columns={CategoryColumns} />
      </article>
      <h3>Blog Categories</h3>
      <article>
        <TableComponent data={BlogCategoryData} columns={CategoryColumns} />
      </article>
    </section>
  );
};

export default Category;

import React, { useEffect } from "react";
import TableComponent from "../../../components/app/table/Table";
import { getProductCategories, resetProductState } from "../../../features/productCategory/product.categorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategories, resetBlogState } from "../../../features/blogCategory/blog.categorySlice";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const PCategoryErrorHandler = useSelector((state) => state.productCategories)
  const BCategoryErrorHandler = useSelector((state) => state.blogCategories)

  const productCategoryState = useSelector(
    (state) => state.productCategories.productCategories.data
  );
  const blogCategoryState = useSelector(
    (state) => state.blogCategories.blogCategories.data
  );

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

  useEffect(() => {
    if (typeof PCategoryErrorHandler.message === "string" && PCategoryErrorHandler.isError) {
      if (
        PCategoryErrorHandler.message.includes("token") ||
        PCategoryErrorHandler.message.includes("expired") ||
        PCategoryErrorHandler.message.includes("log again")
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${PCategoryErrorHandler.message}`,
        }).then((result) => {
          if(result.isConfirmed){
            dispatch(resetBlogState())
            dispatch(resetProductState())
            navigate('/auth/sign-in')
          }
        })
      }
    }
  });

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  useEffect(() => {
    dispatch(getBlogCategories());
  }, []);

  return (
    <section className="category-list">
      <h3>Product Categories</h3>
      <article>
        <TableComponent data={ProductCategoryData} columns={CategoryColumns} loading={PCategoryErrorHandler.isLoading}/>
      </article>
      <h3>Blog Categories</h3>
      <article>
        <TableComponent data={BlogCategoryData} columns={CategoryColumns} loading={BCategoryErrorHandler.isLoading}/>
      </article>
    </section>
  );
};

export default Category;

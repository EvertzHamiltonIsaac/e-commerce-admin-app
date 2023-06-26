import React, { useEffect } from 'react'
import TableComponent from '../../../components/app/table/Table'
import { getProductCategories } from "../../../features/productCategory/product.categorySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from 'react-redux';


const ProductCategoryColumns = [
  // {
  //   title: 'No.',
  //   dataIndex: 'key',
  // },
  {
    title: 'Name',
    dataIndex: 'name',
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
    title: 'Actions',
    key: 'actions'
  }
];

const Category = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductCategories());
  }, []);
  const productCategoryState = useSelector((state) => state.productCategories.productCategories.data)
  const ProductCategoryData = [];
  for (let i = 0; i < productCategoryState?.length; i++) {
    ProductCategoryData.push({
      key: i + 1,
      name: productCategoryState[i]?.title,
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
    <section className="category-list">
      <h3>Product Categories</h3>
      <article>
        <TableComponent data={ProductCategoryData} columns={ProductCategoryColumns} />
      </article>
      <h3>Blog Categories</h3>
      <article>
        <TableComponent data={ProductCategoryData} columns={ProductCategoryColumns} />
      </article>
    </section>
  )
}

export default Category
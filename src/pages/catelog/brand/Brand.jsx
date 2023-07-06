import React, { useEffect } from 'react'
import TableComponent from '../../../components/app/table/Table'
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from "../../../features/brand/brandSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const columns = [
  // {
  //   title: 'No.',
  //   dataIndex: 'key',
  // },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length
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

const Brand = () => {

  const dispatch = useDispatch();
  useEffect(() => {dispatch(getBrands())}, []);
  const {brands, isLoading} = useSelector((state) => state.brands);
  // console.log(brandState);
  const brandsData = [];
  for (let i = 0; i < brands.data?.length; i++) {
    brandsData.push({
      key: i + 1,
      name: brands.data[i].title,
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
    <section className="brand-list">
      <h3>Brands</h3>
      <article>
        <TableComponent data={brandsData} columns={columns} loading={isLoading}/>
      </article>
    </section>
  )
}

export default Brand
import React from 'react'
import TableComponent from '../../../components/app/table/Table'
import { useDispatch, useSelector } from 'react-redux';

const columns = [
  {
    title: 'No.',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
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

const Brand = () => {

  
  return (
    <section className="brand-list">
      <h3>Brands</h3>
      <article>
        <TableComponent data={dataTable} columns={columns} />
      </article>
    </section>
  )
}

export default Brand
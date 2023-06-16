import React from 'react'
import TableComponent from '../../../../components/app/table/Table'

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

const ProductList = () => {
  return (
    <section className="product-list">
      <h3>Products</h3>
      <article>
        <TableComponent data={dataTable} columns={columns} />
      </article>
    </section>
  )
}

export default ProductList
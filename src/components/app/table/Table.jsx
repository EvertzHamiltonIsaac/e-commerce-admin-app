import React from 'react'
import { Table } from 'antd';
import { useState } from 'react';
import './styleTable.css'

/**
 * 
 * @typedef {Object} ITable
 * @property {Array} data
 * @property {Array} columns
 * @property {boolean} loading
 * 
 * @param {ITable} props
 */


const TableComponent = ({ data=[], columns=[], loading}) => {

  // const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const onSelectChange = (newSelectedRowKeys) => {
  //   console.log('selectedRowKeys changed: ', newSelectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  //   selections: [
  //     Table.SELECTION_ALL,
  //     Table.SELECTION_INVERT,
  //     Table.SELECTION_NONE,
  //     {
  //       key: 'odd',
  //       text: 'Select Odd Row',
  //       onSelect: (changeableRowKeys) => {
  //         let newSelectedRowKeys = [];
  //         newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
  //           if (index % 2 !== 0) {
  //             return false;
  //           }
  //           return true;
  //         });
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //     {
  //       key: 'even',
  //       text: 'Select Even Row',
  //       onSelect: (changeableRowKeys) => {
  //         let newSelectedRowKeys = [];
  //         newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
  //           if (index % 2 !== 0) {
  //             return true;
  //           }
  //           return false;
  //         });
  //         setSelectedRowKeys(newSelectedRowKeys);
  //       },
  //     },
  //   ],
  // };

  return (
    <Table 
    className=''
    // rowSelection={rowSelection} 
    loading={loading}
    columns={columns} 
    dataSource={data} 
    scroll={{
      x: 1300,
    }}
    />
  )
}

export default TableComponent
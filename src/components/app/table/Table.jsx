import React, { useState } from "react";
import "./styleTable.css";
import { Table, Input, Button, Space  } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
/**
 *
 * @typedef {Object} ITable
 * @property {Array} data
 * @property {Array} columns
 * @property {boolean} loading
 *
 * @param {ITable} props
 */

const TableComponent = ({ data = [], columns = [], loading }) => {
  
  return (
    <Table
      className=""
      loading={loading}
      columns={columns}
      dataSource={data}
      scroll={{
        x: 1300,
      }}
    />
  );
};

export default TableComponent;

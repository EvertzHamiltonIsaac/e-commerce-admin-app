import React from 'react'
import TableComponent from '../../../components/app/table/Table'
import Input from '../../../components/app/input/Input';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

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

const Blog = () => {
  return (
    <section className="blog-list">
      <article>
        <h3>Blog List</h3>
        <div>
          <TableComponent data={dataTable} columns={columns} />
        </div>
      </article>
      {/* Esto es el Modal */}
      <article>
        <h3>Add Blog</h3>
        <div>
          <form>
            {/* Type color para la vista de agregar algun color */}
            <Input type='color' />

            {/* Volver esto componente */}
            <select name="" id="">
              <option value="">Select Blog Category</option>
            </select>
            {/* Volver esto componente */}

            <ReactQuill theme='snow' />
            
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
              </p>
            </Dragger>
          </form>
        </div>
      </article>
    </section>
  )
}

export default Blog
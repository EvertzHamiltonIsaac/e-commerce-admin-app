import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import Input from '../../../components/app/input/Input';
import 'react-quill/dist/quill.snow.css';
import { Stepper } from 'react-form-stepper';

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


const AddBlog = () => {
  const [quillValue, setQuillValue] = useState('');

  const InputsProps = [
    {
      Id: "blogTitle",
      type: "text",
      classNameInput: "form-control",
      labelValue: "Enter Blog Title",
      name: "blog-title",
    },
  ]
  const Steps = [
    { label: 'Add Blog Details' },
    { label: 'Upload Blog Image' },
    { label: 'Finish' },
  ]

  console.log(quillValue);
  return (
    <section className="add-blog">
      <h3>Add Blog</h3>
      <div>
        <Stepper steps={Steps} activeStep={1} />
      </div>
      <article>
        <form>
          {
            InputsProps.map((item, index) => (
              <Input
                key={index}
                type={item.type}
                Id={item.Id}
                labelValue={item.labelValue}
                name={item.name}
              />
            ))
          }
          <div>
            <ReactQuill theme='snow' value={quillValue} onChange={setQuillValue} />
          </div>
          
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

          <button type='submit'></button>
        </form>
      </article>
    </section>
  )
}

export default AddBlog
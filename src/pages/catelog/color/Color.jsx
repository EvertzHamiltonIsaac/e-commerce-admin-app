import React, {useState} from "react";
import TableComponent from '../../../components/app/table/Table'
import Select from "../../../components/app/select/Select";
import Modal from "antd/es/modal/Modal";
import Input from "../../../components/app/input/Input";

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

const OptionSelect = [
  {
    title: "1",
  },
  {
    title: "2",
  },
  {
    title: "3",
  },
  {
    title: "4",
  },
  {
    title: "5",
  },
];

const Color = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOnChange = (e) => {
    console.log(e.target.value);
  };

  const handleCancelModal = () => {
    setIsOpenModal(false)
  }

  return (
    <section className="color-list">
      <h3>Colors</h3>
      <article>
        <TableComponent data={dataTable} columns={columns} />
      </article>

      <Modal open={isOpenModal} onCancel={handleCancelModal}>
        <article>
          <h3>Add Blog</h3>
          <div>
            <form>
              <Input type="color" />

              <Select
                className="form-select"
                options={OptionSelect}
                placeholder=""
                onChange={handleOnChange}
              />

              {/* <ReactQuill theme="snow" /> */}

              {/* <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger> */}
            </form>
          </div>
        </article>
      </Modal>
    </section>
  )
}

export default Color
import React, {useEffect, useState} from "react";
import TableComponent from '../../../components/app/table/Table'
import Select from "../../../components/app/select/Select";
import Modal from "antd/es/modal/Modal";
import Input from "../../../components/app/input/Input";
import {getColors} from "../../../features/color/colorSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Code HEX',
    dataIndex: 'code',
  },
  {
    title: 'Actions',
    dataIndex: 'actions'
  }
];

// const dataTable = [];
// for (let i = 0; i < 46; i++) {
//   dataTable.push({
//     key: i,
//     name: `Edward King ${i}`,
//     product: `product ${i}`,
//     status: `London, Park Lane no. ${i}`,
//   });
// }

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
  const colorData = [];
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {colors, isLoading} = useSelector((state) => state.colors);

  for (let i = 0; i < colors.data?.length; i++) {
    colorData.push({
      key: i + 1,
      name: colors.data[i]?.name,
      code: colors.data[i]?.code,
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


  const handleOnChange = (e) => {
    console.log(e.target.value);
  };

  const handleCancelModal = () => {
    setIsOpenModal(false)
  }

  useEffect(() => {
    dispatch(getColors())
  }, [])

  return (
    <section className="color-list">
      <h3>Colors</h3>
      <article>
        <TableComponent data={colorData} columns={columns} loading={isLoading}/>
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
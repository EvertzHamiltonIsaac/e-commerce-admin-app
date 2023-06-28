import React, { useEffect } from "react";
import TableComponent from "../../components/app/table/Table";
import { getEnquiries } from "../../features/enquiry/enquirySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";

const columns = [
  // {
  //   title: "No.",
  //   dataIndex: "key",
  // },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Comment",
    dataIndex: "comment",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Actions",
    dataIndex: "actions",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();

  const enquiryState = useSelector((state) => state.enquiries.enquiries.data);
  
  const enquiryData = [];
  for (let i = 0; i < enquiryState?.length; i++) {
    enquiryData.push({
      key: i + 1,
      name: enquiryState[i]?.name,
      comment: enquiryState[i]?.comment,
      phone: enquiryState[i]?.phone,
      email: enquiryState[i]?.email,
      //! En Status tienes que poner en el componente select con las opciones.
      status: enquiryState[i]?.status,
      actions: (<React.Fragment>
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
      </React.Fragment>),
    });
  }

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  return (
    <section className="enquiries">
      <h3>Enquiries</h3>
      <article>
        <TableComponent data={enquiryData} columns={columns} />
      </article>
    </section>
  );
};

export default Enquiries;

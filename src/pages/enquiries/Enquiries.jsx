import React, { useEffect, useState } from "react";
import TableComponent from "../../components/app/table/Table";
import { getEnquiries } from "../../features/enquiry/enquirySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { EnquiriesTableColumns } from "../../utils/TableColums";

const Enquiries = () => {
  const [enquiriesId, setEnquiriesId] = useState('');
  const dispatch = useDispatch();

  const { isLoading, enquiries } = useSelector((state) => state.enquiries);

  const enquiryData = [];
  for (let i = 0; i < enquiries.data?.length; i++) {
    enquiryData.push({
      key: i + 1,
      name: enquiries.data[i]?.name,
      comment: enquiries.data[i]?.comment,
      phone: enquiries.data[i]?.phone,
      email: enquiries.data[i]?.email,
      //! En Status tienes que poner en el componente select con las opciones.
      status: enquiries.data[i]?.status,
      actions: (
        <React.Fragment>
          <div
            className="fs-5 d-flex gap-2"
            style={{ cursor: "pointer", color: "var(--color-blue-main)" }}
          >
            <FontAwesomeIcon icon={faEye} className="icons-hover-update" />
            <FontAwesomeIcon icon={faTrash} className="icons-hover-delete" />
          </div>
        </React.Fragment>
      ),
    });
  }



  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  return (
    <section className="enquiries">
      <div className="mb-4">
          <h1>Enquiries</h1>
          <h6 className="text-muted">{`On this page you can see all the queries. In general there are ${enquiries.data?.length} number of queries.`}</h6>
        </div>
      <article>
        <TableComponent
          data={enquiryData}
          columns={EnquiriesTableColumns}
          loading={isLoading}
        />
      </article>
    </section>
  );
};

export default Enquiries;

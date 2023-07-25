import React, { useEffect, useState } from "react";
import TableComponent from "../../components/app/table/Table";
import {
  getEnquiries,
  deleteEnquiry,
  updateEnquiry,
  resetEnquiryState,
} from "../../features/enquiry/enquirySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEye,
  faPaperPlane,
  faAddressBook,
  faSpinner,
  faCircleCheck
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { EnquiriesTableColumns } from "../../utils/TableColums";
import Modal from "antd/es/modal/Modal";
import { toast } from "react-toastify";
import Select from "../../components/app/select/Select";
import { Input } from "antd";
import CardHeader from "../../components/pages/dashboard/dashboardCardHeader/CardHeader";
import Swal from "sweetalert2";
import './enquiriesStyles.css'
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;



const OptionSelectStatus = [
  {
    title: "Submitted",
    value: "Submitted",
  },
  {
    title: "Contacted",
    value: "Contacted",
  },
  {
    title: "In Progress",
    value: "In Progress",
  },
  {
    title: "Resolved",
    value: "Resolved",
  },
];

const Enquiries = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [enquiry, setEnquiry] = useState({});
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");

  //* Status Counters
  const SubmittedEnquiries = [];
  const ContactedEnquiries = [];
  const InProgressEnquiries = [];
  const ResolvedEnquiries = [];


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isLoading,
    enquiries,
    isSuccess,
    isError,
    message,
    EnquiryDeleted,
    EnquiryUpdated,
  } = useSelector((state) => state.enquiries);

  const showDeleteConfirm = (item) => {
    return confirm({
      title: "Are you sure delete this enquiry?",
      content: "Once it's deleted it can't be restored",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deleteEnquiry(item?._id));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleOnViewEnquiry = (item) => {
    setEnquiry(item);
    setIsOpenModal(true);
    setStatus(item.status);
    // console.log(item);
  };
  const handleCancelModal = () => {
    setIsOpenModal(false);
    // setBrandId("");
    // formik.values.name = "";
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    dispatch(
      updateEnquiry({
        data: { ...enquiry, status: e.target.value },
        id: enquiry._id,
      })
    );
    setIsOpenModal(false);
  };

  
  const enquiryData = [];
  for (let i = 0; i < enquiries.data?.length; i++) {
    enquiryData.push({
      key: i + 1,
      name: enquiries.data[i]?.name,
      comment: enquiries.data[i]?.comment,
      phone: enquiries.data[i]?.phone,
      email: enquiries.data[i]?.email,
      //! En Status tienes que poner en el componente select con las opciones.
      status: (
        <div
          className={` text-center
          ${
            enquiries.data[i]?.status === "Submitted"
              ? "bg-secondary text-light"
              : ""
          }
          ${
            enquiries.data[i]?.status === "Contacted"
              ? "bg-info text-dark"
              : ""
          }
          ${
            enquiries.data[i]?.status === "In Progress"
              ? "bg-warning text-dark"
              : ""
          }
          ${
            enquiries.data[i]?.status === "Resolved"
              ? "bg-success text-light"
              : ""
          }
          `}
          style={{
            width: "100px",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {enquiries.data[i]?.status}
        </div>
      ),
      actions: (
        <React.Fragment>
          <div
            className="fs-5 d-flex gap-2"
            style={{ cursor: "pointer", color: "var(--color-blue-main)" }}
          >
            <FontAwesomeIcon
              icon={faEye}
              className="icons-hover-update"
              onClick={() => handleOnViewEnquiry(enquiries.data[i])}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="icons-hover-delete"
              onClick={() => showDeleteConfirm(enquiries.data[i])}
            />
          </div>
        </React.Fragment>
      ),
    });

    if(enquiries.data[i]?.status === 'Submitted'){
      SubmittedEnquiries.push(enquiries.data[i]); 
    }
    if(enquiries.data[i]?.status === 'Contacted'){
      ContactedEnquiries.push(enquiries.data[i]); 
    }
    if(enquiries.data[i]?.status === 'In Progress'){
      InProgressEnquiries.push(enquiries.data[i]); 
    }
    if(enquiries.data[i]?.status === 'Resolved'){
      ResolvedEnquiries.push(enquiries.data[i]); 
    }
  }

  const CardHeaderInformation = [
    {
      title: "Submitted",
      subTitle: `Total Submitted Enquieries: ${SubmittedEnquiries.length}`,
      icon: faPaperPlane,
      classNameColor: 'text-secondary',
      classNameBackGroundColor: 'bg-secondary'
    },
    {
      title: "Contacted",
      subTitle: `Total Contacted Enquieries: ${ContactedEnquiries.length}`,
      icon: faAddressBook,
      classNameColor: 'text-info',
      classNameBackGroundColor: 'bg-info'
    },
    {
      title: "In Progress",
      subTitle: `Total In Progress Enquieries: ${InProgressEnquiries.length}`,
      icon: faSpinner,
      classNameColor: 'text-warning',
      classNameBackGroundColor: 'bg-warning'
    },
    {
      title: "Resolved",
      subTitle: `Total Resolved Enquieries: ${ResolvedEnquiries.length}`,
      icon: faCircleCheck,
      classNameColor: 'text-success',
      classNameBackGroundColor: 'bg-success'
    },
  ];
  
  useEffect(() => {
    if (EnquiryUpdated && isSuccess) {
      toast.success("Enquiry Updated Succesfully!");
      dispatch(resetEnquiryState());
      dispatch(getEnquiries());
    }

    if (EnquiryDeleted && isSuccess) {
      toast.success("Enquiry Deleted Succesfully!");
      dispatch(resetEnquiryState());
      dispatch(getEnquiries());
    }

    if (isError) {
      toast.error("Something Went Wrong!");
      dispatch(getEnquiries());
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  useEffect(() => {
    if (typeof message === "string" && isError) {
      if (
        message.includes("token") ||
        message.includes("expired") ||
        message.includes("log again")
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${message}`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(resetEnquiryState());
            localStorage.clear();
            navigate("/auth/sign-in");
          }
        });
      }
    }
  },[isError, message]);

  return (
    <section className="enquiries">
      <div className="mb-4">
        <h1>Enquiries</h1>
        <h6 className="text-muted">{`On this page you can see all the queries. In general there are ${enquiries.data?.length} number of queries.`}</h6>
      </div>
      <article className="card_header">
        {CardHeaderInformation.map((item, index) => (
            <CardHeader 
            key={index}
            title={item.title}
            subTitle={item.subTitle}
            classNameColor={item.classNameColor}
            icon={item.icon}
            classNameBackGroundColor={item.classNameBackGroundColor}
            />
        ))}
      </article>
      <article>
        <Input.Search
          placeholder="Search here..."
          style={{ marginBottom: 8, width: "300px" }}
          onSearch={(value) => setSearchText(value.trim())}
          onChange={(e) => setSearchText(e.target.value.trim())}
        />
        <TableComponent
          data={enquiryData}
          columns={EnquiriesTableColumns(searchText)}
          loading={isLoading}
        />
      </article>
      <Modal open={isOpenModal} onCancel={handleCancelModal} footer={null}>
        <h3 className="text-center mb-3">View Enquiry</h3>
        <div className="d-flex flex-column align-items-center gap-3 text-center">
          <div className="gap-2">
            <h5 className="mb-1">Name</h5>
            <p className="mb-0" style={{ fontSize: "18px" }}>
              {enquiry.name}
            </p>
          </div>
          <div className="gap-2">
            <h5 className="mb-1">Email</h5>
            <p className="mb-0" style={{ fontSize: "18px" }}>
              <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
            </p>
          </div>
          <div className="gap-2">
            <h5 className="mb-1">Phone</h5>
            <p className="mb-0" style={{ fontSize: "18px" }}>
              {enquiry.phone}
            </p>
          </div>
          <div className="gap-2">
            <h5 className="mb-1">Comment</h5>
            <p className="mb-0" style={{ fontSize: "18px" }}>
              {enquiry.comment}
            </p>
          </div>
          <div className="gap-2">
            <h5 className="mb-1">Status</h5>
            <p
              className={`mb-0 
              ${enquiry.status === "Submitted" ? "bg-secondary text-light" : ""}
              ${enquiry.status === "Contacted" ? "bg-info text-dark" : ""}
              ${enquiry.status === "In Progress" ? "bg-warning text-dark" : ""}
              ${enquiry.status === "Resolved" ? "bg-success text-light" : ""}
              `}
              style={{
                fontSize: "18px",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {enquiry.status}
            </p>
          </div>
          <div className="gap-2">
            <h5 className="mb-1">Change Status</h5>
            <Select
              value={status}
              id="status"
              name="status"
              className="form-select"
              options={OptionSelectStatus}
              placeholder="Choose a Status"
              onChange={handleChangeStatus}
            />
          </div>
        </div>
        {/* <form
          className="d-flex flex-column gap-3"
          onSubmit={formik.handleSubmit}
        >
          <div>
            <span>Name</span>
            <Input
              Id="name"
              labelValue="Enter Brand Name"
              name="name"
              onChange={formik.handleChange("name")}
              value={formik.values.name}
              onBlur={formik.handleBlur("name")}
            />
          </div>
          <div
            style={{ marginTop: "1em" }}
            className="d-flex justify-content-end gap-2"
          >
            <button
              onClick={handleCancelModal}
              type="button"
              className="btn btn-secondary"
              style={{ backgroundColor: "var(--color-gray-main)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ backgroundColor: "var(--color-blue-main)" }}
            >
              Submit
            </button>
          </div>
        </form> */}
      </Modal>
    </section>
  );
};

export default Enquiries;

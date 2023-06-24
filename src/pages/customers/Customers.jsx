import React, { useEffect } from "react";
import TableComponent from "../../components/app/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../features/customers/customersSlice";

const columns = [
  // {
  //   title: "No.",
  //   dataIndex: "key",
  // },
  {
    title: "First Name",
    dataIndex: "firstName",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.firstName.length - b.firstName.length
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.lastName.length - b.lastName.length
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Postal Code",
    dataIndex: "postalCode",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const customerState = useSelector((state) => state.customers.customers);
  // console.log(customerState);

  const customersData = [];
  for (let i = 0; i < customerState?.length; i++) {
    if(customerState[i]?.role != 'admin'){
      customersData.push({
        key: customerState[i]._id,
        firstName: customerState[i].firstName,
        lastName: customerState[i].lastName,
        email: customerState[i].email,
        phone: customerState[i].phone,
        postalCode: customerState[i].postalCode,
        address: customerState[i].address,
      });
    }
  }
  
  return (
    <section className="customers">
      <h3>Customers</h3>
      <article>
        <TableComponent data={customersData} columns={columns} />
      </article>
    </section>
  );
};

export default Customers;

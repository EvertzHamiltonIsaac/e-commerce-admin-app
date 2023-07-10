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
    sorter: (a, b) => a.firstName.length - b.firstName.length,
    key: 'firstName',
    fixed: 'left',
    width: 100
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.lastName.length - b.lastName.length,
    key: 'lastName',
    // fixed: 'left',
    width: 110,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 160
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: 110

  },
  {
    title: "Postal Code",
    dataIndex: "postalCode",
    width: 90

  },
  {
    title: "Address",
    dataIndex: "address",
    width: 300
  },
];

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  
  const {customers, isLoading} = useSelector((state) => state.customers);
  // console.log(customerState);

  const customersData = [];
  for (let i = 0; i < customers?.length; i++) {
    if(customers[i]?.role != 'admin'){
      customersData.push({
        key: customers[i]._id,
        firstName: customers[i].firstName,
        lastName: customers[i].lastName,
        email: customers[i].email,
        phone: customers[i].phone,
        postalCode: customers[i].postalCode,
        address: customers[i].address,
      });
    }
  }
  
  return (
    <section className="customers">
      <h3>Customers</h3>
      <article>
        <TableComponent data={customersData} columns={columns} loading={isLoading}/>
      </article>
    </section>
  );
};

export default Customers;

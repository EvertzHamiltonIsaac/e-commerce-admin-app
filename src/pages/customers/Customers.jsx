import React, { useEffect, useState } from "react";
import TableComponent from "../../components/app/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../features/customers/customersSlice";
import {CustomersTableColumns} from "../../utils/TableColums";
import { Input } from "antd";

const Customers = () => {
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  
  const {customers, isLoading} = useSelector((state) => state.customers);

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
      <div className="mb-4">
          <h1>Customers</h1>
          <h6 className="text-muted">{`On this page you can see all created non-admin users in the project.. In General there are a number of ${customers?.length} users.`}</h6>
        </div>
      <article>
      <Input.Search
          placeholder="Search here..."
          style={{ marginBottom: 8, width: "300px" }}
          onSearch={(value) => setSearchText(value.trim())}
          onChange={(e) => setSearchText(e.target.value.trim())}
        />
        <TableComponent data={customersData} columns={CustomersTableColumns(searchText)} loading={isLoading}/>
      </article>
    </section>
  );
};

export default Customers;

import React, { useEffect } from "react";
import TableComponent from "../../components/app/table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/orders/orderSlice";
import { Table } from 'antd';

const columns = [
  // {
  //   title: "No.",
  //   dataIndex: "key",
  // },
  {
    title: "Products",
    dataIndex: "Products",
  },
  {
    title: "Order By",
    dataIndex: "orderBy",
  },
  Table.EXPAND_COLUMN,
  {
    title: "Status",
    dataIndex: "orderStatus",
  },
];



const Orders = () => {
  const dispatch = useDispatch();

  const {isLoading, orders} = useSelector((state) => state.orders);
  console.log(orders.data);
  const OrdersData = [];
  for (let i = 0; i < orders.data?.length; i++) {
    OrdersData.push({
      key: i,
      IdProducts: `${orders?.data[i]?.products[0]?._id}`,
      count: `Poner las columnas que van ${i}`,
      color: 'Hola',
      orderBy: `${orders?.data[i]?.orderBy.firstName} ${orders?.data[i]?.orderBy.lastName}`,
      orderStatus: `${orders?.data[i]?.orderStatus}`,
    });
  }

  useEffect(() => {
    dispatch(getOrders());
  },[])

  return (
    <section className="orders">
      <div className="mb-4">
          <h1>Orders</h1>
          <h6 className="text-muted">{`On this page are all the orders made in the project. In General there are ${orders.data?.length} amount of orders.`}</h6>
        </div>
      <article>
        <TableComponent data={OrdersData} columns={columns} loading={isLoading}/>
      </article>
    </section>
  );
};

export default Orders;

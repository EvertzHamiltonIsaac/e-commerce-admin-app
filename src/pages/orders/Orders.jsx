import React, { useEffect } from "react";
import TableComponent from "../../components/app/table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../features/orders/orderSlice";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const Orders = () => {
  const dispatch = useDispatch();

  const {isLoading, orders} = useSelector((state) => state.orders);
  // console.log(orderState);

  const OrdersData = [];
  for (let i = 0; i < orders.data?.length; i++) {
    OrdersData.push({
      key: i,
      name: `Poner las columnas que van ${i}`,
      product: `Cambio de Dise;o ${i}`,
      status: `Arregla la APi ${i}`,
    });
  }

  useEffect(() => {
    dispatch(getOrders());
  },[])

  return (
    <section className="orders">
      <h3>Orders</h3>
      <article>
        <TableComponent data={OrdersData} columns={columns} loading={isLoading}/>
      </article>
    </section>
  );
};

export default Orders;

import React, { useEffect, useState } from "react";
import TableComponent from "../../components/app/table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../features/orders/orderSlice";
import { OrdersTableColumns } from "../../utils/TableColums";
import { Input } from "antd";
import {
  faSackDollar,
  faCartShopping,
  faTruckFast,
  faHouseCircleCheck,
  faCartFlatbed,
  faEye,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import CardHeader from "../../components/pages/dashboard/dashboardCardHeader/CardHeader";
import { Link } from "react-router-dom";
import "./orderStyles.css";
import { useTokenExpired } from "../../hooks/useTokenExpired";

const Orders = () => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const { isLoading, AllOrders, isError, message } = useSelector(
    (state) => state.orders
  );
  const OrdersData = [];

  const OrderedOrders = [];
  const ProcessedOrders = [];
  const ShippedOrders = [];
  const OutForDeliveryOrders = [];
  const DeliveredOrders = [];

  for (let index = 0; index < AllOrders?.data?.length; index++) {
    OrdersData.push({
      key: index + 1,
      id: `${AllOrders?.data[index]?._id}`,
      orderBy: `${AllOrders?.data[index]?.user.firstName} ${AllOrders?.data[index]?.user.lastName}`,
      productCount: AllOrders?.data[index]?.orderItems?.length,
      totalPrice: AllOrders?.data[index]?.totalPrice.toLocaleString(undefined, {
        style: "decimal",
        minimumFractionDigits: 0,
      }),
      totalPriceAfterDiscount: AllOrders?.data[
        index
      ]?.totalPriceAfterDiscount.toLocaleString(undefined, {
        style: "decimal",
        minimumFractionDigits: 0,
      }),
      status: (
        <div
          className={`
          rounded 
          d-flex 
          justify-content-center 
          p-1 
          gap-1 
          align-items-center 
          ${
            AllOrders?.data[index]?.orderStatus === 'Ordered'
            ? 'bg-dark text-light'
            : ''
          }
          ${
            AllOrders?.data[index]?.orderStatus === 'Processed'
            ? 'bg-secondary text-light'
            : ''
          }
          ${
            AllOrders?.data[index]?.orderStatus === 'Shipped'
            ? 'bg-primary text-light'
            : ''
          }
          ${
            AllOrders?.data[index]?.orderStatus === 'Out for Delivery'
            ? 'bg-warning text-dark'
            : ''
          }
          ${
            AllOrders?.data[index]?.orderStatus === 'Delivered'
            ? 'bg-success text-light'
            : ''
          }
          `}
        >
          {AllOrders?.data[index]?.orderStatus}
        </div>
      ),
      viewOrderDetails: (
        <Link
          to={`./${AllOrders?.data[index]?._id}`}
          className="orderView_btn rounded d-flex justify-content-center p-1 gap-1 align-items-center"
        >
          <FontAwesomeIcon icon={faEye} />
          <span>View Order Details</span>
        </Link>
      ),
    });

    if (AllOrders?.data[index]?.orderStatus === "Ordered") {
      OrderedOrders.push(AllOrders?.data[index]);
    }
    if (AllOrders?.data[index]?.orderStatus === "Processed") {
      ProcessedOrders.push(AllOrders?.data[index]);
    }
    if (AllOrders?.data[index]?.orderStatus === "Shipped") {
      ShippedOrders.push(AllOrders?.data[index]);
    }
    if (AllOrders?.data[index]?.orderStatus === "Out for Delivery") {
      OutForDeliveryOrders.push(AllOrders?.data[index]);
    }
    if (AllOrders?.data[index]?.orderStatus === "Delivered") {
      DeliveredOrders.push(AllOrders?.data[index]);
    }
  }

  const CardHeaderInformation = [
    {
      title: "Ordered",
      subTitle: `Total Orders Ordered: ${OrderedOrders.length}`,
      icon: faCartShopping,
      classNameBackGroundColor: "bg-dark",
      classNameColor: "text-black",
    },
    {
      title: "Processed",
      subTitle: `Total Orders Processed: ${ProcessedOrders.length}`,
      icon: faClipboardCheck,
      classNameBackGroundColor: "bg-secondary",
      classNameColor: "text-secondary",
    },
    {
      title: "Shipped",
      subTitle: `Total Orders Shipped: ${ShippedOrders.length}`,
      icon: faCartFlatbed,
      classNameBackGroundColor: "bg-primary",
      classNameColor: "text-primary",
    },
    {
      title: "Out for Delivery",
      subTitle: `Orders Out for Delivery: ${OutForDeliveryOrders.length}`,
      icon: faTruckFast,
      classNameBackGroundColor: "bg-warning",
      classNameColor: "text-warning",
    },
    {
      title: "Delivered",
      subTitle: `Total Orders Delivered: ${DeliveredOrders.length}`,
      icon: faHouseCircleCheck,
      classNameBackGroundColor: "bg-success",
      classNameColor: "text-success",
    },
  ];

  const isTokenExpired = useTokenExpired(message, isError);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  return (
    <section className="orders">
      <article className="mb-4">
        <h1>Orders</h1>
        <h6 className="text-muted">{`On this page are all the orders made in the project. In General there are ${AllOrders?.data?.length} amount of orders.`}</h6>
      </article>
      <article className="dashboardHeader__card-container mt-3">
        {CardHeaderInformation.map((item, index) => (
          <CardHeader
            key={index}
            title={item.title}
            subTitle={item.subTitle}
            classNameColor={item.classNameColor}
            icon={item.icon}
            classNameBackGroundColor={item?.classNameBackGroundColor}
            backgroundColor={item.backgroundColor}
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
          data={OrdersData}
          columns={OrdersTableColumns(searchText)}
          loading={isLoading}
        />
      </article>
    </section>
  );
};

export default Orders;

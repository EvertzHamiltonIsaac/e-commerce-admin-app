import React, { useEffect } from "react";
import "./style.css";
import CardHeader from "../../components/pages/dashboard/dashboardCardHeader/CardHeader";
import GraphicColumns from "../../components/pages/dashboard/dashboardGraphic/GraphicColumns";
import TableComponent from "../../components/app/table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyOrdersIncome,
  getYearlyOrdersStats,
  getAllOrders,
  resetOrdersState
} from "../../features/orders/orderSlice";
import { useState } from "react";
import {
  getConfigOfGraphic,
  getConfigOfGraphicPie,
} from "../../utils/configGraphic";
import GraphicPie from "../../components/pages/dashboard/dashboardGraphic/GraphicPie.JSX";
import {
  faSackDollar,
  faAddressBook,
  faUsers,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { getCustomers } from "../../features/customers/customersSlice";
import { OrdersTableColumns } from "../../utils/TableColums";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

//! Card of Header
const CardHeaderInfo = [
  {
    title: "Total",
    amount: 1000,
    comparedText: "compared to Abril 2021",
    porcent: 47.7,
  },
  {
    title: "Total",
    amount: 2000,
    comparedText: "compared to Abril 2021",
    porcent: 47.7,
  },
  {
    title: "Total",
    amount: 3000,
    comparedText: "compared to Abril 2021",
    porcent: 47.7,
  },
];

//! Data for Table
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

const Dashboard = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyDataIncome, setMonthlyDataIncome] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { customers } = useSelector((state) => state.customers);
  const {
    orders,
    isError,
    isSuccess,
    isLoading,
    message,
    MonthlyOrders,
    YearlyOrdersStats,
    AllOrders,
  } = useSelector((state) => state.orders);

  const CardHeaderInformation = [
    {
      title: "Total Sales",
      subTitle: `Total Sales Yearly: ${YearlyOrdersStats?.data[0].count.toLocaleString(
        undefined,
        { style: "decimal", minimumFractionDigits: 0 }
      )}`,
      icon: faTags,
      backgroundColor: "var(--color-blue-secundary)",
    },
    {
      title: "Total Income",
      subTitle: `Total Incomes Yearly: ${YearlyOrdersStats?.data[0].amount.toLocaleString(
        undefined,
        { style: "decimal", minimumFractionDigits: 2 }
      )}`,
      icon: faSackDollar,
      backgroundColor: "var(--color-yellow-main)",
    },
    {
      title: "Total Customers",
      subTitle: `Total Customers: ${customers.length.toLocaleString(undefined, {
        style: "decimal",
        minimumFractionDigits: 0,
      })}`,
      icon: faUsers,
      backgroundColor: "var(--color-blue-secundary)",
    },
  ];

  const AllOrdersArray = [];
  for (let index = 0; index < AllOrders?.data?.length; index++) {
    AllOrdersArray.push({
      key: index++,
      orderBy: `${AllOrders?.data[index]?.user.firstName} ${AllOrders?.data[index]?.user.lastName}`,
      productCount: AllOrders?.data[index]?.orderItems?.length,
      totalPrice: AllOrders?.data[index]?.totalPrice,
      totalPriceAfterDiscount: AllOrders?.data[index]?.totalPriceAfterDiscount,
      status: AllOrders?.data[index]?.orderStatus,
    });
  }


  useEffect(() => {
    const monthsName = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const MonthlyOrderCount = [];
    const MonthlyOrderIncome = [];

    for (let index = 0; index < MonthlyOrders?.data.length; index++) {
      if (MonthlyOrders?.data[index]?._id?.month) {
        MonthlyOrderCount.push({
          month: monthsName[MonthlyOrders?.data[index]?._id?.month],
          count: MonthlyOrders?.data[index]?.count,
        });
        MonthlyOrderIncome.push({
          month: monthsName[MonthlyOrders?.data[index]?._id?.month],
          count: MonthlyOrders?.data[index]?.amount,
        });
      }
    }

    setMonthlyData(MonthlyOrderCount);
    setMonthlyDataIncome(MonthlyOrderIncome);
  }, [MonthlyOrders]);


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
            dispatch(resetOrdersState());
            localStorage.clear();
            navigate("/auth/sign-in");
          }
        });
      }
    }
  }, [message, isError]);

  useEffect(() => {
    dispatch(getMonthlyOrdersIncome());
    dispatch(getYearlyOrdersStats());
    dispatch(getAllOrders());
    dispatch(getCustomers());
  }, []);

  return (
    <section className="dashboard">
      <section className="dashboardHeader mb-2">
        <article className="dashboardHeader__title">
          <h1>Dashboard</h1>
          <h6 className="text-muted">{`In the Dashboard you can see a summary of the income and orders of our project in a more visual and clear way through graphics.`}</h6>
        </article>
        <article className="dashboardHeader__card-container mt-3">
          {CardHeaderInformation.map((item, index) => (
            <CardHeader
              key={index}
              title={item.title}
              subTitle={item.subTitle}
              classNameColor={item.classNameColor}
              icon={item.icon}
              backgroundColor={item.backgroundColor}
            />
          ))}
        </article>
      </section>
      <section className="mt-3 p-4 bg-white rounded">
        <h3 className="mb-5 ">Count Statics</h3>
        <article className="dashboard_graph" style={{}}>
          <GraphicColumns config={getConfigOfGraphic(monthlyData)} />
        </article>
      </section>
      <div className="dashboard_graph_orders">
        <section className="mt-3 p-4 bg-white rounded">
          <h3 className="mb-5 ">Income Statics</h3>
          <article className="dashboard_graph" style={{}}>
            <GraphicPie config={getConfigOfGraphicPie(monthlyDataIncome)} />
          </article>
        </section>
        <section className="mt-3 p-4 bg-white rounded">
          <h3 className="mb-4">Recent Orders</h3>
          <article>
            <TableComponent data={AllOrdersArray} columns={OrdersTableColumns()} />
          </article>
        </section>
      </div>
      {/* <section className='mt-4'>
          <h3 className="mb-4">Recent Reviews</h3>
      </section> */}
    </section>
  );
};

export default Dashboard;

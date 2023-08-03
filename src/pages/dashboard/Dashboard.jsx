import React, { useEffect } from "react";
import "./style.css";
import CardHeader from "../../components/pages/dashboard/dashboardCardHeader/CardHeader";
import GraphicColumns from "../../components/pages/dashboard/dashboardGraphic/GraphicColumns";
import TableComponent from "../../components/app/table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyOrdersIncome,
  getYearlyOrdersStats,
  getRecentOrders,
  getAllOrders,
} from "../../features/orders/orderSlice";
import { useState } from "react";
import {
  getConfigOfGraphic,
  getConfigOfGraphicPie,
} from "../../utils/configGraphic";
import GraphicPie from "../../components/pages/dashboard/dashboardGraphic/GraphicPie";
import {
  faSackDollar,
  faAddressBook,
  faUsers,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { getCustomers } from "../../features/customers/customersSlice";
import { OrdersTableColumns, RecentOrdersColumns } from "../../utils/TableColums";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { useTokenExpired } from "../../hooks/useTokenExpired";

const Dashboard = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyDataIncome, setMonthlyDataIncome] = useState([]);

  const dispatch = useDispatch();

  const { customers } = useSelector((state) => state.customers);
  const {
    isError,
    isSuccess,
    isLoading,
    message,
    MonthlyOrders,
    YearlyOrdersStats,
    AllOrders,
    recentOrders
  } = useSelector((state) => state.orders);
  console.log(recentOrders);
  const isTokenExpired = useTokenExpired(message, isError);

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
  for (let index = 0; index < recentOrders?.data?.length; index++) {
    AllOrdersArray.push({
      key: index + 1,
      id: `${recentOrders?.data[index]?._id}`,
      orderBy: `${recentOrders?.data[index]?.user.firstName} ${recentOrders?.data[index]?.user.lastName}`,
      productCount: recentOrders?.data[index]?.orderItems?.length,
      totalPrice: recentOrders?.data[index]?.totalPrice.toLocaleString(undefined, {
        style: "decimal",
        minimumFractionDigits: 0,
      }),
      totalPriceAfterDiscount: recentOrders?.data[
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
            recentOrders?.data[index]?.orderStatus === 'Ordered'
            ? 'bg-dark text-light'
            : ''
          }
          ${
            recentOrders?.data[index]?.orderStatus === 'Processed'
            ? 'bg-secondary text-light'
            : ''
          }
          ${
            recentOrders?.data[index]?.orderStatus === 'Shipped'
            ? 'bg-primary text-light'
            : ''
          }
          ${
            recentOrders?.data[index]?.orderStatus === 'Out for Delivery'
            ? 'bg-warning text-dark'
            : ''
          }
          ${
            recentOrders?.data[index]?.orderStatus === 'Delivered'
            ? 'bg-success text-light'
            : ''
          }
          `}
        >
          {recentOrders?.data[index]?.orderStatus}
        </div>
      ),
      viewOrderDetails: ('hola'
        // <Link
        //   to={`./${recentOrders?.data[index]?._id}`}
        //   className="orderView_btn rounded d-flex justify-content-center p-1 gap-1 align-items-center"
        // >
        //   <FontAwesomeIcon icon={faEye} />
        //   <span>View Order Details</span>
        // </Link>
      ),
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
    dispatch(getMonthlyOrdersIncome());
    dispatch(getYearlyOrdersStats());
    dispatch(getAllOrders());
    dispatch(getCustomers());
    dispatch(getRecentOrders({limit: 10}));
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
            <TableComponent
              data={AllOrdersArray}
              columns={RecentOrdersColumns()}
            />
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

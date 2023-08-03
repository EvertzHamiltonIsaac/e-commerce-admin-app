import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getOrderById,
  resetOrdersState,
  updateOrder,
} from "../../features/orders/orderSlice";
import { getInitials } from "../../utils/GetInitials";
import Select from "../../components/app/select/Select";
import "./orderStyles.css";
import { FormatDateTime } from "../../utils/DateTimeFormater";
import { toast } from "react-toastify";
import { useTokenExpired } from "../../hooks/useTokenExpired";

const OptionSelectStatus = [
  {
    title: "Ordered",
    value: "Ordered",
  },
  {
    title: "Processed",
    value: "Processed",
  },
  {
    title: "Shipped",
    value: "Shipped",
  },
  {
    title: "Out for Delivery",
    value: "Out for Delivery",
  },
  {
    title: "Delivered",
    value: "Delivered",
  },
];

const OrderDetails = () => {
  const [initials, setInitials] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, orderUpdated, isError, isSuccess, isLoading, message } =
    useSelector((state) => state.orders);

  const handleChangeStatus = (e) => {
    // console.log(e.target.value);
    setInitials(e.target.value);

    dispatch(
      updateOrder({
        data: { status: e.target.value },
        id: id,
      })
    );
  };

  const handleReset = () => {
    setInitials("");
    history.go(-1);
  };

  useEffect(() => {
    if (orderUpdated && isSuccess) {
      toast.success("Order Status Updated Succesfully!");
      dispatch(resetOrdersState());
      dispatch(getOrderById(id));
    }

    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const isTokenExpired = useTokenExpired(message, isError);

  useEffect(() => {
    dispatch(getOrderById(id));
    setInitials(order?.data?.orderStatus);
  }, []);

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center h-100 gap-3">
          <div
            style={{ width: "3rem", height: "3rem" }}
            className="spinner-grow text-primary fs-2"
          ></div>
          <span className="fw-bold fs-4">Loading...</span>
        </div>
      ) : (
        <section className="order_details">
          <article
            style={{
              display: "flex",
              gap: "1em",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="mb-4"
          >
            <div>
              <h1>Orders</h1>
              <h6 className="text-muted">{`On this page are all the orders made in the project. In General there are amount of orders.`}</h6>
            </div>
            <div className="btn_back shadow rounded" onClick={handleReset}>
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back</span>
            </div>
          </article>
          <article className="order_details_panels_container">
            <div className="user_info shadow pt-4 user-select-none rounded">
              <div className="profile_img_container p-3">
                {order?.data?.user.image ? (
                  <div></div>
                ) : (
                  <span>
                    {getInitials(
                      `${order?.data?.user?.firstName} ${order?.data?.user?.lastName}`
                    )}
                  </span>
                )}
              </div>
              <div className="profile_text_container pb-2">
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "650",
                    position: "relative",
                  }}
                >
                  {`${order?.data?.user?.firstName} ${order?.data?.user?.lastName}`}
                </span>

                <span
                  className="text-muted"
                  style={{ fontSize: "12px" }}
                >{`${order?.data?.user?.email}`}</span>
              </div>
              <div
                style={{
                  backgroundColor: "lightgray",
                  height: "1px",
                  width: "100%",
                }}
              ></div>
              <div className="short_details_container pb-2">
                <span
                  className="text-muted"
                  style={{
                    letterSpacing: "1.2px",
                    fontSize: "12px",
                    fontWeight: "650",
                  }}
                >
                  SHORT DETAILS
                </span>
                <div className="short_details">
                  <div className="left_details">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".2em",
                        marginBottom: "10px",
                      }}
                    >
                      <span className="text-muted">User ID:</span>
                      <span>{order?.data?.user?._id}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".2em",
                        marginBottom: "8px",
                      }}
                    >
                      <span className="text-muted">Address:</span>
                      <span>{order?.data?.user?.address}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".2em",
                        marginBottom: "8px",
                      }}
                    >
                      <span className="text-muted">Postal Code:</span>
                      <span>{order?.data?.user?.postalCode}</span>
                    </div>
                  </div>
                  <div className="rigth_details">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".2em",
                        marginBottom: "8px",
                      }}
                    >
                      <span className="text-muted">Phone:</span>
                      <span>{order?.data?.user?.phone}</span>
                    </div>
                    <div
                      style={{
                        textTransform: "capitalize",
                        display: "flex",
                        flexDirection: "column",
                        gap: ".2em",
                        marginBottom: "8px",
                      }}
                    >
                      <span className="text-muted">Role:</span>
                      <span>{order?.data?.user?.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment_info_container rounded shadow ">
              <div style={{ padding: "1em 1em 1em 1em" }}>
                <h5>Payment Information</h5>
                <h6 className="text-muted">{`General Information about Payment of order`}</h6>
              </div>
              <div
                style={{
                  backgroundColor: "lightgray",
                  height: "1px",
                  width: "100%",
                }}
              ></div>
              <div className="payment_info">
                <div className="payment_general_info">
                  <span
                    className="text-muted"
                    style={{
                      letterSpacing: "1.2px",
                      fontSize: "12px",
                      fontWeight: "650",
                    }}
                  >
                    PAYMENT GENERAL INFO
                  </span>
                  <div className="payment_info_general_text mt-3">
                    <div className="shipping_info_items">
                      <span className="text-muted">Amount:</span>
                      <span>
                        {order?.data?.paymentInfo?.amountMoney?.amount.toLocaleString(
                            undefined,
                            {
                              style: "decimal",
                              minimumFractionDigits: 2,
                            }
                          )}
                      </span>
                    </div>
                    <div className="shipping_info_items">
                      <span className="text-muted">Currency:</span>
                      <span>
                        {order?.data?.paymentInfo?.amountMoney?.currency}
                      </span>
                    </div>
                    <div className="shipping_info_items">
                      <span className="text-muted" style={{ width: "160px" }}>
                        Payment Id:
                      </span>
                      <span>{order?.data?.paymentInfo?.paymentId}</span>
                    </div>
                    <div className="shipping_info_items">
                      <span className="text-muted">Payment Status:</span>
                      <span
                        className={`text-light p-1 rounded ${
                          order?.data?.paymentInfo?.paymentStatus ===
                          "COMPLETED"
                            ? "bg-success "
                            : " bg-danger"
                        }`}
                      >
                        {order?.data?.paymentInfo?.paymentStatus}
                      </span>
                    </div>
                    <div className="shipping_info_items">
                      <span className="text-muted">Receipt Number:</span>
                      <span>{order?.data?.paymentInfo?.receiptNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="card_detail">
                  <span
                    className="text-muted"
                    style={{
                      letterSpacing: "1.2px",
                      fontSize: "12px",
                      fontWeight: "650",
                    }}
                  >
                    CARD DETAIL
                  </span>
                  <div className="card_detail_info_text pt-3">
                    <div className="shipping_info_items">
                      <span className="text-muted">Card Brand:</span>
                      <span>{order?.data?.paymentInfo?.cardDetails?.card?.cardBrand}</span>
                    </div>
                    <div className="shipping_info_items">
                      <span className="text-muted">Card Type:</span>
                      <span>{order?.data?.paymentInfo?.cardDetails?.card?.cardType}</span>
                    </div>
                    <div className="shipping_info_items">
                      <span className="text-muted">Card Bin:</span>
                      <span>
                        {order?.data?.paymentInfo?.cardDetails?.card?.bin}
                      </span>
                    </div>
                    <div className="shipping_info_items">
                      <span className="text-muted">Card Status:</span>
                      <span
                        className={`text-light p-1 rounded ${
                          order?.data?.paymentInfo?.cardDetails.cardDetailsStatus ===
                          "CAPTURED"
                            ? "bg-success "
                            : " bg-danger"
                        }`}
                      >
                        {order?.data?.paymentInfo?.cardDetails.cardDetailsStatus}
                      </span>
                    </div>
                    <div className="shipping_info_items">
                      <span className="text-muted">Authorized At:</span>
                      <span>{FormatDateTime(order?.data?.cardPaymentTimeLine?.authorizedAt, "MMMM Do YYYY")}</span>
                    </div>
                    <div className="shipping_info_items">
                      <span className="text-muted">Captured At:</span>
                      <span>{FormatDateTime(order?.data?.cardPaymentTimeLine?.capturedAt, "MMMM Do YYYY")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shipping_info shadow user-select-none rounded mb-4">
              <div
                className="shipping_info_header"
                style={{ padding: "1em 1em 0em 1em" }}
              >
                <h5>Shipping Information</h5>
                <h6 className="text-muted">{`General Information about order`}</h6>
              </div>
              <div
                style={{
                  backgroundColor: "lightgray",
                  height: "1px",
                  width: "100%",
                }}
              ></div>
              <div className="shipping_info_body p-3">
                <div className="shipping_info_items">
                  <span className="text-muted">First Name:</span>
                  <span>{order?.data?.shippingInfo?.firstName}</span>
                </div>
                <div className="shipping_info_items">
                  <span className="text-muted">Last Name:</span>
                  <span>{order?.data?.shippingInfo?.lastName}</span>
                </div>
                <div className="shipping_info_items">
                  <span className="text-muted">Address:</span>
                  <span style={{ width: "160px" }}>
                    {order?.data?.shippingInfo?.address}
                  </span>
                </div>
                <div className="shipping_info_items">
                  <span className="text-muted">City:</span>
                  <span>{order?.data?.shippingInfo?.city}</span>
                </div>
                <div className="shipping_info_items">
                  <span className="text-muted">Pin Code:</span>
                  <span>{order?.data?.shippingInfo?.pincode}</span>
                </div>
                <div className="shipping_info_items">
                  <span className="text-muted">State:</span>
                  <span>{order?.data?.shippingInfo?.state}</span>
                </div>
                <div className="shipping_info_items">
                  <span className="text-muted">Other:</span>
                  <span>{order?.data?.shippingInfo?.other}</span>
                </div>
              </div>
            </div>

            <div className="order_container shadow rounded mb-4">
              <div className="order_info">
                <div
                  style={{ display: "flex", gap: ".5em", alignItems: "center" }}
                >
                  <span style={{ width: "130px" }}>Order Status:</span>
                  <Select
                    value={initials || order?.data?.orderStatus}
                    id="status"
                    name="status"
                    className="form-select form-select-sm"
                    options={OptionSelectStatus}
                    placeholder="Choose a Status"
                    onChange={handleChangeStatus}
                  />
                </div>
                <div>
                  Paid At: {FormatDateTime(order?.data?.paidAt, "MMMM Do YYYY")}
                </div>
              </div>
              <div className="order_items_container">
                <div className="order_items">
                  {order?.data?.orderItems?.map((item, index) => (
                    <div key={index} className="product_info rounded">
                      <div className="product">
                        <div className="product_img_container">
                          <img
                            style={{ width: "100%", height: "100%" }}
                            src={item.product.images[0].url}
                            alt=""
                          />
                        </div>
                        <div className="product_text_info">
                          <span className="fs-6 fw-bold">
                            {item.product.title}
                          </span>
                          <div className="d-flex gap-2">
                            <span className="d-flex align-items-center gap-2">
                              <span className="text-muted">Color:</span>
                              <div
                                style={{
                                  backgroundColor: `${item.color.code}`,
                                  width: "15px",
                                  height: "15px",
                                  borderRadius: "50%",
                                }}
                              ></div>
                            </span>
                            <span>
                              <span className="text-muted">
                                Price of Unit:{" "}
                              </span>
                              {item.product.price}
                            </span>
                          </div>
                          <span>
                            <span className="text-muted">
                              Quantity in Order:
                            </span>{" "}
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="total_price_container fs-6">
                        <div className="text-muted">Total Price In Order</div>
                        <div className="fs-6">
                          {(item.price * item.quantity).toLocaleString(
                            undefined,
                            {
                              style: "decimal",
                              minimumFractionDigits: 2,
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </section>
      )}
    </React.Fragment>
  );
};

export default OrderDetails;

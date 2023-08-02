import Swal from "sweetalert2";
import { resetOrdersState } from "../features/orders/orderSlice";
import { resetBlogState } from "../features/blog/blogSlice";
import { resetBrandState } from "../features/brand/brandSlice";
import { resetColorState } from "../features/color/colorSlice";
import { resetBlogCategoryState } from "../features/blogCategory/blog.categorySlice";
import { resetCouponState } from "../features/coupons/couponSlice";
import { resetEnquiryState } from "../features/enquiry/enquirySlice";
import { resetProductCategoryState } from "../features/productCategory/product.categorySlice";
import { resetProductState } from "../features/product/productSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useTokenExpired(message, isError) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
    if (typeof message === "string" && isError) {
      if (
        message.includes("token") ||
        message.includes("expired") ||
        message.includes("log again")
      ) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${message}`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(resetOrdersState());
            dispatch(resetBlogState());
            dispatch(resetBrandState());
            dispatch(resetColorState());
            dispatch(resetBlogCategoryState());
            dispatch(resetCouponState());
            dispatch(resetEnquiryState());
            dispatch(resetOrdersState());
            dispatch(resetProductState());
            dispatch(resetProductCategoryState());
            localStorage.clear();
            navigate("/auth/sign-in");
          }
        });
      }
    }
  
  return <div></div>;
}

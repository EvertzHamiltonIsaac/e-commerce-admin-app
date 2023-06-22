import React from "react";
import { BrowserRouter as BsRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Login from "../pages/auth/login/Login";
import Brand from "../pages/catelog/brand/Brand";
import Category from "../pages/catelog/category/Category";
import Color from "../pages/catelog/color/Color";
import Products from "../pages/catelog/product/Products";
import Customers from "../pages/customers/Customers";
import Dashboard from "../pages/dashboard/Dashboard";
import Enquiries from "../pages/enquiries/Enquiries";
import Orders from "../pages/orders/Orders";
import Blog from "../pages/blog/blog/Blog";
import BlogCategory from "../pages/blog/blog-category/BlogCategory";

const Router = () => {
  return (
    <BsRouter>
      <Routes>
        <Route path="/auth">
          <Route path="sign-in" element={<Login />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Customers */}
          <Route path="customers" element={<Customers />} />

          {/* Product */}
          <Route path="products" element={<Products />} />

          {/* Brand */}
          <Route path="brand" element={<Brand />} />

          {/* Category */}
          <Route path="category" element={<Category />} />

          {/* Color */}
          <Route path="color" element={<Color />} />

          {/* Orders */}
          <Route path="orders" element={<Orders />} />

          {/* Blog pages */}
          <Route path="blog" element={<Blog />} />
          <Route path="blog-category" element={<BlogCategory />} />

          {/* Enquiries */}
          <Route path="enquiries" element={<Enquiries />} />
        </Route>
      </Routes>
    </BsRouter>
  );
};

export default Router;

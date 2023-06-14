import React from 'react'
import { BrowserRouter as BsRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'
import Login from '../pages/auth/login/Login'
import ResetPassword from '../pages/auth/ResetPassword'
import ForgotPassword from '../pages/auth/ForgotPassword'
import MainLayout from '../components/Layout/MainLayout'
import Enquiries from '../pages/enquiries/Enquiries'
import BlogList from '../pages/blog/blog-list/BlogList'
import BlogCategoryList from '../pages/blog/blog-category-list/BlogCategoryList'
import Orders from '../pages/orders/Orders'
import Customers from '../pages/customers/Customers'
import BrandList from '../pages/catelog/brand/list-brand/BrandList'
import ProductList from '../pages/catelog/product/list-product/ProductList'
import CategoryList from '../pages/catelog/category/list-category/CategoryList'
import ColorList from '../pages/catelog/color/list-color/ColorList'
import AddBlog from '../pages/blog/add-blog/AddBlog'

const Router = () => {
  return (
    <BsRouter>
      <Routes>
        <Route path='/auth'>
          <Route index element={<Login />} />
          <Route path='reset-password' element={<ResetPassword />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
        </Route>
        <Route path='/admin' element={<MainLayout />} >

          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Blog pages */}
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='list-blog' element={<BlogList />} />
          <Route path='add-blog-category' element={<Dashboard />} />
          <Route path='blog-category-list' element={<BlogCategoryList />} />

          {/* Orders */}
          <Route path='orders' element={<Orders />} />

          {/* Customers */}
          <Route path='customers' element={<Customers />} />

          {/* Brand */}

          <Route path='list-brand' element={<BrandList />} />

          {/* Product */}
          <Route path='list-product' element={<ProductList/>} />

          {/* Category */}
          <Route path='list-category' element={<CategoryList />} />

          {/* Color */}
          <Route path='list-color' element={<ColorList />} />

          {/* Enquiries */}
          <Route path='enquiries' element={<Enquiries />} />
        </Route>
      </Routes>
    </BsRouter>
  )
}

export default Router
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import customersReducer from '../features/customers/customersSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';
import productCategoryReducer from '../features/productCategory/product.categorySlice'
import blogReducer from '../features/blog/blogSlice'
import blogCategoryReducer from '../features/blogCategory/blog.categorySlice';
import colorReducer from '../features/color/colorSlice';
import enquiryReducer from '../features/enquiry/enquirySlice';
import orderReducer from '../features/orders/orderSlice';
import uploadReducer from '../features/upload/uploadSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    products: productReducer,
    brands: brandReducer,
    productCategories: productCategoryReducer,
    blogCategories: blogCategoryReducer,
    blogs: blogReducer,
    colors: colorReducer,
    enquiries: enquiryReducer,
    orders: orderReducer,
    images: uploadReducer
  },
})
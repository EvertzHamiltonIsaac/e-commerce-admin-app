import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import customersReducer from '../features/customers/customersSlice';
import productReducer from '../features/product/productSlice';
import brandReducer from '../features/brand/brandSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    products: productReducer,
    brands: brandReducer
  },
})
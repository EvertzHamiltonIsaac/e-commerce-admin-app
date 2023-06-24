import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import customersReducer from '../features/customers/customersSlice';
import productReducer from '../features/product/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducer,
    products: productReducer
  },
})
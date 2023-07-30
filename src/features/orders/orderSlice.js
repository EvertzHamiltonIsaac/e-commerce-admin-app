import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import orderService from "./orderService";

export const resetOrdersState = createAction('resetOrdersState');


export const getOrders = createAsyncThunk(
  "user/cart/get-all-orders",
  async (thunkAPI) => {
    try {
      return await orderService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getMonthlyOrdersIncome = createAsyncThunk(
  "order/get-month-wise-order-income",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getMonthlyOrders();
    } catch (error) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const getYearlyOrdersStats = createAsyncThunk(
  "order/get-yearly-total-orders",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getYearlyOrdersStats();
    } catch (error) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/get-all-orders",
  async (_, { rejectWithValue }) => {
    try {
      return await orderService.getAllOrders();
    } catch (error) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getMonthlyOrdersIncome.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMonthlyOrdersIncome.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.MonthlyOrders = action.payload;
      })
      .addCase(getMonthlyOrdersIncome.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getYearlyOrdersStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getYearlyOrdersStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.YearlyOrdersStats = action.payload;
      })
      .addCase(getYearlyOrdersStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.AllOrders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetOrdersState, () => initialState);
  },
});

export default orderSlice.reducer;

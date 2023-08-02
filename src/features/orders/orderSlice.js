import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import orderService from "./orderService";

export const resetOrdersState = createAction('resetOrdersState');


// export const getOrders = createAsyncThunk(
//   "user/cart/get-all-orders",
//   async (thunkAPI) => {
//     try {
//       return await orderService.getOrders();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );

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

export const getOrderById = createAsyncThunk(
  "order/:id",
  async (id , { rejectWithValue }) => {
    try {
      return await orderService.getOrderById(id);
    } catch (error) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "order/updateOrder/:id",
  async ({id, data}, { rejectWithValue }) => {
    try {
      return await orderService.updateOrder(id, data);
    } catch (error) {
      throw rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  AllOrders: [],
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
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderUpdated = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
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

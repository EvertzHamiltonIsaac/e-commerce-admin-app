import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const resetCouponState = createAction("resetCouponState");

export const getCoupons = createAsyncThunk(
  "coupon/",
  async (_, { rejectWithValue }) => {
    try {
      return await couponService.getCoupons();
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const createCoupons = createAsyncThunk(
  "coupon/create",
  async (data, { rejectWithValue }) => {
    try {
      return await couponService.createCoupons(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  coupons: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(createCoupons.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.CouponCreated = action.payload;
      })
      .addCase(createCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(resetCouponState, () => initialState);
  },
});

export const { actions } = couponSlice;
export default couponSlice.reducer;

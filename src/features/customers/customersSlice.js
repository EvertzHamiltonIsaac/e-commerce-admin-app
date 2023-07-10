import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customersService from "./customersService";

export const getCustomers = createAsyncThunk("user/", async (thunkAPI) => {
  try {
    return await customersService.getCustomers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
const initialState = {
    customers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
}

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
    })
    .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
    })
    .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
    })
  },
});

export default customersSlice.reducer